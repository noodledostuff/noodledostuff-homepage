import * as T from '../vendor/three/three.module.min.js';

// The office towers sit beyond the lower street blocks, below and above the roof line.
export function addGlassDistrict(city, texture, rand) {
  const lights=texture(512,1024,(ctx,w,h)=>{
    ctx.fillStyle='#060d17';ctx.fillRect(0,0,w,h);
    for(let floor=0;floor<64;floor++){
      const warmth=rand(),run=Math.floor(rand()*22),off=rand()<.24;
      for(let col=0;col<32;col++){
        const on=!off && (Math.abs(col-run)<3+floor%4 || rand()>.77);
        const bright=on? .39+rand()*.55 : .12+rand()*.16;
        ctx.globalAlpha=bright;
        ctx.fillStyle=on?(warmth>.65?'#e9bd86':warmth>.38?'#b0d5dc':'#81a6d0'):'#254568';
        ctx.fillRect(col*16+1,floor*16+3,14,10);
        if(on){ctx.fillStyle='#fff2cc';ctx.fillRect(col*16+2,floor*16+4,10,1);}
      }
    }
    ctx.globalAlpha=1;
  });
  const glazing=texture(512,1024,(ctx,w,h)=>{
    const sheen=ctx.createLinearGradient(0,0,w,h*.12);
    for(const [at,color] of [[0,'#233449'],[.21,'#637e95'],[.32,'#334353'],[.56,'#8a7890'],[.68,'#39495c'],[1,'#637e91']])sheen.addColorStop(at,color);
    ctx.fillStyle=sheen;ctx.fillRect(0,0,w,h);
    ctx.fillStyle='#253649';
    for(let x=0;x<w;x+=8)ctx.fillRect(x,0,1,h);
    for(let y=0;y<h;y+=16)ctx.fillRect(0,y,w,3);
  });
  const panes=new T.MeshPhysicalMaterial({map:glazing,color:0xaebdca,emissiveMap:lights,emissive:0xe3f2ff,emissiveIntensity:1.08,
    metalness:.76,roughness:.145,clearcoat:1,clearcoatRoughness:.12,envMapIntensity:1.25});
  const steel=new T.MeshStandardMaterial({color:0x52667a,metalness:.84,roughness:.24});
  const crown=new T.MeshPhysicalMaterial({color:0x3e7890,emissive:0x326e88,emissiveIntensity:.45,metalness:.67,roughness:.17,clearcoat:1});
  const accent=new T.MeshStandardMaterial({color:0x8de2de,emissive:0x53c9ce,emissiveIntensity:.85,metalness:.45,roughness:.28});
  function part(group,geo,mat,x,y,z,sx=1,sy=1,sz=1){
    const mesh=new T.Mesh(geo,mat);mesh.position.set(x,y,z);mesh.scale.set(sx,sy,sz);group.add(mesh);return mesh;
  }
  const rect=new T.BoxGeometry(),drum=new T.CylinderGeometry(.95,1,1,48,1,true);
  const ring=new T.CylinderGeometry(1,1,1,48),dome=new T.SphereGeometry(1,48,24,0,Math.PI*2,0,Math.PI/2);
  function tower(x,z,top,w,d,yaw,round=false){
    const block=new T.Group();block.position.set(x,0,z);block.rotation.y=yaw;city.add(block);
    const base=-16,h=top-base;
    part(block,round?drum:rect,panes,0,(top+base)/2,0,round?w/2:w,h,round?d/2:d);
    if(round){
      part(block,dome,crown,0,top,0,w*.48,.85,d*.48);
      for(const dy of [-.56,-.27,0])part(block,ring,dy===0?accent:steel,0,top+dy,0,w*.482,.065,d*.482);
    }else{
      part(block,rect,steel,0,top,0,w+.05,.20,d+.05);
      part(block,rect,panes,w*.08,top+.22,0,w*.71,.49,d*.76);
      for(const side of [-1,1])part(block,rect,steel,side*w*.493,(top+base)/2,d*.505,.045,h,.045);
    }
  }
  // Rooftop lettering looks through to the windows, with the steel sign frame exposed.
  function neon(x,y,z,w,h,letters,color){
    const map=texture(768,192,(ctx,sw,sh)=>{
      ctx.font='bold 133px "Microsoft JhengHei", sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
      ctx.strokeStyle=color;ctx.lineWidth=3;ctx.shadowColor=color;ctx.shadowBlur=14;
      ctx.strokeText(letters,sw/2,sh/2,sw*.94);ctx.shadowBlur=0;ctx.fillStyle='#ffd9be';ctx.globalAlpha=.65;
      ctx.fillText(letters,sw/2,sh/2,sw*.94);
    });
    const frame=new T.Group();frame.position.set(x,y,z);city.add(frame);
    const face=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshBasicMaterial({map,transparent:true,depthWrite:false}));
    frame.add(face);
    for(const level of [-.38,.38])part(frame,rect,steel,0,level*h,-.05,w,.026,.035);
    for(const side of [-1,1])part(frame,rect,steel,side*w*.44,-1.58,-.07,.035,3.65,.04);
  }
  neon(1.38,.88,-14.0,2.68,.59,'旺角電器','#ff626e');
  neon(-3.16,.51,-13.4,1.7,.48,'冰室','#65d9cf');
  tower(4.2,-38,7.25,3.15,2.72,-.3,true);
  for(const [x,z,top,w,d,yaw] of [
    [-6,-35,4.2,2.9,2.3,.2],[-13,-47,8,3.1,3.5,-.3],[.6,-53,4.7,2.7,2.4,.3],
    [9,-47,5.6,3.3,3.1,.14],[13,-35,7.4,2.8,2.1,-.23],[19,-57,9,3.4,3.6,.26],
    [-23,-25,5.7,3.2,2.6,.41],[27,-15,4.4,3.3,3.2,-.23],[36,1,6.1,3.3,3.6,.36],
    [-2.5,-45,2.8,1.7,1.9,.24],[6.6,-58,6.3,1.9,2.5,-.25],[-9,-62,8.4,2.0,2.4,.12],[15.7,-62,5.5,2.4,2.6,-.28],
    [-34,-4,5.2,3.2,3.6,.15],[-47,9,6.8,3.1,2.9,.22]
  ])tower(x,z,top,w,d,yaw);
}