import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import Home from './pages/Home/Home'
import AnnualReport from './pages/About/AnnualReport'
import Achievements from './pages/Achievements/Achievements'
import WhatWeDo from './pages/WhatWeDo/WhatWeDo'
import Events from './pages/Events/Events'
import Siif from './pages/Siif/Siif'
import Join from './pages/Join/Join'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AnnualReport />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/what-we-do" element={<WhatWeDo />} />
          <Route path="/events" element={<Events />} />
          <Route path="/siif" element={<Siif />} />
          <Route path="/join" element={<Join />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
