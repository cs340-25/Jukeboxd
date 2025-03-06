from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models.review import Review
from app.models.user import User
from app.services.spotify import SpotifyService
from app import db

bp = Blueprint('review', __name__, url_prefix='/reviews')

@bp.route('/', methods=['POST'])
@login_required
def create_review():
    # Remove any test user creation code
    data = request.json
    
    # Validate required fields
    if not all(k in data for k in ['track_id', 'rating', 'content']):
        return jsonify({'error': 'Missing required fields'}), 400
    
    # Get track details from Spotify
    spotify = SpotifyService()
    track = spotify.get_track(data['track_id'])
    
    review = Review(
        user_id=current_user.id,
        track_id=data['track_id'],
        rating=data['rating'],
        content=data['content'],
        track_name=track['name'],
        artist_name=track['artists'][0]['name'],
        album_name=track['album']['name'],
        album_art_url=track['album']['images'][0]['url'] if track['album']['images'] else None
    )
    
    db.session.add(review)
    db.session.commit()
    
    return jsonify({
        'id': review.id,
        'rating': review.rating,
        'content': review.content,
        'created_at': review.created_at
    }), 201

@bp.route('/', methods=['GET'])
def get_reviews():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 20, type=int)
    
    reviews = Review.query.order_by(Review.created_at.desc())\
        .paginate(page=page, per_page=per_page)
    
    return jsonify({
        'reviews': [{
            'id': r.id,
            'user': {
                'id': r.author.id,
                'username': r.author.username
            },
            'track_name': r.track_name,
            'artist_name': r.artist_name,
            'album_name': r.album_name,
            'album_art_url': r.album_art_url,
            'rating': r.rating,
            'content': r.content,
            'created_at': r.created_at
        } for r in reviews.items],
        'total': reviews.total,
        'pages': reviews.pages,
        'current_page': reviews.page
    })

@bp.route('/<int:review_id>/like', methods=['POST'])
@login_required
def like_review(review_id):
    review = Review.query.get_or_404(review_id)
    if current_user not in review.likes:
        review.likes.append(current_user)
        db.session.commit()
    return jsonify({'message': 'Review liked successfully'})
