import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../../styles/layout/Navbar.css'

function Navbar() {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false) // This will be replaced with actual auth state
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu)
  }

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
          {isLoggedIn ? (
            <div className="profile-container">
              <button 
                className="profile-button"
                onClick={handleProfileClick}
                aria-label="User profile"
              >
                <img 
                  src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y" 
                  alt="Profile" 
                  className="profile-icon"
                />
              </button>
              {showProfileMenu && (
                <div className="profile-menu">
                  <Link to="/profile" className="profile-menu-item">Profile</Link>
                  <Link to="/settings" className="profile-menu-item">Settings</Link>
                  <button className="profile-menu-item logout-button">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <button 
              className="auth-button"
              onClick={() => navigate('/auth')}
            >
              Sign In / Register
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar 