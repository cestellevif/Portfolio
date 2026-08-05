# Figma Prototype Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build an 11-frame Figma storyboard prototype of the Phase 2 metro map portfolio interaction.

**Architecture:** Create a new Figma file, establish the design system as shared styles, then build each frame in sequence. Frames are connected via Figma prototype links to enable click-through walkthrough. No code — pure Figma design work using the Figma MCP.

**Tech Stack:** Figma MCP (`use_figma`, `create_new_file`, `get_screenshot`), Staatliches via Google Fonts, design tokens for three line colors.

**Agents to check in with:** ui-designer for component/layout review, ui-ux-pro-max for interaction pattern validation.

**Reference:** `docs/plans/2026-04-29-figma-prototype-design.md` — full design spec, all decisions resolved.

---

## Design Tokens (reference for all tasks)

```
Red line:       #E3000F
Blue line:      #003DA5
Yellow line:    #FFD700
Hero bg:        ~#C0392B or warm vermillion (finalize in F1)
Yellow section: #FAF7F0 (off-white/cream)
White bg:       #FFFFFF
Display font:   Staatliches (all-caps, condensed)
Body font:      DM Mono
Goal dot:       Large solid filled circle, 24px diameter
Sub-stop dot:   Small hollow ring, 12px diameter, 2px stroke
Spine width:    4px
Geometry:       45-degree angles only, no curves
Frame size:     1440x900 (desktop viewport)
```

---

### Task 1: Create Figma file and verify account

**Files:** New Figma file (no local files)

**Step 1: Check Figma account**
Tool: `mcp__claude_ai_Figma__whoami`
Expected: Returns current user info and team context.

**Step 2: Create new Figma file**
Tool: `mcp__claude_ai_Figma__create_new_file`
- Name: "Portfolio Metro Map — Phase 2 Prototype"
Expected: Returns fileKey. Save this — needed for all subsequent tasks.

**Step 3: Verify file exists**
Tool: `mcp__claude_ai_Figma__get_metadata` with returned fileKey
Expected: File name matches, file is accessible.

---

### Task 2: F1 — Main Station (Hero/Hub)

**Design spec:**
- 1440x900 frame
- Background: warm vermillion/burnt orange (try #C0392B, adjust to taste)
- Name: "ELLE ESTELLEVIF" — Staatliches, ~96px, white
- Through-line: "I BUILD SYSTEMS — DIGITAL AND HUMAN — THAT ROUTE THE RIGHT INFORMATION TO THE RIGHT PEOPLE AT SCALE." — Staatliches, ~24px, white, max-width ~800px
- Bio: 1-2 lines, DM Mono, 16px, white, below through-line
- Route selectors row, centered below bio, ~80px from bottom of text block:
  - Red filled circle (24px) + "COMMUNITY ORGANIZING" in Staatliches 20px white
  - Blue filled circle (24px) + "CODING & PRODUCT" in Staatliches 20px white
  - Yellow filled circle (24px) + "OPERATIONS & PROPERTY" in Staatliches 20px white
  - Spacing between selectors: 64px

**Step 1: Build F1**
Tool: `mcp__claude_ai_Figma__use_figma`
Describe the frame in full detail per the spec above.

**Step 2: Screenshot to verify**
Tool: `mcp__claude_ai_Figma__get_screenshot`
Check: Background color reads warm/authoritative not cold. Route selectors are clearly tappable. Hierarchy is name → through-line → bio → routes.

**Step 3: Adjust if needed**
If background reads too dark or too orange, revise hex before proceeding.

---

### Task 3: F2 — Route Selected (Red), Line Departing

**Design spec:**
- 1440x900 frame, white background
- Left rail spine: 4px vertical line, #E3000F, starts ~120px from left edge
- Line departs hub: a 45-degree diagonal segment from top-center (representing hub connection) angles down-left to meet the spine at y~200. Two hard corners, no curves.
- Spine runs from y~200 to y~700 (mid-frame, suggesting it continues)
- Station dot: faint placeholder ring at y~600 on spine (50% opacity, #E3000F, 24px ring)
- "RETURN TO MAIN STATION" — Staatliches 16px, #E3000F, upper right, ~40px from top and right edges. Small left-arrow glyph before text.
- Line segment at bottom of frame fades (opacity gradient) suggesting it continues

**Step 1: Build F2**
Tool: `mcp__claude_ai_Figma__use_figma`

**Step 2: Screenshot to verify**
Check: 45-degree geometry is clean. Spine is clearly a transit line. "Return" anchor is visible but not dominant.

---

### Task 4: F3 — Mid-Travel

**Design spec:**
- 1440x900 frame, white background
- Spine: same position as F2, 4px, #E3000F
- Line fills more of the spine (progress indicator — line has traveled further)
- Station dot placeholder: slightly more visible (70% opacity ring) at y~500
- "RETURN TO MAIN STATION" anchor: upper right (same position as F2)
- No text content — pure travel state

**Step 1: Build F3**
Tool: `mcp__claude_ai_Figma__use_figma`

**Step 2: Screenshot to verify**
Check: Reads as motion/travel. Distinct from F2 (further along).

---

### Task 5: F4 — Goal Arrives (March for Science)

**Design spec:**
- 1440x900 frame, white background
- Spine: left rail, 4px, #E3000F
- Station dot: large solid filled circle, 24px, #E3000F, at y~200 on spine
- GOAL BAND — anchored to bottom of frame:
  - Full-width band, height ~120px, background #E3000F
  - Text: "GET A LARGE TURNOUT FOR THE MARCH FOR SCIENCE." — Staatliches, ~48px, white, centered vertically in band
  - Left edge of band: small solid dot #E3000F connecting visually to spine (the line "arrives" at this goal)
- Everything above the goal band: empty (sub-stops not yet revealed)
- "RETURN TO MAIN STATION" anchor: upper right

**Step 1: Build F4**
Tool: `mcp__claude_ai_Figma__use_figma`

**Step 2: Screenshot to verify**
Check: Goal band reads as a destination board. Dominates the bottom. The emptiness above feels intentional — anticipation.

---

### Task 6: F5, F6, F7 — Sub-stops Blooming

**Design spec (F5 — Sub-stop 1):**
- Same as F4 (goal band at bottom, spine, station dot)
- Sub-stop 1 appears above station dot, branching RIGHT from spine:
  - Horizontal arm: 4px line, #E3000F, extends ~200px right from spine at y~160
  - Small hollow ring: 12px, 2px stroke, #E3000F, at end of arm
  - Label: "ESTABLISH COMMUNICATIONS TEAM" — Staatliches 18px, #1A1A1A, to right of ring, vertically centered

**Design spec (F6 — Sub-stop 2):**
- Everything from F5 plus:
- Sub-stop 2 arm at y~120 (above sub-stop 1):
  - Same arm treatment
  - Label: "TEMPLATE INTERNAL COMMUNICATIONS"

**Design spec (F7 — Sub-stop 3):**
- Everything from F6 plus:
- Sub-stop 3 arm at y~80:
  - Label: "WRITE PRESS RELEASE"

**Step 1: Build F5, F6, F7**
Tool: `mcp__claude_ai_Figma__use_figma` — build each frame, sub-stops growing upward

**Step 2: Screenshot F7 to verify fully bloomed state**
Check: Sub-stops read as steps leading TO the goal. Upward progression feels logical. Arms branch cleanly from spine. Goal band still dominates bottom.

---

### Task 7: F8 — Station Complete, Line Releases

**Design spec:**
- Same as F7 (all sub-stops visible, goal band at bottom)
- Add: line segment below station dot begins pulling away (faint animated-state representation — dotted or lower opacity line continuing down spine)
- Add: small downward arrow on spine below station dot (suggests "continues")
- No "CONTINUES TO" label needed mid-line — that's implicit in the map

**Step 1: Build F8**
Tool: `mcp__claude_ai_Figma__use_figma`

**Step 2: Screenshot to verify**
Check: Clear that journey continues. Station feels "complete."

---

### Task 8: F9 — Red Terminus (Olympia Planning Commission)

**Design spec:**
- Full station sequence (goal band + sub-stops) for Olympia Planning Commission
- Goal band: "ENSURE COMMUNITY DEVELOPMENT DECISIONS REFLECT LONG-TERM CIVIC VALUES."
- Sub-stops: "APPOINTED COMMISSIONER" / "ACTIVE ONGOING PARTICIPATION"
- Terminus treatment: below the station dot, spine ends with a DOUBLE horizontal bar terminus mark (standard transit map terminus) — two short horizontal lines crossing the spine, 4px each, 8px apart
- NO continuation label. Hard stop.

**Step 1: Build F9**
Tool: `mcp__claude_ai_Figma__use_figma`

**Step 2: Screenshot to verify**
Check: Terminus reads as intentional closure, not an omission.

---

### Task 9: F10 — Return to Main Station

**Design spec:**
- Same as F1 (Main Station hub) BUT:
- Red route selector has a "visited" state — filled circle with a checkmark or subtle opacity change to indicate Red was traveled
- Blue and Yellow selectors are at full emphasis — inviting next choice
- Optional: small annotation "YOU HAVE TRAVELED: COMMUNITY ORGANIZING" in DM Mono 14px beneath the route selectors

**Step 1: Build F10**
Tool: `mcp__claude_ai_Figma__use_figma`

**Step 2: Screenshot to verify**
Check: Hub feels like a return, not a reset. Visited state is clear but not distracting.

---

### Task 10: F11 — Yellow Cluster (Property Management)

**Design spec:**
- 1440x900 frame, background #FAF7F0 (off-white/cream)
- Yellow spine: left rail, 4px, #FFD700 — add 1px #C8A800 shadow/offset for legibility on cream
- "RETURN TO MAIN STATION" anchor: upper right, #8B7355 (warm dark tone, not cold gray)
- Full station: Goal band + sub-stops
- Goal band: cream background with #FFD700 left border (4px), text in #1A1A1A (not white — white won't work on yellow)
  - Text: "DELIVER WELL-MANAGED PROPERTIES AND COMPLETED RENOVATIONS ON TIME."
- Sub-stops: "EXECUTE RENOVATION PROJECTS" / "MAKE COST-SAVING DECISIONS" / "DEMONSTRATE SYSTEMS INSTINCT IN PHYSICAL INFRASTRUCTURE"
- Terminus: double bar, same treatment as F9 but in #FFD700

**Step 1: Build F11**
Tool: `mcp__claude_ai_Figma__use_figma`

**Step 2: Screenshot to verify**
Check: Cream background reads warm, not washed out. Yellow line is legible. Goal band text reads clearly. Single station feels complete, not thin.

---

### Task 11: Connect prototype links

**Step 1: Link F1 → F2**
- Route selector "COMMUNITY ORGANIZING" in F1 → F2 (Red line departs)
- Tool: `mcp__claude_ai_Figma__use_figma` — add prototype connections

**Step 2: Link F2 → F3 → F4 → F5 → F6 → F7 → F8 → F9**
- Linear sequence through Red line
- Each frame: click anywhere (or add "scroll" annotation) → next frame

**Step 3: Link F9 → F10 (Return to Main Station)**
- "RETURN TO MAIN STATION" on F9 → F10

**Step 4: Link F10 → F11**
- "OPERATIONS & PROPERTY" selector in F10 → F11

**Step 5: Link F11 → F10**
- "RETURN TO MAIN STATION" on F11 → F10

**Step 6: Verify prototype flow**
Tool: `mcp__claude_ai_Figma__get_screenshot` on F1
Check: Prototype connections visible as arrows in Figma.

---

### Task 12: Final review

**Step 1: Screenshot each frame**
Tool: `mcp__claude_ai_Figma__get_screenshot` for F1, F4, F7, F9, F11
Check against design doc: `docs/plans/2026-04-29-figma-prototype-design.md`

**Step 2: Verify open design questions are all answered visually**
- [ ] Two-tier dot system readable (large solid vs small ring)
- [ ] Goal-at-bottom reads as destination board
- [ ] Sub-stops bloom direction (upward) is clear
- [ ] Cream background solves yellow legibility
- [ ] Return anchor visible on every route frame
- [ ] Terminus treatment reads as closure

**Step 3: Share file URL with user**
Tool: `mcp__claude_ai_Figma__get_metadata` — retrieve shareable link
Deliver URL to user.
