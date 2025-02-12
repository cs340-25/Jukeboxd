import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/layout/Navbar.css'

function Navbar() {
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
          <button className="auth-button">Sign In</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 