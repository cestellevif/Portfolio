// FlipLabel — classic split-flap departure board scramble effect.
// Renders each character as a tile with a horizontal seam.
// On mouseEnter, tiles scramble through random characters before settling.
// Props: { label: string, size?: 'default' | 'lg' }
//   size='lg' applies .flip-label--lg — dark terminal variant at 28-48px.
// Side effects: none. Purely presentational.
// aria-hidden="true" — the parent <a> carries the accessible label.

import { useRef, useCallback } from 'react'
import './FlipLabel.css'

// Characters used during the scramble animation
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

export default function FlipLabel({ label, size = 'default' }) {
  const containerRef = useRef(null)

  // scramble — staggers a randomized character tick across all tiles,
  // then each tile settles back to its correct character.
  // Delay is proportional to character index so later tiles finish later.
  const scramble = useCallback(() => {
    const tiles = containerRef.current?.querySelectorAll('.flip-label__tile')
    if (!tiles) return
    const chars = [...label.toUpperCase()]

    chars.forEach((char, i) => {
      // Space tiles have no visual character to scramble
      if (char === ' ') return
      const tile = tiles[i]
      if (!tile) return

      let frame = 0
      // Later characters get more scramble frames — creates a wave effect
      const totalFrames = 3 + Math.floor(i * 0.8)
      const delay = i * 40

      const tick = () => {
        if (frame < totalFrames) {
          tile.textContent = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
          frame++
          setTimeout(tick, 55)
        } else {
          tile.textContent = char
        }
      }

      setTimeout(tick, delay)
    })
  }, [label])

  // --lg modifier switches to the dark terminal color scheme
  const className = `flip-label${size === 'lg' ? ' flip-label--lg' : ''}`

  return (
    <span ref={containerRef} className={className} onMouseEnter={scramble} aria-hidden="true">
      {[...label.toUpperCase()].map((char, i) => (
        <span
          key={i}
          className={`flip-label__tile${char === ' ' ? ' flip-label__tile--space' : ''}`}
        >
          {char}
        </span>
      ))}
    </span>
  )
}
