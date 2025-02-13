import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../../styles/layout/Navbar.css'

function Navbar() {
  const navigate = useNavigate()

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Jukebox'd
        </Link>
        
        <div className="nav-search">
          <input 
            type="search" 
            placeholder="Search for music, reviews, lists..." 
            className="search-input"
          />
        </div>

        <div className="nav-links">
          <Link to="/discover" className="nav-link">Discover</Link>
          <Link to="/reviews" className="nav-link">Reviews</Link>
          <Link to="/lists" className="nav-link">Lists</Link>
          <button 
            className="auth-button"
            onClick={() => navigate('/auth')}
          >
            Sign In / Register
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 