import React, { useEffect, useRef } from 'react'
import ThreeBackground from '../components/ThreeBackground'
import '../styles/pages/Home.css'

function Home() {
  const observerRef = useRef()

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

  return (
    <div className="home">
      {/* Hero Section with 3D Background */}
      <section className="hero">
        <ThreeBackground />
        <div className="hero-content fade-in">
          <h1><span>The Social Platform for Music Lovers</span></h1>
          <p className="hero-subtitle">Track your music journey. Share your thoughts. Discover new favorites.</p>
          <div className="hero-buttons">
            <button className="btn-primary">Get Started</button>
            <button className="btn-secondary">How it Works</button>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="featured-section fade-in">
        <div className="section-header">
          <h2>Featured Reviews</h2>
          <div className="section-line"></div>
        </div>
        <div className="review-grid">
          {[1, 2, 3].map((item) => (
            <div key={item} className="review-card glass-morphism">
              <div className="album-cover"></div>
              <div className="review-content">
                <div className="review-header">
                  <h3>Album Name</h3>
                  <div className="rating">★★★★☆</div>
                </div>
                <p className="artist">Artist Name</p>
                <p className="review-preview">
                  "A masterpiece that redefines the genre..."
                </p>
                <div className="review-meta">
                  <img className="reviewer-avatar" src="/placeholder-avatar.jpg" alt="Reviewer" />
                  <span className="reviewer-name">@username</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Community Section */}
      <section className="community-section fade-in">
        <div className="section-header">
          <h2>Join the Community</h2>
          <div className="section-line"></div>
        </div>
        <div className="features-grid">
          <div className="feature-card glass-morphism">
            <div className="feature-icon">🎵</div>
            <h3>Track Your Music</h3>
            <p>Keep a record of every album you've listened to</p>
          </div>
          <div className="feature-card glass-morphism">
            <div className="feature-icon">✍️</div>
            <h3>Write Reviews</h3>
            <p>Share your thoughts and insights with other music lovers</p>
          </div>
          <div className="feature-card glass-morphism">
            <div className="feature-icon">🎯</div>
            <h3>Get Recommendations</h3>
            <p>Discover new music based on your taste</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home 