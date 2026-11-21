import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {cameraShot,levelUpShot} from '../assets/js/shots.js';

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

test('the operative ships matched body and facial rigs for both native menu clips',()=>{
  const bytes=readFileSync(new URL('../assets/models/operative-004.glb',import.meta.url));
  assert.equal(bytes.toString('ascii',0,4),'glTF');
  assert.equal(bytes.readUInt32LE(8),bytes.length);
  const doc=JSON.parse(bytes.toString('utf8',20,20+bytes.readUInt32LE(12)));
  assert.deepEqual(doc.meshes.map(mesh=>mesh.name),['girl004_body01_skm','girl004_face01_skm']);
  assert.equal(doc.skins.length,2);
  assert.ok(doc.images.every(image=>Number.isInteger(image.bufferView)));
  const socket=doc.nodes.find(node=>node.name==='socket_face');
  assert.ok(socket.children.length);
  for(const [name,duration] of [['girl004_ui_enter01',254/30],['girl004_ui_stand01',3],['girl004_ui_stand01_face',2]]){
    const clip=doc.animations.find(animation=>animation.name===name);
    const end=Math.max(...clip.samplers.map(sampler=>doc.accessors[sampler.input].max[0]));
    assert.ok(Math.abs(end-duration)<.001);
    const joints=clip.channels.map(channel=>doc.nodes[channel.target.node].name);
    if(!name.endsWith('_face')){
      for(const joint of ['Bip001-Head','Bip001-R-Hand','Bip001-R-Finger1'])assert.ok(joints.includes(joint),joint);
    }
    if(name!=='girl004_ui_stand01')assert.ok(joints.some(joint=>joint.includes('LidMain')));
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
