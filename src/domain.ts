export type Exercise={id:string;name:string;muscle:string;equipment:string;sets:number;minReps:number;maxReps:number;rest:number;cue:string};
export const exercises:Exercise[]=[
 {id:'squat',name:'Goblet squat',muscle:'Ноги',equipment:'Гантель',sets:3,minReps:8,maxReps:12,rest:120,cue:'Сохраняйте устойчивую опору и комфортную глубину.'},
 {id:'push-up',name:'Отжимания',muscle:'Грудь',equipment:'Вес тела',sets:3,minReps:6,maxReps:15,rest:90,cue:'Держите корпус собранным; выберите подходящую высоту опоры.'},
 {id:'row',name:'Тяга гантели одной рукой',muscle:'Спина',equipment:'Гантель',sets:3,minReps:8,maxReps:12,rest:90,cue:'Тяните локоть к тазу без разворота корпуса.'},
 {id:'rdl',name:'Румынская тяга с гантелями',muscle:'Задняя поверхность бедра',equipment:'Гантели',sets:3,minReps:8,maxReps:12,rest:120,cue:'Отводите таз назад, оставляя вес близко к ногам.'},
 {id:'press',name:'Жим гантелей стоя',muscle:'Плечи',equipment:'Гантели',sets:2,minReps:8,maxReps:12,rest:90,cue:'Работайте в комфортной амплитуде без прогиба в пояснице.'},
 {id:'bridge',name:'Ягодичный мост',muscle:'Ягодицы',equipment:'Вес тела',sets:3,minReps:10,maxReps:15,rest:90,cue:'Завершайте движение сокращением ягодиц, не переразгибая спину.'}
];
export type SetLog={id:string;exerciseId:string;exerciseName:string;load:number;reps:number;rir:number;at:string};
export type Workout={id:string;startedAt:string;endedAt?:string;sets:SetLog[]};
export type WeightEntry={id:string;date:string;kg:number};
export type MealEntry={id:string;date:string;name:string;kcal:number;protein:number;carbs:number;fat:number};
export type RecoveryEntry={id:string;date:string;sleepHours:number;energy:number;soreness:number;stress:number;note:string};
export type AppData={profile:{name:string;goal:string;units:'kg'|'lb'};settings:{theme:'dark'|'light';locale:'ru'|'en'};workouts:Workout[];weights:WeightEntry[];meals:MealEntry[];recovery:RecoveryEntry[]};
export const emptyData:AppData={profile:{name:'',goal:'Общее здоровье',units:'kg'},settings:{theme:'dark',locale:'ru'},workouts:[],weights:[],meals:[],recovery:[]};
export const todayKey=()=>{const d=new Date();return`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;};
export const id=()=>globalThis.crypto?.randomUUID?.()??`${Date.now()}-${Math.random().toString(36).slice(2)}`;
export function weightTrend(rows:WeightEntry[]){if(rows.length<3)return null;const sorted=[...rows].sort((a,b)=>a.date.localeCompare(b.date)).slice(-14);const first=sorted.slice(0,Math.ceil(sorted.length/2)).map(x=>x.kg);const last=sorted.slice(Math.floor(sorted.length/2)).map(x=>x.kg);const avg=(a:number[])=>a.reduce((x,y)=>x+y,0)/a.length;return {kg:Number(avg(last).toFixed(1)),delta:Number((avg(last)-avg(first)).toFixed(1)),count:sorted.length};}
export function e1rm(load:number,reps:number){if(load<=0||reps<=0)return null;return Math.round(load*(1+reps/30)*10)/10;}
export function nextAction(data:AppData){const active=data.workouts.find(w=>!w.endedAt);if(active)return {title:'Продолжите тренировку',why:'Текущая тренировка сохранена на этом устройстве.',basis:'Основание: в журнале есть незавершённая сессия.',label:'Вернуться к тренировке',kind:'workout'};if(!data.workouts.length)return {title:'Начните с простой тренировки',why:'Первая запись поможет настроить план под ваш реальный режим.',basis:'Основание: журнал тренировок пока пуст.',label:'Открыть тренировку',kind:'workout'};if(!data.weights.some(w=>w.date===todayKey()))return {title:'Запишите массу тела',why:'Регулярные измерения помогают отличать тенденцию от суточных колебаний.',basis:'Основание: измерение массы за сегодня отсутствует.',label:'Добавить измерение',kind:'weight'};return {title:'Данные записаны на сегодня',why:'Продолжайте план без изменений. Рекомендации появятся, когда накопится достаточно наблюдений.',basis:'Пока недостаточно данных, чтобы обоснованно менять план.',label:'Посмотреть план',kind:'train'};}
export function validateBackup(value:unknown):value is {schemaVersion:number;data:AppData}{
 if(!value||typeof value!=='object')return false;
 const x=value as {schemaVersion?:unknown;data?:unknown};if(x.schemaVersion!==1||!x.data||typeof x.data!=='object')return false;
 const d=x.data as Partial<AppData>;
 const list=(v:unknown)=>Array.isArray(v)&&v.every(item=>!!item&&typeof item==='object'&&typeof(item as {id?:unknown}).id==='string');
 const numeric=(...values:unknown[])=>values.every(v=>typeof v==='number'&&Number.isFinite(v)&&v>=0);
 const isoDate=(v:unknown)=>typeof v==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(v)&&!Number.isNaN(Date.parse(`${v}T00:00:00Z`));
 const isoTime=(v:unknown)=>typeof v==='string'&&!Number.isNaN(Date.parse(v));
 if(!d.profile||typeof d.profile.name!=='string'||typeof d.profile.goal!=='string'||!['kg','lb'].includes(String(d.profile.units)))return false;
 if(!d.settings||!['dark','light'].includes(String(d.settings.theme))||!['ru','en'].includes(String(d.settings.locale)))return false;
 const weights=d.weights,meals=d.meals,recovery=d.recovery,workouts=d.workouts;
 if(!Array.isArray(workouts)||!Array.isArray(weights)||!Array.isArray(meals)||!Array.isArray(recovery))return false;
 if(!list(workouts)||!list(weights)||!list(meals)||!list(recovery))return false;
 if(weights.some(w=>!numeric(w.kg)||w.kg<20||w.kg>400||!isoDate(w.date)))return false;
 if(meals.some(m=>typeof m.name!=='string'||m.name.length>200||!isoDate(m.date)||!numeric(m.kcal,m.protein,m.carbs,m.fat)||m.kcal>20000||m.protein>1000||m.carbs>2000||m.fat>1000))return false;
 if(recovery.some(r=>!isoDate(r.date)||!numeric(r.sleepHours,r.energy,r.soreness,r.stress)||r.sleepHours>24||r.energy<1||r.energy>5||r.soreness<1||r.soreness>5||r.stress<1||r.stress>5||typeof r.note!=='string'||r.note.length>2000))return false;
 if(workouts.some(w=>!isoTime(w.startedAt)||(w.endedAt!==undefined&&!isoTime(w.endedAt))||!Array.isArray(w.sets)||w.sets.length>1000||w.sets.some(s=>typeof s.id!=='string'||typeof s.exerciseId!=='string'||typeof s.exerciseName!=='string'||s.exerciseName.length>200||!numeric(s.load,s.reps,s.rir)||s.load>2000||s.reps<1||s.reps>1000||s.rir>10||!isoTime(s.at))))return false;
 return true;
}
