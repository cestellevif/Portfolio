# Portfolio Website — Creative & Interaction Brief
**Prepared for build handoff · Phase Two**
**Stack: HTML + CSS + JavaScript · GSAP via CDN · GitHub Pages**

---

## 01 · Purpose & Audience

This site exists to translate deeply lived professional experience into legible, felt capability — for people who might hire Elle in a salaried or freelance capacity.

**Primary Audience**
- Hiring managers and team leads in product, operations, civic tech, and media literacy spaces
- Freelance clients seeking systems thinkers, not just task executors
- Funders and collaborators evaluating judgment and range

**The Problem This Solves**

Several of Elle's most significant projects — AYSO volunteer coordination, COVID mask distribution, civic leadership — appear on paper as community service. They are, in fact, evidence of product management, systems design, and operational leadership at scale. The site's job is to close that gap before a visitor forms the wrong impression.

**The Goal**

The visitor should feel competence and long-term planning as a gut reaction — before they have consciously processed a single word. Felt authority, not listed credentials. Coherence that arrives as a sensation.

---

## 02 · Positioning & Through-Line

> *I build systems — digital and human — that route the right information to the right people at scale.*

This is the thesis. Every project is evidence. The site architecture should make this argument structurally — not just state it in an about section.

**What This Is Not**
- A developer portfolio
- A founder deck
- A resume in website form

**What This Is**
- A thinker-builder with a point of view and a track record
- Someone who sees broken systems, diagnoses them structurally, builds something new, and makes it work
- A person whose form of intelligence shows in how she organizes information, not just what she produces

---

## 03 · Project Inventory

Ten projects across three clusters. Each structured as: **Goal → Problem → Solution**. The goal is always stated first — matching Elle's working method and reinforcing the through-line.

---

### 🔴 RED LINE — Civic & Community Leadership

#### March for Science 2017
- **Role:** Communications Director
- **Goal:** Give the scientific community a coherent public voice at a moment of political urgency.
- **Problem:** A decentralized, volunteer-led march needed consistent messaging across platforms and regions.
- **Solution:** Led communications strategy and execution for the 2017 march.
- **Connected to:** Recycle Hawaii →

#### Recycle Hawaii
- **Role:** President
- **Goal:** Build durable community infrastructure for environmental action in Hawaii.
- **Problem:** Recycling and sustainability efforts were fragmented and underresourced.
- **Solution:** Led organizational operations as president; built systems for sustained community engagement.
- **Connected to:** ← March for Science · Blue Mask Group →

#### Blue Mask Group — COVID Mask Production & Distribution
- **Goal:** Get protective equipment to people who needed it when institutional supply chains had failed.
- **Problem:** Standard disposable masks were scarce, wasteful, and lower quality than necessary.
- **Solution:** Stood up a production and distribution operation using reusable materials — higher quality than standard masks, lower waste. Coordinated sourcing, manufacturing, and last-mile delivery at meaningful scale under conditions of genuine urgency.
- **Connected to:** ← Recycle Hawaii · AYSO →

#### AYSO — Volunteer Coordination System
- **Goal:** Triple volunteer participation and eliminate burnout without adding staff.
- **Problem:** A single-point-of-failure volunteer structure meant the same people burned out every season. New volunteers had no clear entry points.
- **Solution:** Redesigned the entire coordination architecture: role ladders, warm handoffs, distributed ownership, sustainable load balancing. Volunteer participation tripled. The structure became self-sustaining.
- **Connected to:** ← Blue Mask Group · Olympia Planning Commission →

#### Olympia Planning Commission
- **Role:** Commissioner (appointed, current)
- **Goal:** Ensure community development decisions reflect long-term civic values, not short-term pressure.
- **Problem:** Planning decisions shape cities for decades. The process requires structured, evidence-based participation.
- **Solution:** Serving as appointed commissioner on the Olympia Planning Commission — active, ongoing civic infrastructure work.
- **Connected to:** ← AYSO · [terminus]

---

### 🔵 BLUE LINE — Coding & Product

#### PEMDAS — AR Math Game
- **Goal:** Make math engaging for kids through creativity, customization, and play.
- **Problem:** Math education tools prioritize drill over delight. Kids disengage when there is no room for ownership or self-expression.
- **Solution:** An augmented reality game teaching order of operations through customizable pets as motivation — infinite combinations give kids something to invest in. Concept, back-end logic, and UX led by Elle. Testing and QA led by Elle. Reached production. Targeting Google Play release.
- **Note:** Images available for integration.
- **Connected to:** Ask Better Questions →

#### Ask Better Questions (ABQ)
- **Goal:** Help readers become active, not passive, consumers of news.
- **Problem:** Most people share news without interrogating it. Media literacy tools either lecture or overwhelm.
- **Solution:** A Chrome extension and web app that generates three categories of questions — Words, Proof, Missing — at the moment of reading. Shipped. Mobile app complete and in Google Play submission process. Mozilla Democracy x AI Incubator grant applicant.
- **Connected to:** ← PEMDAS · Comprehend →

#### Comprehend
- **Goal:** Give users a structured lens for analyzing any article, not just flagging bad content.
- **Problem:** Fact-checking addresses symptoms. Most readers lack a framework for reading structure, not just claims.
- **Solution:** In-progress lens-based analysis app. Five lenses: Grounding, Language & Framing, Agency & Actors, Claims & Support, Implications & Assumptions. Companion product to ABQ.
- **Connected to:** ← Ask Better Questions · Crosswords →

#### Crosswords
- **Goal:** Extend the word puzzle format into something spatially and cognitively harder.
- **Problem:** Wordle-style games are compelling but solved quickly. There is room for a version with more challenge and replayability.
- **Solution:** A word puzzle app where players must guess five intersecting words simultaneously — adding spatial reasoning to the vocabulary challenge. UX direction led by Elle. Google Play approved. Preparing for public launch.
- **Connected to:** ← Comprehend · [terminus]

---

### 🟡 YELLOW LINE — Operations & Property

#### Property Management & Renovation
- **Goal:** Deliver well-managed properties and completed renovations on time, with cost decisions that preserve and create value.
- **Problem:** Property management and renovation require judgment under uncertainty — materials, timelines, contractors, and budgets rarely behave as expected.
- **Solution:** Active property manager. Executes renovation projects on time. Makes cost-saving decisions that deliver real value. Demonstrates the same systems instinct — reduce friction, close loops, build for durability — applied to physical rather than digital infrastructure.
- **Connected to:** [standalone]

---

## 04 · Visual & Interaction Concept

### The Metaphor: Metro Map

The interaction is modeled on a transit system in the tradition of Harry Beck's original London Underground map. Bold. Geometric. No organic curves — only straight lines and hard 45-degree angles. The map does not show geography. It shows **relationship**. That is precisely what this site is doing.

The visual language is Beckian and Bauhaus: primary colors, geometric forms, purposeful structure. The form of the diagram argues the content of the work.

### Color System

Three lines. Three clusters. Bold primary colors — not accent colors, not pastels. The full primaries.

| Line | Cluster | Color | Hex |
|---|---|---|---|
| 🔴 Red | Civic & Community Leadership | Bold Red | `#E3000F` |
| 🔵 Blue | Coding & Product | Bold Blue | `#003DA5` |
| 🟡 Yellow | Operations & Property | Bold Yellow | `#FFD700` |

These are the colors of transit maps, Mondrian, the Bauhaus — they carry authority without explanation.

### Typography

**Display font: Staatliches** (Google Fonts)
All-caps, condensed, bold geometric presence. Used for station names, project titles, goal anchors, and "Continues to →" labels. Carries the retro-technical authority the aesthetic requires.

**Body font:** A narrow grotesque or monospace — clean, utilitarian, in register with the display choice. Suggested: DM Mono, Space Grotesk, or IBM Plex Mono.

### The Line

A metro line runs down the **left side of the screen**. It is the spine of the site. It is always present. It moves like something alive.

The line **races ahead of the user's scroll** — always slightly out of reach, always pulling forward. The user is chasing the destination. This is intentional.

### Per-Stop Interaction (GSAP ScrollTrigger)

Each project is a **station** on the map. The behavior per stop:

1. **The line races to the station and anchors.** The major stop renders first — this is the **Goal**. Bold. Large. Staatliches. It is the terminus the line was heading toward.

2. **Scroll locks (GSAP pin).** The user is held at this station.

3. **Preceding stops grow outward from the spine, left to right.** Each stop is a stage in the project scaffold — Problem, Constraint, Decision, Solution — emerging in sequence. They build the argument the same way Elle builds her work: backwards from the goal, but presented forward so the reader follows the logic.

4. **The line releases.** If this project connects to another on the same line, the "Continues to →" label appears in Staatliches and the line races ahead in the same color. If it is a cluster terminus, the line closes with a hard stop and a new colored line begins — potentially traveling horizontally across the screen before the new vertical spine begins, creating lateral movement and visual energy.

### Motion Principles

- All turns are **45-degree angles only** — no curves, no organic shapes
- Line animation is **SVG path draw**, scroll-driven via GSAP DrawSVG
- Station dots are **hard circles** — consistent with the geometric system
- Branching between clusters travels **horizontally across the screen** before the new vertical spine begins
- Speed of line travel should feel **purposeful, not decorative** — it is going somewhere
- Yellow line on white background requires a stroke or shadow treatment for legibility — resolve in design phase

### The Feeling to Produce

> Settled. Confident. Like you are in good hands before you have read a word.

The map tells you there is a system before you read the details. That is the gut reaction the site is designed to produce.

---

## 05 · Technical Specifications

**Platform**
- Static HTML + CSS + JavaScript — no CMS, no framework dependency
- Hosted on **GitHub Pages** — free, custom domain support, no monthly fee
- GSAP loaded via CDN — free, no installation, all plugins included (DrawSVG, ScrollTrigger)
- Google Fonts — Staatliches for display

**Why not Webflow**
Webflow's free plan does not allow custom JavaScript, which is required for GSAP ScrollTrigger. The paid plan ($14/mo minimum) would unlock this, but for a static portfolio with fixed content, a GitHub Pages static site gives full control with no ongoing cost and no platform abstraction between the code and the animation.

**Key Interactions to Build**
- SVG metro line — scroll-driven path draw, left rail spine, 45-degree geometry, color changes at cluster transitions
- Section pin on scroll arrival — GSAP ScrollTrigger `pin: true`
- Goal anchor renders first at each station — bold, Staatliches, prominent
- Stop bloom left to right — staggered entrance of preceding stops (problem → constraint → solution) after goal anchors
- "Continues to →" labels at intra-cluster connections — Staatliches, line color
- Cluster transition — horizontal line travel across screen between terminus and new spine origin
- Line release and race — on unpin, line reanimates to next station

**File Structure**
```
/
├── index.html
├── style.css
├── main.js
├── gsap/          ← loaded via CDN, no local files needed
├── fonts/         ← Staatliches via Google Fonts embed
├── images/        ← project imagery, lazy-loaded
└── README.md      ← brief summary for repo
```

**Performance Constraints**
- All animation via GSAP — no CSS-only animation for core interactions
- SVG line must be performant on mobile — test and simplify early
- Images lazy-loaded; bloom animation waits for load
- Yellow on white requires legibility check — add stroke or drop shadow if needed

**Page Structure (single page)**
- Hero — name, through-line, one-line bio
- Metro map — all three lines, all ten projects
- About — brief, methodology-focused, not biographical
- Contact — minimal, one clear action

---

## 06 · Content Principles

**For Every Project**
- Lead with the goal, not the process
- State the problem in one sentence — the tension, not the backstory
- State the solution in terms of what changed, not what was done
- Use specificity as proof of competence — numbers, structural details, actual mechanisms

**Tone**
- Direct. Confident without being loud.
- No jargon that requires decoding
- No false modesty. No over-claim.
- The writing should feel like the site looks: deliberate, unhurried, sure of itself

**What to Avoid**
- Passive constructions ("was built," "was created")
- Generic capability claims ("strong communicator," "detail-oriented")
- Listing tools or technologies as the headline
- Anything that explains rather than demonstrates

---

## 07 · Phase Plan

### Phase One — Existence
Get the site live. Content-first. No animation. Static HTML with clean typography, correct structure, all ten projects organized by cluster. Through-line visible from the first scroll.

- GitHub repo created
- index.html with all content
- Staatliches installed via Google Fonts
- Typography and color system locked
- Three clusters visually distinct (color, not animation)
- Mobile responsive
- Custom domain pointed at GitHub Pages
- Live

### Phase Two — Experience
Introduce the metro map interaction. The line. The pins. The stations. The bloom. Full GSAP ScrollTrigger build on top of stable Phase One content.

- SVG metro spine drawn and scroll-driven
- 45-degree geometry enforced throughout
- Three-color line system implemented (red, blue, yellow)
- "Continues to →" station labels at intra-cluster connections
- Cluster terminus → new line horizontal transition
- Section pinning per station
- Goal anchor renders first, stops bloom left to right
- Mobile adaptation (simplify line to indicator bar or static map thumbnail)
- Performance audit
- Accessibility review (reduced motion media query)

---

## 08 · Design Decisions to Resolve Before Build

These questions should be answered with sketches or low-fidelity prototypes — not in code.

- How many stops per station? Is it always goal + three (problem, constraint, solution), or variable per project?
- Yellow line legibility on white background — stroke weight, shadow, or off-white background behind yellow sections?
- Does the hero section participate in the metro metaphor (e.g. "You are here" marker at top of spine) or precede it entirely?
- How does the about section sit within or outside the map system?
- What is the station dot treatment — solid filled circle, ring, or something else?
- How does the map handle the single-project yellow line visually — does it feel like a real line or an afterthought?
- Mobile: static metro map thumbnail that links to sections, or simplified linear scroll without the pin behavior?

---

## 09 · Inspiration Directions

**For the Metro Map Aesthetic**
- Harry Beck's 1933 London Underground map — the canonical reference
- Massimo Vignelli's 1972 New York City Subway map — bolder, more geometric
- Mondrian's primary color grid compositions — for the color authority
- Bauhaus typography specimens — for Staatliches context

**For Interaction Technique**
- GSAP ScrollTrigger docs — gsap.com/docs/v3/Plugins/ScrollTrigger
- GSAP DrawSVG plugin — gsap.com/docs/v3/Plugins/DrawSVGPlugin
- GSAP pen demos on CodePen — search "DrawSVG ScrollTrigger"
- Awwwards — portfolio category, filter for editorial not agentic

**For the Thinker-Builder Register**
- Personal sites of journalists-turned-product-managers, researchers who ship, or operators who write — closer analog than designer or developer portfolios

---

## 10 · Agent Build Notes

*This section is addressed directly to the agent executing the build.*

**What this brief is:**
A complete creative and interaction specification for a personal portfolio site. Content is final. Visual metaphor is final. Interaction logic is specified. Typography and color system are specified.

**What you are building:**
A static HTML/CSS/JS site hosted on GitHub Pages. GSAP via CDN. No framework. No CMS. No Webflow. The metro map is the central visual and interaction concept. Staatliches is the display font. The line is the navigation mechanism and the argument.

**Line colors — non-negotiable:**
- Red `#E3000F` — Civic & Community Leadership
- Blue `#003DA5` — Coding & Product
- Yellow `#FFD700` — Operations & Property

**Do not:**
- Substitute organic curves for 45-degree angles
- Use a different display font without flagging it
- Simplify the interaction concept without flagging it
- Omit the "Continues to →" connection logic between clustered projects
- Use a framework (React, Vue, etc.) — plain HTML/CSS/JS only
- Begin Phase Two before Phase One is stable and live

**Start here:**
1. Create GitHub repo, enable GitHub Pages
2. Build `index.html` — all ten projects, three clusters, correct goal → problem → solution structure per station
3. Add Staatliches via Google Fonts embed in `<head>`
4. Apply color system in CSS — three line colors as CSS custom properties
5. Make it mobile responsive
6. Point custom domain at GitHub Pages
7. Confirm live
8. Return to this brief for Phase Two GSAP build

---

*This brief is complete enough to hand off in a single session. The content architecture is the foundation. The interaction concept is the vision. Phase One does not require Phase Two to be meaningful.*
