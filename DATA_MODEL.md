# Data model

IndexedDB database: `bodymade-local`, schema version 2. Records use stable string IDs. Dates are stored as ISO date strings; timestamps are ISO 8601 strings.

| Store | Record fields | Notes |
| --- | --- | --- |
| `profile` | `id`, `name`, `goal`, `units` | One local profile record. |
| `settings` | `id`, `theme`, `locale` | One local preference record. |
| `workouts` | `id`, `startedAt`, `endedAt?`, `sets[]` | Active sessions stay unfinished until the user completes them. |
| `weights` | `id`, `date`, `kg` | Raw user weigh-ins; trend is calculated from multiple values. |
| `meals` | `id`, `date`, `name`, `kcal`, `protein`, `carbs`, `fat` | User-entered nutrient estimates; no food database is bundled. |
| `recovery` | `id`, `date`, `sleepHours`, `energy`, `soreness`, `stress`, `note` | Manual self-report; no readiness score is inferred. |

JSON export envelope uses `schemaVersion: 1`; import validates the envelope and primitive fields, previews the number of records, then allows merge by ID or full replacement. Workouts contain logged sets with exercise ID/name, load, reps, RIR, and timestamp. No health record is sent to a server.

This first slice does not yet model programs/mesocycles, foods/sources/recipes, body measurements, imported wearable records, labs, or recommendation history as separate normalized entities.
