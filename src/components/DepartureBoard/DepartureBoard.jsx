// DepartureBoard — dark terminal route selector that replaces MainStation's nav.
// Appears mid-page as users scroll in; inspired by dope.security's boarding-pass aesthetic.
// Renders one row per metro line. Clicking a row calls onSelectLine(line.id).
// Props:
//   lines          — array of line objects from projects.js
//   onSelectLine   — callback(lineId: string)
//   pendingLineId  — line currently animating into selection
//   selectedLineId — line confirmed as active
// Accessibility: each <a> carries href, aria-label, aria-current. FlipLabel is aria-hidden.

import FlipLabel from '../FlipLabel/FlipLabel.jsx'
import './DepartureBoard.css'

export default function DepartureBoard({ lines, onSelectLine, pendingLineId, selectedLineId }) {
  return (
    // Full-width dark section; inner content constrained to 1200px
    <section className="departure-board" aria-label="Select a line">
      <div className="departure-board__inner">
        {lines.map((line) => {
          const isActive = pendingLineId === line.id || selectedLineId === line.id

          return (
            <a
              key={line.id}
              className={`departure-board__row${isActive ? ' departure-board__row--active' : ''}`}
              // CSS custom property drives the active left border and focus outline color
              style={{ '--route-color': line.colorHex }}
              href={`#line-${line.id}`}
              aria-label={isActive ? `${line.label}, selected` : line.label}
              aria-current={isActive ? 'true' : undefined}
              onClick={(e) => {
                e.preventDefault()
                onSelectLine(line.id)
              }}
            >
              {/* Colored dot — uses inline style to match each line's brand color */}
              <span
                className={`departure-board__dot${isActive ? ' departure-board__dot--active' : ''}`}
                style={{ background: line.colorHex }}
                aria-hidden="true"
              />

              {/* FlipLabel is aria-hidden — accessible name lives on the <a> */}
              <FlipLabel label={line.label} size="lg" />

              {/* Arrow pushed to the far right by margin-left: auto on the flex row */}
              <span className="departure-board__arrow" aria-hidden="true">→</span>
            </a>
          )
        })}
      </div>
    </section>
  )
}
