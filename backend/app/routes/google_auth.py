from flask import Blueprint, url_for, session, redirect, request, jsonify
from app.oauth import oauth
import logging
import traceback

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

bp = Blueprint('google_auth', __name__)

@bp.route('/login')
def login():
    try:
        redirect_uri = 'http://localhost:5001/api/google/authorized'
        logger.debug(f"Starting Google OAuth flow with redirect URI: {redirect_uri}")
        return oauth.google.authorize_redirect(redirect_uri)
    except Exception as e:
        logger.error(f"Error in login route: {str(e)}")
        logger.error(f"Traceback: {traceback.format_exc()}")
        return redirect('http://localhost:5173/auth?error=login_failed')

@bp.route('/logout')
def logout():
    session.pop('google_token', None)
    return redirect('http://localhost:5173/auth')

@bp.route('/authorized')
def authorized():
    try:
        logger.debug("Received callback from Google OAuth")
        logger.debug(f"Request args: {request.args}")
        logger.debug(f"Session data: {session}")
        logger.debug(f"OAuth config: {oauth.google.client_id}")
        
        token = oauth.google.authorize_access_token()
        logger.debug("Successfully obtained access token")
        
        resp = oauth.google.get('userinfo')
        user_info = resp.json()
        logger.debug(f"User info: {user_info}")
        
        session['google_token'] = token
        return redirect(f'http://localhost:5173/home?user={user_info["email"]}&name={user_info.get("name", "")}')
    except Exception as e:
        logger.error(f"Error in authorized route: {str(e)}")
        logger.error(f"Request args: {request.args}")
        logger.error(f"Session data: {session}")
        logger.error(f"Traceback: {traceback.format_exc()}")
        return redirect('http://localhost:5173/auth?error=access_denied')