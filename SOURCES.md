# Sources and product research

Reviewed 2026-09-27. This is a first implementation research record, not a claim that every product or repository in the original brief received a feature-by-feature audit.

## Product patterns reviewed

- [Hevy features](https://www.hevyapp.com/features/) and [workout logging](https://www.hevyapp.com/features/track-workouts/): routines, logging, exercise history, and rest timers make the active session the primary workflow. BODYMADE adopts the fast set-entry and visible active-session ideas, with its own visual design and implementation.
- [Strong workout logging help](https://help.strongapp.io/category/165-logging-a-workout): templates and rest timing are core workout flows. BODYMADE keeps the work-in-progress session visible and reload-safe.
- [Fitbod: how workout recommendations work](https://help.fitbod.me/hc/en-us/sections/360001078993-How-Fitbod-Works): recommendations can use goal, experience, available equipment, duration, preferences, training history, and recovery. BODYMADE does not claim adaptive programming yet; this list informs future inputs.
- [MacroFactor: expenditure](https://help.macrofactorapp.com/dashboard/expenditure) and [weight trend](https://help.macrofactorapp.com/dashboard/weight_trend): a nutrition feedback loop depends on both intake and a trend in body mass, and uses smoothing to handle daily noise. BODYMADE currently records intake and weight separately and intentionally does not infer expenditure or adjust calories.
- [WHOOP: personal HRV baseline](https://www.whoop.com/us/en/thelocker/member-averages-recovery-strain-sleep-hrv/): HRV interpretation is individual. BODYMADE therefore leaves readiness unavailable without a personal baseline and sufficient signals; it does not reproduce WHOOP scoring.

These are public product descriptions and help pages, not independent product tests. No proprietary copy, code, screenshots, or product assets were imported.

## Evidence used in the application

- [ACSM 2026 Resistance Training Position Stand overview](https://acsm.org/education-resources/pronouncements-scientific-communications/position-stands/) and [official summary infographic](https://www.acsm.org/wp-content/uploads/2026/03/Resistance-Training-Position-Stand-infographic.pdf). Used to favor a sustainable, goal-matched, equipment-aware plan. BODYMADE does not claim that the current starter routine is individually optimal.
- [WHO Guidelines on Physical Activity and Sedentary Behaviour: at a glance](https://www.who.int/europe/publications/i/item/9789240014886). The current app does not calculate whether a user meets the guideline.
- Epley, B. (1985), *Poundage Chart*. The Epley equation is presented as a rough estimate from recorded sets, not as a measured maximum or a training prescription.

Evidence metadata for app rules is kept in [`src/evidence/evidenceRegistry.ts`](src/evidence/evidenceRegistry.ts). `heuristic` entries describe product behavior rather than scientific outcomes.

## Open-source architecture and licensing review

- [Open Wearables](https://github.com/the-momentum/open-wearables): inspected as an example of normalizing provider-specific health records. BODYMADE does not import its code or connect providers.
- [wger](https://github.com/wger-project/wger): its own application code is AGPL-3.0-or-later and its exercise/ingredient content has separate CC BY-SA terms. Used as a taxonomy/data-model reference only; no code, exercise text, or media copied.
- [openGym](https://github.com/DuarteSantos8/openGym): repository identifies its code as AGPL and its exercise content/media has separate provenance. Reference only; no code, text, images, or animations copied.
- [OpenNutriTracker](https://github.com/simonoppowa/OpenNutriTracker): GPLv3; reference only.
- [SparkyFitness](https://github.com/CodeWithCJ/SparkyFitness): reviewed as an example of a broad self-hosted fitness and nutrition product. No code or data copied.
- [Endurain](https://github.com/endurain-project/endurain): AGPL-3.0; reference only.
- [free-exercise-db](https://github.com/yuhonas/free-exercise-db) and [exercises-dataset](https://github.com/hasaneyldrm/exercises-dataset): no records or media imported because their asset-level provenance has not been verified for this release.

## Not audited in this release

The brief also names Boostcamp, Alpha Progression, RP Hypertrophy, Ladder, TrainerRoad, Cronometer, MyFitnessPal, YAZIO, Oura, Garmin Connect, Bevel, Levels, and several additional open datasets. Their current feature sets have not been researched sufficiently to support product claims or implementation decisions here. No external food catalog, exercise catalog, health data, or image/video assets are bundled.
