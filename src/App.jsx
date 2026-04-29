import { LINES } from './data/projects.js'

export default function App() {
  return (
    <div className="app">
      {LINES.map(line => (
        <div key={line.id}>{line.label}</div>
      ))}
    </div>
  )
}
