# Project Requirements

## Product Overview

An AI-powered brainwave entrainment music app for productivity and well-being, inspired by Brain.fm. It generates science-backed, functional audio tailored to cognitive states.

Provides distinct modes: Focus, Relax, Meditate, Sleep. Each mode plays long-form, instrumental audio designed to induce the corresponding state (e.g. deep focus or restful sleep).

Audio employs techniques like patented neural phase-locking (amplitude modulation) to nudge brain activity into target rhythms.

Cross-platform readiness: built for web (responsive design) with an architecture supporting future mobile (iOS/Android) apps.

Designed with internationalization from day one (UI text managed via translation files).

## Key Features

*   **User Accounts:** Secure signup/login (email/password and optional OAuth) for saving preferences and session history.
*   **Modes & Sessions:** Choose a mode (Focus, Relax, Meditate, Sleep) on the dashboard. Configure session settings (duration, optional sub-activity, intensity level). Each session plays a pre-generated audio track tailored to those settings.
*   **Pre-Processed Audio:** Serve high-quality instrumental tracks (no lyrics to avoid distraction) that apply rhythmic modulation and filtering (e.g. focus tracks may attenuate high frequencies).
*   **Player & Timer:** Built-in audio player with Play/Pause and progress indicator. Optional Pomodoro timer. Users can run sessions in the background or download for offline play.
*   **Personalization:** Optional onboarding quiz (e.g. “neurotype”) to personalize intensity. Track user feedback (session ratings) and behavior to fine-tune future recommendations.
*   **Multilingual Support:** All UI strings and content are locale-managed (e.g. English, Spanish). Use a library like react-i18next for translations.
*   **Subscription & Paywall:** Free trial period (e.g. 14 days free), then subscription plans (monthly/yearly) via Stripe. Enforce that only active subscribers (or trial users) can start full-length sessions.
*   **Analytics & Feedback:** Log session data (mode, duration, date) for user history and improvements. Collect user feedback on effectiveness. Provide basic usage stats in profile.

## Success Criteria

*   **Feature Completion:** All listed features (mode selection, audio streaming, auth, payments, i18n) are implemented and working as intended.
*   **User Experience:** Users can start a session within 3 taps/clicks from login. The UI is clean and distraction-free (Brain.fm’s interface is noted for being “minimal, feature-light”).
*   **Audio Effectiveness:** Audio tracks are scientifically tuned (neural entrainment) and non-distracting. Users should feel improved focus or relaxation within ~10 minutes of use (Brain.fm claims noticeable effect in 5–15 minutes).
*   **Performance:** Smooth audio playback (no stutters), low latency, and ability to handle concurrent users. Responsive UI.
*   **Business Metrics:** Meet key conversion/retention targets (e.g. trial-to-subscription conversion, session completion rate) comparable to industry benchmarks.
*   **Quality Metrics:** Automated tests (unit, integration) cover >90% of core logic. Code follows agreed style. Deployment scripts work reliably.
