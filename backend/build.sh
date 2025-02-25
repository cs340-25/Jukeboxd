#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt

# Run database migrations if you're using Flask-Migrate
flask db upgrade 