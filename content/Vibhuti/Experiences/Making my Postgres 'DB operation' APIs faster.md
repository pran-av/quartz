---
date: 2025-12-19
tags:
  - "#engineering"
  - "#saage"
---
This has unintentionally become a third part of the RLS series.

**Part 1:** [[Setting Up Row Level Security Policies]] - I try to frame a stepwise approach on how to setup the first iteration of RLS policies

**Part 2:** [[Debugging RLS Policy Issue with Supabase]] - I debug an Insertion operation related issue that returns RLS violation, while we do not end up identifying the root cause of why RLS fails here - we bypass it by recording a JWT fingerprint for all guest users.

**Part 3:** Which brings us to this part. My product is live as a BETA. 
1. I had an instance where a tester reported not being able to create a Project because of RLS restriction - this was an error specific to a user, and not global. 
2. Second, the production APIs for database operations are really slow - I am going to have a huge churn if I do not fix them.

----

# Identifying the root cause of the problem

Earlier I had a single database for both prod and dev - but now I have diverged into independent services, so hopefully I am not gonna break prod.

>[!note] Supabase CLI for Dev Database
>I used Supabase CLI to create a copy of production database for my development server. So the RLS, functions, and schema are exact replica of production versions. I even have the Supabase Dashboard helping me manage my dev database.

Let's review CPU and Memory stats in both the databases,

## API Gateway

The following stat says average API response time is 769 milliseconds in PROD, we have to reduce it below 300 milliseconds.

![[api_response_speed_pre_changes.png|450]]

I don't have to same report for dev likely because the volume is less - however from manual testing APIs are executing easily below 300 ms.

## Query Performance

Dev says:

![[sb_query_performance_params.png|450]]

Prod says:

![[sb_query_perf_params_prod.png|450]]

**Good News:** There are no queries specifically related to our tables that are flagged as slow - the queries flagged are postgres queries that run for internal dashboard updates or to assist our tables.

Like for instance `pg_timezone_names` is listed as the slowest - I am gonna ignore these for now because as per google these are to be expected and I cannot do much about them other than indexing. And I don't indexing is gonna solve this either, the timezone table has just 100 rows - I am not sure what's making it slow or why it is being flagged so.

### Cache Hit Rate

Number of cache hits by total requests. Cache hits are better because the server can then skip querying the database.

The database is too small (30MB) to have this metric tell us much. The disk space available is 7.7 GB for a free Supabase project - so our database fits entirely into the memory.

Its good to keep an eye on this as we scale - for Postgres CHR should be above 95%.

### Average Rows per Call

I misunderstood this metric, yeah fell in the pit of thinking it should be low. To explain this metric in simple terms,

>[!quote] Its better to *request your wife* or *order your husband* a list for the groceries to purchase over the weekend rather than them telling you items one by one as they remember

In the above example your wife will start a batching operation if you ask for a list, she will collect all requirements until the batch fills up - this saves us loads of processing time in terms of request -> processing -> response.

For web simple applications, average rows per call should be between 10 to 100. However that can be taken to 100 to 500 if the application if there's logic based UI operations. I think my app falls in this category.

Currently the metric is not much relevant because the volumes are less - however when we get more traffic, we got to run more optimisations and take this above 100.

When there's less number of rows per call - there's a high probability of network chatter which is not energy efficient. Lots of energy spent in security handshakes, encryption-decryption, metadata, and storage.

Counter to this an extreme amount of data shared with client can as well affect the client side performance or lead to leaks/mismanagement. So this is a metric which requires balance.

I am going to try running some `EXPLAIN ANALYSE` queries in production to identify how our queries are performing.

#### Does number of concurrent requests affect rows per call?

Even if there is a single beta tester on the app - the rows will be returned as per database driver configuration. Concurrent users fight for CPU - hence the metric in this case will be **Requests per Second vs CPU Usage**.

If an application is slow while having minimal requests per second, the likely causes are,
1. The queries are heavy and require indexing (generally will not be a major cause of issues if tables have less than 100 rows)
2. The fetch size is low leading to a lot of round trips in fetching data.

Supabase has max 1000 rows per requests as a default setting. So we can eliminate both these issues as being the root cause.

So **Bad News:** We don't have a root cause yet. Let's keep digging!

## Infrastructure

### CPU Usage

Defines the processing power that we have available. Supabase gives us a free Nano server which is a shared CPU, I am not sure of the cores.

Regardless we do not need to upgrade anything here for a while, CPU Usage is just at 2.5%. Ideally should be in range of **40% to 70%**. And in case there are bursts leading to 80% or above we should consider scaling - at 95% server will start freezing.

Factors involved:
1. Missing indexes
2. High concurrency
3. Complex SQL queries with JOINs

### Memory Usage

Supabase free version provides us with 0.5GB. Our current usage is at 40% daily average. Ideally should be **70% to 85%**. Needs upgrade before it starts average more than 90%.

Memory Usage is relevant in context of Working Set - meaning amount of memory usage per user is our metric here over total database size. Database size will matter when we are running out of Disk Space, which Supabase provides 7.8 GB available for use.

Factors involved:
1. Working Set size
2. Memory Usage per User (Projection)

### Disk IOPS

Refers to input output operations per second. This is directly in relation to cache hit rate and max rows limit that we have set. If Max rows is extremely low and data is not available as cached - there will be a lot of I/O traffic for disk to handle.

We are safe here as well as it is just 1% of total bandwidth (Supabase allows 43Mbps in bandwidth for free and burst limits are 2085 Mbps). Ideally should keep this **below 80% capacity**.

Supabase uses SSDs so the latency must be around 3 milliseconds.

Factors involved:
1. Very less rows per call
2. Heavy operations like logging or backups

### For Scaling Infrastructure

If in case I have enough usage to scale up,
1. **Vertical Scaling**: all I need to do is move from Nano to Micro or Small compute size - it will increase all the three categories above.
2. **Optimisations** for scaling should include: A separate replica db for SELECT operations, using Redis for additional caching mechanisms.
3. **Horizontal Scaling**: As a final step have multiple servers, when a single server starts reaching its limit


## Security and Performance Warnings

Now coming to the part where I think we will find our root causes. There are 40 Warnings in the performance advisor, at first glance it looks like we can optimise are existing SQL queries.


### Running `Explain Analyze`