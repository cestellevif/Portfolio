import { useRef } from 'react'
import './SubStop.css'

// bottomOffset: px above the goal band (140px base) where this arm appears
// index: 0-based position in the station's substop list
export default function SubStop({ label, bottomOffset, lineColor, index }) {
  const ref = useRef(null)

  return (
    <div
      ref={ref}
      className="substop"
      style={{
        '--line-color': lineColor,
        bottom: `${bottomOffset}px`,
      }}
      data-substop-index={index}
    >
      <div className="substop__arm" />
      <div className="substop__ring" />
      <span className="substop__label">{label}</span>
    </div>
  )
}
