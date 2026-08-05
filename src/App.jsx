// App — root component for the portfolio.
// Page flow: SiteHeader → PosterGrid.
// DepartureBoard + MetroLine are built but removed from the page for now —
// they'll be wired back in once the poster layout and horizontal transition are ready.

import SiteHeader from './components/SiteHeader/SiteHeader.jsx'
import PosterGrid from './components/PosterGrid/PosterGrid.jsx'

export default function App() {
  return (
    <div className="app" id="top">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <SiteHeader />
      <PosterGrid />
    </div>
  )
}
