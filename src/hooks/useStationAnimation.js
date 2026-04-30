// src/hooks/useStationAnimation.js
// Core interaction: pin on goal arrival, color fills top-down, substop arms grow outward.

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// px of scroll distance allocated per sub-stop (user scrolls this far to reveal each one)
const SCROLL_PER_SUBSTOP = 280

export function useStationAnimation(stationRef, lineColor) {
  useEffect(() => {
    if (!stationRef.current) return

    const station = stationRef.current
    const substops = Array.from(station.querySelectorAll('.substop'))
    const substopArms = Array.from(station.querySelectorAll('.substop__arm'))
    const substopRings = Array.from(station.querySelectorAll('.substop__ring'))
    const colorOverlay = station.querySelector('.station__spine-color')

    // Reduced motion: show everything immediately, no animation
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      substops.forEach(el => gsap.set(el, { opacity: 1 }))
      substopArms.forEach(el => gsap.set(el, { scaleX: 1 }))
      substopRings.forEach(el => gsap.set(el, { background: lineColor }))
      if (colorOverlay) gsap.set(colorOverlay, { scaleY: 1 })
      return
    }

    // Total scroll distance while pinned: base + one segment per substop
    const pinScrollDistance = 200 + substops.length * SCROLL_PER_SUBSTOP

    // Master timeline — all animation while pinned
    const tl = gsap.timeline({ paused: true })

    // 1. Color overlay fills top-down (scaleY 0→1, transform-origin: top)
    if (colorOverlay) {
      tl.fromTo(
        colorOverlay,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          // Faster fill when substops follow so color arrives at junctions on time
          duration: substops.length > 0 ? 0.4 : 1,
        },
        0
      )
    }

    // 2. Sub-stops reveal sequentially — each gets an equal share of timeline
    substops.forEach((substop, i) => {
      const arm = substopArms[i]
      const ring = substopRings[i]
      // Stagger: first substop starts after color fill, each subsequent one 0.5 units later
      const startTime = 0.5 + i * 0.5

      // Make substop visible before arm starts growing
      tl.set(substop, { opacity: 1 }, startTime)

      // Arm grows outward — scaleX 0→1 from left (transform-origin already set in CSS)
      tl.to(arm, {
        scaleX: 1,
        ease: 'power2.out',
        duration: 0.4,
      }, startTime)

      // Ring fills with route color once arm has fully extended
      tl.to(ring, {
        background: lineColor,
        ease: 'none',
        duration: 0.15,
      }, startTime + 0.4)
    })

    // Wire timeline progress to scroll position while station is pinned
    const st = ScrollTrigger.create({
      trigger: station,
      start: 'bottom bottom',       // pin fires when goal band hits viewport bottom
      end: `+=${pinScrollDistance}`, // held for this many px of continued scroll
      pin: true,
      anticipatePin: 1,             // pre-calculates pin point to prevent jump
      scrub: 0.8,
      onUpdate: (self) => {
        tl.progress(self.progress)
      },
      onLeave: () => {
        // Guarantee full reveal state when scrolling past
        tl.progress(1)
      },
    })

    return () => {
      st.kill()
      tl.kill()
    }
  }, [stationRef, lineColor])
}
