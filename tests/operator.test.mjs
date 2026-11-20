import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {cameraShot} from '../assets/js/shots.js';

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

test('shipped VRM includes the humanoid bones and blink expression used onstage',()=>{
  const bytes=readFileSync(new URL('../assets/models/rooftop-standin.vrm',import.meta.url));
  assert.equal(bytes.toString('ascii',0,4),'glTF');
  assert.equal(bytes.readUInt32LE(8),bytes.length);
  const doc=JSON.parse(bytes.toString('utf8',20,20+bytes.readUInt32LE(12)));
  const vrm=doc.extensions.VRMC_vrm;
  for(const name of ['head','neck','hips','chest','spine','leftUpperArm','rightUpperArm','leftLowerArm','rightLowerArm','leftHand','rightHand']){
    assert.ok(Number.isInteger(vrm.humanoid.humanBones[name].node),name);
  }
  assert.ok(vrm.expressions.preset.blink);
  assert.equal(vrm.meta.allowRedistribution,true);
});
