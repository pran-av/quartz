---
date: 2025-11-01
tags:
  - "#infinitylearn"
  - product
---
>[!context]
>One of the core education products of Infinity Learn were the Live and Recorded Classes. The Online Classes product was entirely vertically managed by the in-house teams - which meant,
>1. The business team used to decide on the market requirements
>2. Based on market requirements the academics team would design curriculums
>3. The content team would collaborate with academics and develop a course
>4. The product team would package the course and define pricing
>5. The marketing and sales team would bring the customers
>6. The operations team would onboard the customers onto the product
>7. The academics team would continue the learning of onboarded students
>
>**📍Smart Batching was a seat allocation product for online classes and hence included many of the above stakeholders**

# Goal to improve activation for Online Classes

- Every time a sale was completed, the student would instantly start receiving the services for their purchase.
- However for online classes (which included live classes which were recorded for later reference), students or the parents of the students would need to answer a call from the Operations team to confirm their preferred Class Timings, Day Preferences, Language Preferences and more depending on the type of course purchased.
- Ideally the operations team would call the parents within 24hrs of their purchase
- Since every course had limited seats the operations team would pitch based on real time availability of seats.
- If the parents/students were unreachable or if there were allotment conflicts - **the student would have to experience their first class 7 days post purchase**.
- This was a big problem because Online Class was a flagship product and customers would ask a refund if they could not get the Aha moment quickly.
- Hence the goal was to improve Online Class activation while managing the complexity of preference collection and batch enrolment and also develop flows for collecting modification requests.

>[!success]
>Class Activation TAT before Smart Batching: **24hrs and upto 7 days in case of escalations**
>
>Class Activation TAT post Smart Batching: **Within a few hours or immediately for 60% students**. 40% cases required a manual followup.
>
>Manual followups had a productivity improvements as well. Instead of having a detailed chat on phone call, operations team would send a link which would open a dashboard for collecting batching preferences.

# The internal discussions before building

There were multiple requirements presented to the product team which were directly or indirectly relating to the batching bottleneck:
1. The operations team wanted batch selection to be a mandatory field to be selected by customer during the purchase itself (before the user makes the payment)
2. The sales team wanted to focus on sale and keep batch selections as optional in case customer wants to give preferences pre payment
3. The engineering team wanted to implement a solution which was scalable meaning a customer can update their batches without leading to complications with their orders and its transactions
4. The product team wanted the class activation metric to improve without compromising any revenue metrics and avoiding any form of shift from roadmap (complexities of problems can lead to revised priorities)

# Bringing all teams on the same page

**Step 1:** My first action was to meet the Operations Team and understand their processes and approaches in detail. I summarised every learning in the form of a PRD.

**Step 2:** Next I brought the details up in discussions with product leadership to build a rough sketch and philosophy for solving this problem. We finalised a philosophy as follows,
- Prioritise customer experience, privacy and ease over everything else. Ultimately this was going to drive conversions and lead to activation growth.
- Build for scalability considering dependencies on all other systems like Purchasing Flows, Orders and Transactions, Refunds and Cancellations, Compatibility with Future Programs, etc
- In case any trade offs were necessary - prefer internal productivity trade offs over revenue or usage metrics

**Step 3:** Next was a thorough discussion with engineering leadership to explore all the solutions we had on the table and rank them based on impact and cost. Some highlights from this discussion,
- We segregated the solution into two systems: The first system would understand user preferences and make relevant suggestions, converging towards their final confirmation. The second system would enrol user to their preferred batch post verifying all minimum payments are completed. The second system handles any conflicts like seats becoming full.
- Batching Algorithm: The first system had to collect preferences and output the best matching batch. Users could select multiple preference parameters including size of batch, weekly frequency and timings of classes, the medium of instruction and others. Hence we had to weight the preferences.
- Batch filling Strategy: The operations team had to ensure that demand for all batches was roughly equal avoiding any supply constraints. The algorithm had to 
- Stepwise Batching: Instead of filling batches one after other, we decided to fill all batches to 30% capacity and then further 50%, 70% and then 100%. This was to ensure the unit economics per batch remained stable (the cost of coaching varied by batch size).

**Step 4:** Wireframing and User Stories. Wireframes were shared with designers and User Stories with engineering. Did back and forth with both these teams until everyone was confident. 

**Step 5:** A figma prototype that design team developed was presented to all stakeholders to establish expectations and collect any final feedback.

**Step 6:** I prioritised the stories and connected with engineering manager for sprint planning. We collaborated to finalise delivery dates. As the product went into development, I attended scrum calls either to clarify any doubts or keep rough track on progress so I could be confident on the release dates I promise.

**Step 7:** Collaborated with QA team to answer any doubts regarding the acceptance criteria and later complete the User Acceptance Testing (UAT)

**Step 8:** Release, Training and Tracking. Pre and post release we held training sessions for sales, customer success, and operations team members to address all scenarios where the smart batching flow came into play.

# Learnings

The reason why I titled this story as '*building for future*' was because this project was a starting point for a bigger ultimate vision,

>[!quote] The vision was to build a separate Subscription Management Dashboard for the customers so they could make changes to their orders, download invoices, choose batches and countless other actions - everything self serve.

We solved an individual problem statement improving time it took for learners to watch their first online class - what I call **time to delight**. This reduction in time to delight ensured second order impacts,
1. more learners activated than before
2. since the users were immediately batched post their purchase, they would watch a live or recorded class with a single button click - we reduced our costs of getting the user back on the app specifically to activate
3. since the new system was transparent and learner initiated, we reduced escalations where learners claimed to have not received their preferred batches

And the biggest second order impact was that this project led to a separate Subscription Management dashboard where all Batch Confirmation, Batch Modification, Batch Change Requests, Order Modification Requests, etc would be self serve.

This I believe also gained us some **trust points** from future customers. A sales person could now say "we offer you full flexibility to make changes post a purchase and this does not require back and forth with multiple people, we do not create unnecessary friction for you, you can simply go onto this dashboard and make any request directly to our system".