---
date: 2025-11-15
tags:
  - product
  - "#portfolio"
---
While I have *Garden* where you are currently reading this blog - its intention is to be a reservoir of ideas where curious people can spend hours exploring.

A portfolio website on the other hand as a very specific role of 'Sales'. Hence a different website was necessary.

I made the initial version of [Pranav Mandhare](https://pranavmandhare.com) on v0 which is a Vercel prompt to website product -- its specifically good at making UI. Comparatively Cursor is not good at UI at all - you will end up doing a lot of handholding.

v0 has a one click deploy to production flow - you click it and then redirect to the main vercel website to configure a custom domain. *Garden* already existed by then as a *garden dot pranav mandhare* subdomain - so I hosted this website on www as well as the primary domain.

![[personal-website-hero.png|650]]

# Design

Initially I was planning to have something very creative. I have a life dream of owning a Garage which hosts my bikes, cars, and other hardware like microscope, telescope, toolkits to crack anything up.

So I wanted to make an actual [[Personal Garage Website with ThreeJS|Digital Garage]] -- there are technologies like ThreeJS which would make this possible and I even attempted it. I integrated Blender MCP in Cursor and made a 3D Table asset from prompt - it was not perfect but it was crazy to see Blender work autonomously.

I figured this would be a very time consuming project and a side mission to my current goals - hence I paused garage to make something simpler.

The next design idea I got was "What if I just display my resume but in a interactive website format". Hence the current website has my experiences mentioned in a timeline fashion.

Decided to have my Whatsapp as a Primary CTA. Email and Linkedin as secondary CTAs. If the user is on mobile, I only keep it as Whatsapp and Linkedin.

Other secondary features that came along v1 were:
1. Download Resume Button in Header
2. A Dark and Light Mode switch
3. Decided to add different types of Experience and allow user to filter them: Work, Learning (education), and Adventure (outdoors, hobbies and others)
4. Each experience card had an image, on click goes to the specific case study written on [[knowledge graph blog]]

# Big Gap

Now the main job remaining was to add the case studies and images - but I was too slow at doing this, in the next couple I only ended up adding 2 case studies -- [[Multimedia Search for B2C EdTech Product]] and [[Building for Future - the story of Smart Batching]].

I moved onto building other products.

# The November Return

I was very excited to build a Library for this website. So at 1am on I believe 11th of November, I opened the project on Cursor created a markdown file and started typing...

And then around 3am Library along with Antilibrary was deployed,
![[portfolio-website-antilibrary.png|650]]

# Subsequent Features

Post Library was deployed. Enhanced the website to add more features and simplify the code,
1. Moved all updation to JSON scripts
2. Modified Experience Filtering into Tabs
3. Revamped the Experience Card design - reduced image size on desktop and added duration, highlights, and CTAs
4. Added Testimonials
5. Fixed some bugs

What may I add next?
1. Need to add Newsletter Subscription CTA creatively
2. Add more image in the hero section, likely a carousal
3. Some Fun Fact based gamification
4. MOST IMPORTANT: Add the case studies!

>[!note] Release Notes
>I would be maintaining a separate page for logging the releases [[Release Notes - Portfolio Website]]

