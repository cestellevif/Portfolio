import { useState } from 'react'
import './MainStation.css'

export default function MainStation({ lines }) {
  const [selectedId, setSelectedId] = useState(null)

  function handleSelect(lineId) {
    setSelectedId(lineId)
  }

  return (
    <div className="main-station-wrapper" id="top">
      <section className="main-station">
        <h1 className="main-station__name">Elle Estellevif</h1>
        <p className="main-station__throughline">
          I build systems — digital and human — that route the right information
          to the right people at scale.
        </p>
        <p className="main-station__bio">
          Systems thinker. Civic leader. Builder.
        </p>

        <nav className="main-station__routes" aria-label="Select a line">
          {lines.map((line) => (
            <a
              key={line.id}
              className="main-station__route"
              href={`#line-${line.id}`}
              onClick={() => handleSelect(line.id)}
            >
              <span
                className={`main-station__route-dot${selectedId === line.id ? ' main-station__route-dot--selected' : ''}`}
                style={{ background: line.colorHex }}
                aria-hidden="true"
              />
              <span className="main-station__route-label">{line.label}</span>
              {selectedId === line.id && (
                <span className="main-station__route-arm" aria-hidden="true" />
              )}
            </a>
          ))}
        </nav>
      </section>
    </div>
  )
}
