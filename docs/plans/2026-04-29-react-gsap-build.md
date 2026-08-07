---
---
{% raw %}
# Metro Map Portfolio — React + GSAP Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the metro map portfolio as a single-page React app with GSAP scroll-driven animations — charcoal spine draws toward each goal, pins, color fills top-down revealing outward-radiating sub-stops, then releases.

**Architecture:** Vite + React outputs a static site deployable to GitHub Pages. The metro map is a hybrid SVG/DOM layout — SVG handles all geometric lines and dots (spine, arms, station circles), DOM handles all text content (goal bands, labels, navigation). GSAP ScrollTrigger drives every animation: spine DrawSVG via stroke-dashoffset, section pins, color overlay fill, and sub-stop arm reveals. One long continuous scroll — the poster keeps going.

**Tech Stack:** React 18, Vite, GSAP 3 (ScrollTrigger via npm — free), stroke-dashoffset for line animation (no DrawSVG license needed), CSS custom properties, Staatliches + DM Mono via Google Fonts, GitHub Pages via `gh-pages`.

**Agents to check in with:** `react-specialist` for component architecture and GSAP React patterns, `frontend-developer` for SVG animation and scroll behavior, `ui-designer` for visual QA against the Figma prototype.

**Figma reference:** https://www.figma.com/design/ZxXcOGcHDjY4lelnQ4rqCD
**Design doc:** `docs/plans/2026-04-29-figma-prototype-design.md`

---

## Design Tokens (reference for all tasks)

```
--color-red:        #E3000F
--color-blue:       #003DA5
--color-yellow:     #FFD700
--color-charcoal:   #2D2D2D
--color-hub:        #B5451B
--color-cream:      #FAF7F0
--color-white:      #FFFFFF
--color-ink:        #1A1A1A
--font-display:     'Staatliches', sans-serif
--font-body:        'DM Mono', monospace
--spine-width:      8px  (thick poster-weight)
--spine-x:          120px from left edge
--frame-width:      1440px max
```

---

## File Structure

```
/
├── index.html
├── vite.config.js
├── package.json
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── data/
│   │   └── projects.js          ← all content, all 3 lines
│   ├── components/
│   │   ├── MainStation/
│   │   │   ├── MainStation.jsx
│   │   │   └── MainStation.css
│   │   ├── MetroLine/
│   │   │   ├── MetroLine.jsx
│   │   │   └── MetroLine.css
│   │   ├── Station/
│   │   │   ├── Station.jsx
│   │   │   └── Station.css
│   │   └── SubStop/
│   │       ├── SubStop.jsx
│   │       └── SubStop.css
│   └── styles/
│       └── globals.css
└── public/
    └── fonts/                   ← if self-hosting fonts later
```

---

### Task 1: Scaffold Vite + React project

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `index.html`
- Create: `src/main.jsx`
- Create: `src/App.jsx`

**Step 1: Initialize project**

```bash
cd C:\Users\cestellevif\Desktop\portfolio
npm create vite@latest . -- --template react
```

When prompted: select `React`, then `JavaScript`.

**Step 2: Install dependencies**

```bash
npm install
npm install gsap
npm install --save-dev gh-pages
```

**Step 3: Configure Vite for GitHub Pages**

Edit `vite.config.js`:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',  // update to '/repo-name/' if deploying to username.github.io/repo-name
})
```

**Step 4: Add deploy scripts to `package.json`**

Add to the `"scripts"` section:

```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

**Step 5: Add Google Fonts to `index.html`**

In `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Staatliches&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
```

**Step 6: Verify dev server runs**

```bash
npm run dev
```

Expected: Vite dev server at http://localhost:5173, default React page loads.

**Step 7: Commit**

```bash
git init  # if not already initialized
git add .
git commit -m "feat: scaffold vite react project with gsap"
```

---

### Task 2: Global styles and CSS custom properties

**Files:**
- Create: `src/styles/globals.css`
- Modify: `src/main.jsx` — import globals.css

**Step 1: Write globals.css**

```css
/* src/styles/globals.css */

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --color-red: #E3000F;
  --color-blue: #003DA5;
  --color-yellow: #FFD700;
  --color-charcoal: #2D2D2D;
  --color-hub: #B5451B;
  --color-cream: #FAF7F0;
  --color-white: #FFFFFF;
  --color-ink: #1A1A1A;

  --font-display: 'Staatliches', sans-serif;
  --font-body: 'DM Mono', monospace;

  --spine-x: 120px;
  --spine-width: 8px;
  --station-dot-size: 24px;
  --substop-dot-size: 12px;
  --arm-length: 220px;
}

html {
  font-size: 16px;
  scroll-behavior: auto; /* GSAP handles scrolling */
}

body {
  font-family: var(--font-body);
  background: var(--color-white);
  color: var(--color-ink);
  overflow-x: hidden;
}

/* Utility: Staatliches heading */
.display {
  font-family: var(--font-display);
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Step 2: Import in main.jsx**

```jsx
// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

**Step 3: Clear default App.jsx**

```jsx
// src/App.jsx
export default function App() {
  return <div className="app">Portfolio</div>
}
```

**Step 4: Verify**

```bash
npm run dev
```

Expected: page renders "Portfolio" with no default Vite styles, custom fonts loading.

**Step 5: Commit**

```bash
git add src/styles/globals.css src/main.jsx src/App.jsx
git commit -m "feat: add global styles and css custom properties"
```

---

### Task 3: Content data layer

**Files:**
- Create: `src/data/projects.js`

This is the single source of truth for all content. No content lives in components.

**Step 1: Write projects.js**

```js
// src/data/projects.js

export const LINES = [
  {
    id: 'red',
    color: 'var(--color-red)',
    colorHex: '#E3000F',
    label: 'Community Organizing',
    background: 'var(--color-white)',
    stations: [
      {
        id: 'march-for-science',
        goal: 'Get a large turnout for the March for Science.',
        substops: [
          'Establish communications team',
          'Template internal communications',
          'Write press release',
        ],
      },
      {
        id: 'recycle-hawaii',
        goal: 'Establish Recycle Hawaii as an educational advocacy organization in Hilo.',
        substops: [
          'Hired executive director',
          'Supported initial phase',
          'Interacted with press and media',
        ],
      },
      {
        id: 'blue-mask-group',
        goal: 'Get protective equipment to people when institutional supply chains had failed.',
        substops: [
          'Sourced reusable materials',
          'Stood up production operation',
          'Coordinated last-mile distribution',
          'Higher quality than standard masks, lower waste',
        ],
      },
      {
        id: 'ayso',
        goal: 'Triple volunteer participation and eliminate burnout without adding staff.',
        substops: [
          'Redesigned coordination architecture',
          'Built role ladders',
          'Created warm handoffs',
          'Distributed ownership model',
        ],
      },
      {
        id: 'olympia-planning',
        goal: 'Ensure community development decisions reflect long-term civic values.',
        substops: [
          'Appointed commissioner',
          'Active ongoing participation',
        ],
      },
    ],
  },
  {
    id: 'blue',
    color: 'var(--color-blue)',
    colorHex: '#003DA5',
    label: 'Coding & Product',
    background: 'var(--color-white)',
    stations: [
      {
        id: 'pemdas',
        goal: 'Make math engaging for kids through creativity, customization, and play.',
        substops: [
          'Augmented reality game teaching order of operations',
          'Customizable pets as motivation',
          'Led concept, back-end logic, and UX',
          'Reached production — targeting Google Play',
        ],
      },
      {
        id: 'abq',
        goal: 'Help readers become active, not passive, consumers of news.',
        substops: [
          'Chrome extension generating Words, Proof, Missing questions',
          'Web app shipped',
          'Mobile app in Google Play submission',
          'Mozilla Democracy x AI Incubator grant applicant',
        ],
      },
      {
        id: 'comprehend',
        goal: 'Give users a structured lens for analyzing any article.',
        substops: [
          'Five lenses: Grounding, Language & Framing, Agency & Actors, Claims & Support, Implications & Assumptions',
          'Companion product to ABQ',
          'In progress',
        ],
      },
      {
        id: 'crosswords',
        goal: 'Extend the word puzzle format into something spatially and cognitively harder.',
        substops: [
          'Five intersecting words guessed simultaneously',
          'Spatial reasoning added to vocabulary challenge',
          'Google Play approved',
          'Preparing for public launch',
        ],
      },
    ],
  },
  {
    id: 'yellow',
    color: 'var(--color-yellow)',
    colorHex: '#FFD700',
    label: 'Operations & Property',
    background: 'var(--color-cream)',
    stations: [
      {
        id: 'property-management',
        goal: 'Deliver well-managed properties and completed renovations on time.',
        substops: [
          'Execute renovation projects on time',
          'Make cost-saving decisions that deliver real value',
          'Systems instinct in physical infrastructure',
        ],
      },
    ],
  },
]
```

**Step 2: Verify import works**

Add a temporary console.log in App.jsx:

```jsx
import { LINES } from './data/projects.js'
console.log(LINES.length) // should log 3
```

Check browser console: should show `3`.

Remove the console.log after verifying.

**Step 3: Commit**

```bash
git add src/data/projects.js src/App.jsx
git commit -m "feat: add content data layer with all 3 lines and 10 stations"
```

---

### Task 4: MainStation component (Hero Hub)

**Files:**
- Create: `src/components/MainStation/MainStation.jsx`
- Create: `src/components/MainStation/MainStation.css`
- Modify: `src/App.jsx`

**Step 1: Write MainStation.css**

```css
/* src/components/MainStation/MainStation.css */

.main-station {
  width: 100%;
  min-height: 100vh;
  background: var(--color-hub);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 40px;
  text-align: center;
}

.main-station__name {
  font-family: var(--font-display);
  font-size: clamp(48px, 8vw, 96px);
  color: var(--color-white);
  text-transform: uppercase;
  line-height: 1;
  margin-bottom: 24px;
}

.main-station__throughline {
  font-family: var(--font-display);
  font-size: clamp(16px, 2vw, 24px);
  color: var(--color-white);
  text-transform: uppercase;
  max-width: 900px;
  line-height: 1.3;
  margin-bottom: 16px;
}

.main-station__bio {
  font-family: var(--font-body);
  font-size: 16px;
  color: var(--color-white);
  opacity: 0.85;
  margin-bottom: 64px;
}

.main-station__routes {
  display: flex;
  gap: 64px;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
}

.main-station__route {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  text-decoration: none;
  transition: opacity 0.2s;
}

.main-station__route:hover {
  opacity: 0.8;
}

.main-station__route-dot {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  flex-shrink: 0;
}

.main-station__route-label {
  font-family: var(--font-display);
  font-size: 20px;
  color: var(--color-white);
  text-transform: uppercase;
}
```

**Step 2: Write MainStation.jsx**

```jsx
// src/components/MainStation/MainStation.jsx
import './MainStation.css'

export default function MainStation({ lines, onSelectLine }) {
  return (
    <section className="main-station">
      <h1 className="main-station__name">Elle Estellevif</h1>
      <p className="main-station__throughline">
        I build systems — digital and human — that route the right information
        to the right people at scale.
      </p>
      <p className="main-station__bio">
        Systems thinker. Civic leader. Builder.
      </p>
      <nav className="main-station__routes">
        {lines.map((line) => (
          <a
            key={line.id}
            className="main-station__route"
            href={`#line-${line.id}`}
            onClick={() => onSelectLine?.(line.id)}
          >
            <span
              className="main-station__route-dot"
              style={{ background: line.colorHex }}
            />
            <span className="main-station__route-label">{line.label}</span>
          </a>
        ))}
      </nav>
    </section>
  )
}
```

**Step 3: Wire into App.jsx**

```jsx
// src/App.jsx
import { LINES } from './data/projects.js'
import MainStation from './components/MainStation/MainStation.jsx'

export default function App() {
  return (
    <div className="app">
      <MainStation lines={LINES} />
    </div>
  )
}
```

**Step 4: Verify**

```bash
npm run dev
```

Expected: burnt sienna full-height hero, name in Staatliches, three colored route dots + labels.

**Step 5: Commit**

```bash
git add src/components/MainStation/ src/App.jsx
git commit -m "feat: add MainStation hero hub component"
```

---

### Task 5: Station component (goal band + layout)

**Files:**
- Create: `src/components/Station/Station.jsx`
- Create: `src/components/Station/Station.css`

This component renders one project station: the pinned section wrapper, the goal band at the bottom, and slots for sub-stops. GSAP is NOT wired yet — this task is layout only.

**Step 1: Write Station.css**

```css
/* src/components/Station/Station.css */

.station {
  position: relative;
  min-height: 100vh;
  width: 100%;
}

/* Goal band — anchored to bottom of station section */
.station__goal {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 60px;
}

/* Red and Blue: full color band */
.station__goal--colored {
  background: var(--line-color);
}

/* Yellow: white panel with left accent */
.station__goal--yellow {
  background: var(--color-white);
  border-left: 8px solid var(--color-yellow);
}

.station__goal-text {
  font-family: var(--font-display);
  font-size: clamp(24px, 3vw, 48px);
  text-transform: uppercase;
  text-align: center;
  max-width: 1200px;
}

.station__goal--colored .station__goal-text {
  color: var(--color-white);
}

.station__goal--yellow .station__goal-text {
  color: var(--color-ink);
}

/* Sub-stops container — positioned above goal band */
.station__substops {
  position: absolute;
  bottom: 140px; /* sits above goal band */
  left: 0;
  width: 100%;
}

/* Station dot on spine */
.station__dot {
  position: absolute;
  left: calc(var(--spine-x) - var(--station-dot-size) / 2);
  bottom: 140px; /* aligned with top edge of goal band */
  width: var(--station-dot-size);
  height: var(--station-dot-size);
  border-radius: 50%;
  background: var(--line-color);
  z-index: 10;
}

/* Terminus double-bar */
.station__terminus {
  position: absolute;
  left: calc(var(--spine-x) - 24px);
  bottom: 130px;
  width: 48px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.station__terminus-bar {
  height: 4px;
  background: var(--line-color);
}
```

**Step 2: Write Station.jsx**

```jsx
// src/components/Station/Station.jsx
import './Station.css'

export default function Station({ station, lineColor, lineId, isTerminus, children }) {
  const isYellow = lineId === 'yellow'

  return (
    <section
      className="station"
      id={`station-${station.id}`}
      style={{ '--line-color': lineColor }}
      data-station-id={station.id}
    >
      {/* Station dot — pre-lit in line color */}
      <div className="station__dot" />

      {/* Sub-stops slot */}
      <div className="station__substops">
        {children}
      </div>

      {/* Terminus marker (last station only) */}
      {isTerminus && (
        <div className="station__terminus">
          <div className="station__terminus-bar" />
          <div className="station__terminus-bar" />
        </div>
      )}

      {/* Goal band */}
      <div className={`station__goal ${isYellow ? 'station__goal--yellow' : 'station__goal--colored'}`}>
        <p className="station__goal-text">{station.goal}</p>
      </div>
    </section>
  )
}
```

**Step 3: Verify by temporarily rendering one station in App.jsx**

```jsx
import Station from './components/Station/Station.jsx'
import { LINES } from './data/projects.js'

export default function App() {
  const redLine = LINES[0]
  const firstStation = redLine.stations[0]
  return (
    <div className="app">
      <Station
        station={firstStation}
        lineColor={redLine.colorHex}
        lineId={redLine.id}
        isTerminus={false}
      />
    </div>
  )
}
```

Expected: full-height white section, red goal band at bottom with goal text, red station dot.

**Step 4: Commit**

```bash
git add src/components/Station/
git commit -m "feat: add Station component with goal band layout"
```

---

### Task 6: SubStop component (arm layout)

**Files:**
- Create: `src/components/SubStop/SubStop.jsx`
- Create: `src/components/SubStop/SubStop.css`

Layout only — no animation yet. Each sub-stop is a horizontal arm growing right from the spine.

**Step 1: Write SubStop.css**

```css
/* src/components/SubStop/SubStop.css */

.substop {
  position: absolute;
  left: var(--spine-x);
  display: flex;
  align-items: center;
  /* vertical position set via inline style */
  opacity: 0; /* hidden until GSAP reveals */
}

.substop__arm {
  width: var(--arm-length);
  height: 4px;
  background: var(--line-color);
  flex-shrink: 0;
  transform-origin: left center;
  transform: scaleX(0); /* arm starts collapsed — GSAP expands it */
}

.substop__ring {
  width: var(--substop-dot-size);
  height: var(--substop-dot-size);
  border-radius: 50%;
  border: 2px solid var(--line-color);
  background: transparent;
  flex-shrink: 0;
  margin-left: -1px; /* overlap slightly with arm end */
}

.substop__label {
  font-family: var(--font-display);
  font-size: 18px;
  text-transform: uppercase;
  color: var(--color-ink);
  margin-left: 12px;
  white-space: nowrap;
}
```

**Step 2: Write SubStop.jsx**

```jsx
// src/components/SubStop/SubStop.jsx
import { useRef } from 'react'
import './SubStop.css'

export default function SubStop({ label, bottomOffset, lineColor, index }) {
  const ref = useRef(null)

  return (
    <div
      ref={ref}
      className="substop"
      style={{
        '--line-color': lineColor,
        bottom: `${bottomOffset}px`,
      }}
      data-substop-index={index}
    >
      <div className="substop__arm" />
      <div className="substop__ring" />
      <span className="substop__label">{label}</span>
    </div>
  )
}
```

**Step 3: Add sub-stops to Station temporarily to verify layout**

In `Station.jsx`, import and render a sample sub-stop:

```jsx
import SubStop from '../SubStop/SubStop.jsx'
// inside the substops div:
<SubStop label="Test substop" bottomOffset={80} lineColor={lineColor} index={0} />
```

Expected: arm element present (invisible due to `opacity: 0` + `scaleX(0)`) — verify in DevTools that elements exist with correct positioning.

Remove the temporary sub-stop after verifying.

**Step 4: Commit**

```bash
git add src/components/SubStop/
git commit -m "feat: add SubStop component with arm layout"
```

---

### Task 7: MetroLine component (assembles spine + stations)

**Files:**
- Create: `src/components/MetroLine/MetroLine.jsx`
- Create: `src/components/MetroLine/MetroLine.css`

The MetroLine renders the SVG spine for the entire line plus all its stations. No GSAP yet — layout and SVG structure only.

**Step 1: Write MetroLine.css**

```css
/* src/components/MetroLine/MetroLine.css */

.metro-line {
  position: relative;
  width: 100%;
  background: var(--line-bg, var(--color-white));
}

/* SVG spine overlay — full height of the line, positioned left */
.metro-line__svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 200px; /* covers spine-x area */
  height: 100%;
  pointer-events: none;
  z-index: 5;
  overflow: visible;
}

/* Return to main station anchor */
.metro-line__return {
  position: fixed;
  top: 40px;
  right: 40px;
  font-family: var(--font-display);
  font-size: 14px;
  text-transform: uppercase;
  color: var(--line-color);
  text-decoration: none;
  z-index: 100;
  letter-spacing: 0.05em;
}

.metro-line__return:hover {
  opacity: 0.7;
}
```

**Step 2: Write MetroLine.jsx**

```jsx
// src/components/MetroLine/MetroLine.jsx
import { useRef } from 'react'
import Station from '../Station/Station.jsx'
import SubStop from '../SubStop/SubStop.jsx'
import './MetroLine.css'

// Sub-stop vertical spacing: each arm is 80px above the previous, starting 80px above goal band
const SUBSTOP_BASE_OFFSET = 80
const SUBSTOP_SPACING = 80

export default function MetroLine({ line }) {
  const lineRef = useRef(null)
  const svgRef = useRef(null)

  return (
    <div
      ref={lineRef}
      className="metro-line"
      id={`line-${line.id}`}
      style={{
        '--line-color': line.colorHex,
        '--line-bg': line.id === 'yellow' ? 'var(--color-cream)' : 'var(--color-white)',
      }}
    >
      {/* Fixed return anchor */}
      <a className="metro-line__return" href="#top">
        ← Return to Main Station
      </a>

      {/* SVG spine — charcoal path, colored overlay path */}
      <svg
        ref={svgRef}
        className="metro-line__svg"
        aria-hidden="true"
      >
        {/* Charcoal spine — drawn via GSAP stroke-dashoffset */}
        <line
          className="spine-charcoal"
          x1="120" y1="0"
          x2="120" y2="100%"
          stroke="var(--color-charcoal)"
          strokeWidth="8"
          strokeDasharray="9999"
          strokeDashoffset="9999"
        />
        {/* Colored overlay — fills top-down while pinned */}
        <line
          className="spine-color"
          x1="120" y1="0"
          x2="120" y2="100%"
          stroke={line.colorHex}
          strokeWidth="8"
          strokeDasharray="9999"
          strokeDashoffset="9999"
        />
      </svg>

      {/* Stations */}
      {line.stations.map((station, stationIndex) => (
        <Station
          key={station.id}
          station={station}
          lineColor={line.colorHex}
          lineId={line.id}
          isTerminus={stationIndex === line.stations.length - 1}
        >
          {station.substops.map((label, i) => (
            <SubStop
              key={label}
              label={label}
              bottomOffset={SUBSTOP_BASE_OFFSET + i * SUBSTOP_SPACING}
              lineColor={line.colorHex}
              index={i}
            />
          ))}
        </Station>
      ))}
    </div>
  )
}
```

**Step 3: Wire MetroLine into App.jsx**

```jsx
import { LINES } from './data/projects.js'
import MainStation from './components/MainStation/MainStation.jsx'
import MetroLine from './components/MetroLine/MetroLine.jsx'

export default function App() {
  return (
    <div className="app" id="top">
      <MainStation lines={LINES} />
      {LINES.map((line) => (
        <MetroLine key={line.id} line={line} />
      ))}
    </div>
  )
}
```

**Step 4: Verify**

```bash
npm run dev
```

Expected: hero hub, then three line sections below it. Red and Blue on white, Yellow on cream. Goal bands visible at bottom of each station section. Sub-stops not visible (opacity: 0). SVG spine present in DOM but invisible (dashoffset hides it).

Check in DevTools: SVG lines exist with correct stroke colors, dashoffset set.

**Step 5: Commit**

```bash
git add src/components/MetroLine/ src/App.jsx
git commit -m "feat: add MetroLine component with SVG spine structure"
```

---

### Task 8: GSAP scroll animations — spine draw

**Files:**
- Create: `src/hooks/useSpineAnimation.js`
- Modify: `src/components/MetroLine/MetroLine.jsx`

This task wires GSAP ScrollTrigger to draw the charcoal spine as the user scrolls into each line section.

**Step 1: Register GSAP plugins in main.jsx**

```jsx
// src/main.jsx — add at top
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
```

**Step 2: Create useSpineAnimation hook**

```js
// src/hooks/useSpineAnimation.js
import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useSpineAnimation(lineRef, svgRef) {
  useEffect(() => {
    if (!lineRef.current || !svgRef.current) return

    const charcoalLine = svgRef.current.querySelector('.spine-charcoal')
    if (!charcoalLine) return

    // Get total path length for dashoffset animation
    const totalLength = lineRef.current.offsetHeight

    gsap.set(charcoalLine, {
      strokeDasharray: totalLength,
      strokeDashoffset: totalLength,
    })

    // Draw charcoal spine as user scrolls through the line
    const tween = gsap.to(charcoalLine, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: lineRef.current,
        start: 'top 80%',
        end: 'bottom bottom',
        scrub: 1,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
    }
  }, [lineRef, svgRef])
}
```

**Step 3: Wire hook into MetroLine.jsx**

Add to imports:
```jsx
import { useSpineAnimation } from '../../hooks/useSpineAnimation.js'
```

Add inside MetroLine component after the refs:
```jsx
useSpineAnimation(lineRef, svgRef)
```

**Step 4: Verify**

```bash
npm run dev
```

Scroll down the page slowly. Expected: charcoal spine draws downward as you scroll into each line section. The spine should grow progressively — not appear all at once.

Check: spine draws smoothly, scrub: 1 gives it slight lag (intentional).

**Step 5: Commit**

```bash
git add src/hooks/useSpineAnimation.js src/components/MetroLine/MetroLine.jsx src/main.jsx
git commit -m "feat: wire gsap scrolltrigger spine draw animation"
```

---

### Task 9: GSAP scroll animations — station pin + color fill + sub-stop reveals

**Files:**
- Create: `src/hooks/useStationAnimation.js`
- Modify: `src/components/Station/Station.jsx`

This is the core interaction. Per station:
1. Viewport pins when spine reaches goal dot
2. Color fills top-down through the pinned section
3. Each sub-stop arm reveals outward as color passes its junction

**Step 1: Create useStationAnimation hook**

```js
// src/hooks/useStationAnimation.js
import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useStationAnimation(stationRef, lineColor) {
  useEffect(() => {
    if (!stationRef.current) return

    const station = stationRef.current
    const substops = station.querySelectorAll('.substop')
    const substopArms = station.querySelectorAll('.substop__arm')
    const substopRings = station.querySelectorAll('.substop__ring')

    // Total pin scroll distance: 300px per sub-stop + base
    const pinDistance = 300 + substops.length * 300

    // Master timeline — plays while pinned
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: station,
        start: 'bottom bottom',   // pin when goal band hits bottom of viewport
        end: `+=${pinDistance}`,  // scroll distance while pinned
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
      },
    })

    // Color fills top-down: animate a colored overlay rectangle from height 0 to 100%
    // We use a pseudo-element approach via a DOM overlay div
    const colorOverlay = station.querySelector('.station__spine-color')
    if (colorOverlay) {
      tl.fromTo(
        colorOverlay,
        { scaleY: 0, transformOrigin: 'top center' },
        { scaleY: 1, ease: 'none', duration: 1 }
      )
    }

    // Sub-stops reveal sequentially as color passes each junction
    substops.forEach((substop, i) => {
      const arm = substopArms[i]
      const ring = substopRings[i]
      const offset = i / substops.length  // stagger based on position

      // Make substop visible
      tl.to(substop, { opacity: 1, duration: 0.1 }, offset)
      // Arm grows outward from spine (scaleX 0 → 1, transform-origin: left)
      tl.to(arm, { scaleX: 1, ease: 'power2.out', duration: 0.3 }, offset)
      // Ring fills
      tl.to(ring, {
        background: lineColor,
        ease: 'none',
        duration: 0.1,
      }, offset + 0.3)
    })

    return () => {
      tl.scrollTrigger?.kill()
    }
  }, [stationRef, lineColor])
}
```

**Step 2: Add spine color overlay div to Station.jsx**

Inside the `<section>`, before the station dot, add:

```jsx
{/* Color overlay — fills top-down while pinned, driven by GSAP */}
<div
  className="station__spine-color"
  style={{
    position: 'absolute',
    left: 'calc(var(--spine-x) - 4px)',
    top: 0,
    width: '8px',
    height: '100%',
    background: lineColor,
    transformOrigin: 'top center',
    transform: 'scaleY(0)',
    zIndex: 6,
  }}
/>
```

**Step 3: Wire useStationAnimation into Station.jsx**

Add to imports:
```jsx
import { useRef } from 'react'
import { useStationAnimation } from '../../hooks/useStationAnimation.js'
```

Add ref to section and wire hook:
```jsx
const stationRef = useRef(null)
useStationAnimation(stationRef, lineColor)
// Add ref to <section>: ref={stationRef}
```

**Step 4: Verify**

```bash
npm run dev
```

Expected behavior per station:
- Scroll down → charcoal spine draws toward station
- When goal band hits bottom of viewport → pin engages
- Continue scrolling → color fills top-down on the spine overlay
- Sub-stop arms grow outward one by one as color passes each junction
- Sub-stop rings fill with route color
- All sub-stops revealed → unpin → continue scrolling to next station

Check: no jank, pin is smooth, stagger feels purposeful.

**Step 5: Commit**

```bash
git add src/hooks/useStationAnimation.js src/components/Station/Station.jsx
git commit -m "feat: wire station pin, color fill, and substop arm animations"
```

---

### Task 10: Mobile responsive + reduced motion

**Files:**
- Modify: `src/styles/globals.css`
- Modify: `src/components/Station/Station.css`
- Modify: `src/components/SubStop/SubStop.css`
- Modify: `src/components/MainStation/MainStation.css`

**Step 1: Add mobile breakpoints to globals.css**

```css
/* Mobile: below 768px */
@media (max-width: 768px) {
  :root {
    --spine-x: 40px;
    --arm-length: 140px;
    --station-dot-size: 18px;
    --substop-dot-size: 10px;
  }
}
```

**Step 2: Add mobile adjustments to Station.css**

```css
@media (max-width: 768px) {
  .station__goal {
    height: 120px;
    padding: 0 20px 0 60px; /* left padding for spine clearance */
  }

  .station__goal-text {
    font-size: clamp(16px, 4vw, 28px);
    text-align: left;
  }

  .station__substops {
    bottom: 120px;
  }
}
```

**Step 3: Add mobile adjustments to SubStop.css**

```css
@media (max-width: 768px) {
  .substop__label {
    font-size: 14px;
    white-space: normal;
    max-width: 200px;
  }
}
```

**Step 4: Verify reduced motion**

The `prefers-reduced-motion` rule in globals.css disables transitions. For GSAP, add a guard in both animation hooks:

In `useSpineAnimation.js` and `useStationAnimation.js`, wrap the effect:

```js
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
if (prefersReducedMotion) {
  // Show all content immediately without animation
  // (set dashoffset to 0, opacity to 1, scaleX to 1 on all elements)
  return
}
```

**Step 5: Test on mobile viewport**

In browser DevTools, toggle to mobile (375px width). Expected: spine moves to x=40, arms are shorter, text wraps, goal band is readable.

**Step 6: Commit**

```bash
git add src/styles/globals.css src/components/
git commit -m "feat: mobile responsive layout and reduced motion support"
```

---

### Task 11: GitHub Pages deployment

**Files:**
- Modify: `vite.config.js`
- Modify: `package.json`

**Step 1: Confirm repo name**

If deploying to `username.github.io/portfolio`, update `vite.config.js`:

```js
base: '/portfolio/',
```

If deploying to a custom domain at root, keep `base: '/'`.

**Step 2: Build and verify**

```bash
npm run build
```

Expected: `dist/` folder created with `index.html`, `assets/` folder.

**Step 3: Deploy**

```bash
npm run deploy
```

Expected: `gh-pages` branch created and pushed to GitHub. Site live at GitHub Pages URL.

**Step 4: Verify live site**

Open the GitHub Pages URL. Check:
- [ ] Fonts loading (Staatliches, DM Mono)
- [ ] Hero hub renders correctly
- [ ] Spine draws on scroll
- [ ] Station pin engages
- [ ] Sub-stop arms reveal
- [ ] Mobile viewport works
- [ ] "Return to Main Station" anchor links back to top

**Step 5: Commit**

```bash
git add vite.config.js package.json
git commit -m "feat: configure github pages deployment"
```

---

## Verification Checklist

Before marking complete, verify all items from the design doc:

- [ ] Charcoal spine draws toward each goal on scroll
- [ ] Viewport pins when goal reaches bottom of viewport
- [ ] Color fills top-down through pinned section
- [ ] Sub-stop arms grow OUTWARD from spine (left to right)
- [ ] Arms reveal sequentially as color passes each junction
- [ ] Ring fills with route color when arm completes
- [ ] Unpin after all sub-stops revealed
- [ ] Station dot is pre-lit in route color (always visible)
- [ ] Goal band anchored to bottom of each station section
- [ ] Red + Blue: colored goal band, white text
- [ ] Yellow: white goal panel with yellow left accent, dark text
- [ ] Terminus treatment (double bar) on last station of each line
- [ ] "Return to Main Station" fixed anchor on all route frames
- [ ] Yellow section on cream background
- [ ] Three route selectors on hero hub
- [ ] Mobile: spine repositions, arms shorten, text wraps
- [ ] Reduced motion: all content visible without animation

{% endraw %}
