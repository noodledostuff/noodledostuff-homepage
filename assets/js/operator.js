import * as T from '../vendor/three/three.module.min.js';
import {GLTFLoader, VRMLoaderPlugin} from '../vendor/three-vrm/runtime.js';

export async function createOperator() {
  const loader = new GLTFLoader();
  loader.register(parser => new VRMLoaderPlugin(parser));
  const file = await loader.loadAsync(new URL('../models/rooftop-standin.vrm', import.meta.url).href);
  const vrm = file.userData.vrm;
  const root = vrm.scene;
  const nightShade=new T.Color(.22,.27,.41);
  for(const material of vrm.materials){
    if(!material.isMToonMaterial || material.isOutline)continue;
    material.shadeColorFactor.multiply(nightShade);
    material.shadingToonyFactor=.46;
    material.giEqualizationFactor=.35;
    material.parametricRimColorFactor.set(/Hair/.test(material.name)?0xb2b8ee:0x828eab);
    material.parametricRimFresnelPowerFactor=4.6;
    material.parametricRimLiftFactor=.025;
    material.rimLightingMixFactor=.56;
  }
  const bone = name => vrm.humanoid.getNormalizedBoneNode(name);
  root.updateMatrixWorld(true);
  const raw = name => vrm.humanoid.getRawBoneNode(name);
  function mountAt(joint) {
    const mount=new T.Group();
    joint.getWorldPosition(mount.position);
    joint.attach(mount);
    return mount;
  }
  const headset=mountAt(raw('head'));

  // Fit the headset to this temporary model; all shot animation uses normalized VRM bones.
  const band = new T.MeshStandardMaterial({color:0x25243b, roughness:.45, metalness:.4});
  const light = new T.MeshBasicMaterial({color:0x71efff});
  function accessory(geometry, material, x, y, z) {
    const mesh = new T.Mesh(geometry,material);
    mesh.position.set(x,y,z);headset.add(mesh);return mesh;
  }
  const hoop = accessory(new T.TorusGeometry(.113,.009,14,80,Math.PI),band,0,.074,-.023);
  hoop.scale.y=1.20;
  for (const side of [-1,1]) {
    const cup=accessory(new T.LatheGeometry([[.001,-.012],[.042,-.012],[.050,-.009],[.052,-.005],[.051,.005],[.046,.012],[.001,.012]].map(([r,y])=>new T.Vector2(r,y)),48),band,side*.111,.067,-.006);
    cup.rotation.z=Math.PI/2;
    const ring=accessory(new T.TorusGeometry(.034,.003,12,48),light,side*.125,.067,-.006);
    ring.rotation.y=Math.PI/2;
  }
  const fabric=new T.MeshStandardMaterial({color:0x303249,roughness:.88});
  const cuff=new T.MeshStandardMaterial({color:0x8b8aa9,roughness:.74});
  for(const side of ['left','right']){
    const elbow=raw(side+'LowerArm'), hand=raw(side+'Hand');
    const start=elbow.getWorldPosition(new T.Vector3()), end=hand.getWorldPosition(new T.Vector3());
    const vector=end.sub(start), sleeve=mountAt(elbow);
    const axis=new T.Vector3(0,1,0), length=vector.length();
    function segment(from,to,r1,r2,material){
      const mesh=new T.Mesh(new T.CylinderGeometry(r2,r1,length*(to-from),32),material);
      mesh.position.copy(vector).multiplyScalar((from+to)/2);
      mesh.quaternion.setFromUnitVectors(axis,vector.clone().normalize());
      sleeve.add(mesh);
    }
    segment(-.18,.87,.055,.051,fabric);
    segment(.73,.89,.053,.052,cuff);
    segment(.90,.98,.044,.041,band);
    segment(.64,.69,.054,.054,light);
  }
  const rotation=new T.Euler(), target=new T.Quaternion();
  const supportHand=bone('leftHand'),gripHand=bone('rightHand');
  const supportArm=[bone('leftLowerArm'),bone('leftUpperArm')];
  const gripTarget=new T.Vector3(),tip=new T.Vector3(),aim=new T.Vector3(),swing=new T.Quaternion();
  function supportLens(){
    // Work in each joint's local frame so the left palm follows the lens as the right wrist rises.
    gripHand.getWorldPosition(gripTarget);gripTarget.x+=.09;gripTarget.y+=.005;gripTarget.z+=.014;
    for(let pass=0;pass<4;pass++){
      for(const joint of supportArm){
        joint.worldToLocal(supportHand.getWorldPosition(tip)).normalize();
        joint.worldToLocal(aim.copy(gripTarget)).normalize();
        swing.setFromUnitVectors(tip,aim);
        joint.quaternion.multiply(swing);
      }
    }
  }
  function pose(mode,t,dt,skill) {
    const breath=Math.sin(t*.84), sway=Math.sin(t*.39), lean=mode==='lean', gaze=mode==='gaze', rear=mode==='rear';
    const blend=dt===0?1:1-Math.exp(-dt*1.9);
    function turn(name,x,y,z) {
      const joint=bone(name);
      if (!joint) return;
      target.setFromEuler(rotation.set(x,y,z,'YXZ'));
      joint.quaternion.slerp(target,blend);
    }
    // Wrist and elbow cycles keep each tool in use between camera changes.
    const reach=Math.sin(t*.71),fine=Math.sin(t*1.14);
    const action={
      cinema:[-.78,.17,1.08,1.77+.10*sway,-.47,.10],
      edit:[-.53+.07*reach,.04,1.12,1.37+.18*reach,-.83,.24],
      model:[-.64+.13*reach,.10+.09*fine,1.12,1.59+.22*fine,-.74,.13],
      mocap:[-.49+.28*reach,.12+.21*sway,1.05+.24*sway,1.02+.40*reach,-.76,.02],
      live:[-.59,.18,1.22,1.92+.08*reach,-.88,-.04]
    }[skill];
    turn('hips',0,.08,.04);
    turn('spine',lean?.14:-.04,.12+.02*sway,-.07);
    turn('chest',.017*breath,lean?-.38:-.30,.10);
    turn('neck',lean?.10:-.02,-.36,.09);
    turn('head',action?action[5]:gaze?-.12:lean?.14:-.05,action?action[4]+.05*sway:rear?-.68:-.99+.08*sway,-.09+.025*breath);
    turn('leftUpperArm',-.20,-.12,-1.42+.035*sway);
    turn('rightUpperArm',action?action[0]:gaze?-.52:-.30,action?action[1]:.13,action?action[2]:1.30);
    turn('leftLowerArm',skill==='cinema'?-.26:0,skill==='cinema'?-1.25:skill==='edit'?-.98+.16*fine:-.74,.19);
    turn('rightLowerArm',0,action?action[3]:gaze?1.64:.74,-.21);
    turn('leftHand',-.10,.24,.09);
    turn('rightHand',.03,-.29,.12);
    turn('leftUpperLeg',.02,0,-.06);
    turn('rightUpperLeg',-.08,0,.065);
    for(const side of ['left','right']){
      const sign=side==='left'?-1:1;
      for(const finger of ['Index','Middle','Ring','Little']){
        turn(side+finger+'Proximal',0,0,sign*(action && side==='right'?.79:gaze?.39:.26));
        turn(side+finger+'Intermediate',0,0,sign*.31);
      }
    }
    vrm.expressionManager?.setValue('blink',Math.pow(Math.max(0,Math.cos(t*1.06+2.0)),235));
    vrm.expressionManager?.setValue('happy',lean?.22:.09);
    if(skill==='cinema')supportLens();
    vrm.update(dt);
  }
  pose('turn',0,0);
  return {root,pose,wrist:raw('rightHand')};
}
