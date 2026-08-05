// PosterGrid — horizontal scrolling poster strip in a connected black frame.
// Offset to the right with space on the left, like subway station art posters.
// Arrow button only appears when content overflows the viewport.

import { useRef, useState, useCallback, useEffect } from 'react'
import './PosterGrid.css'

const POSTERS = [
  { id: 'felt-well-met' },
  { id: 'simmer' },
  { id: 'ask-better-questions' },
]

export default function PosterGrid() {
  const trackRef = useRef(null)
  const [canScroll, setCanScroll] = useState(false)

  // Check if the track content overflows — show arrow only when it does
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

  // Also hide arrow once user has scrolled to the end
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
            <div key={poster.id} className="poster-grid__card" aria-hidden="true" />
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
