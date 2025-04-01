import React, { useState } from 'react';
import '../styles/pages/Review.css';

const Review = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [album, setAlbum] = useState('');
  const [artist, setArtist] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement review submission
    console.log({ rating, review, album, artist });
  };

  return (
    <div className="review-page">
      <div className="review-container">
        <h1>Write a Review</h1>
        <p className="subtitle">Share your thoughts about your favorite music</p>
        
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
                  className={`star-button ${star <= rating ? 'active' : ''}`}
                  onClick={() => setRating(star)}
                >
                  ★
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

        <div className="recent-reviews">
          <h2>Recent Reviews</h2>
          <div className="reviews-grid">
            {/* Example review cards */}
            <div className="review-card">
              <div className="review-header">
                <h3>To Pimp A Butterfly</h3>
                <div className="rating">★★★★★</div>
              </div>
              <p className="artist">Kendrick Lamar</p>
              <p className="review-text">
                A masterpiece that transcends genres and generations. The production is incredible, and the storytelling is unmatched.
              </p>
              <div className="review-footer">
                <span className="reviewer">@musiclover</span>
                <span className="date">2 days ago</span>
              </div>
            </div>

            <div className="review-card">
              <div className="review-header">
                <h3>Random Access Memories</h3>
                <div className="rating">★★★★☆</div>
              </div>
              <p className="artist">Daft Punk</p>
              <p className="review-text">
                A perfect blend of electronic and live instruments. Get Lucky is an instant classic.
              </p>
              <div className="review-footer">
                <span className="reviewer">@dancemusic</span>
                <span className="date">1 week ago</span>
              </div>
            </div>

            <div className="review-card">
              <div className="review-header">
                <h3>Blonde</h3>
                <div className="rating">★★★★★</div>
              </div>
              <p className="artist">Frank Ocean</p>
              <p className="review-text">
                An emotional journey through love, loss, and self-discovery. The production is minimal but powerful.
              </p>
              <div className="review-footer">
                <span className="reviewer">@oceanfan</span>
                <span className="date">2 weeks ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review; 