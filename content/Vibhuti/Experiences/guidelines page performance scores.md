---
title: Guidelines to Optimize Page Performance Scores
date: 2025-12-11
tags:
  - "#engineering"
  - "#saage"
---
>[!warning] Under Construction
>Content under development, please visit after a few days or subscribe to get notified

I created a new Campaign in my [[open to work website widget|elevator pitch app]] yesterday to pitch the founder of Pixxel Space for a PM role. When I shared the link - I observed the LCP rendering time was crazy high - 8 seconds!

Nobody is going to wait that long. I ran the Google PageSpeed Insights (I believe the score might be 70 or 80) and got following review to reduce unused JavaScript and defer loading scripts until they are required.

I particular element during this render leads to high waiting time `<p class="text-base leading-relaxed text-gray-700">`. But I don't think its actually about an HTML element.

The most probable reason of delay might be linked to the parallel processes that are running in the background, for instance,
- We are signing up the guest user - authenticating via JWT fingerprint
- There are three pages to campaign flow and we are loading them all in the first page

**Solutions**
1. Dynamically load all the successive pages. The downside is that when the user clicks NEXT to go further, there is a small loading time, it's in milliseconds so that a churn issue. But I should think of lazy loading to make it feel fluid in UI.
```const RelevantWorkPage = dynamic(() => import("@/components/campaign/RelevantWorkPage"), {

loading: () => <div className="mx-auto max-w-4xl">Loading...</div>,

});
```
2. Auth initialisation is deferred until the page loads
```// Set client to true immediately to render content (improves LCP)

setIsClient(true);

// Defer auth initialization to after initial render

const initializeAuth = async () => {

// Use shared utility function for auth initialization

await ensureAnonymousAuth(supabase, "CampaignFlow");

// Always render the page, even if auth fails (graceful degradation)

};
```

Even post these solutions however, I am observing that the first load takes more than 3 seconds of LCP. The subsequent reloads without refreshing the cookies are much faster.

I am suspecting there can be a more better ways to run the auth in parallel.