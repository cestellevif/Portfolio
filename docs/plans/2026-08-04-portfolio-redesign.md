# Portfolio Redesign Plan
Date: 2026-08-04

## Vision
Replace the framed MainStation panel with a scroll-driven portfolio experience:
posters first (shipped products), then a dark departure board (route selector),
then horizontal transition into the metro line stations.

## Page Flow

```
[ZELLIGE TILE BG — white/cream tile texture, subway station feel]
  CEST ELLE VIF (name/brand, display type)
  Placeholder nav at top (TBD functionality)

  ┌──────────┐  ┌──────────┐  ┌──────────┐
  │ FELT     │  │ SIMMER   │  │ ASK      │
  │ WELL MET │  │          │  │ BETTER   │
  │ [visual] │  │ [visual] │  │ QUESTIONS│
  └──────────┘  └──────────┘  └──────────┘
  Art posters mounted on tile — like subway station gallery
  (see docs/inspiration/posterinspo.jpg — Rodchenko/Adler style)

[BG TRANSITIONS TILE → DARK (#090909)]

[DARK BG — departure board / "the sign"]
  Inspired by dope.security terminal aesthetic (see docs/dopesecuritydesign/)
  ┌─────────────────────────────────────────────────┐
  │  C O M M U N I T Y  O R G A N I Z I N G    →   │
  │─────────────────────────────────────────────────│
  │  C O D I N G  &  P R O D U C T              →   │
  │─────────────────────────────────────────────────│
  │  O P E R A T I O N S  &  P R O P E R T Y    →   │
  └─────────────────────────────────────────────────┘
  FlipLabel stamped text, large monospace, wide tracking
  Near-black bg, almost-white text, hairline dividers
  This IS the route selector — encountered mid-scroll after posters

[CLICK A ROUTE]
  SVG arrow animates RIGHT →
  Page scrolls HORIZONTALLY to the right of the viewport
  Background crosses from DARK → CREAM during horizontal transition
  Then the line drops DOWN ↓ vertically

[CREAM BG — metro line stations]
  Existing station/substop experience on cream background
  Spine, dot-fill, arms, goal bands — all existing animation
```

## Design References
- **Poster layout**: docs/inspiration/posterinspo.jpg — subway art posters on white tile
- **Zellige tile bg**: handmade tile texture behind the posters, sense of place
- **Departure board**: docs/dopesecuritydesign/ — midnight terminal, stamped mono type,
  near-black canvas, hairline dividers, no shadows
- **Existing DNA**: FlipLabel split-flap tiles already match the stamped boarding-pass feel

## Phases

### Phase 1 — Structure + Name + Poster Placeholders
**Goal:** New page skeleton with the vertical scroll flow (no horizontal transition yet).

**New components:**
- `SiteHeader` — "CEST ELLE VIF" display name + placeholder nav
- `PosterGrid` — 3 poster card placeholders (Felt Well Met, Simmer, Ask Better Questions)
  - Visual placeholders for now — Elle is selecting poster designs separately
- `DepartureBoard` — dark section with FlipLabel rows + arrow buttons
  - Replaces MainStation as the route selector
  - Reuses existing FlipLabel component (extract from MainStation)

**Changes to existing:**
- `App.jsx` — new page structure: SiteHeader → PosterGrid → DepartureBoard → MetroLine
- `MainStation.jsx` — refactor: extract FlipLabel, then replace with new components
- `globals.css` — add dark section colors, cream-to-dark transition vars
- Remove loop anchor (`#station-loop`) for now

**Files to create:**
- `src/components/SiteHeader/SiteHeader.jsx` + `.css`
- `src/components/PosterGrid/PosterGrid.jsx` + `.css`
- `src/components/DepartureBoard/DepartureBoard.jsx` + `.css`

**Files to modify:**
- `src/App.jsx`
- `src/styles/globals.css`

**What stays unchanged:**
- `MetroLine`, `Station`, `SubStop` components
- `useSpineAnimation`, `useStationAnimation` hooks
- `src/data/projects.js`

### Phase 2 — Departure Board Styling
**Goal:** Dark terminal aesthetic for the departure board section.

- Near-black background (#090909 or similar)
- FlipLabel tiles scaled up — large stamped monospace text
- Horizontal dividers between rows (thin, subtle)
- Arrow (→) on the right side of each row, styled as interactive
- Cream-to-dark background transition as user scrolls into this section
  - CSS gradient or scroll-driven color shift
- Hover states: text scramble on FlipLabel (already built), arrow highlight

### Phase 3 — Horizontal Scroll Transition
**Goal:** When a route is clicked, SVG arrow animates right, page scrolls
horizontally from dark to cream, then spine drops down.

- SVG path animation: arrow extends RIGHT from the clicked row
- Horizontal scroll/transform: the departure board slides left, cream section slides in from right
- Background transition: dark → cream during the horizontal motion
- Spine connector: once horizontal transition completes, vertical spine drops down
- GSAP horizontal scroll or CSS scroll-snap for the transition
- This is the most complex animation piece — may need prototyping

### Phase 4 — Poster Content (dependent on Elle's design choices)
- Replace placeholder cards with actual screenshots/videos
- Poster visual design TBD — Elle browsing references
- Possible additions: Crosswords, other projects
- Click behavior on posters TBD (link to app? expand? video?)

## Design Tokens (new)

```css
/* Dark section */
--color-dark-bg: #090909;       /* near-black canvas */
--color-dark-text: #F7F9FA;     /* almost-white stamped text */
--color-dark-border: #474747;   /* subtle dividers */
--color-dark-arrow: #F7F9FA;    /* arrow default */

/* Transition */
--transition-overlap: 80px;     /* gradient blend zone between cream and dark */
```

## Risks + Open Questions

1. **Horizontal scroll transition (Phase 3)** — most technically complex piece.
   GSAP ScrollTrigger horizontal pin, or a CSS-driven panel swap?
   May need prototyping to get the feel right.

2. **Spine origin changes** — spine currently starts from MainStation frame border.
   After redesign, spine must start from the horizontal transition endpoint.
   `useSpineAnimation` will need updates in Phase 3.

3. **Return UX** — loop anchor is removed. How does the user return from a route
   to the departure board / posters? Options: scroll back up, return button,
   reverse horizontal transition. TBD.

4. **Poster design** — Elle is browsing references. Placeholder cards for now,
   real content in Phase 4.

5. **Placeholder nav** — functionality TBD. Don't over-invest in styling yet.

6. **Mobile** — horizontal scroll transition needs a mobile-friendly alternative.
   Possibly a vertical slide or fade instead.

## Success Criteria (Phase 1)
- [ ] "CEST ELLE VIF" name visible at top in display type
- [ ] Placeholder nav present (minimal)
- [ ] 3 poster placeholder cards visible below header
- [ ] Departure board section with dark bg and FlipLabel route rows
- [ ] Clicking a route still selects and mounts the MetroLine below
- [ ] Existing station animations still work
- [ ] Mobile responsive (basic)
