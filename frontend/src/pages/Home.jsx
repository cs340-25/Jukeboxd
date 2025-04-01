import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../styles/pages/Home.css'

function Home() {
  const location = useLocation()
  const navigate = useNavigate()
  const observerRef = useRef()
  const [user, setUser] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [newUsername, setNewUsername] = useState('')
  const [profileImage, setProfileImage] = useState('/placeholder-avatar.jpg')
  const [reviews, setReviews] = useState(Array(10).fill({
    albumName: 'Cannot connect to server',
    artistName: 'Cannot connect to server',
    rating: '★★★★☆',
    reviewText: 'Cannot load review content from server',
    reviewer: {
      username: 'Cannot connect to server',
      avatar: '/placeholder-avatar.jpg'
    },
    date: 'Unknown'
  }))

  useEffect(() => {
    // Check for user info in URL parameters
    const params = new URLSearchParams(location.search)
    const userEmail = params.get('user')
    const userName = params.get('name')
    
    if (userEmail) {
      setUser({
        email: userEmail,
        name: userName,
        username: userName?.split(' ')[0] || userEmail.split('@')[0] // Default username
      })
      setNewUsername(userName?.split(' ')[0] || userEmail.split('@')[0])
      // Clean up the URL
      navigate(location.pathname, { replace: true })
    }
  }, [location, navigate])

  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = async () => {
        const base64Image = reader.result
        setProfileImage(base64Image)
        
        try {
          const response = await fetch('/api/user/profile/image', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image: base64Image }),
          })
          
          if (!response.ok) {
            throw new Error('Failed to update profile image')
          }
          
          const data = await response.json()
          setProfileImage(data.profile_image || base64Image)
        } catch (error) {
          console.error('Error updating profile image:', error)
          // Revert to previous image on error
          setProfileImage('/placeholder-avatar.jpg')
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUsernameUpdate = async () => {
    if (newUsername.trim()) {
      try {
        const response = await fetch('/api/user/profile/username', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: newUsername.trim() }),
        })
        
        if (!response.ok) {
          throw new Error('Failed to update username')
        }
        
        const data = await response.json()
        setUser(prev => ({ ...prev, username: data.username }))
        setIsEditing(false)
      } catch (error) {
        console.error('Error updating username:', error)
        // Revert to previous username on error
        setNewUsername(user.username)
      }
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el))
    observerRef.current = observer

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    // This will be where you fetch reviews from your backend
    // Example structure:
    /*
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/featured-reviews');
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      }
    };
    
    fetchReviews();
    */
  }, [])

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content fade-in">
          <h1><span>The Social Platform for Music Lovers</span></h1>
          <p className="hero-subtitle">Track your music journey. Share your thoughts. Discover new favorites.</p>
          <div className="hero-buttons">
            {!user ? (
              <button className="btn-primary" onClick={() => navigate('/auth')}>
                Get Started
              </button>
            ) : (
              <div className="user-welcome">
                <div className="profile-section">
                  <div className="profile-image-container">
                    <img src={profileImage} alt="Profile" className="profile-image" />
                    <label className="profile-image-upload">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfileImageChange}
                        style={{ display: 'none' }}
                      />
                      <span className="upload-icon">📷</span>
                    </label>
                  </div>
                  <div className="profile-info">
                    {isEditing ? (
                      <div className="username-edit">
                        <input
                          type="text"
                          value={newUsername}
                          onChange={(e) => setNewUsername(e.target.value)}
                          className="username-input"
                        />
                        <button onClick={handleUsernameUpdate} className="btn-primary">Save</button>
                        <button onClick={() => setIsEditing(false)} className="btn-secondary">Cancel</button>
                      </div>
                    ) : (
                      <div className="username-display">
                        <h2>{user.username}</h2>
                        <button onClick={() => setIsEditing(true)} className="btn-text">Edit Username</button>
                      </div>
                    )}
                    <button className="btn-secondary" onClick={() => window.location.href = 'http://localhost:5001/api/google/logout'}>
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Reviews Section */}
      <section className="featured-reviews-section fade-in">
        <div className="section-header">
          <h2>Featured Reviews</h2>
          <div className="section-line"></div>
        </div>
        <div className="reviews-carousel">
          <div className="reviews-track">
            {reviews.map((review, index) => (
              <div key={index} className="review-card dark-glass">
                <div className="review-header">
                  <div className="album-info">
                    <h3>{review.albumName}</h3>
                    <p className="artist">{review.artistName}</p>
                  </div>
                  <div className="rating">{review.rating}</div>
                </div>
                <p className="review-text">
                  {review.reviewText}
                </p>
                <div className="reviewer-info">
                  <div className="reviewer-profile">
                    <img src={review.reviewer.avatar} alt="Reviewer" />
                    <span>@{review.reviewer.username}</span>
                  </div>
                  <span className="review-date">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home 