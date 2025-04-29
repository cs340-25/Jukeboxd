import React, { useState, useEffect } from 'react';
import '../styles/pages/Review.css';

const Review = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [album, setAlbum] = useState('');
  const [artist, setArtist] = useState('');
  const [loading, setLoading] = useState(true);
  const [recentReviews, setRecentReviews] = useState([]);
  const [hoveredStar, setHoveredStar] = useState(0);

  useEffect(() => {
    // Mock data for recent reviews
    const mockReviews = [
      {
        id: 1,
        albumTitle: "To Pimp A Butterfly",
        artist: "Kendrick Lamar",
        rating: 5,
        reviewText: "A masterpiece that transcends genres and generations. The production is incredible, and the storytelling is unmatched.",
        reviewer: "musiclover",
        date: "2 days ago",
        coverImage: "https://i.scdn.co/image/ab67616d0000b273cdb645498cd3d8a2db4d05e1"
      },
      {
        id: 2,
        albumTitle: "Random Access Memories",
        artist: "Daft Punk",
        rating: 4,
        reviewText: "A perfect blend of electronic and live instruments. Get Lucky is an instant classic, but the entire album is a journey worth taking.",
        reviewer: "dancemusic",
        date: "1 week ago",
        coverImage: "https://i.scdn.co/image/ab67616d0000b273b1f8da74f225fa1225cdface"
      },
      {
        id: 3,
        albumTitle: "Blonde",
        artist: "Frank Ocean",
        rating: 5,
        reviewText: "An emotional journey through love, loss, and self-discovery. The production is minimal but powerful, allowing Frank's voice to shine.",
        reviewer: "oceanfan",
        date: "2 weeks ago",
        coverImage: "https://i.scdn.co/image/ab67616d0000b273c5649add07ed3720be9d5526"
      },
      {
        id: 4,
        albumTitle: "Future Nostalgia",
        artist: "Dua Lipa",
        rating: 4,
        reviewText: "A phenomenal pop album that blends disco and modern production. Every track is catchy and perfectly produced.",
        reviewer: "popmusic",
        date: "3 days ago",
        coverImage: "https://i.scdn.co/image/ab67616d0000b2734c79d5ec52a6d0302f3add25"
      }
    ];

    // Simulate loading delay
    setTimeout(() => {
      setRecentReviews(mockReviews);
      setLoading(false);
    }, 800);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create new review object
    const newReview = {
      id: Date.now(),
      albumTitle: album,
      artist: artist,
      rating: rating,
      reviewText: review,
      reviewer: "you",
      date: "Just now",
      coverImage: "https://i.scdn.co/image/ab67616d0000b273000000000000000000000000" // Placeholder
    };
    
    // Add to recent reviews
    setRecentReviews([newReview, ...recentReviews]);
    
    // Reset form
    setAlbum('');
    setArtist('');
    setRating(0);
    setReview('');
    
    // Show success animation (or could add a toast notification here)
    const successElement = document.createElement('div');
    successElement.className = 'review-success';
    successElement.innerText = '✓ Review submitted!';
    document.querySelector('.review-container').appendChild(successElement);
    
    setTimeout(() => {
      successElement.remove();
    }, 3000);
  };

  const handleStarHover = (star) => {
    setHoveredStar(star);
  };

  const handleStarLeave = () => {
    setHoveredStar(0);
  };

  const renderStars = (count) => {
    return '★'.repeat(count) + '☆'.repeat(5 - count);
  };

  if (loading) {
    return (
      <div className="review-page loading-state">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="review-page">
      <div className="review-container">
        <h1>Write a Review</h1>
        <p className="subtitle">Share your thoughts about your favorite music</p>
        
        <div className="glass-container">
          <form onSubmit={handleSubmit} className="review-form">
            <div className="form-group">
              <label htmlFor="album">Album</label>
              <input
                type="text"
                id="album"
                value={album}
                onChange={(e) => setAlbum(e.target.value)}
                placeholder="Enter album name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="artist">Artist</label>
              <input
                type="text"
                id="artist"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                placeholder="Enter artist name"
                required
              />
            </div>

            <div className="form-group">
              <label>Rating</label>
              <div className="rating-container">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`star-button ${star <= (hoveredStar || rating) ? 'active' : ''}`}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => handleStarHover(star)}
                    onMouseLeave={handleStarLeave}
                  >
                    {star <= (hoveredStar || rating) ? '★' : '☆'}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="review">Your Review</label>
              <textarea
                id="review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Share your thoughts about the album..."
                rows="6"
                required
              />
            </div>

            <button type="submit" className="submit-button">
              Submit Review
            </button>
          </form>
        </div>

        <div className="recent-reviews">
          <h2>Recent Reviews</h2>
          <div className="reviews-grid">
            {recentReviews.map((reviewItem) => (
              <div key={reviewItem.id} className="review-card">
                <div className="review-card-content">
                  <div className="review-header">
                    <div className="review-album-info">
                      <h3>{reviewItem.albumTitle}</h3>
                      <p className="artist">{reviewItem.artist}</p>
                    </div>
                    <div className="rating">{renderStars(reviewItem.rating)}</div>
                  </div>
                  <div className="review-cover">
                    <img 
                      src={reviewItem.coverImage} 
                      alt={`${reviewItem.albumTitle} by ${reviewItem.artist}`} 
                    />
                  </div>
                  <p className="review-text">
                    {reviewItem.reviewText}
                  </p>
                  <div className="review-footer">
                    <span className="reviewer">@{reviewItem.reviewer}</span>
                    <span className="date">{reviewItem.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review; 