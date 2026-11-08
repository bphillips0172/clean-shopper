import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router'
import SiteHeader from './components/SiteHeader.jsx'
import BrowsePage from './features/browse/BrowsePage.jsx'
import LandingPage from './features/landing/LandingPage.jsx'

// Start each page at the top, unless the link points at a section (#how-it-works).
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <SiteHeader />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/browse" element={<BrowsePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
