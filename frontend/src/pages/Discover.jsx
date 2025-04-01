import React, { useState, useEffect } from 'react'
import '../styles/pages/Discover.css'

function Discover() {
  const [trendingAlbums, setTrendingAlbums] = useState([])
  const [filteredAlbums, setFilteredAlbums] = useState([])
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedAlbum, setSelectedAlbum] = useState(null)
  const [albumTracks, setAlbumTracks] = useState([])
  const [showTracks, setShowTracks] = useState(false)

  // Mock data for categories (we'll keep this static for now)
  const categories = [
    { id: 1, name: 'Pop', icon: '🎵' },
    { id: 2, name: 'Rock', icon: '🎸' },
    { id: 3, name: 'Hip Hop', icon: '🎤' },
    { id: 4, name: 'Electronic', icon: '🎧' },
    { id: 5, name: 'Jazz', icon: '🎷' },
    { id: 6, name: 'Classical', icon: '🎻' }
  ]

  useEffect(() => {
    const fetchSpotifyData = async () => {
      try {
        console.log('Starting to fetch Spotify data...');
        
        // Fetch trending albums from our backend
        console.log('Fetching trending albums from:', 'http://localhost:5001/api/spotify/trending');
        const trendingResponse = await fetch('http://localhost:5001/api/spotify/trending');
        console.log('Trending response status:', trendingResponse.status);
        
        if (!trendingResponse.ok) {
          const errorText = await trendingResponse.text();
          console.error('Trending response error:', errorText);
          throw new Error(`Failed to fetch trending albums: ${trendingResponse.status} ${errorText}`);
        }
        
        const trendingData = await trendingResponse.json();
        console.log('Trending data received:', trendingData);

        // Process and format the data
        console.log('Processing trending albums...');
        const formattedTrending = trendingData.map(album => ({
          id: album.id,
          title: album.title,
          artist: album.artist,
          cover: album.cover,
          rating: (Math.random() * (5 - 4) + 4).toFixed(1) // Mock rating for now
        }));
        console.log('Formatted trending albums:', formattedTrending);

        setTrendingAlbums(formattedTrending);
        setLoading(false);
        console.log('Data successfully loaded and state updated');
      } catch (err) {
        console.error('Detailed error:', err);
        setError(`Failed to fetch music data: ${err.message}`);
        setLoading(false);
      }
    };

    fetchSpotifyData();
  }, []);

  const handleGenreClick = async (genre) => {
    try {
      setLoading(true);
      setSelectedGenre(genre);
      console.log(`Fetching albums for genre: ${genre}`);
      
      const response = await fetch(`http://localhost:5001/api/spotify/genre/${genre}`);
      console.log('Genre response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Genre response error:', errorText);
        throw new Error(`Failed to fetch genre albums: ${response.status} ${errorText}`);
      }
      
      const data = await response.json();
      console.log('Genre data received:', data);

      const formattedAlbums = data.map(album => ({
        id: album.id,
        title: album.title,
        artist: album.artist,
        cover: album.cover,
        rating: (Math.random() * (5 - 4) + 4).toFixed(1)
      }));
      
      setFilteredAlbums(formattedAlbums);
      setLoading(false);
    } catch (err) {
      console.error('Detailed error:', err);
      setError(`Failed to fetch genre albums: ${err.message}`);
      setLoading(false);
    }
  };

  const handleViewTracks = async (album) => {
    try {
      setLoading(true);
      setSelectedAlbum(album);
      console.log(`Fetching tracks for album: ${album.id}`);
      
      const response = await fetch(`http://localhost:5001/api/spotify/album/${album.id}/tracks`);
      console.log('Tracks response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Tracks response error:', errorText);
        throw new Error(`Failed to fetch album tracks: ${response.status} ${errorText}`);
      }
      
      const data = await response.json();
      console.log('Tracks data received:', data);
      
      setAlbumTracks(data);
      setShowTracks(true);
      setLoading(false);
    } catch (err) {
      console.error('Detailed error:', err);
      setError(`Failed to fetch album tracks: ${err.message}`);
      setLoading(false);
    }
  };

  const handleViewReviews = (album) => {
    // For now, we'll just show a message that reviews are coming soon
    alert('Reviews feature coming soon!');
  };

  if (loading) {
    return (
      <div className="discover-page">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="discover-page">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="discover-page">
      <section className="discover-hero">
        <h1>Discover New Music</h1>
        <p>Explore different genres and trending albums</p>
      </section>

      <section className="categories-section">
        <h2>Browse Categories</h2>
        <div className="categories-grid">
          {categories.map(category => (
            <div 
              key={category.id} 
              className={`category-card ${selectedGenre === category.name ? 'selected' : ''}`}
              onClick={() => handleGenreClick(category.name)}
            >
              <span className="category-icon">{category.icon}</span>
              <h3>{category.name}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="trending-section">
        <h2>{selectedGenre ? `${selectedGenre} Albums` : 'Trending Now'}</h2>
        <div className="albums-grid">
          {(selectedGenre ? filteredAlbums : trendingAlbums).map(album => (
            <div key={album.id} className="album-card">
              <img src={album.cover} alt={album.title} />
              <div className="album-info">
                <h3>{album.title}</h3>
                <p>{album.artist}</p>
                <div className="rating">★ {album.rating}</div>
                <div className="album-actions">
                  <button 
                    className="action-btn tracks-btn"
                    onClick={() => handleViewTracks(album)}
                  >
                    View Tracks
                  </button>
                  <button 
                    className="action-btn reviews-btn"
                    onClick={() => handleViewReviews(album)}
                  >
                    View Reviews
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {showTracks && selectedAlbum && (
        <div className="tracks-modal">
          <div className="tracks-modal-content">
            <div className="tracks-modal-header">
              <h2>{selectedAlbum.title} - Tracks</h2>
              <button 
                className="close-btn"
                onClick={() => setShowTracks(false)}
              >
                ×
              </button>
            </div>
            <div className="tracks-list">
              {albumTracks.map(track => (
                <div key={track.id} className="track-item">
                  <span className="track-number">{track.track_number}</span>
                  <span className="track-name">{track.name}</span>
                  <span className="track-artists">{track.artists.join(', ')}</span>
                  <span className="track-duration">
                    {Math.floor(track.duration_ms / 60000)}:{(track.duration_ms % 60000 / 1000).toFixed(0).padStart(2, '0')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Discover; 