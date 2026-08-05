import { useRef } from 'react'
import { useStationAnimation } from '../../hooks/useStationAnimation.js'
import './Station.css'

export default function Station({ station, lineColor, lineId, children }) {
  const isYellow = lineId === 'yellow'
  const stationRef = useRef(null)
  useStationAnimation(stationRef, lineColor)

  return (
    <section
      ref={stationRef}
      className="station"
      id={`station-${station.id}`}
      style={{ '--line-color': lineColor }}
      data-station-id={station.id}
      data-line-id={lineId}
    >
      <div className="station__spine-charcoal" aria-hidden="true" />
      <div className="station__spine-color" aria-hidden="true" />
      <div className="station__dot" aria-hidden="true">
        <div className="station__dot-fill" />
      </div>
      <div className="station__substops">
        {children}
      </div>

      <div
        className={`station__goal ${isYellow ? 'station__goal--yellow' : 'station__goal--colored'}`}
        role="heading"
        aria-level="2"
        aria-label={station.achievement ? `${station.goal} — ${station.achievement}` : station.goal}
      >
        <div className="station__goal-track" aria-hidden="true">
          <p className="station__goal-text station__goal-text--goal">{station.goal}</p>
          {station.achievement && (
            <p className="station__goal-text station__goal-text--achievement">
              {station.achievement}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
