# BODYMADE 2.0 — Luna 6 Master Build Prompt

## ROLE

You are Luna 6 operating at maximum/high reasoning as a senior product architect, staff frontend engineer, data-model designer, UX lead, evidence-oriented fitness product specialist and QA owner.

You have write access to:

- Repository: https://github.com/castefeudal/bodymade
- Production target: GitHub Pages for this repository (base path `/bodymade/`)

Your job is not to propose improvements. Your job is to fully rebuild BODYMADE into a production-ready global Health & Performance OS and commit/deploy the finished result.

Do not preserve the current BODYMADE architecture, navigation, visuals, components or data model merely because they already exist. Treat the existing project as disposable unless a piece is objectively useful. The current repository is the destination, not the benchmark.

## CORE PRODUCT THESIS

BODYMADE must become one coherent system for:

goal -> daily state -> training -> nutrition -> recovery -> body trend -> health context -> insight -> next best action -> adaptation.

It should feel like the best parts of a world-class strength coach, nutrition coach, recovery dashboard and quantified-self platform were designed as one product from day one.

Do not build a dashboard full of passive metrics. Every important metric should answer at least one of:

- What changed?
- Why does it matter?
- What should I do next?
- How confident are we?
- Which data caused this recommendation?

The product must remain useful even if the user never connects a wearable and never uses AI.

## BENCHMARKS TO STUDY BEFORE IMPLEMENTATION

Study the current public product experience/documentation for these products and abstract the strongest patterns:

Training:
- Hevy
- Strong
- Boostcamp
- Alpha Progression
- Fitbod
- RP Hypertrophy
- Ladder
- TrainerRoad

Nutrition:
- MacroFactor
- Cronometer
- MyFitnessPal
- YAZIO

Recovery / health:
- WHOOP
- Oura
- Garmin Connect / Training Readiness / Body Battery
- Bevel
- Levels

Open-source/reference architecture:
- the-momentum/open-wearables
- yuhonas/free-exercise-db
- wger-project/wger
- DuarteSantos8/openGym
- simonoppowa/OpenNutriTracker
- CodeWithCJ/SparkyFitness
- endurain-project/endurain
- hasaneyldrm/exercises-dataset

Do not output an audit as your main deliverable. Use the research to make the implementation better.

## SOURCE / COPYRIGHT / LICENSE POLICY — MANDATORY

You may inspect any publicly available site, public repository, documentation, research paper or public dataset as a reference.

Public availability is NOT automatic permission to copy.

Rules:
1. Proprietary products: copy no proprietary source code, paid text, images, videos or distinctive visual assets. Reimplement workflows and generic interaction ideas independently.
2. MIT/BSD/Apache/permissive sources: code/data may be reused only while preserving required notices and attribution.
3. GPL/AGPL sources: do not paste or derive their code into BODYMADE unless you intentionally make the resulting work compliant with the corresponding copyleft license. Prefer independent reimplementation.
4. Non-commercial/source-available projects: research only unless explicit commercial permission exists.
5. Dataset metadata and media are separate rights. Never assume exercise GIF/video rights from a metadata license.
6. Existing first-party assets already in castefeudal repositories may be reused only when provenance/rights are already documented by the repository owner.
7. Create and maintain `THIRD_PARTY_NOTICES.md` and a machine-readable provenance registry for every imported dataset, code fragment or media source.
8. If rights are unclear, do not import the asset. Recreate an original equivalent or use text/diagram-based instruction.

## EVIDENCE STANDARD

Fitness, nutrition and health logic must be evidence-oriented and transparent.

Use primarily:
- current ACSM position stands and major consensus statements;
- WHO guidance;
- systematic reviews/meta-analyses;
- high-quality primary evidence where needed;
- national/open nutrition databases for nutrient values.

In particular, incorporate the 2026 ACSM resistance-training position stand rather than relying on obsolete 2009 heuristics as the sole authority.

Create:
- `src/evidence/evidenceRegistry.ts`
- `SOURCES.md`

Every rule that materially changes a training or nutrition recommendation must have:
- id;
- topic;
- plain-language rationale;
- evidence strength: high / moderate / low / heuristic;
- population/applicability;
- source URL/DOI;
- last reviewed date.

Never present heuristics as medical truth.

## PLATFORM STRATEGY

BODYMADE must be a local-first installable PWA that works on GitHub Pages with no required backend.

Core requirements:
- React + TypeScript + Vite or a demonstrably better static-compatible stack.
- Versioned IndexedDB persistence; do not use localStorage as the primary domain database.
- Repository/service layer so persistence can later be swapped.
- PWA service worker and offline shell.
- Reload-safe active workout.
- Import/export that never requires an account.
- No telemetry by default.
- No bundled API secrets.
- Optional network integrations must degrade cleanly when offline or blocked.
- All fake/demo data must be explicitly labeled Demo and isolated from real user data.

If a feature cannot truthfully work on static GitHub Pages (for example native HealthKit access or a provider OAuth flow requiring a secret), do NOT fake it. Implement:
- a clean adapter/interface;
- import path when feasible;
- feature-flagged integration shell;
- clear status text;
- original UI;
- tests for the adapter boundary.

## INFORMATION ARCHITECTURE

Desktop primary navigation:
1. Today
2. Train
3. Nutrition
4. Recovery
5. Progress
6. Health
7. Library
8. Coach
9. More / Settings

Mobile bottom navigation:
- Today
- Train
- Nutrition
- Progress
- More

Recovery, Health, Library and Coach live in More or context-sensitive shortcuts on mobile.

Global command/search:
- keyboard accessible;
- search exercises, foods, workouts, metrics, settings and help;
- quick actions such as log weight, start workout, add meal, record sleep, export backup.

## FIRST-RUN EXPERIENCE

Offer two first-run paths:
- Start my profile
- Explore demo

Onboarding must be progressive, short and skippable.

Collect only what changes recommendations:
- main goal: build muscle / strength / fat loss / maintain / general health / performance;
- experience;
- height/weight and optional body-fat estimate;
- preferred units;
- days/week;
- session duration;
- equipment / gym profile;
- priority muscle groups;
- disliked/excluded exercises;
- optional limitations;
- nutrition mode;
- whether the user wants recovery tracking;
- language.

Do not force unnecessary demographics.

## TODAY — THE PRODUCT CENTER

Today must be the strongest screen.

It should contain:

### 1. State / Readiness
A 0-100 score only if data sufficiency supports it.
If not, show "Not enough data" instead of invented precision.

Possible contributors:
- sleep duration/quality;
- HRV relative to personal baseline if available;
- resting heart rate relative to baseline;
- recent training load;
- soreness;
- subjective energy;
- stress;
- steps/activity;
- active illness/injury flag only as user-entered context.

Always show:
- contributor breakdown;
- data age;
- confidence: low / medium / high;
- what is missing.

### 2. Next Best Action
One primary action:
- start planned training;
- modify session duration;
- recovery day;
- log missing nutrition;
- weigh in;
- complete weekly check-in;
- resume active workout;
- adjust program;
- take no action.

Every action must contain "Why this?" with concrete data.

### 3. Day route
Timeline/checklist combining:
- planned training;
- nutrition status;
- movement/steps;
- sleep/recovery;
- optional habits.

### 4. Compact signal cards
Only high-value signals:
- body-weight trend;
- calorie/protein progress;
- readiness;
- weekly training adherence;
- progression opportunities.

Do not create dashboard clutter.

## TRAINING SYSTEM

### Plan generator
Generate a full program from:
- goal;
- experience;
- frequency;
- available equipment;
- session duration;
- muscle priorities;
- exercise preferences;
- optional constraints.

Support:
- full body;
- upper/lower;
- push/pull/legs;
- powerbuilding;
- hypertrophy;
- minimalist;
- home/dumbbell;
- custom.

A generated plan is always editable.

### Program model
Represent:
- program;
- mesocycle/block;
- week;
- session template;
- exercise prescription;
- target sets;
- target rep range;
- target RIR/RPE;
- rest time;
- progression model;
- substitutions;
- notes.

### Progression
Support at least:
- double progression;
- linear load progression;
- rep progression;
- RIR/RPE-guided progression;
- time/distance progression;
- bodyweight progression;
- manual.

Recommendations must use actual logged history and available weight increments.

Show:
- next suggested weight/reps;
- reason;
- confidence;
- reference performances.

Do not require every set to beat the previous set.

### Workout Run Mode
This is a high-priority UX surface.

Must support:
- sets/reps/load;
- RIR and RPE;
- warm-up sets;
- drop sets;
- rest-pause;
- AMRAP;
- supersets/circuits;
- unilateral sets;
- bodyweight exercises;
- timed sets;
- distance/cardio;
- per-exercise rest timer;
- plate calculator;
- warm-up calculator;
- wake lock when available;
- notes;
- last-performance context;
- current progression target;
- reorder/add/remove/replace mid-workout;
- exercise substitution by equipment/movement/muscle;
- reduce session to available time;
- offline usage;
- crash/reload recovery.

Use large tap targets and one-handed mobile ergonomics.

### Exercise detail — extremely complete
For every exercise display:
- localized name and aliases;
- primary/secondary muscles;
- movement pattern;
- equipment;
- level;
- setup;
- execution steps;
- breathing/bracing cues;
- ROM cues;
- common mistakes;
- regression/progression;
- substitution options;
- unilateral/bilateral;
- tempo notes where useful;
- safety notes that are factual and non-alarmist;
- user's history;
- best sets/e1RM;
- notes;
- source/provenance.

Media:
- show only cleared/licensed media;
- no broken GIF/video states;
- lazy load;
- preserve full aspect ratio;
- provide poster/fallback;
- never crop away the working body position;
- allow expand/fullscreen;
- if no cleared media exists, use original SVG/diagram and complete text rather than questionable third-party media.

### Strength analytics
Calculate from real data:
- e1RM with documented formula and applicability limits;
- PRs;
- volume/load;
- hard sets per muscle;
- adherence;
- frequency;
- progression rate;
- session duration;
- movement balance;
- optional muscle heatmap.

Never hard-code fake historical charts.

### Training load / muscle fatigue
You may implement a heuristic recovery model, but:
- label it as an estimate;
- expose inputs;
- do not claim tissue recovery is directly measured;
- use personal response/history when sufficient;
- allow user override.

## NUTRITION SYSTEM

### Logging UX
Support multiple fast paths:
- search;
- recent foods;
- favorites;
- saved meals;
- recipes;
- custom foods;
- quick calories/macros;
- barcode when supported;
- text/voice input when supported;
- optional AI/photo parsing only behind an explicit adapter and always editable.

The UI must make correction faster than accepting a bad estimate.

### Nutrition data
Track:
- energy;
- protein;
- carbs;
- fat;
- fiber;
- sugar;
- saturated fat;
- sodium;
- key vitamins/minerals when source data supports them.

Show data provenance per food.

### Nutrition modes
- Coached
- Collaborative
- Manual

### Initial energy target
Use a documented evidence-based equation and explain its limitations.
Allow:
- Mifflin-St Jeor by default;
- Cunningham when reliable lean-mass data is provided;
- manual expenditure override.

### Adaptive expenditure
Implement an independent, transparent adaptive TDEE/expenditure engine inspired by the general feedback-loop principle used by modern coaching apps:

inputs:
- logged energy intake;
- smoothed/trend body weight;
- time.

requirements:
- robust weight smoothing;
- missing-data handling;
- confidence state;
- no reaction to single-day scale noise;
- bounded weekly changes;
- adherence-neutral logic: use what the user actually consumed, not the target;
- pause/hold behavior when data are insufficient;
- clear explanation of why expenditure changed.

Do not copy proprietary MacroFactor formulas/code.

### Weekly nutrition check-in
Show:
- goal rate;
- observed trend;
- estimated expenditure;
- logging completeness;
- suggested calorie change;
- reason;
- confidence.

No daily panic adjustments.

### Food sources
Prefer reusable data sources with documented rights.
Support an adapter strategy for:
- USDA FoodData Central;
- Open Food Facts;
- additional national datasets with explicit licensing.

Keep source and license metadata.

## RECOVERY SYSTEM

Support both manual and imported data.

Core signals:
- sleep duration;
- sleep regularity;
- subjective sleep quality;
- resting heart rate;
- HRV relative to personal baseline;
- daily stress;
- recent training load;
- steps/activity;
- soreness;
- energy.

Use personal baselines rather than population cutoffs where appropriate.

Create:
- Recovery score / readiness only when data sufficiency permits;
- sleep page;
- strain/load page;
- behavior journal;
- contributor trends;
- "what changed" explanations.

Do not diagnose illness from consumer wearable data.

## PROGRESS

Unified progress should answer whether the plan is working.

Views:
- 7d / 30d / 90d / 6m / 1y / all time;
- training;
- body;
- nutrition;
- recovery;
- adherence.

Show:
- strength trends;
- muscle volume;
- body-weight trend;
- waist/measurements;
- calorie/expenditure trends;
- protein adherence;
- sleep/recovery;
- training consistency;
- milestones.

Provide a weekly report:
- wins;
- regressions;
- uncertainty;
- highest-leverage adjustment;
- no-change recommendation when no change is warranted.

## HEALTH

This is wellness/health context, not diagnosis.

Allow optional tracking/import of:
- blood pressure;
- resting HR;
- HRV;
- glucose where available;
- body composition;
- labs/biomarkers;
- DEXA summary;
- progress photos;
- menstrual-cycle context if the user enables it.

For labs:
- manual structured entry plus file metadata;
- chart trends;
- reference ranges only when sourced and units are explicit;
- never independently diagnose disease;
- always distinguish measured value from interpretation.

## COACH

Core coaching must work without an LLM.

Build a deterministic local decision engine that generates:
- next best action;
- progression suggestions;
- weekly review;
- training substitutions;
- nutrition check-in;
- recovery adjustments.

Every recommendation should be explainable with:
- inputs used;
- rule/evidence id;
- confidence.

Optional AI layer:
- adapter interface only;
- no bundled secret;
- do not persist API keys by default;
- AI may summarize/explain, but must not silently overwrite the deterministic plan;
- any proposed change is reviewable before applying.

Also provide "Copy context for AI" export so users can analyze their own BODYMADE data with an external assistant.

## CALCULATORS — ONLY HIGH-ROI

Include calculators only when they change decisions:
- TDEE/energy target;
- macro target;
- weight trend;
- rate of gain/loss;
- e1RM;
- plate calculator;
- warm-up sets;
- strength-to-bodyweight;
- training volume;
- pace/speed conversions;
- estimated session time.

Do not fill the product with novelty calculators.

## IMPORT / EXPORT

High priority.

Import adapters where feasible for:
- Strong CSV;
- Hevy CSV/API export formats if publicly documented;
- FitNotes;
- generic workout CSV;
- Apple Health XML export;
- generic body-weight CSV;
- generic nutrition CSV/JSON.

Export:
- full BODYMADE JSON;
- workout CSV;
- body-weight CSV;
- nutrition CSV;
- shareable program JSON.

Requirements:
- schema version;
- validation before import;
- dry-run preview;
- merge/replace choice;
- duplicate handling;
- rollback safety.

Optional encrypted backup:
- Web Crypto AES-GCM;
- user passphrase;
- never invent password recovery.

## DATA MODEL

Use normalized, versioned domain entities, not giant component state.

At minimum:
- Profile
- Goal
- EquipmentProfile
- Exercise
- ExerciseAlias
- Program
- TrainingBlock
- SessionTemplate
- ExercisePrescription
- WorkoutSession
- LoggedSet
- CardioSet
- BodyMeasurement
- WeightEntry
- Food
- FoodSource
- Recipe
- Meal
- FoodLogEntry
- NutritionTarget
- ExpenditureEstimate
- SleepEntry
- RecoveryEntry
- ReadinessSnapshot
- DailyJournal
- HealthMetric
- LabMarker
- Insight
- Recommendation
- EvidenceRef
- ImportJob
- AppSettings

Every record that can come from an external source should retain provenance.

## LOCALIZATION

Russian is the priority language and must have the best editorial quality.

Ship production localization for at least:
- ru
- en
- es
- pt-BR
- zh-CN
- hi
- ar
- fr
- de
- ja
- ko
- tr
- id
- it
- pl
- uk

Architecture must make adding languages trivial.

Requirements:
- no user-facing hard-coded strings in components;
- pluralization;
- locale-aware dates/numbers;
- kg/lb and cm/in;
- kcal/kJ where relevant;
- RTL support for Arabic;
- font fallback that supports all scripts;
- language switch without reload;
- fallback chain that never exposes raw translation keys.

Russian copy should not sound machine-translated.

## DESIGN DIRECTION

Create a completely new visual system.

Positioning:
premium sports science + quiet luxury + high-performance instrumentation.

Avoid:
- generic admin dashboard;
- cheap neon gamer UI;
- excessive glassmorphism;
- huge empty cards;
- random gradients;
- dense medical-chart aesthetic;
- copied visual identity of WHOOP/Oura/Hevy/etc.

Desired:
- dark mode as signature;
- excellent light mode too;
- near-black/graphite surfaces;
- warm off-white text;
- one energetic performance accent plus one recovery accent;
- strict semantic status colors;
- refined typography;
- compact but breathable information density;
- sharp hierarchy;
- subtle depth;
- sophisticated charting;
- tactile microinteractions;
- premium skeleton/loading states;
- intentional empty states;
- no layout jump.

Use a tokenized design system:
- color;
- spacing;
- radius;
- typography;
- motion;
- elevation;
- z-index;
- density.

Support three density modes if useful:
- Guided
- Performance
- Coach/Analyst

### Motion
Use motion only for:
- state transitions;
- workout completion;
- timer feedback;
- charts entering;
- route transitions;
- loading progress.

Respect prefers-reduced-motion.

### Loading
Build a real branded boot/loading experience:
- instant painted shell;
- BODYMADE mark;
- short progress phases;
- no endless spinner;
- hard timeout/error recovery;
- never block on exercise-media download.

## RESPONSIVE QUALITY

Design mobile-first but make desktop first-class.

Test at minimum:
- 320x568
- 375x812
- 390x844
- 430x932
- 768x1024
- 1024x768
- 1280x800
- 1440x900
- 1920x1080

No horizontal overflow except intentional tables/charts with controlled scrolling.

Workout Run Mode must be excellent on a phone in one hand.

## ACCESSIBILITY

Target WCAG 2.2 AA.

Mandatory:
- semantic landmarks;
- keyboard navigation;
- visible focus;
- screen-reader labels;
- no color-only state;
- sufficient contrast;
- touch targets >= 44x44 where practical;
- reduced motion;
- chart summaries in text;
- accessible dialogs;
- focus trapping/restoration;
- form errors tied to fields.

Accessibility failures are release blockers.

## PERFORMANCE

Targets on production build:
- no blocking remote font dependency; self-host or system-stack fonts where possible;
- initial app JS target <= 250 kB gzip if practical;
- lazy-load heavy routes and datasets;
- lazy-load all exercise media;
- virtualize large food/exercise lists;
- route-level code splitting;
- image dimensions declared;
- modern formats;
- LCP < 2.5 s on reasonable mid-tier mobile profile;
- CLS < 0.1;
- INP < 200 ms target;
- no request waterfall that blocks Today.

Exercise/food datasets must not be parsed synchronously on initial render.

## SECURITY / PRIVACY

- Local-first by default.
- No analytics SDK by default.
- No health data sent anywhere without explicit user action.
- Sanitize imported content.
- Validate all schemas.
- Do not render arbitrary HTML from imports.
- Avoid eval/dynamic code execution.
- Content Security Policy compatible with GitHub Pages where feasible.
- Dependency audit.
- Never commit secrets.
- Clear data / export data / reset demo controls.
- Privacy page written in plain language.

## MEDICAL / SAFETY BOUNDARY

BODYMADE is not a diagnostic medical product.

Do:
- present measured data;
- show trends;
- cite general health guidance;
- encourage professional evaluation for red-flag situations.

Do not:
- diagnose;
- recommend prescription drug dosing;
- interpret abnormal labs as a diagnosis;
- imply wearable scores can rule disease in/out.

## TESTING

Add and enforce:
- TypeScript strict mode;
- ESLint;
- unit tests for domain calculations;
- migration tests;
- import/export round-trip tests;
- persistence tests;
- React Testing Library for core interactions;
- Playwright end-to-end tests;
- axe accessibility checks;
- production-build smoke test.

Critical E2E flows:
1. first-run onboarding;
2. create program;
3. start workout;
4. log/reload/resume;
5. finish workout;
6. see progress update from real logged data;
7. log weight;
8. add meal;
9. nutrition check-in;
10. recovery manual log;
11. export backup;
12. import backup;
13. language switch;
14. mobile navigation;
15. offline reload.

No claim of passing QA unless the command actually passed.

## CI / GITHUB PAGES

Preserve the repository path deployment: `/bodymade/`.

Create/repair GitHub Actions so main branch:
1. npm ci
2. lint
3. typecheck
4. unit tests
5. build
6. Playwright smoke/E2E
7. accessibility smoke
8. deploy Pages only after required checks pass

Make routing GitHub-Pages-safe.

PWA manifest and service worker paths must work under `/bodymade/`.

After deployment, verify the public site and fix:
- 404s;
- asset path issues;
- service-worker scope;
- broken media;
- console errors;
- mobile overflow.

## DOCUMENTATION TO LEAVE IN REPOSITORY

Create/update:
- README.md
- ARCHITECTURE.md
- DATA_MODEL.md
- SOURCES.md
- THIRD_PARTY_NOTICES.md
- PRIVACY.md
- QA_REPORT.md
- CHANGELOG.md

README must explain:
- what BODYMADE is;
- local setup;
- build/test commands;
- local-first privacy;
- supported languages;
- import/export;
- data/source policy.

QA_REPORT must contain only measured results.

## WORK SEQUENCE

Do not stop after a mockup.

1. Inspect repository and current Pages workflow.
2. Research benchmark products and current evidence.
3. Define architecture and migration strategy internally.
4. Replace the weak current implementation rather than layering over it.
5. Build domain model and persistence first.
6. Build Today + Training + Nutrition as the primary vertical slice.
7. Add Recovery, Progress, Health, Library and Coach.
8. Add localization.
9. Add import/export.
10. Finish responsive design, loading, offline and accessibility.
11. Add tests and CI.
12. Run all checks.
13. Inspect production build.
14. Commit coherent changes.
15. Push to main.
16. Verify GitHub Pages.
17. Fix all deployment regressions.
18. Finish only when the acceptance criteria below are met.

## ACCEPTANCE CRITERIA

The task is incomplete unless all are true:

### Product
- No core screen is a static mock.
- Important numbers come from persisted data or are explicitly Demo.
- Training, nutrition, recovery and body data affect recommendations.
- Every recommendation can explain why.
- Core app works without account/backend/AI.
- Active workout survives reload.
- Import/export works.
- Russian is complete and excellent.
- Language switching works.
- Mobile is first-class.

### Design
- New original BODYMADE identity.
- No resemblance to the old BODYMADE layout merely for convenience.
- No broken states.
- No unreadable charts.
- No accidental clipping.
- No cheap/generic component-library look.
- Both dark and light themes are coherent.

### Engineering
- Versioned IndexedDB.
- Strict typing.
- No console errors on core flows.
- No hard-coded fake analytics.
- No secrets.
- Source/licensing provenance documented.
- GitHub Pages base path correct.
- PWA works after first load offline.

### QA
- lint passes;
- typecheck passes;
- unit tests pass;
- build passes;
- Playwright core flows pass;
- accessibility smoke passes;
- production Pages URL loads correctly.

## FINAL AGENT RESPONSE

When the implementation is actually finished, respond with:
1. concise summary of what was rebuilt;
2. final commit SHA(s);
3. production URL;
4. measured test/build results;
5. any remaining limitations that are genuinely external (for example a native wearable OAuth provider requiring credentials).

Do not report future work as completed.
Do not leave placeholder TODOs for core functionality.
Do not stop after producing a plan.
