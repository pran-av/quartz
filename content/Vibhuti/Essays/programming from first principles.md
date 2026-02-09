---
date: 2025-10-06
tags:
  - engineering
  - "#book"
title: Understanding How To Program from First Principles
---
# Programming vs Coding

If I go a year or two back - the difference between programming and coding did not matter to me - I do not even remember having a thought of differentiating them. However, since the past year as AI has ventured into my engineering more often, I have felt a need to explore and reason a set of new questions in more detail. One of those questions being, in what part of software development is AI performing better than me - and is there a part where I rule?

This same question can be extrapolated philosophically to explore what USP humans have over AI in software development?

For me, **coding** becomes the part of the software development process which specifically focuses on passing the correct instructions in correct syntax to the machine. This is a region where AI is very good at.

While **programming** within software development is where the engineering or solving of the problem happens. More important part of programming is to know what to solve, figuring out how to solve that problem, and being able to solve the problem as planned.

Usually when I build a software, I like to focus on the problems and the solutions - I would happily let AI implement the code. Though its equally important for me to understand the code written by AI, since without it I cannot be sure if my programming is implemented.

# Functions as a Universal Concept

If I have to understand `functions` while being completely code agnostic and programming focused. Here are the key properties that make a function:
1. Identification
2. Inputs
3. Expected Outputs
4. How and When the execution takes place

Examples:
```ts
async function codeAgnostic (a:number, b:string, c:boolean): Promise<[number, string, boolean]> {
	return [a, b, c]
}
```

Here, the property 4 of "*how and when*" is defined via `async` - it promises a future array of numbers, strings, or booleans as an output for a, b, and c as input with known types.

Functions can be declared in many ways, the above is called a *static declaration*.

However the same function we can  be declared as,
1. Function as a Value
```ts
const codeAgnostic = async (a:number, b:string, c:boolean): Promise<[number, string, boolean]> => {
	return [a, b, c]
}
```

2. Functions as a Method
```ts
const obj = async function codeAgnostic (a:number, b:string, c:boolean): Promise<[number, string, boolean]> {
	return [a, b, c]
}
```

The way we declare does not change the 4 fundamental properties we explored. 
# Javascript and C++

My introduction to coding was in high school where we learnt C++. Hence all of my code reading skills come from how well I learnt C++.

Since I am exploring JS, it becomes easier for me to think in terms of where JS relates and does not relate with C++.

Where it relates:
1. The structure - having variables, types, operators, objects, functions, comments.
2. Expressions end with a semicolon
3. Operators are similar including compound operators like +=
4. Conditionals and Loops are same if ...else, switch, while, for
5. Global and local variables work in similar way to the Scope in JS

Where it does not relate:
1. Implicit coercion of variables, variables have a function of holding *state of the program*
2. Loose and strict assignment operations
3. Static vs Dynamic Typing: We can define all types with var or use const, while in C++ we specifically use int, float, string, etc
4. Uses `//` for single comment and `/* ... */` for multi-line comment
5. Blocks do not need a semicolon
6. Just in Time compilation and runs immediately, making it act as an interpreter of code. While C++ compiles way ahead of time.
7. In C++ classes are blueprints and objects are their instances. In JS we create objects and clone more objects from prototype objects to delegate them work.
8. C++ allows control over memory

## Notes

1. `use client` - this is a directive that tells the framework to treat the module in a certain way (module for context is a text file of code), in this case the module is treated for frontend operations.
	- Modules or components marked with this directive are not rendered on server side, hence any logic in such modules have to wait for the client to run.
	- Overuse of this directive may increase bundle size and affect the load times of the website
	- Cannot use server side data fetching functions like `fetch` when a module is declared with this directive
	- Cannot directly call any Node JS APIs, API routes need to be created to fetch server data
	- Hydration: HTML static code on server side when rendered for functionality on client side, this process is called as hydration. 
2. `export default` -  Each module can have a primary export which can be called in other modules by any name and without curly braces, only by referencing the module. 
	- Example: `import AliasName from '@/app/home'`



