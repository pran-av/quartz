---
date: 2025-12-01
tags:
  - "#engineering"
---
Yesterday, when I was building the first phase of [[Building a better 'OpenToWork' feature|Open To Work App]], I named the root directory as 'OpenToWork'. When I ran `npm create-next-app` received an error saying the directory name does not follow naming conventions. This has happened to me before as well, hence to avoid future complication I had to do some research finding why such convention exists.

The **Package Managers** like `npm` and `pnpm` are expecting from us lowercase directory names, like snake_case or kebab-case or justlowercase.

The reason behind this is that UNIX/Linux systems are case sensitive, means they treat `hello` and `Hello` as different files or directories. While the Windoms or Mac operating systems are *not* case sensitive.

**To make our codebase interoperable its a good convention to keep everything lowercase.** 

So, I explored how naming conventions work across other systems.

## Database Management Systems

MySQL is *not* case sensitive while PostgreSQL, Oracle are case sensitive. For postgres,`"Users"` implies `Users` and no double quote `Users` implies lowercase `users`. If one wants to avoid double quoting everytime, good to stick with **snake_case as db convention**.

## Web Standards

Domains, paths, email addresses all prefer **lowercase** for system interoperability.

## Version Control Systems

lowercase preferable as systems like Git can be used across Windows or Linux servers. However there are some exceptions to files like README.md and LICENSE.md where Git has learnt to be same as their lowercase versions.

Here, based on the coding language the file naming conventions might differ. In Python, all files are `snake_case.py`. However in Typescript or Javascript, people like to differ component file and utility files by `PascalCase.ts` vs `camelCase.ts`.

## Naming Functions, Variables and Classes

As an observation,
1. Server Side languages like **Python, PHP, Ruby, C++ have `snake_case` for functions and variables**, only with the exception of **Node.js, Java/C#, Go who have camelCase for functions and variables**.
2. Browser languages like JS/TS have `camelCase` for functions and variables
3. Class naming is almost `PascalCase` everywhere

The different conventions have grown out of backstories of each of these languages. Server languages had to think of being operable on any servers globally while later developments like Node.js carried the conventions from JavaScript ecosystems.

## Public Files

I don't think there might be a rigid convention here, although in my repos I maintain images, prds, etc in `kebab-case`.