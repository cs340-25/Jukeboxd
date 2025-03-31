from flask import Blueprint, jsonify, request
from app.services.spotify import SpotifyService
import logging

logger = logging.getLogger(__name__)
search_bp = Blueprint('search', __name__, url_prefix='/api')
spotify_service = SpotifyService()

@search_bp.route('/search')
def search():
    query = request.args.get('q', '')
    logger.info(f"Received search query: {query}")
    
    if not query:
        return jsonify([])
    
    try:
        results = spotify_service.search(query)
        logger.info(f"Found {len(results)} results")
        return jsonify(results)
    except Exception as e:
        logger.error(f"Search failed: {str(e)}")
        return jsonify({'error': str(e)}), 500 