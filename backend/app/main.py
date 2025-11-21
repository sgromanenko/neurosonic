from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.api import audio, auth, users, tracks
from backend.app.core.database import engine
from backend.app.models import models

# Create Database Tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Brain.fm Clone API",
    description="API for generating and streaming functional music",
    version="0.1.0"
)

# CORS Configuration
origins = [
    "http://localhost:5173",  # Vite default
    "http://localhost:5174",  # Vite fallback
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(audio.router, prefix="/api/audio", tags=["audio"])
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(users.router, prefix="/api/users", tags=["users"])
app.include_router(tracks.router, prefix="/api/tracks", tags=["tracks"])

from fastapi.staticfiles import StaticFiles
import os

# Mount static files
static_dir = os.path.join(os.path.dirname(__file__), "..", "static")
app.mount("/static", StaticFiles(directory=static_dir), name="static")

@app.get("/")
async def root():
    return {"message": "Welcome to Brain.fm Clone API"}

@app.get("/healthz")
async def health_check():
    return {"status": "ok"}
