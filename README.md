# Neurosonic

A functional music generator app inspired by Brain.fm, featuring neural phase locking audio and a modern React UI.

## Prerequisites

*   **Node.js** (v18+)
*   **Python** (v3.10+)

## Setup & Run

### 1. Backend (Python)

Navigate to the project root (`brainfm_clone`):

```bash
# Install dependencies
py -m pip install -r backend/requirements.txt

# Run Server
py -m uvicorn backend.app.main:app --reload
```
The API will be available at `http://localhost:8000`.

### 2. Frontend (React)

Open a new terminal, navigate to the `frontend` directory:

```bash
cd frontend
npm install
npm run dev
```
The app will be available at `http://localhost:5173`.

## Features

*   **Focus Mode:** Generates Beta wave modulation (14Hz) for concentration.
*   **Relax Mode:** Generates Alpha wave modulation (10Hz) for relaxation.
*   **Sleep Mode:** Generates Delta wave modulation (2Hz) with 3D rocking spatialization.
*   **Visualizer:** Real-time canvas-based audio visualization.
