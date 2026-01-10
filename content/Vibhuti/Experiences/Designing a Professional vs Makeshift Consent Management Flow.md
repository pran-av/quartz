---
date: 2026-01-08
tags:
  - engineering
---
### Enhancement: User Consent Management

**Home Page Implementation:**

1. Add links to access PP and ToS to the footer of the root webpage. PP is available at policies/privacy/v0.1.0-2026-01-07.md. ToS is available at policies/terms-of-service/v0.1.0-2026-01-07.md

2. For mobile and tablet viewports, avoid a new line to include these policies, instead add a pipe and mention these in front of "Created by Pranav".

3. On click the policies should open in a new tab and display content as in the markdowns. Take user automatically to the new tab.

4. Make the same headers and footers are available for the privacy and terms of service webpages. Clicking on the logo in the header should take user onto the home page. Provide a Back to Home Hyperlink at the bottom of the page post the ToS or PP ends.

  

**Database Implementation:**

1. Create a new table in internal schema called `internal.user_agreements`. This table should have following columns PK (UUID), User ID (UUID, FK to auth.users), Document Type (PP or ToS), Version ID (example v0.1.0), Accepted At (timestamp when user accepted).

2. Enable RLS policies for this new table with following conditions,

- SELECT: Only accessible for respective owners and database owner

- UPDATE: Restricted to all users

- DELETE: Restricted to all users

- INSERT: Only accessible to respective owners. Do not allow duplicates meaning insert of same version for a specific document type. Ignore the latest request.

3. Create a public VIEW with security invoker that enables the client to fetch the latest accepted version of user agreements after verifying ownership. The client will use this data to identify if any updated versions are required to be accepted.

4. If yes the client will trigger a public rpc function to perform the insert operation within `internal.user_agreements`. Revoke access to the RPC function for public and anon users. Set the search path=''. The RPC function must verify ownership before triggering the insert operation.

5. Proper errors to be returned if either RPC or RLS restricts insertion. Success message if insertion successful.

  
  

**Auth Flow**

  

For All Users

1. The /auth page mentions the latest PP and ToS below the email collection field and above the Continue CTA. The text says "By continuing, you agree to the Pitch Like This Terms of Service and Privacy Policy." - the ToS and PP should be hyperlinked with the latest policy.

2. When a new policy is launched the hyperlinks are changed while the webpage remains the same.

3. (Manual Task) The Supabase magic link email copy is added the webpage URLs that display the latest copy of PP and ToS.

4. Once the user is successfully authenticated, before the Studio Opens display an intermediate loading screen that says "Setting things up" with a loader. On this screen fetch the previously approved versions of PP and ToS using the Public View created in the database tasks. The result can be no data available for the user, or data is available.

5. If no data available, record/insert the latest versions of the respective policy (ToS or PP) as the accepted policy. This will happen in case of new users or in rare cases with either one of the policies was never accepted or recorded. Once insert is successful the loading is completed and the Studio starts loading as usual.

6. If either or both documents return a version, compare the latest accepted version with a latest active version of the respective policy. If the difference is a major (x) or minor (y) bump where (vx.y.0) is the format - a webpage should be loaded for the user to Accept the new ToS or PP or both. They latest PP or ToS should be displayed and common primary CTA "Accept" should be available, the secondary CTA will be "Logout".

7. To compare the versions, the latest active version of policies will be available via client side stored in the code repo. The format for versions stored are "v0.1.0-2026-01-07.md", so it requires trim to "v0.1.0" and record the same in the database.

8. Once Accepted the Studio loading will proceed as usual.

9. In either cases where Insert operation fails, retry automatically for the second time and if the error persists, return the relevant error and request the user to logout and login again. Provide a Logout CTA.

**Policy Update Notification:**

  

1. When a policy is updated with a major (vX.0.0) or minor (v0.X.0) bump. A notification should be delivered to an authenticated user post they successfully log inside the Studio. No notification delivered for patches (v0.0.X).

2. The notification can pop at the bottom right corner with a primary CTA with text 'Review' and secondary CTA with text 'Acknowledge and Close'. A separate notification popup should appear for PP and ToS updates with title saying "Privacy Policy has been updated" or "Terms of Service have been updated".

3. No description within the notification.

4. On click Review the a new tab opens with the policy webpage and user is taken to the page. On click secondary cta the notification is closed. Clicking either of primary or secondary CTAs, the notification closes under the understanding that user has responded.

5. If there are multiple notifications, they should stack up for desktop on bottom right and for mobile and tablet they would be queued one after other. As user responds to a notification it closes and then the next queued notification popus up in succession.