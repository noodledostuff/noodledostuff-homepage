import { streetWeather } from './street-weather.js';
import * as T from '../vendor/three/three.module.min.js';
import { Reflector } from '../vendor/three/Reflector.js';
import { GLTFLoader } from '../vendor/three-vrm/runtime.js';

const views = [
  [[191.6, 1.72, -3], [193.3, 4.2, -39], 60],
  [[189.2, 1.70, -22.9], [184.2, 1.9, -31], 62],
  [[193.2, 1.65, -41.3], [201, 1.95, -35.6], 57],
  [[201, 25, -42], [181, 15, -15], 58],
];

// The WebP stores log-encoded linear HDR. Decode before the sky enters either reflection pass.
async function nightSky() {
  const panorama = await new T.TextureLoader().loadAsync(
    new URL('../models/hong-kong-street/shanghai-bund-night.webp', import.meta.url).href
  );
  panorama.wrapS = T.RepeatWrapping;
  const sky = new T.Mesh(new T.SphereGeometry(300, 40, 24), new T.ShaderMaterial({
    side: T.BackSide, depthWrite: false,
    uniforms: { panorama: { value: panorama } },
    vertexShader: `varying vec3 ray;
      void main() {
        ray = position;
        gl_Position = projectionMatrix * vec4(mat3(viewMatrix) * position, 1.);
        gl_Position.z = gl_Position.w;
      }`,
    fragmentShader: `varying vec3 ray;
      uniform sampler2D panorama;
      void main() {
        vec3 d = normalize(ray);
        vec2 uv = vec2(atan(d.z, d.x) * .15915494 + .13, asin(d.y) * .40 + .544);
        vec3 radiance = (exp2(texture2D(panorama, uv).rgb * 18.) - 1.) / 512.;
        float luminance = dot(radiance, vec3(.2126, .7152, .0722));
        radiance /= 1. + .48 * luminance;
        // Fade the photographed promenade below the silhouette of the modelled block.
        vec3 sky = mix(vec3(.012, .018, .028), radiance * vec3(.33, .44, .64) + vec3(.002, .004, .011),
                       smoothstep(-.075, .015, d.y));
        gl_FragColor = vec4(sky, 1.);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  }));
  sky.renderOrder = -1;
  return sky;
}

// Use the low-roughness panes in the source window atlas as the emissive mask.
function lightWindows(material) {
  material.onBeforeCompile = shader => {
    shader.vertexShader = 'varying vec3 windowWorld;\n' + shader.vertexShader.replace(
      '#include <project_vertex>',
      '#include <project_vertex>\nwindowWorld = (modelMatrix * vec4(transformed, 1.)).xyz;'
    );
    shader.fragmentShader = 'varying vec3 windowWorld;\n' + shader.fragmentShader.replace(
      '#include <emissivemap_fragment>', `
      #include <emissivemap_fragment>
      float pane = 1. - smoothstep(.41, .69, roughnessFactor);
      float occupancy = .5 + .25*sin(dot(windowWorld.xz, vec2(.67,.31)) + windowWorld.y*1.15)
                            + .25*sin(dot(windowWorld.xz, vec2(.44,-.76)) - windowWorld.y*.53);
      float lit = smoothstep(.46, .72, occupancy);
      vec3 lamp = mix(vec3(1., .56, .24), vec3(.57, .83, 1.), smoothstep(.78, .91, occupancy));
      totalEmissiveRadiance += lamp * diffuseColor.rgb * (4.5 * pane * lit);
      `
    );
  };
}

function shopLighting(world) {
  // Positions are just outside the fish counter, diner canopy and shop signs.
  for (const [x,y,z,color,intensity,reach] of [
    [186.2,2.65,-29.2,0xffe4c8,39,9], [186.4,2.9,-32,0xffba87,19,8],
    [199.1,3.1,-36,0xffc497,60,12], [200,3.6,-33,0xff7064,19,8],
    [187.5,4.1,-21.8,0xff7971,45,12], [199.4,3.4,-23,0xa1dedc,61,11],
    [187.3,3.7,4.7,0xffbb85,63,11], [199.7,3.1,-1.8,0x9addf3,82,12],
  ]) {
    const light = new T.PointLight(color, intensity, reach);
    light.position.set(x,y,z);
    world.add(light);
  }
}

const surfaceNoise = `
  float surfaceHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float surfaceNoise(vec2 p) {
    vec2 i = floor(p), t = fract(p);
    t = t*t*(3.-2.*t);
    return mix(mix(surfaceHash(i), surfaceHash(i+vec2(1,0)), t.x),
               mix(surfaceHash(i+vec2(0,1)), surfaceHash(i+vec2(1)), t.x), t.y);
  }
`;

// Break up the reflection lobe in metres so runoff lines continue across modular walls.
function weatherWall(material) {
  const tile = material.name.includes('_Tiles_');
  material.envMapIntensity = 1.45;
  material.onBeforeCompile = shader => {
    shader.uniforms.glazedTile = { value: tile ? 1 : 0 };
    shader.vertexShader = 'varying vec3 wallWorld;\n' + shader.vertexShader.replace(
      '#include <project_vertex>',
      '#include <project_vertex>\nwallWorld = (modelMatrix * vec4(transformed, 1.)).xyz;'
    );
    shader.fragmentShader = `varying vec3 wallWorld;
      uniform float glazedTile;
      ${surfaceNoise}
    ` + shader.fragmentShader.replace('#include <roughnessmap_fragment>', `
      #include <roughnessmap_fragment>
      vec2 p = vec2(dot(wallWorld.xz - vec2(193., -30.), vec2(.98, 1.07)), wallWorld.y);
      float dampness = surfaceNoise(p * vec2(.84, .61));
      float run = surfaceNoise(vec2(p.x * 7. + dampness * .9, p.y * .48));
      float pixelSize = max(fwidth(p.x), fwidth(p.y));
      float chips = mix(surfaceNoise(p * 24.), .5, smoothstep(.018, .055, pixelSize));
      float splash = 1. - smoothstep(.09, .88 + .35*dampness, p.y);
      float wet = smoothstep(.30, .76, .48*dampness + .52*run + .18*splash);
      wet *= 1. - .48*smoothstep(.69, .89, chips);
      // The rougher grout keeps a broader highlight than the glazed tile faces.
      float glaze = glazedTile * (1. - smoothstep(.81, .98, roughnessFactor));
      vec3 face = normalize(cross(dFdx(wallWorld), dFdy(wallWorld)));
      float exposedWall = 1. - smoothstep(.35, .8, abs(face.y));
      wet *= exposedWall;
      float gloss = max(wet, exposedWall * .48*glaze);
      diffuseColor.rgb *= mix(vec3(1.), vec3(.57, .55, .52), wet);
      roughnessFactor = mix(roughnessFactor, mix(.23, .105, glaze) + .075*chips, gloss);
    `).replace('#include <opaque_fragment>', `
      // One non-finite wall texel can poison every roughness level of the HDR street probe.
      if (!all(lessThanEqual(abs(outgoingLight), vec3(65504.)))) outgoingLight = diffuseColor.rgb * .08;
      #include <opaque_fragment>`);
  };
}

// Composite reflection radiance into the original asphalt BRDF before tone mapping.
// World-space puddles continue across tile seams and follow the actual road footprint.
function wetAsphalt(material, uniforms) {
  material.onBeforeCompile = shader => {
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader = 'varying vec3 roadWorld;\n' + shader.vertexShader.replace(
      '#include <project_vertex>',
      '#include <project_vertex>\nroadWorld = (modelMatrix * vec4(transformed, 1.)).xyz;'
    );
    shader.fragmentShader = `varying vec3 roadWorld;
      uniform sampler2D roadMirror;
      uniform mat4 roadProjection;
      uniform float roadWet;
      ${surfaceNoise}
      ` + shader.fragmentShader.replace('#include <opaque_fragment>', `
        if (roadWet > .5) {
          vec2 p = roadWorld.xz;
          float moisture = .68*surfaceNoise(p*.68) + .32*surfaceNoise(p*2.3);
          float pool = smoothstep(.30, .65, moisture);
          vec4 q = roadProjection * vec4(roadWorld, 1.);
          vec2 uv = q.xy / q.w;
          vec2 ripple = vec2(surfaceNoise(p*vec2(7.,13.)), surfaceNoise(p*vec2(13.,6.))) - .5;
          uv += ripple * mix(.009, .002, pool);
          vec2 blur = vec2(.001, .0025) * (1.4 - pool);
          vec3 reflected = .4*texture2D(roadMirror, uv).rgb
                         + .2*texture2D(roadMirror, uv+blur).rgb
                         + .2*texture2D(roadMirror, uv-blur).rgb
                         + .2*texture2D(roadMirror, uv+vec2(blur.x,-blur.y)).rgb;
          float nDotV = clamp(normalize(cameraPosition - roadWorld).y, 0., 1.);
          float fresnel = .0204 + .9796 * pow(1.-nDotV, 5.);
          outgoingLight = mix(outgoingLight * mix(.86, .56, pool), reflected, fresnel * pool);
        }
        #include <opaque_fragment>`);
  };
}

async function mountStreet(canvas, stage) {
  const renderer = new T.WebGLRenderer({ canvas, antialias: true });
  renderer.toneMapping = T.ACESFilmicToneMapping;
  renderer.outputColorSpace = T.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = T.PCFSoftShadowMap;
  renderer.shadowMap.autoUpdate = false;

  const world = new T.Scene();
  const camera = new T.PerspectiveCamera(60, 1, .08, 550);
  const [sky, { scene: street }, operator] = await Promise.all([
    nightSky(),
    new GLTFLoader().loadAsync(new URL('../models/hong-kong-street/Maps/Demo.glb', import.meta.url).href),
    stage ? import('./street-operator.js').then(m => m.streetOperator(stage)) : null,
  ]);
  sky.position.set(193, 0, -30);
  world.add(sky);
  world.fog = new T.FogExp2(0x273045, .006);
  const moon = new T.DirectionalLight(0xb9d0ff, .19);
  moon.target.position.copy(sky.position);
  moon.position.copy(sky.position).add(new T.Vector3(-38, 61, -29));
  moon.castShadow = true;
  Object.assign(moon.shadow.camera, { left: -56, right: 56, top: 57, bottom: -57, near: 1, far: 167 });
  moon.shadow.camera.updateProjectionMatrix();
  moon.shadow.mapSize.setScalar(Math.min(2048, renderer.capabilities.maxTextureSize));
  moon.shadow.normalBias = .025;
  moon.shadow.bias = -.00013;
  world.add(moon, moon.target, new T.HemisphereLight(0xabc4f3, 0x976652, .16));
  shopLighting(world);

  const mirror = new Reflector(new T.PlaneGeometry(1, 1), { multisample: 0, clipBias: .0002 });
  mirror.position.set(193, -.099, -30);
  mirror.rotation.x = -Math.PI / 2;
  mirror.updateMatrixWorld();
  const inversePlane = mirror.matrixWorld.clone().invert();
  const mirrorTarget = mirror.getRenderTarget();
  const hdr = renderer.capabilities.isWebGL2 && renderer.extensions.has('EXT_color_buffer_float');
  const targetType = hdr ? T.HalfFloatType : T.UnsignedByteType;
  mirrorTarget.texture.type = targetType;
  const uniforms = {
    roadWet: { value: 0 }, roadMirror: { value: null }, roadProjection: { value: new T.Matrix4() },
  };
  const materials = new Set();
  street.updateMatrixWorld(true);
  const lampGlass = new T.MeshStandardMaterial({
    name: 'Street lamp lens', color: 0xffefdc, emissive: 0xffd1a0, emissiveIntensity: 7, roughness: .28,
  });
  street.traverse(node => {
    if (!node.isMesh) return;
    node.castShadow = !node.material.transparent;
    node.receiveShadow = true;
    if (node.parent.name.startsWith('SM_Lamppost') && node.material.name === 'M_Glass_Fade') {
      node.material = lampGlass;
      const head = new T.Box3().setFromObject(node).getCenter(new T.Vector3());
      const lamp = new T.SpotLight(0xffcc93, 235, 24, 1.15, .8);
      lamp.position.copy(head);
      lamp.position.y -= .1;
      lamp.target.position.copy(head);
      lamp.target.position.y -= 6;
      // The junction light casts the foreground railings and phone booth onto the pavement.
      lamp.castShadow = head.distanceToSquared(new T.Vector3(195, 5.8, -12)) < 9;
      lamp.shadow.bias = -.0006;
      world.add(lamp, lamp.target);
    }
    materials.add(node.material);
  });
  for (const mat of materials) {
    if (mat.name === 'MI_Road_Track' || mat.name === 'MI_Road_Angle') wetAsphalt(mat, uniforms);
    if (/^MI_Wall_(?:Tiles_)?\d+$/.test(mat.name)) weatherWall(mat);
    if (mat.name === 'MI_Windows_01' || mat.name === 'MI_Windows_02') lightWindows(mat);
    if (mat.name === 'MI_Advertising_Signboard' || mat.name === 'MI_Sign_Facade') {
      mat.emissiveMap = mat.map;
      mat.emissive.set(0xffe8d5);
      mat.emissiveIntensity = 1.7;
    }
    if (mat.map) mat.map.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  }

  const pmrem = new T.PMREMGenerator(renderer);
  const captureTarget = new T.WebGLCubeRenderTarget(128, { type: targetType });
  const probe = new T.CubeCamera(.18, 550, captureTarget);
  probe.position.copy(sky.position);
  probe.update(renderer, world);
  const skyMap = pmrem.fromCubemap(captureTarget.texture);
  world.add(street);
  renderer.shadowMap.needsUpdate = true;

  const view = document.querySelector('#view'), wet = document.querySelector('#wet');
  const motion = document.querySelector('#motion'), pause = stage?.querySelector('[data-pause]');
  const practicals = world.children.filter(light => light.isSpotLight || light.isPointLight);
  const weather = streetWeather(renderer, world, camera, sky, practicals, targetType, operator?.scene);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let playing = !reduced.matches, lost = false, seconds = 1.7, previousTime = 0, animation = 0;
  let localMap, orbiting = false, lastCapture = 0, queued = 0;
  if (operator) world.onAfterRender = (r, scene, reflectedCamera) => {
    if (reflectedCamera !== mirror.camera) return;
    r.autoClear = false;
    r.render(operator.scene, reflectedCamera);
    r.autoClear = true;
  };
  function capture() {
    uniforms.roadWet.value = 0;
    uniforms.roadMirror.value = null;
    if (!wet || wet.checked) {
      mirror.onBeforeRender(renderer, world, camera);
      uniforms.roadProjection.value.multiplyMatrices(mirror.material.uniforms.textureMatrix.value, inversePlane);
      uniforms.roadMirror.value = mirrorTarget.texture;
      uniforms.roadWet.value = 1;
    }
    weather.capture();
  }
  function frameShot() {
    if (operator) return operator.framing(camera, canvas.clientWidth, canvas.clientHeight, !playing);
    const [eye, aim, fov] = views[view.selectedIndex];
    camera.position.set(...eye); camera.lookAt(...aim); camera.fov = fov;
    camera.updateProjectionMatrix(); camera.updateMatrixWorld();
    return false;
  }
  function drawView() {
    queued = 0;
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (lost || !w || !h) return;
    const ratio = Math.min(devicePixelRatio, 1.5, Math.sqrt(2400000 / (w*h)));
    if (renderer.getPixelRatio() !== ratio) renderer.setPixelRatio(ratio);
    if (canvas.width !== Math.floor(w*ratio) || canvas.height !== Math.floor(h*ratio)) renderer.setSize(w,h,false);
    camera.aspect = w/h;
    const scale = Math.min(.7, 1024/Math.max(w,h));
    mirrorTarget.setSize(Math.max(1,Math.round(w*scale)),Math.max(1,Math.round(h*scale)));
    operator?.pose(seconds,0,!playing);
    orbiting = frameShot();
    uniforms.roadWet.value = 0;
    uniforms.roadMirror.value = null;
    // All lobby shots share the same crossing and its lighting probe.
    if (!stage || !localMap) {
      world.environment = skyMap.texture;
      if (stage) probe.position.set(191.6,1.02,-3);
      else probe.position.copy(camera.position);
      probe.update(renderer,world);
      localMap = pmrem.fromCubemap(captureTarget.texture,localMap);
      world.environment = localMap.texture;
      if (operator) operator.scene.environment = localMap.texture;
    }
    capture();
    weather.draw(seconds,operator?.crop);
  }
  function queueView() {
    if (!queued) queued = requestAnimationFrame(drawView);
  }
  function animate(now) {
    if (now-previousTime >= 1000/30) {
      const dt = Math.min((now-previousTime)/1000,.12);
      previousTime = now; seconds += dt;
      const kitRevealed = operator?.pose(seconds,dt,false);
      if (orbiting && now-lastCapture >= 1000/15) {
        orbiting = frameShot();
        capture();
        lastCapture = now;
      } else if (kitRevealed) capture();
      weather.draw(seconds,operator?.crop);
    }
    animation = requestAnimationFrame(animate);
  }
  function updatePlayback() {
    cancelAnimationFrame(animation);
    if (motion) motion.checked = playing;
    if (pause) {
      const zh = document.documentElement.lang.startsWith('zh');
      pause.disabled = lost;
      pause.setAttribute('aria-pressed',String(!playing));
      pause.textContent = playing ? (zh ? '暫停動態' : 'Pause motion') : (zh ? '播放動態' : 'Resume motion');
    }
    if (!lost && playing && !document.hidden) {
      previousTime = performance.now();
      animation = requestAnimationFrame(animate);
    }
  }
  function setPlaying(value) {
    playing = value; updatePlayback(); queueView();
  }
  motion?.addEventListener('change', () => setPlaying(motion.checked));
  pause?.addEventListener('click', () => setPlaying(!playing));
  reduced.addEventListener('change', () => setPlaying(!reduced.matches));
  document.addEventListener('visibilitychange', updatePlayback);
  for (const event of ['recordchange','posechange','skilllevelup']) stage?.addEventListener(event,queueView);
  view?.addEventListener('change',queueView);
  wet?.addEventListener('change',() => { if (!lost) { capture(); weather.draw(seconds,operator?.crop); } });
  window.addEventListener('resize',queueView);
  canvas.addEventListener('webglcontextlost',event => {
    event.preventDefault(); lost = true; stage?.classList.remove('scene-ready'); updatePlayback();
  });
  canvas.addEventListener('webglcontextrestored',() => {
    lost = false;
    world.remove(street);
    probe.position.copy(sky.position);
    probe.update(renderer, world);
    pmrem.fromCubemap(captureTarget.texture,skyMap);
    world.add(street);
    localMap?.dispose();
    localMap = null;
    weather.restore();
    renderer.shadowMap.needsUpdate = true;
    drawView(); stage?.classList.add('scene-ready'); updatePlayback();
  });
  drawView();
  updatePlayback();
  if (stage) stage.classList.add('scene-ready');
  else {
    document.querySelector('fieldset').disabled = false;
    document.querySelector('#status').hidden = true;
  }
}

const stage = document.querySelector('.rooftop');
const canvas = stage ? stage.querySelector('.city-canvas') : document.querySelector('canvas');
mountStreet(canvas,stage).catch(error => {
  console.warn('Main street scene unavailable',error);
  const status = document.querySelector('#status');
  if (status) status.textContent = 'Street preview unavailable. Check WebGL support and serve the asset folder over HTTP.';
});
