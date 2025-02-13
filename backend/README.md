## Setting up Spotify API
1. **Create a `.env` file**  
   In the backend directory, create a `.env` file with your Spotify credentials:

   ```env
   DATABASE_URL=postgresql://musicuser:yourpassword@localhost:5432/musicreview
   SECRET_KEY=your-secret-key
   SPOTIFY_CLIENT_ID=your-spotify-client-id
   SPOTIFY_CLIENT_SECRET=your-spotify-client-secret
   
2. **Install dependencies**:
bash
pip install -r requirements.txt

3. **To test spotify api:** python run.py

## Testing Spotify API Integration
Once the server is running, you can test the Spotify API integration using these endpoints:

1. Test Basic Connection:
GET http://127.0.0.1:5000/api/spotify/test
2. Search for Tracks:
GET http://127.0.0.1:5000/api/tracks/search?q=Bohemian%20Rhapsody
3. Get Specific Track:
GET http://127.0.0.1:5000/api/tracks/6rqhFgbbKwnb9MLmUQDhG6


