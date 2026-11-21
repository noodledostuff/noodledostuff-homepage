import * as T from '../vendor/three/three.module.min.js';
import {GLTFLoader} from '../vendor/three-vrm/runtime.js';

export async function createOperator(){
  const file=await new GLTFLoader().loadAsync(new URL('../models/operative-004.glb',import.meta.url).href);
  const root=file.scene;
  const mixer=new T.AnimationMixer(root);
  const entrance=mixer.clipAction(T.AnimationClip.findByName(file.animations,'girl004_ui_enter01'));
  const idle=mixer.clipAction(T.AnimationClip.findByName(file.animations,'girl004_ui_stand01'));
  const facialIdle=mixer.clipAction(T.AnimationClip.findByName(file.animations,'girl004_ui_stand01_face'));
  const duration=entrance.getClip().duration;
  entrance.setLoop(T.LoopOnce,1);entrance.clampWhenFinished=true;
  entrance.play();idle.play();facialIdle.play();
  const joints=[];
  root.traverse(node=>{
    if(node.isBone)joints.push({node,p:new T.Vector3(),q:new T.Quaternion()});
    if(node.isSkinnedMesh)node.frustumCulled=false;
  });
  function begin(){
    for(const {node,p,q} of joints){p.copy(node.position);q.copy(node.quaternion);}
  }
  function pose(seconds,elapsed,still){
    const playing=Number.isFinite(elapsed) && !still;
    const idleWeight=playing ? T.MathUtils.smoothstep(elapsed,duration-.22,duration) : 1;
    entrance.time=playing ? Math.min(duration,elapsed) : 0;
    const idleTime=playing ? Math.max(0,elapsed-duration+.22) : seconds;
    for(const action of [idle,facialIdle]){
      action.time=idleTime%action.getClip().duration;
      action.setEffectiveWeight(idleWeight);
    }
    entrance.setEffectiveWeight(1-idleWeight);
    mixer.update(0);
    // A second selection can interrupt any frame of the preceding clip.
    if(playing && elapsed<.24){
      const previous=1-T.MathUtils.smoothstep(elapsed,0,.24);
      for(const {node,p,q} of joints){node.position.lerp(p,previous);node.quaternion.slerp(q,previous);}
    }
  }
  root.rotation.y=-Math.PI/2;
  pose(0,Infinity,true);
  return {root,begin,pose,duration,head:root.getObjectByName('Bip001-Head'),wrist:root.getObjectByName('Bip001-R-Hand'),hips:root.getObjectByName('Bip001-Pelvis')};
}
