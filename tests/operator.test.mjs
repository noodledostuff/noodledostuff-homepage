import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {cameraShot,levelUpShot,lobbyAngle} from '../assets/js/shots.js';

test('street orbit drifts through every mark and accelerates between them',()=>{
  assert.deepEqual(lobbyAngle(72),lobbyAngle(0));
  const speed=t=>Math.hypot(...lobbyAngle(t+.01).map((v,i)=>v-lobbyAngle(t)[i]));
  assert.ok(speed(6)>4*speed(0));
  for(let t=0;t<72;t+=.05)assert.ok(speed(t)>1e-6);
  const left=lobbyAngle(71.999),right=lobbyAngle(.001),seam=lobbyAngle(0);
  assert.ok(seam.every((v,i)=>Math.abs(left[i]+right[i]-2*v)<1e-6));
  const overhead=lobbyAngle(24);
  assert.ok(overhead[2]>Math.PI/2);
  assert.equal(overhead[3],Math.PI/4);
  for(let frame=1;frame<=72*30;frame++){
    const previous=lobbyAngle((frame-1)/30),next=lobbyAngle(frame/30);
    // Position in metres, orbit in radians, lens in degrees per 30 fps frame.
    const limits=[.01,.025,.03,.015,.18];
    assert.ok(next.every((v,i)=>Math.abs(v-previous[i])<limits[i]));
  }
});

test('opening camera loop moves from wide to detail and back over two minutes',()=>{
  const wide=cameraShot('turn',0);
  assert.deepEqual(cameraShot('turn',120),wide);
  assert.ok(cameraShot('turn',38)[1]<wide[1]);
  assert.ok(cameraShot('turn',55)[0]<1);
  assert.ok(cameraShot('turn',78)[0]>1.30);
  for(let t=0;t<120;t+=.25){
    const frame=cameraShot('turn',t),next=cameraShot('turn',t+.25);
    assert.ok(frame.every((v,i)=>Math.abs(v-next[i])<.04));
  }
  const shots=['turn','lean','gaze','rear'].map(mode=>cameraShot(mode,0).join());
  assert.equal(new Set(shots).size,4);
});

test('each discipline frames its own work, technique and equipment views',()=>{
  const closeUps=new Set();
  for(const skill of ['cinema','edit','model','mocap','live']){
    const work=cameraShot('turn',0,skill,'work');
    const technique=cameraShot('turn',0,skill,'technique');
    const equipment=cameraShot('turn',0,skill,'equipment');
    assert.ok(technique[1]<work[1] && technique[1]<equipment[1]);
    assert.notEqual(technique[2],equipment[2]);
    closeUps.add(technique.join());
  }
  assert.equal(closeUps.size,5);
});

test('the portrait ships head-bound glasses, facial shapes, and three planted conversation mocap clips',()=>{
  const bytes=readFileSync(new URL('../assets/models/portrait-operator.glb',import.meta.url));
  assert.equal(bytes.toString('ascii',0,4),'glTF');
  assert.equal(bytes.readUInt32LE(8),bytes.length);
  const doc=JSON.parse(bytes.toString('utf8',20,20+bytes.readUInt32LE(12)));
  const jointNames=doc.skins[0].joints.map(i=>doc.nodes[i].name);
  assert.equal(jointNames.length,52);
  assert.ok(doc.images.every(image=>Number.isInteger(image.bufferView)));
  const glasses=doc.nodes.filter(n=>n.name?.startsWith('Glasses |'));
  assert.equal(glasses.length,3);
  for(const node of glasses)assert.equal(node.skin,0);
  const lens=doc.materials.find(m=>m.name==='Eyewear | clear coated optical glass');
  assert.equal(lens.extensions.KHR_materials_transmission.transmissionFactor,1);
  const face=doc.meshes.find(m=>m.extras?.targetNames?.includes('eyeBlinkLeft'));
  assert.equal(face.extras.targetNames.length,51);
  for(const [name,duration] of [['Portrait arrival',6.4],['Portrait presentation',6.8],['Portrait listening',24.8],['Discipline cinema',5.6],['Discipline edit',6.4],['Discipline model',7.2],['Discipline mocap',6.8],['Discipline live',5.2]]){
    const clip=doc.animations.find(a=>a.name===name);
    const end=Math.max(...clip.samplers.map(s=>doc.accessors[s.input].max[0]));
    assert.ok(Math.abs(end-duration)<.001);
    const joints=clip.channels.map(c=>doc.nodes[c.target.node].name);
    for(const bone of ['Head','RightHand','RightHandIndex1','Hips'])assert.ok(joints.includes('mixamorig:'+bone));
    assert.ok(clip.channels.some(c=>c.target.path==='weights'));
  }
  const disciplineClips=doc.animations.filter(a=>a.name.startsWith('Discipline '));
  assert.equal(new Set(disciplineClips.map(a=>a.extras.motionSource)).size,5);
  for(const [kit,hand] of Object.entries({cinema:'Right',edit:'Left',model:'Right',model_slate:'Left',mocap:'Right',live:'Right'})){
    const socket=doc.nodes.findIndex(n=>n.name==='Grip_'+kit);
    assert.ok(doc.nodes.find(n=>n.name==='mixamorig:'+hand+'Hand').children.includes(socket));
    assert.equal(doc.nodes[doc.nodes[socket].children[0]].name,'Kit_'+kit);
  }
});

test('levelling a skill pushes in, orbits in either direction and returns to the live frame',()=>{
  const base=cameraShot('gaze',0);
  for(const direction of [-1,1]){
    assert.deepEqual(levelUpShot(base,0,direction),base);
    const close=levelUpShot(base,2,direction);
    assert.ok(close[1]<base[1]);
    assert.ok((close[2]-base[2])*direction>.6);
    assert.deepEqual(levelUpShot(base,4.4,direction),base);
    assert.deepEqual(levelUpShot(base,Infinity,direction),base);
  }
});
