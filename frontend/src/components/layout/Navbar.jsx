import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar'
import { useAuth } from '../../contexts/AuthContext'
import '../../styles/layout/Navbar.css'

function Navbar() {
  const navigate = useNavigate()
  const { isLoggedIn, user, logout } = useAuth()
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu)
  }

  const handleLogout = () => {
    logout()
    setShowProfileMenu(false)
    navigate('/')
  }

  const handleSearchResult = (results) => {
    if (results && results.length > 0) {
      // Navigate to search results page with the results
      navigate('/search', { 
        state: { 
          results: results,
          query: results[0]?.searchQuery || '' 
        } 
      })
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Jukebox'd
        </Link>
        
        <div className="nav-search">
          <SearchBar onSearchResult={handleSearchResult} />
        </div>

        <div className="nav-links">
          <Link to="/discover" className="nav-link">Discover</Link>
          <Link to="/reviews" className="nav-link">Reviews</Link>
          <Link to="/lists" className="nav-link">Lists</Link>
          {isLoggedIn && user ? (
            <div className="profile-container">
              <button 
                className="profile-button"
                onClick={handleProfileClick}
                aria-label="User profile"
              >
                <img 
                  src={user.avatar || "https://ui-avatars.com/api/?name=User&background=random"} 
                  alt="Profile" 
                  className="profile-icon"
                />
              </button>
              {showProfileMenu && (
                <div className="profile-menu">
                  <div className="profile-menu-header">
                    <span className="profile-greeting">Hello, {user.username}</span>
                    <span className="profile-email">{user.email}</span>
                  </div>
                  <Link to="/profile" className="profile-menu-item">Profile</Link>
                  <Link to="/settings" className="profile-menu-item">Settings</Link>
                  <button 
                    className="profile-menu-item logout-button"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
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