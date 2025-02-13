import React, { useEffect, useRef, useState } from 'react'
import '../styles/pages/Home.css'

function Home() {
  const observerRef = useRef()
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
            <button className="btn-primary">Get Started</button>
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