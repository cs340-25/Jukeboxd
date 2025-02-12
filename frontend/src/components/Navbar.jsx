import React from 'react'
import '../styles/Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-content">
        <div className="logo">Jukebox'd</div>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#reviews">Reviews</a>
          <button className="auth-button">
            Log In / Sign Up
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 