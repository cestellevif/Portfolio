// PosterGrid — horizontal scrolling poster strip in a connected black frame.
// Each card shows a live iframe preview of the project site; clicking opens
// the site in a new tab. Cards without a URL show a coming-soon placeholder.
// Arrow button only appears when content overflows the viewport.

import { useRef, useState, useCallback, useEffect } from 'react'
import './PosterGrid.css'

// Rendering priority per card: video → image → iframe (url) → placeholder
// Set video/image to a public/ path when ready; url opens on click.
// sign.color: orange #f5a623 or peach #ffe9c4 per Figma DecisionGate design.
const POSTERS = [
  {
    id: 'felt-well-met', title: 'Be Well Met',
    url: 'https://www.bewellmet.com', video: null, image: null,
    sign: { text: "Robert's Rules Made Simple", color: '#f5a623' },
  },
  {
    id: 'simmer', title: 'Simmer',
    url: null, video: null, image: 'images/Simmer.png',
    sign: { text: 'Any Recipe, Less Scrolling', color: '#ffe9c4' },
  },
  {
    id: 'abq', title: 'ABQ',
    url: 'https://www.askbetterquestions.org', video: null, image: null,
    sign: { text: '3 Questions to Media Literacy', color: '#f5a623' },
  },
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
    const itemWidth = track.querySelector('.poster-grid__item')?.offsetWidth || 300
    track.scrollBy({ left: itemWidth + 16, behavior: 'smooth' })
  }, [])

  return (
    <section className="poster-grid" aria-label="Featured projects">
      <div ref={trackRef} className="poster-grid__track">
        <div className="poster-grid__container">
          {POSTERS.map(poster => (
            // Item wraps the card + sign as a column so the sign is flush below
            <div key={poster.id} className="poster-grid__item">

              <div className="poster-grid__card">
                {/* ── Visual layer: video > image > iframe > placeholder ── */}
                {poster.video ? (
                  <video
                    className="poster-grid__video"
                    src={poster.video}
                    autoPlay muted loop playsInline
                    aria-hidden="true"
                    ref={el => { if (el) el.playbackRate = 1.4 }}
                  />
                ) : poster.image ? (
                  <img
                    className="poster-grid__image"
                    src={`${import.meta.env.BASE_URL}${poster.image}`}
                    alt=""
                    aria-hidden="true"
                  />
                ) : poster.url ? (
                  <iframe
                    src={poster.url}
                    title={poster.title}
                    className="poster-grid__iframe"
                    tabIndex={-1}
                    aria-hidden="true"
                  />
                ) : (
                  <div className="poster-grid__placeholder" aria-hidden="true">
                    <span className="poster-grid__placeholder-title">{poster.title}</span>
                  </div>
                )}

                {/* Click overlay — opens site in new tab */}
                {poster.url && (
                  <a
                    href={poster.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="poster-grid__overlay"
                    aria-label={`Visit ${poster.title} — opens in new tab`}
                  />
                )}
              </div>

              {/* ── Sign strip — marquee ticker below the card ── */}
              <div
                className="poster-grid__sign"
                style={{ background: poster.sign.color }}
                aria-hidden="true"
              >
                {/* Text doubled so the loop is seamless: animate -50% = one copy width */}
                <div className="poster-grid__sign-track">
                  <span>{poster.sign.text} &nbsp;·&nbsp; </span>
                  <span>{poster.sign.text} &nbsp;·&nbsp; </span>
                </div>
              </div>

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
