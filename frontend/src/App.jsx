import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Discover from './pages/Discover'
import Reviews from './pages/Reviews'
import Lists from './pages/Lists'
import SearchResults from './pages/SearchResults'
import ThreeBackground from './components/ThreeBackground'
import ParticlesBackground from './components/ParticlesBackground'
import CustomScrollbar from './components/CustomScrollbar'
import { AuthProvider } from './contexts/AuthContext'
import './styles/App.css'

function App() {
  return (
    <AuthProvider>
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
              <Route path="/lists" element={<Lists />} />
              <Route path="/search" element={<SearchResults />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
