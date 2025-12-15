---
date: 2025-12-15
tags:
  - "#engineering"
---
In software development, hooks are like **interactive zones** for user and the system, where the user can pass additional information, give updates, or change decisions based on information available till the hook was triggered -> the **system can then take new actions** or continue as per plan based on the new information.

A user may not have to manually interact with the system every time a hook zone is nearby - they can have an automation that passes new information or do the same indirectly based on user's action. 

1. A user clicking 'download' button on website is a direct user action with the client. Now client passes this message to server so they can prefer the file requested by the user.
2. A user might create a server side script that downloads a report every Monday morning - this saves them being available for the click. This is also possible through hooks.

Below we look at the **React Hooks** which are functional components part of the React library that helps modular frontend development. **Webhooks** are another well known type - the way we use these hooks differ, we use it to communicate between two different systems over web protocols.

## `useState`

This is a variable that we use to store the current state of a element - this element should be something that is dynamic meaning it will change based on user action.

**A simple example:** A from *Submit* button, when the user clicks on this button the state of the button changes to *Submitting* - this avoids multiple clicks and communicates to user that their action has been triggered.

**How to use it?** Say we want build the example we described above.
`isSubmit` - stores the current state value
`setSubmitting` - is a trigger that we utilise to change the value of isSubmit

Later we collect the value of `isSubmit` as required in the HTML

```
// Import component from Library

import {useState} from "react"

// Create a Function

export function Form (){
	// Set a variable to hold value and function as trigger
	const [isSubmit, setSubmitting] = useState(false);
	
	
	return (
		// Implement the state as required in UI
		<h1> Fill the following Form </h1>
		<button 
			onClick = {() => setSubmitting(!isSubmit)}
			label = {isSubmit ? "Submit" : "Submitting"}
		>
			// button text and submission functionality
		</button>
		
	);
}

```

## `useEffect`

This is reaction to an action kind of a hook. Normally used for external systems like interacting with APIs.

 If no array is added in the syntax, then useEffect runs on every render.
 If empty array `[]` is added, runs ounce per mount
 If array has a state or some other prop value, runs when the value changes

```
import {useEffect} from "react"

useEffect ( () => {
	if (captureFormData === true) {
		reset
	}
}, [isSubmit]);

```

## `useRef`

Like useState and useEffect - referencing does not trigger re-renders and is used for internal system references necessary to build a functionality. These can be referencing to different sections or containers within a website.

```
import {useRef} from "react"

const sectionRef = useRef("hero section");
```

