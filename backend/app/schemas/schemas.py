from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

# Token
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

# Session
class SessionBase(BaseModel):
    mode: str
    duration_seconds: int

class SessionCreate(SessionBase):
    pass

class Session(SessionBase):
    id: int
    user_id: int
    started_at: datetime

    class Config:
        from_attributes = True

# User
class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool
    sessions: List[Session] = []

    class Config:
        from_attributes = True
