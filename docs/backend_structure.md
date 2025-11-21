# Backend Structure

## Project Layout

FastAPI App under `/backend/app`. Sub-modules:

*   `api/`: routers for different domains (`auth.py`, `audio.py`, `users.py`, `payments.py`, etc.).
*   `core/`: app setup (FastAPI instance), configuration (env vars), middleware (CORS, auth).
*   `models/`: SQLAlchemy models (`User`, `Session`, `Track`, `Subscription`, etc.).
*   `schemas/`: Pydantic schemas for request/response models.
*   `services/`: business logic (e.g. playlist generator, payment service wrappers).
*   `auth/`: password hashing, JWT token utilities.
*   `main.py`: entry point to run the app.
*   `tests/`: mirror API modules (e.g. `test_auth.py`, `test_audio.py`) with pytest.
*   Configuration files: `requirements.txt`, `Dockerfile`, `docker-compose.yml` at project root.

## Authentication

*   Use FastAPI’s OAuth2 password flow with JWT tokens. Issue tokens on login; validate on protected endpoints.
*   Hash user passwords securely (bcrypt or Argon2). Do not store any plain passwords.
*   Follow OWASP recommendations (e.g. rate-limit login attempts).
*   Provide endpoints:
    *   `/signup`: create new user, start free trial subscription.
    *   `/login`: verify credentials, return JWT.
    *   `/refresh-token`: issue new JWT for valid sessions.
    *   `/profile`: get/update user info.
*   Use HTTPS in production. For session management, FastAPI can set secure cookies or return tokens to the frontend.

## Audio Content & Streaming

*   **Track Metadata:** Store info (mode, genre, duration, neural effect level) in a tracks table.
*   **Catalog Endpoint:** `/audio/tracks` returns a list of available tracks (filtered by mode, etc.).
*   **Streaming Endpoint:** `/audio/stream/{track_id}` returns the audio. Use FastAPI’s StreamingResponse with Range header to stream bytes. Alternatively, generate a pre-signed S3 URL for the client.
*   Ensure only authorized users (active subscription or trial) can access the audio endpoints. Return 403 if not allowed.
*   Brain.fm notes that they don’t use simple binaural beats; instead they encode modulation in each channel. Our audio files should embed the entrainment effects at preprocessing time (e.g. stereo AM, spatial effects).

## Session Tracking & Recommendations

*   **Logging Sessions:** On session start, create a Session record (user_id, track_id, start_time). On end, update duration and success flag.
*   **Analytics:** Track counts of sessions, total listening time per user, etc. This can feed into usage stats.
*   **Recommendation Engine:**
    *   Initially, implement simple recommendations: e.g. most-played tracks for this mode, or “Because you liked X, try Y”.
    *   Later, use user history to train a model (collaborative filtering or content similarity).
    *   Provide endpoint `/recommendations` that suggests next tracks.

## Payments & Subscription

*   Integrate Stripe (using their Python SDK) for checkout and recurring billing.
*   Endpoints:
    *   `/create-checkout-session`: creates a Stripe session for subscription purchase.
    *   `/webhook`: handle Stripe events (payment success, failed, subscription cancelled).
    *   `/billing-portal`: optional redirect to Stripe Customer Portal.
*   Store Stripe Customer IDs in the user’s record. Keep a Subscription table with status and renewal dates.
*   Enforce paywall: if a user’s subscription is inactive (after trial or cancellation), restrict session duration or disable streaming.
*   **Security:** Do not store credit card info on our servers (use Stripe’s tokens/checkout flow).

## Miscellaneous

*   Use Pydantic for all request validation; enable automatic docs (Swagger UI).
*   Health check endpoint (e.g. `/healthz`) for monitoring.
*   Run background tasks (e.g. sending reminder emails) with FastAPI’s BackgroundTasks or a scheduler like Celery.
*   Prepare for scalability: Dockerize the app, use environment variables for config, and consider statelessness (store sessions in DB/Redis, not local memory).
