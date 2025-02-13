import pytest
from unittest.mock import patch

def test_spotify_login(client):
    mock_tokens = {
        'access_token': 'fake_access_token',
        'refresh_token': 'fake_refresh_token'
    }
    
    mock_user_data = {
        'id': 'spotify_user_id',
        'email': 'test@example.com',
        'display_name': 'Test User'
    }
    
    with patch('services.spotify.SpotifyService.get_tokens') as mock_get_tokens:
        with patch('services.spotify.SpotifyService.get_user_profile') as mock_get_profile:
            mock_get_tokens.return_value = mock_tokens
            mock_get_profile.return_value = mock_user_data
            
            response = client.post('/auth/login', json={'code': 'fake_code'})
            
            assert response.status_code == 200
            assert 'access_token' in response.json
            assert 'user' in response.json
            assert response.json['user']['email'] == 'test@example.com' 