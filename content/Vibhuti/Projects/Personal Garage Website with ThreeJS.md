---
date: 2025-06-08
---
Below is a sketch of how we might translate your life story, “collector” mindset, mechanical/space roots, and love for experimentation into a truly unique, interactive personal website. 

---

## 1. Overarching Theme: “The Curiosity Garage”

Imagine entering a 3D garage/laboratory that’s part workshop, part library, and part toy-collector’s den. Every shelf, every table, and every floating object is clickable—uncovering an essay, a project, or a framed “stamp” of a milestone.

* **Why a Garage?**

  * A garage evokes mechanical tinkering (your love of mechanical/aerospace).
  * It doubles as a “collector’s space” (your childhood Pokemon/stamp collections).
  * It can be a cozy “lab” for experiments (fluid mixtures, ant-farm tests)—mirrored digitally by interactive widgets.

* **Visual Style Cues:**

  * Industrial flooring (concrete texture), soft under-cabinet lighting over tool-drawers, workbenches laden with “artifacts.”
  * A subtle starfield or skylight above, hinting at your space fascination (galaxies subtly visible through a translucent ceiling panel).
  * Occasional animated particles drifting—like dust motes in sunlight—hinting at unfinished experiments.

Technologies:

* **Three.js** (or Babylon.js) for the 3D environment (garage interior, clickable objects).
* **React/Next.js** (for routing, blog section, CMS integration).
* **Tailwind CSS + Framer Motion** (for 2D overlays, smooth UI transitions when you click on objects).

---

## 2. High-Level Structure & User Flow

1. **Landing / 3D Garage Entrance**

   * Visitor arrives to see a 3D “garage door” partially open. A short loading animation sweeps them inside.
   * Ambient audio cue (subtle machinery hum, distant dripping water), which can be muted.
   * Once inside, the camera slowly pans across a workbench laden with:

     1. A **stamp album** (→ “My Journey” timeline).
     2. A **vintage toy car** on a muddy pedestal (→ “Projects”).
     3. A **space telescope model** perched near the skylight (→ “About Me & Origins”).
     4. A **bulletin board** on the back wall with “idea slips” pinned (→ “Idea Garage / Collaborate”).
     5. A stack of **notebooks and blog journals** on a shelf (→ “Essays & Philosophy”).
     6. A **resume binder** near the doorway (→ “Download Resume / View as PDF”).

   **Interaction Hint:** A subtle tooltip (“Hover over objects to explore”) appears for 3–4 seconds on first visit.

2. **Clickable “Artifacts” and What They Unveil**

   * **Stamp Album (“My Journey”)**

     * Opens a 2D overlay with a chronological timeline of milestones—school experiments, mechanical engineering, first job in IT sales, product management roles, etc.
     * Each “stamp” (a circular, vintage-stamp graphic) links to a small pop-up:

       * **Date & Title** (e.g., “2003: First Ant Colony Experiment”)
       * **Short Anecdote** (what sparked your curiosity)
       * **Image/Icon** (e.g., scanned stamp of an ant, or a Pokemon card).

   * **Toy Car on Mud Pedestal (“Projects”)**

     * Clicking makes the car drive off, then transitions to a 2D grid or carousel of “project cards.”
     * Each card shows:

       * **Thumbnail** (screenshot of the software product, or CAD model).
       * **Title & Role** (e.g., “Route Planner PWA – Lead PM”)
       * **Short Blurb** (1–2 sentences)
       * **“Explore”** button → a hperlink to my blog which would look something like 'https://garden.pranavmandhare.com/Vibhuti/Projects/Search-for-Places'

   * **Space Telescope (“About Me & Origins”)**

     * Clicking zooms in through a telescope eyepiece—fades into a full-page “About” section:

       * **Headshot + Short Bio:** (Your mechanical/space roots, sales → product, philosophical bent.)
       * **Visual Timeline** of “space craze → mechanical engineering → software + entrepreneurship.”
       * **Fun Facts Sidebar:**

         * “Favorite childhood hobby: Mixing fluids to test on ants.”
         * “Most cherished collection: Pokémon cards + stamps.”
         * “Guilty pleasure: Age of Empires marathon weekends.”
       * **Rapid “Wall of Skills”:** little rotating 3D blocks (hover to see “Python,” “Three.js,” “Product Strategy,” etc.).

   * **Bulletin Board (“Idea Garage / Collaborate”)**

     * Clicking pulls open a sliding-door interface into a “commons”—a whiteboard surface where visitors can leave a short message:

       * **“Pitch me an idea”** form (Name, Email, Idea Title, Short Description).
       * **Live Feed Panel** (scrolling list of recent ideas or stories submitted by others—optional approval system on backend).
       * **“Pick an Idea” Widget**: an interactive randomizer that selects one of the submitted ideas, prompting you to explore or collaborate.

   * **Notebooks & Journals (“Essays & Philosophy”)**

     * Clicking opens a small “library shelf” overlay: a scrollable list of essay titles.
     * Each essay tile has a short excerpt; click → leads to my blog with hyperlinks for each of these essays 'https://garden.pranavmandhare.com/Vibhuti/Essays/'

   * **Resume Binder (“Download Resume”)**

     * Clicking reveals two options:

       1. **Download PDF** (a styled, printable one-page or two-page resume).
       2. **Interactive Resume**: scrollable page that lays out education, work experience, skills, and a small infographic of “First-Principles Thinking” methodology (e.g., clickable nodes showing how you decompose problems).

3. **Global Navigation & Accessibility**

   * If a visitor prefers a “classic” nav rather than 3D exploration, a fixed top-left “Menu” icon opens a sidebar with text links to: Home (3D Garage), About, Projects, Essays, Idea Garage, Resume.
   * A fixed top-right “Mute Audio” / “Fullscreen” toggle.
   * Keyboard-accessible option: pressing “M” focuses menu, arrow keys navigate, Enter selects.

---

## 3. Key Pages & Their Content

### 3.1 Home (3D Garage)

* **Purpose:** Establish immediate “curiosity & collector” vibe.
* **Core Interactions:** Hovering highlights objects; clicking transitions to deeper sections.
* **Fallback:** On older browsers/devices, degrade gracefully to a 2D list of sections with thumbnail icons.

### 3.2 About Me & Origins

* **Hero Section (Full-Bleed Space Background):**

  * “From Stargazer to Builder: My Journey from Childhood Curiosity to Software & Mechanical Innovation.”
  * Short tagline about first exploring galaxies online, then building real machines.

* **Timeline with “Stamps”:**

  * “1998” → “First star-mapping sessions on dial-up internet.”
  * “2001” → “Started collecting Pokemon cards & stamps.”
  * “2005” → “First mud-track for toy cars and backyard ant experiment.”
  * “2010–2014” → “Mechanical Engineering at \[College].”
  * “2015” → “Joined \[IT Sales Company] as Sales Rep.”
  * “2018–2022” → “Product Manager for \[Software Product A, B].”
  * “Present” → “Building \[Your Current Startup/Initiative], writing essays on Philosophy & First-Principles Thinking.”

* **Skills Matrix:**

  * Interactive 3×3 grid where hovering a block pops up a tooltip (e.g., “Three.js + WebGL,” “Product Strategy,” “SOLID Mechanics”).

### 3.3 Projects

* **Projects Grid or Carousel:**

  * Each project card shows:

    * **Project Name**
    * **Tech Stack Icons** (React, Node.js, etc.)
    * **Short Role Description** (“Led a 5-member team to build an interactive route planner using Ola Maps API.”)
    * Optional Link to **Details Page** takes user to my blog where the project is described, the link would be similar to 'https://garden.pranavmandhare.com/Vibhuti/Projects/Ideas-for-Education-Sector'
    * **“View Demo / GitHub”** optional links.

* **Filter Bar:**

  * “All / Web / Mobile / Mechanical Concepts / Research & Essays”
  * E.g., if you once prototyped a “3D-printed fluid mixer], that can live under “Mechanical Concepts.”

* **Featured Project Spotlight:**

  * At top, a rotating “featured” carousel with “Project A: Why it matters, what you learned,” plus a “Read Case Study” button.

### 3.4 Essays & Philosophy

* **Library-Style Layout:**

  * Each essay displayed like a little hardcover book on a wooden shelf (3D tilt on hover).
  * Excerpt appears as a sticky note once hovered.

* **Featured Essays:**

  * E.g., “On First-Principles Thinking in Software + Mechanics,” “Why Curiosity Never Dies,” etc.
  * Each essay has a short description and to read the entire essay user has to be visit my blog which would be an hyperlink like 'https://garden.pranavmandhare.com/Vibhuti/Essays/The-Pursuit-towards-Greatness'

### 3.5 Idea Garage / Collaborate

* **Digital Bulletin Board Interface:**

  * Pins (sticky notes) labeled with 'Citizen Stack: Opensource software and hardware tools for public'. Clicking a pin reveals content - 'Software and hardware tools to solve social problems or make existing solutions more efficient.'
  * Do not allow users to add ideas in current version, instead Ideas would be added by me manually in the code

* **“Pick a Random Pin” Widget:**

  * Animates a random “pin” glowing; click “View this Idea” to read it.

### 3.6 Resume & Downloads

* **Interactive Resume Page:**

  * Clean, modular layout: Education → Work Experience → Skills → Certifications → Contact Info.
  * Sidebar infographic: “My Approach to Problem Solving” (a collapsible first-principles diagram, where clicking “Break it Down” expands sub-nodes).

* **Download Buttons:**

  * “Download as PDF” (opens the PDF in a new tab). Allow the user to download @/public/Pranav_Mandhare_EdTech.pdf

---

## 4. Visual & Interaction Details

1. **Color Palette & Typography**

   * **Primary Colors:**

     * **Deep Slate Blue (#1E2633)** for backgrounds and headers (evokes space).
     * **Rustic Orange (#E27D60)** for hover highlights (reminds of mechanical caution tape).
   * **Accents:**

     * **Cream White (#F0EDE5)** for text blocks, sticky notes.
     * **Gunmetal Gray (#4A4A4A)** for secondary buttons & icons.
   * **Fonts:**

     * **Headings:** A geometric sans (e.g., Dosis or Montserrat) to hint at tech/space.
     * **Body:** A clean serif or readable sans (e.g., Lora or Inter).

2. **Animations & Micro-interactions**

   * **Hover Over Objects (3D):** Slight scale-up + subtle glow.
   * **Click to Open Section:** Camera dolly/zoom animation, then fade into 2D overlay.
   * **Sticky Notes “Pinning”:** A new note springs onto the bulletin board with a little “pop” sound effect (optional, can be muted).
   * **Idea Randomizer:** Pins shimmer briefly before settling on the “winning” idea.

3. **Easter Eggs & “Collector” Nods**

   * Hidden “collectible” icons (e.g., a rare asteroid rock, a vintage stamp, a Pokémon card icon) tucked behind drawers. If a visitor finds all 5 hidden collectibles, show a “Congratulations” modal with a link to a small downloadable “Collector’s Badge” (PNG).
   * Hover over the space telescope at night (system time–based) reveals a constellation pattern that spells out your initials in stars.

---

## 5. Backend & CMS Considerations

* **CMS for Essays & Projects:**

    Use my blog as a CMS
    Essays are at https://garden.pranavmandhare.com/Vibhuti/Essays/
    Projects are at https://garden.pranavmandhare.com/Vibhuti/Projects/

* **Idea Garage Form Handling:**
  * User cannot post ideas, ideas are added by me through the code

---

## 6. Example Inspirations (for Visual/Interaction Guidance)

1. **Bruno Simon’s Portfolio** ([https://bruno-simon.com](https://bruno-simon.com))

   * A 3D “toy car” environment where your car drives through a mini world, and each area leads to different sections.
   * Inspiration for using Three.js to craft a playful, mechanical scene with real-time physics.

2. **Robby Leonardi’s Interactive Resume** ([http://www.rleonardi.com/interactive-resume](http://www.rleonardi.com/interactive-resume))

   * While not 3D, it uses gamification (side-scrolling “level” progress to show skill bars, timeline).
   * Take cues on how to gamify your resume/information.

3. **Joshua Davies’s 3D Portfolio** ([https://joshua-davies.github.io/portfolio-3d/](https://joshua-davies.github.io/portfolio-3d/))

   * Clean Three.js integration with smooth camera controls and clickable hotspots.
   * Good example of how to make 3D environment still feel snappy & responsive.

4. **Samurai.js Demo** ([https://samurai.surge.sh](https://samurai.surge.sh))

   * A very simple, low-poly 3D scene with interactive nodes.
   * Can inform how to optimize for performance (low-poly objects, lazy-loading high-res textures).

---

## 7. Mobile & Performance Considerations

* **Responsive Degradation:**

  * On small screens or low-power devices, switch from full 3D to a layered 2D version of the “garage.” Each “section icon” can simply be a 2D image tile in a scrollable list.

* **Lazy-Loading Assets:**

  * Only load the 3D scene once per session; after that, cache it.
  * Use compressed texture formats (e.g., `.ktx2` or `.basis`) for any 3D model textures.
  * Defer nonessential animations until user interaction—e.g., the flickering overhead lamp only animates when the user hovers over it.

* **Progressive Enhancement:**

  * If WebGL isn’t supported, automatically serve a 2D CSS/HTML version with the same content in a simplified layout.

---

## 9. Summary: Communicating **Your** Personality

1. **Collector’s Eye:**

   * Every section is a “collectible artifact”—whether it’s a stamp, a toy car, or a space memorabilia—reinforcing that childhood urge to gather interesting pieces of knowledge and experiments.

2. **Tinkerer’s Garage:**

   * A “lab/garage” metaphor shows you as someone who still loves hands-on experimentation—even in software—tying in your mechanical and aerospace roots.
   * The visitor feels invited to “open a drawer” or “pick up a tool,” mimicking your real-world process.

3. **First-Principles & Curiosity:**

   * Essays and blog posts live in a digital journal library, spotlighting your philosophical bent and desire to document “why things are the way they are.”
   * The interactive “Skill Blocks” or “First-Principles” infographic reminds a visitor that you’re not just a product manager—you deconstruct problems from the ground up.

4. **Storytelling & Collaboration:**

   * “Idea Garage” doubles as a digital campfire for stories: visitors can both read your stories and pin their own.
   * The ability to “upvote” or “pick a random idea” showcases your openness to collaboration and human narratives.

5. **Gamified Interactions:**

   * Hidden collectibles reward deep exploration—just as you spent hours as a kid hunting for rare cards.
   * Animations and 3D interactions mirror your love of games like Age of Empires (building worlds, discovering new things).

6. **Mechanical & Space Aesthetics:**

   * Tool cabinets, stamped “milestones,” space skylights—visual cues that reinforce your origin story (starry fascination + mechanical engineering).
