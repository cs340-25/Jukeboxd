from app import db
from datetime import datetime

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    spotify_id = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    reviews = db.relationship('Review', backref='user', lazy=True)
    liked_reviews = db.relationship('Review', secondary='review_likes', backref='liked_by')
    spotify_access_token = db.Column(db.String(500))
    spotify_refresh_token = db.Column(db.String(500))
    spotify_token_expiry = db.Column(db.DateTime) 