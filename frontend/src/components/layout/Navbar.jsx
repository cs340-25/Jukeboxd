import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar'
import '../../styles/layout/Navbar.css'

function Navbar() {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  useEffect(() => {
    // Check login state from localStorage
    const checkLoginState = () => {
      const loginState = localStorage.getItem('isLoggedIn') === 'true'
      setIsLoggedIn(loginState)
      
      if (loginState) {
        try {
          const userData = JSON.parse(localStorage.getItem('user'))
          setUser(userData)
        } catch (error) {
          console.error('Error parsing user data:', error)
        }
      }
    }
    
    // Check login state on mount
    checkLoginState()
    
    // Set up event listener for storage changes (in case of login/logout in another tab)
    window.addEventListener('storage', checkLoginState)
    
    // Clean up event listener
    return () => {
      window.removeEventListener('storage', checkLoginState)
    }
  }, [])

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu)
  }

  const handleLogout = () => {
    // Clear login state from localStorage
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('user')
    setIsLoggedIn(false)
    setUser(null)
    setShowProfileMenu(false)
    
    // Navigate to home
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