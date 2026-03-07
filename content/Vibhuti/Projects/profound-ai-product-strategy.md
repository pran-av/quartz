---
date: 2026-03-05
title: Exploring a product strategy for Profound AI
---
# Context

Today, while browsing through X, I saw a post from Anuj Rathi that they are looking to assemble the best product team in India - and I thought I would give it a shot.

I was in middle of a marriage hall, I DMed Anuj a link to my latest product [Pitch Like This](www.pitchlikethis.com) and my portfolio.

He replied back to try Profound AI and to share a Product Strategy if the product interests me.

# Trying Out Profound AI

The product for the consumer market - for individuals who feel Linkedin is not enough for them. Linkedin is not able to see what makes them unique. The idea is to have personalized agents to help you progress in your career goals - the user archetypes are wide: someone searching for a new job, someone building a team for their startup, someone who wants to explore the unique stories they have in them, or others who wish to be upto date with the hiring market.

I observed some congruency with Pitch Like This - where I am trying to improve the conversions of one closing a job. This includes tools to help them apply better and faster or reaching out in unique but standard ways. The archetypes for PLT are: those searching jobs and those searching clients as freelancers or in longterm those selling their products.

So while Profound AI is an agentic personalized broad linkedin-esque services, PLT is a set of tools to sell one's skills better and faster.

## Commentary from the Landing Page

- The landing page pitch of the product is presented in a TypeForm like fashion you scroll down read bits and then decide to SignUp. SVGs enrich the experience - making it feel not just text. The scroll is smooth - design is simple white and clean.
- "Athletes have agents, Actors have representatives - You've never had either": So the product is going to be agents helping us with our career tasks. I think the timing is Great, this will happen to ever single services. Healthcare, education, travel - everything is gonna be more personalized with agents, its clear and people are racing towards this - Speed is Gonna Matter a Lot!
- "LI is Software 2.0. Agentic Linkedin is Software 3.0" - vagueness of LI eroded by the personalisation of Profound AI.
- "AI changes everything" - yes it does however we all should note that how we gonna build our systems and architecture and how long we are going to think is what is going to make and break the product. At this point anybody with fingers can make agentic workflows. There's still a battle - there's still gonna be a war! That's the attitude necessary.
- CTA - Chat with Voice AI Profound for 15 minutes. Awesome loads better than typing! However I need to find a peaceful time and location - getting people started will be a task here but the most interested one will need no push. Otherwise notifications, incentives.

So my initial product strategy instincts here are:
- We have multiple archetypes: but a single entry point. The CTAs can be more to take in more people with different interests and possibly different Aha moments. **More doors.** 
- Rethink on the user and payment journeys for each archetype. Do we need a freemium model? How do we ensure every onboarded user goes through the profile generation agents?

## Talking with the Voice Agent

- I observed no instance where the agent misunderstood me. There were no cases of cross talk - good pauses. The agent understood perfectly what I meant. Good with long and short form speech.
- I had someone at the door, so had to pause once. Agent checks if I am still active and continues where we left.

**Possible Betterments:**
1. Seemed to hectic to discuss my entire career in the same talk - was exhausted and thirsty at the end. Had the urge to wrap things up.
2. UI visualisations can be better as each stage of career is recorded - context on how many questions remaining.
3. Did not receive the report instantly and not within the next 24 hours either. No Profile or dashboard sections - as the app seems MVP at the moment.

### Should the user be able to text chat as well?

I might have started interacting early on with the app if text was also available as input. I had to schedule to mind a room and time.

Same architecture runs multiple input formats, so there is no special dev effort required in allowing chat. And if Chat is gonna take the user to the Aha moment early over rescheduling for Voice - then it's good to have Text Input as well.

# The Target Market

In the message that Anuj shared on X - he mentioned on building for top 1% of professionals across the world. A few questions here: What do we mean by top professionals? Why top 1% specifically?

From what we have observed from many AI workflow applications like ChatGPT, Manus, Perplexity etc - the one's who pay for agentic optimisation of existing workflows are the ones who spend a lot of time manually doing these tasks and the ones who have one-time but very specialised requirements (like deep research).

Hence 1% professionals would mean paying customers for agentic tools, and their behaviour includes:
- High **time spent** on career or networking tasks - searching for jobs or people to hire, applying to jobs or reaching out to candidates, developing case studies or portfolio that demonstrate their learnings
- Skilled workforce with rich past experience - the ones who can communicate and articulate well. Any agentic tool will only be useful if an individual has experiences to share.

A good approximation would be 10 million users globally.

### Behaviours to Look Out For

1. **People pay for Net Impact over Credits:** Its easy to launch a new SaaS. Users will try many similar apps before paying for the best one. While its sensible to pay for credits in generic tools like ChatGPT - but specialised tools like Profound AI should market the net impact and possibly monetise the impact itself. The moat is the surety of the system delivering predicted impact.
2. Personal Agents will make purchase decisions for humans: We have to not just convince humans, but also agents. Website for humans alone will not be enough - we would need markdowns and widgets that agents could try.

# High Level list of Ideas

1. **Distributed UI:** The Agent Workflows should be built to distribute across multiple UIs and across multiple input formats - voice and text. Say for instance can be deployed to Whatsapp, Telegram, Linkedin, MCPs in the form of widgets or APIs.
2. **Retrieval Strategy:** This is very crucial as it directly defines how good the product quality will be. Only good products retain. The most efficient process would be to first *infer* user inputs and then chunk the inferences and then vectorise the chunks. These chunks, vectors, metadata would have to be relationally mapped in a hierarchy to make the context retrieval powerful. Graph database would be a good idea if we are going to compare multiple users in future (which I believe Exa is doing) - otherwise relational mappings would still be great.
3. **Single Flow multiple Solutions:** The flow remains consistent with chatting with the agents - however every chat could develop into multiple solutions. For instance: "Recording a Work Experience", "Updating a Resume", "Finding a perfect-fit company for my experience". These solutions are **Doors to Enter** and hence I believe our journeys should start by users opting specific solutions. This also expands our surface area for marketing and word of mouth.

