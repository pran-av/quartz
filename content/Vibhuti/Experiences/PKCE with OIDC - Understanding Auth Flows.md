---
date: 2026-01-14
tags:
  - engineering
---
Okay I am back to writing because I have hit another wall. My first experience with PKCE ("pixie") was while implementing Magic Link Authentication for [Pitch Like This](www.pitchlikethis.com).

My second interaction was very recent while integrating Linkedin OAuth for the same app. Now my third interaction is while I trying to link social logins to already authenticated users.

The third interaction is where I have hit a wall. I am using on of Supabase's internal methods called `linkIdentity()` - this is supposed to be called client side from an authenticated user. 

On trigger, Supabase verifies the user through the cookie - and this verification follows the same PKCE flow with OAuth linked in the middle.

# Authorisation or Authentication?

Authentication = who you are
Authorisation = what can you access

So when a user visits my application and triggers a Magic Link Signup request, Pitch Like This is authenticating the user via email verification. And post authentication we are assigning a permanent_user role to that user. Now this user is able to access all their projects and campaigns.

Pitch Like This has an anonymous or guest users who are authenticated not through an email address - but via their browser JWT. So these anonymously authenticated users whom I can assign the role of anon_user. Anon_user is authorised to view published campaigns of users through a project ID.

## Linkedin OIDC context

`linkedin_oidc` is the only flow available for Linkedin OAuth.

So from the perspective of Linkedin,
1. their server is accepting external requests for authorisation (on behalf of their members)
2. the linkedin server then authenticates the member on their own client before the member could accept or deny request to use their LI profile to any external client
3. if successfully authorised, Linkedin sends an access token to the external client so that can proceed with actions required

Now the external client which in our case is Pitch Like This app,
1. Can use this access token to setup a session by saying this is a verified LI member and I trust LI to know who this member is. To make this point more convincing, LI also sends an `openid` which contains a unique identifier for that LI member
2. Can use this access token to request profile information that necessary to provide in app services

So for linkedin server this is authorisation flow. For Pitch Like This client this is an authentication as well as authorisation.

The above explanation is simplified to understand auth requirements. Now let's dig into the main part, how this auth works securely.

We have implicit flow which is now deprecated and proof key for code exchange (pkce) is used in its place. However many OAuth providers pair PKCE with OpenID Connect (OIDC) which shares the user identification post successful auth.

# Implicit Flow

Below we have a sequence diagram explaining implicit flow. PLT stands for Pitch Like This which is the name of our application. Linkedin Server is an authorisation server. User here connects with PLT Client directly and with Linkedin indirectly via PLT.

![[sequence_dia_implicit_flow.png|550]]

## Loopholes in the implicit flow

When the Linkedin Server returns an access token, it does not verify if its the same request that has received the response.

Meaning you can request authorisation, I am imitating you on the same network connection, I intercept the response and use your token.

Let's now study the PKCE sequence diagram to identify how this loophole is fixed.

# Proof Key for Code Exchange (PKCE) Flow with OpenID Connect (OIDC)

Below is a sequence diagram for PKCE flow with OIDC. Some key differences compared to implicit flow are:
1. A unique identity is generated for each request via a code_verifier token. This is hashed as a challenge and sent to authorisation server.
2. The authorisation server sends a `auth_code` instead of `access_token` right away.
3. The PLT Client packages a POST request to auth server with client_id + auth_code and the code_verifier which was generated in first step
4. Linkedin Server matches the code_challenge and code_verifier by hashing it with same algorithm. Only if hash matches the `access_token` is now sent.

The PLT Client having access token if irresponsible while using or storing it might still lead to security issues. However this is out of scope for PKCE. PKCE is about delivering token only to the one who requested it.

![[seq_dia_pkce_oidc.png|550]]d

---
**Subscribe for a weekly list of my writings**

If on desktop: click "Subscribe" on left panel. 
Otherwise click here [subscribe to my weekly updates](http://eepurl.com/i8vmEk)

---
## OpenID Connect

Okay now this writeup is becoming more relevant because, like I mentioned in the start, I have been trying to use `linkIdentity()` method provided by Supabase, but this is failing within a error which says "missing sub claim".

`sub` is a parameter which is part of the Open ID token that is returned by LinkedIn post completion of PKCE flow.

The pre-requisite is that the app that I create in Linkedin needs to have the openid scope defined so that LinkedIn sends it. I can see in LI dashboard that all three available scopes are defined: openid profile and email.

I have two user flows where this sub is necessary:
1. User authenticates with LI OAuth -> LI does not have verified email -> App fallbacks to Magic Link but stores `sub` -> `sub` is used post authentication for faster social linking to the magic link account
2. User authenticates with Magic Link -> User triggers social linking where verified email of magic link and LI can be different

# Troubleshooting `missing sub claim`

Here is the exact error we are receiving, the `linkIdentity` method is failing, we need to first understand how this method works.

```
## Error Type Console AuthApiError 
## Error Message invalid claim: missing sub claim at 
async handleLink (components/dashboard/LinkIdentityDialog.tsx:62:31) 

## Code Frame 
60 | // This works even when emails don't match, unlike signInWithOAuth() 
61 | // https://supabase.com/docs/guides/auth/auth-identity-linking#manual-linking-beta > 
62 | const { data, error } = await supabase.auth.linkIdentity({ | ^ 
63 | provider: "linkedin_oidc", 
64 | options: { 
65 | redirectTo: redirectTo, 

Next.js version: 16.0.10 (Turbopack)

```

The above code block shares my custom client side code where I call the `linkIdentity` method. This method itself is failing and returning the specific error - so we need to check when this method returns missing sub claim.

I can verify following things:
1. Does the method required explicit scope declaration
2. This method only works on authenticated users - is Supabase able to verify the user via cookies
3. I can see the code-verifier cookie being added to the browser, signifying PKCE has been triggered. Need to identify which step we have reached before things fail.

On spending entire day on this: 
>[!quote] The issue has nothing to do with PKCE or OPID mechanism 😪

I was calling `linkIdentity()` on client side and it was failing to fetch the authentication cookies as they are httpOnly and cannot be accessed via JS.

Hence I moved the method on server side and it now links accounts with two different emails effectively.

The URI redirection is required to be done manually on client if we are calling `linkIdentity()` on server side.

----
## Resources that helped me write better

1. [Postman - PKCE Flow](https://blog.postman.com/pkce-oauth-how-to/) 
2. [Aaron Parecki - OAuth 2 Simplified](https://aaronparecki.com/oauth-2-simplified/?deviceId=d5daffb8-5f4f-41e6-a876-159d08de753e)
3. [Sequence Diagrams Created With](https://www.websequencediagrams.com/)
