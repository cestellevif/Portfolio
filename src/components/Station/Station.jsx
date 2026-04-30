import { useRef } from 'react'
import { useStationAnimation } from '../../hooks/useStationAnimation.js'
import './Station.css'

export default function Station({ station, lineColor, lineId, isTerminus, children }) {
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
      <div className="station__spine-color" />
      <div className="station__dot" aria-hidden="true" />
      <div className="station__substops">
        {children}
      </div>
      {isTerminus && (
        <div className="station__terminus" aria-hidden="true">
          <div className="station__terminus-bar" />
          <div className="station__terminus-bar" />
        </div>
      )}
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
