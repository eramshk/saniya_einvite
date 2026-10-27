# Saniya weds Mubeen — Wedding Invitation

## Original Problem
User uploaded existing wedding invitation site (saniya_mubeen-main.zip) and requested three corrections.

## Corrections Applied (Jan 2026)
1. **Door responsiveness fix** — Gates were stretching into tall thin slivers on phones. Added aspect-ratio constraints to `.gates-wrapper` and `.hero-arch-frame` (height capped at 1.25× width on desktop, more aggressive on mobile breakpoints 640px / 420px) and resized medallions, knockers, arch-top, and CTA padding for small screens.
2. **Dinner section added** — New `dinner-section` between venue and closing showing "Walima Dinner / Dinner Reception / 7:00 PM Onwards / Gulshan Baug" with golden card styling and corner accents.
3. **Wedding nasheed swapped** — Changed `NASHEED_URL` from generic Tala al-Badru to Muhammad al-Muqit's "Aroosatu al-Noor (New Wedding Nasheed)" from Internet Archive.

## Tech Stack
React 19 + Framer Motion + CRACO (frontend) / FastAPI (backend, untouched)

## Files Changed
- `/app/frontend/src/App.js` — NASHEED_URL, new dinner Section JSX
- `/app/frontend/src/App.css` — gate-wrapper aspect ratio, mobile breakpoints (640px & 420px), `.dinner-card` styles

## Backlog
- Optional: include dinner time on the reveal panel (above-the-fold) so guests see it without scrolling

## Update — June 2026
- Dinner heading changed to "Dawat-e-Nikaah" (heading only; calendar event text unchanged)
- Gulshan Baug link now https://maps.app.goo.gl/xhW7io6XjNMa8DsYA?g_st=aw (Badi Masjid link unchanged)
- Removed closing footer greeting "Wa-salamu alaykum..." from App.js
- Background nasheed now Noor-ul-Nikah (vocals only), self-hosted at frontend/public/noor-ul-nikah.mp3 via PUBLIC_URL
- Next: user clicks "Save to GitHub" to redeploy via GitHub Actions
- Merged user's GitHub-only edits: removed "Add to Calendar" (.ics) button (Google Calendar kept), small label "Dawat-e-Nikah", title "Saniya ❤︎ Mubeen — A Royal Nikah" (index.html + document.title), description "Wedding Invite", hidden emergent-badge anchor kept (index.html copied from GitHub main)
