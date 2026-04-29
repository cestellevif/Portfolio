import './MainStation.css'

export default function MainStation({ lines }) {
  return (
    <section className="main-station" id="top">
      <h1 className="main-station__name">Elle Estellevif</h1>
      <p className="main-station__throughline">
        I build systems — digital and human — that route the right information
        to the right people at scale.
      </p>
      <p className="main-station__bio">
        Systems thinker. Civic leader. Builder.
      </p>
      <div className="main-station__divider" />
      <nav className="main-station__routes" aria-label="Select a line">
        {lines.map((line) => (
          <a
            key={line.id}
            className="main-station__route"
            href={`#line-${line.id}`}
          >
            <span
              className="main-station__route-dot"
              style={{ background: line.colorHex }}
              aria-hidden="true"
            />
            <span className="main-station__route-label">{line.label}</span>
          </a>
        ))}
      </nav>
    </section>
  )
}
