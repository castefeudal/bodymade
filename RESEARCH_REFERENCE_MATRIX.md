# BODYMADE 2.0 — Research Reference Matrix

Research date: 2026-09-27

BODYMADE is not to be based on the current BODYMADE implementation. The existing repository is only the deployment target and a source of any already-cleared first-party assets/data. The product must be re-designed from first principles.

## Commercial / proprietary product benchmarks

### Strength training and workout execution
- Hevy — low-friction logging, routines, previous-performance context, progressive overload, wearable support, social layer.
- Strong — minimal workout logger, templates, timers, plate math, Apple Watch, advanced charts.
- Boostcamp — large program library, coach programs, tracker, RPE/RIR, e1RM, muscle-volume analytics.
- Alpha Progression — plan generation, precise weight/rep progression recommendations, curated exercise videos, muscle-priority planning.
- Fitbod — adaptive exercise selection, equipment-aware workouts, duration-aware session generation, muscle-recovery model, recommendations learned from prior logs.
- RP Hypertrophy — mesocycle structure, muscle priorities, autoregulated hypertrophy workflow.
- Ladder — coached daily programming, in-ear guidance, pacing, polished training experience.
- TrainerRoad — best reference for explainable adaptive planning and forward-looking training simulation. Borrow the decision pattern, not cycling-specific UI.

### Nutrition
- MacroFactor — best reference for adherence-neutral adaptive expenditure, smoothed weight trend, coached/collaborative/manual modes, weekly check-ins and transparent recommendation logic.
- Cronometer — best reference for micronutrient depth, nutrient provenance and detailed food analysis.
- MyFitnessPal — best reference for rapid logging UX: text, barcode, meal scan, voice, recipes, restaurant/branded foods.
- YAZIO — simple onboarding, goals, fasting and habit-oriented food UX.

### Recovery, wearables and daily readiness
- WHOOP — strain/recovery/sleep feedback loop and behavior journaling.
- Oura — readiness contributors, personal baselines, sleep/activity clarity.
- Garmin — training readiness, acute load, HRV, stress history, Body Battery concepts.
- Bevel — 2026 benchmark for combining recovery, sleep, strain, nutrition, strength builder, blood pressure, health records, biological-age style longitudinal views and AI assistance.
- Levels — reference for combining daily behavior, food, wearable context, labs and long-term metabolic trends in one coherent system.

## Open-source / source-available benchmarks

- the-momentum/open-wearables — MIT. Strong reference for normalized wearable data, import/provider adapters and AI-ready health data architecture.
- yuhonas/free-exercise-db — Unlicense/public-domain dataset. Strong starting point for exercise taxonomy and structured instructions; verify media provenance separately.
- wger-project/wger — AGPL-3.0. Study its exercise/nutrition/weight domain model, API boundaries and multilingual architecture. Do not copy code into BODYMADE unless AGPL obligations are intentionally accepted.
- DuarteSantos8/openGym — AGPL-3.0. Strong reference for workout-run UX, progression models, import/export, PWA/offline behavior, muscle maps, guided workouts and local/self-hosted privacy.
- simonoppowa/OpenNutriTracker — GPL-3.0. Strong reference for cited calculations, nutrition UX, local privacy, export/import and data-source provenance. Do not copy GPL code unless license obligations are intentionally accepted.
- CodeWithCJ/SparkyFitness — source-available, non-commercial. Study product coverage and architecture only unless explicit commercial permission is obtained.
- endurain-project/endurain — AGPL-3.0. Reference for self-hosted endurance/activity history and privacy.
- hasaneyldrm/exercises-dataset — valuable exercise metadata and multilingual instruction reference; media ownership/licensing is separate and must not be assumed from repository visibility.

## Scientific / normative references

- ACSM 2026 Position Stand: Resistance Training Prescription for Muscle Function, Hypertrophy, and Physical Performance in Healthy Adults.
- WHO Guidelines on Physical Activity and Sedentary Behaviour.
- USDA FoodData Central for reusable food nutrient data (CC0 datasets).
- Open Food Facts for branded-food lookup subject to its own database/content licensing and attribution requirements.
- National food databases only when their reuse license and attribution are documented.

## What BODYMADE should synthesize

1. Strong/Hevy-level logging speed.
2. Alpha Progression/Fitbod-level adaptation.
3. TrainerRoad-level explainability and forward planning.
4. MacroFactor-level nutrition feedback loop.
5. Cronometer-level nutrient depth.
6. Oura/WHOOP/Garmin/Bevel-level recovery context.
7. Levels-style longitudinal health context.
8. Open Wearables-style provider abstraction.
9. Local-first privacy and true offline operation.
10. One coherent Today screen that converts all signals into the next useful action.

## Source policy

Public availability is not a license grant.

- Proprietary commercial products: learn from workflows, information architecture and interaction patterns. Reimplement independently. Do not copy proprietary source, images, videos, text or distinctive visual trade dress.
- MIT / permissive code: may be reused when license notice and attribution obligations are preserved.
- GPL / AGPL code: do not paste or derive code into BODYMADE unless the repository owner intentionally accepts the resulting copyleft obligations.
- Non-commercial licenses: do not use in a commercial-capable BODYMADE build without explicit permission.
- Datasets and media: track code/data/media separately. A permissive metadata license does not imply that linked images, GIFs or videos are free to reuse.
- Maintain THIRD_PARTY_NOTICES.md plus machine-readable provenance metadata for every imported source.
- When rights are unclear, use the source only as a behavioral/structural reference and create original implementation/assets.
