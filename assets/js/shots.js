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
export function cameraShot(mode,seconds) {
  if (views[mode]) return views[mode];
  const t=seconds%opening.at(-1)[0];
  const index=opening.findIndex(frame=>frame[0]>t);
  const a=opening[index-1],b=opening[index];
  const f=(t-a[0])/(b[0]-a[0]),ease=f*f*(3-2*f);
  return [1,2,3].map(i=>a[i]+(b[i]-a[i])*ease);
}
