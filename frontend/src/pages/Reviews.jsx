import React, { useState, useEffect } from 'react'
import '../styles/pages/Reviews.css'

function Reviews() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showNewReviewForm, setShowNewReviewForm] = useState(false)
  const [newReview, setNewReview] = useState({
    album_title: '',
    album_artist: '',
    album_cover: '',
    rating: 5,
    review_text: ''
  })
  const [ratingHover, setRatingHover] = useState(0)

  // Mock reviews data
  const mockReviews = [
    {
      id: 1,
      album_title: "Random Access Memories",
      album_artist: "Daft Punk",
      album_cover: "https://i.scdn.co/image/ab67616d0000b273b1f8da74f225fa1225cdface",
      rating: 4.8,
      review_text: "A masterpiece that blends electronic and organic elements perfectly. Get Lucky is an instant classic, but tracks like Giorgio by Moroder and Touch show the duo's true genius.",
      created_at: new Date(2023, 5, 12).toISOString()
    },
    {
      id: 2,
      album_title: "To Pimp A Butterfly",
      album_artist: "Kendrick Lamar",
      album_cover: "https://i.scdn.co/image/ab67616d0000b273cdb645498cd3d8a2db4d05e1",
      rating: 5.0,
      review_text: "A revolutionary album that tackles complex social issues through incredible jazz-rap fusion. Kendrick's storytelling is unmatched, and the production is flawless throughout.",
      created_at: new Date(2023, 7, 23).toISOString()
    },
    {
      id: 3,
      album_title: "Future Nostalgia",
      album_artist: "Dua Lipa",
      album_cover: "https://i.scdn.co/image/ab67616d0000b2734c79d5ec52a6d0302f3add25",
      rating: 4.5,
      review_text: "A perfect pop album that channels disco and 80s influences while remaining fresh and modern. Every track is catchy, and the production is pristine.",
      created_at: new Date(2023, 8, 5).toISOString()
    },
    {
      id: 4,
      album_title: "Blonde",
      album_artist: "Frank Ocean",
      album_cover: "https://i.scdn.co/image/ab67616d0000b273c5649add07ed3720be9d5526",
      rating: 4.9,
      review_text: "An emotional masterpiece that reveals new layers with each listen. Frank's vulnerable songwriting and experimental production create a truly unique listening experience.",
      created_at: new Date(2023, 4, 17).toISOString()
    },
    {
      id: 5,
      album_title: "The Dark Side of the Moon",
      album_artist: "Pink Floyd",
      album_cover: "https://i.scdn.co/image/ab67616d0000b2731a6194c50d47b7a7e7d7e1d6",
      rating: 5.0,
      review_text: "A timeless masterpiece that transcends genre boundaries. The album's conceptual depth and sonic innovation make it an essential listening experience even decades after its release. The way each track flows into the next creates a hypnotic journey unlike anything else in music.",
      created_at: new Date(2023, 9, 3).toISOString()
    },
    {
      id: 6,
      album_title: "After Hours",
      album_artist: "The Weeknd",
      album_cover: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36", 
      rating: 4.7,
      review_text: "The Weeknd's most cohesive and cinematic project to date. The 80s-inspired synths blend perfectly with modern production, creating an album that's both nostalgic and forward-thinking. 'Blinding Lights' is the obvious hit, but deeper cuts like 'Faith' and 'After Hours' showcase Abel's growth as an artist.",
      created_at: new Date(2023, 11, 12).toISOString()
    },
    {
      id: 7,
      album_title: "In Rainbows",
      album_artist: "Radiohead",
      album_cover: "https://i.scdn.co/image/ab67616d0000b273ee3c40f9e2e4d9f764f57b8e",
      rating: 4.8,
      review_text: "Radiohead at their most accessible yet still experimental. The warm production and intimate songwriting make this their most human-sounding album. 'Weird Fishes/Arpeggi' and 'Reckoner' are two of the most beautiful songs ever recorded, with layers that reveal themselves with each listen. The pay-what-you-want release strategy was revolutionary for its time.",
      created_at: new Date(2023, 10, 20).toISOString()
    }
  ]

  useEffect(() => {
    // Simulate API call with loading delay
    const timer = setTimeout(() => {
      setReviews(mockReviews)
      setLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  const handleSubmitReview = (e) => {
    e.preventDefault()
    
    // Create new review with current date and random ID
    const newReviewData = {
      ...newReview,
      id: Date.now(),
      created_at: new Date().toISOString(),
      rating: Number(newReview.rating)
    }
    
    // Add new review to the top of the list
    setReviews([newReviewData, ...reviews])
    
    // Clear form and hide it
    setShowNewReviewForm(false)
    setNewReview({
      album_title: '',
      album_artist: '',
      album_cover: '',
      rating: 5,
      review_text: ''
    })
    
    // Show success message
    const successMessage = document.createElement('div')
    successMessage.className = 'review-success-message'
    successMessage.innerHTML = '✓ Review submitted successfully!'
    document.body.appendChild(successMessage)
    
    setTimeout(() => {
      successMessage.classList.add('fade-out')
      setTimeout(() => {
        document.body.removeChild(successMessage)
      }, 300)
    }, 2000)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewReview(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const renderStarRating = (rating) => {
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating))
  }

  if (loading) {
    return (
      <div className="reviews-page loading-state">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading your reviews...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return <div className="reviews-page error">{error}</div>
  }

  return (
    <div className="reviews-page">
      <section className="reviews-header">
        <h1>Reviews</h1>
        <button 
          className="new-review-btn"
          onClick={() => setShowNewReviewForm(!showNewReviewForm)}
        >
          {showNewReviewForm ? 'Cancel' : 'Write a Review'}
        </button>
      </section>

      {showNewReviewForm && (
        <section className="new-review-form">
          <h2>Write a New Review</h2>
          <form onSubmit={handleSubmitReview}>
            <div className="form-group">
              <label htmlFor="album_title">Album Title</label>
              <input
                type="text"
                id="album_title"
                name="album_title"
                value={newReview.album_title}
                onChange={handleInputChange}
                placeholder="Enter album name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="album_artist">Artist</label>
              <input
                type="text"
                id="album_artist"
                name="album_artist"
                value={newReview.album_artist}
                onChange={handleInputChange}
                placeholder="Enter artist name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="album_cover">Album Cover URL</label>
              <input
                type="url"
                id="album_cover"
                name="album_cover"
                value={newReview.album_cover}
                onChange={handleInputChange}
                placeholder="Enter album cover image URL"
                required
              />
            </div>

            <div className="form-group">
              <label>Rating</label>
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map(star => (
                  <span 
                    key={star}
                    className={`star ${star <= (ratingHover || newReview.rating) ? 'active' : ''}`}
                    onClick={() => setNewReview({...newReview, rating: star})}
                    onMouseEnter={() => setRatingHover(star)}
                    onMouseLeave={() => setRatingHover(0)}
                  >
                    {star <= (ratingHover || newReview.rating) ? '★' : '☆'}
                  </span>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="review_text">Review</label>
              <textarea
                id="review_text"
                name="review_text"
                value={newReview.review_text}
                onChange={handleInputChange}
                placeholder="Share your thoughts about this album..."
                required
              />
            </div>

            <button type="submit" className="submit-btn">Submit Review</button>
          </form>
        </section>
      )}

      <section className="reviews-list">
        <h2>Reviews</h2>
        <div className="reviews-grid">
          {reviews.map(review => (
            <div key={review.id} className="review-card">
              <div className="review-card-content">
                <div className="review-header">
                  <div className="album-info">
                    <h3>{review.album_title}</h3>
                    <p className="artist">{review.album_artist}</p>
                  </div>
                  <div className="rating">{renderStarRating(review.rating)}</div>
                </div>
                <div className="album-cover">
                  <img src={review.album_cover} alt={review.album_title} />
                </div>
                <p className="review-text">{review.review_text}</p>
                <p className="review-date">
                  {new Date(review.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Reviews