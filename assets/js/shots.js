// Seconds, target height, lens distance and orbit angle. Each move settles before the next.
const opening = [
  [0, 1.105, 3.28, .06],
  [12, 1.12, 3.22, .12],
  [24, 1.19, 2.89, .25],
  [35, 1.34, 2.14, -.12],
  [46, 1.35, 2.10, .04],
  [55, .97, 2.37, -.36],
  [65, 1.09, 2.30, -.43],
  [78, 1.34, 2.10, -.62],
  [88, 1.34, 2.13, -.40],
  [101, 1.19, 2.76, .42],
  [111, 1.16, 2.91, .31],
  [120, 1.105, 3.28, .06]
];
const views = {lean:[1.25,2.40,-.26], gaze:[1.37,1.97,.21], rear:[1.20,2.85,-1.65]};

// Aim height, distance, azimuth, elevation and vertical field of view at the crossing.
const lobbyAngles = [
  [1.06,2.52,-.05,-.02,56],
  [1.22,2.30,.62,.10,47],
  [.91,3.35,2.48,Math.PI/4,49],
  [1.29,2.22,.80,-.09,43],
  [1.04,3.15,-.68,.25,51],
  [1.28,2.32,-.32,.04,44]
];
const secondsPerAngle = 12;
export const lobbyDuration = lobbyAngles.length*secondsPerAngle;
export function lobbyAngle(seconds) {
  const beat = seconds / secondsPerAngle;
  const index = Math.floor(beat) % lobbyAngles.length;
  const from = lobbyAngles[index], to = lobbyAngles[(index+1)%lobbyAngles.length];
  const previous = lobbyAngles[(index+lobbyAngles.length-1)%lobbyAngles.length], after = lobbyAngles[(index+2)%lobbyAngles.length];
  const phase = beat%1;
  // Slow through each composition, accelerate between marks. The cyclic tangents
  // keep both position and velocity continuous across the last-to-first seam.
  const t = phase - .78*Math.sin(2*Math.PI*phase)/(2*Math.PI);
  return from.map((a,i)=>{
    const b=to[i], m=(b-previous[i])*.5, n=(after[i]-a)*.5;
    return a+t*(m+t*(3*(b-a)-2*m-n+t*(2*(a-b)+m+n)));
  });
}
// The overview, hand detail and set view all orbit the same performer.
const disciplines={
  cinema:{work:[.91,4.12,.21],technique:[1.34,2.05,.47],equipment:[.92,4.15,-.47]},
  edit:{work:[.96,4.06,-.23],technique:[1.13,2.04,-.51],equipment:[1.15,3.82,.46]},
  model:{work:[.94,4.16,.32],technique:[1.15,2.24,.72],equipment:[.93,3.86,-.63]},
  mocap:{work:[.90,4.23,-.34],technique:[1.10,2.75,-.68],equipment:[.95,4.35,.24]},
  live:{work:[.96,4.07,.14],technique:[1.32,2.17,.27],equipment:[1.01,3.71,-.31]}
};
export function cameraShot(mode,seconds,skill,view) {
  const setup=disciplines[skill];
  if(setup && view){
    const mark=setup[view] || setup.work;
    if(view!=='technique')return mark;
    const arc=.5-.5*Math.cos(seconds*Math.PI/7);
    return [mark[0]+.035*arc,mark[1]-.12*arc,mark[2]+.13*arc];
  }
  if (views[mode]) return views[mode];
  const t=seconds%opening.at(-1)[0];
  const index=opening.findIndex(frame=>frame[0]>t);
  const a=opening[index-1],b=opening[index];
  const f=(t-a[0])/(b[0]-a[0]),ease=f*f*(3-2*f);
  return [1,2,3].map(i=>a[i]+(b[i]-a[i])*ease);
}

// Ease into an over-the-shoulder arc, hold the close shot, then recover the live lobby frame.
export function levelUpShot(base,seconds,direction){
  if(seconds<=0 || seconds>=4.4)return base;
  const t=seconds<1.7 ? seconds/1.7 : Math.min(1,(4.4-seconds)/1.9);
  const blend=t*t*(3-2*t);
  return [base[0]+(1.35-base[0])*blend,base[1]+(1.72-base[1])*blend,
    base[2]+direction*.68*blend];
}
