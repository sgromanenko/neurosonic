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

@router.get("/me/history", response_model=List[schemas.Session])
async def read_user_history(
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    sessions = db.query(models.ListeningSession)\
        .filter(models.ListeningSession.user_id == current_user.id)\
        .order_by(models.ListeningSession.started_at.desc())\
        .offset(skip)\
        .limit(limit)\
        .all()
    return sessions

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
