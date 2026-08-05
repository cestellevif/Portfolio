// SiteHeader — left-aligned masthead inspired by Baptiste Glaymann's header.
// Name and role on one line, left-aligned. White nav bar with bordered cells.

import { useCallback } from 'react'
import './SiteHeader.css'

export default function SiteHeader() {
  // Obfuscate email so bots can't scrape it from the DOM
  const handleContact = useCallback((e) => {
    e.preventDefault()
    const u = 'cestellevif'
    const d = 'gmail.com'
    window.location.href = `mailto:${u}@${d}`
  }, [])

  return (
    <header id="main-content" className="site-header" aria-label="Site header">
      {/* All inline to prevent JSX whitespace gaps */}
      <h1 className="site-header__title"><strong>Cest Elle Vif</strong><span className="site-header__sep" aria-hidden="true">&middot;</span><strong>Civic Engineer &amp; Product Builder</strong></h1>

      <nav className="site-header__nav" aria-label="Primary navigation">
        <ul className="site-header__nav-left">
          <li><a href="#top" className="site-header__nav-link site-header__nav-link--active">Home</a></li>
          <li><a href="/simmer/privacy-policy.html" className="site-header__nav-link">Simmer Privacy Policy</a></li>
        </ul>
        <ul className="site-header__nav-right">
          <li><a href="#contact" onClick={handleContact} className="site-header__nav-link">Contact</a></li>
        </ul>
      </nav>
    </header>
  )
}
