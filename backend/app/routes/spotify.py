from flask import Blueprint, request, jsonify, current_app
from app.services.spotify import SpotifyService
import requests
from base64 import b64encode
import os
from dotenv import load_dotenv

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

@bp.route('/search', methods=['GET'])
def search_tracks():
    query = request.args.get('q', '')
    try:
        results = spotify_service.search_track(query)
        return jsonify({
            "status": "success",
            "data": results
        }), 200
    except Exception as e:
        print(f"Error searching tracks: {str(e)}")
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

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
