import React, { useState, useEffect, useRef } from 'react';
import '../styles/components/SearchBar.css';

const SearchBar = ({ onSearchResult }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [albums, setAlbums] = useState([]);
  const searchRef = useRef(null);
  
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
    // Close results when clicking outside
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setShowResults(true);
    
    try {
      // Parsing @album syntax
      const albumMatch = query.match(/@album\s+(.*)/i);
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
          album.name.toLowerCase().includes(query.toLowerCase()) || 
          album.artist.toLowerCase().includes(query.toLowerCase())
        );
      }
      
      // Limit results to maximum 10 for better UI
      searchResults = searchResults.slice(0, 10);
      
      // Format the results
      const formattedResults = searchResults.map(album => ({
        id: album.id,
        name: album.name,
        artist: album.artist,
        type: 'album',
        cover: album.cover,
        rating: album.rating,
        year: album.year,
        searchQuery: query
      }));
      
      setResults(formattedResults);
      
      // Pass results to parent component if needed
      if (onSearchResult && formattedResults.length > 0) {
        onSearchResult(formattedResults);
      }
    } catch (error) {
      console.error('Search failed:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleResultClick = (item) => {
    // Just close the results for presentation
    console.log('Selected item:', item);
    setShowResults(false);
  };

  return (
    <div className="search-container" ref={searchRef}>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search albums or artists..."
          className="search-input"
          onClick={() => query.trim() && setShowResults(true)}
        />
        <button type="submit" className="search-button" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {showResults && results.length > 0 && (
        <div className="search-results">
          {results.map((item) => (
            <div 
              key={item.id} 
              className="result-item"
              onClick={() => handleResultClick(item)}
            >
              <img 
                src={item.cover || 'https://via.placeholder.com/64x64?text=No+Image'} 
                alt={item.name}
                className="result-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/64x64?text=No+Image';
                }}
              />
              <div className="result-info">
                <h3>{item.name}</h3>
                <p>{item.artist} ({item.year})</p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {showResults && query.trim() && results.length === 0 && !loading && (
        <div className="search-results">
          <div className="no-results">No results found</div>
        </div>
      )}
    </div>
  );
};

export default SearchBar; 