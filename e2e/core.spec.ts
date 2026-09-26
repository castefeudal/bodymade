import{expect,test}from'@playwright/test';
import AxeBuilder from'@axe-core/playwright';
test.beforeEach(async({page})=>{await page.goto('/bodymade/');});
test('records a workout, survives reload, and updates progress from the log',async({page})=>{
 await expect(page.getByText('Недостаточно данных для оценки')).toBeVisible();
 await page.getByRole('button',{name:/Открыть тренировку/}).first().click();
 await page.getByRole('button',{name:'Выбрать'}).first().click();
 await page.locator('#load').fill('40');await page.locator('#reps').fill('8');await page.locator('#rir').fill('2');await page.getByRole('button',{name:/Записать подход/}).click();
 await expect(page.getByText('40 кг × 8')).toBeVisible();await page.reload();
 await page.getByRole('button',{name:'Тренировки'}).first().click();await expect(page.getByText('40 кг × 8')).toBeVisible();
 await page.getByRole('button',{name:'Завершить тренировку'}).click();await page.getByRole('button',{name:'Прогресс'}).first().click();
 await expect(page.getByText('1 сессий')).toBeVisible();await expect(page.getByText('50.7 кг')).toBeVisible();
});
test('logs nutrition and recovery entries locally',async({page})=>{
 await page.getByRole('button',{name:'Питание'}).first().click();await page.locator('#food-name').fill('Тестовый обед');await page.locator('#food-kcal').fill('600');await page.locator('#food-protein').fill('35');await page.getByRole('button',{name:'Сохранить'}).click();await expect(page.locator('.metric-grid').getByText('600 ккал')).toBeVisible();
 await page.getByRole('button',{name:'Восстановление'}).first().click();await page.locator('#sleep').fill('7.5');await page.locator('#energy').fill('4');await page.locator('#soreness').fill('2');await page.locator('#stress').fill('2');await page.getByRole('button',{name:'Сохранить'}).click();await expect(page.getByText(/Сон 7.5 ч/)).toBeVisible();
});
test('exports a valid backup and passes an axe scan on the empty Today view',async({page})=>{
 const download=page.waitForEvent('download');await page.getByRole('button',{name:'Настройки'}).first().click();await page.getByRole('button',{name:'Экспорт данных'}).click();expect((await download).suggestedFilename()).toBe('bodymade-backup.json');
 await page.getByRole('button',{name:'Сегодня'}).first().click();const result=await new AxeBuilder({page}).analyze();expect(result.violations.map(x=>`${x.id}: ${x.help}`)).toEqual([]);
});
test('keeps the Today view within narrow and wide screens and reloads offline',async({page,context})=>{
 for(const [width,height]of[[320,568],[375,812],[390,844],[430,932],[768,1024],[1024,768],[1280,800],[1440,900],[1920,1080]]){await page.setViewportSize({width,height});const sizes=await page.evaluate(()=>({viewport:document.documentElement.clientWidth,content:document.documentElement.scrollWidth}));expect(sizes.content,`horizontal overflow at ${width}x${height}`).toBeLessThanOrEqual(sizes.viewport);}
 await page.evaluate(()=>navigator.serviceWorker.ready);await page.waitForTimeout(500);await context.setOffline(true);await page.reload();await expect(page.getByText('Недостаточно данных для оценки')).toBeVisible();await context.setOffline(false);
});
test('validates and previews an import before merging records',async({page})=>{
 await page.getByRole('button',{name:'Настройки'}).first().click();const backup={schemaVersion:1,data:{profile:{name:'',goal:'Общее здоровье',units:'kg'},settings:{theme:'dark',locale:'ru'},workouts:[],weights:[{id:'imported-weight',date:'2026-09-27',kg:70}],meals:[],recovery:[]}};
 await page.locator('input[type=file]').setInputFiles({name:'backup.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(backup))});await expect(page.getByText(/измерений: 1/)).toBeVisible();await page.getByRole('button',{name:'Объединить'}).click();await page.getByRole('button',{name:'Здоровье'}).first().click();await expect(page.getByText('70 кг')).toBeVisible();
});
test('runs axe checks across every primary view',async({page})=>{
 for(const label of ['Сегодня','Тренировки','Питание','Восстановление','Прогресс','Здоровье','Упражнения','Настройки']){await page.getByRole('button',{name:label}).first().click();const report=await new AxeBuilder({page}).analyze();expect(report.violations.map(v=>`${label}: ${v.id} — ${v.help}`)).toEqual([]);}
});
