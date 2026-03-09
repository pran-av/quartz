---
date: 2026-03-09
title: Pitch Like This PRD for Resume Scoring Feature
---
Pitch Like This is a platform for job applicants, freelancers and sales individuals to pitch and convert opportunities. Below is the Stage 1 of Agents Service for Pitch Like This (PLT) where the user creates their profiles, adds Resumes and compares them with JDs to get a match report.

# User Types

1. A Job Applicant: Aims to apply for jobs and secure one

2. A Freelancer: Aims to pitch their services to clients and secure a freelancing opportunity

3. A Sales Person: Aims to pitch and get customers for the services or products of a company

Based on user type the agents below might request different data input or the flows might differ entirely - currently consider that we are only serving user type "job applicant". Hence we do not need to design any other flows other than for the job applicant.
# Stage 1 Requirements

The Client App = the UI and UX for the user

The Agent Service = the logic and agent orchestration required to serve the agentic features of the client app

1. A Job Applicant Logs In or Sign Up into the Pitch Like This (PLT) Studio [Client App already has Auth Flow - users are authenticated and authorised in the client app, the User ID is collected from Client Side]

2. The user is onboarded through the Profile Builder Agent that asks questions relevant to identify current expertise and map user goals. The data shared by user is indexed for future reference. [Requires Development - Client App only has a profile section with name input field, this same profile section has to be enriched from inputs received via the Profile Builder]

3. The Profile Builder Agent collects the resume from the user (pdf format), parses it, vectors the data to understand user expertise and stores the learnings for later use. The resume input is versioned - the user should be able to ingest multiple resumes of different kinds. Note: Everytime a new resume is added to the profile, it is vectored and stored to understand the user - if later user uses the same resume to compare with a JD we do not need to reporcess the resume unless the user adds a fresh version during that process. [Requires Development]

4. If the user does not have a resume at the moment, they can skip the step and add later via the Profile Section of the Client App. The profile builder agent hence should allow skipping, while the client app will allow a user to visit Profile and add Resumes anytime. [Requires Development]

5. At any point of time when user comes across a Job Description, they should be able to input it as Requirement (as a URL or a copy pasted text in an input field). An agent filters necessary data from the input for further process. [Requires Development]

6. On JD Input - we ask the user if they have a specific resume to score the JD with or we should rely on an already existed resume added during the onboarding. In case no resume exists in the profile, the user will be necessitated to upload to proceed with the task. [Requires Development]

7. An agent Compares the Resume and JD, Keyword Matches based on profile context collected earlier and generates a report based on the scoring mechanism. [Requires Development]

8. The final report is stored as a task output and the report is downloadable by the user anytime in the future by logging into the Studio Client App [Requires Development]

Describing the above Requirements in more details,

## Onboarding and Profile Builder

Our objective is to have an agent led voice or text conversation with the user during their onboarding journey to improve onboarding conversions and ensure all users start with an enriched profile making it easy for them to use any features.

What we want to avoid: Agent asking questions out of scope or user inputs that trigger long conversations. The agent should focus on the user being onboarded.
1. Identify User Expertise: Fields of Work - Years of Experience - Highlights of each experience. This can be fast forward by ingesting a PDF resume if available, otherwise user can skip questions and add resume later.
2. User Goals: Roles they want to apply for, The part of the role they are most excited about, Their deadline to switch or apply till, Types of markets they are excited to explore next. Goals should be collected without skipping.
3. Collect User References: Linkedin Profile, Blog Site, other Websites for projects etc. Skippable.
4. All data collected is parsed, analysed and stored against the user profile and fetched for semantic searches/context requirements in future.
5. If user enriches the profile in future by adding resume or editing goals or links - it should lead to an updated profile version. The profile should also classify the User Type which would be either of the above mentioned types derived from the User Goals.
6. In case the user has misunderstood the use case of the app or have not figured out yet, this agent is responsible to ensure the user falls in a specific user types which leads to the onboarding becoming successful.
7. A user can input many different versions of resume in their profile meant for different types of JDs or roles and hence we allow user to remove old ones or keep multiple, parse and vector each of those. Example: For instance a Product Manager can have separate resumes by role Growth or by market Fintech.
8. In case the user goes to profile and removes their resume - we keep the vectored context of the resume but mark it as not to be used as context.
9. Filter Idempotent Context: A user may delete and re-add the same resume with same or different metadata like name etc. In such cases we need to identify same or similar vectors to now repeat store the same context.
## Resume Scoring Feature

When the user inputs a JD, their intention is to apply for the job. Hence our objective is to provide them enough insight on the JD, their resume fit or suggestions that would improve the chances of them getting an interview.

1. First, we would collect the JD input as a URL or a copy pasted text. With URL we could fingerprint the Job from the internet - meaning we would get the Job ID, Company and other context that might be missed when a user copy pastes the JD sections into a field. However copy-paste is also allowed as it is universally feasible for cases where JD is behind an auth or in a formatted document.
2. We validate if the input is JD and extract the metadata from the JD and store it. And then proceed to identify sections that are relevant for us to score the resume.
3. We error handle in case URLs cannot be accessed - pasted content is not relevant or any such errors that totally block us.
4. Next, the user can select the resume for which this JD has to be scored - if they have added X resumes in the profile, they can select any one from a dropdown. If they have none - they need to add to proceed. A resume addition triggers the flow where we parse and vector the context from the resume under the user's profile.
5. We let the flow proceed with the scoring mechanism which includes dimensional scoring, structural scoring, and flagging mechanisms as a brief.
6. A scoring report is the output of this entire flow. The output is vectored and stored for user to access anytime from the Client App. The vectoring helps us keep context about the user.
7. Each comparison request is a task from the client where this agents server completes it and maintains the history of results with task ID.
8. Filter Idempotent JDs: The JDs have to be understood and learnt for the scoring of resume purpose - however we do not need to vectorise JDs for longterm context and also they do not fit as context for the user's profile apart from the history that the user computed this JD and likely market applied. Hence not expecting vectoring but history for JDs and if the job was applied, received an interview or otherwise.
9. This flow is built from the context that a User can visit the Client App request a review and come back later to check the report. A Notifications system should track the progress and communicate when done.

## Agent Graph Flow

By now, we have two flows which include agents:
1. Onboarding and Profile Builder Flow: An agent is actively communicating with the user with a goal to identify their goals, ensure the use cases align, mark their user type, answer any FAQs without diverging and trigger profile enrichment. Another agent or maybe just a function as is technically feasible - does the job of collecting resumes post upload, parsing them, collecting the meta data, vectoring the context of the resume, storing it as a versioned resume with a active context flag. This second agent/function is callable at different processes within the app - for instance when the user adds a completely new resume during the Resume scoring flow.
2. Resume Scoring Flow: Here we have the JD being understood for the purpose of resume scoring and then all items within the resume scoring mechanism are triggered. The flow of new resume input makes a cameo in case user adds a new resume.
### Maestro Agent

The client will usually share tasks like "ingest resume" or "initiate resume scoring".

We might need a maestro agent or an orchestrator that can identify tasks and trigger a structured and predictable behaviour with every task. And if not understood, request addition human clarity or respond with a cannot proceed decisions.
## Technical Architecture

Client App - Next JS UI and BFF - already live and running triggers all the tasks and is the sole user for the Agent Service we are building - we only answer requests from this app.

Agent Service - Separate hosted service in Python and FastAPI. Uses Langchain and Langgraph as agent frameworks.

1. Client App calls Agent Service for every Task -> Each Task is Queued -> Client is returned a task ID and status. Status is communicated live back to Client App using a WebSocket.
2. Agent Service queues task to Google Pub/Sub as Queue. Tasks when added are pushed to a worker.
3. Worker collects unique tasks and triggers Maestro Agent (or any agent based on implementation). It keeps the realtime status of the task updated. We use Cloud Run for workers. (If required keep atleast one instance active to avoid cold start, first try with just pub sub push, we will manually verify if any cold start is taking place)
4. The Maestro Agent triggers the Sub Agents and the Flows which in-turn queries Vector Database on a private `agents` schema, which is a Supabase PostgreSQL with pgvector.
5. Three types of memories are maintained within the `agents` schema:
	- Semantic Memory for Knowledge - vector storage with compatible indexing for conversational agent and search grade I/O.
	- Procedural Memory in the form of relational storage required to record agent state.
	- Episodic Memory in the form of hypertables which will be requred as history for conversations and tool results.
6. The Agents pause and communicate back to the Client if any Human input is required or else directly share the output.

Observability: Total token usage (total input and output separately, and total cache separately) is recorded for each task for analytics. Logs are maintained where crucial within the steps.

## Resume Scoring Mechanism

JD input format: URL or Paste in input box

Resume input format: PDF only

There are three mechanisms to scoring a resume match with a JD:

1. Dimensional Scoring - which scores for the structure and the key components that are expected from a resume. It follows a Rubric and measures signal strength for each dimension.
2. Keyword Scoring - this help avoid any ATS rejections as well as human rejections given experiences are mis-communicated because of missing keywords
3. Risk Flags - Flags do not impact the scores directly however they highlight an improtant aspect to be missing or needing attention. We assign a flag currently when,
	- one or many keywords declared as "must have" in the JD are missing
	- the resune is overqualified
### Dimensional Scoring

Role Archetypes identify the context about the job and the company from the JD. Based on the context we define the Scores that are to be used. This process is automated where once a JD is added we are communicated the Role Archetype, Seniority and Company Context of the JD and assigned a scoring template. However we would allow the user to switch each of these levers manually if they feel the JD expects something else. Single Select per lever.

**Role Archetype:** Execution heavy, Strategy-heavy, Technical depth-heavy, Growth heavy, Compliance heavy, Cannot be Determined
**Seniority:** Execution, Ownership, Portfolio, Cannot be Determined
**Company Context:** Startup, Scale Up, Enterprise, Cannot be Determined

Other non scoring related identifications: Company Name, Role Name, any Job ID if available, Location if available, Company Description and Company Industry (fetch from a web tool via an agent if not available)

We want fixed number of buckets in each sector above, hence if nothing falls in the category - we mark it as simply Cannot be Determined.

Now based on the final archetype we define a scoring mechanism for any Resume against this JD. Meaning once a JD is classified we should stick with the same scoring mechanism across all resume inputs. The user can however select a suitable scoring mechanism from a dropdown if they do not want an automatic setting.

The second part of JD is to identify the specifics and the related keywords to them:
- Must Have Keywords
- Industry Specific Explicit Keywords
- Explicit Metric Mentions
- Generic and Explicit Keywords

**Base Scoring Template (Dimension - Base Weight - Measurement Type)**

1. Experience relevance (title, duties, recency, seniority fit) - 20 - Rubric
2. Capability Alignment (conceptual alignment, problem types handled, domain fit) - 18 - Rubric
3. Measurable impact (metrics, KPIs, outcomes) - 15 - Rubric
4. Ownership & scope (owned features, team size, P&L, end to end responsibility) - 12 - Rubric
5. Technical / role depth (complexity, system design, craft) - 10 - Rubric
6. Evidence of execution (ship cadence, releases, demos, product launches) - 8 - Rubric
7. Tools & integrations (named platforms + context of use) - 6 - Rubric
8. Communication & format (clarity, ATS-friendliness) - 5 - Rubric
9. Education / certs (if relevant) - 4 - Rubric, but binary if JD lists mandatory certs
10. Cross-functional & behavioral signals (stakeholder mgmt) - 2 - Rubric

Above sums upto 100. But always normalize in case some of the above are not able to be computed and return null.

**Rubrics for Each Dimension**

Score = one of {0, 25, 50, 75, 100} or any interpolation.

1 — Experience relevance (20)

0 — No relevant roles; mismatch in title/industry; oldest experience only.

25 — Some related responsibilities but wrong seniority or old (>7 yrs).

50 — Clear partial match (similar role, fewer years / smaller scope).

75 — Strong match in role and domain; recency within 3–5 years; near-seniority fit.

100 — Direct match: title, duties, and recency align; meets or exceeds seniority and domain expectations.

Implementation notes: measure title match, overlap of top 3 responsibilities with JD, and recency score.

2 — Capability Alignment (18)

Assesses conceptual problem-fit (not literal keywords).

0 — Resume shows no evidence of handling the JD’s core problems.

25 — Some adjacent work; low overlap in problem type (e.g., consumer vs enterprise mismatch).

50 — Handles similar problems but limited scope or different scale.

75 — Clear evidence of handling same problem types, similar scale, some transferable systems.

100 — Demonstrable direct experience solving the exact classes of problems the JD requires (e.g., Q2C workflows, CPQ, revenue ops) with context.

Implementation: semantic match between JD problem statements and experience bullets (LLM or rules mapping).

3 — Measurable impact (15)

Quantified outcomes and attribution.

0 — No metrics visible.

25 — Generic statements with weak or unitless metrics (“improved engagement”).

50 — One concrete metric with partial attribution (e.g., improved X by N% but unclear baseline).

75 — Multiple metrics clearly tied to candidate’s work and business KPIs.

100 — High-impact, multi-metric evidence (revenue, users, conversion, cost) with time windows and attribution.

Implementation: parse numbers, detect units (%, INR, users), and map to JD KPIs; award higher when metrics match JD focus.

4 — Ownership & scope (12)

Depth of responsibility and autonomy.

0 — No ownership language; “assisted” or “participated”.

25 — Small feature ownership or short projects.

50 — End-to-end ownership of features or a small product area.

75 — Owned a product/major module or led cross-functional delivery.

100 — Owned major product/line, P&L, or led multiple teams; evidence of strategic ownership.

Implementation: look for verbs (“owned”, “led”), team size, and end-to-end phrasing.

5 — Technical / role depth (10)

Depth of technical craft or professional specialization.

0 — No technical detail or craft evidence.

25 — Basic use of tools/technologies with low complexity.

50 — Mid-level complexity: designed modules, automation, medium-scale systems.

75 — High complexity: architecture, performance, or advanced techniques.

100 — Deep technical leadership: scalable systems, design tradeoffs, technical decisions influencing product direction.

For non-engineer roles, interpret “technical depth” as role-craft depth (e.g., research methods for designers, analytics for PMs).

6 — Evidence of execution (8)

Ability to deliver repeatedly.

0 — No shipped work or ambiguous timelines.

25 — Occasional deliveries; no cadence.

50 — Regular feature releases or projects within defined sprints.

75 — Consistent cadence and ownership of release processes.

100 — Multiple concurrent programs delivered on schedule with process metrics (cycle time, velocity).

7 — Tools & integration evidence (6)

Contextual use of tools, not just listing.

0 — No relevant tools mentioned.

25 — Tools listed but no context of use.

50 — Tools used in context for single-stage tasks (e.g., testing, deploy).

75 — Tools used to enable cross-team flows or automation (e.g., payment gateway integration).

100 — Designed or owned integrations, platform-level tooling, or system-wide automation.

8 — Communication & format (5)

Readability, structure, ATS friendliness.

0 — Hard to read, inconsistent dates, strange formatting.

25 — Readable but verbose; minor structure issues.

50 — Clean structure, clear sections, but some long paragraphs.

75 — Concise bullets, metrics, good headers.

100 — Optimized for ATS and human skim — summary, bullets with metrics, skills section aligned to JD.

Automatic checks: parseability, presence of contact, reverse chronological order, page length.

9 — Education / certifications (4) — Hybrid

Use rubric except when JD lists mandatory certs.

Rubric:

0 — No relevant degrees/certs when JD expects them.

25 — Relevant degree but no specialized certs.

50 — Some relevant certs or coursework.

75 — Degree + relevant industry certs.

100 — Directly relevant advanced degree or required certs present.

Binary rule: If JD has mandatory cert (e.g., CFA Level II required), treat absence as Hard Risk (flag). If present, award 100 for that binary check, plus rubric for other education context.


10 — Cross-functional & behavioral signals (2)

Evidence of stakeholder management and collaboration.

0 — No cross-functional mentions.

25 — Occasional coordination mentions.

50 — Regular cross-team work, with named stakeholders.

75 — Led stakeholder workshops, alignment, or interlock.

100 — Owned cross-org programs with multiple stakeholders and measurable outcomes.

Now based on Role, Seniority and Company - add deltas on the base scoring.

**The deltas are as follows: Brackets indicate dimension # of the base score**


**Role Archetype**

1. Execution-heavy

+20% to Execution (6)

+10% to Communication (8)

−10% to Strategy/Ownership (4)

−5% to Technical depth (5)

2. Strategy-heavy

+20% to Ownership & scope (4)

+10% to Measurable impact (3)

−15% to Execution (6)

3. Technical depth-heavy

+25% to Technical / role depth (5)

+10% to Tools & integrations (7)

−10% to Communication (8)

4. Growth-heavy

+20% to Measurable impact (3)

+15% to Capability Alignment (2)

+10% to Execution (6)

5. Compliance-heavy

+25% to Tools & integrations (7)

+15% to Education / certs (9)

−10% to Execution (6)

4. Cannot be Determined

No change

**Seniority Modifiers**

1. Execution (IC / early)

+20% Execution (6)

+10% Communication (8)

−15% Ownership (4)

2. Ownership (mid / owns area)

+20% Ownership (4)

+10% Measurable impact (3)

−10% Execution (6)

3. Portfolio (senior / multi-team)

+25% Ownership (4)

+15% Measurable impact (3)

+10% Technical depth (5)

−10% Communication (8) (less micro-level)

4. Cannot be Determined

No change

**Company Context modifiers**

1. Startup

+20% Execution (6)

+15% Ownership (4)

+10% Communication (8)

2. Scale-Up

+15% Measurable impact (3)

+10% Tools & integrations (7)

+10% Technical depth (5)

3. Enterprise

+20% Tools & integrations (7)

+15% Technical depth (5)

+10% Education / certs (9)

−10% Execution (6)

4. Cannot be Determined

No change

**Formula for Dimensional Scoring**

`Final weight = base_weight[i] * (1 + total_delta_i) (total_delta_i is sum of deltas from the three inputs)`

Normalize all final weights so they sum to 100

### Keyword Scoring

Must Have keywords - 60 Points

Industry Specific keywords - 15 Points

Mentioned Metrics - 15 Points

Generic keywords - 10 Points

Total score should be 100.

Example: If the JD has 3 keywords of a certain category (say must have) and the Resume has only 2 of them. Then the points scored in must have become (2/3)*60.


**Rules to ensure unique distribution of keywords**

1. Ensure Exact as well as Semantic keyword matching

2. Must Have can contain any generic or metric or industry keyword that is specially mentioned must have in the JD. Otherwise they can fall in independent categories.

3. Industry, Metric, and Generic can be strictly mutually exclusive sets. Industry keywords has to align with Company Industry.

4. Tools like Figma, Javascript etc can be part of any keyword group above.

### Flagging Layer

- If a must have keyword is missing, while scores will compute that impact - also add a 'Must Have Missing' Flag as it can be an obvious reason for a resume to be screened. Add another flag for overqualified.
- If the user is overqualified in majority of the Dimensions, this is Dimensional Scoring specific flag. Use an "Overqualified" Flag
- If the user has overused keywords making the language unnatural or too artificial. Use an "Artificial or Stuffed" Flag

### Final Resume Score

Weightage for Dimensional Score = 70% and

Keyword Subsystem Score = 30%

Dimensional Score * 70% + Keyword Subsystem Score * 30%

Rubrics for final Score:

90–100: Excellent — strong chance to pass ATS and get interview.

75–89: Good — likely to get screened; address 1–2 gaps.

60–74: Fair — needs targeted edits (keywords/metrics).

50–59: Weak — high ATS risk; redo summary and add must-haves.

<50: Low — likely reject.

## Report PDF Structure

Resume report should be a PDF.

Mention the Resume Name and Version ID and Report Date to identify which resume the report is for.

Mention the JD Headline and Task ID to identify the JD that was compared.

Display the automatically determined JD Archetype at the top and mention the scoring mechanism selected. If the user selects a mechanism by themselves mention the scoring mechanism with means of selection as manual.

Display the Must Have Keywords, Industry Keywords, Metrics, and Generic Keywords separately. Display a total keyword subsystem score computed for all this keyword types combined.

Within the above Section colour code to identify keywords that are already part of resume (green) and those which are missing (red).

Tabular Display for Scoring for each dimension mentioned above - and share suggested changes for each section. Suggested Changes are determined based on what is lacking for each section.

A final line will mention the final overall score of the Resume

Disclaimer: This report is only a probability based on standard and logical practices of screening resumes through automated and human systems. Please rely on your own research for final decision making and rely on this report only as a tooling. We do not guarantee any shortlisting or interviews.