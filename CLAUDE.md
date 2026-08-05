# Portfolio — Project Rules

## Stack
- React 18 + Vite, deployed to GitHub Pages (static)
- GSAP + ScrollTrigger for all animations
- No routing library — single page, scroll-driven navigation
- Fonts: Public Sans (display, weight 800), DM Mono (body) via Google Fonts

## Key Files
| File | Purpose |
|---|---|
| `src/data/projects.js` | Single source of truth for all content — lines, stations, substops |
| `src/styles/globals.css` | CSS custom properties — colors, spine dimensions, breakpoints |
| `src/hooks/useSpineAnimation.js` | Charcoal spine draw (scroll-driven, MetroLine level) |
| `src/hooks/useStationAnimation.js` | Pin + color fill + substop arm reveals (per station) |
| `src/components/MainStation/` | Entry panel — route selector, framed transit board |
| `src/components/MetroLine/` | Full line view — mounts when route selected |
| `src/components/Station/` | Individual station with goal band + substops |
| `src/components/SubStop/` | Arm + ring + label, animated outward from spine |

## Design System
- Background: `#E5DDD0` (poster paper)
- MainStation frame: `#B5451B` burnt sienna, 18px black border
- Green line `#1B5C38` / Blue line `#1D4F91` / Yellow line `#BF8C00`
- Spine: `--spine-x` CSS var aligns spine with left border of 860px frame
- All animation timing owned by GSAP — do not use CSS transitions on animated elements

## UI/Animation Rules
- One change at a time, verify before stacking another
- GSAP owns transforms on spine, dot-fill, substop arms, goal text — never fight it with CSS
- Always check `prefers-reduced-motion` in any new GSAP hook (see existing hooks for pattern)
- Use `accessibility-tester` agent for any UI change that affects interaction or structure

## Accessibility (WCAG AA)
- Route `<a>` tags always have `href` and `aria-label` — never rely on FlipLabel text for SR
- Station headings use `aria-label` combining goal + achievement; inner track is `aria-hidden`
- Skip link targets `#main-content` on the MainStation `<section>`
- MetroLine focuses itself on mount (`tabIndex={-1}`)
- New decorative elements must get `aria-hidden="true"`

## Pre-Deploy
- Remove `import './styles/dev-borders.css'` from `src/main.jsx`
- Run `npm run build` and verify no errors before pushing to main
