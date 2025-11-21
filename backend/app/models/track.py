from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.orm import relationship
from backend.app.core.database import Base

class Track(Base):
    __tablename__ = "tracks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    artist = Column(String) # e.g. "AI Composer"
    genre = Column(String) # Focus, Relax, Sleep
    image_url = Column(String) # Unsplash URL
    base_color = Column(String) # Hex code for UI theme
    
    # Audio generation params (stored to reproduce or categorize)
    bpm = Column(Integer, default=60)
    key = Column(String, default="C Major")
