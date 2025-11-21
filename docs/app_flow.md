# App Flow

## Onboarding & Authentication

*   **Welcome & Info:** Landing page introduces the app (brain-enhancing music for focus/relax/sleep).
*   **Sign Up / Log In:** User registers (email + password or via OAuth). New users automatically get a free trial.
*   **Optional Quiz:** Prompt new users to answer a brief questionnaire (“neurotype”) to set initial preferences.
*   **Language Choice:** Detect or allow user to select UI language (if not already preset).

## Main Dashboard & Navigation

*   **Mode Selection:** The home screen shows four cards or buttons: Focus, Relax, Meditate, Sleep (with icons).
*   **Session Setup:** User clicks a mode and is taken to a setup page:
    *   **Activity/Genre:** (If applicable) choose sub-activity (e.g. ‘Coding’, ‘Reading’) or background style (e.g. Cinematic, Ambient).
    *   **Duration:** Slider or preset buttons (15m, 30m, 60m, etc).
    *   **Intensity:** Slider or options (Low/Medium/High, with a “Boost” toggle).
*   **Subscription Check:**
    *   If user is within trial/subscription, allow session. If not, show paywall prompt (“Start 14-day trial” or pricing).
    *   Display current plan and days left in trial.
*   **Start Session:** User confirms settings and taps “Play” or “Start”.
    *   This triggers audio playback and timer countdown.
    *   The UI changes to session mode (audio player screen).

## During a Session

*   **Player Screen:** Shows minimal UI – e.g. a progress circle/timer and Play/Pause button. Maybe a soft animated background.
*   **Controls:** Mute/unmute, pause/resume. Disable changing mode until session ends or user stops it.
*   **Pomodoro Support:** If using intervals, automatically pause after work interval and start break interval (optional).

## Session End

*   **Summary Screen:** Show total time listened. Ask user to rate or give feedback (optional).
*   **Next Suggestions:** Recommend the next action (e.g. “Switch to Relax mode for a cool down”).
*   **Stats:** Show streaks, total hours, or sessions completed (for engagement).
*   **End Notifications:** If a session ends, optionally send a notification or sound alert.

## Subscription & Settings

*   **Subscription Prompt:** If a session tries to exceed free usage, prompt upgrade. “Get unlimited sessions with a subscription.”
*   **User Settings:** Accessible from any page. Includes profile info, password change, language preference, subscription plan details, and logout.
*   **Support/Help:** FAQ and contact (multi-language). Example: Brain.fm’s help emphasizes secure Stripe payments and offers FAQs.

Throughout the flow, keep interactions direct and uncluttered. The user’s goal (starting an audio session) should take no more than 2–3 screens from login.
