---
date: 2026-03-17
title: Designing a flow where humans connect with AI representatives
---
# Context

Like Linkedin, every top 1% professional - currently limited to Engineer, Product Manager or Designer - should have a Profound Profile.

Making a profile on Profound involves having a conversation with AI. It takes over 30 minutes to complete the entire profile. So our first user persona is a **top 1% EPD across the world who is willing to engage with AI over a call**. Let's call these our "Professionals".

Once a profile is generated - it can be either shared or people can land onto it. What kind of people can land on a Profound profile?
1. If an investor has a profound profile - people would like to make pitches or ask for company building advice.
2. If they are at leadership level in EPD - people would want advice on their field.
3. A hiring manager would want to know the details of their experience.

So likely every person from a student to a very experienced professional would likely reachout. Unless there are frictions. Let's call these "Visitors".

Frictions like:
1. Why would someone be interested to chat with AI? Who would be willing to chat with AI?
2. What are the topics someone would be interested to discuss with AI?
3. The Professional would only be interested to actually meet when the Rep discussion are interesting enough.

# Parts of a Profound Profile

I built my own profile post having a chat with the Profound AI - and here's what it includes.

1. **Stories** are the core part which are atomic units: they describe a particular experience at a company on a specific role. So if there are 10 core experiences within the same role and company, it means 10 stories to share. Quantitative outcomes are part of the stories.
2. **Edges** are skillsets: Post chat, AI analyses the discussion and identifies these skillsets - these skillsets have Evidence which are the stories. So from stories come Edges.
3. **Talk to me About** and **Open to Meet**: Describes the topics the professional is interested in discussing and who they are actively looking to meet.
4. The third part is **Characteristics**: What energises the professional, what drains them, how they make decisions, what is the best working conditions for them. This is something which a recruiter would specifically be interested in.
5. **Path**: The trajectory of career - companies worked in and period.
6. **Metadata**: Includes Bio and About

# Connecting on a call with the Rep

1. Run a pseudo check on if Pranav is available right now. Post check inform the Visitor that Pranav is not available however they could connect with Pranav's AI Representative over a call and they would get back.
2. Then inform the user how a call with AI representative works: Mention steps and what they could expect: The AI will converse like a human asking questions based on the coversation, the rep will stick to the topic of discussion and inform if we are diverging, mention the controls that the visitor will have - they can schedule and initiate call whenever they find a good place and time, they can pause and start the conversation in the middle, then can close or disconnect the conversation and initiate as many calls as they want, the user can decide not to send the conversation post completion or restart a new conversation.
3. What happens once the call is completed: A summary of the conversation will be generated and the Visitor can review this summary before sending it to the Professional. Once sent the professional will be informed about the conversation and they would be notified if the professional requests a followup discussion.


