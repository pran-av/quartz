---
date: 2025-12-06
tags:
  - product
  - saage
---
These are the learning I have derived while working on [[Building a better 'OpenToWork' feature|elevator pitch app]]. I implemented a RLS policy via cursor early on with the project, I had to frequently start migrations to make fixes within these policies or had to create helper functions for these policies to work. So, finally I am just diving a bit deeper to avoid any longterm issues.

I believe, its better to avoid any extensive use of AI to alter databases once a project goes to production. Most importantly because there comes a privacy issue, and second that wrong queries can really make things unrepairable or data can be lost forever.

I know a bit of SQL so I think won't be as hard to figure out, let's see.

## What does RLS do and when to implement it?

RLS sets the scope of data sharing - the minimal data policy. If the application is requesting tickets for a single user it is expected to query `SELECT * from tickets WHERE user_id = 123`, the `WHERE` clause ensures only tickets of a particular user are shared, ensuring scope is defined.

To achieve this the application or the client has to ensure that they always query with a `WHERE` clause and only the data that is required.

So if Application A and Application B both are using the same database - they both have to ensure a `WHERE` clause is used. In such scenario the data policy might differ by application.

A rather robust way to create a "policy" would be the maintain centralised rules on what actions is allowed and restricted. And this policy should align with data requirements of all the applications using the database.

The solution is to enforce policies from the database engine - and this is achieved by enabling row level security on databases and further customised by adding policies for each table. For advanced use cases we can create certain helper functions and then execute those functions in the policies.

Back to the questions - when to implement RLS and policies? The answer is ALWAYS. But the better question here would be when is it a priority to implement RLS policies?
And for that the answer is whenever there is sensitive data within the database. Data can be business sensitive as well as PII sensitive - if a database is public information like list of movies, then RLS does not remain a priority. We can still implement to ensure application robustness or have better control.

>[!note] Note
>Enabling RLS and not adding any policies sets a "default deny" behaviour from the database where all operations will be denied even for authorised users.

## Brief on Database Operations and Policy Behaviours

The primary operations that happen over a database are to Create, Read, Update, and Delete - which is known as CRUD.

The SQL commands for each of these operations are,
`SELECT` means to read or retrieve existing data
`INSERT` means to create new by adding rows
`UPDATE` means modifying existing data
`DELETE` means removing existing data permanently

The behaviour clauses are like IF statements, if the condition satisfies allow operation, otherwise restrict.

`USING (auth.id = current_user_id())` - current_user_id is the function that collects and returns requestor users id from the application

`WITH CHECK (boolean)` - this is validatory for incoming INSERT or UPDATE options where we want to verify data authenticity before executing operation

### Permissive vs Restrictive Policies

Consider a table has multiple overlapping policies saying when to run SELECT operation.

The **Permissive (OR)** allows action if atleast one of the policy is valid. Example user has role A but does not have role B -> Allow them the action. Here users having both roles will also be allowed.

**Restrictive (AND)** ensures to only allow operation when all policies are satisfied. Example: SELECT queries only possible if user has multiple roles.

These are simplified examples, I think we can manage most use cases within a single policy per operation.

## A general framework to set RLS policies

Here I'll try to use a framework to set some policies for [[Building a better 'OpenToWork' feature|elevator pitch app]].

**Step 1: Know the Schema**

I have two databases - `auth` and `public`

The purpose of `auth` is to manage the authentication. This might include PII data more prominently than the `public` database.

The purpose of `public` would be to provide application services and manage authorisation/usage based on payment plans, etc.

`auth.users` is the only table with `auth.users.id` as the primary key. The primary key syncs with `public.users.user_id` whenever a new user is added. I decided to maintain 1:1 identification for users to avoid unnecessary elongation of query chains.

For the `public` schema let's try to chain in the primary keys across all tables - this later helps setting up validations for the policies.

`public.users.user_id = projects.user_id` ->
`projects.project_id = campaigns.project_id` ->
`campaigns.campaign_id = leads.campaign_id` & `campaigns.campaign_id = client_services.campaign_id`->
`client_services.client_service_id = case_studies.client_service_id`

**Step 2: List down the permissions**

Let's try to list what external applications can do and cannot do on our database.

`authenticated users` are logged in users with a record of their identity in users table
`guest users` are unauthenticated or anonymous users

`SELECT`
1. An authenticated or guest user should *not* be able to view `users`, `projects` and `leads` not belonging to them
2. An authenticated or guest user should *not* be able to view `campaigns`, `client services`, `case studies`, and `widgets` that are not under their ownership
3. An authenticated user should be able to view the list of all `projects`, `campaigns`, `client_services`, `case_studies`, `widgets` belonging to themselves
4. Any authenticated or guest user should be able to view `campaigns`, `client_services`, `case_studies`, `widgets`  for any *currently active campaign*

`INSERT`
1. The application should be able to register new users in the `auth.users` and then sync this with `public.users` where `public.users.user_id = auth.users.id` and `user_email`, `is_email_verified`, `last_login_at` should be synced. `created_at` would be current date time of entry. `current_payment_plan` will be default `free`
2. Only an authenticated user should be able to create `projects`, `campaigns`, add `client_services`, and `case_studies` under their ownership
3. Only an authenticated or guest user should *not* be able to create `projects`, `campaigns`, add `client_services`, and `case_studies` for another user
4. An authenticated or guest user should be able to submit leads into `leads` table for any campaigns in currently active state

`UPDATE`
1. Only an authenticated user should be able to update `campaigns`, `client_services`, and `case_studies`, `widgets`, `leads` under their ownership.
2. Only an authenticated user should be able to update `users`,`projects` under their ownership.

`DELETE`
1. Only an authenticated user should be able to delete `campaigns`, `client_services`, and `case_studies`, `widgets`, `leads` under their ownership.
2. Only an authenticated user should be able to delete `users`,`projects` under their ownership.

>[!note] Note
>I want a functionality where the columns of the `campaigns` and subsequent tables shall only be edited when the campaign status is DRAFT. However the campaign status can be switched irrespective of the current campaign status. This leads to a catch-22 situation.
>
>We will manage the logic for DRAFT (and any column level accessibility) on application level instead of database.

**Step 3: Convert permissions into policies**

`auth.users`

| Policy Name         | Command  | To Role         | RLS Clause (`USING` / `WITH CHECK`)                                                                               | Purpose                  |
| ------------------- | -------- | --------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `users_self_select` | `SELECT` | `authenticated` | `USING (id = current_setting('app.user_id')::uuid)`                                                               | View own PII only.       |
| `users_self_update` | `UPDATE` | `authenticated` | `USING (id = current_setting('app.user_id')::uuid)`  <br>`WITH CHECK (id = current_setting('app.user_id')::uuid)` | Update own PII only.     |
| `users_self_delete` | `DELETE` | `authenticated` | `USING (id = current_setting('app.user_id')::uuid)`                                                               | Delete own account only. |

`public.users`

| Policy Name         | Command | To Role         | RLS Clause (`USING` / `WITH CHECK`)                      | Purpose                                |
| ------------------- | ------- | --------------- | -------------------------------------------------------- | -------------------------------------- |
| `users_self_manage` | `ALL`   | `authenticated` | `USING (user_id = current_setting('app.user_id')::uuid)` | Full access to own public user record. |

`public.projects`

| Policy Name             | Command | To Role         | RLS Clause (`USING` / `WITH CHECK`)                      | Purpose                        |
| ----------------------- | ------- | --------------- | -------------------------------------------------------- | ------------------------------ |
| `projects_owner_manage` | `ALL`   | `authenticated` | `USING (user_id = current_setting('app.user_id')::uuid)` | Full access to owned projects. |

`public.campaigns`

| Policy Name               | Command  | To Role         | RLS Clause (`USING` / `WITH CHECK`)                                                                            | Purpose                                     |
| ------------------------- | -------- | --------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `campaigns_owner_manage`  | `ALL`    | `authenticated` | `USING (project_id IN (SELECT project_id FROM projects WHERE user_id = current_setting('app.user_id')::uuid))` | Full access via ownership chain.            |
| `campaigns_public_active` | `SELECT` | `public`        | `USING (status = 'ACTIVE')`                                                                                    | Guest/Auth users can view active campaigns. |

`public.leads`

| Policy Name          | Command  | To Role         | RLS Clause (`USING` / `WITH CHECK`)                                                                                                                                     | Purpose                                                |
| -------------------- | -------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `leads_owner_manage` | `ALL`    | `authenticated` | `USING (campaign_id IN (SELECT campaign_id FROM campaigns WHERE project_id IN (SELECT project_id FROM projects WHERE user_id = current_setting('app.user_id')::uuid)))` | Full access via ownership chain.                       |
| `leads_guest_submit` | `INSERT` | `public`        | `WITH CHECK (campaign_id IN (SELECT campaign_id FROM campaigns WHERE status = 'ACTIVE'))`                                                                               | Guest/Auth user can submit lead if campaign is active. |

`public.client_services`

| Policy Name              | Command  | To Role         | RLS Clause (`USING` / `WITH CHECK`)                                                                                                                                     | Purpose                                          |
| ------------------------ | -------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `services_owner_manage`  | `ALL`    | `authenticated` | `USING (campaign_id IN (SELECT campaign_id FROM campaigns WHERE project_id IN (SELECT project_id FROM projects WHERE user_id = current_setting('app.user_id')::uuid)))` | Full access via ownership chain.                 |
| `services_public_active` | `SELECT` | `public`        | `USING (campaign_id IN (SELECT campaign_id FROM campaigns WHERE status = 'ACTIVE'))`                                                                                    | View active services (via active campaign link). |

`public.case_studies`

| Policy Name             | Command  | To Role         | RLS Clause (`USING` / `WITH CHECK`)                                                                                                                                                                                                                | Purpose                                         |
| ----------------------- | -------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `studies_owner_manage`  | `ALL`    | `authenticated` | `USING (client_service_id IN (SELECT client_service_id FROM client_services WHERE campaign_id IN (SELECT campaign_id FROM campaigns WHERE project_id IN (SELECT project_id FROM projects WHERE user_id = current_setting('app.user_id')::uuid))))` | Full access via ownership chain.                |
| `studies_public_active` | `SELECT` | `public`        | `USING (client_service_id IN (SELECT client_service_id FROM client_services WHERE campaign_id IN (SELECT campaign_id FROM campaigns WHERE status = 'ACTIVE')))`                                                                                    | View active studies (via active campaign link). |

## RLS can slow down the Application

The reason why to avoid any overcomplicating the policies. Additionally certain users might end up in a scenario of roles, authorisation and other mesh where the database rejects their actions.

The basic policies to implement can be limited to,
1. Only the owners can access write operations over their data
2. Certain data is restricted for view outside of owners themselves
3. Some user data is accessible for all users authenticated or unauthenticated

### Use Centralised Database Functions

A function to fetch campaign ids can shorten the long queries in tables below the campaign hierarchy. This is one of the ways to consolidate logics within different RLS policies at one place - and would help make the fetching faster.

>[!note] Debugging RLS Issue on Supabase
>
>While I was writing this, I was also debugging my app because it was facing rejection from RLS policies for a particular table where an `INSERT` operation was required to be performed by an anonymous user.
>
>I am scripting down my experience of resolving it at [[Setting Up Row Level Security Policies]]. Head over there for more RLS stuff.


