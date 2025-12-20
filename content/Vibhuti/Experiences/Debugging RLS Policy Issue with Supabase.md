---
date: 2025-12-07
tags:
  - "#engineering"
  - "#saage"
---
This issue delayed my deployment by 2 days. I had to put in a lot of hours, I started with letting AI handle it but I had to jump in when it started going in loops. During this time I also learnt a lot about how to make RLS policies which I documented at [[Setting Up Row Level Security Policies]].

>[!warning] Context
>**Requirement:** An un-authenticated user should be able to INSERT into a table with RLS policy enabled.
>
>I kept receiving "rls policy restricts entering new row for this table" no matter how I change the RLS query.

## Primary Issue was not RLS

Even simply adding `WITH CHECK (true)` or `USING (true)` would result into INSERT failure, meant the issue was more than the query itself.

I got the hint of the solution when I randomly visited supabase github to find this: [RLS Policies Not Being Evaluated for Anon Role](https://github.com/supabase/supabase/issues/40488|)

The user had an exact same issue - no matter the query combinations one tries. An un-authenticated user cannot INSERT rows.

The suggestion in this discussion was to authenticate the user as a Guest, they won't have to signup, instead we will fetch their JWT and verify anonymity and assign them an ID. Now for supabase this user is an **authenticated** user and the RLS policies somehow find this easier to digest and allow INSERTIONS.

When I play with this on Postman - the JWT tokens that are returned for anonymous users do not simply work in authorising these insertions. We have to insert the httpOnly cookies as auth to make it work in Postman. So the Magic Link process and Anonymous Sign In both seem to be following the PKCE where tokens are verified and replaced with cookies in the browser.

Overall I think its better to have an anonymous user do a insertion in my table rather than a ghost. This should have been the plan from the start.

## Playing with the `to` clause

The `to` clause in Supabase enables us to assign target role for the policy. My `INSERT WITH CHECK (true)` works for `to = public` and `to = authenticated` but does not work with `to = anon`. Public means union of all roles, so it must be working because authenticated is part of the list.

## Verifying Leads Insert RLS

Now I want keep INSERT with a single policy as desired and for rest of the operations make a set of two restrictive policies so that only permanent users can operate on their own data. For these as well I will simply keep `to = authenticated`.

So I kept `INSERT WITH CHECK (true)` and tried changing `SELECT USING (check if not anon)` - the updation of SELECT somehow led to permanent users not being able to fetch their leads in dashboard.

While this was confusing - my `projects`, and `campaigns` tables already have a ownership chain - hence an anonymous user token was anyway giving an error of "no projects found", hence I decided to not complicate the `leads` RLS and just keep them true.

## Ownership Chain on other Tables

The dashboards are only populating data of leads only belonging to a specific owner because `campaigns` and `projects` have an ownership chain.

Same when I tried to FETCH projects via postman using a specific token, response does not include other owner projects and campaigns.

The SWITCH operations gives a clear unauthorised when a non permanent user tries to perform it. Which is great.

## Ensuring Cookies are authentic

Cookies are stored httpOnly on SignIn flows. Have to ensure they are cross site secure before deployment.

I also compared hashes of different anonymous users and permanent users to ensure that new tokens are being assigned for each user - and this is working fine with all types of users. I could have saved time skipping this verification but some of my silliness led to doubts and I had to find it.

A good takeaway from this was: never judge the tokens by the way they look haha.

## Scope

There is a lot of scope to improve the current policies, many seem irrelevant to have and can be removed, but I am gonna push this down the priority and get going to allow stalling this project.

Maybe I'll update this same blog later.

## Time to finally fix RLS

Okay - I am writing this section 1.5 weeks post I wrote the above sections. The application has been live for public use for more than a week now - a few bunch of beta testers tried it out. I am now fully focused on marketing, but there are two development blockers,
1. APIs are slow
2. Dashboard needs Onboarding

Today I'll be focusing on making my Postgres DB and its APIs to make them faster. So the next part of our RLS series is over here: [[Making my Postgres 'DB operation' APIs faster]]