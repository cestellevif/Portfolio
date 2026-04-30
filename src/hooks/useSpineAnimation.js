// src/hooks/useSpineAnimation.js
// Animates the charcoal spine div drawing downward as the user scrolls into a line section.
// Spine stops when it reaches the first station (above the 140px goal band).

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// px above the station bottom where the spine stops — matches the goal band height
const GOAL_BAND_HEIGHT = 140

export function useSpineAnimation(lineRef) {
  useEffect(() => {
    if (!lineRef.current) return

    const spine = lineRef.current.querySelector('.metro-line__spine-charcoal')
    if (!spine) return

    const firstStation = lineRef.current.querySelector('.station')

    // maxHeight: distance from top of the line to just above the first station's goal band.
    // If no station found, fall back to the full line height.
    const maxHeight = firstStation
      ? firstStation.offsetTop + firstStation.offsetHeight - GOAL_BAND_HEIGHT
      : lineRef.current.offsetHeight

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(spine, { height: maxHeight })
      return
    }

    gsap.set(spine, { height: 0 })

    const st = ScrollTrigger.create({
      trigger: lineRef.current,
      start: 'top 85%',
      // End when we've scrolled enough for the spine to reach the first station
      end: () => `+=${maxHeight}`,
      scrub: 1.5,
      onUpdate: (self) => {
        gsap.set(spine, { height: maxHeight * self.progress })
      },
    })

    return () => st.kill()
  }, [lineRef])
}
