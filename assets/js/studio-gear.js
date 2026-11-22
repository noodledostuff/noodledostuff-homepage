import * as T from '../vendor/three/three.module.min.js';
import {GLTFLoader} from '../vendor/three-vrm/runtime.js';

export async function loadStudioEquipment(){
  const file=await new GLTFLoader().loadAsync(new URL('../models/studio-equipment.glb',import.meta.url).href);
  return file.scene;
}

export function studioGear(scene,actorScene,character,equipment,streetLights=scene){
  // Preserve the authored grips and animation tracks, replacing the preview meshes inside them.
  function mountGrip(key){
    const socket=character.getObjectByName('Grip_'+key);
    const original=character.getObjectByName('Kit_'+key);
    const held=equipment.getObjectByName('Held_'+key);
    held.name=original.name;held.position.copy(original.position);held.quaternion.copy(original.quaternion);
    socket.remove(original);socket.add(held);held.visible=false;
    return held;
  }
  const kits={};
  for(const key of ['cinema','edit','model','mocap','live']){
    const set=equipment.getObjectByName('Set_'+key);
    scene.add(set);set.visible=false;
    kits[key]={set,held:mountGrip(key)};
  }
  const slate=mountGrip('model_slate'),impeller=equipment.getObjectByName('Impeller');
  impeller.position.set(.82,.652,-1.1);kits.model.set.add(impeller);
  // Reveal the full-size meshes, including their reflections, with the same world-space scan.
  const phase={value:1},surfaces=new Set();
  for(const {set,held} of Object.values(kits)){
    for(const group of [set,held])group.traverse(part=>{if(part.material)surfaces.add(part.material);});
  }
  slate.traverse(part=>{if(part.material)surfaces.add(part.material);});
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

  // Fixed fixture counts keep kit switches from recompiling every street material.
  const rigs=[...new Set([actorScene,streetLights])].map(parent=>{
    return [0,1,2].map(()=>{
      const lamp=new T.SpotLight(0xffffff,0,6,.98,.76,2);
      parent.add(lamp,lamp.target);return lamp;
    });
  });
  const lightPlans={
    cinema:[[.91,1.70,-1.12,0xffdfb7,22],[-.94,1.29,-1.84,0xd6e9ff,14]],
    edit:[[.86,1.09,-1.03,0xc1d6ea,1.6]],
    mocap:[[.86,1.34,-1.35,0xee4535,.18],[-.75,1.34,-1.68,0xee4535,.18]],
    live:[[.84,.97,-1.20,0xb2e6c5,1.0]]
  };
  const screenPosition=new T.Vector3(),screenTarget=new T.Vector3();
  let selected='',age=1;
  return (key,t,dt,still)=>{
    if(key!==selected){
      if(kits[selected])kits[selected].set.visible=kits[selected].held.visible=false;
      selected=key;age=0;
    }
    slate.visible=key==='model';
    const kit=kits[key];
    age=still?1:Math.min(1,age+dt*1.8);
    phase.value=age;
    if(kit){
      kit.set.visible=kit.held.visible=true;kit.held.scale.setScalar(1);
      if(slate.visible)slate.scale.setScalar(1);
      impeller.rotation.y=t*.25;
    }
    const screen=key==='model'?slate:['cinema','edit','live'].includes(key)?kit.held:null;
    if(screen){
      screenPosition.set(key==='cinema'?-.026:.02,key==='cinema'?.128:.05,.025);
      screenTarget.copy(screenPosition);screenTarget.z+=.38;
      screen.localToWorld(screenPosition);screen.localToWorld(screenTarget);
      actorScene.worldToLocal(screenPosition);actorScene.worldToLocal(screenTarget);
    }
    for(const lamps of rigs){
      lamps.forEach((lamp,i)=>{
        const mark=lightPlans[key]?.[i];
        if(mark){
          lamp.position.set(mark[0],mark[1],mark[2]);
          lamp.target.position.set(0,key==='cinema'?1.07:1.23,0);
          lamp.color.setHex(mark[3]);lamp.intensity=mark[4]*age;
        }else if(i===2 && screen){
          lamp.position.copy(screenPosition);lamp.target.position.copy(screenTarget);
          lamp.color.setHex(key==='live'?0xa6bb84:0xcbdef0);lamp.intensity=(key==='live'?.015:.14)*age;
        }else lamp.intensity=0;
      });
    }
  };
}
