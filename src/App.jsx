import { BrowserRouter, Route, Routes } from 'react-router'
import BrowsePage from './features/browse/BrowsePage.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BrowsePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
