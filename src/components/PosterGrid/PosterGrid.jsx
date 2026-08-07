// PosterGrid — horizontal scrolling poster strip in a connected black frame.
// Each card shows a live iframe preview of the project site; clicking opens
// the site in a new tab. Cards without a URL show a coming-soon placeholder.
// Arrow button only appears when content overflows the viewport.

import { useRef, useState, useCallback, useEffect } from 'react'
import './PosterGrid.css'

// url: null = placeholder (not yet linked). Add URL when the project is ready.
const POSTERS = [
  { id: 'felt-well-met', title: 'Be Well Met', url: 'https://www.bewellmet.com' },
  { id: 'simmer',        title: 'Simmer',       url: null },
  { id: 'abq',           title: 'ABQ',          url: null },
]

export default function PosterGrid() {
  const trackRef = useRef(null)
  const [canScroll, setCanScroll] = useState(false)

  // Show arrow only when the track overflows
  const checkOverflow = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    setCanScroll(track.scrollWidth > track.clientWidth + 1)
  }, [])

  useEffect(() => {
    checkOverflow()
    window.addEventListener('resize', checkOverflow)
    return () => window.removeEventListener('resize', checkOverflow)
  }, [checkOverflow])

  // Hide arrow once user scrolls to the end
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const onScroll = () => {
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1
      setCanScroll(!atEnd)
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => track.removeEventListener('scroll', onScroll)
  }, [])

  // Compute exact iframe scale from actual card width so it fills the card precisely
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const cards = track.querySelectorAll('.poster-grid__card')
    if (!cards.length) return

    const updateScales = () => {
      cards.forEach(card => {
        const scale = card.offsetWidth / 1280
        card.style.setProperty('--iframe-scale', scale)
      })
    }

    updateScales()
    const ro = new ResizeObserver(updateScales)
    cards.forEach(card => ro.observe(card))
    return () => ro.disconnect()
  }, [])

  const scrollRight = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const cardWidth = track.querySelector('.poster-grid__card')?.offsetWidth || 300
    track.scrollBy({ left: cardWidth + 16, behavior: 'smooth' })
  }, [])

  return (
    <section className="poster-grid" aria-label="Featured projects">
      <div ref={trackRef} className="poster-grid__track">
        <div className="poster-grid__container">
          {POSTERS.map(poster => (
            <div key={poster.id} className="poster-grid__card">
              {poster.url ? (
                <>
                  {/* iframe is visual only — pointer-events disabled so it doesn't
                      swallow scroll. The overlay <a> handles all interaction. */}
                  <iframe
                    src={poster.url}
                    title={poster.title}
                    className="poster-grid__iframe"
                    tabIndex={-1}
                    aria-hidden="true"
                  />
                  {/* Overlay captures clicks and opens the site in a new tab */}
                  <a
                    href={poster.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="poster-grid__overlay"
                    aria-label={`Visit ${poster.title} — opens in new tab`}
                  >
                    <span className="poster-grid__visit-label">
                      {poster.title} ↗
                    </span>
                  </a>
                </>
              ) : (
                // Placeholder for cards not yet linked
                <div className="poster-grid__placeholder" aria-label={`${poster.title} — coming soon`}>
                  <span className="poster-grid__placeholder-title">{poster.title}</span>
                  <span className="poster-grid__placeholder-sub">Coming soon</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {canScroll && (
        <button
          className="poster-grid__arrow"
          onClick={scrollRight}
          aria-label="Scroll to see more projects"
        >
          &rarr;
        </button>
      )}
    </section>
  )
}
