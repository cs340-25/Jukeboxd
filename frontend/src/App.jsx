import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Discover from './pages/Discover'
import Reviews from './pages/Reviews'
import ThreeBackground from './components/ThreeBackground'
import ParticlesBackground from './components/ParticlesBackground'
import CustomScrollbar from './components/CustomScrollbar'
import './styles/App.css'

function App() {
  return (
    <Router>
      <CustomScrollbar />
      <div className="app">
        <ThreeBackground />
        <ParticlesBackground />
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/reviews" element={<Reviews />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
