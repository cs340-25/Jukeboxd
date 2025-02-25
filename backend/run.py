from app import create_app
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
# Update CORS to allow connections from any origin
CORS(app, resources={r"/*": {"origins": "*"}})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True) 