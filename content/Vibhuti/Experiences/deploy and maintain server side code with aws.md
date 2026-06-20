---
date: 2026-06-14
tags:
  - engineering
title: Deployment and CI/CD of server side code with AWS
---
I will divide my experiences of deploying with AWS in three parts,

Part 1: Deploying a Static EC2 Instance

Part 2: Deploying a Auto Scaling instance using Load Balancers + CI/CD Pipeline

Part 3: Moving back to Static Instances to save costs

---
# Opting for AWS

I already have my client side application deployed with Vercel. I had past experience of deploying the server side code with Render - however the free plan does not keep the instances warm and coldstarts them based on usage. This creates 30 seconds extra latency - the server already handles heavy tasks requiring LLM inference and logic, additional cold starting would drop off the users easily.

Render and Railway both cold start the servers for their free plans. 