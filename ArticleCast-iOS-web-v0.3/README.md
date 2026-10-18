# ArticleCast Mobile v0.3 — iPhone/iPad browser prototype

This is a standalone web app, not yet a Safari extension or native iOS app. It uses the browser's speechSynthesis API. On iOS, speech can stop when the screen locks or Safari goes into the background. It does not automatically extract articles, sync across devices, or generate AI podcasts yet.

## Publish for iPhone and iPad (GitHub Pages)
1. Create a free GitHub account if needed, and a **public** repository, e.g. `articlecast-mobile`. Note: repository contents will be public. Do NOT commit private articles, secrets, or API keys.
2. Upload the six files in this folder to the repository root: `index.html`, `style.css`, `app.js`, `manifest.webmanifest`, `sw.js`, and `README.md`.
3. In repository **Settings → Pages**, select **Deploy from a branch**, branch **main**, folder **/(root)**, and Save.
4. Wait for GitHub to show the Pages HTTPS URL (typically `https://YOUR-USERNAME.github.io/articlecast-mobile/`).
5. Open that URL in **Safari on iPhone/iPad**. Use Share → Add to Home Screen (wording may differ by iOS version).
6. Open a news article, copy its article text, paste into ArticleCast, and tap Play. You can save it locally on that device.

For local Mac testing, run `python3 -m http.server 8000` from this directory and visit `http://localhost:8000` in Chrome or Safari. `file://` may not work for service worker features.

## Privacy
Saved articles are kept in that browser's localStorage (up to 20, subject to device storage limits). They are not synced or uploaded by this app. If you clear Safari website data, they may disappear. Do not use this as your only copy.

## Next milestones
- Native iOS SwiftUI app using AVSpeechSynthesizer / AVAudioSession for better audio controls and background support.
- Safari Share extension to capture article text directly.
- AI podcast script generation and narrated audio (requires separate model/service integration and secure API key handling).
