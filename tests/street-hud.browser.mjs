// Run against a served checkout with Playwright Core and Chromium installed.
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';

const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_CORE_PATH || 'playwright-core');
const base=process.argv[2] || 'http://127.0.0.1:8000/';
const browser=await chromium.launch({channel:'chrome',args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try {
  for(const [width,height] of [[1000,640],[390,844]]){
    const page=await browser.newPage({reducedMotion:'reduce',viewport:{width,height},hasTouch:width===390});
    await page.goto(new URL('#skills',base).href,{waitUntil:'domcontentloaded'});
    if(width===1000)await page.locator('.scene-ready[data-tree]').waitFor({timeout:120000});
    else{
      await page.locator('.branch-node').first().waitFor();
      const heavy=await page.evaluate(()=>performance.getEntriesByType('resource')
        .filter(e=>/\.glb|three\.module|mobile-orbit\.mp4|hong-kong-street/.test(e.name)).map(e=>e.name));
      assert.deepEqual(heavy,[],'A reduced-motion phone should only need the still view');
    }
    if(width===1000){
      const continuous=await page.evaluate(async()=>{
        const {streetOperator}=await import('./assets/js/street-operator.js');
        const {PerspectiveCamera,Vector3}=await import('./assets/vendor/three/three.module.min.js');
        const stage=document.createElement('div'),rig=await streetOperator(stage);
        const camera=new PerspectiveCamera(56,1.6,.1,550);
        function sample(t,panel){
          if(panel)stage.dataset.open=panel;else delete stage.dataset.open;
          rig.pose(t,0,false);rig.framing(camera,1000,640,false);
          return camera.position.clone();
        }
        const head=rig.scene.getObjectByName('mixamorigHead'),hips=rig.scene.getObjectByName('mixamorigHips');
        const wrist=rig.scene.getObjectByName('mixamorigRightHand');
        const world=bone=>bone.getWorldPosition(new Vector3());
        const lobby=sample(0),handStart=world(wrist),start=sample(1,'missions'),moving=sample(1.7,'missions');
        const headAboveHips=world(head).y-world(hips).y;
        if(headAboveHips<.45 || headAboveHips>.75 || handStart.distanceTo(world(wrist))<.03)return false;
        const interrupted=sample(1.7,'skills'),tree=sample(3.3,'skills');
        sample(6,'missions');
        const overhead=sample(8,'missions');
        return lobby.distanceTo(start)<1e-6 && moving.distanceTo(start)>.1 &&
          interrupted.distanceTo(moving)<1e-6 && tree.distanceTo(moving)>.1 && overhead.y>3;
      });
      assert.ok(continuous,'An interrupted orbit must start at the displayed camera position');
    }
    if(width===1000){
      const drift=await page.evaluate(async()=>{
        const {createOperator}=await import('./assets/js/operator.js?v=street-studio-2');
        const {Vector3}=await import('./assets/vendor/three/three.module.min.js');
        const actor=await createOperator();
        const feet=['Left','Right'].map(side=>actor.root.getObjectByName('mixamorig'+side+'Foot'));
        const anchors=feet.map(foot=>foot.getWorldPosition(new Vector3()));
        let furthest=0;
        const point=new Vector3();
        for(const presenting of [true,false]){
          actor.begin(presenting);
          for(const t of [0,.08,.16,.65,actor.duration-.17,actor.duration-.10,actor.duration+.2]){
            actor.pose(t,t,false);
            feet.forEach((foot,i)=>{furthest=Math.max(furthest,foot.getWorldPosition(point).distanceTo(anchors[i]));});
          }
        }
        return furthest;
      });
      assert.ok(drift<.002,'The planted ankles should hold through interrupted gestures and the return to listening');
    }
    if(width===1000){
      const performances=await page.evaluate(async()=>{
        const {createOperator}=await import('./assets/js/operator.js?v=street-studio-2');
        const {Vector3}=await import('./assets/vendor/three/three.module.min.js');
        const actor=await createOperator(),rows=[];
        let skin;actor.root.traverse(n=>{if(n.morphTargetDictionary?.jawOpen!==undefined)skin=n;});
        for(const key of ['cinema','edit','model','mocap','live']){
          actor.begin(key);const duration=actor.duration,prop=actor.root.getObjectByName('Kit_'+key);
          let maximumJaw=0,blink=0,look=0,travel=0,start;
          for(let i=0;i<=60;i++){
            const t=duration*i/60;
            actor.pose(t,t,false);
            const position=prop.getWorldPosition(new Vector3());
            if(i===1)start=position.clone();
            if(start)travel=Math.max(travel,position.distanceTo(start));
            const weight=name=>skin.morphTargetInfluences[skin.morphTargetDictionary[name]];
            maximumJaw=Math.max(maximumJaw,weight('jawOpen'));blink=Math.max(blink,weight('eyeBlinkLeft'));
            look=Math.max(look,weight('eyeLookDownLeft'),weight('eyeLookOutLeft'));
          }
          actor.pose(20,0,true);
          rows.push({key,blink,look,travel,maximumJaw,scale:prop.scale.x});
        }
        return rows;
      });
      for(const row of performances){
        assert.ok(row.travel>.025&&row.blink>.45&&row.look>.05,row.key);
        assert.equal(row.scale,1,row.key+' paused hold');
      }
      assert.ok(performances.find(r=>r.key==='live').maximumJaw>.16);
    }
    assert.equal(await page.locator('.branch-node').count(),6);
    const frame=await page.screenshot();
    // Sample the lit face between the skill nodes, above the black shirt.
    const lit=await page.evaluate(async data=>{
      const image=await createImageBitmap(await (await fetch('data:image/png;base64,'+data)).blob());
      const ctx=document.createElement('canvas').getContext('2d');
      const portrait=innerHeight>innerWidth;
      const x=(portrait ? .535 : .341)*image.width,y=(portrait ? .176 : .322)*image.height;
      ctx.drawImage(image,x-20,y-20,40,40,0,0,40,40);
      const pixels=ctx.getImageData(0,0,40,40).data;
      let count=0;
      for(let i=0;i<pixels.length;i+=4)if(Math.max(pixels[i],pixels[i+1],pixels[i+2])>55)count++;
      return count;
    },frame.toString('base64'));
    assert.ok(lit>160,'Street performer must be visible in the open center of the skill map');
    await page.locator('[data-branch="capture"]').click();
    const types=page.locator('.type-node');
    assert.ok(await types.count()>0);
    await types.last().click();
    assert.equal(await types.last().getAttribute('aria-pressed'),'true');
    await page.locator('.tree-root').click();
    await page.locator('[data-branch="capture"][aria-pressed="true"]').waitFor();
    await page.locator('.tree-leaves button').first().click();
    const rank=await page.locator('.skill-level').textContent();
    await page.locator('.level-up').click();
    assert.notEqual(await page.locator('.skill-level').textContent(),rank);
    await page.locator('.close').click();
    await page.locator('.work-index').click();
    const project=page.locator('.project-feature').first();
    await project.waitFor();assert.equal(await page.locator('.project-feature').count(),4);
    await project.click();await page.locator('.panel-body #project-parallel-phantasia').waitFor();
    await page.locator('.tool-index').click();
    await page.locator('.panel-body a[href^="mailto:"]').first().waitFor();
    assert.equal(await page.locator('.panel-body a[href$=".pdf"]').count(),2);
    await page.locator('.close').click();
    await page.locator('.rail [data-kit="cinema"]').click();
    await page.locator('.discipline-skills').click();
    await page.locator('[data-branch="media"][aria-pressed="true"]').waitFor();
    await page.close();
  }
  // Touch-first landscape tablets also use the lightweight entry point.
  const mobile=await browser.newPage({hasTouch:true,viewport:{width:900,height:450},reducedMotion:'no-preference'});
  const requests=[];
  mobile.on('request',req=>requests.push(req.url()));
  await mobile.goto(base,{waitUntil:'domcontentloaded'});
  await mobile.waitForFunction(()=>document.querySelector('video')?.currentTime>.1);
  await mobile.locator('.work-index').click();
  assert.equal(await mobile.locator('video').evaluate(v=>v.paused),true);
  assert.ok(!requests.some(u=>/\.glb|three\.module|hong-kong-street/.test(u)));
  await mobile.locator('.close').click();
  await mobile.locator('[data-panel="settings"]').click();
  await mobile.locator('[data-switch-scene]').click();
  await mobile.locator('.scene-ready').waitFor({timeout:120000});
  assert.ok(requests.some(u=>u.includes('portrait-operator.glb')));
  await mobile.locator('[data-switch-scene]').click();
  await mobile.waitForURL(url=>url.searchParams.get('scene')==='light');
  assert.equal(await mobile.locator('.scene-ready').count(),0);

} finally {
  await browser.close();
}
