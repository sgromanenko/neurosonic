# Frontend Guidelines

## Coding Style

*   Use TypeScript with strict settings. Prefer explicit types; avoid `any` unless absolutely necessary.
*   Functional React components and Hooks. Name components in PascalCase (e.g. `FocusSession.tsx`) and hooks with `use` prefix (e.g. `useAudioPlayer.ts`).
*   File and directory names in kebab-case or camelCase as per team convention. Keep related files together (component + its CSS + tests).
*   Enforce style with ESLint (using Airbnb or standard configs) and Prettier. Example rules: no console.log, consistent semicolons, quotes, etc.
*   Write clear, self-documenting code. Use JSDoc comments for complex functions or APIs.

## Component Structure

Organize by feature:

*   **Pages:** high-level pages (e.g. `HomePage`, `FocusPage`, `ProfilePage`).
*   **Components:** reusable widgets (e.g. `ModeCard`, `Timer`, `AudioControls`).
*   **Layouts:** structural components (e.g. `Header`, `Footer`, `ModeSelector`).
*   **Hooks:** shared logic (`useAuth`, `useAudio`, `useCountdown`).
*   **Contexts:** React contexts (e.g. `AuthContext`, `PlayerContext`) for global state.
*   **i18n:** JSON or JS files under an `/i18n` folder, organized by language codes.
*   **Assets:** images/SVGs/icons under `/assets`. Audio preview files (if any) under `/public` or similar.

Keep folder depth shallow (2–3 levels). Use index files (`index.ts`) to simplify imports.

## UI/UX Rules

*   **Minimal & Focused:** Clean UI that “gets out of your way”. Emphasize primary actions (select mode, start session).
*   **Mode Selection:** Prominently display the four modes (Focus, Relax, Meditate, Sleep) with icons or illustrations. Each mode can show a brief description.
*   **Session Setup:** After mode select, show customization options (duration, activity, genre, intensity). Defaults should be reasonable.
*   **Audio Player:** Show only essential controls (Play/Pause, progress bar, timer). Avoid distracting visuals. Display current session time and remaining.
*   **Responsive Design:** Mobile-first approach. Ensure layouts collapse gracefully on small screens. Components should adapt to various device sizes.
*   **Accessibility:** All interactive elements must be keyboard accessible. Use semantic HTML and ARIA labels (e.g. `aria-label` for Play/Pause buttons). Ensure color contrast and text sizes meet accessibility guidelines.
*   **Internationalization:** Wrap all user text in translation functions (`t('...')`). Provide fallback (English) if a key is missing. Do not hardcode string literals.
*   **Distraction-Free Aesthetic:** No ads, pop-ups, or unrelated content. Background art or animations (e.g. subtle wave or particle effect) are optional but keep it soothing.
*   **Feedback & States:** Indicate loading (e.g. spinner when fetching tracks). Show meaningful error messages for failures (e.g. playback errors or network issues).

## Audio Player Integration

*   Implement audio via an HTML5 `<audio>` element controlled by React. Use a single global player context so that controls (play/pause) can be accessed from anywhere.
*   Support HTTP range requests for streaming. The backend should accept Range headers so users can seek or resume streams seamlessly.
*   Manage playback state (playing, paused, time) in context or Redux so that it can sync with UI (e.g. disable “Start” while loading).
*   Include a timer/Pomodoro feature: allow user to set a work interval (e.g. 25min) with optional short breaks. Auto-pause or cue an alert at interval end.
*   Preload audio when possible to minimize buffering delays. For example, preload a few seconds of audio before playback.
*   **No Vocals:** Ensure all tracks are instrumental. As Brain.fm notes, removing language elements keeps users from over-focusing on the music.
*   Provide an option for **Offline Mode:** cached audio storage (via PWA) so users can play without internet (Brain.fm supports downloaded sessions).
