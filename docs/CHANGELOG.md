# Changelog

All notable changes to the Brain.fm Clone project will be documented in this file.

## [Unreleased]

## [0.3.0] - 2025-11-20

### Added
- **Frontend Authentication**: Complete login/register UI with glassmorphism design
- **Protected Routes**: Tracks grid now requires authentication
- **Session Management**: JWT token persistence in localStorage
- **Logout Functionality**: Header button to sign out

### Changed
- **Audio Architecture**: Switched from real-time generation to static file streaming
- **Database Schema**: Track model now stores static audio URLs instead of generation params

## [0.2.0] - 2025-11-19

### Added
- **Audio Engine 2.0**: Procedural ambient music using additive synthesis (chords, pads, textures)
- **Premium UI**: Full-screen immersive player with dynamic backgrounds
- **Track Metadata**: Database model and API for track titles, genres, and artwork
- **Static Serving**: FastAPI serves pre-generated audio files from `backend/static/audio/`
- **Asset Generation**: Script (`scripts/generate_assets.py`) to pre-generate tracks

### Removed
- Pink noise placeholder in favor of musical synthesis

## [0.1.0] - 2025-11-19

### Added
- **Core Audio Engine**: Neural Phase Locking implementation (14Hz Focus, 10Hz Relax, 2Hz Sleep)
- **3D Spatialization**: Panning effect for Sleep mode
- **Backend API**: FastAPI endpoints for audio generation (`/api/audio/generate`)
- **Backend Authentication**: JWT-based user registration and login (`/api/auth/*`)
- **Database**: SQLAlchemy models for Users and Listening Sessions (SQLite)
- **Frontend**: React + TypeScript app with Vite
  - Mode selector (Focus/Relax/Sleep)
  - Audio player with volume control
  - Real-time visualizer
- **Documentation**: Complete docs structure (`docs/`)
- **Verification**: Test scripts for audio modulation frequencies and authentication

### Tech Stack
- **Backend**: Python 3.10+, FastAPI, numpy, scipy, SQLAlchemy, bcrypt, python-jose
- **Frontend**: React, TypeScript, Vite, TailwindCSS
- **Database**: SQLite (dev), PostgreSQL (planned for prod)

---

## Version Format
- **Major.Minor.Patch** (e.g., 1.0.0)
- **Major**: Breaking changes or complete feature sets
- **Minor**: New features, backward-compatible
- **Patch**: Bug fixes, small improvements
