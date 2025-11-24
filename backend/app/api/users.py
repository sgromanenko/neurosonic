from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from backend.app.core.database import get_db
from backend.app.models import models
from backend.app.schemas import schemas
from backend.app.api import auth

router = APIRouter()

@router.get("/me", response_model=schemas.User)
async def read_users_me(current_user: models.User = Depends(auth.get_current_user)):
    return current_user

@router.put("/me", response_model=schemas.User)
async def update_user_me(
    user_update: schemas.UserUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    if user_update.full_name is not None:
        current_user.full_name = user_update.full_name
    if user_update.email is not None:
        # Check if email already exists if changed
        if user_update.email != current_user.email:
            existing_user = db.query(models.User).filter(models.User.email == user_update.email).first()
            if existing_user:
                raise HTTPException(status_code=400, detail="Email already registered")
            current_user.email = user_update.email
    if user_update.preferences is not None:
        current_user.preferences = user_update.preferences
    
    db.commit()
    db.refresh(current_user)
    return current_user

@router.get("/me/history", response_model=List[schemas.Session])
async def read_user_history(
    skip: int = 0, 
    limit: int = 100, 
    distinct_modes: bool = False,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    query = db.query(models.ListeningSession)\
        .filter(models.ListeningSession.user_id == current_user.id)\
        .order_by(models.ListeningSession.started_at.desc())
        
    if distinct_modes:
        # Fetch more to ensure we find distinct ones, then filter in python
        # SQLite doesn't support DISTINCT ON easily
        sessions = query.limit(limit * 5).all()
        unique_sessions = []
        seen_modes = set()
        for session in sessions:
            if session.mode not in seen_modes:
                unique_sessions.append(session)
                seen_modes.add(session.mode)
            if len(unique_sessions) >= limit:
                break
        return unique_sessions
        
    return query.offset(skip).limit(limit).all()

@router.post("/me/history", response_model=schemas.Session)
async def create_session_record(
    session: schemas.SessionCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    db_session = models.ListeningSession(**session.dict(), user_id=current_user.id)
    db.add(db_session)
    db.commit()
    db.refresh(db_session)
    return db_session
