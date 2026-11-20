import * as T from '../vendor/three/three.module.min.js';
import {dressRooftops,wetDeck} from './roof-detail.js';
import {createOperator} from './operator.js';
import {cameraShot} from './shots.js';

const stage=document.querySelector('.rooftop');
if (stage) {
  mount(stage).catch(error => console.warn('Rooftop preview unavailable',error));
}

async function mount(stage) {
  const canvas=stage.querySelector('canvas');
  const renderer=new T.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'low-power'});
  const scene=new T.Scene(), camera=new T.PerspectiveCamera(32,1,.09,200);
  scene.fog=new T.FogExp2('#30314a',.025);
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
    const panel=new T.Mesh(new T.PlaneGeometry(w,h),basic({map}));
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
  // A soft sky dome still has a horizon when the camera moves.
  const skyTexture=texture(1024,512,(ctx,w,h)=>{
    const grad=ctx.createLinearGradient(0,0,0,h);
    for(const [p,c] of [[0,'#101731'],[.30,'#24274b'],[.46,'#55547b'],[.54,'#ab7c97'],[.62,'#d9a4a3'],[1,'#514765']])grad.addColorStop(p,c);
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

  const floorTex=texture(256,256,(ctx,w,h)=>{
    ctx.fillStyle='#596373';ctx.fillRect(0,0,w,h);
    for(let i=0;i<4800;i++){
      ctx.fillStyle=rand()>.5?'rgba(255,240,224,.1)':'rgba(15,24,39,.12)';
      ctx.fillRect(rand()*w,rand()*h,2,1);
    }
    ctx.strokeStyle='#414955';ctx.lineWidth=3;ctx.strokeRect(0,0,w,h);
  });
  floorTex.wrapS=floorTex.wrapT=T.RepeatWrapping;floorTex.repeat.set(15,9);
  box(0,-.17,.80,22,.30,13,new T.MeshStandardMaterial({map:floorTex,bumpMap:floorTex,bumpScale:.028,roughness:.64}));
  box(0,.09,-5.65,22,.22,.27,'#55606d');
  for(let i=-10;i<=10;i+=2)box(i,.53,-5.65,.045,.89,.045,'#596878');
  for(const y of [.50,.91])box(0,y,-5.65,22,.037,.048,'#748d9b');
  dressRooftops(city,box,texture,sign,rand);
  // Two rooftop utility housings anchor the immediate foreground.
  for(const side of [-1,1]){
    box(side*5,.45,-2.3,1.36,.9,.95,'#687482');
    for(let i=0;i<8;i++)box(side*5,.15+i*.084,-1.815,1.05,.036,.024,'#323d51');
  }
  const glowMap=texture(64,64,ctx=>{
    const g=ctx.createRadialGradient(32,32,0,32,32,32);
    g.addColorStop(0,'rgba(255,255,255,.95)');g.addColorStop(.22,'rgba(255,255,255,.68)');
    g.addColorStop(.5,'rgba(255,255,255,.19)');g.addColorStop(1,'rgba(255,255,255,0)');
    ctx.fillStyle=g;ctx.fillRect(0,0,64,64);
  });
  // Light scatters through the haze at different depths in the street.
  for (const [x,y,z,w,h,color] of [
    [-5,1.5,-8,8,4,0xe77398],[6,2.3,-10,8,4,0x56b5c6],
    [-2,2,-20,19,6,0xda8e79],[8,4,-30,24,6,0x92a4d2]
  ]) {
    const mist=new T.Sprite(new T.SpriteMaterial({map:glowMap,color,opacity:.18,
      transparent:true,blending:T.AdditiveBlending,depthWrite:false}));
    mist.position.set(x,y,z);mist.scale.set(w,h,1);scene.add(mist);
  }
  const lamp=new T.Mesh(new T.SphereGeometry(.040,24,16),basic({color:0xffe3b4}));
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
  for(const [x,y,z,color,power] of [[1.02,1.43,-5.65,0xffbf80,9],[-2.8,3,-10.3,0xff5792,18],[3.2,.25,-12.1,0x65efe0,14]]){
    const spill=new T.PointLight(color,power,12,2);spill.position.set(x,y,z);scene.add(spill);
  }
  // Keep repeated window frames, pipes, fans and rails to one draw per material and geometry.
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
  // The buildings and practicals are fixed, so their shadows and glossy metal probe are baked once.
  const water=wetDeck();scene.add(water);
  let environment;
  function bakeEnvironment(){
    renderer.shadowMap.autoUpdate=false;renderer.shadowMap.needsUpdate=true;
    scene.environment=null;water.visible=false;
    const probe=new T.WebGLCubeRenderTarget(128),capture=new T.CubeCamera(.1,180,probe);
    capture.position.set(.4,1.05,-3.5);capture.update(renderer,scene);
    const pmrem=new T.PMREMGenerator(renderer);
    environment?.dispose();environment=pmrem.fromCubemap(probe.texture);
    scene.environment=environment.texture;water.visible=true;
    probe.dispose();pmrem.dispose();
  }
  bakeEnvironment();
  const operator=await createOperator();
  actorScene.add(operator.root);
  const blurred=new T.WebGLRenderTarget(1,1,{depthBuffer:true});
  const screen=new T.Scene(), ortho=new T.OrthographicCamera(-1,1,1,-1,0,1);
  const blur=new T.ShaderMaterial({
    uniforms:{city:{value:blurred.texture},pixel:{value:new T.Vector2()}},
    vertexShader:'varying vec2 uv0; void main(){uv0=uv;gl_Position=vec4(position.xy,0.,1.);}',
    fragmentShader:`uniform sampler2D city; uniform vec2 pixel; varying vec2 uv0;
      void main(){
        vec3 c=texture2D(city,uv0).rgb*.20;
        for(int i=0;i<8;i++){
          float a=float(i)*.785398;
          c+=texture2D(city,uv0+vec2(cos(a),sin(a))*pixel).rgb*.10;
        }
        c=c*vec3(.88,.88,.97)+vec3(.003,.004,.009);
        gl_FragColor=vec4(c,1.);
        #include <colorspace_fragment>
      }`,depthTest:false,depthWrite:false
  });
  screen.add(new T.Mesh(new T.PlaneGeometry(2,2),blur));
  const composite=new T.WebGLRenderTarget(1,1,{
    type:renderer.capabilities.isWebGL2 && renderer.extensions.has('EXT_color_buffer_float') ? T.HalfFloatType : T.UnsignedByteType,
    samples:renderer.capabilities.isWebGL2 ? Math.min(2,renderer.capabilities.maxSamples) : 0
  });
  const film=new T.ShaderMaterial({
    uniforms:{frameMap:{value:composite.texture},source:{value:new T.Vector3()},aspect:{value:1},grainFrame:{value:0}},
    vertexShader:blur.vertexShader,
    fragmentShader:`uniform sampler2D frameMap;
      uniform vec3 source;
      uniform float aspect,grainFrame;
      varying vec2 uv0;
      void main(){
        vec3 c=texture2D(frameMap,uv0).rgb;
        vec2 delta=(uv0-source.xy)*vec2(aspect,1.);
        float inside=step(0.,source.z)*(1.-smoothstep(.45,.5,max(abs(source.x-.5),abs(source.y-.5))));
        // Sample the composited lamp so foreground silhouettes can mask its flare.
        float visibility=inside*smoothstep(.55,.94,texture2D(frameMap,source.xy).r);
        float streak=exp(-abs(delta.x)*9.-abs(delta.y)*340.);
        vec2 ghost=(uv0-(.5+(.5-source.xy)*.62))*vec2(aspect,1.);
        float iris=1.-smoothstep(.027,.054,length(ghost));
        c+=visibility*(vec3(.24,.115,.047)*streak+vec3(.012,.036,.042)*iris);
        float vignette=smoothstep(.18,.78,length(uv0-.5));
        c*=1.-.23*vignette;
        c=(c*(1.15+.28*c))/(1.+.54*c);
        gl_FragColor=vec4(c,1.);
        #include <colorspace_fragment>
        vec3 hash=fract(vec3(gl_FragCoord.xy,grainFrame)*.1031);
        hash+=dot(hash,hash.yzx+33.33);
        float noise=fract((hash.x+hash.y)*hash.z)-.5;
        gl_FragColor.rgb+=noise*.025;
      }`,depthTest:false,depthWrite:false
  });
  const finish=new T.Scene();
  finish.add(new T.Mesh(screen.children[0].geometry,film));
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  let paused=motion.matches,frame=0,last=0,time=0,pointer=0,drift=0;
  const pause=stage.querySelector('[data-pause]');
  function updatePause(){
    pause.setAttribute('aria-pressed',String(paused));
    pause.textContent=paused?(document.documentElement.lang.startsWith('zh')?'播放動態':'Resume motion'):(document.documentElement.lang.startsWith('zh')?'暫停動態':'Pause motion');
  }
  let [height,distance,angle]=cameraShot('turn',0), shotStart=0,previousMode='turn';
  const dialog=stage.querySelector('dialog');
  let sheetOffset=0, stacked=false;
  function frameSheet(){
    const bounds=dialog.getBoundingClientRect();
    const h=canvas.clientHeight;
    sheetOffset=dialog.open && bounds.width>canvas.clientWidth*.85 ? Math.max(0,h*.43-bounds.top*.52) : 0;
  }
  new ResizeObserver(()=>{frameSheet();if(paused)draw(0);}).observe(dialog);
  function draw(dt){
    const mode=stage.dataset.pose || 'turn';
    if(mode!==previousMode){previousMode=mode;shotStart=time;}
    const shot=cameraShot(mode,time-shotStart);
    const portrait=stacked;
    const overlay=stage.hasAttribute('data-open');
    const damping=dt===0 ? 1 : 1-Math.exp(-dt*1.55);
    drift+=((paused?0:pointer)-drift)*damping;
    height+=(shot[0]-height)*damping;
    distance+=(shot[1]+(portrait?.65:0)-distance)*damping;
    angle+=(shot[2]+drift*.035+.033*Math.sin(time*.12)-angle)*damping;
    const w=canvas.clientWidth,h=canvas.clientHeight;
    const fraction=portrait ? (overlay ? .43 : .56) : (overlay ? .28 : .325);
    camera.setViewOffset(w,h,(.5-fraction)*w,overlay ? sheetOffset : portrait ? -.105*h : 0,w,h);
    camera.position.set(Math.sin(angle)*distance,height+.28,Math.cos(angle)*distance);
    camera.lookAt(0,height,0);
    operator.root.rotation.y=1.91+.025*Math.sin(time*.31);
    operator.pose(mode,time,dt);
    renderFilm();
  }
  function renderFilm(){
    renderer.setRenderTarget(blurred);renderer.render(scene,camera);
    renderer.setRenderTarget(composite);renderer.render(screen,ortho);
    renderer.autoClear=false;renderer.clearDepth();renderer.render(actorScene,camera);renderer.autoClear=true;
    const source=film.uniforms.source.value.copy(lamp.position).project(camera);
    source.set(source.x*.5+.5,source.y*.5+.5,1-Math.abs(source.z));
    film.uniforms.grainFrame.value=Math.floor(time*18)%4096;
    renderer.setRenderTarget(null);renderer.render(finish,ortho);
  }
  function tick(now){
    const elapsed=last?Math.max(0,(now-last)/1000):0;
    last=now;time+=elapsed;draw(Math.min(.08,elapsed));
    if(!paused&&!document.hidden)frame=requestAnimationFrame(tick);
  }
  function schedule(){cancelAnimationFrame(frame);last=0;if(!document.hidden)frame=requestAnimationFrame(tick);}
  function size(){
    const w=canvas.clientWidth,h=canvas.clientHeight;if(!w||!h)return;
    renderer.setPixelRatio(Math.min(devicePixelRatio,1.6,Math.sqrt(2560*1440/(w*h))));renderer.setSize(w,h,false);
    blurred.setSize(Math.max(1,Math.round(canvas.width*.83)),Math.max(1,Math.round(canvas.height*.83)));
    water.getRenderTarget().setSize(Math.max(1,Math.round(blurred.width*.45)),Math.max(1,Math.round(blurred.height*.45)));
    blur.uniforms.pixel.value.set(.85/w,.85/h);
    composite.setSize(canvas.width,canvas.height);film.uniforms.aspect.value=w/h;
    stacked=getComputedStyle(stage).getPropertyValue('--stacked').trim()==='1';
    frameSheet();camera.aspect=w/h;camera.fov=20;camera.updateProjectionMatrix();draw(0);stage.classList.add('scene-ready');
  }
  new ResizeObserver(size).observe(canvas);
  stage.addEventListener('pointermove',e=>{pointer=(e.clientX/stage.clientWidth-.5)*2;});
  stage.addEventListener('pointerleave',()=>{pointer=0;});
  stage.addEventListener('posechange',()=>{frameSheet();if(paused)draw(0);});
  stage.addEventListener('photo',()=>{
    renderFilm();
    canvas.toBlob(blob=>{
      if(!blob)return;
      const a=document.createElement('a');a.download='mong-kok-rooftop.png';
      a.href=URL.createObjectURL(blob);a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);
    });
  });
  pause.addEventListener('click',()=>{paused=!paused;updatePause();schedule();});
  motion.addEventListener('change',()=>{paused=motion.matches;updatePause();schedule();});
  document.addEventListener('visibilitychange',schedule);
  canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();cancelAnimationFrame(frame);stage.classList.remove('scene-ready');});
  canvas.addEventListener('webglcontextrestored',()=>{bakeEnvironment();size();schedule();});
  pause.disabled=false;updatePause();size();schedule();
}
