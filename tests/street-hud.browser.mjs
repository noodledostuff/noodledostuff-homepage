// Run against a served checkout with Playwright Core and Chromium installed.
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';

const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_CORE_PATH || 'playwright-core');
const base=process.argv[2] || 'http://127.0.0.1:8000/';
const browser=await chromium.launch({channel:'chrome',args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try {
  const page=await browser.newPage({reducedMotion:'reduce'});
  for(const [width,height] of [[1000,640],[390,844]]){
    await page.setViewportSize({width,height});
    await page.goto(new URL('#skills',base).href,{waitUntil:'domcontentloaded'});
    await page.locator('.scene-ready[data-tree]').waitFor({timeout:120000});
    assert.equal(await page.locator('.branch-node').count(),6);
    const frame=await page.screenshot();
    // A poisoned light probe leaves a working HUD over a nearly black performer.
    const lit=await page.evaluate(async data=>{
      const image=await createImageBitmap(await (await fetch('data:image/png;base64,'+data)).blob());
      const ctx=document.createElement('canvas').getContext('2d');
      const portrait=innerHeight>innerWidth;
      const x=(portrait ? .5 : .33)*image.width,y=(portrait ? .25 : .46)*image.height;
      ctx.drawImage(image,x-20,y-20,40,40,0,0,40,40);
      const pixels=ctx.getImageData(0,0,40,40).data;
      let count=0;
      for(let i=0;i<pixels.length;i+=4)if(Math.max(pixels[i],pixels[i+1],pixels[i+2])>55)count++;
      return count;
    },frame.toString('base64'));
    assert.ok(lit>160,'Street performer must be visible in the open center of the skill map');
    await page.locator('[data-branch="capture"]').click();
    await page.locator('.tree-leaves button').first().click();
    const rank=await page.locator('.skill-level').textContent();
    await page.locator('.level-up').click();
    assert.notEqual(await page.locator('.skill-level').textContent(),rank);
    await page.locator('.close').click();
    await page.locator('.rail [data-kit="cinema"]').click();
    await page.locator('.discipline-skills').click();
    await page.locator('[data-branch="media"][aria-pressed="true"]').waitFor();
  }
} finally {
  await browser.close();
}
