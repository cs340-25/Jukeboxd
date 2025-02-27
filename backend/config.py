import os

# securepassword is a placeholder to be replaced
# This is also with local hosting for test and will be moved
# into aws later
SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "postgresql://music_admin:securepassword@localhost:5432/jukeboxd")
SQLALCHEMY_TRACK_MODIFICATIONS = False