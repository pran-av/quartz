---
date: 2025-12-05
tags:
  - "#engineering"
  - "#security"
---
I am integrating user authentication in [[Building a better 'OpenToWork' feature|elevator pitch app]], and this is the first app where I am implementing an auth where I verify the exact identity of the user. In previous apps, mostly MVPs, I had implemented a simple anonymous user identification system to serve them services where they might return later.

At first thought, authentication can be considered analogous to gatekeeping. In the sense that, whoever visits - the gatekeeper records their identity. In most of the physical world we see it implemented for security, but in digital world the goal more tends towards delivering better services.

So in a digital world, how do we decide when to gatekeep and when to avoid it?

## When to do Gatekeeping?

So firstly, if I am building an app which is like **use once and forget** - like file conversion apps for instance, convert pdf to docx. I would not implement any authentication on priority. Whoever you are, you can just pay 1 rupee and go ahead with your conversion, I identify you by your Order ID.

Like a random Chai Stall you visit during a road trip. Likely never go there again.

The next category is when I only need to identify the user - I don't wanna know their identity. I just need to identify if you are an existing user or new user and what services you have taken from me in the past. This is mostly for products where **I will use and return back**, but neither of us have any use of knowing each other by name or other forms of identity.

This for me is analogous to a Kirana Store, I go to them every quarter and they know me by face - they ain't got clue about my name etc. They don't know me by name because there's not much use of having that info.

The third case is where **I am gonna visit frequently and its important to know who I am** for security and servicing. This would be must for apps where you cannot provide service without identifying the client - like renting a house or delivering parcels.

This would be like visiting Banks, I need to be identified to know what my account number is so that I could receive services through my account.

I believe the importance of classifying authentication is so that we do not end up over engineering our solutions. Over engineering might lead to complexities and hence breakages.

For digital services however, when a product is designed to become a full on longterm focused company - it has to authenticate no matter the use case. Valuation of a company is directly proportional to how many users are benefiting from them - and hence users have to be authenticated by identity.

## Physical Authentication

I wanted to understand authentication from the terms of how we do it physically vs how things differ digitally. In majority of digital authentication cases the user is sitting at a remote place miles away from the verifier - hence remote authentication.

Consider yourself visiting a friend in a very big society where the security is strict. You reach the gate and stop. The security personal visits and scans your face, consider this to be an anonymous ID creation - you have a Unique ID (UID) now stored in the security personal's brain.

Next, you are asked questions, name, phone number, who are you visiting. All this is PII data which means your identity is being stored against the Unique ID. These details are written in a registry.

Next step. The security asks for an identification document to make sure you are not lying. And a call goes to the flat owner to check if they are expecting you. Now based on your driving license which is universally unique, your UID in registry is assigned with a universally unique ID (UUID) - a foreign key to the primary key which is UID.

The call that goes from security to your friend confirms, that the friend called you that's why you are visiting. So the sequence of events have been:
1. Friend calls you for a party at their place
2. You accept their request and reach their gate
3. The security confirms your identity
4. The security calls your friends to confirm their request
5. Friend tells them to allow you in
6. Security lets you into the society

## Remote Authentication

Now lets translate this to remote authentication and see if it matches. Imagine we are booking an Airbnb for a trip with your friend,
1. You visit Airbnb app and request Sign In for an email ID
2. The Airbnb app acknowledges your request and sends request details to Airbnb Server
3. Airbnb server assigns you a UID and adds your email ID against it
4. Airbnb server sends an OTP to your email id to check if you are saying the truth
5. You receive the email and type the OTP in the Airbnb app
6. Airbnb app sends OTP to server for verification
7. Airbnb server matches the OTP to what it sent and confirms your identity
8. Airbnb server tells the Airbnb app to let you in
9. Airbnb app lets you in and process your booking

One major difference between physical and remote auth is that the simple show your ID that happens physically takes multiple steps digitally. How to verify an ID without sensing it with eyes? Create a unique code, send the code and wait to receive the same code - funny enough the speed of light makes this verification faster than humans physically doing it.

Another major difference - the physical you cannot swap yourself with another of your friend who was not invited to the party. But a remote user can do that or a third party can make themselves look like you digitally (basically hack you).

So there is an additional layer for digital systems to be less vulnerable,
1. Digitally Sign the Code while sending (RSA)
2. Send through secure network channels (TLS 1.3)
3. Encrypt the code when it has to be stored for maintaining the session
4. Continuously check if its the same user

## Digitally Signing with Public and Private Keys

The purpose of this is to **ensure authenticity** and that communication was tamper proof. Its like the paper seals that are made during Amazon or Swiggy deliveries.

So the intention is not to keep the shared information secret and when received its not to be fully decrypted.

Rivest, Shamir, and Adleman (RSA) algorithm uses a method of factoring large prime numbers - its computationally heavy to decrypt without knowing a private key. The **private key hence is a secret**.

The math is a bit complex, so instead if we just explore what happens chronologically, here's the summary,

**Step 1: Key Generation**
1. We pick up two big prime numbers and multiply then to get a modulus of these prime. This modules becomes part 1 of our **public key**.
2. Now we do math magic with prime numbers we have to derive another number called exponent. 
3. At this point we have the complete public key which is **(modulus, exponent)**
4. With the public key we run some more math magic to derive a **private key**

**Step 2: Signing the Message**
1. Consider we have to send something secure to another person that should not be leaked, like sending your bf/gf that **"It's Over!"**
2. Now an algorithm is used to obfuscate this message into something very random like a 64 character hexadecimal string (if SHA-256 is used)
3. The best way to describe the math magic behind **hashing** is to say that imagine having a rubik's cube an shuffling it in some calculated ways but randomly (one of the key benefit is that if the message was "Its Over" without exclamation - it would be a very different hash from the original one!)
4. Now the hash, modulus, and private keys are paired for next math magic to get a **Signature**. This signature can only be obtained when user has the private key, the hash and modulus on the hand are already public.

**Step 3: Verification by Client**
1. The hashed message, the signature, and the public keys are sent to the Client - we were on Server for the first two steps.
2. The Client uses the Signature and the Public Key to decrypt the hash.
3. Then client compares the hash received from Server with the hash it decrypted. If **they match** - means the message is authentic coming from your gf/bf and nobody has tampered with it.

>[!info] Note
>The hashing algorithm like SHA-256 is only one way, which means we cannot decrypt the "It's Over!" message underneath the hash. Hence this solution only confirms that the message was not tampered and it was from a particular individual.
>**Example:** A password is hashed before storing it in database because only the owner should know it. While a text message is simply encrypted if confidentiality is required.


### How is Confidentiality integrated with Authentication?

Consider for use cases like messaging apps, confidentiality is necessary, in such cases an End to End Encryption (E2EE) is implemented before processing messages for authentication.

This means confidential messages are never hashed directly either - encrypted data is hashed for processing authenticity

**How E2EE ensures confidentiality?**
Unlike hash function which is one way, E2EE can be decrypted using a **shared secret**. So two devices storing the same shared secret will be able to decrypt messages however if any device in the network does not have a shared secret - they will see the encrypted data.

**How are secret keys exchanged between two devices?**
This requires a key exchange process which is a separate algorithm. Since our focus is authentication, we will no dive deeper here.

**Handling of Personally Identifiable Information (PII) data**
A relational database is a perfect way to identify a person by their on platform activities and then add a relation to identify their home address. Unless we are building a spy company whose job is to do this - this ain't good.

Hence some ways to avoid this from happening,
1. Don't store PII if its not absolutely necessary, find bypasses to avoid handling PII - this also helps avoiding complex engineering work. This is also known as **Data Minimisation**.

Considering its necessary to store, we can implement following safety checks (I am roughly arranging them based on priority),
2. Ensure the data is coming via **secure network**. TLS 1.3 (HTTPS) for network communications, SFTP for file transfers, PGP for emails.
3. Share with **authorisation controls and masking**: Internal dashboard should have a role based system to ensure only specific people can access this data, for others it can be masked or not displayed.
4. **Segregate** PII and non-PII data so that special **database security policies** can be applied for any data fetching or download operations undertaken manually or via system. The PII data can still relate to the non-PII data but via a foreign key.
5. Ensure data is **encrypted at storage** using an E2EE algorithm like AES-256. Ensure encryption keys are stored separately from database.
6. Integrate **Multi Factor Authentication** MFA to avoid client side leaks from leaked passwords or other hacks.

>[!note] Note
>There is no general definition for what data is PII or otherwise. Based on the app's context a simple Full Name can be a PII and in some other context even phone numbers would be public data for instance at Crunchbase which is a database of companies.
>The company's privacy policy should clearly state how they are handling user information.

## Layers of Security

**Layer 1:** HTTPS/TLS where the Browser and the Server it is communicating with establish a secure channel

**Layer 2:** The User of the Browser and the Server establish their identity via authentication.

**Layer 3:** The Server and the User or two Client Users establish confidentiality of data via encryption.

**Layer 4:** The Server generates Session Tokens for Client to stay authenticated. The client requests Refresh Tokens during the end of life of each token.

## Keeping the Session Logged in post Authentication

Post authentication the server assigns a session token to the client. The token can be valid for a certain say 15 minutes.

Post 15 minutes the user would be auto logged out and would require to again manually log in. This is not a very desired user experience, hence at the end of every 15 minutes a Refresh token will be requested to the server - this refresh token is stored as secure cookies in the browser.

The client fetches this token from the browser before calling the server every time.

### How are the session tokens shared to the client?

Supabase used an implicit method which is now deprecated. It adds tokens in the URL parameters from where the browser can store it. This is frontchannel mechanism and less secure as there are chances of leaking via XSS attacks or browser history.

Supabase now uses PKCE method which is a server to server exchange. In this backchannel method the client sends a POST request to exchange the code for an access token. For this exchange a code verifier is required which is sent to the client at the start of the auth process.

### How are sessions tokens generated?

JSON Web Tokens (JWT) are used for session management and they look like ````
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```




