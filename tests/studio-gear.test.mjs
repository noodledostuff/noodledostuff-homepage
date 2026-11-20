import test from 'node:test';
import assert from 'node:assert/strict';
import * as T from '../assets/vendor/three/three.module.min.js';
import {studioGear} from '../assets/js/studio-gear.js';

test('switching disciplines equips one set and hand prop, including while paused',()=>{
  const scene=new T.Scene(),actor=new T.Scene(),wrist=new T.Group();
  wrist.position.set(.12,1.24,.31);
  const equip=studioGear(scene,actor,wrist);
  const visibleGroups=parent=>parent.children.filter(child=>child.isGroup && child.visible);
  const sets=new Set();
  for(const key of ['cinema','edit','model','mocap','live']){
    equip(key,0,.04,false);
    const [set]=visibleGroups(scene);
    assert.equal(visibleGroups(scene).length,1);
    assert.equal(visibleGroups(actor).length,1);
    assert.ok(set.scale.x>0 && set.scale.x<1);
    sets.add(set);
    equip(key,0,0,true);
    assert.equal(set.scale.x,1);
    assert.ok(visibleGroups(actor)[0].position.distanceTo(wrist.position)<.04);
  }
  assert.equal(sets.size,5);
  equip('',1,0,true);
  assert.equal(visibleGroups(scene).length+visibleGroups(actor).length,0);
});