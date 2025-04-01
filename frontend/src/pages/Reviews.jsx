import React, { useState, useEffect } from 'react'
import '../styles/pages/Reviews.css'

function Reviews() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showNewReviewForm, setShowNewReviewForm] = useState(false)
  const [newReview, setNewReview] = useState({
    album_id: '',
    album_title: '',
    album_artist: '',
    album_cover: '',
    rating: 5,
    review_text: ''
  })

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:5001/api/reviews')
      if (!response.ok) {
        throw new Error('Failed to fetch reviews')
      }
      const data = await response.json()
      setReviews(data)
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  const handleSubmitReview = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:5001/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      })

      if (!response.ok) {
        throw new Error('Failed to create review')
      }

      await fetchReviews()
      setShowNewReviewForm(false)
      setNewReview({
        album_id: '',
        album_title: '',
        album_artist: '',
        album_cover: '',
        rating: 5,
        review_text: ''
      })
    } catch (err) {
      setError(err.message)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewReview(prev => ({
      ...prev,
      [name]: value
    }))
  }

  if (loading) {
    return <div className="reviews-page">Loading...</div>
  }

  if (error) {
    return <div className="reviews-page error">{error}</div>
  }

  return (
    <div className="reviews-page">
      <section className="reviews-header">
        <h1>Your Reviews</h1>
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
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="rating">Rating</label>
              <input
                type="number"
                id="rating"
                name="rating"
                min="1"
                max="5"
                step="0.1"
                value={newReview.rating}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="review_text">Review</label>
              <textarea
                id="review_text"
                name="review_text"
                value={newReview.review_text}
                onChange={handleInputChange}
                required
              />
            </div>

            <button type="submit" className="submit-btn">Submit Review</button>
          </form>
        </section>
      )}

      <section className="reviews-list">
        <h2>Your Reviews</h2>
        <div className="reviews-grid">
          {reviews.map(review => (
            <div key={review.id} className="review-card">
              <img src={review.album_cover} alt={review.album_title} />
              <div className="review-content">
                <h3>{review.album_title}</h3>
                <p className="artist">{review.album_artist}</p>
                <div className="rating">★ {review.rating}</div>
                <p className="review-text">{review.review_text}</p>
                <p className="review-date">
                  {new Date(review.created_at).toLocaleDateString()}
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