import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Home from './pages/Home'
import Auth from './pages/Auth'
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
