from app import db
from datetime import datetime

class Review(db.Model):
    __tablename__ = 'reviews'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    track_id = db.Column(db.String(50), nullable=False)  # Spotify track ID
    rating = db.Column(db.Integer)  # 1-5 stars
    content = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Track metadata (cached from Spotify)
    track_name = db.Column(db.String(200))
    artist_name = db.Column(db.String(200))
    album_name = db.Column(db.String(200))
    album_art_url = db.Column(db.String(500))
    
    # Relationships
    user = db.relationship('User', backref=db.backref('reviews', lazy=True))
    likes = db.relationship('User', secondary='review_likes', backref='liked_reviews') 