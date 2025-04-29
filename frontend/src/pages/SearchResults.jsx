import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../styles/pages/SearchResults.css'

function SearchResults() {
  const location = useLocation()
  const navigate = useNavigate()
  const [results, setResults] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('albums')
  const [albums, setAlbums] = useState([])
  
  useEffect(() => {
    // Load albums from the CSV file
    fetch('/albums.csv')
      .then(response => response.text())
      .then(data => {
        // Parse CSV data
        const albumsData = data.split('\n')
          .filter(line => line.trim() !== '')
          .map((line, index) => {
            // Extract artist and album title from CSV format
            const match = line.match(/(.*) - (.*) \((\d{4})\)/);
            if (match) {
              const [, artist, title, year] = match;
              return {
                id: (index + 1).toString(),
                name: title.trim(),
                artist: artist.trim(),
                year: year,
                // Generate placeholder images for albums
                cover: `https://picsum.photos/seed/${artist.replace(/\s+/g, '')}${index}/300/300`,
                rating: (4 + Math.random() * 1).toFixed(1)
              };
            }
            return null;
          })
          .filter(album => album !== null);
        
        setAlbums(albumsData);
      })
      .catch(error => {
        console.error('Error loading albums:', error);
        // Fallback to empty array if loading fails
        setAlbums([]);
      });
  }, []);
  
  useEffect(() => {
    // Get search results from location state or URL parameters
    const searchParams = new URLSearchParams(location.search)
    const queryParam = searchParams.get('q')
    
    if (location.state?.results) {
      setResults(location.state.results)
      setQuery(location.state.query || queryParam || '')
    } else if (queryParam) {
      setQuery(queryParam)
      performSearch(queryParam)
    }
  }, [location, albums])
  
  const performSearch = async (searchQuery) => {
    if (!searchQuery.trim()) return
    
    setLoading(true)
    setError(null)
    
    try {
      // Parsing @album syntax
      const albumMatch = searchQuery.match(/@album\s+(.*)/i);
      let searchResults = [];
      
      if (albumMatch) {
        const albumName = albumMatch[1].trim();
        // Search in loaded albums
        searchResults = albums.filter(album => 
          album.name.toLowerCase().includes(albumName.toLowerCase())
        );
      } else {
        // If no @album syntax, search in both album name and artist
        searchResults = albums.filter(album => 
          album.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          album.artist.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      // Format the results
      const formattedResults = searchResults.map(album => ({
        id: album.id,
        name: album.name,
        artist: album.artist,
        type: 'album',
        cover: album.cover,
        rating: album.rating,
        year: album.year
      }));
      
      setResults(formattedResults);
    } catch (err) {
      console.error('Search failed:', err)
      setError('Failed to fetch search results. Please try again later.')
      setResults([])
    } finally {
      setLoading(false)
    }
  }
  
  const handleSearch = (e) => {
    e.preventDefault()
    
    // Update URL with search query
    navigate(`/search?q=${encodeURIComponent(query)}`, { replace: true })
    performSearch(query)
  }
  
  const handleViewAlbum = (album) => {
    // Just log the click for presentation purposes
    console.log('View album:', album)
  }
  
  if (loading) {
    return (
      <div className="search-results-page">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Searching...</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="search-results-page">
      <div className="search-results-header">
        <h1>Search Results</h1>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search albums or artists..."
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </div>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      <div className="search-tabs">
        <button 
          className={`tab-button ${activeTab === 'albums' ? 'active' : ''}`}
          onClick={() => setActiveTab('albums')}
        >
          Albums
        </button>
        <button 
          className={`tab-button ${activeTab === 'artists' ? 'active' : ''}`}
          onClick={() => setActiveTab('artists')}
          disabled
        >
          Artists
        </button>
        <button 
          className={`tab-button ${activeTab === 'tracks' ? 'active' : ''}`}
          onClick={() => setActiveTab('tracks')}
          disabled
        >
          Tracks
        </button>
      </div>
      
      {results.length > 0 ? (
        <div className="search-results-grid">
          {results.map(album => (
            <div 
              key={album.id} 
              className="album-card"
              onClick={() => handleViewAlbum(album)}
            >
              <div className="album-cover">
                <img 
                  src={album.cover || 'https://via.placeholder.com/174x174?text=No+Image'} 
                  alt={album.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/174x174?text=No+Image';
                  }}
                />
              </div>
              <div className="album-info">
                <h3>{album.name}</h3>
                <p>{album.artist} ({album.year})</p>
                {album.rating && <div className="album-rating">★ {album.rating}</div>}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-results">
          <p>No albums found matching your search.</p>
          <p>Try another search term or check your spelling.</p>
        </div>
      )}
    </div>
  )
}

export default SearchResults 