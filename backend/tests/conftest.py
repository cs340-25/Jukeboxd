import pytest
from backend.app import app, db  # Update this import
import os

@pytest.fixture
def client():
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
            yield client
        db.session.remove()
        db.drop_all()

@pytest.fixture
def mock_spotify_response():
    return {
        'id': '123456',
        'name': 'Test Track',
        'artists': [{'name': 'Test Artist'}],
        'album': {
            'name': 'Test Album',
            'images': [{'url': 'http://example.com/image.jpg'}]
        }
    } 