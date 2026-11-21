import * as T from '../vendor/three/three.module.min.js';
import {addGlassDistrict} from './skyline.js';
import {studioGear} from './studio-gear.js';
import {dressRooftops,wetDeck} from './roof-detail.js';
import {createOperator} from './operator.js';
import {cameraShot,levelUpShot} from './shots.js';
import {rooftopFilm} from './rooftop-film.js';

const stage=document.querySelector('.rooftop');
if (stage) {
  mount(stage).catch(error => console.warn('Rooftop preview unavailable',error));
}

async function mount(stage) {
  const canvas=stage.querySelector('canvas');
  const renderer=new T.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'low-power'});
  const scene=new T.Scene(), camera=new T.PerspectiveCamera(32,1,.09,200);
  const depthAvailable=renderer.capabilities.isWebGL2 || renderer.extensions.has('WEBGL_depth_texture');
  if(!depthAvailable)scene.fog=new T.FogExp2('#26344d',.018);
  renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.07;
  const city=new T.Group();
  scene.add(city);
  let seed=431;
  const rand=()=>((seed=Math.imul(seed,1664525)+1013904223>>>0)/4294967296);
  const boxGeo=new T.BoxGeometry(), materials=new Map();
  function solid(color) {
    if (!materials.has(color)) materials.set(color,new T.MeshStandardMaterial({color,roughness:.83}));
    return materials.get(color);
  }
  function box(x,y,z,w,h,d,mat,parent=city) {
    const object=new T.Mesh(boxGeo,typeof mat==='string'?solid(mat):mat);
    object.position.set(x,y,z); object.scale.set(w,h,d); parent.add(object); return object;
  }
  function texture(w,h,paint) {
    const sheet=document.createElement('canvas');
    sheet.width=w; sheet.height=h; paint(sheet.getContext('2d'),w,h);
    const map=new T.CanvasTexture(sheet); map.colorSpace=T.SRGBColorSpace; return map;
  }
  const flatColors=new Map();
  function basic(options){
    if(!options.color || Object.keys(options).length!==1)return new T.MeshBasicMaterial(options);
    if(!flatColors.has(options.color))flatColors.set(options.color,new T.MeshBasicMaterial(options));
    return flatColors.get(options.color);
  }
  const facadeColors=['#263452','#3d354e','#304853','#584257','#354366','#394c60'];
  const facades=facadeColors.map(base=>{
    const map=texture(256,512,(ctx,w,h)=>{
    ctx.fillStyle=base;ctx.fillRect(0,0,w,h);
    const lights=['#e6a76a','#72b4bf','#8d8aac','#d78379','#ffce91','#496985'];
    for(let floor=0;floor<16;floor++) {
      ctx.fillStyle='rgba(9,20,39,.4)';ctx.fillRect(0,floor*32+28,w,3);
      for(let col=0;col<8;col++) {
        const x=col*32+3,y=floor*32+4;
        ctx.fillStyle='#242f46';ctx.fillRect(x,y,25,19);
        ctx.fillStyle=rand()>.49 ? lights[Math.floor(rand()*lights.length)] : '#48556a';
        ctx.fillRect(x+2,y+2,21,14);
        ctx.fillStyle='rgba(18,29,46,.55)';ctx.fillRect(x+11,y,2,18);
        ctx.fillRect(x+1,y+2,22,Math.floor(rand()*10));
        if (rand()>.75) {
          ctx.fillStyle='rgba(9,21,37,.7)';ctx.fillRect(x-1,y+11,26,2);
          for (let bar=0;bar<25;bar+=5) ctx.fillRect(x+bar,y+11,1,8);
        }
        if(rand()>.65) {
          ctx.fillStyle='#849099';ctx.fillRect(x+13,y+18,11,5);
          ctx.fillStyle='#495566';ctx.fillRect(x+15,y+19,7,2);
        }
      }
    }
    ctx.fillStyle='rgba(21,29,47,.3)';
    for(const x of [0,94,189])ctx.fillRect(x,0,4,h);
    });
    const litWindows=texture(256,512,(ctx,w,h)=>{
      ctx.drawImage(map.image,0,0);
      const pixels=ctx.getImageData(0,0,w,h);
      for(let i=0;i<pixels.data.length;i+=4){
        const light=Math.max(pixels.data[i],pixels.data[i+1],pixels.data[i+2]);
        const mask=T.MathUtils.smoothstep(light,100,170);
        for(let c=0;c<3;c++)pixels.data[i+c]*=mask;
      }
      ctx.putImageData(pixels,0,0);
    });
    return new T.MeshStandardMaterial({map,emissiveMap:litWindows,emissive:0xffffff,emissiveIntensity:.58,roughness:.72});
  });
  const roof=basic({color:'#374455'});
  const tankMaterial=solid('#666577'), tanks=new T.CylinderGeometry(.42,.45,1.1,32);
  function tower(x,top,z,w,h,d) {
    const wall=facades[Math.floor(rand()*facades.length)];
    box(x,top-h/2,z,w,h,d,wall);
    box(x,top+.08,z,w+.12,.16,d+.12,roof);
    box(x+w*.14,top+.46,z,w*.38,.9,d*.45,'#3b4257');
    if (rand()>.64) {
      const tank=new T.Mesh(tanks,tankMaterial);
      tank.position.set(x-w*.22,top+.55,z+.4);city.add(tank);
    }
    if (rand()>.57) {
      box(x,top+1.55,z,.033,1.5,.033,'#384055');
      box(x,top+2.05,z,.67,.024,.031,'#516075');
    }
  }
  for(let row=0;row<4;row++){
    const z=-16-row*15, count=8+row*2;
    for(let i=-count;i<=count;i++) {
      const x=i*5.8+(row%2)*2.8+rand()*1.5;
      const top=(row===0 ? -1 : 3)+rand()*(row===0?5:8)-(row===0 && Math.abs(x)<6?4.2:0);
      tower(x,top,z-rand()*4,3.3+rand()*2.1,17+rand()*9,4+rand()*3);
    }
  }
  for(const [x,z,w,top] of [[-4.2,-22,1.6,6],[2.5,-27,2.8,7],[5.1,-18,1.4,9],[-7.7,-21,1.4,8]]){
    box(x,top-8,z,w,16,2,basic({color:'#22233b'}));
    for(let y=top-13;y<top;y+=.83)box(x+w*.32,y,z+1.02,.06,.45,.03,basic({color:y%2>1?'#ac668d':'#6489a6'}));
  }
  // Foreground tenements frame the lower street canyon.
  tower(-9,5.4,-10,5.8,15,5);
  tower(10.2,6.7,-13,6.4,21,6);
  function sign(x,y,z,w,h,label,color,vertical=false) {
    const map=texture(vertical?192:640,vertical?672:180,(ctx,sw,sh)=>{
      ctx.fillStyle='#222637';ctx.fillRect(0,0,sw,sh);
      ctx.strokeStyle=color;ctx.shadowColor=color;ctx.shadowBlur=13;ctx.lineWidth=4;
      ctx.strokeRect(8,8,sw-16,sh-16);
      ctx.fillStyle=color;ctx.textAlign='center';ctx.textBaseline='middle';
      ctx.font='bold '+(vertical?113:87)+'px "Microsoft JhengHei", sans-serif';
      if(vertical) [...label].forEach((c,i)=>ctx.fillText(c,sw/2,sh*(i+.5)/label.length));
      else ctx.fillText(label,sw/2,sh/2,sw-40);
    });
    box(x,y,z,w+.09,h+.09,.18,'#242b3d');
    const panel=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshStandardMaterial({map,roughness:.32,metalness:.12,emissiveMap:map,emissive:0xffffff,emissiveIntensity:1.5}));
    panel.position.set(x,y,z+.10);city.add(panel);
  }
  sign(-4.67,2.07,-6.65,.79,3.17,'霓虹冰室','#ff8b8e',true);
  sign(6.35,2.85,-8.9,1.02,3.55,'旺角影社','#63ece4',true);
  sign(-9.3,4.75,-7.37,3.84,.86,'通菜街','#ffd19a');
  sign(9,5.3,-9.84,4.75,.9,'百老匯','#ffa1c6');
  sign(-2.4,2.35,-18,2.92,.66,'霓光戲院','#ff96c0');
  sign(3.3,4.55,-29,4.3,.75,'夜香港','#68e0d2');
  sign(-4.5,4.1,-12.3,2.13,.64,'唱片行','#74e5da');
  // Service pipes, balcony slabs and laundry break up the nearby tong lau facades.
  for (const [x,z,top] of [[-9,-7.43,5.4],[10.2,-9.93,6.7]]) {
    for(const dx of [-2.47,2.28])box(x+dx,top-4,z,.09,8,.12,'#74727c');
    for(let i=0;i<5;i++){
      const y=top-1-i*1.2;
      box(x-.7,y,z,2.3,.085,.78,'#737784');
      box(x-.7,y+.38,z+.35,2.28,.035,.04,'#77818e');
      for(let bar=0;bar<6;bar++)box(x-1.77+bar*.42,y+.2,z+.35,.025,.4,.025,'#667888');
    }
  }
  for(const [x,y,z] of [[-3.2,3.6,-18],[5.5,3.4,-19],[-7.0,5.9,-25]]) {
    const line=new T.CatmullRomCurve3([new T.Vector3(x-3,y+.2,z),new T.Vector3(x,y-.32,z+.1),new T.Vector3(x+3,y+.3,z)]);
    city.add(new T.Mesh(new T.TubeGeometry(line,16,.012,4,false),solid('#29324c')));
    for(let i=0;i<5;i++){
      const at=line.getPoint(.25+i*.095);
      box(at.x,at.y-.20,at.z,.29,.4+rand()*.17,.025,['#aa8a88','#6499a7','#a5a9ad'][i%3]);
    }
  }
  // The operator's rooftop is several storeys above the neighbouring tenements.
  city.children.forEach(mesh=>mesh.position.y-=5.8);
  addGlassDistrict(city,texture,rand);
  // A soft sky dome still has a horizon when the camera moves.
  const skyTexture=texture(1024,512,(ctx,w,h)=>{
    const grad=ctx.createLinearGradient(0,0,0,h);
    for(const [p,c] of [[0,'#101731'],[.30,'#24274b'],[.46,'#283349'],[.54,'#493b56'],[.62,'#625069'],[1,'#514765']])grad.addColorStop(p,c);
    ctx.fillStyle=grad;ctx.fillRect(0,0,w,h);
    for(let i=0;i<700;i++){
      ctx.fillStyle='rgba(235,238,255,'+(rand()*.7)+')';
      ctx.fillRect(rand()*w,rand()*h*.51,rand()*1.5+.3,.7);
    }
  });
  const sky=new T.Mesh(new T.SphereGeometry(150,48,32),basic({map:skyTexture,side:T.BackSide,fog:false}));scene.add(sky);
  const moonMap=texture(256,256,(ctx)=>{
    const g=ctx.createRadialGradient(128,128,0,128,128,127);
    g.addColorStop(0,'#fff2d8');g.addColorStop(.32,'#fff2d8');g.addColorStop(.34,'#f5c6ae');g.addColorStop(.36,'rgba(247,187,177,.24)');g.addColorStop(1,'rgba(244,193,200,0)');
    ctx.fillStyle=g;ctx.fillRect(0,0,256,256);
  });
  const moon=new T.Sprite(new T.SpriteMaterial({map:moonMap,transparent:true,depthWrite:false,fog:false}));moon.position.set(7.1,18,-70);moon.scale.set(12,12,1);scene.add(moon);

  const floorTex=await new T.TextureLoader().loadAsync(new URL('../media/roof-concrete.webp',import.meta.url).href);
  floorTex.colorSpace=T.SRGBColorSpace;
  floorTex.wrapS=floorTex.wrapT=T.RepeatWrapping;floorTex.repeat.set(8,5);
  const surfaceMap=floorTex.clone();surfaceMap.colorSpace=T.NoColorSpace;
  box(0,-.17,.80,22,.30,13,new T.MeshPhysicalMaterial({map:floorTex,bumpMap:surfaceMap,bumpScale:.033,
    roughness:.94,roughnessMap:surfaceMap,clearcoat:.8,clearcoatRoughness:.36,clearcoatRoughnessMap:surfaceMap,ior:1.46}));
  box(0,.09,-5.65,22,.22,.27,'#55606d');
  for(let i=-10;i<=10;i+=2)box(i,.53,-5.65,.045,.89,.045,'#596878');
  for(const y of [.50,.91])box(0,y,-5.65,22,.037,.048,'#748d9b');
  dressRooftops(city,box,texture,sign,rand);
  const glowMap=texture(64,64,ctx=>{
    const g=ctx.createRadialGradient(32,32,0,32,32,32);
    g.addColorStop(0,'rgba(255,255,255,.95)');g.addColorStop(.22,'rgba(255,255,255,.68)');
    g.addColorStop(.5,'rgba(255,255,255,.19)');g.addColorStop(1,'rgba(255,255,255,0)');
    ctx.fillStyle=g;ctx.fillRect(0,0,64,64);
  });
  const lamp=new T.Mesh(new T.SphereGeometry(.040,24,16),new T.MeshBasicMaterial({color:new T.Color(0xffd3a0).multiplyScalar(5)}));
  lamp.position.set(1.02,1.45,-5.65);scene.add(lamp);
  const hood=new T.Mesh(new T.CylinderGeometry(.042,.087,.052,32),solid('#3e4756'));
  hood.position.copy(lamp.position);hood.position.y+=.042;scene.add(hood);
  box(1.02,.74,-5.65,.038,1.44,.038,'#415264');
  const backlight=new T.Sprite(new T.SpriteMaterial({color:0xffcf7c,map:glowMap,transparent:true,depthWrite:false,blending:T.AdditiveBlending}));backlight.position.copy(lamp.position);
  backlight.scale.set(.49,.49,1);scene.add(backlight);
  const actorScene=new T.Scene();
  const hemi=new T.HemisphereLight('#bbcde8','#463c60',.50);
  const key=new T.DirectionalLight('#ffd2aa',1.75);key.position.set(-3.4,2,1.9);
  const rim=new T.DirectionalLight('#85cfff',1.7);rim.position.set(2.8,2.1,-3);
  const bounce=new T.DirectionalLight('#e880ab',.39);bounce.position.set(-3,-.3,-1.9);
  actorScene.add(hemi,key,rim,bounce);
  const cityKey=key.clone();cityKey.position.set(-8,11,0);cityKey.target.position.set(0,0,-8);
  cityKey.castShadow=true;cityKey.shadow.mapSize.set(1024,1024);
  Object.assign(cityKey.shadow.camera,{left:-12,right:12,top:12,bottom:-12,near:.3,far:38});
  cityKey.shadow.camera.updateProjectionMatrix();cityKey.shadow.normalBias=.024;
  scene.add(hemi.clone(),cityKey,cityKey.target);
  for(const [x,y,z,color,power] of [[1.35,.9,-13.9,0xff9060,8],[1.02,1.43,-5.65,0xffbf80,9],[-2.8,3,-10.3,0xe79975,10],[3.2,.25,-12.1,0x9ac8dc,9]]){
    const spill=new T.PointLight(color,power,12,2);spill.position.set(x,y,z);scene.add(spill);
  }
  // Batch repeated fixtures, pipes and railings by geometry and material.
  const batches=new Map();
  for(const mesh of [...city.children]){
    if(!mesh.isMesh || mesh.material.transparent)continue;
    mesh.castShadow=!mesh.material.isMeshBasicMaterial;mesh.receiveShadow=mesh.castShadow;
    const id=mesh.geometry.uuid+mesh.material.uuid;
    if(!batches.has(id))batches.set(id,[]);
    batches.get(id).push(mesh);
  }
  for(const meshes of batches.values()){
    if(meshes.length<2)continue;
    const first=meshes[0],batch=new T.InstancedMesh(first.geometry,first.material,meshes.length);
    meshes.forEach((mesh,i)=>{mesh.updateMatrix();batch.setMatrixAt(i,mesh.matrix);city.remove(mesh);});
    batch.castShadow=first.castShadow;batch.receiveShadow=first.receiveShadow;city.add(batch);
  }
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;
  // Capture the skyline and static deck fixtures for glossy metal and glass.
  const water=wetDeck();scene.add(water);
  let environment;
  function bakeEnvironment(){
    renderer.shadowMap.autoUpdate=false;renderer.shadowMap.needsUpdate=true;
    scene.environment=null;water.visible=false;
    const probe=new T.WebGLCubeRenderTarget(128),capture=new T.CubeCamera(.1,180,probe);
    capture.position.set(.4,1.05,-3.5);capture.update(renderer,scene);
    const pmrem=new T.PMREMGenerator(renderer);
    environment?.dispose();environment=pmrem.fromCubemap(probe.texture);
    scene.environment=actorScene.environment=environment.texture;water.visible=true;
    probe.dispose();pmrem.dispose();
  }
  bakeEnvironment();
  const operator=await createOperator();
  actorScene.add(operator.root);
  const equip=studioGear(scene,actorScene,operator.wrist);
  const contact=new T.Mesh(new T.PlaneGeometry(.76,.47),new T.MeshBasicMaterial({
    map:glowMap,color:0x090b14,transparent:true,opacity:.62,depthWrite:false}));
  contact.rotation.x=-Math.PI/2;contact.position.y=-.008;contact.renderOrder=3;scene.add(contact);
  // Keep the actor sharp in the main composite and depth-tested in the deck's mirror pass.
  scene.onAfterRender=(activeRenderer,world,view)=>{
    if(view!==water.camera)return;
    const clear=activeRenderer.autoClear;
    activeRenderer.autoClear=false;activeRenderer.render(actorScene,view);activeRenderer.autoClear=clear;
  };
  const ortho=new T.OrthographicCamera(-1,1,1,-1,0,1);
  const composite=new T.WebGLRenderTarget(1,1,{
    type:renderer.capabilities.isWebGL2 && renderer.extensions.has('EXT_color_buffer_float') ? T.HalfFloatType : T.UnsignedByteType,
    depthTexture:depthAvailable ? new T.DepthTexture(1,1,T.UnsignedShortType) : null
  });
  const film=rooftopFilm(composite,camera,lamp.position);
  const finish=new T.Scene();
  finish.add(new T.Mesh(new T.PlaneGeometry(2,2),film));
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  let paused=motion.matches,frame=0,last=0,time=0,pointer=0,drift=0;
  const pause=stage.querySelector('[data-pause]');
  function updatePause(){
    pause.setAttribute('aria-pressed',String(paused));
    pause.textContent=paused?(document.documentElement.lang.startsWith('zh')?'播放動態':'Resume motion'):(document.documentElement.lang.startsWith('zh')?'暫停動態':'Pause motion');
  }
  let [height,distance,angle]=cameraShot('turn',0), shotStart=0,previousMode='turn',previousSkill='',previousView='';
  const dialog=stage.querySelector('dialog');
  let sheetOffset=0, stacked=false, focusX=0, framing=.39;
  const grip=new T.Vector3(),face=new T.Vector3(),hips=new T.Vector3();
  let entryStart=-Infinity,wasInspecting=false,focusZ=0;
  let upgradeStart=-Infinity,upgradeDirection=1;
  function frameSheet(){
    const bounds=dialog.getBoundingClientRect();
    const h=canvas.clientHeight;
    sheetOffset=dialog.open && bounds.width>canvas.clientWidth*.85 ? Math.min(h*.18,Math.max(0,h*.38-bounds.top*.52)) : 0;
  }
  new ResizeObserver(()=>{frameSheet();if(paused)draw(0);}).observe(dialog);
  function draw(dt){
    const mode=stage.dataset.pose || 'turn';
    const skill=stage.dataset.skill || '';
    const view=stage.dataset.inspection || (!stage.dataset.open && mode==='turn' && skill ? 'work' : '');
    const inspecting=stage.dataset.open==='discipline';
    if(skill!==previousSkill || (inspecting && !wasInspecting)){
      operator.begin();entryStart=time;
    }
    wasInspecting=inspecting;
    if(mode!==previousMode || skill!==previousSkill || view!==previousView){
      previousMode=mode;previousSkill=skill;previousView=view;shotStart=time;
    }
    const takeTime=paused && view==='technique' ? 3 : time-shotStart;
    const elapsed=time-entryStart;
    let shot=cameraShot(mode,takeTime,skill,view);
    const upgrading=stage.dataset.open==='skills' && !paused;
    if(upgrading)shot=levelUpShot(shot,time-upgradeStart,upgradeDirection);
    const portrait=stacked,overlay=stage.hasAttribute('data-open');
    const damping=dt===0 ? 1 : 1-Math.exp(-dt*3.1);
    drift+=((paused?0:pointer)-drift)*damping;
    operator.pose(time,elapsed,paused);
    equip(skill,time,dt,paused);
    operator.wrist.getWorldPosition(grip);operator.head.getWorldPosition(face);operator.hips.getWorldPosition(hips);
    contact.position.x=hips.x;contact.position.z=hips.z;
    const entering=inspecting && !paused && elapsed<operator.duration;
    const follow=inspecting ? (entering?.70:.33) : upgrading ? .38 : .12;
    const handWeight=view==='equipment'?.12:.35;
    const targetY=shot[0]+follow*((face.y-1.56)*(1-handWeight)+(grip.y-1.08)*handWeight);
    height+=(targetY-height)*damping;
    const w=canvas.clientWidth,h=canvas.clientHeight;
    const equipmentFit=portrait && view==='equipment' ? 1.7*h/(2*w*Math.tan(T.MathUtils.degToRad(camera.fov/2))) : 0;
    distance+=(Math.max(shot[1]+(portrait?.65:0)+(entering?.26:0),equipmentFit)-distance)*damping;
    const sweep=entering ? Math.sin(Math.PI*elapsed/operator.duration)*.30 : 0;
    const handLead=entering ? T.MathUtils.clamp((grip.x-hips.x)*.36,-.16,.16) : 0;
    angle+=(shot[2]+sweep+handLead+drift*.035+.033*Math.sin(time*.12)-angle)*damping;
    const fraction=portrait ? (overlay || skill ? .48 : .55) : (inspecting ? .405 : overlay ? .29 : .43);
    framing+=(fraction-framing)*damping;
    camera.setViewOffset(w,h,(.5-framing)*w,overlay ? sheetOffset : portrait ? -.105*h : 0,w,h);
    const anchor=hips;
    const targetX=anchor.x+(view==='equipment'?.32:view==='technique'?.10:0);
    focusX+=(T.MathUtils.lerp(targetX,(face.x+grip.x)*.5,follow)-focusX)*damping;
    focusZ+=(T.MathUtils.lerp(anchor.z,(face.z+grip.z)*.5,follow)-focusZ)*damping;
    camera.position.set(focusX+Math.sin(angle)*distance,height+.14,focusZ+Math.cos(angle)*distance);
    camera.lookAt(focusX,height,focusZ);
    renderFilm();
  }
  function renderFilm(){
    renderer.setRenderTarget(composite);renderer.render(scene,camera);
    renderer.autoClear=false;renderer.render(actorScene,camera);renderer.autoClear=true;
    const source=film.uniforms.source.value.copy(lamp.position).project(camera);
    source.set(source.x*.5+.5,source.y*.5+.5,source.z*.5+.5);
    film.uniforms.grainFrame.value=Math.floor(time*18)%4096;
    renderer.setRenderTarget(null);renderer.render(finish,ortho);
  }
  function tick(now){
    const elapsed=last?Math.max(0,(now-last)/1000):0;
    last=now;time+=elapsed;draw(Math.min(.35,elapsed));
    if(!paused&&!document.hidden)frame=requestAnimationFrame(tick);
  }
  function schedule(){cancelAnimationFrame(frame);last=0;if(!document.hidden)frame=requestAnimationFrame(tick);}
  function size(){
    const w=canvas.clientWidth,h=canvas.clientHeight;if(!w||!h)return;
    renderer.setPixelRatio(Math.min(devicePixelRatio,1.6,Math.sqrt(2560*1440/(w*h))));renderer.setSize(w,h,false);
    water.getRenderTarget().setSize(Math.max(1,Math.round(canvas.width*.38)),Math.max(1,Math.round(canvas.height*.38)));
    composite.setSize(canvas.width,canvas.height);film.uniforms.aspect.value=w/h;
    film.uniforms.texel.value.set(1/canvas.width,1/canvas.height);
    stacked=getComputedStyle(stage).getPropertyValue('--stacked').trim()==='1';
    frameSheet();camera.aspect=w/h;camera.fov=27;camera.updateProjectionMatrix();draw(0);stage.classList.add('scene-ready');
  }
  new ResizeObserver(size).observe(canvas);
  stage.addEventListener('skilllevelup',()=>{
    if(paused)return;
    upgradeStart=time;upgradeDirection*=-1;
    operator.begin();entryStart=time;
  });
  stage.addEventListener('recordchange',()=>{frameSheet();if(paused)draw(0);});
  stage.addEventListener('pointermove',e=>{pointer=(e.clientX/stage.clientWidth-.5)*2;});
  stage.addEventListener('pointerleave',()=>{pointer=0;});
  stage.addEventListener('posechange',()=>{frameSheet();if(paused)draw(0);});
  pause.addEventListener('click',()=>{paused=!paused;updatePause();schedule();});
  motion.addEventListener('change',()=>{paused=motion.matches;updatePause();schedule();});
  document.addEventListener('visibilitychange',schedule);
  canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();cancelAnimationFrame(frame);stage.classList.remove('scene-ready');});
  canvas.addEventListener('webglcontextrestored',()=>{bakeEnvironment();size();schedule();});
  pause.disabled=false;updatePause();size();schedule();
}
