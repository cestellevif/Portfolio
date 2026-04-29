import { LINES } from './data/projects.js'
import MainStation from './components/MainStation/MainStation.jsx'
import MetroLine from './components/MetroLine/MetroLine.jsx'

export default function App() {
  return (
    <div className="app" id="top">
      <MainStation lines={LINES} />
      {LINES.map((line) => (
        <MetroLine key={line.id} line={line} />
      ))}
    </div>
  )
}
