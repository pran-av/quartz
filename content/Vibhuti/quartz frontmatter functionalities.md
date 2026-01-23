---
title: Notes for writing SEO & UX friendly blogs
date: 2026-01-24
---
This is a page created to test and understand behaviour of all frontmatter properties. I am using a static site generator called *Quartz*$^1$ which is built on *Obsidian*$^2$. When I write and deploy obsidian markdown, it goes through a set of transformers that convert it into HTML and render Static Pages while preserving Obsidian functionalities like Graph Views, Callouts, Tags, etc.

## Create SEO Friendly URLs

Some learnings,
1. The properties like `permalink` or `slug` do not work into defining the url
2. The Obsidian note title is solely considering for url construction, which means I have to ensure the obsidian note title is url friendly
3. The frontmatter `title` should be the actual natural language title of the page, this can be changed while keeping the obsidian page url (title) canonical

>[!note] Repairing URLs for Old Notes
>
>Since I have all my old notes written considering Obsidian Title as natural language, this has led to irregular urls that are indexed by Search Engine. Any attempt on changing the names of my notes will result in new page creation which will give 404 on search clicks. Hence I cannot easily repair my urls now. 

## Styled Syntax for Code

This functionality was already available as a transformer Plugin in the cart - however it was not default, hence I had to enable it in quartz config.

Not if I declare the name of the language in the code block, it gets the relevant highlights. Example below:
```ts /SyntaxHighlighting/ title="quartz.config.ts"

plugins: {
	transformers: [
		Plugin.SyntaxHighlighting(),
	],
}
```

## Record Last Modified Date without impact on ordering or RSS

I also wanted more flexibility in recording created and modified dates. When I add `last-modified` date as a frontmatter - this results in the last modified being considered as the date to sort the Folder and Tag lists.

Need to figure out a way to record modified dates while sorting by created date itself.

---

### Resources

$^1$ [Quartz - Static Site Generator](https://quartz.jzhao.xyz/)
$^2$ [Obsidian - Graph based Note Taking Client](https://obsidian.md/)
