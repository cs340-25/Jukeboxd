from flask import Blueprint, request, jsonify, current_app
from app.services.spotify import SpotifyService
import requests
from base64 import b64encode
import os
from dotenv import load_dotenv
import logging

logger = logging.getLogger(__name__)
bp = Blueprint('spotify', __name__)
load_dotenv()

# Initialize SpotifyService once
spotify_service = SpotifyService()

def get_spotify_token():
    client_id = os.getenv('SPOTIFY_CLIENT_ID')
    client_secret = os.getenv('SPOTIFY_CLIENT_SECRET')
    
    auth_header = b64encode(f"{client_id}:{client_secret}".encode('utf-8')).decode('utf-8')
    
    response = requests.post(
        'https://accounts.spotify.com/api/token',
        headers={
            'Authorization': f'Basic {auth_header}',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data={'grant_type': 'client_credentials'}
    )
    
    return response.json()['access_token']

@bp.route('/track/<track_id>', methods=['GET'])
def get_track(track_id):
    try:
        track = spotify_service.get_track(track_id)
        return jsonify({
            "status": "success",
            "data": track
        }), 200
    except Exception as e:
        print(f"Error getting track: {str(e)}")
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

@bp.route('/search')
def search_tracks():
    if not spotify_service.is_initialized():
        return jsonify({
            'error': 'Spotify service not available',
            'message': 'Please check your Spotify credentials'
        }), 503
    
    try:
        query = request.args.get('q', '')
        if not query:
            return jsonify({'error': 'No search query provided'}), 400
            
        results = spotify_service.search_tracks(query)
        return jsonify(results)
    except Exception as e:
        logger.error(f"Error searching tracks: {str(e)}")
        return jsonify({'error': 'Failed to search tracks'}), 500

@bp.route('/test', methods=['GET'])
def test_spotify():
    try:
        results = spotify_service.search_track("Bohemian Rhapsody")
        return jsonify({
            "status": "success",
            "message": "Spotify API is working!",
            "data": results
        }), 200
    except Exception as e:
        print(f"Error in test_spotify: {str(e)}")
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500
