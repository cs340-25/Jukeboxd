from app import db
from datetime import datetime

# Define the association table
review_likes = db.Table('review_likes',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('review_id', db.Integer, db.ForeignKey('reviews.id'), primary_key=True),
    db.Column('created_at', db.DateTime, default=datetime.utcnow)
)

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
    
    # Define the likes relationship
    likes = db.relationship('User',
        secondary=review_likes,
        backref=db.backref('liked_reviews', lazy='dynamic'),
        lazy='dynamic'
    ) 