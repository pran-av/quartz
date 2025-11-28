---
date: 2025-11-25
tags:
  - engineering
---
Went through some software licensing rabbithole, thinking of having my new project under AGPL 3.0 which is hard copyleft - means any even partial use of code base requires those who copy to have their entire code base opensource under the same license.

- I wanted to try opensource because closed source isn't as big a moat with AI based coding becoming mainstream. But I think programming something from scratch does take a lot of time and anyone copying gets a fast moving advantage - hence its good to have a strong copyleft to remain on a level field.
- Another reason for opensourcing because I want to add bounties for other makers to contribute - not being restricted to hire fulltime in future. Also have opensource code is good portfolio, can receive stars and sponsorship on github.
- In case of multiple contributors - the individuals who commit the code retain its copyright, hence the consolidate ownership, the individual contributors need to sign an agreement before working or just before merging the code (second option only when they are transferring the ownership for money - otherwise muddy).
- Any company or individual who owns the entire codebase can change the license in future but only for future updates. If contributors have not signed an agreement, in that case all of them have to be either convened for agreement either by purchasing their contribution or any other means.
- Any third party software communicating with AGPL 3.0 software through network calls do not need to have the same license - but if they are using any codebase in that case they are under AGPL 3.0. Hence any snippet of code that is required integration with 3rd party has to be under MIT license.
- The difference between GPL 2.0 and AGPL 3.0 from our context is that AGPL requires the source to be explicitly shared with all network users. Also under AGPL there's better patent protection and unnecessary friction protections for those who wish to propagate the software further.
- Any code once merged cannot be retracted by its owner under AGPL 3.0, this applies to all the licenses widely.