---
date: 2025-05-21
tags:
  - "#product"
  - "#raahi"
---
# Context

Human lives revolve around places. Places to experience food, places of worship, places for vacationing, places to experience an adventure, and on and on it goes.

Consider you are in Mumbai and want to experience Vada Pav, how do you know which place to visit? You Google 'Best Vada Pav in Mumbai', you get a list and you check the reviews starting from the ones closest to you - you do this either on Google Search or Google Maps. In Maps you will likely do 'Best Vada Pav near me'. Another option is asking a friend - a referral. If a friend tells you go to this place in Mumbai for best Vadapav - you don't care about the reviews or how far is it - referrals skip the need for reviews and distance, but you'll still search the place to check the ambience, or if there is enough parking for your car, or is it open at this time or not. If it is a restaurant, you'll anyway need to search and reserve a table.

Search is simply inevitable! And when it comes to places there are thousands of subjects to search upon. How many apps do you currently use for searching places? How much time do you invest in searches about places? Can we modularise search for places?

This is where this idea is about, "Bringing efficiency, efficacy, and joy in Search for Places".

# Objectives

How many apps do you use for searching places?
1. Browsers - to find a lists for a query like "best saloon in town" (webpages with a mix of structured and unstructured information) -- **Time Consumed = HIGH**
2. Google Maps - for navigation, ambience, reviews, timings  -- Time Consumed = MEDIUM to HIGH
3. Socials - Instagram and Youtube for discovery, vibe, ambience, sharing -- **Time Consumed = MEDIUM**
4. Specific Apps - zomato for reservations and menus; district, luma, and bms for events; mmt and tripadvisor for vacations -- **Time Consumed = LOW to MEDIUM**, as it has structured content with filters on easy UIs

> **Objective 1:** Improve efficiency in searches for places, reduce time consumed while preserving the flexibility to search anywhere on web, socials, or thousands of specific apps

How effective are your searches?
1. Finding answers to your specific questions - A place which is a hidden gem or not touristy enough may not have certain questions answered or might be difficult to find those answers. A place which is very well known may have answers differing widely leading to vagueness. -- **Chances of Inefficacy = LOW to MEDIUM**
2. How accurate are the answers that you get - Hotel Sandeep in Dattawadi Pune known for mutton speciality does not have the best ratings on google, but turned out good in actual experience. Another hotel in Pimple Gurav had good reviews, but few of my friends experienced food poisoning. -- **Chances of Inefficacy = MEDIUM to HIGH**
3. Do the answers help you reach to a conclusion - Are you able to summarize the answers and conclude, are you able to share the answers to reach group conclusions, are you able to structure the unstructured answers, are you able to visualise to reach faster conclusions. -- **Chances of Inefficacy = MEDIUM to HIGH**

> **Objective 2:** Improve efficacy in searches for places, get accurate and consistent answers - track real experiences through continuous learning techniques

What makes planning fun?
1. **Curiosity** to explore digitally - acts as a warmup/hype to actual physical exploration. Videos and images work the best. Concise and structured texts work best for details. -- **Accessibility = GOOD**, social media makes digital exploration very accessible
2. The want for **predictability** - humans feel safe and confidant when expectations are predictable on an overall scale. This varies however subjectively - people also like having spontaneous plans, but spontaneity is only fun as a subset of predictability - imagine going to a resort to find it completely booked! -- **Accessibility = FAIR**, real time traffic, weather, crowds, pollution, disaster data availability
3. **Completing tasks** - Planning a trip is full of small tasks, completing each of them releases accomplishment hormones. Fixing a date with friends, booking the travel tickets, booking the stay tickets, finalising the destinations, etc. -- **Accessibility = FAIR**, some tasks are easy while others like bookings can be tedious
4. Expecting **desire fulfilment** - expecting physical and mental desires like having great food, experiencing culture, the thrill and uncertainty of an adventure, the accomplishment in a sport, being socially extroverted. Conditioning the plans to maximise desire expectations. -- **Accessibility = BAD to FAIR**, BAD in terms of specific bitesized desires, like living in a hotel with beach access and the beach should have certain degree of privacy and no pollution. FAIR in terms of generic desires like having a fish thali in Goa.

> **Objective 3:** Optimize for *The Fun* in planning through a User Interface and Experience that itself is a great value proposition

# Customer Archetypes

Genz and Late Millennials travelling through or residing in Western Europe or North America. These folks have,
1. Lots of friends
2. Money to spend on leisure and experiences
3. Up to date social media to share everything
4. Curiosity to explore new experiences

## Value Propositions
1. The most important and generic questions regarding each node (places) should be answered without having user to engage with call to actions (churn elements)
2. But also, the user should be able to optionally converse to ask very specific question for which data is not available in the existing node
3. All new discoveries regarding a place to be added to the node to make it stronger
4. The user base should be rewarded to update statuses of places to make each node richer through user-generated or verified content.
5. Each user has a global persona which is used by the app to share and generate specific insights. The persona is built over the time without needing to overkill the onboarding flows.
6. **The user does not need to deal with the vast web directly but still has access to the real time web know how** - APIs and MCP Servers can search through the web to get specific and relevant details
7. **The user should be able to get real-time weather, traffic, travel and disaster alerts** - MCP Servers that look for breaking news or track weather services with proves record. Latest AI based weather models can also be used.
8. The user should be able to view images for places or food for ambience and visual comfort
9. The user should be able to browse through reviews for the place or get a summary of the all the reviews to make a decision
10. **The user should be able to access key instagram reels or youtube videos related to the place, a summary would be helpful:** Reels can be the most viewed once for generic quality or visuals and the latest ones to check the most recent state of the place
11. **The user should be able to get a summary for data from specific food, events or bookings app:** check if zomato, bms, tripadvisor has MCP servers to connect with
12. The UX should engage with the user's curiosity: The UI should feel structured enough but also offering flexibility and ability to be spontaneous. Like randomize a place or food to try.
13. The UI-UX should reward users to complete small tasks while planning big trips
14. The UX should suggest activities that the user may like based on their persona

# MVP

## Goals for the MVP
1. To check **if people will use a specific app for searching places and food while avoid generic tools** - will they avoid generic LLMs like ChatGPT if there is a more specific option, or will they avoid Zomato to find places to dine, or will they avoid Maps to plan travel.
	- Point 1 can be only verified if we solve 1 or 2  biggest pain points for the customer
2. To identify if users will pay for the service. Also identify the **user to customer churn** for western markets with disposable income.
3. The MVP should **generate network effects or viral loops** - made for the customer segment that has money to spend, travels or eats out often, and shares a lot. Ideally age group 18 to 30.
4. Validate technological architecture required to solve the problem at scale - where to use LLMs, Agents, etc

## Idea

**BUSSIN'** (genz for dank, lit, fire -- used for exceptional experiences with food and events)
Theme: Yellow Font: Bubbles
![[Bussin'-2.png | 450]]

Target user has very less attention span - the app has to create an impact within the first 2 minutes. There is no time for AI to think, so the AI should have thought already before even receiving the user query.

**Strategy:** Choose a small entry market (a city like Paris) -> Scrape, Prompt, Create exceptional experiences for the selected locality which an agent can fetch quickly, make it personalized and share -> Use LLM as a medium between User and Database/Model.

**Flow:**
Personalized - need to know the user, however should not look like a chat or onboarding journey. The UX can be a canvas with pictures of great experiences (collage) - the user selects one in each view for the AI to record the user's taste.

Example: What do you prefer in a rainy weather? Options show a bunch of activities or experiences. Based on experiences can go a step deeper, like if Food is what they wish to experience then go for types of food.
Gamify this as a rapid fire round so that the user does not loose interest and we get the answers within attention span.

Once the rapid fire is over, the user can keep exploring experiences displayed on the app or Query their specific requirement.

**Monetization:** Number of searches a day. 1 free search per day and then paid to use for the rest of the day. Can buy monthly for beta - later yearly and monthly on wider rollout.

![[bussin.png|450]]

## MVP Timelines

Preferably Webapp. Mobile app might take time? Specifically iOS which would be the first preference for western markets.

### Architecture
1. A User Persona Knowledge Graph: Build while the user uses the app, basic persona built in first few seconds
2. An Experiences Knowledge Graph
3. An Agent Querying the above two for a personalized response
4. An Internal Tool to build knowledge graph around experiences
5. Frontend optimized for the User - Agent Interaction through modern agentic UX techniques

### Tools
1. **Agent** - Gemini Reasoning - Preferable as it can add additional context related to places, maps, weather, etc
2. **Knowledge Graph** - [Graphiti](https://github.com/getzep/graphiti) - Opensource tailored for AI agents so that knowledge graphs are built without having to recompute them everytime. Build context aware, historical timed, user experience graphs, and structured data from scrapes, models etc
3. An **Internal Tool to Build Knowledge Graphs** through Scraping Data of a locality places, foods, menu, and any other sources.
	1. [Serp APIs](https://serper.dev/) can google search places, images, videos, news etc
	2. [Brightdata MCP](https://github.com/luminati-io/brightdata-mcp) picks the best method among SERP and other APIs and scraping methods to collate data relevant to the query input
	3. [Playwright MCP](https://github.com/microsoft/playwright-mcp) is possibly better at scrapping
	4. [Firecrawl MCP](https://github.com/mendableai/firecrawl-mcp-server)
4. **Frontend App** - nothing specific

### Timelines

Considering a Javascript Webapp with Python Backend hosted over CI/CD tools like Netlify or Render. Can use Supabase to fastrack databases and authentication.

**P0 - Internal Tool to build KG for Experiences**
2 Weeks

**P0 - Agent and KG Integration over an app backend**
1 Week

P0 - Frontend with Auth and UI/UX
1 Week (can happen parallel to above two)

**P1 - Monetization flow for measuring intent**
0.5 Week (can just take intent to avoid delays with gateway integration, might need to try [DoDo Payments](https://dodopayments.com/))

