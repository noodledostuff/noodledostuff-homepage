import * as T from '../vendor/three/three.module.min.js';

const screenVertex = `varying vec2 st;
void main() {
  st = uv;
  gl_Position = vec4(position.xy, 0., 1.);
}`;

function screenPass(uniforms, fragment, display = false) {
  return new T.ShaderMaterial({
    uniforms, vertexShader: screenVertex, fragmentShader: 'varying vec2 st;\n' + fragment,
    depthTest: false, depthWrite: false, toneMapped: display,
  });
}

const readDepth = `
  #include <packing>
  uniform sampler2D sceneDepth;
  float depthAt(vec2 uv) {
    vec4 d = texture2D(sceneDepth, uv);
    #ifdef PACKED_DEPTH
      return unpackRGBAToDepth(d);
    #else
      return d.r;
    #endif
  }`;

const lights = `
  uniform vec3 lightPosition[5], lightPower[5];
  uniform float downlight[5];
  vec3 airLight(vec3 p) {
    vec3 light = vec3(.032, .052, .094);
    for (int i=0; i<5; ++i) {
      vec3 delta = lightPosition[i] - p;
      float r2 = dot(delta, delta);
      float cone = smoothstep(.38, .88, delta.y * inversesqrt(max(r2, .001)));
      light += lightPower[i] * mix(1., cone, downlight[i]) / (1.8 + r2);
    }
    return light;
  }`;

function rainMesh(uniforms) {
  const geometry = new T.InstancedBufferGeometry().copy(new T.PlaneGeometry(1, 1));
  const count = 9000, seeds = new Float32Array(count * 4);
  let seed = 173;
  for (let i=0; i<seeds.length; ++i) {
    seed = (Math.imul(1664525, seed) + 1013904223) >>> 0;
    seeds[i] = seed / 4294967296;
  }
  geometry.setAttribute('drop', new T.InstancedBufferAttribute(seeds, 4));
  geometry.instanceCount = count;
  const material = new T.ShaderMaterial({
    uniforms, transparent: true, blending: T.AdditiveBlending,
    depthWrite: false, depthTest: false, toneMapped: false,
    vertexShader: `
      #include <packing>
      ${lights}
      attribute vec4 drop;
      uniform sampler2D roofDepth;
      uniform mat4 roofProjection;
      uniform vec2 size;
      uniform float seconds;
      varying vec2 streak;
      varying vec3 color;
      void main() {
        vec3 eye = cameraPosition;
        float fall = fract(drop.z - seconds * (.33 + .18*drop.w));
        float y = max(-.3, eye.y - 12.) + fall * 27.;
        vec2 xz = eye.xz + (drop.xy - .5)*46. + vec2(-.11, .045)*fall*27.;
        vec3 p = vec3(xz.x, y, xz.y);
        vec4 overhead = roofProjection * vec4(p, 1.);
        float roof = unpackRGBAToDepth(texture2D(roofDepth, overhead.xy*.5 + .5));
        float visible = smoothstep(.001, .16, (roof - (overhead.z*.5+.5))*110.);
        float range = length(eye-p);
        visible *= smoothstep(.35,1.5,range)*(1.-smoothstep(14.,24.,range));
        vec4 center = projectionMatrix * viewMatrix * vec4(p,1.);
        vec3 tail = p + vec3(-.12,1.,.045) * (.10 + .17*drop.w);
        vec4 end = projectionMatrix * viewMatrix * vec4(tail,1.);
        vec2 slope = (end.xy / max(.01,end.w) - center.xy / max(.01,center.w))*size;
        vec2 across = normalize(vec2(slope.y, -slope.x) + vec2(.0001));
        gl_Position = mix(center, end, uv.y);
        gl_Position.xy += across * (uv.x-.5) * (2.25 + 1.5*drop.w) / size * gl_Position.w;
        streak = uv;
        color = visible * (.32 + .68*drop.w) * (vec3(.14,.18,.22) + min(airLight(p)*.76,vec3(2.5)));
      }`,
    fragmentShader: `
      ${readDepth}
      uniform vec2 size;
      varying vec2 streak;
      varying vec3 color;
      void main() {
        if (gl_FragCoord.z > depthAt(gl_FragCoord.xy / size)) discard;
        float shape = (1.-abs(streak.x*2.-1.)) * sin(3.14159*streak.y);
        gl_FragColor = vec4(color, shape*.73);
      }`,
  });
  const mesh = new T.Mesh(geometry, material);
  mesh.frustumCulled = false;
  return mesh;
}

export function streetWeather(renderer, world, camera, sky, practicals, type, foreground) {
  const target = (depthBuffer = false) => new T.WebGLRenderTarget(1, 1, { type, depthBuffer });
  const frame = target(true), atmosphere = target(), bright = target(), blur = target(), rain = target(!!foreground);
  if (renderer.capabilities.isWebGL2) frame.samples = Math.min(4, renderer.capabilities.maxSamples);
  const hasDepth = renderer.capabilities.isWebGL2 || renderer.extensions.has('WEBGL_depth_texture');
  if (hasDepth) frame.depthTexture = new T.DepthTexture(1, 1, T.UnsignedIntType);
  const packedTarget = () => new T.WebGLRenderTarget(1, 1, {
    minFilter: T.NearestFilter, magFilter: T.NearestFilter,
  });
  const fallback = hasDepth ? null : packedTarget();
  const roof = packedTarget();
  roof.setSize(512, 512);
  const depthMaterial = new T.MeshDepthMaterial({ depthPacking: T.RGBADepthPacking, side: T.DoubleSide });
  function drawDepth(dest, eye) {
    const oldColor = renderer.getClearColor(new T.Color()), oldAlpha = renderer.getClearAlpha();
    sky.visible = false;
    world.overrideMaterial = depthMaterial;
    renderer.setClearColor(0xffffff, 1);
    renderer.setRenderTarget(dest);
    renderer.render(world, eye);
    renderer.setClearColor(oldColor, oldAlpha);
    world.overrideMaterial = null;
    sky.visible = true;
    renderer.setRenderTarget(null);
  }
  // A single overhead depth capture gives every falling drop a roof or pavement to hit.
  const above = new T.OrthographicCamera(-55,55,56,-56,.1,110.1);
  above.position.set(191,85,-29);
  above.up.set(0,0,-1);
  above.lookAt(191,0,-29);
  above.updateMatrixWorld();
  drawDepth(roof, above);

  const sources = Array.from({length: 3}, () => new T.Vector4(0,0,0,0));
  const uniforms = {
    sceneDepth: { value: frame.depthTexture || fallback.texture },
    size: { value: new T.Vector2() }, seconds: { value: 0 },
    roofDepth: { value: roof.texture },
    roofProjection: { value: new T.Matrix4().multiplyMatrices(above.projectionMatrix, above.matrixWorldInverse) },
    lightPosition: { value: Array.from({length: 5}, () => new T.Vector3()) },
    lightPower: { value: Array.from({length: 5}, () => new T.Color()) },
    downlight: { value: new Float32Array(5) },
  };
  const fog = screenPass({
    ...uniforms, image: { value: frame.texture }, source: { value: sources },
    projectionInverse: { value: camera.projectionMatrixInverse }, eyeMatrix: { value: camera.matrixWorld },
    clipRange: { value: new T.Vector2(camera.near,camera.far) },
  }, `
    ${readDepth}
    ${lights}
    uniform sampler2D image;
    uniform mat4 projectionInverse, eyeMatrix;
    uniform vec4 source[3];
    uniform vec2 size, clipRange;
    float distanceAt(float z) { return clipRange.x * clipRange.y / (clipRange.y-z*(clipRange.y-clipRange.x)); }
    void main() {
      float depth = depthAt(st);
      vec4 end = projectionInverse * vec4(st*2.-1., depth*2.-1., 1.);
      vec3 segment = mat3(eyeMatrix) * (end.xyz/end.w);
      vec3 ray = normalize(segment);
      float path = min(length(segment), 95.), previous = 0., transmission = 1.;
      vec3 scatter = vec3(0.);
      float jitter = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(.06711056,.00583715))));
      for (int i=1; i<=20; ++i) {
        float f = float(i)/20., next = f*f*path, stepLength = next-previous;
        vec3 p = eyeMatrix[3].xyz + ray*(previous + stepLength*(.25+.5*jitter));
        float bank = .82 + .18*sin(p.z*.31 + p.y*.9)*sin(p.x*.42-p.z*.12);
        float density = .0017 + .017*exp(-max(p.y,0.)*.18)*bank;
        float pass = exp(-density*stepLength);
        scatter += transmission*(1.-pass)*airLight(p);
        transmission *= pass;
        previous = next;
      }
      vec3 c = texture2D(image,st).rgb * transmission + scatter;
      vec2 aspect = vec2(size.x/size.y,1.);
      for (int i=0; i<3; ++i) {
        vec4 s = source[i];
        if (s.w<=0.) continue;
        vec2 delta = (st-s.xy)*aspect;
        float visible = smoothstep(-.16,-.025,distanceAt(depthAt(s.xy))-distanceAt(s.z));
        vec2 axis = (s.xy-.5)*aspect, screen = (st-.5)*aspect;
        float halo = exp(-length(delta)*72.);
        float streak = exp(-abs(delta.x)*29.-abs(delta.y)*780.);
        float ghost = 1.-smoothstep(.014,.022,length(screen+.48*axis));
        c += visible*s.w*(vec3(.84,.56,.33)*(halo+.32*streak) + vec3(.012,.026,.026)*ghost);
      }
      gl_FragColor = vec4(c,1.);
    }`);
  const drops = rainMesh(uniforms);
  let streetDepth;
  if (foreground) {
    drops.material.depthTest = true;
    Object.assign(drops.material, {
      blending:T.CustomBlending, blendSrc:T.SrcAlphaFactor, blendDst:T.OneFactor,
      blendSrcAlpha:T.ZeroFactor, blendDstAlpha:T.OneFactor,
    });
    if (renderer.capabilities.isWebGL2 || renderer.extensions.has('EXT_frag_depth')) {
      streetDepth = screenPass(uniforms, `${readDepth}
        void main(){gl_FragDepthEXT=depthAt(st); gl_FragColor=vec4(0.);}`);
      streetDepth.extensions.fragDepth = true;
      streetDepth.depthTest = streetDepth.depthWrite = true;
      streetDepth.depthFunc = T.AlwaysDepth;
      if (!hasDepth) streetDepth.defines = { PACKED_DEPTH: 1 };
    }
  }
  if (!hasDepth) {
    fog.defines = { PACKED_DEPTH: 1 };
    drops.material.defines = { PACKED_DEPTH: 1 };
  }
  const bloom = screenPass({
    image: { value: atmosphere.texture }, stepUV: { value: new T.Vector2() },
    threshold: { value: type === T.UnsignedByteType ? .65 : .95 },
  }, `uniform sampler2D image;
    uniform vec2 stepUV;
    uniform float threshold;
    vec3 tap(vec2 uv) {
      vec3 c = texture2D(image,uv).rgb;
      if (threshold <= 0.) return c;
      float lum = dot(c,vec3(.2126,.7152,.0722));
      return min(c,vec3(12.))*smoothstep(threshold*.65,threshold*1.35,lum);
    }
    void main() {
      vec3 c = tap(st)*.227;
      c += .316*(tap(st+1.385*stepUV)+tap(st-1.385*stepUV));
      c += .0705*(tap(st+3.231*stepUV)+tap(st-3.231*stepUV));
      gl_FragColor = vec4(c,1.);
    }`);
  const finish = screenPass({
    image: { value: atmosphere.texture }, glow: { value: blur.texture }, drops: { value: rain.texture },
    crop: { value: new T.Vector3(0,0,1) },
  }, `uniform sampler2D image, glow, drops;
    uniform vec3 crop;
    void main() {
      vec2 uv = (st-.5)/crop.z + .5 + crop.xy;
      vec4 dynamicLayer = texture2D(drops,uv);
      vec3 background = texture2D(image,uv).rgb + .17*texture2D(glow,uv).rgb;
      vec3 c = background * ${foreground ? '(1.-dynamicLayer.a)' : '1.'} + dynamicLayer.rgb;
      vec2 centered = st*2.-1.;
      gl_FragColor = vec4(c*(1.-.055*dot(centered,centered)),1.);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
      float scan = .5+.5*cos(3.14159*floor(gl_FragCoord.y));
      vec3 grille = .5+.5*cos(2.0944*(floor(gl_FragCoord.x)+vec3(0.,1.,2.)));
      gl_FragColor.rgb *= 1.-.018*scan-.008*grille;
    }`, true);
  const quad = new T.Mesh(new T.PlaneGeometry(2,2), fog);
  quad.frustumCulled = false;
  const screen = new T.Scene(), ortho = new T.Camera(), rainfall = new T.Scene();
  screen.add(quad);
  rainfall.add(drops);
  function pass(dest, material) {
    quad.material = material;
    renderer.setRenderTarget(dest);
    renderer.render(screen, ortho);
  }
  const flareSites = [];
  world.traverse(node => {
    if (node.isMesh && (node.material.name === 'Street lamp lens' || node.material.name === 'MI_Advertising_Signboard')) {
      flareSites.push(new T.Box3().setFromObject(node).getCenter(new T.Vector3()));
    }
  });
  return {
    restore() { drawDepth(roof,above); },
    capture() {
      const size = renderer.getDrawingBufferSize(uniforms.size.value);
      for (const t of [frame, atmosphere, rain, fallback]) t?.setSize(size.x,size.y);
      const bw = Math.max(1,Math.round(size.x/6)), bh = Math.max(1,Math.round(size.y/6));
      bright.setSize(bw,bh); blur.setSize(bw,bh);
      const nearest = [...practicals].sort((a,b) => a.position.distanceToSquared(camera.position) - b.position.distanceToSquared(camera.position));
      nearest.slice(0,5).forEach((lamp,i) => {
        uniforms.lightPosition.value[i].copy(lamp.position);
        uniforms.lightPower.value[i].copy(lamp.color).multiplyScalar(lamp.intensity*.11);
        uniforms.downlight.value[i] = Number(!!lamp.isSpotLight);
      });
      const visible = flareSites.map(p => p.clone().project(camera))
        .filter(p => Math.abs(p.x)<.96 && Math.abs(p.y)<.96 && p.z> -1 && p.z<1)
        .sort((a,b) => a.z-b.z);
      sources.forEach((s,i) => {
        const p = visible[i];
        if (p) s.set(p.x*.5+.5,p.y*.5+.5,p.z*.5+.5,.62);
        else s.w=0;
      });
      if (fallback) drawDepth(fallback,camera);
      renderer.setRenderTarget(frame);
      renderer.render(world,camera);
      pass(atmosphere,fog);
      const cutoff = bloom.uniforms.threshold.value;
      bloom.uniforms.image.value = atmosphere.texture;
      bloom.uniforms.stepUV.value.set(1.2/bw,0);
      pass(bright,bloom);
      bloom.uniforms.image.value = bright.texture;
      bloom.uniforms.stepUV.value.set(0,1.2/bh);
      bloom.uniforms.threshold.value = -.01;
      pass(blur,bloom);
      bloom.uniforms.threshold.value = cutoff;
      renderer.setRenderTarget(null);
    },
    draw(seconds, crop) {
      if (crop) finish.uniforms.crop.value.copy(crop);
      uniforms.seconds.value = seconds;
      renderer.setRenderTarget(rain);
      if (foreground) {
        if (streetDepth) pass(rain,streetDepth);
        else {
          renderer.setClearAlpha(0); renderer.clear(); renderer.setClearAlpha(1);
        }
        renderer.autoClear = false;
        renderer.render(foreground,camera);
      }
      renderer.render(rainfall,camera);
      renderer.autoClear = true;
      pass(null,finish);
    },
  };
}

