import { useRef, useEffect } from 'react'
import Station from '../Station/Station.jsx'
import SubStop from '../SubStop/SubStop.jsx'
import './MetroLine.css'
import { useSpineAnimation } from '../../hooks/useSpineAnimation.js'

const SUBSTOP_BASE = 220   // px above bottom of station (above the 140px goal band)
const SUBSTOP_STEP = 80    // px between each substop arm

export default function MetroLine({ line, onReturn }) {
  const lineRef = useRef(null)
  const returnRef = useRef(null)

  useSpineAnimation(lineRef, line.id)

  // Move focus into the MetroLine when it mounts so keyboard users land here
  useEffect(() => {
    if (lineRef.current) {
      lineRef.current.focus({ preventScroll: true })
    }
  }, [])

  // When the loop anchor crests the viewport top, retract the spine back into the header
  // frame over 500ms, then snap to scrollY=0 (identical real header) + reset.
  useEffect(() => {
    const loopEl = document.getElementById('station-loop')
    if (!loopEl) return

    let fired = false
    let frozen = false
    let timer = null

    const onScroll = () => {
      if (fired) return
      if (loopEl.getBoundingClientRect().top <= 10) {
        fired = true
        // Freeze scroll so station-loop stays at the viewport top while the spine
        // retracts upward into the header frame. After 500ms the spine is at 0,
        // then we snap to scrollY=0 (real header is identical) and unmount.
        frozen = true
        document.body.style.overflow = 'hidden'
        window.dispatchEvent(new CustomEvent('metro-spine-loop-retract'))
        timer = setTimeout(() => {
          document.body.style.overflow = ''
          frozen = false
          window.scrollTo({ top: 0, behavior: 'instant' })
          onReturn()
        }, 520)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(timer)
      if (frozen) document.body.style.overflow = ''
    }
  }, [onReturn])

  // MetroLine only mounts when selected, so the user is about to scroll here.
  // Show the return button after a short delay rather than watching IntersectionObserver.
  useEffect(() => {
    const returnEl = returnRef.current
    if (!returnEl) return

    const timer = setTimeout(() => {
      returnEl.classList.add('metro-line__return--visible')
    }, 600)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      ref={lineRef}
      className="metro-line"
      id={`line-${line.id}`}
      tabIndex={-1}
      style={{
        '--line-color': line.colorHex,
      }}
    >
      <a
        ref={returnRef}
        className="metro-line__return"
        href="#top"
        aria-label="Return to Main Station"
        style={{ color: line.colorHex }}
        onClick={(e) => {
          e.preventDefault()
          const loopEl = document.getElementById('station-loop')
          if (!loopEl) {
            window.scrollTo({ top: 0, behavior: 'instant' })
            onReturn()
            return
          }
          // Already at/past the loop anchor — the scroll listener will fire naturally
          if (loopEl.getBoundingClientRect().top <= 10) return
          // Teleport to the loop anchor; the existing onScroll handler
          // fires instantly, freezes scroll, dispatches retract, then snaps + unmounts
          const loopTop = loopEl.getBoundingClientRect().top + window.scrollY
          window.scrollTo({ top: loopTop, behavior: 'instant' })
        }}
      >
        ← Main Station
      </a>

      {/* Charcoal spine — positioned via --spine-x, height animated by GSAP */}
      <div className="metro-line__spine-charcoal" aria-hidden="true" />

      {line.stations.map((station) => {
        return (
          <Station
            key={station.id}
            station={station}
            lineColor={line.colorHex}
            lineId={line.id}
          >
            {station.substops.map((label, i) => (
              <SubStop
                key={label}
                label={label}
                bottomOffset={SUBSTOP_BASE + (station.substops.length - 1 - i) * SUBSTOP_STEP}
                lineColor={line.colorHex}
                index={i}
              />
            ))}
          </Station>
        )
      })}

      {/* Buffer zone: gives spine space to race through before the loop anchor (duplicate
          header) slides into view. Makes the return feel gradual, not sudden. */}
      <div className="metro-line__buffer" aria-hidden="true" />
    </div>
  )
}
