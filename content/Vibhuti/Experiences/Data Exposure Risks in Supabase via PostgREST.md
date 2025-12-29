---
date: 2025-12-24
tags:
  - engineering
---
## Always add valid RLS policies for `public` tables

If we are using Supabase every table in the `public` schema has a automatically generated public endpoint. And those who are familiar with postgREST might be able to figure out the endpoint by knowing the names of the tables.

The project URL along with anon key can be easily found from inspecting the webapp. And with all this knowledge we can open Postman and pull out the data.

Hence when creating tables in Supabase within the `public` schema, very important that all tables have Row Level Security enabled. Even configuring RLS as `USING (true)` or `WITH CHECK (true)` is same as having no RLS setup.

If the app is not supposed to display any user generated content to the public - in that case RLS can be pretty simple by saying each user can only operate their own data. This can be done by clicking on one of the suggested policies in Supabase.

## Where things become complex

However if some tables are to be configured for UGC readability, then there are many factors getting involved. Selecting the role for the policy, handling multiple policies with same operations, optimising queries for performance, using functions and so on.

Supabase has an AI Assistant that helps with these policies, but the risk factor is too huge compared to any other use case of AI. The Supabase AI can be configured to not read the data within the tables and just read the tables and the column structure.

## Try hacking your application yourself

Testing should always be done - but if we are using AI Assistants and MCP server, better to put lots of time into hacking. Use Postman along with different user tokens and verify if APIs are accessible to users as intended.

If the Production database in on the Supabase hosted service, mirror a development database on your own computer using Supabase CLI. Setup git for migrations and integrate it into a deployment pipeline.