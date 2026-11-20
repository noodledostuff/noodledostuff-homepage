import * as T from '../vendor/three/three.module.min.js';
import {RoundedBoxGeometry} from '../vendor/three/RoundedBoxGeometry.js';
import {Reflector} from '../vendor/three/Reflector.js';

export function dressRooftops(city, box, texture, sign, rand) {
  const metal=new T.MeshStandardMaterial({color:0x74858b,metalness:.78,roughness:.29});
  const lacquer=texture(256,256,(ctx,w,h)=>{
    ctx.fillStyle='#b8c3c4';ctx.fillRect(0,0,w,h);
    for(let i=0;i<1500;i++){
      ctx.fillStyle=i%3?'rgba(32,47,50,.07)':'rgba(217,209,185,.12)';
      ctx.fillRect(rand()*w,rand()*h,1+rand()*2,1+rand()*9);
    }
    const stain=ctx.createLinearGradient(0,h*.76,0,h);stain.addColorStop(0,'transparent');stain.addColorStop(1,'#676863');
    ctx.fillStyle=stain;ctx.fillRect(0,0,w,h);
  });
  const enamel=new T.MeshStandardMaterial({map:lacquer,metalness:.48,roughness:.34});
  const shell=new RoundedBoxGeometry(1,1,1,2,.05);
  const dark=new T.MeshStandardMaterial({color:0x2c3339,metalness:.5,roughness:.5});
  const rib=new T.TorusGeometry(1,.035,8,48);
  const cylinder=new T.CylinderGeometry(1,1,1,32);
  const fanBlade=new T.SphereGeometry(1,12,8);
  function shape(geo,mat,x,y,z,sx,sy,sz) {
    const mesh=new T.Mesh(geo,mat);
    mesh.position.set(x,y,z);mesh.scale.set(sx,sy,sz);city.add(mesh);return mesh;
  }
  function pipe(points,radius) {
    const curve=new T.CatmullRomCurve3(points.map(p=>new T.Vector3(...p)),false,'centripetal');
    city.add(new T.Mesh(new T.TubeGeometry(curve,points.length*5,radius,12,false),metal));
  }
  function condenser(x,y,z,scale) {
    const s=scale;
    shape(shell,enamel,x,y,z,1.25*s,.80*s,.55*s);
    box(x,y-.44*s,z,1.34*s,.06*s,.67*s,dark);
    const face=z+.29*s, cx=x-.17*s;
    shape(cylinder,dark,cx,y,face,.31*s,.025*s,.31*s).rotation.x=Math.PI/2;
    for(let i=0;i<6;i++) {
      const a=i*Math.PI/3;
      const blade=shape(fanBlade,metal,cx+.125*s*Math.sin(a),y+.125*s*Math.cos(a),face+.022*s,.07*s,.154*s,.014*s);
      blade.rotation.z=-a+.42;
    }
    for(let i=0;i<8;i++){
      const wire=box(cx,y,face+.042*s,.011*s,.58*s,.012*s,dark);wire.rotation.z=i*Math.PI/8;
    }
    for(const r of [.07,.11,.15,.19,.23,.27,.30])shape(rib,dark,cx,y,face+.045*s,r*s,r*s,s*.24);
    box(x+.19*s,y,face,.007*s,.72*s,.014*s,dark);
    for(const dx of [-.54,.55])for(const dy of [-.32,.32]){
      shape(cylinder,metal,x+dx*s,y+dy*s,face,.012*s,.014*s,.012*s).rotation.x=Math.PI/2;
    }
    for(let i=0;i<6;i++)box(x+.36*s,y+(i-2.5)*.082*s,face,.28*s,.023*s,.03*s,dark);
  }
  const plasterMap=texture(256,256,(ctx,w,h)=>{
    ctx.fillStyle='#b0aaa1';ctx.fillRect(0,0,w,h);
    for(let i=0;i<2300;i++){
      ctx.fillStyle=rand()>.4?'rgba(38,40,44,.065)':'rgba(251,238,213,.12)';
      ctx.fillRect(rand()*w,rand()*h,1+rand()*4,2+rand()*24);
    }
    for(let i=0;i<24;i++) {
      const x=rand()*w,y=rand()*h;
      const stain=ctx.createLinearGradient(0,y,0,y+33);stain.addColorStop(0,'rgba(42,46,46,.19)');stain.addColorStop(1,'transparent');
      ctx.fillStyle=stain;ctx.fillRect(x,y,1+rand()*9,33);
    }
  });
  plasterMap.wrapS=plasterMap.wrapT=T.RepeatWrapping;plasterMap.repeat.set(2,5);
  const glass=['#eeb47f','#a8d7d2','#647b8e','#475162','#d59884'].map((color,i)=>{
    const room=texture(128,160,(ctx,w,h)=>{
      const light=ctx.createRadialGradient(w*.31,h*.17,2,w*.5,h*.44,h*.87);
      light.addColorStop(0,color);light.addColorStop(.62,color);light.addColorStop(1,'#34323c');
      ctx.fillStyle=light;ctx.fillRect(0,0,w,h);
      ctx.fillStyle='rgba(42,41,49,.30)';
      ctx.fillRect(0,h*.69,w,h*.035);ctx.fillRect(w*.74,h*.33,w*.21,h*.28);
      ctx.fillRect(w*.18,h*.66,w*.07,h*.13);ctx.fillRect(w*.12,h*.78,w*.45,h*.22);
      const curtain=ctx.createLinearGradient(0,0,w,0);
      for(let n=0;n<=8;n++)curtain.addColorStop(n/8,n%2?'#89817e':'#554f59');
      ctx.fillStyle=curtain;ctx.fillRect(i%2?w*.68:0,0,w*.32,h*(.76+.04*i));
      ctx.fillStyle='rgba(43,48,57,.40)';
      for(let y=0;y<13+i*9;y+=5)ctx.fillRect(0,y,w,2);
    });
    return new T.MeshStandardMaterial({map:room,color:0xb2b5b7,emissiveMap:room,emissive:0xffffff,
      emissiveIntensity:[.67,.34,.10,.025,.46][i],metalness:.39,roughness:.19});
  });
  function tenement(x,front,width,top,floors,tint,balconies) {
    const wall=new T.MeshStandardMaterial({map:plasterMap,color:tint,roughness:.84});
    const pitch=1.30,depth=3.1;
    box(x,top-floors*pitch/2,front-depth/2,width,floors*pitch,depth,wall);
    box(x,top+.10,front-depth/2,width+.14,.2,depth+.17,wall);
    for(let level=0;level<floors;level++){
      const y=top-.77-pitch*level;
      for(let bay=0;bay<3;bay++){
        const cx=x+(bay-1)*width*.305,win=width*.232;
        box(cx,y,front+.033,win+.11,.93,.08,dark);
        const panes=glass[Math.floor(rand()*glass.length)];
        for(const side of [-1,1]){
          box(cx+side*win*.253,y,front+.085,win*.475,.80,.033,panes);
        }
        box(cx,y+.17,front+.112,win,.024,.025,metal);
        box(cx,y-.48,front+.09,win+.15,.05,.19,wall);
        if((level+bay)%3===1)condenser(cx+.09,y-.54,front+.19,.36);
        if(balconies && bay===level%3){
          box(cx,y-.51,front+.24,win+.18,.065,.52,wall);
          box(cx,y-.03,front+.50,win+.18,.035,.035,metal);
          for(let bar=0;bar<=8;bar++)box(cx+win*(bar/8-.5),y-.27,front+.50,.02,.46,.025,metal);
        }
      }
      box(x,y-.62,front+.05,width,.04,.12,wall);
    }
    for(const side of [-1,1]){
      const xx=x+side*width*.477;
      shape(cylinder,metal,xx,top-floors*pitch/2,front+.14,.045,floors*pitch,.045);
      for(let y=top-.5;y>top-floors*pitch;y-=1.6)box(xx,y,front+.13,.15,.055,.14,dark);
    }
    box(x+.24,top+.39,front-1.65,width*.52,.75,1.48,wall);
  }
  const streetStart=city.children.length;
  tenement(-4.25,-11.4,3.55,2.85,8,'#858888',true);
  tenement(2.85,-13.2,4.05,1.55,9,'#b5a390',true);
  tenement(6.65,-14.9,3.45,7.1,10,'#8b9e98',false);
  sign(1.18,.83,-12.55,.48,1.74,'茶餐廳','#ffae81',true);
  for(const y of [.16,1.50])box(1.18,y,-12.85,.055,.07,.7,metal);
  sign(3.20,.13,-12.62,2.32,.39,'上海髮廊','#9adcd9');
  sign(-2.81,1.66,-10.85,.49,2.05,'通菜街','#f091b4',true);
  for(const y of [.85,2.46])box(-2.81,y,-11.13,.05,.06,.56,metal);
  for(const [x,y,z] of [[2.33,1.8,-14.3],[-4.8,3.1,-12.9]]){
    shape(cylinder,metal,x,y+.6,z,.026,1.35,.026);
    for(let i=0;i<5;i++)box(x,y+1.17,z+(i-2)*.11,.62-.055*i,.018,.018,metal);
    box(x,y+1.17,z,.025,.025,.68,dark);
  }
  city.children.slice(streetStart).forEach(part=>part.position.y-=4.55);
  // Water tanks, cable trays and condenser service runs sit inside the parapet.
  for (const [x,z,r] of [[-1.86,-5.05,.33],[-3.17,-5.33,.48]]){
    const y=.78;
    for(const dx of [-.55,.55])box(x+dx*r,.17,z,.066,.34,r*1.22,dark);
    shape(cylinder,metal,x,y,z,r,1.07,r);
    shape(fanBlade,metal,x,y+.53,z,r,.13,r);
    for(let i=0;i<5;i++)shape(rib,enamel,x,y-.44+i*.22,z,r,r,.52).rotation.x=Math.PI/2;
    pipe([[x,.43,z+.29],[x,.32,z+.42],[x,.16,z+.49],[x+.51,.12,z+.52]],.041);
  }
  const firstUnit=city.children.length;
  condenser(2.37,.38,-4.95,.79);
  const swivel=new T.Matrix4().makeTranslation(2.37,0,-4.95)
    .multiply(new T.Matrix4().makeRotationY(-.32)).multiply(new T.Matrix4().makeTranslation(-2.37,0,4.95));
  city.children.slice(firstUnit).forEach(part=>part.applyMatrix4(swivel));
  condenser(3.64,.49,-4.7,.99);
  for(let i=0;i<3;i++)pipe([[3.8,.24+i*.07,-4.35],[4,.24+i*.07,-4.33],[4.1,.17+i*.07,-3.95],[4.1,.09+i*.07,-2.85]],.023);
  for(const x of [-1.3,1.46,3.1]){
    box(x,.008,-3.65,.32,.015,.56,dark);
    for(let i=0;i<10;i++)box(x,.022,-3.9+i*.053,.29,.02,.014,metal);
  }
  for(const [left,right,y,z] of [[-4.8,5,3.85,-12],[-3.6,5.7,4.3,-15],[-5.5,3.9,3.2,-14.1]]){
    const curve=new T.CatmullRomCurve3([new T.Vector3(left,y,z),new T.Vector3((left+right)/2,y-.58,z-.28),new T.Vector3(right,y+.13,z-.7)]);
    city.add(new T.Mesh(new T.TubeGeometry(curve,48,.013,6,false),dark));
  }
}

// The planar pass follows the real skyline. The water mask leaves the concrete visible.
export function wetDeck() {
  const shader={
    uniforms:{tDiffuse:{value:null},color:{value:null},textureMatrix:{value:null}},
    vertexShader:`uniform mat4 textureMatrix;
      varying vec4 projected;
      varying vec3 world;
      void main(){
        projected=textureMatrix*vec4(position,1.);
        world=(modelMatrix*vec4(position,1.)).xyz;
        gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);
      }`,
    fragmentShader:`uniform sampler2D tDiffuse;
      varying vec4 projected;
      varying vec3 world;
      float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      float noise(vec2 p){
        vec2 cell=floor(p),f=fract(p);f=f*f*(3.-2.*f);
        return mix(mix(hash(cell),hash(cell+vec2(1,0)),f.x),
                   mix(hash(cell+vec2(0,1)),hash(cell+1.),f.x),f.y);
      }
      void main(){
        vec2 p=world.xz;
        float water=smoothstep(.27,.63,noise(p*1.14)*.73+noise(p*4.6)*.27);
        vec2 uv=projected.xy/projected.w;
        vec2 ripple=vec2(noise(p*vec2(13.,31.)),noise(p*vec2(23.,12.)))-.5;
        uv+=ripple*mix(.008,.0017,water);
        vec3 reflection=texture2D(tDiffuse,uv).rgb*.5+
          (texture2D(tDiffuse,uv+vec2(.003,0)).rgb+texture2D(tDiffuse,uv-vec2(.003,0)).rgb)*.25;
        float grazing=1.-abs(normalize(cameraPosition-world).y);
        gl_FragColor=vec4(reflection*vec3(.90,.96,1.),water*(.23+.76*grazing*grazing));
        #include <colorspace_fragment>
      }`
  };
  const surface=new Reflector(new T.PlaneGeometry(22,13),{shader,multisample:0,clipBias:.001});
  surface.rotation.x=-Math.PI/2;surface.position.set(0,-.017,.80);
  surface.material.transparent=true;surface.material.depthWrite=false;surface.renderOrder=2;
  return surface;
}