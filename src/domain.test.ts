import{describe,expect,it}from'vitest';
import{emptyData,e1rm,nextAction,validateBackup,weightTrend,type AppData}from'./domain';
describe('body weight trend',()=>{
 it('waits for at least three real measurements',()=>expect(weightTrend([])).toBeNull());
 it('compares smoothed halves instead of a single weigh-in',()=>expect(weightTrend([{id:'1',date:'2026-01-01',kg:80},{id:'2',date:'2026-01-02',kg:79.8},{id:'3',date:'2026-01-03',kg:79.1},{id:'4',date:'2026-01-04',kg:79}])?.delta).toBe(-.9));
});
describe('strength estimate',()=>{it('calculates Epley e1RM from a recorded set',()=>expect(e1rm(100,5)).toBe(116.7));it('rejects zero or missing load',()=>expect(e1rm(0,5)).toBeNull());});
describe('next action',()=>{it('does not create data-backed readiness without entries',()=>expect(nextAction(emptyData).title).toContain('тренировки'));});
describe('backup validation',()=>{
 it('accepts a valid empty export',()=>expect(validateBackup({schemaVersion:1,data:emptyData})).toBe(true));
 it('rejects wrong schema version and malformed records',()=>{const bad={...emptyData,weights:[{id:'w',date:'today',kg:'heavy'}]};expect(validateBackup({schemaVersion:2,data:emptyData})).toBe(false);expect(validateBackup({schemaVersion:1,data:bad})).toBe(false);});
 it('accepts logs with nested sets',()=>{const data:AppData={...emptyData,workouts:[{id:'w',startedAt:'2026-01-01T10:00:00Z',endedAt:'2026-01-01T11:00:00Z',sets:[{id:'s',exerciseId:'squat',exerciseName:'Squat',load:40,reps:10,rir:2,at:'2026-01-01T10:10:00Z'}]}]};expect(validateBackup({schemaVersion:1,data})).toBe(true);});
});
