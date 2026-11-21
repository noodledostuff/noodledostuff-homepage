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
    const shader={uniforms:{},vertexShader:'#include <begin_vertex>',fragmentShader:'#include <opaque_fragment>'};
    set.children.find(child=>child.material).material.onBeforeCompile(shader);
    assert.ok(shader.uniforms.kitPhase.value>0 && shader.uniforms.kitPhase.value<1);
    assert.ok(set.scale.equals(new T.Vector3(1,1,1)));
    assert.equal(visibleGroups(actor)[0].scale.x,1);
    sets.add(set);
    equip(key,0,0,true);
    assert.equal(shader.uniforms.kitPhase.value,1);
    assert.ok(visibleGroups(actor)[0].position.distanceTo(wrist.position)<.04);
  }
  assert.equal(sets.size,5);
  equip('',1,0,true);
  assert.equal(visibleGroups(scene).length+visibleGroups(actor).length,0);
});
test('the handheld prop follows the wrist at the street crossing',()=>{
  const mark=new T.Group(), wrist=new T.Group();
  mark.position.set(191.72,-.096,-5.5);
  wrist.position.set(.12,1.24,.31);
  mark.add(wrist);
  const equip=studioGear(mark,mark,wrist);
  equip('cinema',0,0,true);
  const held=mark.children.filter(child=>child.isGroup && child.visible && child!==wrist).at(-1);
  assert.ok(held.getWorldPosition(new T.Vector3()).distanceTo(wrist.getWorldPosition(new T.Vector3()))<.04);
});
