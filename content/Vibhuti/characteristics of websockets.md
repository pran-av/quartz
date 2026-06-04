---
date: 2026-05-16
tags:
  - engineering
title: WebSockets - Characteristics and When not to Use Them
---
Following is my personal understanding of websockets. I focus on,
1. Characteristics that define websockets
2. What to keep in mind when using them
3. When not to use them

I made this guide for future myself - I will be revisiting this material in any scenarios where I actually need a real world implementation of this engineering technique.
# Characteristic 1: Bidirectional

WebSockets allow **bidirectional communication** between entities - mainly a server and a client. Bidirectional means that both the server and the client can communicate with each other simultaneously. This nature of communication works because websockets are built over a TCP connection which itself is bidirectional.

The HTTP on the other hand is specifically designed for sequential communication, to keep things simple, predictable and extra secure. Hence use of HTTP for bidirectional messaging requires multiple cycles - long lived communication in this format  from both entities is not CPU or Latency efficient. 

Long Polling is one such method where a client sends an HTTP request for certain action, while the server keeps the communication line open until it has a response. It functions like a pseudo websocket.

# Characteristic 2: Instant

So if long polling on HTTP can satisfy bidirectional communication (in a way). Why switch to websockets then? The biggest benefit of websockets is that they are fast, they can be used for **realtime communication**.

What makes them realtime? Majority of HTTP requests are required to carry authorization headers. An HTTP message has to be decrypted for user identification, post which the operations can be processed and then finally a response has to be made with same headers reattached. The cycle count is high and each request because of the payload is a few KBs in memory.

A websocket in contrast only completes security authentication when establishing the tunnel. The every subsequent message that passes through this tunnel is just a few bytes.

Hence communication latency on websockets is very low almost making it real-time communication.

# Characteristic 3: Persistent but Stateful

If there are 10,000 concurrent users. We would require 10,000 connections when operating with websockets. This tunnel remains open unless,
1. Either party explicitly closes it
2. A firewall restricts access to either party
3. The server collapses or burns down

This characteristic specifically is a good and bad,
1. Persistent connection if remained open but not used are going to cost a lot of RAM
2. Being stateful, the client has to be connected with a specific server, and hence other infra like load balancers have to be designed to allow this

# Necessary implementations for websockets

Given the nature of websockets, an ideal implementation should include:
1. Heartbeat pings to ensure both entities are alive, prune the connection otherwise
2. Implement exponential backoff with jitter to distribute any load from sudden reconnection requests at once
3. Websocket gateway to avoid disconnecting clients when the server code is redeployed
4. Capped websocket queues to avoid communications pilling up when either party is not available

# When not to use websockets

Websockets require supporting infra, hence its always good to know when not to use them:

1. When none of the above characteristics are necessary to deliver the solution
2. When we have a realtime audio or video media requirement, we will need WebRTC in that case
3. User facing requirement is for a live chat. This is a functional requirement, meaning it has to "appear" live and may not necessary have to be actually realtime. There are many UX ways to make a conversation feel live. While if it is a non-functional requirement, meaning system requires websocket implementation to reduce server-client latency, then it has to be the correct infra that is websocket.
4. When your system is agentic - for instance a bunch of agents are networking among themselves to reach a solution and then communicating that solution to user via client. Here while the user might be given a experience that an LLM is interacting with them, its actually the system (or just the server) and hence the response can be a simple HTTP.