# Architecture

BODYMADE is a static React + TypeScript + Vite PWA. Vite is configured for the GitHub Pages prefix `/bodymade/`. There is no server, login, analytics SDK, or network dependency for core features.

## Boundaries

- `src/domain.ts`: typed records and pure calculations (weight trend, Epley estimate, next action, backup validation).
- `src/storage.ts`: IndexedDB database lifecycle and repository boundary. Database version 2 stores profile, settings, workout sessions with nested set records, weigh-ins, meal entries, and recovery entries. Upgrades create missing stores; all writes run in one transaction.
- `src/evidence/evidenceRegistry.ts`: documented rules and evidence levels. The app does not calculate numeric readiness, adaptive expenditure, or prescriptive nutrition targets.
- `src/main.tsx`: user flows and screen composition. Each state change persists through the repository adapter.
- `public/sw.js`: caches the Pages app shell and same-origin assets after successful fetches, then uses the cache when offline.

This is a small first release slice. It does not yet have a full domain repository per entity, event sourcing, cloud merge, or an in-place migration from the previous prototype's localStorage demo. The former prototype values were demonstration content and are intentionally not carried into the new app.

## Offline and deployment

The first visit requires network access to download app files. The service worker registers only in production under `/bodymade/`. IndexedDB data stays in the current browser profile. Static app assets are cached as the user opens them; an offline reload is supported after the first successful load.

CI runs lint, strict typecheck, unit tests, production build, Playwright flows, and an axe scan before uploading the Pages artifact. The deployment job only runs after those commands pass.
