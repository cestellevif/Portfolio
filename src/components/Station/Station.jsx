import './Station.css'

export default function Station({ station, lineColor, lineId, isTerminus, children }) {
  const isYellow = lineId === 'yellow'

  return (
    <section
      className="station"
      id={`station-${station.id}`}
      style={{ '--line-color': lineColor }}
      data-station-id={station.id}
      data-line-id={lineId}
    >
      {/* Color overlay — fills top-down while pinned, driven by GSAP */}
      <div className="station__spine-color" />

      {/* Station dot — pre-lit in route color */}
      <div className="station__dot" aria-hidden="true" />

      {/* Sub-stops slot */}
      <div className="station__substops">
        {children}
      </div>

      {/* Terminus marker — last station on line only */}
      {isTerminus && (
        <div className="station__terminus" aria-hidden="true">
          <div className="station__terminus-bar" />
          <div className="station__terminus-bar" />
        </div>
      )}

      {/* Goal band */}
      <div
        className={`station__goal ${isYellow ? 'station__goal--yellow' : 'station__goal--colored'}`}
        role="heading"
        aria-level="2"
      >
        <p className="station__goal-text">{station.goal}</p>
      </div>
    </section>
  )
}
