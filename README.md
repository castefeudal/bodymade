# BODYMADE

BODYMADE is a local-first training operating system: goal → plan → today → logged work → progression → next decision. This repository is a standalone product and does not modify MARKOVGYM.

## Current vertical slice

- Today with an explainable Next Best Action and evidence line
- Editable weekly programme view with previous performance in context
- Run Mode with set completion, rest affordances and reload-safe local state
- Progress signal: strength trend, adherence, muscle distribution
- Body trend weight with 7-day smoothing and optional quick log
- Lazy-friendly exercise library shell with search and substitution-ready metadata
- Guided / Performance / Coach mode switch
- Mobile navigation and responsive gym-first layouts

## Local setup

```bash
npm install
npm run dev
```

`npm run build` produces a GitHub Pages-ready build with `/bodymade/` base paths.

## Quality

```bash
npm run typecheck
npm test
npm run build
```

State is local-first through `localStorage`; no health-like data leaves the browser. The next persistence increment should replace the adapter with versioned IndexedDB while retaining the same domain API.
