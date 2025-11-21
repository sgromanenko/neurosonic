# Tech Stack

## Frontend

*   **Framework:** React with TypeScript (leveraging hooks and functional components for structure and type safety).
*   **Styling:** CSS-in-JS (e.g. Styled Components) or utility CSS (e.g. Tailwind). Consistent design system or component library (e.g. Material UI) for layout and controls.
*   **State Management:** React Context or Redux Toolkit to manage global state (user session, current audio state).
*   **Routing:** React Router for navigation between pages (Home, Modes, Profile, etc.).
*   **Audio Playback:** HTML5 `<audio>` element or Web Audio API; libraries like react-player if needed for advanced control.
*   **Localization:** react-i18next or similar for translations and locale detection.
*   **Tooling:** ESLint + Prettier for code linting/formatting, with TypeScript rules enabled. Husky/Git hooks to auto-format on commit.
*   **Testing:** Jest & React Testing Library for unit tests; Cypress or Playwright for end-to-end testing of flows.
*   **PWA Support:** Service Worker (e.g. Workbox) for offline caching (especially audio files and static assets).
*   **Package Management:** Yarn Workspaces or PNPM in a monorepo to manage frontend/backend together.

## Backend

*   **Framework:** Python with FastAPI (async capable, automatic OpenAPI docs).
*   **Server:** Uvicorn (ASGI) behind a production server (or use Gunicorn + Uvicorn).
*   **Database:** PostgreSQL (user data, session logs, track metadata).
*   **ORM:** SQLAlchemy (with Alembic for migrations) or Tortoise ORM.
*   **Caching/Queue:** Redis for caching (e.g. session tokens) or background tasks (e.g. Celery + Redis).
*   **Authentication:** JWT tokens (using FastAPI’s OAuth2 utilities) for stateless auth. Passwords hashed (bcrypt).
*   **Audio Storage:** Store pre-processed audio on cloud storage (AWS S3 or equivalent). Metadata in DB.
*   **Streaming:** Serve audio via HTTP Range support. Optionally generate signed URLs for S3 to allow client streaming.
*   **Payments:** Stripe (Stripe Python SDK). Handle subscriptions and webhooks (Brain.fm uses Stripe and explicitly does not store credit card data).
*   **Testing:** pytest for backend logic; HTTPX or requests for API tests.
*   **Monitoring:** Use logging (Python logging or structlog), error monitoring (Sentry), and metrics (Prometheus/Grafana).
*   **Containerization:** Docker for both backend and supporting services (db, cache). docker-compose for development.

## Audio & Machine Learning Tools

*   **Audio Processing:** Python libraries like librosa, pydub, or raw ffmpeg calls to preprocess tracks. Apply rhythmic amplitude modulation, filtering (e.g. low-pass for focus), and spatialization (for sleep “rocking” effect).
*   **Pre-Processing Pipeline:** Separate scripts or service to generate final audio assets from raw inputs. Store processed files with consistent naming.
*   **ML/Recommendation:** Initially, simple rule-based suggestions (e.g. popular or recently used tracks). Future scope: use Python ML libs (scikit-learn, LightFM) for collaborative filtering recommendations based on user history.
*   **Other Services:** Optionally integrate third-party APIs in future (e.g. calendar for scheduling focus times, wearable health data for dynamic adjustments).
