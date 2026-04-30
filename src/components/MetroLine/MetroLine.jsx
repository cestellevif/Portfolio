import { useRef, useEffect } from 'react'
import Station from '../Station/Station.jsx'
import SubStop from '../SubStop/SubStop.jsx'
import './MetroLine.css'
import { useSpineAnimation } from '../../hooks/useSpineAnimation.js'

const SUBSTOP_BASE = 220   // px above bottom of station (above the 140px goal band)
const SUBSTOP_STEP = 80    // px between each substop arm

export default function MetroLine({ line }) {
  const lineRef = useRef(null)
  const svgRef = useRef(null)
  const returnRef = useRef(null)

  useSpineAnimation(lineRef, svgRef)

  // Show/hide the Return anchor based on whether this line is in view
  useEffect(() => {
    const el = lineRef.current
    const returnEl = returnRef.current
    if (!el || !returnEl) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        returnEl.classList.toggle('metro-line__return--visible', entry.isIntersecting)
      },
      { threshold: 0.05 }
    )
    observer.observe(el)
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

      {/* SVG spine — charcoal path drawn by GSAP, colored overlay filled by GSAP */}
      <svg
        ref={svgRef}
        className="metro-line__svg"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        {/* Charcoal spine — stroke-dashoffset animated by GSAP */}
        <line
          className="spine-charcoal"
          x1="120" y1="0"
          x2="120" y2="10000"
          stroke="var(--color-charcoal)"
          strokeWidth="var(--spine-width)"
          strokeDasharray="20000"
          strokeDashoffset="20000"
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
