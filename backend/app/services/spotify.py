from urllib.parse import urlencode
import requests
import os
from flask import current_app
from base64 import b64encode
from dotenv import load_dotenv

load_dotenv()

class SpotifyService:
    def __init__(self):
        self.client_id = os.getenv('SPOTIFY_CLIENT_ID')
        self.client_secret = os.getenv('SPOTIFY_CLIENT_SECRET')
        self.redirect_uri = 'http://localhost:5000/auth/callback'  # Update this for production
        self.auth_url = 'https://accounts.spotify.com/authorize'
        self.token_url = 'https://accounts.spotify.com/api/token'
        self.api_base_url = 'https://api.spotify.com/v1'
        self.access_token = self._get_access_token()

    def _get_access_token(self):
        """Get Spotify access token using client credentials flow"""
        auth_string = f"{self.client_id}:{self.client_secret}"
        auth_bytes = auth_string.encode('utf-8')
        auth_base64 = str(b64encode(auth_bytes), 'utf-8')

        url = "https://accounts.spotify.com/api/token"
        headers = {
            "Authorization": f"Basic {auth_base64}",
            "Content-Type": "application/x-www-form-urlencoded"
        }
        data = {"grant_type": "client_credentials"}

        result = requests.post(url, headers=headers, data=data)
        json_result = result.json()
        
        if result.status_code != 200:
            raise Exception(f"Failed to get access token: {json_result.get('error_description', 'Unknown error')}")
            
        return json_result.get("access_token")

    def get_auth_url(self):
        """Generate the Spotify authorization URL"""
        params = {
            'client_id': self.client_id,
            'response_type': 'code',
            'redirect_uri': self.redirect_uri,
            'scope': 'user-read-private user-read-email user-library-read playlist-read-private',
        }
        return f"{self.auth_url}?{urlencode(params)}"

    def get_tokens(self, code):
        """Exchange authorization code for access and refresh tokens"""
        auth_options = {
            'code': code,
            'redirect_uri': self.redirect_uri,
            'grant_type': 'authorization_code',
        }

        response = requests.post(
            self.token_url,
            data=auth_options,
            auth=(self.client_id, self.client_secret)
        )

        if response.status_code != 200:
            raise Exception('Failed to get tokens from Spotify')

        return response.json()

    def get_user_profile(self, access_token):
        """Get the user's Spotify profile"""
        headers = {'Authorization': f'Bearer {access_token}'}
        response = requests.get(f"{self.api_base_url}/me", headers=headers)

        if response.status_code != 200:
            raise Exception('Failed to get user profile from Spotify')

        return response.json()

    def search_track(self, query, limit=5):
        """Search for tracks on Spotify"""
        url = f"https://api.spotify.com/v1/search"
        headers = {
            "Authorization": f"Bearer {self.access_token}"
        }
        params = {
            "q": query,
            "type": "track",
            "limit": limit
        }

        response = requests.get(url, headers=headers, params=params)
        if response.status_code != 200:
            raise Exception(f"Search failed: {response.json().get('error', {}).get('message', 'Unknown error')}")
            
        return response.json()

    def get_track(self, track_id):
        """Get a specific track's details"""
        url = f"https://api.spotify.com/v1/tracks/{track_id}"
        headers = {
            "Authorization": f"Bearer {self.access_token}"
        }

        response = requests.get(url, headers=headers)
        if response.status_code != 200:
            raise Exception(f"Failed to get track: {response.json().get('error', {}).get('message', 'Unknown error')}")
            
        return response.json() 