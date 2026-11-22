import * as T from '../vendor/three/three.module.min.js';
import {createOperator} from './operator.js?v=street-studio-2';
import {studioGear,loadStudioEquipment} from './studio-gear.js?v=street-studio-2';
import {cameraShot, levelUpShot, lobbyAngle, lobbyDuration} from './shots.js';

const streetViews = {
  missions:[1,3.45,2.35,Math.PI/4,46], story:[1.32,2.24,.32,.03,40],
  contact:[1.18,2.76,-.72,.08,46], archive:[1,3.35,-1.72,.54,48],
  news:[1.10,3.02,1.05,.19,51], settings:[1.08,2.72,.1,.04,53]
};

export async function streetOperator(stage, world) {
  const [operator,equipment] = await Promise.all([createOperator(),loadStudioEquipment()]);
  const scene = new T.Scene(), mark = new T.Group();
  // On the near side of the Main street crossing, with the avenue behind the performer.
  mark.position.set(191.72, -.100, -5.5);
  scene.add(mark);
  mark.add(operator.root);
  const spill = new T.Group();
  spill.position.copy(mark.position);world?.add(spill);
  const equip = studioGear(mark, mark, operator.root, equipment, world ? spill : mark);
  scene.add(new T.HemisphereLight(0xc5d4e9, 0x766a73, .95));
  const key = new T.DirectionalLight(0xffd2ad, 1.65);
  const rim = new T.DirectionalLight(0x9addf3, 1.25);
  key.position.set(-3,3,2); rim.position.set(3,2,-3);
  const fill = new T.DirectionalLight(0xf1ebff, .72);
  fill.position.set(1,1.7,3);
  scene.add(key, rim, fill);

  const shadow = new T.Mesh(new T.PlaneGeometry(.85,.6),new T.ShaderMaterial({
    transparent:true, depthWrite:false,
    vertexShader:'varying vec2 v; void main(){v=uv*2.-1.; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
    fragmentShader:'varying vec2 v; void main(){gl_FragColor=vec4(.003,.004,.006,.48*(1.-smoothstep(.05,1.,dot(v,v))));}',
  }));
  shadow.rotation.x=-Math.PI/2; shadow.position.y=.0006; mark.add(shadow);
  const hips = new T.Vector3();
  let skill = '', inspecting = false, time = 0, entry = -Infinity, upgrade = -Infinity, direction = 1;
  stage.addEventListener('skilllevelup', () => {
    upgrade = entry = time; direction *= -1; operator.begin(skill || true);
  });

  let revealAt = Infinity, lobbyStart = 0, inLobby = false, idleCycle = -1;
  function pose(seconds, dt, paused) {
    time = seconds;
    const selected = stage.dataset.skill || '', open = stage.dataset.open === 'discipline';
    const lobby = !stage.dataset.open;
    if (lobby && !inLobby) { lobbyStart = time; idleCycle = -1; }
    const cycle = Math.floor((time-lobbyStart)/lobbyDuration);
    if (skill !== selected || (open && !inspecting) || (lobby && cycle !== idleCycle)) {
      operator.begin(selected || open); entry = time; revealAt = paused ? Infinity : time+.65;
    }
    if (lobby) idleCycle = cycle;
    inLobby = lobby; skill = selected; inspecting = open;
    operator.pose(time,time-entry,paused);
    equip(skill,time,dt,paused);
    operator.hips.getWorldPosition(hips);
    shadow.position.x=hips.x-mark.position.x; shadow.position.z=hips.z-mark.position.z;
    if (time < revealAt) return false;
    revealAt = Infinity;
    return true;
  }

  // A transition starts at the currently displayed orbit, including an interrupted move.
  let displayed, start, framingKey, startedAt, sampledAt, velocity, incoming;
  const moveDuration=1.45;
  const delta=(a,b,i)=>i===2 ? Math.atan2(Math.sin(a-b),Math.cos(a-b)) : a-b;
  function framing(camera, w, h, paused) {
    const panel = stage.dataset.open, view = stage.dataset.inspection || 'work';
    const portrait = h > w;
    const fraction = portrait ? .5 : stage.hasAttribute('data-tree') ? .33 : panel ? .37 : .42;
    let shot, aimX = 0, aimZ = 0;
    if (!panel) shot = lobbyAngle(paused ? 0 : time-lobbyStart);
    else if (panel === 'skills') {
      const base = [1.05,2.84,-.42];
      const [height,radius,angle] = levelUpShot(base,paused ? Infinity : time-upgrade,direction);
      shot = [height,radius,angle,.16,54];
    } else if (inspecting) {
      const [height,distance,angle] = cameraShot('turn',paused ? 0 : time,skill,view);
      const kit = view === 'equipment', detail = view === 'technique';
      if(kit){
        const pair=skill==='cinema' || skill==='mocap';
        aimX=pair ? .03 : .84;aimZ=pair ? -1.54 : -1.08;
        const fit=pair && portrait ? 2.32*h/(2*w*Math.tan(21*Math.PI/180)) : 0;
        const kitHeight={cinema:1.02,edit:1.00,model:.65,mocap:1.04,live:.86}[skill];
        shot=[kitHeight,Math.max(pair ? 3.35 : 1.68,fit),angle+.31,pair ? .11 : .25,42];
      }else shot=[height,distance+(portrait ? .5 : 0),angle,detail ? .06 : .25,32];
    } else shot = streetViews[panel];
    if (panel && !paused) {
      const sweep=time*.19;
      shot=[...shot];
      shot[0]+=.035*Math.sin(sweep);shot[1]+=.096*Math.cos(sweep);
      shot[2]+=.073*Math.sin(sweep*.81);
    }
    const target = [...shot,aimX,fraction,portrait ? (panel ? .15 : .035) : 0,aimZ];
    const key = [panel,skill,view,portrait,stage.hasAttribute('data-tree'),upgrade].join('/');
    if (key !== framingKey) {
      start=displayed || target;incoming=velocity;
      startedAt=displayed ? time : time-moveDuration;framingKey=key;
    }
    const progress=T.MathUtils.clamp((time-startedAt)/moveDuration,0,1);
    const blend = paused ? 1 : T.MathUtils.smootherstep(progress,0,1);
    const next = blend === 1 ? target : target.map((v,i)=>{
      const carry=(incoming?.[i] || 0)*moveDuration*progress*(1-progress)**3;
      return start[i]+carry+blend*delta(v,start[i],i);
    });
    if(paused)velocity=undefined;
    else if(displayed && time>sampledAt)velocity=next.map((v,i)=>delta(v,displayed[i],i)/(time-sampledAt));
    sampledAt=time;
    const changed = !displayed || next.some((v,i)=>Math.abs(v-displayed[i])>1e-7);
    if (!changed && camera.view?.fullWidth===w && camera.view.fullHeight===h) return false;
    displayed = next;
    const [height,radius,angle,pitch,fov,x,screenX,offsetY,z] = next;
    const ground = radius*Math.cos(pitch);
    camera.position.set(mark.position.x+x+ground*Math.sin(angle),
      mark.position.y+height+radius*Math.sin(pitch),mark.position.z+z+ground*Math.cos(angle));
    camera.lookAt(mark.position.x+x,mark.position.y+height,mark.position.z+z);
    camera.fov = fov;
    camera.focus = radius;
    camera.setViewOffset(w,h,(.5-screenX)*w,offsetY*h,w,h);
    camera.updateMatrixWorld();
    return true;
  }
  return {scene,pose,framing};
}
