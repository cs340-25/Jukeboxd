import React from 'react'
import '../styles/Header.css'

function Header() {
  return (
    <header className="header-container">
      <div className="logo">Jukebox'd</div>
      <nav className="nav-links">
        <a href="#home">Home</a>
        <a href="#reviews">Reviews</a>
        <button className="auth-button">
          Log In / Sign Up
        </button>
      </nav>
    </header>
  )
}

export default Header 