# File Structure

## Proposed monorepo directory layout:

```
project-root/
├── frontend/              # React TypeScript web app
│   ├── src/
│   │   ├── components/    # Reusable UI components (ModeCard.tsx, Player.tsx)
│   │   ├── pages/         # Page components (HomePage.tsx, FocusPage.tsx)
│   │   ├── hooks/         # Custom hooks (useAuth.ts, useAudio.ts)
│   │   ├── contexts/      # Context providers (AuthContext.tsx)
│   │   ├── assets/        # Static assets (images, icons)
│   │   ├── i18n/          # Localization files (en.json, es.json, etc.)
│   │   └── App.tsx        # Main app component
│   ├── public/            # Public files (favicon, manifest, etc.)
│   └── package.json
├── backend/               # FastAPI Python app
│   ├── app/
│   │   ├── api/           # Routers (auth.py, audio.py, payments.py, etc.)
│   │   ├── core/          # App setup (config.py, main.py, dependencies.py)
│   │   ├── models/        # SQLAlchemy models (user.py, track.py)
│   │   ├── schemas/       # Pydantic schemas (user.py, session.py)
│   │   ├── services/      # Business logic (subscription_service.py)
│   │   └── main.py        # FastAPI entry point
│   ├── tests/             # Backend tests (test_auth.py, test_audio.py)
│   └── requirements.txt
├── audio/                 # Audio processing and assets
│   ├── raw/               # Raw audio files (before processing)
│   ├── processed/         # Final audio tracks (by mode/genre)
│   ├── scripts/           # Preprocessing scripts (modulation.py, mix.py)
│   └── metadata/          # JSON/YAML with track info (mode, bpm, etc.)
├── shared/                # Shared code or types
│   ├── types/             # TypeScript interfaces for API data
│   └── utils/             # Utility functions or constants
├── scripts/               # Dev scripts (setup_db.sh, deploy.sh)
├── docker-compose.yml
├── .gitignore
└── README.md             # Project overview and setup instructions
```

## Naming Conventions

*   **Frontend Files:** Use kebab-case or camelCase (e.g. `audio-player.tsx`, `focus-page.tsx`). Components are PascalCase (`ModeCard.tsx`).
*   **CSS/Styles:** Match component name (e.g. `Header.module.css` or styled components).
*   **Hooks:** start with `use` (e.g. `useAuth.ts`).
*   **Backend Files:** snake_case for Python modules (`auth_service.py`), and CamelCase for classes (e.g. `User`, `Track`).
*   **Tests:** Mirror the structure; prefix with `test_` (e.g. `test_auth_service.py`).
*   **API Routes:** Follow REST conventions (`/auth/signup`, `/audio/stream/:id`).
