from flask import Blueprint, jsonify, request, session
from flask_login import login_required, current_user
from app.models.user import User
from app import db
import logging
import base64
import os
from datetime import datetime

logger = logging.getLogger(__name__)
bp = Blueprint('user', __name__, url_prefix='/users')

@bp.route('/profile', methods=['GET'])
def get_profile():
    try:
        email = session.get('user_email')
        if not email:
            return jsonify({'error': 'Not authenticated'}), 401
            
        user = User.query.filter_by(email=email).first()
        if not user:
            return jsonify({'error': 'User not found'}), 404
            
        return jsonify(user.to_dict())
    except Exception as e:
        logger.error(f"Error getting profile: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@bp.route('/profile/username', methods=['PUT'])
def update_username():
    try:
        email = session.get('user_email')
        if not email:
            return jsonify({'error': 'Not authenticated'}), 401
            
        data = request.get_json()
        new_username = data.get('username')
        
        if not new_username:
            return jsonify({'error': 'Username is required'}), 400
            
        user = User.query.filter_by(email=email).first()
        if not user:
            return jsonify({'error': 'User not found'}), 404
            
        # Check if username is already taken
        existing_user = User.query.filter_by(username=new_username).first()
        if existing_user and existing_user.id != user.id:
            return jsonify({'error': 'Username already taken'}), 409
            
        user.username = new_username
        db.session.commit()
        
        return jsonify(user.to_dict())
    except Exception as e:
        logger.error(f"Error updating username: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@bp.route('/profile/image', methods=['PUT'])
def update_profile_image():
    try:
        email = session.get('user_email')
        if not email:
            return jsonify({'error': 'Not authenticated'}), 401
            
        data = request.get_json()
        image_data = data.get('image')
        
        if not image_data:
            return jsonify({'error': 'Image data is required'}), 400
            
        # Decode base64 image data
        try:
            image_bytes = base64.b64decode(image_data.split(',')[1])
        except Exception as e:
            return jsonify({'error': 'Invalid image data'}), 400
            
        # Create uploads directory if it doesn't exist
        upload_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'static', 'uploads')
        os.makedirs(upload_dir, exist_ok=True)
        
        # Generate unique filename
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        filename = f"profile_{timestamp}.jpg"
        filepath = os.path.join(upload_dir, filename)
        
        # Save image
        with open(filepath, 'wb') as f:
            f.write(image_bytes)
            
        user = User.query.filter_by(email=email).first()
        if not user:
            return jsonify({'error': 'User not found'}), 404
            
        # Update user's profile image path
        user.profile_image = f"/static/uploads/{filename}"
        db.session.commit()
        
        return jsonify(user.to_dict())
    except Exception as e:
        logger.error(f"Error updating profile image: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@bp.route('/<int:user_id>/reviews')
def get_user_reviews(user_id):
    user = User.query.get_or_404(user_id)
    reviews = user.reviews
    
    return jsonify({
        'reviews': [{
            'id': review.id,
            'track_name': review.track_name,
            'artist_name': review.artist_name,
            'rating': review.rating,
            'content': review.content,
            'created_at': review.created_at
        } for review in reviews]
    })

@bp.route('/<int:user_id>')
def get_user(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify({
        'id': user.id,
        'username': user.username,
        'review_count': len(user.reviews)
    })
