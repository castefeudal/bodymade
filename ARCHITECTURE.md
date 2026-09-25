# Architecture

`src/domain.ts` owns exercise contracts, persistence-safe app state, trend calculation, progression and the decision engine. React components render state and dispatch explicit actions; recommendation logic is not embedded in layout components.

The current app uses a small localStorage adapter to make the active workout reload-safe without a backend. This is intentionally replaceable with IndexedDB. `src/main.tsx` is the first vertical slice; future routes should split by feature once the product expands beyond the core loop.

The app uses a non-root Vite base (`/bodymade/`) and a standalone manifest so the same build works on GitHub Pages.
