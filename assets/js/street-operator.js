import * as T from '../vendor/three/three.module.min.js';
import {createOperator} from './operator.js';
import {studioGear} from './studio-gear.js';
import {cameraShot, levelUpShot} from './shots.js';

export async function streetOperator(stage) {
  const operator = await createOperator();
  const scene = new T.Scene(), mark = new T.Group();
  // On the near side of the Main street crossing, with the avenue behind the performer.
  mark.position.set(191.72, -.096, -5.5);
  scene.add(mark);
  mark.add(operator.root);
  const equip = studioGear(mark, mark, operator.wrist);
  scene.add(new T.HemisphereLight(0xb5cbea, 0x624a51, .68));
  const key = new T.DirectionalLight(0xffd2ad, 1.65);
  const rim = new T.DirectionalLight(0x9addf3, 1.25);
  key.position.set(-3,3,2); rim.position.set(3,2,-3);
  scene.add(key, rim);

  const shadow = new T.Mesh(new T.PlaneGeometry(.85,.6),new T.ShaderMaterial({
    transparent:true, depthWrite:false,
    vertexShader:'varying vec2 v; void main(){v=uv*2.-1.; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
    fragmentShader:'varying vec2 v; void main(){gl_FragColor=vec4(.003,.004,.006,.48*(1.-smoothstep(.05,1.,dot(v,v))));}',
  }));
  shadow.rotation.x=-Math.PI/2; shadow.position.y=.008; mark.add(shadow);
  const head = new T.Vector3(), hand = new T.Vector3(), hips = new T.Vector3();
  let skill = '', inspecting = false, time = 0, entry = -Infinity, upgrade = -Infinity, direction = 1;
  stage.addEventListener('skilllevelup', () => {
    upgrade = entry = time; direction *= -1; operator.begin();
  });

  const crop = new T.Vector3(0,0,1);
  let revealAt = Infinity;
  function pose(seconds, dt, paused) {
    time = seconds;
    const selected = stage.dataset.skill || '', open = stage.dataset.open === 'discipline';
    if (skill !== selected || (open && !inspecting)) {
      operator.begin(); entry = time; revealAt = paused ? Infinity : time+.65;
    }
    skill = selected; inspecting = open;
    operator.pose(time,time-entry,paused);
    equip(skill,time,dt,paused);
    operator.hips.getWorldPosition(hips);
    shadow.position.x=hips.x-mark.position.x; shadow.position.z=hips.z-mark.position.z;
    // Reframe the cached street and performer together during the two-minute lobby shot.
    crop.set(0,0,1);
    if (!stage.dataset.open && !paused) {
      const [height, distance, angle] = cameraShot('turn',time);
      const zoom = 1 + .25*(3.28-distance);
      crop.set((angle-.06)*.06*(zoom-1), (height-1.105)*.13*(zoom-1), zoom);
    }
    if (time < revealAt) return false;
    revealAt = Infinity;
    return true;
  }

  function framing(camera, w, h, paused) {
    const panel = stage.dataset.open, view = stage.dataset.inspection || 'work';
    const portrait = h > w;
    const fraction = portrait ? .5 : stage.hasAttribute('data-tree') ? .33 : panel ? .37 : .42;
    // Lift the performer into the open street above the portrait record sheet.
    const offsetY = portrait ? (panel ? .15 : -.07)*h : 0;
    camera.setViewOffset(w,h,(.5-fraction)*w,offsetY,w,h);
    const orbit = panel === 'skills' && !paused && time-upgrade < 4.4;
    if (!panel || panel === 'settings' || panel === 'skills') {
      camera.fov = 56;
      camera.position.set(191.6,1.02,-3);
      const aim = new T.Vector3(193.3,1.72,-39);
      aim.sub(camera.position).normalize().multiplyScalar(2.5).add(camera.position);
      if (orbit) {
        const elapsed = time-upgrade;
        const dx=camera.position.x-mark.position.x, dz=camera.position.z-mark.position.z;
        const base=[1.02-mark.position.y-.14, Math.hypot(dx,dz), Math.atan2(dx,dz)];
        const [height,radius,angle]=levelUpShot(base,elapsed,direction);
        camera.position.set(mark.position.x+Math.sin(angle)*radius,mark.position.y+height+.14,mark.position.z+Math.cos(angle)*radius);
        const weight=(height-base[0])/(1.35-base[0]);
        operator.head.getWorldPosition(head);
        aim.lerp(head,weight*.75);
        camera.fov-=weight*12;
      }
      camera.lookAt(aim);
    } else {
      const shot = cameraShot(stage.dataset.pose || 'turn',paused ? 3 : 0,skill,inspecting ? view : '');
      operator.head.getWorldPosition(head);
      operator.wrist.getWorldPosition(hand);
      const [height,distance,angle] = shot;
      const y = mark.position.y + height;
      const x = inspecting && view === 'equipment' ? mark.position.x+.32 : hips.x;
      const focusY = inspecting && view === 'technique' ? .7*y+.3*(head.y+hand.y)*.5 : y;
      camera.fov = 32;
      const fit = portrait && inspecting && view === 'equipment' ? 1.7*h/(2*w*Math.tan(Math.PI*camera.fov/360)) : 0;
      const radius = Math.max(distance + (portrait ? .5 : 0),fit);
      camera.position.set(x+Math.sin(angle)*radius,focusY+.14,hips.z+Math.cos(angle)*radius);
      camera.lookAt(x,focusY,hips.z);
    }
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld();
    return orbit;
  }
  return {scene,pose,framing,crop};
}
