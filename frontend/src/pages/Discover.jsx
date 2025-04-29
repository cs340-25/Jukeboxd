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

  // Mock data for categories
  const categories = [
    { id: 1, name: 'Pop', icon: '🎵' },
    { id: 2, name: 'Rock', icon: '🎸' },
    { id: 3, name: 'Hip Hop', icon: '🎤' },
    { id: 4, name: 'Electronic', icon: '🎧' },
    { id: 5, name: 'Jazz', icon: '🎷' },
    { id: 6, name: 'Classical', icon: '🎻' }
  ]

  // Mock data for trending albums (50 albums)
  const mockTrendingAlbums = [
    {
      id: '1',
      title: 'After Hours',
      artist: 'The Weeknd',
      cover: 'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36',
      rating: '4.8'
    },
    {
      id: '2',
      title: 'Future Nostalgia',
      artist: 'Dua Lipa',
      cover: 'https://i.scdn.co/image/ab67616d0000b2734c79d5ec52a6d0302f3add25',
      rating: '4.7'
    },
    {
      id: '3',
      title: 'Circles',
      artist: 'Mac Miller',
      cover: 'https://i.scdn.co/image/ab67616d0000b273e6f407c7f3a0ec98845e4431',
      rating: '4.9'
    },
    {
      id: '4',
      title: 'Folklore',
      artist: 'Taylor Swift',
      cover: 'https://i.scdn.co/image/ab67616d0000b273c288028c2592f400dd0b9233',
      rating: '4.6'
    },
    {
      id: '5',
      title: 'Chromatica',
      artist: 'Lady Gaga',
      cover: 'https://i.scdn.co/image/ab67616d0000b2736040effce5fa55ca96bbd5c7',
      rating: '4.5'
    },
    {
      id: '6',
      title: 'Happier Than Ever',
      artist: 'Billie Eilish',
      cover: 'https://i.scdn.co/image/ab67616d0000b2732a038d3bf875d23e4aeaa84e',
      rating: '4.7'
    },
    {
      id: '7',
      title: 'Planet Her',
      artist: 'Doja Cat',
      cover: 'https://i.scdn.co/image/ab67616d0000b2734df3245f21ad749bb5c8be51',
      rating: '4.6'
    },
    {
      id: '8',
      title: 'Positions',
      artist: 'Ariana Grande',
      cover: 'https://i.scdn.co/image/ab67616d0000b2736a0147c62ae64201fd182f61',
      rating: '4.5'
    },
    {
      id: '9',
      title: 'Medicine at Midnight',
      artist: 'Foo Fighters',
      cover: 'https://i.scdn.co/image/ab67616d0000b273a9858e2bbc8fc6230c8190b3',
      rating: '4.4'
    },
    {
      id: '10',
      title: 'Power Up',
      artist: 'AC/DC',
      cover: 'https://i.scdn.co/image/ab67616d0000b273da3d6a246fdc4a779acbe7a1',
      rating: '4.6'
    },
    {
      id: '11',
      title: 'To Pimp A Butterfly',
      artist: 'Kendrick Lamar',
      cover: 'https://i.scdn.co/image/ab67616d0000b273cdb645498cd3d8a2db4d05e1',
      rating: '4.9'
    },
    {
      id: '12',
      title: 'My Beautiful Dark Twisted Fantasy',
      artist: 'Kanye West',
      cover: 'https://i.scdn.co/image/ab67616d0000b273d9194aa18fa4c9362b47464f',
      rating: '4.8'
    },
    {
      id: '13',
      title: 'Random Access Memories',
      artist: 'Daft Punk',
      cover: 'https://i.scdn.co/image/ab67616d0000b273b1f8da74f225fa1225cdface',
      rating: '4.9'
    },
    {
      id: '14',
      title: 'Hyperspace',
      artist: 'Beck',
      cover: 'https://i.scdn.co/image/ab67616d0000b2736ad3c9464113a56438f33235',
      rating: '4.3'
    },
    {
      id: '15',
      title: 'Kind of Blue',
      artist: 'Miles Davis',
      cover: 'https://i.scdn.co/image/ab67616d0000b27349fcb3263bba74e126c07476',
      rating: '4.9'
    },
    {
      id: '16',
      title: 'A Love Supreme',
      artist: 'John Coltrane',
      cover: 'https://i.scdn.co/image/ab67616d0000b2737de21b15df26d3f02b0b9e9c',
      rating: '4.8'
    },
    {
      id: '17',
      title: 'Ludovico Einaudi: Essential Collection',
      artist: 'Ludovico Einaudi',
      cover: 'https://i.scdn.co/image/ab67616d0000b2732e263b9f204a9ea0b58a9dbc',
      rating: '4.7'
    },
    {
      id: '18',
      title: 'Chopin: Nocturnes',
      artist: 'Arthur Rubinstein',
      cover: 'https://i.scdn.co/image/ab67616d0000b273d3702f10fdb9644ef3fdec63',
      rating: '4.8'
    },
    {
      id: '19',
      title: 'DAMN.',
      artist: 'Kendrick Lamar',
      cover: 'https://i.scdn.co/image/ab67616d0000b273d28d2ebdeab676ef8cd2bf4d',
      rating: '4.8'
    },
    {
      id: '20',
      title: 'Eternal Atake',
      artist: 'Lil Uzi Vert',
      cover: 'https://i.scdn.co/image/ab67616d0000b273c065c5dbd9b293d8f2e64448',
      rating: '4.5'
    },
    {
      id: '21',
      title: 'When We All Fall Asleep, Where Do We Go?',
      artist: 'Billie Eilish',
      cover: 'https://i.scdn.co/image/ab67616d0000b2734c516975eb0eba59bc539b4a',
      rating: '4.7'
    },
    {
      id: '22',
      title: 'Dawn FM',
      artist: 'The Weeknd',
      cover: 'https://i.scdn.co/image/ab67616d0000b2734ab2520c2c77a1d66b9ee21d',
      rating: '4.6'
    },
    {
      id: '23',
      title: 'Happier Than Ever',
      artist: 'Billie Eilish',
      cover: 'https://i.scdn.co/image/ab67616d0000b273c2ad3f5c8c519b64ccc0b7b1',
      rating: '4.5'
    },
    {
      id: '24',
      title: 'Rumours',
      artist: 'Fleetwood Mac',
      cover: 'https://i.scdn.co/image/ab67616d0000b273e52a59a28efa4d2a492cb460',
      rating: '4.9'
    },
    {
      id: '25',
      title: 'Thriller',
      artist: 'Michael Jackson',
      cover: 'https://i.scdn.co/image/ab67616d0000b273829232da38cd3fd8006e9c9c',
      rating: '5.0'
    },
    {
      id: '26',
      title: 'The Dark Side of the Moon',
      artist: 'Pink Floyd',
      cover: 'https://i.scdn.co/image/ab67616d0000b2731a6194c50d47b7a7e7d7e1d6',
      rating: '4.9'
    },
    {
      id: '27',
      title: 'Abbey Road',
      artist: 'The Beatles',
      cover: 'https://i.scdn.co/image/ab67616d0000b27328b8b9b46428896e6491e97a',
      rating: '5.0'
    },
    {
      id: '28',
      title: 'Back to Black',
      artist: 'Amy Winehouse',
      cover: 'https://i.scdn.co/image/ab67616d0000b273de905ac87f39b3e95efa378e',
      rating: '4.8'
    },
    {
      id: '29',
      title: 'Nevermind',
      artist: 'Nirvana',
      cover: 'https://i.scdn.co/image/ab67616d0000b273c4f52ef8ca1236b9341cd507',
      rating: '4.9'
    },
    {
      id: '30',
      title: 'OK Computer',
      artist: 'Radiohead',
      cover: 'https://i.scdn.co/image/ab67616d0000b273c8b444df094279e70d0ed856',
      rating: '4.9'
    },
    {
      id: '31',
      title: 'The Miseducation of Lauryn Hill',
      artist: 'Lauryn Hill',
      cover: 'https://i.scdn.co/image/ab67616d0000b2732741e0d149a0a6e900f94a98',
      rating: '4.8'
    },
    {
      id: '32',
      title: 'Good Kid, M.A.A.D City',
      artist: 'Kendrick Lamar',
      cover: 'https://i.scdn.co/image/ab67616d0000b2736c15113e9b8d07f58235bd4a',
      rating: '4.8'
    },
    {
      id: '33',
      title: 'Igor',
      artist: 'Tyler, The Creator',
      cover: 'https://i.scdn.co/image/ab67616d0000b273b1c4b76e23414c9f20242268',
      rating: '4.7'
    },
    {
      id: '34',
      title: 'Blonde',
      artist: 'Frank Ocean',
      cover: 'https://i.scdn.co/image/ab67616d0000b273c5649add07ed3720be9d5526',
      rating: '4.8'
    },
    {
      id: '35',
      title: 'In Rainbows',
      artist: 'Radiohead',
      cover: 'https://i.scdn.co/image/ab67616d0000b273ee3c40f9e2e4d9f764f57b8e',
      rating: '4.8'
    },
    {
      id: '36',
      title: 'Channel Orange',
      artist: 'Frank Ocean',
      cover: 'https://i.scdn.co/image/ab67616d0000b273490f0b40a2b897d787d12fae',
      rating: '4.7'
    },
    {
      id: '37',
      title: 'AM',
      artist: 'Arctic Monkeys',
      cover: 'https://i.scdn.co/image/ab67616d0000b273f05e5ac32fdd79d100315a20',
      rating: '4.6'
    },
    {
      id: '38',
      title: 'Lemonade',
      artist: 'Beyoncé',
      cover: 'https://i.scdn.co/image/ab67616d0000b273e13de7b8662b085ee5a5e5a5',
      rating: '4.8'
    },
    {
      id: '39',
      title: 'Melodrama',
      artist: 'Lorde',
      cover: 'https://i.scdn.co/image/ab67616d0000b2735a7c3139ae13a2775d8f163c',
      rating: '4.7'
    },
    {
      id: '40',
      title: 'Norman Fucking Rockwell!',
      artist: 'Lana Del Rey',
      cover: 'https://i.scdn.co/image/ab67616d0000b273879e9318cb9f4e05ee552ac9',
      rating: '4.7'
    },
    {
      id: '41',
      title: 'Swimming',
      artist: 'Mac Miller',
      cover: 'https://i.scdn.co/image/ab67616d0000b273175c577a61aa13d4fb4b6534',
      rating: '4.7'
    },
    {
      id: '42',
      title: 'The Slow Rush',
      artist: 'Tame Impala',
      cover: 'https://i.scdn.co/image/ab67616d0000b273e2f039481babe23658fc719a',
      rating: '4.5'
    },
    {
      id: '43',
      title: 'Currents',
      artist: 'Tame Impala',
      cover: 'https://i.scdn.co/image/ab67616d0000b2739e1cfc756886ac782e363d79',
      rating: '4.7'
    },
    {
      id: '44',
      title: 'Flower Boy',
      artist: 'Tyler, The Creator',
      cover: 'https://i.scdn.co/image/ab67616d0000b273e6695dfc8fcc3f10a6710c38',
      rating: '4.6'
    },
    {
      id: '45',
      title: 'Golden Hour',
      artist: 'Kacey Musgraves',
      cover: 'https://i.scdn.co/image/ab67616d0000b273332d85510aba3eb28312cfdf',
      rating: '4.5'
    },
    {
      id: '46',
      title: 'Wasteland, Baby!',
      artist: 'Hozier',
      cover: 'https://i.scdn.co/image/ab67616d0000b273be6a301bc14f7e8da0b109a8',
      rating: '4.4'
    },
    {
      id: '47',
      title: 'Titanic Rising',
      artist: 'Weyes Blood',
      cover: 'https://i.scdn.co/image/ab67616d0000b2738d5f2f248c526ffba9a9f791',
      rating: '4.6'
    },
    {
      id: '48',
      title: 'Punisher',
      artist: 'Phoebe Bridgers',
      cover: 'https://i.scdn.co/image/ab67616d0000b273a91b75c9ef65ed8d760ff600',
      rating: '4.5'
    },
    {
      id: '49',
      title: 'Fetch the Bolt Cutters',
      artist: 'Fiona Apple',
      cover: 'https://i.scdn.co/image/ab67616d0000b273e2671c529f8c1dc2e30ea657',
      rating: '4.8'
    },
    {
      id: '50',
      title: 'Remind Me Tomorrow',
      artist: 'Sharon Van Etten',
      cover: 'https://i.scdn.co/image/ab67616d0000b273f56dfe42257e49eeb46eac0c',
      rating: '4.5'
    }
  ]

  // Mock genre albums data by category
  const mockGenreAlbums = {
    'Pop': [
      {
        id: '7',
        title: 'Planet Her',
        artist: 'Doja Cat',
        cover: 'https://i.scdn.co/image/ab67616d0000b2734df3245f21ad749bb5c8be51',
        rating: '4.6'
      },
      {
        id: '8',
        title: 'Positions',
        artist: 'Ariana Grande',
        cover: 'https://i.scdn.co/image/ab67616d0000b2736a0147c62ae64201fd182f61',
        rating: '4.5'
      },
      {
        id: '2',
        title: 'Future Nostalgia',
        artist: 'Dua Lipa',
        cover: 'https://i.scdn.co/image/ab67616d0000b2734c79d5ec52a6d0302f3add25',
        rating: '4.7'
      }
    ],
    'Rock': [
      {
        id: '9',
        title: 'Medicine at Midnight',
        artist: 'Foo Fighters',
        cover: 'https://i.scdn.co/image/ab67616d0000b273a9858e2bbc8fc6230c8190b3',
        rating: '4.4'
      },
      {
        id: '10',
        title: 'Power Up',
        artist: 'AC/DC',
        cover: 'https://i.scdn.co/image/ab67616d0000b273da3d6a246fdc4a779acbe7a1',
        rating: '4.6'
      }
    ],
    'Hip Hop': [
      {
        id: '11',
        title: 'To Pimp A Butterfly',
        artist: 'Kendrick Lamar',
        cover: 'https://i.scdn.co/image/ab67616d0000b273cdb645498cd3d8a2db4d05e1',
        rating: '4.9'
      },
      {
        id: '12',
        title: 'My Beautiful Dark Twisted Fantasy',
        artist: 'Kanye West',
        cover: 'https://i.scdn.co/image/ab67616d0000b273d9194aa18fa4c9362b47464f',
        rating: '4.8'
      }
    ],
    'Electronic': [
      {
        id: '13',
        title: 'Random Access Memories',
        artist: 'Daft Punk',
        cover: 'https://i.scdn.co/image/ab67616d0000b273b1f8da74f225fa1225cdface',
        rating: '4.9'
      },
      {
        id: '14',
        title: 'Hyperspace',
        artist: 'Beck',
        cover: 'https://i.scdn.co/image/ab67616d0000b2736ad3c9464113a56438f33235',
        rating: '4.3'
      }
    ],
    'Jazz': [
      {
        id: '15',
        title: 'Kind of Blue',
        artist: 'Miles Davis',
        cover: 'https://i.scdn.co/image/ab67616d0000b27349fcb3263bba74e126c07476',
        rating: '4.9'
      },
      {
        id: '16',
        title: 'A Love Supreme',
        artist: 'John Coltrane',
        cover: 'https://i.scdn.co/image/ab67616d0000b2737de21b15df26d3f02b0b9e9c',
        rating: '4.8'
      }
    ],
    'Classical': [
      {
        id: '17',
        title: 'Ludovico Einaudi: Essential Collection',
        artist: 'Ludovico Einaudi',
        cover: 'https://i.scdn.co/image/ab67616d0000b2732e263b9f204a9ea0b58a9dbc',
        rating: '4.7'
      },
      {
        id: '18',
        title: 'Chopin: Nocturnes',
        artist: 'Arthur Rubinstein',
        cover: 'https://i.scdn.co/image/ab67616d0000b273d3702f10fdb9644ef3fdec63',
        rating: '4.8'
      }
    ]
  }

  // Mock tracks data for each album
  const mockTracks = {
    '1': [
      { id: '101', track_number: 1, name: 'Alone Again', artists: ['The Weeknd'], duration_ms: 240000 },
      { id: '102', track_number: 2, name: 'Too Late', artists: ['The Weeknd'], duration_ms: 214000 },
      { id: '103', track_number: 3, name: 'Hardest To Love', artists: ['The Weeknd'], duration_ms: 239000 },
      { id: '104', track_number: 4, name: 'Scared To Live', artists: ['The Weeknd'], duration_ms: 226000 },
      { id: '105', track_number: 5, name: 'Snowchild', artists: ['The Weeknd'], duration_ms: 250000 },
      { id: '106', track_number: 6, name: 'Escape From LA', artists: ['The Weeknd'], duration_ms: 337000 },
      { id: '107', track_number: 7, name: 'Heartless', artists: ['The Weeknd'], duration_ms: 220000 },
      { id: '108', track_number: 8, name: 'Faith', artists: ['The Weeknd'], duration_ms: 282000 },
      { id: '109', track_number: 9, name: 'Blinding Lights', artists: ['The Weeknd'], duration_ms: 242000 },
      { id: '110', track_number: 10, name: 'In Your Eyes', artists: ['The Weeknd'], duration_ms: 237000 },
      { id: '111', track_number: 11, name: 'Save Your Tears', artists: ['The Weeknd'], duration_ms: 258000 },
      { id: '112', track_number: 12, name: 'Repeat After Me (Interlude)', artists: ['The Weeknd'], duration_ms: 197000 },
      { id: '113', track_number: 13, name: 'After Hours', artists: ['The Weeknd'], duration_ms: 362000 },
      { id: '114', track_number: 14, name: 'Until I Bleed Out', artists: ['The Weeknd'], duration_ms: 243000 }
    ],
    '2': [
      { id: '201', track_number: 1, name: 'Future Nostalgia', artists: ['Dua Lipa'], duration_ms: 187000 },
      { id: '202', track_number: 2, name: 'Don\'t Start Now', artists: ['Dua Lipa'], duration_ms: 183000 },
      { id: '203', track_number: 3, name: 'Cool', artists: ['Dua Lipa'], duration_ms: 197000 },
      { id: '204', track_number: 4, name: 'Physical', artists: ['Dua Lipa'], duration_ms: 182000 },
      { id: '205', track_number: 5, name: 'Levitating', artists: ['Dua Lipa'], duration_ms: 217000 },
      { id: '206', track_number: 6, name: 'Pretty Please', artists: ['Dua Lipa'], duration_ms: 218000 },
      { id: '207', track_number: 7, name: 'Hallucinate', artists: ['Dua Lipa'], duration_ms: 209000 },
      { id: '208', track_number: 8, name: 'Love Again', artists: ['Dua Lipa'], duration_ms: 226000 },
      { id: '209', track_number: 9, name: 'Break My Heart', artists: ['Dua Lipa'], duration_ms: 245000 },
      { id: '210', track_number: 10, name: 'Good In Bed', artists: ['Dua Lipa'], duration_ms: 231000 },
      { id: '211', track_number: 11, name: 'Boys Will Be Boys', artists: ['Dua Lipa'], duration_ms: 267000 }
    ]
  }

  useEffect(() => {
    // Simulate loading delay for better presentation
    const timer = setTimeout(() => {
      setTrendingAlbums(mockTrendingAlbums)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleGenreClick = (genre) => {
    setLoading(true)
    setSelectedGenre(genre)
    
    // Simulate API call delay
    setTimeout(() => {
      setFilteredAlbums(mockGenreAlbums[genre] || [])
      setLoading(false)
    }, 800)
  }

  const handleViewTracks = (album) => {
    setLoading(true)
    setSelectedAlbum(album)
    
    // Simulate API call delay
    setTimeout(() => {
      setAlbumTracks(mockTracks[album.id] || [])
      setShowTracks(true)
      setLoading(false)
    }, 600)
  }

  const handleViewReviews = (album) => {
    // For now, we'll just show a message that reviews are coming soon
    alert(`Reviews for "${album.title}" by ${album.artist} coming soon!`);
  }

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