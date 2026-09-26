# BODYMADE — Health & Performance OS

Local-first PWA for training, nutrition, recovery, and body tracking. Core records remain in browser IndexedDB; no account, backend, AI service, telemetry, or health upload is required.

## Current build

- Today view gives one transparent next action from actual local records and shows “not enough data” for readiness.
- Training A has an exercise starter library, live set logging, RIR, rest timer, and an unfinished workout that survives reload.
- Nutrition tracks manually entered calories and macros with clear “no target set” state.
- Recovery records sleep and subjective energy, soreness, and stress without turning them into a readiness score.
- Progress shows completed sessions, recorded sets, weigh-ins, meals, weight trend after three or more measurements, and an Epley e1RM estimate from recorded sets.
- Health supports private body-mass entries. Settings support RU/EN copy, dark/light themes, JSON backup export, validated import preview with merge/replace, and local data deletion.
- Responsive desktop and mobile navigation, command search, installable manifest, and offline app shell. Russian is the primary UI language; the English switch currently translates only common navigation and form labels, not the whole interface.

This is a functional foundation, not completion of the entire Health & Performance OS brief. Missing systems include full program editing/generation and progression recommendations, food catalog/barcode/recipes and adaptive expenditure, wearables, detailed health records, the requested 17 complete localizations, device-scale exercise content, AI adapters, and expanded import formats. See `DATA_MODEL.md` and `SOURCES.md` for scope.

## Develop and verify

```sh
npm ci
npm run dev
npm run lint
npm run typecheck
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

The Vite `base` is `/bodymade/`. Production is deployed by GitHub Actions to GitHub Pages after all CI checks pass.

## Documentation

- `ARCHITECTURE.md` — runtime, persistence, offline and deployment boundaries
- `DATA_MODEL.md` — IndexedDB stores and export envelope
- `SOURCES.md` — research and evidence reviewed, including areas not audited
- `THIRD_PARTY_NOTICES.md` — dependency and content notices
- `PRIVACY.md` — local storage and data controls
- `QA_REPORT.md` — checks actually run
