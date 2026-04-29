import { LINES } from './data/projects.js'
import MainStation from './components/MainStation/MainStation.jsx'

export default function App() {
  return (
    <div className="app">
      <MainStation lines={LINES} />
    </div>
  )
}
