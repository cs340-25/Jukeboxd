import pytest
from unittest.mock import patch
from backend.models.user import User  # Update these
from backend.models.review import Review  # imports
from backend.app import db

def test_create_review(client, mock_spotify_response):
    # Create a test user
    with client.application.app_context():
        user = User(
            spotify_id='test_id',
            email='test@example.com',
            username='testuser',
            spotify_access_token='fake_token'
        )
        db.session.add(user)
        db.session.commit()
        
        # Mock login
        with client.session_transaction() as session:
            session['user_id'] = user.id
        
        # Mock the Spotify service
        with patch('services.spotify.SpotifyService.get_track') as mock_get_track:
            mock_get_track.return_value = mock_spotify_response
            
            # Test creating a review
            response = client.post('/reviews/', json={
                'track_id': 'spotify:track:123',
                'rating': 5,
                'content': 'Great song!'
            })
            
            assert response.status_code == 201
            assert response.json['rating'] == 5
            assert response.json['content'] == 'Great song!'

def test_get_reviews(client):
    # Create a test user and some reviews
    with client.application.app_context():
        user = User(
            spotify_id='test_id',
            email='test@example.com',
            username='testuser'
        )
        db.session.add(user)
        
        review = Review(
            user_id=user.id,
            track_id='spotify:track:123',
            rating=5,
            content='Test review',
            track_name='Test Track',
            artist_name='Test Artist',
            album_name='Test Album'
        )
        db.session.add(review)
        db.session.commit()
        
        # Test getting reviews
        response = client.get('/reviews/')
        
        assert response.status_code == 200
        assert len(response.json['reviews']) == 1
        assert response.json['reviews'][0]['rating'] == 5
        assert response.json['reviews'][0]['content'] == 'Test review' 