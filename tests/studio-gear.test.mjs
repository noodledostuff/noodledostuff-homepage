import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import * as T from '../assets/vendor/three/three.module.min.js';
import {studioGear} from '../assets/js/studio-gear.js';

const keys=['cinema','edit','model','mocap','live'];

function characterProps(){
  const root=new T.Group();
  for(const key of [...keys,'model_slate']){
    const socket=new T.Group(),prop=new T.Group();
    socket.name='Grip_'+key;prop.name='Kit_'+key;root.add(socket);socket.add(prop);
  }
  return root;
}

const bytes=readFileSync(new URL('../assets/models/studio-equipment.glb',import.meta.url));
const doc=JSON.parse(bytes.toString('utf8',20,20+bytes.readUInt32LE(12)));
function equipment(){
  const model=new T.Group();
  for(const node of doc.nodes){
    const group=new T.Group();group.name=node.name;
    for(const part of doc.meshes[node.mesh].primitives){
      assert.ok(doc.accessors[part.attributes.POSITION].count>0);
      group.add(new T.Mesh(new T.BufferGeometry(),new T.MeshStandardMaterial()));
    }
    model.add(group);
  }
  return model;
}

test('switching disciplines reveals one stage and its socket-mounted props, including the drawing slate',()=>{
  const scene=new T.Scene(),actor=new T.Scene(),character=characterProps();
  actor.add(character);
  const street=new T.Group();
  const equip=studioGear(scene,actor,character,equipment(),street);
  const sets=new Set();
  for(const key of keys){
    equip(key,0,.04,false);
    const active=scene.children.filter(n=>n.isGroup&&n.visible);
    assert.equal(active.length,1);sets.add(active[0]);
    const shader={uniforms:{},vertexShader:'#include <begin_vertex>',fragmentShader:'#include <opaque_fragment>'};
    active[0].children.find(n=>n.material).material.onBeforeCompile(shader);
    assert.ok(shader.uniforms.kitPhase.value>0&&shader.uniforms.kitPhase.value<1);
    equip(key,0,0,true);
    assert.equal(shader.uniforms.kitPhase.value,1);
    const powers=parent=>parent.children.filter(n=>n.isSpotLight).map(l=>l.intensity);
    assert.deepEqual(powers(actor),powers(street));
    assert.ok(powers(street).some(n=>n>0));
    if(key==='cinema')assert.ok(powers(street).filter(n=>n>5).length===2);
    for(const slot of [...keys,'model_slate']){
      const mesh=character.getObjectByName('Kit_'+slot);
      assert.equal(mesh.visible,slot.split('_')[0]===key);
      assert.equal(mesh.parent.name,'Grip_'+slot);
    }
  }
  assert.equal(sets.size,5);
  assert.ok(doc.materials.some(m=>m.pbrMetallicRoughness.metallicRoughnessTexture));
  assert.ok(doc.materials.some(m=>m.emissiveTexture));
  equip('',1,0,true);
  assert.ok([...keys,'model_slate'].every(k=>!character.getObjectByName('Kit_'+k).visible));
});
