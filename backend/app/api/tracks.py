from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel

from backend.app.core.database import get_db
from backend.app.models.track import Track

router = APIRouter()

class TrackSchema(BaseModel):
    id: int
    title: str
    artist: str
    genre: str
    image_url: str
    base_color: str
    audio_url: str = None
    
    @staticmethod
    def resolve_audio_url(obj):
        # For now, we are storing the URL in the 'key' field to avoid migration
        return obj.key

    class Config:
        from_attributes = True

@router.get("/", response_model=List[TrackSchema])
def get_tracks(genre: str = None, db: Session = Depends(get_db)):
    query = db.query(Track)
    if genre:
        query = query.filter(Track.genre == genre)
    return query.all()

@router.post("/seed")
def seed_tracks(db: Session = Depends(get_db)):
    """
    Seeds the database with some premium-looking tracks.
    """
    if db.query(Track).count() > 0:
        return {"message": "Already seeded"}
        
    tracks = [
        Track(
            title="Quantum Focus", 
            artist="Brain.fm AI", 
            genre="focus", 
            image_url="https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=800&q=80",
            base_color="#3b82f6", # Blue
            # Use static file URL
            key="http://localhost:8000/static/audio/focus_1.wav" 
        ),
        Track(
            title="Deep Work Flow", 
            artist="Brain.fm AI", 
            genre="focus", 
            image_url="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
            base_color="#2563eb", # Dark Blue
            key="http://localhost:8000/static/audio/focus_1.wav"
        ),
        Track(
            title="Zen Garden", 
            artist="Brain.fm AI", 
            genre="relax", 
            image_url="https://images.unsplash.com/photo-1528353518132-131198606e99?w=800&q=80",
            base_color="#14b8a6", # Teal
            key="http://localhost:8000/static/audio/relax_1.wav"
        ),
        Track(
            title="Inner Peace", 
            artist="Brain.fm AI", 
            genre="meditate", 
            image_url="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
            base_color="#8b5cf6", # Purple
            key="http://localhost:8000/static/audio/meditate_1.wav"
        ),
        Track(
            title="Night Drift", 
            artist="Brain.fm AI", 
            genre="sleep", 
            image_url="https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?w=800&q=80",
            base_color="#6366f1", # Indigo
            key="http://localhost:8000/static/audio/sleep_1.wav"
        ),
    ]
    
    db.add_all(tracks)
    db.commit()
    return {"message": "Seeded tracks"}
