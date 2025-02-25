from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models.user import User
from app import db

bp = Blueprint('user', __name__, url_prefix='/users')

@bp.route('/profile')
@login_required
def get_profile():
    return jsonify({
        'id': current_user.id,
        'username': current_user.username,
        'email': current_user.email
    })

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
