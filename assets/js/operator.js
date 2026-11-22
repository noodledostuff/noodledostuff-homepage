import * as T from '../vendor/three/three.module.min.js';
import {MeshoptDecoder} from '../vendor/meshoptimizer/meshopt_decoder.module.js';
import {GLTFLoader} from '../vendor/three-vrm/runtime.js';

export async function createOperator(){
  const file=await new GLTFLoader().setMeshoptDecoder(MeshoptDecoder).loadAsync(new URL('../models/portrait-operator.glb?v=street-studio-2',import.meta.url).href);
  const root=file.scene;
  const mixer=new T.AnimationMixer(root);
  const action=name=>mixer.clipAction(T.AnimationClip.findByName(file.animations,name)).play();
  const arrival=action('Portrait arrival'), presentation=action('Portrait presentation');
  const idle=action('Portrait listening');
  const disciplines=new Map(['cinema','edit','model','mocap','live'].map(key=>{
    const take=action('Discipline '+key);
    take.setEffectiveWeight(0);
    return [key,take];
  }));
  let entrance=arrival,discipline=false;
  for(const take of [arrival,presentation]){
    take.setLoop(T.LoopOnce,1);
    take.clampWhenFinished=true;
    take.setEffectiveWeight(0);
  }
  const joints=[],expressions=[],hairMultisample={value:false};
  root.traverse(node=>{
    if(node.isBone)joints.push({node,p:new T.Vector3(),q:new T.Quaternion()});
    if(node.isSkinnedMesh)node.frustumCulled=false;
    if(node.morphTargetInfluences)expressions.push({node,previous:[...node.morphTargetInfluences]});
    const hair=node.material;
    if(hair?.name.startsWith('Hair |') && hair.alphaTest>0){
      hair.map.anisotropy=8;
      hair.roughness=.55;
      hair.sheen=.38;
      hair.sheenColor.set(0x918aaa);
      hair.sheenRoughness=.52;
      if(hair.name==='Hair | separated navy fiber clumps'){
        // The fiber atlas runs lengthwise along V.
        hair.anisotropy=.54;
        hair.anisotropyRotation=Math.PI/2;
      }
      // Use fractional strand coverage in the multisampled portrait pass and a cutout in reflections.
      const multisample=hairMultisample;
      node.onBeforeRender=renderer=>{
        multisample.value=(renderer.getRenderTarget()?.samples||0)>1;
        hair.alphaToCoverage=multisample.value;
      };
      hair.onBeforeCompile=shader=>{
        shader.uniforms.hairMultisample=multisample;
        shader.fragmentShader='uniform bool hairMultisample;\n'+shader.fragmentShader;
        shader.fragmentShader=shader.fragmentShader.replace('#include <alphatest_fragment>',`
          float coverage=diffuseColor.a;
          if(hairMultisample){
            float width=max(fwidth(coverage),0.18);
            coverage=smoothstep(alphaTest-width,alphaTest+width,coverage);
            if(coverage<0.006)discard;
          }else if(coverage<alphaTest)discard;
        `).replace('#include <opaque_fragment>',`#include <opaque_fragment>
          if(hairMultisample)gl_FragColor.a=coverage;`);
      };
    }
    if(node.material?.name==='Eyewear | clear coated optical glass'){
      // The actor and street render in separate passes. Sample the street probe on the
      // optical surfaces and let the existing color buffer show through the lenses.
      const lens=node.material;
      lens.transmission=0;
      lens.metalness=1;
      lens.transparent=true;
      lens.depthWrite=false;
      lens.side=T.FrontSide;
      node.renderOrder=2;
      lens.onBeforeCompile=shader=>{
        shader.fragmentShader=shader.fragmentShader.replace('#include <opaque_fragment>', `
          float viewCos=clamp(dot(normal,normalize(vViewPosition)),0.0,1.0);
          float fresnel=0.035+0.78*pow(1.0-viewCos,5.0);
          float highlight=smoothstep(1.0,4.0,max(max(outgoingLight.r,outgoingLight.g),outgoingLight.b));
          diffuseColor.a=clamp(fresnel+0.15*highlight,0.0,0.85);
          #include <opaque_fragment>
        `);
      };
    }
  });
  // Crossfading two planted poses in joint space can arc a sole through the road.
  // Project the blended knees back onto the two planted ankle targets during transitions.
  const plants=[];
  const hipPos=new T.Vector3(),kneePos=new T.Vector3(),anklePos=new T.Vector3();
  const target=new T.Vector3(),axis=new T.Vector3(),bend=new T.Vector3(),kneeTarget=new T.Vector3();
  const before=new T.Vector3(),after=new T.Vector3(),pivot=new T.Vector3();
  const turn=new T.Quaternion(),world=new T.Quaternion(),parentRotation=new T.Quaternion();
  function aimJoint(joint,child,point){
    joint.getWorldPosition(pivot);
    child.getWorldPosition(before).sub(pivot).normalize();
    after.copy(point).sub(pivot).normalize();
    turn.setFromUnitVectors(before,after).multiply(joint.getWorldQuaternion(world));
    joint.quaternion.copy(joint.parent.getWorldQuaternion(parentRotation).invert().multiply(turn));
  }
  function plantFeet(){
    for(const leg of plants){
      const {thigh,shin,foot}=leg;
      thigh.getWorldPosition(hipPos);shin.getWorldPosition(kneePos);foot.getWorldPosition(anklePos);
      root.localToWorld(target.copy(leg.anchor));
      const upper=hipPos.distanceTo(kneePos),lower=kneePos.distanceTo(anklePos);
      axis.copy(target).sub(hipPos);
      const reach=Math.min(axis.length(),upper+lower-.000001);
      axis.normalize();
      bend.copy(kneePos).sub(hipPos);
      bend.addScaledVector(axis,-bend.dot(axis)).normalize();
      const along=(upper*upper-lower*lower+reach*reach)/(2*reach);
      kneeTarget.copy(hipPos).addScaledVector(axis,along)
        .addScaledVector(bend,Math.sqrt(Math.max(0,upper*upper-along*along)));
      aimJoint(thigh,shin,kneeTarget);aimJoint(shin,foot,target);
      const facing=root.getWorldQuaternion(world).multiply(leg.rotation);
      foot.quaternion.copy(shin.getWorldQuaternion(parentRotation).invert().multiply(facing));
    }
  }
  function begin(selection=false){
    entrance.setEffectiveWeight(0);
    discipline=disciplines.has(selection);
    entrance=disciplines.get(selection) || (selection===true ? presentation : arrival);
    for(const {node,previous} of expressions)previous.splice(0,previous.length,...node.morphTargetInfluences);
    for(const {node,p,q} of joints){p.copy(node.position);q.copy(node.quaternion);}
  }
  function pose(seconds,elapsed,still){
    const duration=entrance.getClip().duration;
    const playing=Number.isFinite(elapsed) && !still;
    const idleWeight=discipline ? 0 : playing ? T.MathUtils.smoothstep(elapsed,duration-.22,duration) : 1;
    entrance.time=discipline ? (playing ? elapsed%duration : duration*.40) : playing ? Math.min(duration,elapsed) : 0;
    const idleTime=playing ? Math.max(0,elapsed-duration+.22) : seconds;
    idle.time=idleTime%idle.getClip().duration;
    idle.setEffectiveWeight(idleWeight);
    entrance.setEffectiveWeight(1-idleWeight);
    mixer.update(0);
    // A second selection can interrupt any frame of the preceding clip.
    if(playing && elapsed<.24){
      const previous=1-T.MathUtils.smoothstep(elapsed,0,.24);
      for(const {node,p,q} of joints){node.position.lerp(p,previous);node.quaternion.slerp(q,previous);}
      for(const face of expressions)face.node.morphTargetInfluences.forEach((v,i,arr)=>{
        arr[i]=T.MathUtils.lerp(v,face.previous[i],previous);
      });
    }
    if(playing && (elapsed<.24 || (idleWeight>0 && idleWeight<1)))plantFeet();
  }
  pose(0,Infinity,true);
  for(const side of ['Left','Right']){
    const bone=suffix=>root.getObjectByName('mixamorig'+side+suffix);
    const foot=bone('Foot');
    plants.push({thigh:bone('UpLeg'),shin:bone('Leg'),foot,
      anchor:root.worldToLocal(foot.getWorldPosition(new T.Vector3())),
      rotation:root.getWorldQuaternion(new T.Quaternion()).invert().multiply(foot.getWorldQuaternion(new T.Quaternion()))});
  }
  begin();
  return {root,begin,pose,get duration(){return entrance.getClip().duration;},head:root.getObjectByName('mixamorigHead'),wrist:root.getObjectByName('mixamorigRightHand'),hips:root.getObjectByName('mixamorigHips')};
}
