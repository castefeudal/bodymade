import {describe,expect,it} from 'vitest'; import {nextLoad,trend} from './domain';
import {exercises} from './domain';
describe('progression engine',()=>{it('suggests a load jump at the top of the range',()=>expect(nextLoad(exercises[0],8,2).load).toBe('+2.5 kg'));it('protects a failed set',()=>expect(nextLoad(exercises[0],6,0).load).toBe('Keep current load'));it('supports manual mode',()=>expect(nextLoad(exercises[0],8,3,'MANUAL').load).toBe('Keep current load'));});
describe('trend weight',()=>{it('smooths the last seven readings',()=>expect(trend([80,79.8,79.6,79.4,79.3,79.1,78.9])?.direction).toBe('down'));it('returns null with no data',()=>expect(trend([])).toBeNull());});
