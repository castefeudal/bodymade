# Data model

The initial model contains:

- `AppState`: onboarding state, user mode, active workout flag, completed session count, logged sets and body-weight readings.
- `Exercise`: stable id, localized-ready name, muscle, movement group, equipment, target sets/reps, previous performance and coaching cue.
- `LoggedSet`: exercise id, ordinal set, load, reps and completion state.

The source exercise dataset is retained as an optional lazy asset under `public/data/exercises-compact.json`; its multilingual content and attribution are not on the critical Today path.

Future migrations must be additive and preserve `LoggedSet` records. Corrupt imports should be rejected before replacing local state.
