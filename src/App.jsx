import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router'
import SiteHeader from './components/SiteHeader.jsx'
import BrowsePage from './features/browse/BrowsePage.jsx'
import CheckoutPage from './features/checkout/CheckoutPage.jsx'
import LandingPage from './features/landing/LandingPage.jsx'
import SavedPage from './features/saved/SavedPage.jsx'

// Start each page at the top, unless the link points at a section (#how-it-works).
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

function App() {
  // The cart holds whole products, not just ids, so products found through search show up in it too.
  const [cart, setCart] = useState([])
  const toggleSaved = (product) =>
    setCart((items) =>
      items.some((item) => item.id === product.id)
        ? items.filter((item) => item.id !== product.id)
        : [...items, product],
    )
  const savedIds = cart.map((item) => item.id)

  return (
    <BrowserRouter>
      <ScrollToTop />
      <SiteHeader savedCount={cart.length} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/browse" element={<BrowsePage savedIds={savedIds} toggleSaved={toggleSaved} />} />
        <Route path="/saved" element={<SavedPage cart={cart} toggleSaved={toggleSaved} />} />
        <Route path="/checkout" element={<CheckoutPage cart={cart} toggleSaved={toggleSaved} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
