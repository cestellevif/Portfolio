// src/hooks/useStationAnimation.js
// Core interaction: pin on goal arrival, color fills top-down, substop arms grow outward.
// Arms are triggered exactly when the color tip reaches each sub-stop's position.

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const GOAL_BAND_HEIGHT = 140
const DOT_SIZE = 28
const SCROLL_PER_SUBSTOP = 280

export function useStationAnimation(stationRef, lineColor) {
  useEffect(() => {
    if (!stationRef.current) return

    const station = stationRef.current
    const substops = Array.from(station.querySelectorAll('.substop'))
    const substopArms = Array.from(station.querySelectorAll('.substop__arm'))
    const substopRings = Array.from(station.querySelectorAll('.substop__ring'))
    const colorOverlay = station.querySelector('.station__spine-color')
    const stationCharcoal = station.querySelector('.station__spine-charcoal')
    const goalText = station.querySelector('.station__goal-text--goal')
    const achievementText = station.querySelector('.station__goal-text--achievement')

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      substops.forEach(el => gsap.set(el, { opacity: 1 }))
      substopArms.forEach(el => gsap.set(el, { scaleX: 1 }))
      substopRings.forEach(el => gsap.set(el, { background: lineColor }))
      if (colorOverlay) gsap.set(colorOverlay, { scaleY: 1 })
      if (stationCharcoal) gsap.set(stationCharcoal, { height: '100%' })
      if (goalText && achievementText) {
        gsap.set(goalText, { x: '-110%' })
        gsap.set(achievementText, { x: '0%' })
      }
      return
    }

    // GSAP owns both transforms — set explicit starting states before timeline builds
    if (goalText) gsap.set(goalText, { x: 0 })
    if (achievementText) gsap.set(achievementText, { x: '110%' })

    const stationHeight = station.offsetHeight
    // Height the color overlay covers: station top down to just above the dot
    const colorOverlayHeight = stationHeight - GOAL_BAND_HEIGHT - DOT_SIZE

    const pinScrollDistance = 200 + substops.length * SCROLL_PER_SUBSTOP

    const tl = gsap.timeline({ paused: true })

    // Charcoal spine: reveal full height at pin start, retract on scroll-back
    if (stationCharcoal) {
      tl.set(stationCharcoal, { height: '100%' }, 0)
    }

    // Color overlay: fills top-down over the entire pin scroll duration
    if (colorOverlay) {
      tl.fromTo(
        colorOverlay,
        { scaleY: 0 },
        { scaleY: 1, ease: 'none', duration: 1 },
        0
      )
    }

    // Arms: stagger by index so they enter top-to-bottom in reading order.
    // DOM index 0 = top substop (MetroLine assigns largest bottomOffset to index 0).
    const n = substops.length
    substops.forEach((substop, i) => {
      const arm = substopArms[i]
      const ring = substopRings[i]

      // Distribute evenly across 10%–85% of timeline so they track the color fill
      const startTime = n > 1 ? 0.1 + (i / (n - 1)) * 0.75 : 0.5

      tl.set(substop, { opacity: 1 }, startTime)
      tl.to(arm, { scaleX: 1, ease: 'power2.out', duration: 0.4 }, startTime)
      tl.to(ring, { background: lineColor, ease: 'none', duration: 0.15 }, startTime + 0.4)
    })

    // Train slide: goal departs fully left, then achievement arrives from right.
    // Sequential ('>' position) ensures no visual overlap — platform clears before next train arrives.
    if (goalText && achievementText) {
      tl.fromTo(goalText,
        { x: 0 },
        { x: '-110%', ease: 'power2.in', duration: 0.28 },
        '>'
      )
      tl.fromTo(achievementText,
        { x: '110%' },
        { x: '0%', ease: 'power2.out', duration: 0.28 },
        '>'
      )
    }

    const st = ScrollTrigger.create({
      trigger: station,
      start: 'bottom bottom',
      end: `+=${pinScrollDistance}`,
      pin: true,
      anticipatePin: 1,
      scrub: 0.8,
      onUpdate: (self) => {
        tl.progress(self.progress)
      },
      onLeave: () => {
        tl.progress(1)
      },
    })

    return () => {
      st.kill()
      tl.kill()
    }
  }, [stationRef, lineColor])
}
