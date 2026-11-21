import * as T from '../vendor/three/three.module.min.js';
import {RoundedBoxGeometry} from '../vendor/three/RoundedBoxGeometry.js';

export function studioGear(scene,actorScene,wrist) {
  const alloy=new T.MeshStandardMaterial({color:0x74838a,metalness:.87,roughness:.24});
  const shell=new T.MeshStandardMaterial({color:0x252c38,metalness:.5,roughness:.33});
  const rubber=new T.MeshStandardMaterial({color:0x161a23,roughness:.77});
  const optics=new T.MeshPhysicalMaterial({color:0x367386,metalness:.76,roughness:.08,clearcoat:1});
  const emit=color=>new T.MeshStandardMaterial({color,emissive:color,emissiveIntensity:1.1,roughness:.28});
  const ice=emit(0x75ccd6),warm=emit(0xffdbac),pink=emit(0xee70a2);
  const box=new RoundedBoxGeometry(1,1,1,2,.07),tube=new T.CylinderGeometry(1,1,1,20),ball=new T.SphereGeometry(1,16,12);
  function mesh(group,geometry,mat,x,y,z,w,h,d) {
    const part=new T.Mesh(geometry,mat);part.position.set(x,y,z);part.scale.set(w,h,d);group.add(part);return part;
  }
  function rod(group,a,b,r,mat=alloy) {
    const delta=new T.Vector3().subVectors(b,a),mid=a.clone().lerp(b,.5);
    const part=mesh(group,tube,mat,mid.x,mid.y,mid.z,r,delta.length(),r);
    part.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),delta.normalize());
  }
  function tripod(group,x,z,h) {
    mesh(group,tube,alloy,x,h*.5,z,.017,h,.017);
    for(let i=0;i<3;i++){
      const a=i*Math.PI*2/3;
      rod(group,new T.Vector3(x,.29,z),new T.Vector3(x+.32*Math.cos(a),.015,z+.32*Math.sin(a)),.015);
    }
    mesh(group,tube,rubber,x,h*.60,z,.031,.074,.031);
  }
  function monitor(group,x,y,z,w,h,mode) {
    mesh(group,box,shell,x,y,z,w,h,.045);
    mesh(group,box,rubber,x,y,z+.025,w*.93,h*.87,.008);
    for(let row=0;row<4;row++){
      for(let col=0;col<3;col++){
        const length=(.11+((row+col)%3)*.045)*w;
        const bar=mesh(group,box,[ice,pink,warm][(row+col)%3],x+w*(col-1)*.27,y+h*(row-1.5)*.16,z+.032,length,h*.056,.005);
        if(mode==='levels'){bar.rotation.z=Math.PI/2;bar.scale.x*=.55;}
      }
    }
  }
  const kits={};
  for(const key of ['cinema','edit','model','mocap','live']){
    const set=new T.Group(),held=new T.Group();set.visible=held.visible=false;
    scene.add(set);actorScene.add(held);kits[key]={set,held};
  }
  const cam=kits.cinema.held;
  mesh(cam,box,shell,.035,.062,0,.143,.102,.091);
  for(const [x,r,w,mat] of [[.127,.046,.065,shell],[.156,.049,.019,rubber],[.171,.042,.014,optics]]){
    mesh(cam,tube,mat,x,.065,0,r,w,r).rotation.z=Math.PI/2;
  }
  mesh(cam,box,rubber,.015,.14,0,.106,.018,.022);
  for(const x of [-.027,.056])mesh(cam,box,alloy,x,.124,0,.009,.035,.015);
  mesh(cam,box,rubber,.021,.015,.026,.042,.078,.045).rotation.z=-.14;
  mesh(cam,box,shell,-.062,.064,0,.034,.093,.081);
  for(const x of [.113,.121,.141,.149])mesh(cam,tube,rubber,x,.065,0,.048,.004,.048).rotation.z=Math.PI/2;
  mesh(cam,box,shell,.168,.111,0,.048,.007,.12).rotation.z=-.11;
  mesh(cam,box,shell,-.012,.144,-.013,.072,.045,.009).rotation.x=-.14;
  mesh(cam,box,ice,-.012,.144,-.006,.060,.036,.004).rotation.x=-.14;
  mesh(cam,box,pink,-.012,.084,.047,.013,.009,.004);
  const film=kits.cinema.set;
  for(const [x,z,h] of [[.91,-1.17,1.7],[-.94,-1.9,1.29]]){
    tripod(film,x,z,h);mesh(film,box,shell,x,h,z,.44,.31,.085);
    mesh(film,box,warm,x,h,z+.049,.39,.26,.012);
    for(const side of [-1,1])mesh(film,box,shell,x+side*.234,h,z+.05,.079,.30,.012).rotation.y=side*.58;
  }
  const edit=kits.edit;
  mesh(edit.held,box,shell,.04,.045,0,.20,.12,.015).rotation.z=-.1;
  mesh(edit.held,box,ice,.04,.045,.009,.17,.086,.005).rotation.z=-.1;
  tripod(edit.set,.86,-1.07,.88);monitor(edit.set,.86,1.03,-1.07,.63,.34,'timeline');
  const model=kits.model;
  mesh(model.held,tube,alloy,.01,.055,.014,.009,.16,.009).rotation.z=-.32;
  mesh(model.set,tube,shell,.82,.49,-1.10,.265,.10,.265);tripod(model.set,.82,-1.10,.47);
  const topology=new T.IcosahedronGeometry(.23,1),orb=new T.Group();model.set.add(orb);orb.position.set(.82,.86,-1.10);
  orb.add(new T.Mesh(topology,optics),new T.LineSegments(new T.EdgesGeometry(topology,1),new T.LineBasicMaterial({color:0x8ff5ef})));
  const motion=kits.mocap;
  for(const [x,z] of [[.86,-1.42],[-.75,-1.75]]){
    tripod(motion.set,x,z,1.3);mesh(motion.set,box,shell,x,1.33,z,.2,.10,.10);
    for(const dx of [-.06,0,.06])mesh(motion.set,ball,pink,x+dx,1.34,z+.051,.017,.017,.014);
  }
  for(const [dx,dy] of [[-.045,.03],[.046,.04],[.015,.105]]){
    rod(motion.held,new T.Vector3(0,0,0),new T.Vector3(dx,dy,0),.005,rubber);
    mesh(motion.held,ball,ice,dx,dy,0,.016,.016,.016);
  }
  const live=kits.live;
  mesh(live.held,box,shell,.015,.044,0,.047,.097,.034);mesh(live.held,tube,rubber,.033,.126,0,.005,.077,.005);
  mesh(live.held,box,ice,.013,.055,.018,.028,.022,.004);
  tripod(live.set,.84,-1.04,.77);mesh(live.set,box,shell,.84,.79,-1.04,.65,.06,.35);
  for(let i=0;i<8;i++){
    mesh(live.set,box,alloy,.60+i*.069,.825,-.99,.014,.011,.10);
    mesh(live.set,box,i%3?ice:pink,.60+i*.069,.837,-.99+.024*Math.sin(i),.033,.018,.019);
  }
  monitor(live.set,.84,.98,-1.18,.56,.27,'levels');
  // Reveal the full-size meshes, including their reflections, with the same world-space scan.
  const phase={value:1},surfaces=new Set();
  for(const {set,held} of Object.values(kits)){
    for(const group of [set,held])group.traverse(part=>{if(part.material)surfaces.add(part.material);});
  }
  for(const material of surfaces){
    material.onBeforeCompile=shader=>{
      shader.uniforms.kitPhase=phase;
      shader.vertexShader='varying vec3 kitWorld;\n'+shader.vertexShader.replace('#include <begin_vertex>',
        '#include <begin_vertex>\n kitWorld=(modelMatrix*vec4(transformed,1.)).xyz;');
      shader.fragmentShader='uniform float kitPhase; varying vec3 kitWorld;\n'+shader.fragmentShader.replace('#include <opaque_fragment>',`
        if(kitPhase<1.){
          vec3 cell=floor(kitWorld*155.);
          float noise=fract(sin(dot(cell,vec3(17.1,51.7,9.2)))*4375.1);
          float reveal=.70*clamp(kitWorld.y/1.95,0.,1.)+.29*noise;
          if(reveal>=kitPhase)discard;
          outgoingLight+=vec3(.28,.86,.91)*(1.-smoothstep(0.,.085,kitPhase-reveal));
        }
        #include <opaque_fragment>`);
    };
  }
  const spill=new T.PointLight(0xffcea1,0,4,2);spill.position.set(.91,1.65,-1.12);scene.add(spill);
  const keyLight=scene===actorScene ? spill : spill.clone();
  if(keyLight!==spill)actorScene.add(keyLight);
  const neutral=wrist.getWorldQuaternion(new T.Quaternion()).invert();
  const handRotation=new T.Quaternion(),toolRotation=new T.Quaternion().setFromAxisAngle(new T.Vector3(0,1,0),-.34);
  let selected='',age=1;
  return (key,t,dt,still)=>{
    if(key!==selected){
      if(kits[selected])kits[selected].set.visible=kits[selected].held.visible=false;
      selected=key;age=0;
    }
    const kit=kits[key];keyLight.intensity=spill.intensity=0;
    if(!kit)return;
    age=still?1:Math.min(1,age+dt*1.8);
    const ease=1-Math.pow(1-age,3);
    kit.set.visible=kit.held.visible=true;
    phase.value=age;
    wrist.localToWorld(kit.held.position.set(.018,0,0));
    actorScene.worldToLocal(kit.held.position);
    kit.held.quaternion.copy(wrist.getWorldQuaternion(handRotation)).multiply(neutral).multiply(toolRotation);
    orb.rotation.y=t*.25;
    if(key==='cinema' && scene.visible)keyLight.intensity=spill.intensity=3.4*ease;
  };
}