from flask import Blueprint, request, jsonify, session
from app.models.user import User
from app.services.spotify import SpotifyService
from app import db

bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/login', methods=['POST'])
def spotify_login():
    code = request.json.get('code')
    if not code:
        return jsonify({'error': 'No authorization code provided'}), 400
    
    spotify_service = SpotifyService()
    try:
        tokens = spotify_service.get_tokens(code)
        user_data = spotify_service.get_user_profile(tokens['access_token'])
        
        # Create or update user
        user = User.query.filter_by(spotify_id=user_data['id']).first()
        if not user:
            user = User(
                spotify_id=user_data['id'],
                email=user_data['email'],
                username=user_data['display_name']
            )
            db.session.add(user)
            db.session.commit()
            
        return jsonify({
            'access_token': tokens['access_token'],
            'refresh_token': tokens['refresh_token'],
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email
            }
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@bp.route('/authorize')
def spotify_authorize():
    spotify_service = SpotifyService()
    auth_url = spotify_service.get_auth_url()
    return jsonify({'auth_url': auth_url})
