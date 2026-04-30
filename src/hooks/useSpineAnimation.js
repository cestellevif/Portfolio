// src/hooks/useSpineAnimation.js
// Animates the charcoal spine drawing downward as the user scrolls into a line section.
// Uses stroke-dashoffset: as dashoffset goes from full length → 0, the line "draws" itself.

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useSpineAnimation(lineRef, svgRef) {
  useEffect(() => {
    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const charcoalLine = svgRef.current?.querySelector('.spine-charcoal')
      if (charcoalLine) {
        gsap.set(charcoalLine, { strokeDashoffset: 0 })
      }
      return
    }

    if (!lineRef.current || !svgRef.current) return

    const charcoalLine = svgRef.current.querySelector('.spine-charcoal')
    if (!charcoalLine) return

    // Use a large dasharray value to cover any line height
    const DASH_LENGTH = 20000

    gsap.set(charcoalLine, {
      strokeDasharray: DASH_LENGTH,
      strokeDashoffset: DASH_LENGTH,
    })

    const st = ScrollTrigger.create({
      trigger: lineRef.current,
      start: 'top 85%',       // start drawing when line section is 85% down viewport
      end: 'bottom bottom',   // finish when bottom of line reaches bottom of viewport
      scrub: 1.5,             // slight lag — the line races ahead of the user
      onUpdate: (self) => {
        // progress 0→1 maps dashoffset DASH_LENGTH→0
        const offset = DASH_LENGTH * (1 - self.progress)
        gsap.set(charcoalLine, { strokeDashoffset: offset })
      },
    })

    return () => st.kill()
  }, [lineRef, svgRef])
}
