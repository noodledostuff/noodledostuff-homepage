import * as T from '../vendor/three/three.module.min.js';

// The color and depth buffers include the rooftop, equipment and skinned character.
export function rooftopFilm(target,camera,lamp){
  return new T.ShaderMaterial({
    defines:target.depthTexture ? {SCENE_DEPTH:1} : {},
    uniforms:{
      frameMap:{value:target.texture},depthMap:{value:target.depthTexture},
      inverseProjection:{value:camera.projectionMatrixInverse},worldFromCamera:{value:camera.matrixWorld},
      lamp:{value:lamp},source:{value:new T.Vector3()},clipRange:{value:new T.Vector2(camera.near,camera.far)},
      aspect:{value:1},texel:{value:new T.Vector2()},grainFrame:{value:0}
    },
    vertexShader:'varying vec2 uv0;void main(){uv0=uv;gl_Position=vec4(position.xy,0.,1.);}',
    fragmentShader:`varying vec2 uv0;
      uniform sampler2D frameMap,depthMap;
      uniform mat4 inverseProjection,worldFromCamera;
      uniform vec3 lamp,source;
      uniform vec2 clipRange,texel;
      uniform float aspect,grainFrame;
      float distanceAt(float depth){
        return clipRange.x*clipRange.y/(clipRange.y-depth*(clipRange.y-clipRange.x));
      }
      float falloff(vec3 p){return 1./(1.+dot(p,p));}
      vec3 fogAlongRay(vec3 color,float depth){
        vec4 end=inverseProjection*vec4(uv0*2.-1.,depth*2.-1.,1.);
        vec3 segment=mat3(worldFromCamera)*(end.xyz/end.w);
        vec3 origin=worldFromCamera[3].xyz,ray=normalize(segment);
        float lengthInAir=min(length(segment),80.);
        float transmission=1.,previous=0.;
        vec3 scatter=vec3(0.);
        // Quadratic spacing resolves the practical lamp and gives distant haze longer steps.
        for(int i=1;i<=14;i++){
          float f=float(i)/14.,next=lengthInAir*f*f,stepSize=next-previous;
          vec3 p=origin+ray*(previous+stepSize*.5);
          float layer=exp(-max(p.y+.7,0.)*.22);
          float density=(.003+.015*layer)*(.88+.12*sin(.37*p.x+.23*p.z)*sin(.29*p.z-.22*p.y));
          vec3 toLamp=lamp-p;
          float forward=max(0.,dot(ray,toLamp*inversesqrt(max(.001,dot(toLamp,toLamp)))));
          vec3 light=vec3(.043,.069,.12)
            +vec3(2.75,1.10,.35)*falloff(toLamp)*(.6+2.0*forward*forward)
            +vec3(.70,.115,.12)*falloff((p-vec3(1.38,.88,-14.))*.48)
            +vec3(.09,.51,.50)*falloff((p-vec3(-3.16,.51,-13.4))*.56);
          float pass=exp(-density*stepSize);
          scatter+=transmission*(1.-pass)*light;
          transmission*=pass;previous=next;
        }
        return color*transmission+scatter;
      }
      float visibleAt(vec2 uv){
        #ifdef SCENE_DEPTH
          float gap=distanceAt(texture2D(depthMap,uv).x)-distanceAt(source.z);
          return smoothstep(-.10,-.045,gap);
        #else
          return smoothstep(.65,1.,texture2D(frameMap,uv).r);
        #endif
      }
      float aperture(vec2 p,float radius){
        vec2 a=abs(p);
        float hex=max(a.y,dot(a,vec2(.866,.5)));
        return 1.-smoothstep(radius*.77,radius,hex);
      }
      void main(){
        vec3 c=texture2D(frameMap,uv0).rgb;
        #ifdef SCENE_DEPTH
          c=fogAlongRay(c,texture2D(depthMap,uv0).x);
        #endif
        vec2 scale=vec2(aspect,1.),delta=(uv0-source.xy)*scale;
        float edge=1.-smoothstep(.43,.5,max(abs(source.x-.5),abs(source.y-.5)));
        if(edge>0. && source.z>0. && source.z<1.){
          vec2 d=texel*1.5;
          float vis=.4*visibleAt(source.xy)+.15*(visibleAt(source.xy+vec2(d.x,0.))
            +visibleAt(source.xy-vec2(d.x,0.))+visibleAt(source.xy+vec2(0.,d.y))+visibleAt(source.xy-vec2(0.,d.y)));
          vec2 axis=(source.xy-.5)*scale,screen=(uv0-.5)*scale;
          float halo=exp(-length(delta)*66.);
          float streak=exp(-abs(delta.x)*12.-abs(delta.y)*540.);
          vec3 ghosts=vec3(.033,.075,.072)*aperture(screen+.46*axis,.028)
            +vec3(.071,.040,.019)*aperture(screen+.91*axis,.050);
          c+=edge*vis*(vec3(1.15,.50,.18)*(halo+.60*streak)+ghosts);
        }
        float vignette=smoothstep(.22,.8,length(uv0-.5));
        gl_FragColor=vec4(c*(1.-.16*vignette),1.);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
        vec3 hash=fract(vec3(gl_FragCoord.xy,grainFrame)*.1031);
        hash+=dot(hash,hash.yzx+33.33);
        gl_FragColor.rgb+=(fract((hash.x+hash.y)*hash.z)-.5)*.012;
      }`,
    depthTest:false,depthWrite:false
  });
}
