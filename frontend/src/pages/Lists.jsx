import React, { useState, useEffect } from 'react'
import '../styles/pages/Lists.css'

function Lists() {
  const [lists, setLists] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showNewListForm, setShowNewListForm] = useState(false)
  const [newList, setNewList] = useState({
    name: '',
    description: '',
    albums: []
  })
  const [selectedList, setSelectedList] = useState(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editedList, setEditedList] = useState(null)
  const [showAddAlbumModal, setShowAddAlbumModal] = useState(false)
  const [availableAlbums, setAvailableAlbums] = useState([])
  const [albumSearchQuery, setAlbumSearchQuery] = useState('')
  const [filteredAlbums, setFilteredAlbums] = useState([])
  const [isLoadingAlbums, setIsLoadingAlbums] = useState(false)

  useEffect(() => {
    // Mock data for now - would be replaced with actual API call
    const mockLists = [
      {
        id: 1,
        name: "All-time Favorites",
        description: "My favorite albums that I keep coming back to",
        albums: [
          { id: 1, title: "Favorite Worst Nightmare", artist: "Arctic Monkeys", cover: "https://i.scdn.co/image/ab67616d0000b273b1f8da74f225fa1225cdface" },
          { id: 2, title: "To Pimp A Butterfly", artist: "Kendrick Lamar", cover: "https://i.scdn.co/image/ab67616d0000b273cdb645498cd3d8a2db4d05e1" },
          { id: 3, title: "Blonde", artist: "Frank Ocean", cover: "https://i.scdn.co/image/ab67616d0000b273c5649add07ed3720be9d5526" }
        ]
      },
      {
        id: 2,
        name: "Chill Vibes",
        description: "Perfect for relaxing evenings",
        albums: [
          { id: 4, title: "Currents", artist: "Tame Impala", cover: "https://i.scdn.co/image/ab67616d0000b2739e1cfc756886ac782e363d79" },
          { id: 5, title: "Blonde", artist: "Frank Ocean", cover: "https://i.scdn.co/image/ab67616d0000b273c5649add07ed3720be9d5526" },
          { id: 6, title: "Moon Safari", artist: "Air", cover: "https://i.scdn.co/image/ab67616d0000b273f8d38e32b86acfa30d597f6d" },
          { id: 7, title: "Malibu", artist: "Anderson .Paak", cover: "https://i.scdn.co/image/ab67616d0000b2738a31ab7a5d6f7c21b501ab45" }
        ]
      },
      {
        id: 3,
        name: "Workout Mix",
        description: "High energy tracks to keep you motivated",
        albums: [
          { id: 8, title: "After Hours", artist: "The Weeknd", cover: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36" },
          { id: 9, title: "Future Nostalgia", artist: "Dua Lipa", cover: "https://i.scdn.co/image/ab67616d0000b2734c79d5ec52a6d0302f3add25" },
          { id: 10, title: "Astroworld", artist: "Travis Scott", cover: "https://i.scdn.co/image/ab67616d0000b273072e9faef2ef7b6db63834a3" }
        ]
      },
      {
        id: 4,
        name: "Indie Discoveries",
        description: "Lesser-known gems from independent artists",
        albums: [
          { id: 11, title: "Carrie & Lowell", artist: "Sufjan Stevens", cover: "https://i.scdn.co/image/ab67616d0000b273cf72c1f514013fedb574eef9" },
          { id: 12, title: "The Glow Pt. 2", artist: "The Microphones", cover: "https://i.scdn.co/image/ab67616d0000b273049fea2e76e294385012d148" }
        ]
      }
    ]
    
    // Simulate API delay
    setTimeout(() => {
      setLists(mockLists)
      setLoading(false)
    }, 800)

    // Load albums from CSV file
    loadAlbumsFromCSV();
  }, [])

  useEffect(() => {
    if (albumSearchQuery.trim() === '') {
      setFilteredAlbums(availableAlbums.slice(0, 20)); // Show first 20 albums when no search
    } else {
      const filtered = availableAlbums.filter(
        album => 
          album.title.toLowerCase().includes(albumSearchQuery.toLowerCase()) || 
          album.artist.toLowerCase().includes(albumSearchQuery.toLowerCase())
      );
      setFilteredAlbums(filtered.slice(0, 20)); // Limit to 20 results
    }
  }, [albumSearchQuery, availableAlbums]);

  const loadAlbumsFromCSV = () => {
    setIsLoadingAlbums(true);
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
                id: `csv-${index + 1}`,
                title: title.trim(),
                artist: artist.trim(),
                year: year,
                // Generate placeholder images for albums
                cover: `https://picsum.photos/seed/${artist.replace(/\s+/g, '')}${index}/300/300`
              };
            }
            return null;
          })
          .filter(album => album !== null);
        
        setAvailableAlbums(albumsData);
        setFilteredAlbums(albumsData.slice(0, 20)); // Show first 20 by default
      })
      .catch(error => {
        console.error('Error loading albums:', error);
        setError('Failed to load albums. Please try again later.');
      })
      .finally(() => {
        setIsLoadingAlbums(false);
      });
  };

  const handleAddAlbumToList = (album) => {
    if (editedList) {
      // Check if album is already in the list
      const isAlbumInList = editedList.albums.some(a => a.id === album.id);
      
      if (!isAlbumInList) {
        const updatedAlbums = [...editedList.albums, album];
        setEditedList({...editedList, albums: updatedAlbums});
      }
    }
    
    setShowAddAlbumModal(false);
  };

  const handleSubmitList = (e) => {
    e.preventDefault()
    // Create a new list with mock ID
    const newListWithId = {
      ...newList,
      id: Date.now(), // temporary ID
      albums: []
    }
    
    setLists([...lists, newListWithId])
    setShowNewListForm(false)
    setNewList({
      name: '',
      description: '',
      albums: []
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewList(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleEditInputChange = (e) => {
    const { name, value } = e.target
    setEditedList(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleViewDetails = (list) => {
    setSelectedList(list)
    setShowDetailsModal(true)
  }

  const handleEditList = (list) => {
    setEditedList({...list})
    setShowEditModal(true)
  }

  const handleSaveEdit = (e) => {
    e.preventDefault()
    
    // Update the list in state
    const updatedLists = lists.map(list => 
      list.id === editedList.id ? editedList : list
    )
    
    setLists(updatedLists)
    setShowEditModal(false)
    setEditedList(null)
  }

  const openAddAlbumModal = () => {
    setAlbumSearchQuery('');
    setFilteredAlbums(availableAlbums.slice(0, 20)); // Reset to first 20 albums
    setShowAddAlbumModal(true);
  };

  if (loading) {
    return (
      <div className="lists-page loading-state">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading your lists...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return <div className="lists-page error">{error}</div>
  }

  return (
    <div className="lists-page">
      <section className="lists-header">
        <h1>Your Music Lists</h1>
        <button 
          className="new-list-btn"
          onClick={() => setShowNewListForm(!showNewListForm)}
        >
          {showNewListForm ? 'Cancel' : 'Create New List'}
        </button>
      </section>

      {showNewListForm && (
        <section className="new-list-form">
          <h2>Create a New List</h2>
          <form onSubmit={handleSubmitList}>
            <div className="form-group">
              <label htmlFor="name">List Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newList.name}
                onChange={handleInputChange}
                required
                placeholder="Give your list a name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={newList.description}
                onChange={handleInputChange}
                required
                placeholder="What's this list about?"
              />
            </div>

            <button type="submit" className="submit-btn">Create List</button>
          </form>
        </section>
      )}

      <section className="lists-collection">
        <h2>Your Lists</h2>
        <div className="lists-grid">
          {lists.map(list => (
            <div key={list.id} className="list-card">
              <div className="list-card-header">
                <h3>{list.name}</h3>
                <span className="album-count">{list.albums.length} albums</span>
              </div>
              <p className="list-description">{list.description}</p>
              
              <div className="list-album-covers">
                {list.albums.slice(0, 3).map((album, index) => (
                  <div 
                    key={album.id} 
                    className="album-cover-thumbnail"
                    style={{ zIndex: 3 - index, transform: `translateX(${index * 10}px)` }}
                  >
                    <img 
                      src={album.cover || "https://via.placeholder.com/300x300?text=No+Image"} 
                      alt={album.title} 
                      title={`${album.title} by ${album.artist}`}
                    />
                  </div>
                ))}
                {list.albums.length > 3 && (
                  <div className="more-albums" style={{ zIndex: 0, transform: `translateX(${3 * 10}px)` }}>
                    +{list.albums.length - 3}
                  </div>
                )}
              </div>
              
              <div className="list-actions">
                <button 
                  className="view-list-btn" 
                  onClick={() => handleViewDetails(list)}
                >
                  View Details
                </button>
                <button 
                  className="edit-list-btn"
                  onClick={() => handleEditList(list)}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Details Modal */}
      {showDetailsModal && selectedList && (
        <div className="list-modal details-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{selectedList.name} - Details</h2>
              <button 
                className="close-btn"
                onClick={() => setShowDetailsModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <p className="list-description">{selectedList.description}</p>
              <h3>Albums in this list</h3>
              <div className="list-albums-detail">
                {selectedList.albums.map(album => (
                  <div key={album.id} className="album-list-item">
                    <img src={album.cover} alt={album.title} />
                    <div className="album-list-info">
                      <h4>{album.title}</h4>
                      <p>{album.artist}</p>
                    </div>
                  </div>
                ))}
                {selectedList.albums.length === 0 && (
                  <p className="empty-list-message">This list has no albums yet. Click "Edit" to add some!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Edit Modal */}
      {showEditModal && editedList && (
        <div className="list-modal edit-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Edit List</h2>
              <button 
                className="close-btn"
                onClick={() => setShowEditModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSaveEdit}>
                <div className="form-group">
                  <label htmlFor="edit-name">List Name</label>
                  <input
                    type="text"
                    id="edit-name"
                    name="name"
                    value={editedList.name}
                    onChange={handleEditInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="edit-description">Description</label>
                  <textarea
                    id="edit-description"
                    name="description"
                    value={editedList.description}
                    onChange={handleEditInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Albums</label>
                  <button 
                    type="button" 
                    className="add-album-btn"
                    onClick={openAddAlbumModal}
                  >
                    + Add Album
                  </button>
                  <div className="edit-albums-list">
                    {editedList.albums.map((album, index) => (
                      <div key={album.id} className="edit-album-item">
                        <img src={album.cover} alt={album.title} />
                        <div className="album-info">
                          <h4>{album.title}</h4>
                          <p>{album.artist}</p>
                          {album.year && <p className="album-year">({album.year})</p>}
                        </div>
                        <button 
                          type="button" 
                          className="remove-album-btn"
                          onClick={() => {
                            const updatedAlbums = [...editedList.albums];
                            updatedAlbums.splice(index, 1);
                            setEditedList({...editedList, albums: updatedAlbums});
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    {editedList.albums.length === 0 && (
                      <p className="empty-albums-message">No albums in this list yet.</p>
                    )}
                  </div>
                </div>
                
                <div className="form-actions">
                  <button type="submit" className="save-btn">Save Changes</button>
                  <button 
                    type="button" 
                    className="cancel-btn"
                    onClick={() => setShowEditModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Add Album Modal */}
      {showAddAlbumModal && (
        <div className="list-modal add-album-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Add Album to List</h2>
              <button 
                className="close-btn"
                onClick={() => setShowAddAlbumModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="album-search">
                <input
                  type="text"
                  placeholder="Search for albums or artists..."
                  value={albumSearchQuery}
                  onChange={(e) => setAlbumSearchQuery(e.target.value)}
                  className="album-search-input"
                />
              </div>
              
              <div className="albums-grid">
                {isLoadingAlbums ? (
                  <div className="loading-albums">Loading albums...</div>
                ) : (
                  filteredAlbums.map(album => (
                    <div 
                      key={album.id} 
                      className="album-search-item"
                      onClick={() => handleAddAlbumToList(album)}
                    >
                      <img 
                        src={album.cover} 
                        alt={album.title} 
                        className="album-cover"
                      />
                      <div className="album-info">
                        <h4>{album.title}</h4>
                        <p>{album.artist}</p>
                        <p className="album-year">{album.year}</p>
                      </div>
                    </div>
                  ))
                )}
                {!isLoadingAlbums && filteredAlbums.length === 0 && (
                  <div className="no-albums-found">No albums found matching your search.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Lists 