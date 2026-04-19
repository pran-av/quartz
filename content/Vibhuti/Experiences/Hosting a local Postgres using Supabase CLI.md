---
date: 2025-12-27
tags:
  - engineering
  - saage
---
Recently when I started a new project, I chose Supabase to manage my production Postgres instances. However post launching beta I felt the need of having a separate development database instance for testing.

Duplicating an existing project in Supabase is possible, however it is only available for paying customers. Hence Supabase CLI was the best option I had to make the duplication as automatic as possible.

And anyway there was no reason to have a "development" instance to be hosted on cloud instead of my own laptop. All I needed was *Docker Desktop* to create postgres containers that will hold all the supabase related images.

Supabase also makes its Dashboard UI available locally - so I do not need to write SQL scripts in the CLI or my codebase. I could use the SQL Editor or manage policies and rpc functions from the Supabase locally hosted UI and then convert my changes into a migration file through a command.

So in this writeup I'll try to consolidate all the actions and learnings from operating the Supabase CLI.

## Step by Step Guide on using Supabase CLI

What would you need,
1. Know how to open a *Terminal*, basic `cd` and `ls` commands to take you to the correct locations.
2. Download *Docker Desktop* for containerisation of your db instances.
3. Download *Postman Application* so that you can test the database API

This write up is meant to be experience sharing, you should refer to Supabase Documentation when you are setting up your own instance.

Note: If you are using package managers - the commands will differ. I am using brew.

### Step 1: Brewing the Installation

In your terminal, go to your root directory and install the Supabase CLI so that it is available in all file systems below the root.

`brew install supabase/tap/supabase`

Now go visit your local repository for which local database instance has to be created and then run,

`supabase init`

Its important that you do this in your repo that already has git initialised. We want our local developments to be version controlled.

A `supabase` directory is not created in the root of your repo with `supabase/config.toml` file added. The supabase local UI does not have all settings - so you would have to go through the config file to turn on the things you need.

For instance, I turned on the Anonymous SignIns which was default `false` - this is required by my client code to operate the AnonymousSignIn function provided by supabase.

The final part of the installation, within your repo,

run `supabase start` - this will start creating a docker container, the setup would take a while for the first time as it will download all the images. I have atleast 14 GBs of supabase images in my docker at the moment.

The docker will notify us in the terminal once the container is up and running, and it also shares a summary of all local URLs and instance keys.

Here is a brief about them:
1. The database is hosted on `http://127.0.0.1:54321` - which is the Supabase URL
2. The `anon key` and the `secret` are shared for safe keeping. Anon keys are publishable while secret has high degree privileges and hence never exposed.
3. The Supabase studio is hosted on `http://localhost:54323/` - going to this url will render the Supabase UI
4. For testing Email based Auth locally we can use a Mailpit server which is hosted on `http://127.0.0.1:54324` . This was useful as I had Magic Link Authentication.
5. The MCP server is at `http://127.0.0.1:54321/mcp` - an agentic IDE like Cursor can use this server to read/learn from the database
6. Then there are APIs that can be accessed via the `54321` port. Note: Supabase which uses PostgREST default makes an API for every table and function we create having `anon` privileges.

I copied the important parameters in my env files for safe keeping. These variables and paths will remain same for our container as we start, stop and reset the db in future.

### Step 2: Link and Pull from Production

Since I have to replicate my production db, my setup would not include any pushing to prod operations.

Here's how I went with it:

First, `supabase link --project-ref <your-project-id>` - it asks for a password to proceed. I didn't remember setting up a password, hence I navigated to the Supabase Prod project to look for an option to reset it.

Once the link was successful, I proceeded with `supabase db pull` which is supposed sync my production with development. The `supabase db push` will do the opposite when our objective is to deploy.

Here I ran into an error that said, my production and development migration history is not in sync or has some mismatch. Well that was obvious because until now there ain't existed the dev database.

The solution to this was to remove or forget all migration history that production was holding. This command was not to revert or alter any schemas or code but to just have both databases with equal history. Though once this history is removed we need to create a new migration file that syncs both environments - so its important that the remote database continues to have schema/backup.

To help me make sure this command worked fine, `supbase migration list` gave me a comparison list for prod and dev. I noted down the migration versions and for each one ran `DELETE FROM supabase_migrations.schema_migrations WHERE version = '<TIMESTAMP>';
`
Once both instance histories were in sync we ran the `supabase db pull` again. And it worked this time. The `supabase/migrations/` in my local repo now had a migration file.

I spent some time reviewing over 900 lines of SQLs to get the vibe (lol). And then did a `supabase db reset`.

What reset did was it deleted the entire local database and rebuilt the whole container using the new migration file. Post this I went to the Supabase Studio and hurray there were all the tables and functions and policies ready for me!

### Step 3: Configuring and Testing

I immediately fired my local client environment and began testing. Few setting changes here and there required me to visit the config.toml of supabase.

I ran into an issue when I changed a redirect url and it would not take effect while I was testing. I wasted some valuable minutes just to make it work by repeating `supabase db reset`.

So yes if you change settings and it won't take effect, do the reset.

The rest of the testing thankfully went well.

---

I want to add a bit more points on how I am using the CLI and my new local db instance to deploy into production.

I am strictly maintaining migration files in my version controlled repo and pushing them to remote repository while making sure no secrets are mentioned in any queries.

I sometimes end up modifying queries in the Supbase Studio and I sometimes ask the Cursor Agent to write a migration file. So here's how to keep moving with this hybrid workflow:

### Making Schema modifications in Supabase Studio

The benefit of directly doing in the Supabase Studio is that I can check if a change is working or not. RLS policies are known for how nasty they are and I want to avoid 10 migration files per deployment.

Hence I make the changes in the Studio -> Save them -> Make sure they work -> then officially generate a migration script.

To do this, I run `supabase db diff`. However I think this command is not very reliable - the last time I tried it was very confused with what I actually changed in the Studio vs what I simply read. So I have to write them manually.

Instead of the diff command we can also ask a Coding agent to identify and write the migration for latest changes using the MCP server. I believe that might be more accurate. But I have not tried yet.

We do not need to do anything now other than deployment to production.

### Making Schema modifications via my local repo

The best way to do this is the using a coding agent with MCP so it has enough current context of the db and have them write the migration files with proper timestamped name.

My agent often tried to edit past migration files - but it stopped when I told him a bunch of times to always create a new one.

The downside of this method is that I can only test post running `supabase migration up` and if things don't work I have a bunch of migration files full or trial and error attempts.

Longterm this is gonna hurt when deploying to production, there are two ways to not have a production heart attack,
1. Manually create a new migration file and consolidate changes. Then mark `supabase migration repair <file version> --status reverted` to the old files and `supabase migration repair <new version> --status applied` to the new file.
2. Ask a coding agent to do all the above

I looked into another query which is for squashing `supabase migration squash`, but this only deals with schema changing queries and likely omits policy and function related schemas and drops. Also I did not find any way to squash only a select number of migration files - squashing seems to be default from baseline, which means we cannot use it post initial db deployment.

Anyway, once I run `supabase migration up`, I make sure to create a new migration file to rerun this command next time.

### Deploying to Production

One thing that is recommended to be done often before deployment to production is to: run and test with `supabase db reset` often.

This has helped me before as once I made changes in Supabase Studio and forgot to create a migration file via `supabase db diff -f <file-name>` and that led to a exposed table while testing. I wrote a new migration manually to fill in the changes and rerun the saviour that is `supabase db reset`.

Once tested with all your heart, look at god above, make sure they are smiling and hit `supabase db push`.

### What to deploy first: Database or Client

The answer is pretty much understood to be - database first and client second. However this works when the database changes are not gonna break the client. And in my case they are going to.

Probably next time I'll make sure to make it reverse compatible. The best option I got at the moment is to roll a "Scheduled Maintenance" page for a few minutes.

If the app gets more real, I'll naturally look into setting up CI/CD via Github Actions or such services - both go or neither goes. And something which can also help me push to limited audiences first - stepwise rollout. Might as well add flags to the client so I can enable post surety.

### Troubleshooting Failed Migrations

Recently when I was migrating some database changes locally, a syntax error occurred mid migration leading to one migration file running while the rest being stranded.

While stopping the container and restarting it would resolve the issue generally, my container would not restart and fail at the health checks.

The reason it gave for failing was that on every restart it would try running the pending migrations but encounter a file name match and exit with error.

To finally resolve this I had to,
1. first list all the docker containers: `docker container ls`
2. then remove the unwanted containers: `docker rm <container_name>`
3. restart the supabase container again: `supabase start`

There is no data loss when containers are removed, they are recreated by docker using already existing images and there is no relinking required either.

As a bonus troubleshooting content, the reason behind my migrations failed earlier were,
1. For function definitions, mandatory parameters are required to be declared in the beginning followed by all the optional parameters. If we mix the order of these, we get a syntax error.
2. For nested dollar quoting, the nested quotes are required to be named like `$inner$`

### Running Supabase Edge Functions Locally

My requirements was for a Worker to process my Redis Streams into the Database. My Redis Streams were two separate queues of heartbeat events and click events.

I decided to go ahead and make the worker as a Supabase function itself because I wanted to avoid any function authorization as much possible. My worker was required to access an unexposed schema, hence required higher privileges.

On hosted database, we can directly go to the Supabase dashboard and add the worker scripts plus setup the env. However in the local environment, we have to,
1. Run `supabase functions new <function-name>`
2. This creates a folder named after the function name within the `supabase/functions` directory of the project. It would have an automatically generated `index.ts` file.
3. The index file will already have a boilerplate that suggests the use of Deno to compile js or ts on local.
4. The supabase `config.toml` will have to be updated with the edge function configuration which looks like
```toml
[functions.function-name]
enabled = true
verify_jwt = false
import_map = "./functions/function-name/deno.json"
entrypoint = "./functions/function-name/index.ts"
```
5. To setup environment variables, add a `.env` file to the `supabase/functions` directory. Do not include any SUPABASE variables as those will already be available, instead add all the third party variables required by the worker. In my case I was using Upstash for the Redis Stream.
6. Run `supabase functions serve` in the CLI to before invoking the edge functions.
7. To manually invoke this worker, we need Postman or Terminal to run a POST request. Note that edge functions would require a service role key or an anon key to run. To get a service role key which is a JWT (not the secret key), use `supabase status -o env`.
8. If the keys are correct and still the function is failing, try making sure `verify_jwt = false` in the config. There is a unsymmetrical and symmetrical JWT mismatch leading to token match failure error.
9. I also had to troubleshoot around permissions because my worker was using functions which has `postgres` authority but still failed to access the unexposed schema. The only way to access these schema is to make the worker functions use `service_role`. Ensure these functions are not access to anon, public or even authenticated users.
10. Another Security Headsup: If the worker or edge function is using security definer functions or views - make sure everytime to explicitly revoke permission to public, anon and authenticated.

---
If you enjoyed reading this do Subscribe, if you are on desktop you'll find the button on left side menu. And if you are on mobile the best option is clicking this [subscribe to my weekly updates](http://eepurl.com/i8vmEk)

---

### Update Supabase CLI

Simply run `brew supabase upgrade`. The next time you run `supabase start` - any new image files will be downloaded.

### Relink Supabase to sync local and remote project

I get a following message in terminal
```
WARNING: You are running different service versions locally than your linked project:

supabase/gotrue:v2.186.0 => v2.188.1

supabase/storage-api:v1.48.28 => v1.48.20
```

Run `supabase link` -> the terminal shares a dropdown to select the project, select the accurate project by the project_id and then start supabase again in CLI.

### Creating Local Branches in Supabase CLI

My problem was that I already had my local supabase running an experimental migration. And now since I was building a new feature - I wanted to avoid that migration being deployed to production. Hence branching my local supabase was a good solution.

However, branching is only available for Pro plan which costs 25 dollars monthly. Too much for a one time requirement.

What I instead did was try a bunch of things,
1. `supabase branches create <branch-name>` -- I attempted to create a branch via CLI - which told me I am not subscribed to Pro (however if I look at my local repo there's a `.branch` file now)
2. `supabase branches list` -- I wrote a command to see all the branches - and I could see a default main branch but without a git branch. While my local repo already had git initialised and new branch created, I was doubtful that supabase would detect this.
3. `supabase db reset` -- without expecting much I ran db reset, and yes it somehow created the new db based on my current git branch
4. So I did not create two separate branches but managed to have the Supabase local tuned with latest branch - so I am not blocked. My git branches has record of those trial migrations so I could run a migration up (post switching my local repo to that branch) anytime I want them back.

|ID|NAME|DEFAULT|GIT BRANCH|WITH DATA|STATUS|CREATED AT (UTC)|UPDATED AT (UTC)|
|---|---|---|---|---|---|---|---|
|project_id|main|true||false|FUNCTIONS_DEPLOYED|2026-04-14 15:56:01|2026-04-14 15:56:01|

