---
date: 2025-11-15
tags:
  - product
  - "#portfolio"
---
Maintaining the logs for thought process behind every feature pushed for [[Portfolio Website]]

>[!todo] Upcoming Feature Plans
>1. Experiences: View as list in addition to thumbnails - P2
>2. Integrate Cat with an LLM - P3
>3. An 'Available for Hire' flow - P1
>4. Add Highlights to all content - P0
>5. New Page: Ready to Use PRDs

---
---
## Release v1.1.0

### November 17, 2025
- **Role and Client Parameters for Work Experiences** - Separated all experience types into different JSONS and added client and role tags to work experiences. Both tags visible in UI above title.
- **Added a Cat Pixel Animation** on lower left that on click asks user if they wish to subscribe to my weekly updates.
- **Integrated Google Analytics** - used the same existing measurement ID as Garden subdomain, hopefully GA4 automatically gives us a segregated traffic measurement
- Content Update: Added images and testimonials
- Fix: Removed DS_Store from git cache
x
### November 14, 2025
- **Tabs instead of Filters for ExperienceType** (a user will not want to complicate their job by mixing two types into single list, which was happening in Filter functionality)
- **Experience Card Design Revamp** (left- right layout for desktop and top - bottom for mobile and tablet; reduced the size of images for desktop, added ProjectDuration, Highlights, Learnings CTA, Prototype CTA)
- **Testimonials** (desktop rolling animation with ends faded, mobile and tablet have manual snap-scrollable left aligned with right side faded)
- **Remember Light or Dark Mode by browser** (local storage for latest preferred mode, diffuse when switching modes)
- **Sisyphus Favico**n (added a favicon which was empty)
- Fix: Single Testimonial on desktop (no auto scroll animation)
- Fix: Hover restart reference on desktop (testimonials on desktop restart from same points where cursor leaves)
x
### November 12, 2025
- Library and Antilibrary
x
### November 17,2025
- Added Client and Role to Experience Type = "Work". Created separate JSON for all experience types
- Add a pixel cat anime to bottom right of the website with "PAT ME" dialogue, on click user is shown a CTA to Subscribe Newsletter. Dialogue automatically reverts to default state is 10 seconds.

------
## Release v1.0.1

### July 13, 2025
- website metadata update

---
## Release v1.0.0

### July 09, 2025
- Timeline Design
- Primary and Secondary CTAs
- Profile Image
- Resume Download
---
