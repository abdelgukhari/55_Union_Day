import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const root=path.resolve('out');
const mime={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.webp':'image/webp','.png':'image/png','.json':'application/json','.woff2':'font/woff2'};
const server=createServer(async(req,res)=>{
 try{
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
  if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
  const data=await readFile(file);res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');res.end(data);
 }catch{res.writeHead(404).end();}
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const url=`http://127.0.0.1:${server.address().port}`;
await mkdir('outputs/qa',{recursive:true});
let browser;
try{
 browser=await chromium.launch({executablePath:process.env.CHROME_PATH||'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',headless:true});
 const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 // Stop at a local response: tests open no external WhatsApp conversation and send nothing.
 await context.route('https://wa.me/**',route=>route.fulfill({status:200,body:'WhatsApp handoff captured for QA'}));
 const page=await context.newPage();
 const errors=[];page.on('pageerror',error=>errors.push(error.message));
 await page.goto(url,{waitUntil:'networkidle'});
 await page.locator('.exhibit').last().scrollIntoViewIfNeeded();
 await page.waitForTimeout(300);
 assert.equal(await page.locator('html').getAttribute('lang'),'ar');
 assert.equal(await page.locator('html').getAttribute('dir'),'rtl');
 assert.equal(await page.locator('form,input,textarea,select,[role="dialog"]').count(),0);
 assert.equal(await page.locator('.exhibit').count(),6);
 assert.ok(await page.locator('.brand img').evaluate(img=>img.complete&&img.naturalWidth===1280));
 async function checkLinks(language){
  const links=await page.locator('.exhibit .inquiry-link').evaluateAll(nodes=>nodes.map(a=>({href:a.href,code:a.dataset.productId,title:a.closest('article').querySelector('h3').textContent})));
  const messages=new Set();
  for(const link of links){
   const parsed=new URL(link.href);assert.equal(parsed.origin,'https://wa.me');assert.equal(parsed.pathname,'/971567933174');
   const text=parsed.searchParams.get('text');assert.ok(text.includes(link.code));assert.ok(text.includes(link.title));
   assert.ok(text.includes(language==='ar'?'أرغب في معرفة السعر':'Could you please share the price'));
   messages.add(text);
  }
  assert.equal(messages.size,6);
 }
 await checkLinks('ar');
 await page.evaluate(()=>scrollTo(0,0));
 await page.screenshot({path:'outputs/qa/desktop-ar.png',fullPage:true});
 await page.locator('.language').click();
 await checkLinks('en');assert.equal(await page.locator('html').getAttribute('dir'),'ltr');
 await page.screenshot({path:'outputs/qa/desktop-en.png',fullPage:true});
 const popupPromise=context.waitForEvent('page');
 await page.locator('[data-product-id="NS-003"]').click();
 const popup=await popupPromise;await popup.waitForLoadState();
 assert.ok(popup.url().includes('wa.me/971567933174'));
 const events=await page.evaluate(()=>window.dataLayer);
 assert.equal(events.length,1);assert.equal(events[0].event,'whatsapp_cta_click');assert.equal(events[0].product_code,'NS-003');assert.equal(events[0].language,'en');
 await popup.close();
 await page.reload({waitUntil:'networkidle'});assert.equal(await page.locator('html').getAttribute('lang'),'en');
 for(const width of [390,360]){
  await page.setViewportSize({width,height:844});
  for(const language of ['en','ar']){
   if(await page.locator('html').getAttribute('lang')!==language)await page.locator('.language').click();
   await page.locator('.exhibit').last().scrollIntoViewIfNeeded();
   await page.waitForTimeout(150);
   const dimensions=await page.evaluate(()=>({client:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));
   assert.ok(dimensions.scroll<=dimensions.client+1,`Horizontal overflow ${width}/${language}: ${JSON.stringify(dimensions)}`);
   await checkLinks(language);
   await page.evaluate(()=>scrollTo(0,0));
   await page.screenshot({path:`outputs/qa/mobile-${width}-${language}.png`,fullPage:true});
  }
 }
 // Motion-enabled content must remain visible immediately, including before scrolling.
 await context.close();
 const animated=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'no-preference'});
 const animatedPage=await animated.newPage();await animatedPage.goto(url,{waitUntil:'networkidle'});
 assert.equal(await animatedPage.locator('.standee-cutout').count(),7);
 assert.ok(await animatedPage.locator('.hero-standee').isVisible());
 await animatedPage.locator('.exhibit').last().scrollIntoViewIfNeeded();await animatedPage.waitForTimeout(500);
 assert.ok(Number(await animatedPage.locator('.exhibit').last().locator('.contour-line').getAttribute('pathLength'))>0);
 assert.deepEqual(errors,[]);
 await animated.close();
 console.log('PASS: Arabic default; RTL/LTR; six distinct product messages in both languages; user-confirmed phone; no forms/cart/popups before handoff; one-click handoff; click analytics; language persistence; desktop/mobile overflow; reduced-motion and motion visibility. Screenshots in outputs/qa/.');
}finally{
 if(browser)await browser.close();
 await new Promise(resolve=>server.close(resolve));
}
