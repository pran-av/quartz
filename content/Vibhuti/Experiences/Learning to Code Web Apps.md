---
date: 2025-02-03
tags:
  - engineering
---
# Table of Contents

| Topic                                        | Sub Topics |
| -------------------------------------------- | ---------- |
| [[#Creating a Next JS App]]                  |            |
| [[#Installing Web SDKs within your project]] |            |

## Creating a Next JS App

Next JS is a framework that uses components from React library. Next JS has features like Server Side Rendering which gives us flexibility to create server components within the web app. To create a new Next JS project, take following steps:
1. Run ```npx create-next-app@latest my-next-app```
2. Before installation, the package manager asks a bunch of questions like
	1. Whether to install **Typescript** or stick to Javascript? Typescript allows better type safety which lead to lesser runtime errors.
	2. Whether to enable **ESLint**? Linter for JS and TS which ensures code consistency to avoid bugs and maintain code quality.
	3. Whether to create a **directory**? Can opt to create a `src` directory that can house app and components.
	4. Whether to use **AppRouter**? Allows efficient server actions.
	5. Whether to install **Turbopack**? Allows easy deployments for Next JS
	6. Customization of **Import Alias**: To make importing of nested paths easier a '@/*' is used
	7. Whether to install **Tailwind CSS**
3. Preview the project in locahost by using `npm run dev`

## Installing Web SDKs within your project

If a CDN method is not available to import an SDK, then the SDKs have to be self hosted by importing them into the project, preferably within the Public folder.

Once imported within the public folder, the reference paths for all documents in public are `/folder_imported/file.js` - the entire relative path is not required to be added. Public folders are for static assets, the SDK can be considered static as the code within SDKs is not changed.

**Can we add SDK files within the `src` directory?**
It is recommended not to have the SDK files within the `src` folder, as the source code within `src` goes through a bundling process while building an instance. The SDK code will go through an unnecessary bundling which is not useful.

**Import SDK through dynamic import or via script loading**
The SDK has to be imported into the source code files before initialisation of any SDK related functions. There are following two ways to import,
1. **Dynamic Import** - using `import()` function - Uses ES Modules to load javascript files, which means that the entire JS file is not loaded and instead import export happens in modules as functions are required - this is also known as **Tree Shaking**. This makes the code efficient. However, dynamic imports can only be made for JavaScript modules (.js or .mjs).
3. **Script Loading** - using `<script>` tag - runs the JavaScript file within the entire global scope through window object used with the browser. Script Loading can help us run any javascript file and not just modules. The loading is synchronous in nature (blocking the downstream functions) and does not support Tree Shaking.

To render Ola Vector Maps onto the web-app, I had to use Script Loading as Dynamic Import failed.

## Hide API Keys in client through Next JS Routes

When working with Ola Maps Web SDK, the APIs in the network call append the api_key as a parameter on every request, exposing my APIs. This section explores a solution for this issue,

