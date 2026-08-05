# Figma Prototype Design — Metro Map Portfolio (Phase 2)
**Date:** 2026-04-29
**Scope:** Interactive storyboard prototype for Phase 2 GSAP metro map experience

---

## Architecture Overview

Hub-and-spoke transit model. The hero is the Main Station — a central hub from which three named lines depart. Each line is a self-contained route through one cluster of projects. The user travels a route by scrolling; they return to the hub to switch lines.

This replaces the single-continuous-line model from the original brief.

---

## Main Station (Hero/Hub)

- Warm red-orange background — vermillion/burnt orange tone, not the metro red (`#E3000F`)
- Name in Staatliches, large
- Through-line statement
- Brief bio
- Three route selectors below: colored dot + line name
  - Red dot — "Community Organizing"
  - Blue dot — "Coding & Product"
  - Yellow dot — "Operations & Property"
- This is the departure point for all three lines

---

## Route Experience

### Departure
- On route selection, line departs Main Station at a 45-degree angle, pivots, drops into the vertical left-rail spine
- Each line has a distinct geometric departure path from the hub (Red: left rail; Blue: center, 45-degree left then down; Yellow: right, 45-degree then down)
- "Return to Main Station" anchor appears upper right in Staatliches — stays fixed for the entire route

### Travel
- Line races down the vertical spine ahead of the user's scroll
- Station dot position faintly visible as line approaches

---

## Station Anatomy

Each project is a station. The interaction sequence per station:

1. **Charcoal spine draws downward** — scroll-driven DrawSVG, user is traveling the line
2. **Spine hits goal dot → viewport PINS** — goal band locks in at bottom of viewport. User sees where they've arrived.
3. **User continues scrolling (viewport stays pinned)** — color fills top-down through the spine, following scroll direction
4. **Color hits each sub-stop junction** → arm grows OUTWARD from spine (radiating right) — sub-stops are things Elle built FROM this goal, not prerequisites to it
5. **Ring fills, label appears** as arm completes
6. **All sub-stops revealed → UNPIN** — charcoal spine races to next goal

### Sub-stop framing
Sub-stops are **outputs, not inputs**. They radiate outward from the goal. The goal is the generative event; the arms are what came from it. This is "things that happen FROM me" not "things that happen to me."

### Spine color system
- **Resting/traveling state:** Charcoal (#2D2D2D) — thick, poster-weight line
- **Active/revealed state:** Route color fills top-down as scroll progresses through pinned section
- Station dot is **pre-lit in route color** — a beacon ahead while spine is still charcoal

### Dot System
- **Goal station dot:** Large solid filled circle (route color, always lit)
- **Sub-stop dots:** Smaller hollow ring (fills with route color when arm completes)

### Stop Count
- Variable: Goal + up to 4 sub-stops per station
- Sub-stops are the actual work outputs — things that radiated from achieving this goal

---

## Station Content (Red Line — Community Organizing)

### March for Science
- **Goal (bottom anchor):** Get a large turnout for the March for Science
- Sub-stops: Establish communications team / Template internal communications / Write press release

### Recycle Hawaii
- **Goal:** Establish Recycle Hawaii as an educational advocacy organization in Hilo
- Sub-stops: Hired executive director / Supported initial phase / Interacted with press and media

### Blue Mask Group
- **Goal:** Get protective equipment to people when institutional supply chains failed
- Sub-stops: Sourced reusable materials / Stood up production operation / Coordinated last-mile distribution

### AYSO
- **Goal:** Triple volunteer participation and eliminate burnout without adding staff
- Sub-stops: Redesigned coordination architecture / Built role ladders / Created warm handoffs / Distributed ownership model

### Olympia Planning Commission
- **Goal:** Ensure community development decisions reflect long-term civic values
- Sub-stops: Appointed commissioner / Active ongoing participation
- **Terminus:** Hard stop — large solid dot, no "Continues to" label

---

## Cluster Transitions

### Between stations (same line)
- Line races from completed station to next station dot
- Goal at bottom fades/scrolls away as new goal arrives

### Between lines (at hub)
- User selects "Return to Main Station" (upper right anchor)
- Returns to hub, selects next route
- No automatic line-to-line transition — each route is a deliberate choice

---

## Yellow Line Treatment
- Single project (Property Management)
- Full line treatment — same spine, same station anatomy, hard terminus dot
- Section background: off-white/cream (not pure white) to solve yellow-on-white legibility
- One station, fully rendered, no visual apology

---

## Visual System

| Element | Spec |
|---|---|
| Display font | Staatliches (Google Fonts) — all-caps, condensed |
| Body font | DM Mono or IBM Plex Mono |
| Red line | `#E3000F` |
| Blue line | `#003DA5` |
| Yellow line | `#FFD700` |
| Spine (resting) | `#2D2D2D` charcoal — thick, poster-weight |
| Spine (active) | Route color fills top-down on scroll while pinned |
| Hero background | `#B5451B` (warm burnt sienna — confirmed in Figma) |
| Yellow section bg | Off-white/cream `#FAF7F0` |
| All geometry | 45-degree angles only, no curves (hub departure excepted) |
| Station dot (goal) | Large solid filled circle, route color, always pre-lit |
| Station dot (sub-stop) | Small hollow ring, fills with route color when arm completes |
| Stack | React + GSAP (ScrollTrigger + DrawSVG) |
| Hosting | GitHub Pages |

---

## Storyboard Frame Set

| Frame | Description |
|---|---|
| F1 | Main Station — hub, three route selectors, warm red-orange bg |
| F2 | Route selected (Red) — line departs 45-degree, spine establishes, "Return" anchor appears |
| F3 | Mid-travel — line racing down spine, next station faintly visible |
| F4 | Goal arrives — line anchors at station dot, goal locks to bottom of viewport |
| F5 | Sub-stop 1 blooms above goal |
| F6 | Sub-stop 2 blooms |
| F7 | Sub-stop 3 blooms |
| F8 | Station complete — all sub-stops visible, line releases |
| F9 | Red terminus — last station (Olympia), hard stop dot, no continuation label |
| F10 | Return to Main Station — hub state, route selector visible, Blue available |
| F11 | Yellow cluster — cream background, single station, full treatment, terminus |

---

## Open Questions Resolved

| Question | Decision |
|---|---|
| Stop count | Variable, Goal + up to 4 sub-stops |
| Station dot | Two-tier: large solid (Goal), small ring (sub-stops) |
| Hero in metro metaphor? | Hero IS the Main Station hub — precedes the line experience |
| Yellow legibility | Off-white/cream section background |
| Yellow single-project feel | Full line treatment, hard terminus, no apology |
| Scroll direction | Vertical (down = along the line) |
| Goal position | Anchored at bottom of viewport on arrival |
| Sub-stop direction | Bloom upward from goal |
| Sub-stop content | Actual work milestones, not Problem/Solution framing |
| Route switching | "Return to Main Station" anchor, upper right, always visible |
