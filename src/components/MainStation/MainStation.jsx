// MainStation — entry panel for the portfolio, rendered as a framed transit board.
// Displays name, throughline, and vertical route selectors. Selecting a route
// triggers onSelectLine, which mounts the MetroLine view.
// Props: { lines, onSelectLine, pendingLineId, selectedLineId }

import './MainStation.css'
import FlipLabel from '../FlipLabel/FlipLabel'

export default function MainStation({ lines, onSelectLine, pendingLineId, selectedLineId }) {
  return (
    <div className="main-station-wrapper">
      <section className="main-station" id="main-content">
        <h1 className="main-station__name">Work with Elle</h1>
        <p className="main-station__throughline">
          I build systems — digital and human — that get the right information
          to the right people at scale.
        </p>
        <p className="main-station__bio">
          Civic organizer, product builder, and operations lead.
        </p>
        <p className="main-station__wayfinding">
          ↓ Select a line to see the work
        </p>

        <nav className="main-station__routes" aria-label="Select a line">
          {lines.map((line) => {
            const isActive = pendingLineId === line.id || selectedLineId === line.id
            return (
              <a
                key={line.id}
                className={`main-station__route${isActive ? ' main-station__route--active' : ''}`}
                data-line-id={line.id}
                style={{ '--route-color': line.colorHex }}
                href={`#line-${line.id}`}
                aria-label={isActive ? `${line.label}, selected` : line.label}
                aria-current={isActive ? 'true' : undefined}
                onClick={(e) => {
                  e.preventDefault()
                  onSelectLine(line.id)
                }}
              >
                <span
                  className={`main-station__route-dot${isActive ? ' main-station__route-dot--selected' : ''}`}
                  style={{ background: line.colorHex }}
                  aria-hidden="true"
                />
                <FlipLabel label={line.label} />
                <span
                  className={`main-station__route-arm${isActive ? ' main-station__route-arm--active' : ''}`}
                  aria-hidden="true"
                  style={{ background: 'var(--color-ink)' }}
                />
              </a>
            )
          })}
        </nav>
      </section>
    </div>
  )
}
