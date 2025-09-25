---
date: 2025-09-26
---
My plan is to first create a prototype on Google Colab to understand the structure towards making multi-agent systems.

I have previously worked on implementing a single agent for the Travel Planning product, we used langchain at that time as it was a pretty simple single command.

However, when it comes to multi agent systems - from what I have read CrewAI framework would be the best for prototypes. LangGraph is likely only worth it when we are developing a full fledged product that requires a lot of custom definitions to how agents communicate etc.

So this writeup is specific to Crew AI.

# Know what you wish to build

Unlike making webpages or websites where there is a scope of planning adhoc while building. For multi-agent systems its best to first plan exactly how the agentic process should function from start to end.

The framework that I am using involves,
1. Writing down the goal and happy flow between the user and the product
2. Identifying the tasks across the entire feature
3. Identifying which tasks require language models as agents (not all tasks need to be solved by LMs)
4. Briefly identify the nature or type of agents for each task (same agents can pickup multiple tasks). 
	1. Agent can be of conversational, research, analysis, planning, or of any specific type. Note: We are just roughly identifying the types here, while actually defining the agents the role and other details should be much more descriptive. 
	2. For instance: Within research type, an application might require a separate stock research and commodity research agents. Or otherwise we can define the role as a stock market expert and have a common agent for all types of stock market research. What is to be used depends on the output.
5. Identify the tools that will be necessary to complete each task

Following image displays the tasks, agent types and the tools for the tasks necessary for [[A Micro Learning Product]]
![[Tasks Agents and Tools.png|550]]

# Basics of Crew AI

There are following basic definitions,
1. Tasks - simplest job to be done
2. Agents - Individual autonomous entity assigned one or more tasks. Agents further have Roles and other parameters.
3. Crews - Setup an autonomous collaboration between multiple agents
4. Flows - Setup a controlled and procedural collaboration for agents

Some generic tips here are:
1. The tasks should be as simple but descriptive as possible
2. The agents should have a descriptive role and definition along with a backstory
3. A crew can have multiple agents and tasks where the process takes place sequentially or hierarchically
# Setup Notebook in Google Colab

1. 