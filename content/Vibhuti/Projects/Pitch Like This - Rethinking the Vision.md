---
date: 2026-01-17
tags:
  - product
---
I started building [Pitch Like This](www.pitchlikethis.com) because I wanted a tool for my portfolio website where people can click on a widget which says something like "Available for Hire" and then a new tab opens up with all services I offer and people can explore case studies for each service - and then contact me if anything clicks.

So some form of a conversion tool for personal websites. The moment I got the idea, I scribbled my plans over here [[Building a better 'OpenToWork' feature]].

# Highlights from my initial plan

"ini the beginnin", I was building for a market which was individuals having their own website with more than 1000 unique visitors per month - these individuals can be job seekers or consultants.

Quarter way through the build I started realising that the market might just be too niche. Niches are surely great for products that have proved PMF for that niche, but otherwise building an entire new product should have a wider scope - so that a niche can be funnelled onto organically. 

Hence the vision became more generic: 
>[!quote] artists must be able to focus on their art, while a partner focuses on monetising their art

 The target market as well became more generic: *students, individuals searching for a new job, and consultants looking for clients.*

I mentioned in the initial writeup about how people add a conventional chat bot at the bottom right of their webpages to improve conversions - and such mechanism is not found on personal websites. Well the widget would have solved for this but I have expanded the vision now hence such chatbots ain't a competitor product.

Other competitors I mentioned are Naukri or Job boards. As of now I don't think Job Boards that are solely meant for discovery are a competition as PLT is not doing anything on discovery - it focuses on conversion. However companies like Naukri are more than a job board - more specifically Naukri Pro that offers resume related or profile discovery services are the actual competition.

The final two points of the initial exploration were Go To Market and Monetisation Strategy. I will cover my thoughts on these next as they are the elements I want to focus on this writeup.

# What is Pitch Like This in its current version?

Day before yesterday I deployed the version 1.6.0 of the app. Is it an MVP - yes I will call it so. Is it marketable - I am not yet confident on that.

## What are the current features

1. **CRUD**: Create Projects and manage multiple campaigns in each project. Each project has a shareable link generated that renders the active campaign (from that project).
2. **The Campaigns are designed like Cold Emails**: *Who* you are and *What* you offer, *Why* you should be hired, *How* to connect with you. Good cold email are known for their personalisation and brevity - hence I decided not to offer variety in templates yet.

So as a user who wants to create your pitches, here is how you will start from scratch:
1. Visit the website and signup via Linkedin or through Email Verification
2. Create a Project
3. Create a Campaign within the Project
4. Add Your Name, Summary, and your Call To Actions
5. Create Services that you Offer
6. For each Service add Case Studies
7. Publish the Campaign, or make new campaigns and switch to latest ones
8. Archive Projects that are not needed

What we have right now is Utility. A skeleton - its foundation and should exist for every product but it does not sell well - maybe I would say,

>[!quote] Utility retains, Features sell

# Naukri

## Revenues

Naukri ARR is ~2000 crores. Which amounts 80% of InfoEdge revenue. 90% B2B and 10% B2C.

With that estimate, B2C ARR would be 200 crores. Based on the revenues, it seems like Naukri's primary focus is to help businesses find talent. The secondary focus might be to help talent find their dream roles.

So primary metric would be, how many job listings were fulfilled, while second order metric would be of how many candidates received the job of their choice.

## Usage

100 million cumulative users -> 20 million MAU -> 2 million DAU.

**Traffic:** Market Leader in India with ~85% traffic share. 800k Resume Searches Daily - 24k Resumes added daily. Database of 103 million resumes.

**Key User Activities:** Resume Uploads from Job Seekers. Resume Searches from Recruiters.

## Services and AOV

I would like to classify their B2C Offerings in separate buckets:
1. **Resume Services:** Resume Display (profile visibility), Resume Writing (service), Resume Maker (tool), Resume Critique (service). *Average Pricing*: 1100 INR monthly or one time (differs based on yrs of experience)
2. **Interview Services:** AI Mock Interview (tool) *Pricing*: 300 for 3 months
3. **Reachout Services:** Priority Applicant, Job Alerts, Recruiter Connections *Average Pricing*: 1200 INR monthly

April to June (FY Q1) and October to December (FY Q3) are the peak quarters. Q1 will have freshers as the prominent target market.

I have made a small 800 INR purchase for Resume Display last year - they generally call everyone who make a purchase to check if the requirement fits or upsell. Bundled Value Plans will have average pricing of 1500 INR per month. Bundled Combo Plans will have much 12000 INR for 6 months.

So Overall the AOV seems to be 1500 INR to 3000 INR.

## Conversions

1.5 lakh monthly paying customers. Less than 5% conversions when compared to MAU.

The conversions are actually bad for B2C. The entire Naukri product is simply a database - traffic, search, supply and demand that is what they have as moat. And every technology service is an add on. 


## Why can make it marketable

I think 

"Manage your resume, case studies, and applications at a single place. Improve your chances of converting opportunities through personalised pitches."

---
## Resources

1. [X Post - 2021 About InfoEdge](https://x.com/ValueEducator/status/1476164380169408515) Confidence: Medium
2. [Naukri - Revenue Figures](https://entrackr.com/fintrackr/info-edge-posts-rs-805-cr-revenue-rs-347-cr-profit-in-q2-fy26-10650338) Confidence: High
3. [Naukri - Segmentation and User Activity](https://www.storyboard18.com/brand-marketing/naukri-com-recruitment-business-sees-9-revenue-growth-to-rs-495-crore-in-q2-fy25-47698.htm) Confidence: High