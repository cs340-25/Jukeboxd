from flask import Blueprint, request, jsonify
from app.services.spotify import SpotifyService

bp = Blueprint('spotify', __name__)

@bp.route('/tracks/<track_id>')
def get_track_by_id(track_id):
    try:
        spotify_service = SpotifyService()
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

@bp.route('/spotify/test')
def test_spotify():
    try:
        spotify_service = SpotifyService()
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

@bp.route('/tracks/search')
def search_tracks():
    query = request.args.get('q', '')
    try:
        spotify_service = SpotifyService()
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
