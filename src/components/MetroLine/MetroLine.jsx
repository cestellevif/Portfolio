import { useRef, useEffect } from 'react'
import Station from '../Station/Station.jsx'
import SubStop from '../SubStop/SubStop.jsx'
import './MetroLine.css'
import { useSpineAnimation } from '../../hooks/useSpineAnimation.js'

const SUBSTOP_BASE = 220   // px above bottom of station (above the 140px goal band)
const SUBSTOP_STEP = 80    // px between each substop arm

export default function MetroLine({ line }) {
  const lineRef = useRef(null)
  const returnRef = useRef(null)

  useSpineAnimation(lineRef)

  // Show return anchor only after MainStation has scrolled off screen
  useEffect(() => {
    const returnEl = returnRef.current
    if (!returnEl) return

    // Watch the main station wrapper (first section on the page)
    const mainStation = document.getElementById('top')
    if (!mainStation) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show return button when main station is NOT visible
        returnEl.classList.toggle('metro-line__return--visible', !entry.isIntersecting)
      },
      { threshold: 0 }
    )
    observer.observe(mainStation)
    return () => observer.disconnect()
  }, [])

  const isYellow = line.id === 'yellow'

  return (
    <div
      ref={lineRef}
      className="metro-line"
      id={`line-${line.id}`}
      style={{
        background: line.background,
        '--line-color': line.colorHex,
      }}
    >
      {/* Return to Main Station anchor */}
      <a
        ref={returnRef}
        className="metro-line__return"
        href="#top"
        style={{ color: line.colorHex }}
      >
        ← Main Station
      </a>

      {/* Charcoal spine — positioned via --spine-x, height animated by GSAP */}
      <div className="metro-line__spine-charcoal" aria-hidden="true" />

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
              bottomOffset={SUBSTOP_BASE + i * SUBSTOP_STEP}
              lineColor={line.colorHex}
              index={i}
            />
          ))}
        </Station>
      ))}
    </div>
  )
}
