---
date: 2025-07-25
tags:
  - engineering
---

The Diagram below describes how Javascript Web Token authentication works,
- The Client requests Server a token when a certain UI action is triggered
- The Server runs a Generate Token Function
- The Generate Token Function uses 'Secret Key + Hashed (Header + Payload)' to generate a  'signed token'. Since the payload changes by user (should change!), we get a user specific signed token. We can add option arguments like this signed token expires in 1 hr.
- Server sends token back to Client, Client uses this signed token for API requests under a scheme like 'Bearer *token*'
- When the API request is received by server, it first decodes the bearer token to ensure there's a match from a known user from database
- If valid, the Server processes the API request otherwise returns a 401 unauthorised error


![[Pasted image 20250725233840.png|500]]