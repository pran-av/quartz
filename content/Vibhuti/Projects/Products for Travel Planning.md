---
date: 2025-05-29
tags:
  - "#product"
  - "#raahi"
---
This research goes through the current solutions in the market to simplify travel.

## Perplexity

The Perplexity Web App has a Travel section where users can query to get a list of places with requested details.

The 'Places' section has the real use case - as unlike LLMs that will provide answer is chat format, Perplexity will list it down in a Map based UI. If you click on the 'More Info' the map zooms to show more details like address, phone, website, timings, and place tags. Shows ratings, but does not show reviews - for reviews the user will have to go to the Google Search. 

Summarizing reviews with Gemini will make this better. There are checkmarks for each Place cards which might be derived from review summaries.

Perplexity Solves For:
1. Information Accessibility
2. Engaging UX with the map interface

Cons: 
1. Only available in Perplexity desktop - neither in android app or Mac app. However its easy for them to bring to all devices if need be.
2. The user has to enter a query to get an answer, otherwise the app does not engage the user to explore on curiosity basis (except for some pre-curated answers for popular places)

![[PerlexityTravel.png]]

The UX used by perplexity is not new - many travel apps like Trip Advisor and Make My Trip already have similar experiences to help user plan their trip. However the key difference between travel specific apps and Perplexity is the Objectives differ for both!

**Travel Apps:** Wants to drive revenues to their existing products by letting users engage with a new way of planning.

**Perplexity:** Wants to provide efficient Search for Places - low latency and easy to explore.

## Make My Trip

Take example of MMT, you can find hotels over a map which is more convenient - and this functionality is available almost everywhere from AirBnb to Oyo.
![[Screenshot 2025-05-29 at 9.09.19 PM.png]]

MMT has this Where2Go feature, where each location is listed with a curated list of places to visit. These are static - and the main goal of this page is for user to easily Book Trip -> Travel -> and Stay.

AI is integrated in the form of Chatbot Myra where you can ask them question to get recommendations. As the AI answers the questions and suggest itineraries, it will also suggest similar packages to complete your bookings.

![[MMT_where2go.png]]

MMT also has Holiday Packages where you can add custom activities in an already planned itinerary.
![[mmt_holidayPackages.png]]

## Roam Around

URL: https://roamaround.app/
An AI based travel itinerary planner built by Praveen in 2023 (pkp.io). As per his twitter the product was getting a 1000 to 1500 dollar per day income through subscriptions. Most likely it was launched on Product Hunt and has 1 lakh + users as per the website and 10k + downloads as per play store.

The features are simple,
1. User enters destination, duration of trip and interests to get a ChatGPT (most likely) planned itinerary.
2. The Places are listed below the itinerary which redirect the user to the Google Places webpage for each - where user can easily browse through reviews and details.
3. Clicking on place hyperlinks in the itinerary takes user to https://www.viator.com/ where people can book guided tours.

What's it solving for -- based on the feature, it seems to be convenience. People do not want to research.

Monetization: 5 USD for 30 tokens, 10 USD for 80 tokens and 15 USD for 150 tokens

From app reviews,
- People do not like the token system - they have to view an advertisement to get a free token otherwise purchase


