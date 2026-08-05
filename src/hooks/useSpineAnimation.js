// src/hooks/useSpineAnimation.js
// Draws the charcoal spine from the header through all stations, filling each dot.
// Station 1: scroll-listener from header (ease-in start, races to dot).
// Stations 2+: ScrollTrigger per station (top→bottom of station = prev dot→this dot).
// Retracts when user scrolls back to the top.

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const GOAL_BAND_HEIGHT = 140
const DOT_SIZE = 28

export function useSpineAnimation(lineRef, lineId) {
  useEffect(() => {
    if (!lineRef.current) return

    const spine = lineRef.current.querySelector('.metro-line__spine-charcoal')
    if (!spine) return

    const stations = Array.from(lineRef.current.querySelectorAll('.station'))
    if (stations.length === 0) return

    // Walk offsetParent chain up to the metro-line container.
    // GSAP pin spacers wrap each station in a div.pin-spacer, making station.offsetTop = 0
    // (relative to spacer). We need the true position within the MetroLine container.
    const getTopInLine = (el) => {
      let top = 0
      let node = el
      while (node && node !== lineRef.current) {
        top += node.offsetTop
        node = node.offsetParent
      }
      return top
    }

    // Per-station data: spine bottom (full station height) and dot threshold
    const stationData = stations.map(station => {
      const topInLine = getTopInLine(station)
      const bottom = topInLine + station.offsetHeight
      return {
        station,
        bottom,
        dotY:    bottom - GOAL_BAND_HEIGHT - DOT_SIZE,
        dotFill: station.querySelector('.station__dot-fill'),
        dotTriggered: false,
      }
    })

    // Extend spine through the buffer zone so it races ahead of the user
    // as the loop anchor slides up into view.
    const bufferEl = lineRef.current.querySelector('.metro-line__buffer')
    if (bufferEl) {
      const bufferTop = getTopInLine(bufferEl)
      stationData.push({
        station: bufferEl,
        bottom: bufferTop + bufferEl.offsetHeight,
        dotY: Infinity,
        dotFill: null,
        dotTriggered: true,
      })
    }

    // Extend spine into the loop anchor so the line visually reaches back into the header
    // frame as it slides up. Uses getBoundingClientRect — station-loop is outside MetroLine.
    // MetroLine always mounts at scrollY=0 so rect.top === offsetTop at this moment.
    const loopEl = document.getElementById('station-loop')
    if (loopEl) {
      const lineTop = lineRef.current.getBoundingClientRect().top
      const loopTopInLine = loopEl.getBoundingClientRect().top - lineTop
      const frameEl = loopEl.querySelector('.main-station-wrapper')
      const frameHeight = frameEl ? frameEl.offsetHeight : 300
      stationData.push({
        station: loopEl,
        bottom: loopTopInLine + frameHeight,
        dotY: Infinity,
        dotFill: null,
        dotTriggered: true,
      })
    }

    const maxHeight = stationData[stationData.length - 1].bottom

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(spine, { height: maxHeight })
      stationData.forEach(d => { if (d.dotFill) gsap.set(d.dotFill, { scaleY: 1 }) })
      return
    }

    gsap.set(spine, { height: 0 })
    stationData.forEach(d => { if (d.dotFill) gsap.set(d.dotFill, { scaleY: 0 }) })

    const mainWrapper = document.querySelector('.main-station-wrapper')

    let peakHeight = 0
    let completed = false
    let retracting = false
    const ref = { onScroll: null, triggers: [] }

    // Fill any dots whose threshold the spine has now passed
    const checkDots = () => {
      stationData.forEach(d => {
        if (!d.dotTriggered && peakHeight >= d.dotY - 40) {
          d.dotTriggered = true
          if (d.dotFill) {
            gsap.to(d.dotFill, {
              scaleY: 1,
              duration: 0.35,
              ease: 'power2.inOut',
              transformOrigin: 'top center',
            })
          }
        }
      })
    }

    const growTo = (h) => {
      if (h <= peakHeight) return
      peakHeight = h
      gsap.to(spine, { height: peakHeight, duration: 0.4, ease: 'power2.out', overwrite: 'auto' })
      checkDots()
      if (peakHeight >= maxHeight * 0.99) complete()
    }

    const complete = () => {
      if (completed) return
      completed = true
      gsap.to(spine, { height: maxHeight, duration: 0.4, ease: 'power2.out', overwrite: 'auto' })
    }

    const createTrigger = () => {
      const triggerEnd = mainWrapper ? mainWrapper.offsetHeight : stationData[0].bottom

      // ── Station 1: direct scroll listener, races from header ──────────────
      const onScroll = () => {
        if (completed || retracting) return
        const raw = stationData[0].bottom * Math.min(window.scrollY / triggerEnd, 1)
        if (raw <= peakHeight) return

        const fromZero = peakHeight < 1
        peakHeight = raw
        gsap.to(spine, {
          height: peakHeight,
          duration: fromZero ? 0.8 : 0.5,
          ease: fromZero ? 'power2.inOut' : 'power2.out',
          overwrite: 'auto',
        })
        checkDots()
      }

      ref.onScroll = onScroll
      window.addEventListener('scroll', onScroll, { passive: true })

      // ── Stations 2+: ticker using getBoundingClientRect ──────────────────
      // ScrollTrigger positions are unreliable here because GSAP pin spacers
      // (added by useStationAnimation, which runs before this effect) shift
      // the effective scroll positions. getBoundingClientRect always gives
      // the real viewport position regardless of pins or spacers.
      if (stationData.length > 1) {
        const checkInterStation = () => {
          if (completed || retracting) return
          const vh = window.innerHeight
          stationData.slice(1).forEach((data, i) => {
            const rect = data.station.getBoundingClientRect()
            if (rect.top >= vh) return // not yet entering viewport
            // progress 0 → station top at viewport bottom
            // progress 1 → station bottom at viewport bottom (pin point)
            const progress = Math.max(0, Math.min(1, (vh - rect.top) / rect.height))
            growTo(stationData[i].bottom + (data.bottom - stationData[i].bottom) * progress)
          })
        }
        gsap.ticker.add(checkInterStation)
        ref.tick = checkInterStation
      }
    }

    const retract = (recreate = true) => {
      if (retracting || (peakHeight === 0 && !completed)) return
      retracting = true
      completed = false
      peakHeight = 0
      stationData.forEach(d => {
        d.dotTriggered = false
        if (d.dotFill) gsap.set(d.dotFill, { scaleY: 0 })
      })
      if (ref.onScroll) {
        window.removeEventListener('scroll', ref.onScroll)
        ref.onScroll = null
      }
      ref.triggers.forEach(st => st.kill())
      ref.triggers = []
      if (ref.tick) { gsap.ticker.remove(ref.tick); ref.tick = null }
      gsap.killTweensOf(spine)
      gsap.to(spine, {
        height: 0,
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: () => {
          retracting = false
          if (recreate) createTrigger()
        },
      })
    }

    // Only retract when the user scrolls back to the top after having scrolled down.
    // Without the hasScrolledDown guard, the very first scroll tick (scrollY ~3–8px)
    // satisfies <= 10 and triggers a full retraction.
    let hasScrolledDown = false
    const handleScroll = () => {
      if (window.scrollY > 50) hasScrolledDown = true
      if (window.scrollY <= 10 && hasScrolledDown) retract()
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Line-switch retraction: single tween that collapses the spine into the button dot.
    // Animates top → -distanceAbove and height → 0 simultaneously with the same ease so
    // both the top edge (fixed at MetroLine.top) and the bottom edge (at its current
    // position) converge on the dot at the same time — no phase break, no pop.
    const handleForceRetract = () => {
      if (retracting) return
      retracting = true
      completed = false
      peakHeight = 0
      stationData.forEach(d => { d.dotTriggered = false; if (d.dotFill) gsap.set(d.dotFill, { scaleY: 0 }) })
      if (ref.onScroll) { window.removeEventListener('scroll', ref.onScroll); ref.onScroll = null }
      ref.triggers.forEach(st => st.kill())
      ref.triggers = []
      if (ref.tick) { gsap.ticker.remove(ref.tick); ref.tick = null }
      gsap.killTweensOf(spine)

      const dotEl = lineId
        ? document.querySelector(`[data-line-id="${lineId}"] .main-station__route-dot`)
        : null

      if (!dotEl || !lineRef.current) {
        // Fallback: no dot found, standard retract to 0
        gsap.to(spine, {
          height: 0,
          duration: 0.5,
          ease: 'power2.inOut',
          onComplete: () => { retracting = false },
        })
        return
      }

      const dotCenterY = dotEl.getBoundingClientRect().top + dotEl.offsetHeight / 2
      const lineTop = lineRef.current.getBoundingClientRect().top
      const distanceAbove = lineTop - dotCenterY

      if (distanceAbove <= 0) {
        gsap.to(spine, { height: 0, duration: 0.5, ease: 'power2.inOut', onComplete: () => { retracting = false } })
        return
      }

      // Both top and height animate together — top edge and bottom edge both travel
      // toward the dot position and meet there at the end of the tween.
      gsap.to(spine, {
        top: -distanceAbove,
        height: 0,
        duration: 0.7,
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.set(spine, { top: 0 })
          retracting = false
        },
      })
    }
    window.addEventListener('metro-spine-retract', handleForceRetract)

    // Loop retraction: MetroLine dispatches this when station-loop crests the viewport top.
    // The spine is off-screen above — only its bottom tip (visibleLen px) peeks into view.
    //
    // Wrong approach: animate height → 0. The spine is anchored at top:0 (MetroLine top,
    // above viewport), so shrinking height moves the bottom edge UPWARD — it retracts out
    // of the top of the screen, not into the header below.
    //
    // Correct approach:
    //   1. Instantly trim the spine to just the visible slice
    //      (set top = spineTopOffset, height = visibleLen).
    //   2. Animate top → spineTopOffset + visibleLen, height → 0 simultaneously.
    //      bottom = top + height = constant → bottom edge stays fixed in the header frame
    //      while the top edge descends downward, retracting into the frame.
    const handleLoopRetract = () => {
      if (!lineRef.current) return

      if (ref.onScroll) { window.removeEventListener('scroll', ref.onScroll); ref.onScroll = null }
      if (ref.tick) { gsap.ticker.remove(ref.tick); ref.tick = null }
      ref.triggers.forEach(st => st.kill()); ref.triggers = []
      stationData.forEach(d => {
        d.dotTriggered = false
        if (d.dotFill) gsap.set(d.dotFill, { scaleY: 0 })
      })
      retracting = true
      completed = false
      peakHeight = 0

      // spineTopOffset: distance from MetroLine top to viewport top (MetroLine is above viewport)
      // visibleLen: how much of the spine is actually visible below the viewport top
      const spineTopOffset = Math.max(0, -lineRef.current.getBoundingClientRect().top)
      const currentH = parseFloat(gsap.getProperty(spine, 'height')) || 0
      const visibleLen = Math.max(0, currentH - spineTopOffset)

      gsap.killTweensOf(spine)

      if (visibleLen <= 0) {
        gsap.set(spine, { height: 0 })
        retracting = false
        return
      }

      gsap.set(spine, { top: spineTopOffset, height: visibleLen })
      gsap.to(spine, {
        top: spineTopOffset + visibleLen,
        height: 0,
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.set(spine, { top: 0, height: 0 })
          retracting = false
        },
      })
    }
    window.addEventListener('metro-spine-loop-retract', handleLoopRetract)

    // startTeaser: grow spine to ~85% visible viewport so user knows to scroll.
    // peakHeight is set BEFORE createTrigger() so the scroll ratchet stays quiet
    // during the teaser — no fighting between teaser tween and growTo().
    const startTeaser = () => {
      if (!lineRef.current) return
      const metroTop = lineRef.current.getBoundingClientRect().top
      const teaserH = Math.min((window.innerHeight - metroTop) * 0.85, maxHeight)
      peakHeight = teaserH
      createTrigger()
      gsap.to(spine, { height: teaserH, duration: 1.4, ease: 'power3.out' })
    }

    // Enter-from-dot: if we know which button was clicked, show the spine extending
    // downward from that dot to MetroLine.top before the teaser takes over.
    // top=-distanceAbove keeps the visual bottom fixed at MetroLine.top while height
    // grows from 0 to distanceAbove (spine top rises from MetroLine.top to dot).
    // After the grow, snap back to normal coords (top:0, height:0) and start teaser.
    const dotEl = lineId
      ? document.querySelector(`[data-line-id="${lineId}"] .main-station__route-dot`)
      : null

    if (dotEl && lineRef.current) {
      const dotCenterY = dotEl.getBoundingClientRect().top + dotEl.offsetHeight / 2
      const lineTop = lineRef.current.getBoundingClientRect().top
      const distanceAbove = lineTop - dotCenterY
      if (distanceAbove > 0) {
        gsap.set(spine, { top: -distanceAbove, height: 0 })
        gsap.to(spine, {
          height: distanceAbove,
          duration: 0.3,
          ease: 'power2.out',
          onComplete: () => {
            gsap.set(spine, { top: 0, height: 0 })
            startTeaser()
          },
        })
      } else {
        startTeaser()
      }
    } else {
      startTeaser()
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('metro-spine-retract', handleForceRetract)
      window.removeEventListener('metro-spine-loop-retract', handleLoopRetract)
      if (ref.onScroll) window.removeEventListener('scroll', ref.onScroll)
      ref.triggers.forEach(st => st.kill())
      if (ref.tick) gsap.ticker.remove(ref.tick)
      gsap.killTweensOf(spine)
    }
  }, [lineRef, lineId])
}
