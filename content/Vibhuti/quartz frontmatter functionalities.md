---
title: Testing of Quartz Frontmatter Functionalities
date: 2026-01-24
---
This is a page created to test and understand behaviour of all frontmatter properties. My intention was to be able to create better urls that are more SEO compatible.

Some learnings,
1. The properties like `permalink` or `slug` do not work into defining the url
2. The Obsidian note title is solely considering for url construction, which means I have to ensure the obsidian note title is url friendly
3. The frontmatter `title` should be the actual natural language title of the page, this can be changed while keeping the obsidian page url (title) canonical

I also wanted more flexibility in recording created and modified dates. When I add `last-modified` date as a frontmatter - this results in the last modified being considered as the date to sort the Folder and Tag lists.

Need to figure out a way to record modified dates while sorting by created date only.