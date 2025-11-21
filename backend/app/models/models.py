from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from backend.app.core.database import Base
from backend.app.models.track import Track

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    full_name = Column(String, nullable=True)
    preferences = Column(String, nullable=True) # JSON string
    created_at = Column(DateTime, default=datetime.utcnow)

    sessions = relationship("ListeningSession", back_populates="user")

class ListeningSession(Base):
    __tablename__ = "listening_sessions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    mode = Column(String) # focus, relax, sleep
    duration_seconds = Column(Integer)
    started_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="sessions")
