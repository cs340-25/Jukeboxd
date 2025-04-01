import React from 'react'
import '../styles/Header.css'

function Header() {
  // Get URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const userEmail = urlParams.get('user');
  const userName = urlParams.get('name');

  const handleLogout = () => {
    // Redirect to home page without user parameters
    window.location.href = '/';
  };

  return (
    <header className="header-container">
      <div className="logo">Jukebox'd</div>
      <nav className="nav-links">
        <a href="#home">Home</a>
        <a href="#reviews">Reviews</a>
        {userEmail ? (
          <div className="user-section">
            <span className="user-name">Welcome, {userName}</span>
            <button className="auth-button logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <button className="auth-button">
            Log In / Sign Up
          </button>
        )}
      </nav>
    </header>
  )
}

export default Header 