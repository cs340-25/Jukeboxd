from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_login import LoginManager
from dotenv import load_dotenv
import os

# Initialize extensions
db = SQLAlchemy()
migrate = Migrate()
login_manager = LoginManager()

def create_app():
    # Load environment variables
    load_dotenv()
    
    app = Flask(__name__)
    CORS(app)

    # Configure database
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

    # Initialize extensions with app
    db.init_app(app)
    migrate.init_app(app, db)
    login_manager.init_app(app)

    # Set up login manager
    @login_manager.user_loader
    def load_user(user_id):
        from app.models.user import User
        return User.query.get(int(user_id))

    # Test route
    @app.route('/test')
    def test():
        return jsonify({"message": "Test route working!"})

    # Import blueprints
    from app.routes.auth import bp as auth_bp
    from app.routes.spotify import bp as spotify_bp
    from app.routes.user import bp as user_bp
    from app.routes.review import bp as review_bp

    # Register blueprints with appropriate prefixes
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(spotify_bp, url_prefix='/api/spotify')  # Changed to include spotify in prefix
    app.register_blueprint(user_bp, url_prefix='/api/users')
    app.register_blueprint(review_bp, url_prefix='/api/reviews')

    # Print registered routes for debugging
    print("Registered routes:")
    for rule in app.url_map.iter_rules():
        print(f"{rule.endpoint}: {rule.rule}")

    @app.route('/health')
    def health_check():
        return {"status": "healthy"}

    @app.route('/')
    def hello():
        return {"message": "Hello from Flask!"}

    return app 