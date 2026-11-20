import{AnimationClip as or,Bone as sr,Box3 as ar,BufferAttribute as _t,BufferGeometry as lr,ClampToEdgeWrapping as ur,Color as z,ColorManagement as Fn,DirectionalLight as cr,DoubleSide as dr,FileLoader as Yn,FrontSide as hr,Group as vt,ImageBitmapLoader as fr,InstancedMesh as pr,InterleavedBuffer as mr,InterleavedBufferAttribute as gr,Interpolant as _r,InterpolateDiscrete as vr,InterpolateLinear as $n,Line as Er,LineBasicMaterial as Tr,LineLoop as Rr,LineSegments as xr,LinearFilter as Kn,LinearMipmapLinearFilter as Zn,LinearMipmapNearestFilter as Mr,LinearSRGBColorSpace as U,Loader as Ar,LoaderUtils as ae,Material as Et,MathUtils as yr,Matrix4 as Me,Mesh as wr,MeshBasicMaterial as se,MeshPhysicalMaterial as C,MeshStandardMaterial as Jn,MirroredRepeatWrapping as Sr,NearestFilter as Lr,NearestMipmapLinearFilter as br,NearestMipmapNearestFilter as Pr,NumberKeyframeTrack as kn,Object3D as ei,OrthographicCamera as Ir,PerspectiveCamera as Nr,PointLight as Hr,Points as Or,PointsMaterial as Ur,PropertyBinding as Cr,Quaternion as ti,QuaternionKeyframeTrack as Wn,RepeatWrapping as Mt,Skeleton as Dr,SkinnedMesh as Br,Sphere as Vr,SpotLight as Fr,Texture as jn,TextureLoader as kr,TriangleFanDrawMode as Wr,TriangleStripDrawMode as jr,Vector2 as ni,Vector3 as $,VectorKeyframeTrack as zn,SRGBColorSpace as le,InstancedBufferAttribute as zr}from"../three/three.module.min.js";import{BufferAttribute as fs,BufferGeometry as ps,Float32BufferAttribute as ms,InstancedBufferAttribute as gs,InterleavedBuffer as _s,InterleavedBufferAttribute as vs,TriangleFanDrawMode as Vn,TriangleStripDrawMode as ir,TrianglesDrawMode as rr,Vector3 as Es}from"../three/three.module.min.js";function gt(c,e){if(e===rr)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),c;if(e===Vn||e===ir){let t=c.getIndex();if(t===null){let o=[],s=c.getAttribute("position");if(s!==void 0){for(let a=0;a<s.count;a++)o.push(a);c.setIndex(o),t=c.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),c}let n=t.count-2,i=[];if(e===Vn)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let r=c.clone();return r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),c}var At=class extends Ar{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Lt(t)}),this.register(function(t){return new Dt(t)}),this.register(function(t){return new Bt(t)}),this.register(function(t){return new Vt(t)}),this.register(function(t){return new Pt(t)}),this.register(function(t){return new It(t)}),this.register(function(t){return new Nt(t)}),this.register(function(t){return new Ht(t)}),this.register(function(t){return new St(t)}),this.register(function(t){return new Ot(t)}),this.register(function(t){return new bt(t)}),this.register(function(t){return new Ct(t)}),this.register(function(t){return new Ut(t)}),this.register(function(t){return new yt(t)}),this.register(function(t){return new Ft(t)}),this.register(function(t){return new kt(t)})}load(e,t,n,i){let r=this,o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){let l=ae.extractUrlBase(e);o=ae.resolveURL(l,this.path)}else o=ae.extractUrlBase(e);this.manager.itemStart(e);let s=function(l){i?i(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},a=new Yn(this.manager);a.setPath(this.path),a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(l){try{r.parse(l,o,function(u){t(u),r.manager.itemEnd(e)},s)}catch(u){s(u)}},n,s)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r,o={},s={},a=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(a.decode(new Uint8Array(e,0,4))===ii){try{o[y.KHR_BINARY_GLTF]=new Wt(e)}catch(d){i&&i(d);return}r=JSON.parse(o[y.KHR_BINARY_GLTF].content)}else r=JSON.parse(a.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new Yt(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){let d=this.pluginCallbacks[u](l);d.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),s[d.name]=d,o[d.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){let d=r.extensionsUsed[u],f=r.extensionsRequired||[];switch(d){case y.KHR_MATERIALS_UNLIT:o[d]=new wt;break;case y.KHR_DRACO_MESH_COMPRESSION:o[d]=new jt(r,this.dracoLoader);break;case y.KHR_TEXTURE_TRANSFORM:o[d]=new zt;break;case y.KHR_MESH_QUANTIZATION:o[d]=new Gt;break;default:f.indexOf(d)>=0&&s[d]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+d+'".')}}l.setExtensions(o),l.setPlugins(s),l.parse(n,i)}parseAsync(e,t){let n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}};function Gr(){let c={};return{get:function(e){return c[e]},add:function(e,t){c[e]=t},remove:function(e){delete c[e]},removeAll:function(){c={}}}}var y={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},yt=class{constructor(e){this.parser=e,this.name=y.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,i=t.cache.get(n);if(i)return i;let r=t.json,a=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],l,u=new z(16777215);a.color!==void 0&&u.setRGB(a.color[0],a.color[1],a.color[2],U);let d=a.range!==void 0?a.range:0;switch(a.type){case"directional":l=new cr(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new Hr(u),l.distance=d;break;case"spot":l=new Fr(u),l.distance=d,a.spot=a.spot||{},a.spot.innerConeAngle=a.spot.innerConeAngle!==void 0?a.spot.innerConeAngle:0,a.spot.outerConeAngle=a.spot.outerConeAngle!==void 0?a.spot.outerConeAngle:Math.PI/4,l.angle=a.spot.outerConeAngle,l.penumbra=1-a.spot.innerConeAngle/a.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+a.type)}return l.position.set(0,0,0),l.decay=2,F(l,a),a.intensity!==void 0&&(l.intensity=a.intensity),l.name=t.createUniqueName(a.name||"light_"+e),i=Promise.resolve(l),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],s=(r.extensions&&r.extensions[this.name]||{}).light;return s===void 0?null:this._loadLight(s).then(function(a){return n._getNodeRef(t.cache,s,a)})}},wt=class{constructor(){this.name=y.KHR_MATERIALS_UNLIT}getMaterialType(){return se}extendParams(e,t,n){let i=[];e.color=new z(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],U),e.opacity=o[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,le))}return Promise.all(i)}},St=class{constructor(e){this.parser=e,this.name=y.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=i.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}},Lt=class{constructor(e){this.parser=e,this.name=y.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:C}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){let s=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ni(s,s)}return Promise.all(r)}},bt=class{constructor(e){this.parser=e,this.name=y.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:C}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}},Pt=class{constructor(e){this.parser=e,this.name=y.KHR_MATERIALS_SHEEN}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:C}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[];t.sheenColor=new z(0,0,0),t.sheenRoughness=0,t.sheen=1;let o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){let s=o.sheenColorFactor;t.sheenColor.setRGB(s[0],s[1],s[2],U)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,le)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}},It=class{constructor(e){this.parser=e,this.name=y.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:C}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(r)}},Nt=class{constructor(e){this.parser=e,this.name=y.KHR_MATERIALS_VOLUME}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:C}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;let s=o.attenuationColor||[1,1,1];return t.attenuationColor=new z().setRGB(s[0],s[1],s[2],U),Promise.all(r)}},Ht=class{constructor(e){this.parser=e,this.name=y.KHR_MATERIALS_IOR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:C}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=i.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}},Ot=class{constructor(e){this.parser=e,this.name=y.KHR_MATERIALS_SPECULAR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:C}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));let s=o.specularColorFactor||[1,1,1];return t.specularColor=new z().setRGB(s[0],s[1],s[2],U),o.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,le)),Promise.all(r)}},Ut=class{constructor(e){this.parser=e,this.name=y.EXT_MATERIALS_BUMP}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:C}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(r)}},Ct=class{constructor(e){this.parser=e,this.name=y.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:C}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}},Dt=class{constructor(e){this.parser=e,this.name=y.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;let r=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}},Bt=class{constructor(e){this.parser=e,this.name=y.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],s=i.images[o.source],a=n.textureLoader;if(s.uri){let l=n.options.manager.getHandler(s.uri);l!==null&&(a=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,a);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},Vt=class{constructor(e){this.parser=e,this.name=y.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],s=i.images[o.source],a=n.textureLoader;if(s.uri){let l=n.options.manager.getHandler(s.uri);l!==null&&(a=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,a);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},Ft=class{constructor(e){this.name=y.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(s){let a=i.byteOffset||0,l=i.byteLength||0,u=i.count,d=i.byteStride,f=new Uint8Array(s,a,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,d,f,i.mode,i.filter).then(function(p){return p.buffer}):o.ready.then(function(){let p=new ArrayBuffer(u*d);return o.decodeGltfBuffer(new Uint8Array(p),u,d,f,i.mode,i.filter),p})})}else return null}},kt=class{constructor(e){this.name=y.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let i=t.meshes[n.mesh];for(let l of i.primitives)if(l.mode!==I.TRIANGLES&&l.mode!==I.TRIANGLE_STRIP&&l.mode!==I.TRIANGLE_FAN&&l.mode!==void 0)return null;let o=n.extensions[this.name].attributes,s=[],a={};for(let l in o)s.push(this.parser.getDependency("accessor",o[l]).then(u=>(a[l]=u,a[l])));return s.length<1?null:(s.push(this.parser.createNodeMesh(e)),Promise.all(s).then(l=>{let u=l.pop(),d=u.isGroup?u.children:[u],f=l[0].count,p=[];for(let g of d){let m=new Me,_=new $,v=new ti,T=new $(1,1,1),x=new pr(g.geometry,g.material,f);for(let E=0;E<f;E++)a.TRANSLATION&&_.fromBufferAttribute(a.TRANSLATION,E),a.ROTATION&&v.fromBufferAttribute(a.ROTATION,E),a.SCALE&&T.fromBufferAttribute(a.SCALE,E),x.setMatrixAt(E,m.compose(_,v,T));for(let E in a)if(E==="_COLOR_0"){let R=a[E];x.instanceColor=new zr(R.array,R.itemSize,R.normalized)}else E!=="TRANSLATION"&&E!=="ROTATION"&&E!=="SCALE"&&g.geometry.setAttribute(E,a[E]);ei.prototype.copy.call(x,g),this.parser.assignFinalMaterial(x),p.push(x)}return u.isGroup?(u.clear(),u.add(...p),u):p[0]}))}},ii="glTF",oe=12,Gn={JSON:1313821514,BIN:5130562},Wt=class{constructor(e){this.name=y.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,oe),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==ii)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let i=this.header.length-oe,r=new DataView(e,oe),o=0;for(;o<i;){let s=r.getUint32(o,!0);o+=4;let a=r.getUint32(o,!0);if(o+=4,a===Gn.JSON){let l=new Uint8Array(e,oe+o,s);this.content=n.decode(l)}else if(a===Gn.BIN){let l=oe+o;this.body=e.slice(l,l+s)}o+=s}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},jt=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=y.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,s={},a={},l={};for(let u in o){let d=qt[u]||u.toLowerCase();s[d]=o[u]}for(let u in e.attributes){let d=qt[u]||u.toLowerCase();if(o[u]!==void 0){let f=n.accessors[e.attributes[u]],p=K[f.componentType];l[d]=p.name,a[d]=f.normalized===!0}}return t.getDependency("bufferView",r).then(function(u){return new Promise(function(d,f){i.decodeDracoFile(u,function(p){for(let g in p.attributes){let m=p.attributes[g],_=a[g];_!==void 0&&(m.normalized=_)}d(p)},s,l,U,f)})})}},zt=class{constructor(){this.name=y.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},Gt=class{constructor(){this.name=y.KHR_MESH_QUANTIZATION}},Ae=class extends _r{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,s=this.valueSize,a=s*2,l=s*3,u=i-t,d=(n-t)/u,f=d*d,p=f*d,g=e*l,m=g-l,_=-2*p+3*f,v=p-f,T=1-_,x=v-f+d;for(let E=0;E!==s;E++){let R=o[m+E+s],A=o[m+E+a]*u,M=o[g+E+s],b=o[g+E]*u;r[E]=T*R+x*A+_*M+v*b}return r}},Xr=new ti,Xt=class extends Ae{interpolate_(e,t,n,i){let r=super.interpolate_(e,t,n,i);return Xr.fromArray(r).normalize().toArray(r),r}},I={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},K={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Xn={9728:Lr,9729:Kn,9984:Pr,9985:Mr,9986:br,9987:Zn},qn={33071:ur,33648:Sr,10497:Mt},Tt={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},qt={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},V={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},qr={CUBICSPLINE:void 0,LINEAR:$n,STEP:vr},Rt={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Qr(c){return c.DefaultMaterial===void 0&&(c.DefaultMaterial=new Jn({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:hr})),c.DefaultMaterial}function j(c,e,t){for(let n in t.extensions)c[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function F(c,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(c.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function Yr(c,e,t){let n=!1,i=!1,r=!1;for(let l=0,u=e.length;l<u;l++){let d=e[l];if(d.POSITION!==void 0&&(n=!0),d.NORMAL!==void 0&&(i=!0),d.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(c);let o=[],s=[],a=[];for(let l=0,u=e.length;l<u;l++){let d=e[l];if(n){let f=d.POSITION!==void 0?t.getDependency("accessor",d.POSITION):c.attributes.position;o.push(f)}if(i){let f=d.NORMAL!==void 0?t.getDependency("accessor",d.NORMAL):c.attributes.normal;s.push(f)}if(r){let f=d.COLOR_0!==void 0?t.getDependency("accessor",d.COLOR_0):c.attributes.color;a.push(f)}}return Promise.all([Promise.all(o),Promise.all(s),Promise.all(a)]).then(function(l){let u=l[0],d=l[1],f=l[2];return n&&(c.morphAttributes.position=u),i&&(c.morphAttributes.normal=d),r&&(c.morphAttributes.color=f),c.morphTargetsRelative=!0,c})}function $r(c,e){if(c.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)c.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(c.morphTargetInfluences.length===t.length){c.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)c.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Kr(c){let e,t=c.extensions&&c.extensions[y.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+xt(t.attributes):e=c.indices+":"+xt(c.attributes)+":"+c.mode,c.targets!==void 0)for(let n=0,i=c.targets.length;n<i;n++)e+=":"+xt(c.targets[n]);return e}function xt(c){let e="",t=Object.keys(c).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+c[t[n]]+";";return e}function Qt(c){switch(c){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Zr(c){return c.search(/\.jpe?g($|\?)/i)>0||c.search(/^data\:image\/jpeg/)===0?"image/jpeg":c.search(/\.webp($|\?)/i)>0||c.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}var Jr=new Me,Yt=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Gr,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=!1,r=-1;typeof navigator<"u"&&(n=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,i=navigator.userAgent.indexOf("Firefox")>-1,r=i?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap>"u"||n||i&&r<98?this.textureLoader=new kr(this.options.manager):this.textureLoader=new fr(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Yn(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){let s={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return j(r,s,i),F(s,i),Promise.all(n._invokeAll(function(a){return a.afterRoot&&a.afterRoot(s)})).then(function(){e(s)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){let o=t[i].joints;for(let s=0,a=o.length;s<a;s++)e[o[s]].isBone=!0}for(let i=0,r=e.length;i<r;i++){let o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let i=n.clone(),r=(o,s)=>{let a=this.associations.get(o);a!=null&&this.associations.set(s,a);for(let[l,u]of o.children.entries())r(u,s.children[l])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let i=e(t[n]);if(i)return i}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let i=0;i<t.length;i++){let r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[y.KHR_BINARY_GLTF].body);let i=this.options;return new Promise(function(r,o){n.load(ae.resolveURL(t.uri,i.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){let t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){let o=Tt[i.type],s=K[i.componentType],a=i.normalized===!0,l=new s(i.count*o);return Promise.resolve(new _t(l,o,a))}let r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(o){let s=o[0],a=Tt[i.type],l=K[i.componentType],u=l.BYTES_PER_ELEMENT,d=u*a,f=i.byteOffset||0,p=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0,m,_;if(p&&p!==d){let v=Math.floor(f/p),T="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+v+":"+i.count,x=t.cache.get(T);x||(m=new l(s,v*p,i.count*p/u),x=new mr(m,p/u),t.cache.add(T,x)),_=new gr(x,a,f%p/u,g)}else s===null?m=new l(i.count*a):m=new l(s,f,i.count*a),_=new _t(m,a,g);if(i.sparse!==void 0){let v=Tt.SCALAR,T=K[i.sparse.indices.componentType],x=i.sparse.indices.byteOffset||0,E=i.sparse.values.byteOffset||0,R=new T(o[1],x,i.sparse.count*v),A=new l(o[2],E,i.sparse.count*a);s!==null&&(_=new _t(_.array.slice(),_.itemSize,_.normalized));for(let M=0,b=R.length;M<b;M++){let w=R[M];if(_.setX(w,A[M*a]),a>=2&&_.setY(w,A[M*a+1]),a>=3&&_.setZ(w,A[M*a+2]),a>=4&&_.setW(w,A[M*a+3]),a>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return _})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r],s=this.textureLoader;if(o.uri){let a=n.manager.getHandler(o.uri);a!==null&&(s=a)}return this.loadTextureImage(e,r,s)}loadTextureImage(e,t,n){let i=this,r=this.json,o=r.textures[e],s=r.images[t],a=(s.uri||s.bufferView)+":"+o.sampler;if(this.textureCache[a])return this.textureCache[a];let l=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=o.name||s.name||"",u.name===""&&typeof s.uri=="string"&&s.uri.startsWith("data:image/")===!1&&(u.name=s.uri);let f=(r.samplers||{})[o.sampler]||{};return u.magFilter=Xn[f.magFilter]||Kn,u.minFilter=Xn[f.minFilter]||Zn,u.wrapS=qn[f.wrapS]||Mt,u.wrapT=qn[f.wrapT]||Mt,i.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[a]=l,l}loadImageSource(e,t){let n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(d=>d.clone());let o=i.images[e],s=self.URL||self.webkitURL,a=o.uri||"",l=!1;if(o.bufferView!==void 0)a=n.getDependency("bufferView",o.bufferView).then(function(d){l=!0;let f=new Blob([d],{type:o.mimeType});return a=s.createObjectURL(f),a});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let u=Promise.resolve(a).then(function(d){return new Promise(function(f,p){let g=f;t.isImageBitmapLoader===!0&&(g=function(m){let _=new jn(m);_.needsUpdate=!0,f(_)}),t.load(ae.resolveURL(d,r.path),g,void 0,p)})}).then(function(d){return l===!0&&s.revokeObjectURL(a),d.userData.mimeType=o.mimeType||Zr(o.uri),d}).catch(function(d){throw console.error("THREE.GLTFLoader: Couldn't load texture",a),d});return this.sourceCache[e]=u,u}assignTexture(e,t,n,i){let r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[y.KHR_TEXTURE_TRANSFORM]){let s=n.extensions!==void 0?n.extensions[y.KHR_TEXTURE_TRANSFORM]:void 0;if(s){let a=r.associations.get(o);o=r.extensions[y.KHR_TEXTURE_TRANSFORM].extendTexture(o,s),r.associations.set(o,a)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){let t=e.geometry,n=e.material,i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){let s="PointsMaterial:"+n.uuid,a=this.cache.get(s);a||(a=new Ur,Et.prototype.copy.call(a,n),a.color.copy(n.color),a.map=n.map,a.sizeAttenuation=!1,this.cache.add(s,a)),n=a}else if(e.isLine){let s="LineBasicMaterial:"+n.uuid,a=this.cache.get(s);a||(a=new Tr,Et.prototype.copy.call(a,n),a.color.copy(n.color),a.map=n.map,this.cache.add(s,a)),n=a}if(i||r||o){let s="ClonedMaterial:"+n.uuid+":";i&&(s+="derivative-tangents:"),r&&(s+="vertex-colors:"),o&&(s+="flat-shading:");let a=this.cache.get(s);a||(a=n.clone(),r&&(a.vertexColors=!0),o&&(a.flatShading=!0),i&&(a.normalScale&&(a.normalScale.y*=-1),a.clearcoatNormalScale&&(a.clearcoatNormalScale.y*=-1)),this.cache.add(s,a),this.associations.set(a,this.associations.get(n))),n=a}e.material=n}getMaterialType(){return Jn}loadMaterial(e){let t=this,n=this.json,i=this.extensions,r=n.materials[e],o,s={},a=r.extensions||{},l=[];if(a[y.KHR_MATERIALS_UNLIT]){let d=i[y.KHR_MATERIALS_UNLIT];o=d.getMaterialType(),l.push(d.extendParams(s,r,t))}else{let d=r.pbrMetallicRoughness||{};if(s.color=new z(1,1,1),s.opacity=1,Array.isArray(d.baseColorFactor)){let f=d.baseColorFactor;s.color.setRGB(f[0],f[1],f[2],U),s.opacity=f[3]}d.baseColorTexture!==void 0&&l.push(t.assignTexture(s,"map",d.baseColorTexture,le)),s.metalness=d.metallicFactor!==void 0?d.metallicFactor:1,s.roughness=d.roughnessFactor!==void 0?d.roughnessFactor:1,d.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(s,"metalnessMap",d.metallicRoughnessTexture)),l.push(t.assignTexture(s,"roughnessMap",d.metallicRoughnessTexture))),o=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,s)})))}r.doubleSided===!0&&(s.side=dr);let u=r.alphaMode||Rt.OPAQUE;if(u===Rt.BLEND?(s.transparent=!0,s.depthWrite=!1):(s.transparent=!1,u===Rt.MASK&&(s.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==se&&(l.push(t.assignTexture(s,"normalMap",r.normalTexture)),s.normalScale=new ni(1,1),r.normalTexture.scale!==void 0)){let d=r.normalTexture.scale;s.normalScale.set(d,d)}if(r.occlusionTexture!==void 0&&o!==se&&(l.push(t.assignTexture(s,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(s.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==se){let d=r.emissiveFactor;s.emissive=new z().setRGB(d[0],d[1],d[2],U)}return r.emissiveTexture!==void 0&&o!==se&&l.push(t.assignTexture(s,"emissiveMap",r.emissiveTexture,le)),Promise.all(l).then(function(){let d=new o(s);return r.name&&(d.name=r.name),F(d,r),t.associations.set(d,{materials:e}),r.extensions&&j(i,d,r),d})}createUniqueName(e){let t=Cr.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,i=this.primitiveCache;function r(s){return n[y.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(s,t).then(function(a){return Qn(a,s,t)})}let o=[];for(let s=0,a=e.length;s<a;s++){let l=e[s],u=Kr(l),d=i[u];if(d)o.push(d.promise);else{let f;l.extensions&&l.extensions[y.KHR_DRACO_MESH_COMPRESSION]?f=r(l):f=Qn(new lr,l,t),i[u]={primitive:l,promise:f},o.push(f)}}return Promise.all(o)}loadMesh(e){let t=this,n=this.json,i=this.extensions,r=n.meshes[e],o=r.primitives,s=[];for(let a=0,l=o.length;a<l;a++){let u=o[a].material===void 0?Qr(this.cache):this.getDependency("material",o[a].material);s.push(u)}return s.push(t.loadGeometries(o)),Promise.all(s).then(function(a){let l=a.slice(0,a.length-1),u=a[a.length-1],d=[];for(let p=0,g=u.length;p<g;p++){let m=u[p],_=o[p],v,T=l[p];if(_.mode===I.TRIANGLES||_.mode===I.TRIANGLE_STRIP||_.mode===I.TRIANGLE_FAN||_.mode===void 0)v=r.isSkinnedMesh===!0?new Br(m,T):new wr(m,T),v.isSkinnedMesh===!0&&v.normalizeSkinWeights(),_.mode===I.TRIANGLE_STRIP?v.geometry=gt(v.geometry,jr):_.mode===I.TRIANGLE_FAN&&(v.geometry=gt(v.geometry,Wr));else if(_.mode===I.LINES)v=new xr(m,T);else if(_.mode===I.LINE_STRIP)v=new Er(m,T);else if(_.mode===I.LINE_LOOP)v=new Rr(m,T);else if(_.mode===I.POINTS)v=new Or(m,T);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+_.mode);Object.keys(v.geometry.morphAttributes).length>0&&$r(v,r),v.name=t.createUniqueName(r.name||"mesh_"+e),F(v,r),_.extensions&&j(i,v,_),t.assignFinalMaterial(v),d.push(v)}for(let p=0,g=d.length;p<g;p++)t.associations.set(d[p],{meshes:e,primitives:p});if(d.length===1)return r.extensions&&j(i,d[0],r),d[0];let f=new vt;r.extensions&&j(i,f,r),t.associations.set(f,{meshes:e});for(let p=0,g=d.length;p<g;p++)f.add(d[p]);return f})}loadCamera(e){let t,n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Nr(yr.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Ir(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),F(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){let r=i.pop(),o=i,s=[],a=[];for(let l=0,u=o.length;l<u;l++){let d=o[l];if(d){s.push(d);let f=new Me;r!==null&&f.fromArray(r.array,l*16),a.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new Dr(s,a)})}loadAnimation(e){let t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,o=[],s=[],a=[],l=[],u=[];for(let d=0,f=i.channels.length;d<f;d++){let p=i.channels[d],g=i.samplers[p.sampler],m=p.target,_=m.node,v=i.parameters!==void 0?i.parameters[g.input]:g.input,T=i.parameters!==void 0?i.parameters[g.output]:g.output;m.node!==void 0&&(o.push(this.getDependency("node",_)),s.push(this.getDependency("accessor",v)),a.push(this.getDependency("accessor",T)),l.push(g),u.push(m))}return Promise.all([Promise.all(o),Promise.all(s),Promise.all(a),Promise.all(l),Promise.all(u)]).then(function(d){let f=d[0],p=d[1],g=d[2],m=d[3],_=d[4],v=[];for(let T=0,x=f.length;T<x;T++){let E=f[T],R=p[T],A=g[T],M=m[T],b=_[T];if(E===void 0)continue;E.updateMatrix&&E.updateMatrix();let w=n._createAnimationTracks(E,R,A,M,b);if(w)for(let L=0;L<w.length;L++)v.push(w[L])}return new or(r,void 0,v)})}createNodeMesh(e){let t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){let o=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&o.traverse(function(s){if(s.isMesh)for(let a=0,l=i.weights.length;a<l;a++)s.morphTargetInfluences[a]=i.weights[a]}),o})}loadNode(e){let t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),o=[],s=i.children||[];for(let l=0,u=s.length;l<u;l++)o.push(n.getDependency("node",s[l]));let a=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(o),a]).then(function(l){let u=l[0],d=l[1],f=l[2];f!==null&&u.traverse(function(p){p.isSkinnedMesh&&p.bind(f,Jr)});for(let p=0,g=d.length;p<g;p++)u.add(d[p]);return u})}_loadNodeShallow(e){let t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],o=r.name?i.createUniqueName(r.name):"",s=[],a=i._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return a&&s.push(a),r.camera!==void 0&&s.push(i.getDependency("camera",r.camera).then(function(l){return i._getNodeRef(i.cameraCache,r.camera,l)})),i._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){s.push(l)}),this.nodeCache[e]=Promise.all(s).then(function(l){let u;if(r.isBone===!0?u=new sr:l.length>1?u=new vt:l.length===1?u=l[0]:u=new ei,u!==l[0])for(let d=0,f=l.length;d<f;d++)u.add(l[d]);if(r.name&&(u.userData.name=r.name,u.name=o),F(u,r),r.extensions&&j(n,u,r),r.matrix!==void 0){let d=new Me;d.fromArray(r.matrix),u.applyMatrix4(d)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);return i.associations.has(u)||i.associations.set(u,{}),i.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],i=this,r=new vt;n.name&&(r.name=i.createUniqueName(n.name)),F(r,n),n.extensions&&j(t,r,n);let o=n.nodes||[],s=[];for(let a=0,l=o.length;a<l;a++)s.push(i.getDependency("node",o[a]));return Promise.all(s).then(function(a){for(let u=0,d=a.length;u<d;u++)r.add(a[u]);let l=u=>{let d=new Map;for(let[f,p]of i.associations)(f instanceof Et||f instanceof jn)&&d.set(f,p);return u.traverse(f=>{let p=i.associations.get(f);p!=null&&d.set(f,p)}),d};return i.associations=l(r),r})}_createAnimationTracks(e,t,n,i,r){let o=[],s=e.name?e.name:e.uuid,a=[];V[r.path]===V.weights?e.traverse(function(f){f.morphTargetInfluences&&a.push(f.name?f.name:f.uuid)}):a.push(s);let l;switch(V[r.path]){case V.weights:l=kn;break;case V.rotation:l=Wn;break;case V.position:case V.scale:l=zn;break;default:switch(n.itemSize){case 1:l=kn;break;case 2:case 3:default:l=zn;break}break}let u=i.interpolation!==void 0?qr[i.interpolation]:$n,d=this._getArrayFromAccessor(n);for(let f=0,p=a.length;f<p;f++){let g=new l(a[f]+"."+V[r.path],t.array,d,u);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=Qt(t.constructor),i=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let i=this instanceof Wn?Xt:Ae;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function eo(c,e,t){let n=e.attributes,i=new ar;if(n.POSITION!==void 0){let s=t.json.accessors[n.POSITION],a=s.min,l=s.max;if(a!==void 0&&l!==void 0){if(i.set(new $(a[0],a[1],a[2]),new $(l[0],l[1],l[2])),s.normalized){let u=Qt(K[s.componentType]);i.min.multiplyScalar(u),i.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let s=new $,a=new $;for(let l=0,u=r.length;l<u;l++){let d=r[l];if(d.POSITION!==void 0){let f=t.json.accessors[d.POSITION],p=f.min,g=f.max;if(p!==void 0&&g!==void 0){if(a.setX(Math.max(Math.abs(p[0]),Math.abs(g[0]))),a.setY(Math.max(Math.abs(p[1]),Math.abs(g[1]))),a.setZ(Math.max(Math.abs(p[2]),Math.abs(g[2]))),f.normalized){let m=Qt(K[f.componentType]);a.multiplyScalar(m)}s.max(a)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(s)}c.boundingBox=i;let o=new Vr;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,c.boundingSphere=o}function Qn(c,e,t){let n=e.attributes,i=[];function r(o,s){return t.getDependency("accessor",o).then(function(a){c.setAttribute(s,a)})}for(let o in n){let s=qt[o]||o.toLowerCase();s in c.attributes||i.push(r(n[o],s))}if(e.indices!==void 0&&!c.index){let o=t.getDependency("accessor",e.indices).then(function(s){c.setIndex(s)});i.push(o)}return Fn.workingColorSpace!==U&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Fn.workingColorSpace}" not supported.`),F(c,e),eo(c,e,t),Promise.all(i).then(function(){return e.targets!==void 0?Yr(c,e.targets,t):c})}import*as h from"../three/three.module.min.js";import{BufferAttribute as $t}from"../three/three.module.min.js";var Pe=class extends h.Object3D{get overrideBlinkAmount(){return this.overrideBlink==="block"?0<this.weight?1:0:this.overrideBlink==="blend"?this.weight:0}get overrideLookAtAmount(){return this.overrideLookAt==="block"?0<this.weight?1:0:this.overrideLookAt==="blend"?this.weight:0}get overrideMouthAmount(){return this.overrideMouth==="block"?0<this.weight?1:0:this.overrideMouth==="blend"?this.weight:0}constructor(e){super(),this.weight=0,this.isBinary=!1,this.overrideBlink="none",this.overrideLookAt="none",this.overrideMouth="none",this._binds=[],this.name=`VRMExpression_${e}`,this.expressionName=e,this.type="VRMExpression",this.visible=!1}addBind(e){this._binds.push(e)}applyWeight(e){var t;let n=this.isBinary?this.weight<=.5?0:1:this.weight;n*=(t=e?.multiplier)!==null&&t!==void 0?t:1,this._binds.forEach(i=>i.applyWeight(n))}clearAppliedWeight(){this._binds.forEach(e=>e.clearAppliedWeight())}};function S(c,e,t,n){function i(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function s(u){try{l(n.next(u))}catch(d){o(d)}}function a(u){try{l(n.throw(u))}catch(d){o(d)}}function l(u){u.done?r(u.value):i(u.value).then(s,a)}l((n=n.apply(c,e||[])).next())})}function xi(c,e,t){var n,i;let r=c.parser.json,o=(n=r.nodes)===null||n===void 0?void 0:n[e];if(o==null)return console.warn(`extractPrimitivesInternal: Attempt to use nodes[${e}] of glTF but the node doesn't exist`),null;let s=o.mesh;if(s==null)return null;let a=(i=r.meshes)===null||i===void 0?void 0:i[s];if(a==null)return console.warn(`extractPrimitivesInternal: Attempt to use meshes[${s}] of glTF but the mesh doesn't exist`),null;let l=a.primitives.length,u=[];return t.traverse(d=>{u.length<l&&d.isMesh&&u.push(d)}),u}function ri(c,e){return S(this,void 0,void 0,function*(){let t=yield c.parser.getDependency("node",e);return xi(c,e,t)})}function oi(c){return S(this,void 0,void 0,function*(){let e=yield c.parser.getDependencies("node"),t=new Map;return e.forEach((n,i)=>{let r=xi(c,i,n);r!=null&&t.set(i,r)}),t})}function si(c,e){var t,n;let i=parseInt(h.REVISION,10),r=null;if(i>=133)r=(n=(t=c.associations.get(e))===null||t===void 0?void 0:t.materials)!==null&&n!==void 0?n:null;else{let s=c.associations.get(e);s?.type==="materials"&&(r=s.index)}return r}var on={Aa:"aa",Ih:"ih",Ou:"ou",Ee:"ee",Oh:"oh",Blink:"blink",Happy:"happy",Angry:"angry",Sad:"sad",Relaxed:"relaxed",LookUp:"lookUp",Surprised:"surprised",LookDown:"lookDown",LookLeft:"lookLeft",LookRight:"lookRight",BlinkLeft:"blinkLeft",BlinkRight:"blinkRight",Neutral:"neutral"};function Mi(c){return Math.max(Math.min(c,1),0)}var Ie=class c{get expressions(){return this._expressions.concat()}get expressionMap(){return Object.assign({},this._expressionMap)}get presetExpressionMap(){let e={},t=new Set(Object.values(on));return Object.entries(this._expressionMap).forEach(([n,i])=>{t.has(n)&&(e[n]=i)}),e}get customExpressionMap(){let e={},t=new Set(Object.values(on));return Object.entries(this._expressionMap).forEach(([n,i])=>{t.has(n)||(e[n]=i)}),e}constructor(){this.blinkExpressionNames=["blink","blinkLeft","blinkRight"],this.lookAtExpressionNames=["lookLeft","lookRight","lookUp","lookDown"],this.mouthExpressionNames=["aa","ee","ih","oh","ou"],this._expressions=[],this._expressionMap={}}copy(e){return this._expressions.concat().forEach(n=>{this.unregisterExpression(n)}),e._expressions.forEach(n=>{this.registerExpression(n)}),this.blinkExpressionNames=e.blinkExpressionNames.concat(),this.lookAtExpressionNames=e.lookAtExpressionNames.concat(),this.mouthExpressionNames=e.mouthExpressionNames.concat(),this}clone(){return new c().copy(this)}getExpression(e){var t;return(t=this._expressionMap[e])!==null&&t!==void 0?t:null}registerExpression(e){this._expressions.push(e),this._expressionMap[e.expressionName]=e}unregisterExpression(e){let t=this._expressions.indexOf(e);t===-1&&console.warn("VRMExpressionManager: The specified expressions is not registered"),this._expressions.splice(t,1),delete this._expressionMap[e.expressionName]}getValue(e){var t;let n=this.getExpression(e);return(t=n?.weight)!==null&&t!==void 0?t:null}setValue(e,t){let n=this.getExpression(e);n&&(n.weight=Mi(t))}getExpressionTrackName(e){let t=this.getExpression(e);return t?`${t.name}.weight`:null}update(){let e=this._calculateWeightMultipliers();this._expressions.forEach(t=>{t.clearAppliedWeight()}),this._expressions.forEach(t=>{let n=1,i=t.expressionName;this.blinkExpressionNames.indexOf(i)!==-1&&(n*=e.blink),this.lookAtExpressionNames.indexOf(i)!==-1&&(n*=e.lookAt),this.mouthExpressionNames.indexOf(i)!==-1&&(n*=e.mouth),t.applyWeight({multiplier:n})})}_calculateWeightMultipliers(){let e=1,t=1,n=1;return this._expressions.forEach(i=>{e-=i.overrideBlinkAmount,t-=i.overrideLookAtAmount,n-=i.overrideMouthAmount}),e=Math.max(0,e),t=Math.max(0,t),n=Math.max(0,n),{blink:e,lookAt:t,mouth:n}}},ue={Color:"color",EmissionColor:"emissionColor",ShadeColor:"shadeColor",MatcapColor:"matcapColor",RimColor:"rimColor",OutlineColor:"outlineColor"},to={_Color:ue.Color,_EmissionColor:ue.EmissionColor,_ShadeColor:ue.ShadeColor,_RimColor:ue.RimColor,_OutlineColor:ue.OutlineColor},no=new h.Color,me=class c{constructor({material:e,type:t,targetValue:n,targetAlpha:i}){this.material=e,this.type=t,this.targetValue=n,this.targetAlpha=i??1;let r=this._initColorBindState(),o=this._initAlphaBindState();this._state={color:r,alpha:o}}applyWeight(e){let{color:t,alpha:n}=this._state;if(t!=null){let{propertyName:i,deltaValue:r}=t,o=this.material[i];o?.add(no.copy(r).multiplyScalar(e))}if(n!=null){let{propertyName:i,deltaValue:r}=n;this.material[i]!=null&&(this.material[i]+=r*e)}}clearAppliedWeight(){let{color:e,alpha:t}=this._state;if(e!=null){let{propertyName:n,initialValue:i}=e,r=this.material[n];r?.copy(i)}if(t!=null){let{propertyName:n,initialValue:i}=t;this.material[n]!=null&&(this.material[n]=i)}}_initColorBindState(){var e,t,n;let{material:i,type:r,targetValue:o}=this,s=this._getPropertyNameMap(),a=(t=(e=s?.[r])===null||e===void 0?void 0:e[0])!==null&&t!==void 0?t:null;if(a==null)return console.warn(`Tried to add a material color bind to the material ${(n=i.name)!==null&&n!==void 0?n:"(no name)"}, the type ${r} but the material or the type is not supported.`),null;let u=i[a].clone(),d=new h.Color(o.r-u.r,o.g-u.g,o.b-u.b);return{propertyName:a,initialValue:u,deltaValue:d}}_initAlphaBindState(){var e,t,n;let{material:i,type:r,targetAlpha:o}=this,s=this._getPropertyNameMap(),a=(t=(e=s?.[r])===null||e===void 0?void 0:e[1])!==null&&t!==void 0?t:null;if(a==null&&o!==1)return console.warn(`Tried to add a material alpha bind to the material ${(n=i.name)!==null&&n!==void 0?n:"(no name)"}, the type ${r} but the material or the type does not support alpha.`),null;if(a==null)return null;let l=i[a],u=o-l;return{propertyName:a,initialValue:l,deltaValue:u}}_getPropertyNameMap(){var e,t;return(t=(e=Object.entries(c._propertyNameMapMap).find(([n])=>this.material[n]===!0))===null||e===void 0?void 0:e[1])!==null&&t!==void 0?t:null}};me._propertyNameMapMap={isMeshStandardMaterial:{color:["color","opacity"],emissionColor:["emissive",null]},isMeshBasicMaterial:{color:["color","opacity"]},isMToonMaterial:{color:["color","opacity"],emissionColor:["emissive",null],outlineColor:["outlineColorFactor",null],matcapColor:["matcapFactor",null],rimColor:["parametricRimColorFactor",null],shadeColor:["shadeColorFactor",null]}};var Ne=class{constructor({primitives:e,index:t,weight:n}){this.primitives=e,this.index=t,this.weight=n}applyWeight(e){this.primitives.forEach(t=>{var n;((n=t.morphTargetInfluences)===null||n===void 0?void 0:n[this.index])!=null&&(t.morphTargetInfluences[this.index]+=this.weight*e)})}clearAppliedWeight(){this.primitives.forEach(e=>{var t;((t=e.morphTargetInfluences)===null||t===void 0?void 0:t[this.index])!=null&&(e.morphTargetInfluences[this.index]=0)})}},ai=new h.Vector2,ge=class c{constructor({material:e,scale:t,offset:n}){var i,r;this.material=e,this.scale=t,this.offset=n;let o=(i=Object.entries(c._propertyNamesMap).find(([s])=>e[s]===!0))===null||i===void 0?void 0:i[1];o==null?(console.warn(`Tried to add a texture transform bind to the material ${(r=e.name)!==null&&r!==void 0?r:"(no name)"} but the material is not supported.`),this._properties=[]):(this._properties=[],o.forEach(s=>{var a;let l=(a=e[s])===null||a===void 0?void 0:a.clone();if(!l)return null;e[s]=l;let u=l.offset.clone(),d=l.repeat.clone(),f=n.clone().sub(u),p=t.clone().sub(d);this._properties.push({name:s,initialOffset:u,deltaOffset:f,initialScale:d,deltaScale:p})}))}applyWeight(e){this._properties.forEach(t=>{let n=this.material[t.name];n!==void 0&&(n.offset.add(ai.copy(t.deltaOffset).multiplyScalar(e)),n.repeat.add(ai.copy(t.deltaScale).multiplyScalar(e)))})}clearAppliedWeight(){this._properties.forEach(e=>{let t=this.material[e.name];t!==void 0&&(t.offset.copy(e.initialOffset),t.repeat.copy(e.initialScale))})}};ge._propertyNamesMap={isMeshStandardMaterial:["map","emissiveMap","bumpMap","normalMap","displacementMap","roughnessMap","metalnessMap","alphaMap"],isMeshBasicMaterial:["map","specularMap","alphaMap"],isMToonMaterial:["map","normalMap","emissiveMap","shadeMultiplyTexture","rimMultiplyTexture","outlineWidthMultiplyTexture","uvAnimationMaskTexture"]};var io=new Set(["1.0","1.0-beta"]),He=class c{get name(){return"VRMExpressionLoaderPlugin"}constructor(e){this.parser=e}afterRoot(e){return S(this,void 0,void 0,function*(){e.userData.vrmExpressionManager=yield this._import(e)})}_import(e){return S(this,void 0,void 0,function*(){let t=yield this._v1Import(e);if(t)return t;let n=yield this._v0Import(e);return n||null})}_v1Import(e){var t,n;return S(this,void 0,void 0,function*(){let i=this.parser.json;if(!(((t=i.extensionsUsed)===null||t===void 0?void 0:t.indexOf("VRMC_vrm"))!==-1))return null;let o=(n=i.extensions)===null||n===void 0?void 0:n.VRMC_vrm;if(!o)return null;let s=o.specVersion;if(!io.has(s))return console.warn(`VRMExpressionLoaderPlugin: Unknown VRMC_vrm specVersion "${s}"`),null;let a=o.expressions;if(!a)return null;let l=new Set(Object.values(on)),u=new Map;a.preset!=null&&Object.entries(a.preset).forEach(([f,p])=>{if(p!=null){if(!l.has(f)){console.warn(`VRMExpressionLoaderPlugin: Unknown preset name "${f}" detected. Ignoring the expression`);return}u.set(f,p)}}),a.custom!=null&&Object.entries(a.custom).forEach(([f,p])=>{if(l.has(f)){console.warn(`VRMExpressionLoaderPlugin: Custom expression cannot have preset name "${f}". Ignoring the expression`);return}u.set(f,p)});let d=new Ie;return yield Promise.all(Array.from(u.entries()).map(([f,p])=>S(this,void 0,void 0,function*(){var g,m,_,v,T,x,E;let R=new Pe(f);if(e.scene.add(R),R.isBinary=(g=p.isBinary)!==null&&g!==void 0?g:!1,R.overrideBlink=(m=p.overrideBlink)!==null&&m!==void 0?m:"none",R.overrideLookAt=(_=p.overrideLookAt)!==null&&_!==void 0?_:"none",R.overrideMouth=(v=p.overrideMouth)!==null&&v!==void 0?v:"none",(T=p.morphTargetBinds)===null||T===void 0||T.forEach(A=>S(this,void 0,void 0,function*(){var M;if(A.node===void 0||A.index===void 0)return;let b=yield ri(e,A.node),w=A.index;if(!b.every(L=>Array.isArray(L.morphTargetInfluences)&&w<L.morphTargetInfluences.length)){console.warn(`VRMExpressionLoaderPlugin: ${p.name} attempts to index morph #${w} but not found.`);return}R.addBind(new Ne({primitives:b,index:w,weight:(M=A.weight)!==null&&M!==void 0?M:1}))})),p.materialColorBinds||p.textureTransformBinds){let A=[];e.scene.traverse(M=>{let b=M.material;b&&A.push(b)}),(x=p.materialColorBinds)===null||x===void 0||x.forEach(M=>S(this,void 0,void 0,function*(){A.filter(w=>{let L=si(this.parser,w);return M.material===L}).forEach(w=>{R.addBind(new me({material:w,type:M.type,targetValue:new h.Color().fromArray(M.targetValue),targetAlpha:M.targetValue[3]}))})})),(E=p.textureTransformBinds)===null||E===void 0||E.forEach(M=>S(this,void 0,void 0,function*(){A.filter(w=>{let L=si(this.parser,w);return M.material===L}).forEach(w=>{var L,P;R.addBind(new ge({material:w,offset:new h.Vector2().fromArray((L=M.offset)!==null&&L!==void 0?L:[0,0]),scale:new h.Vector2().fromArray((P=M.scale)!==null&&P!==void 0?P:[1,1])}))})}))}d.registerExpression(R)}))),d})}_v0Import(e){var t;return S(this,void 0,void 0,function*(){let n=this.parser.json,i=(t=n.extensions)===null||t===void 0?void 0:t.VRM;if(!i)return null;let r=i.blendShapeMaster;if(!r)return null;let o=new Ie,s=r.blendShapeGroups;if(!s)return o;let a=new Set;return yield Promise.all(s.map(l=>S(this,void 0,void 0,function*(){var u;let d=l.presetName,f=d!=null&&c.v0v1PresetNameMap[d]||null,p=f??l.name;if(p==null){console.warn("VRMExpressionLoaderPlugin: One of custom expressions has no name. Ignoring the expression");return}if(a.has(p)){console.warn(`VRMExpressionLoaderPlugin: An expression preset ${d} has duplicated entries. Ignoring the expression`);return}a.add(p);let g=new Pe(p);e.scene.add(g),g.isBinary=(u=l.isBinary)!==null&&u!==void 0?u:!1,l.binds&&l.binds.forEach(_=>S(this,void 0,void 0,function*(){var v;if(_.mesh===void 0||_.index===void 0)return;let T=[];(v=n.nodes)===null||v===void 0||v.forEach((E,R)=>{E.mesh===_.mesh&&T.push(R)});let x=_.index;yield Promise.all(T.map(E=>S(this,void 0,void 0,function*(){var R;let A=yield ri(e,E);if(!A.every(M=>Array.isArray(M.morphTargetInfluences)&&x<M.morphTargetInfluences.length)){console.warn(`VRMExpressionLoaderPlugin: ${l.name} attempts to index ${x}th morph but not found.`);return}g.addBind(new Ne({primitives:A,index:x,weight:.01*((R=_.weight)!==null&&R!==void 0?R:100)}))})))}));let m=l.materialValues;m&&m.length!==0&&m.forEach(_=>{if(_.materialName===void 0||_.propertyName===void 0||_.targetValue===void 0)return;let v=[];e.scene.traverse(x=>{if(x.material){let E=x.material;Array.isArray(E)?v.push(...E.filter(R=>(R.name===_.materialName||R.name===_.materialName+" (Outline)")&&v.indexOf(R)===-1)):E.name===_.materialName&&v.indexOf(E)===-1&&v.push(E)}});let T=_.propertyName;v.forEach(x=>{if(T==="_MainTex_ST"){let R=new h.Vector2(_.targetValue[0],_.targetValue[1]),A=new h.Vector2(_.targetValue[2],_.targetValue[3]);A.y=1-A.y-R.y,g.addBind(new ge({material:x,scale:R,offset:A}));return}let E=to[T];if(E){g.addBind(new me({material:x,type:E,targetValue:new h.Color().fromArray(_.targetValue),targetAlpha:_.targetValue[3]}));return}console.warn(T+" is not supported")})}),o.registerExpression(g)}))),o})}};He.v0v1PresetNameMap={a:"aa",e:"ee",i:"ih",o:"oh",u:"ou",blink:"blink",joy:"happy",angry:"angry",sorrow:"sad",fun:"relaxed",lookup:"lookUp",lookdown:"lookDown",lookleft:"lookLeft",lookright:"lookRight",blink_l:"blinkLeft",blink_r:"blinkRight",neutral:"neutral"};var ie=class c{constructor(e,t){this._firstPersonOnlyLayer=c.DEFAULT_FIRSTPERSON_ONLY_LAYER,this._thirdPersonOnlyLayer=c.DEFAULT_THIRDPERSON_ONLY_LAYER,this._initializedLayers=!1,this.humanoid=e,this.meshAnnotations=t}copy(e){if(this.humanoid!==e.humanoid)throw new Error("VRMFirstPerson: humanoid must be same in order to copy");return this.meshAnnotations=e.meshAnnotations.map(t=>({meshes:t.meshes.concat(),type:t.type})),this}clone(){return new c(this.humanoid,this.meshAnnotations).copy(this)}get firstPersonOnlyLayer(){return this._firstPersonOnlyLayer}get thirdPersonOnlyLayer(){return this._thirdPersonOnlyLayer}setup({firstPersonOnlyLayer:e=c.DEFAULT_FIRSTPERSON_ONLY_LAYER,thirdPersonOnlyLayer:t=c.DEFAULT_THIRDPERSON_ONLY_LAYER}={}){this._initializedLayers||(this._firstPersonOnlyLayer=e,this._thirdPersonOnlyLayer=t,this.meshAnnotations.forEach(n=>{n.meshes.forEach(i=>{n.type==="firstPersonOnly"?(i.layers.set(this._firstPersonOnlyLayer),i.traverse(r=>r.layers.set(this._firstPersonOnlyLayer))):n.type==="thirdPersonOnly"?(i.layers.set(this._thirdPersonOnlyLayer),i.traverse(r=>r.layers.set(this._thirdPersonOnlyLayer))):n.type==="auto"&&this._createHeadlessModel(i)})}),this._initializedLayers=!0)}_excludeTriangles(e,t,n,i){let r=0;if(t!=null&&t.length>0)for(let o=0;o<e.length;o+=3){let s=e[o],a=e[o+1],l=e[o+2],u=t[s],d=n[s];if(u[0]>0&&i.includes(d[0])||u[1]>0&&i.includes(d[1])||u[2]>0&&i.includes(d[2])||u[3]>0&&i.includes(d[3]))continue;let f=t[a],p=n[a];if(f[0]>0&&i.includes(p[0])||f[1]>0&&i.includes(p[1])||f[2]>0&&i.includes(p[2])||f[3]>0&&i.includes(p[3]))continue;let g=t[l],m=n[l];g[0]>0&&i.includes(m[0])||g[1]>0&&i.includes(m[1])||g[2]>0&&i.includes(m[2])||g[3]>0&&i.includes(m[3])||(e[r++]=s,e[r++]=a,e[r++]=l)}return r}_createErasedMesh(e,t){let n=new h.SkinnedMesh(e.geometry.clone(),e.material);n.name=`${e.name}(erase)`,n.frustumCulled=e.frustumCulled,n.layers.set(this._firstPersonOnlyLayer);let i=n.geometry,r=i.getAttribute("skinIndex"),o=r instanceof h.GLBufferAttribute?[]:r.array,s=[];for(let m=0;m<o.length;m+=4)s.push([o[m],o[m+1],o[m+2],o[m+3]]);let a=i.getAttribute("skinWeight"),l=a instanceof h.GLBufferAttribute?[]:a.array,u=[];for(let m=0;m<l.length;m+=4)u.push([l[m],l[m+1],l[m+2],l[m+3]]);let d=i.getIndex();if(!d)throw new Error("The geometry doesn't have an index buffer");let f=Array.from(d.array),p=this._excludeTriangles(f,u,s,t),g=[];for(let m=0;m<p;m++)g[m]=f[m];return i.setIndex(g),e.onBeforeRender&&(n.onBeforeRender=e.onBeforeRender),n.bind(new h.Skeleton(e.skeleton.bones,e.skeleton.boneInverses),new h.Matrix4),n}_createHeadlessModelForSkinnedMesh(e,t){let n=[];if(t.skeleton.bones.forEach((r,o)=>{this._isEraseTarget(r)&&n.push(o)}),!n.length){t.layers.enable(this._thirdPersonOnlyLayer),t.layers.enable(this._firstPersonOnlyLayer);return}t.layers.set(this._thirdPersonOnlyLayer);let i=this._createErasedMesh(t,n);e.add(i)}_createHeadlessModel(e){if(e.type==="Group")if(e.layers.set(this._thirdPersonOnlyLayer),this._isEraseTarget(e))e.traverse(t=>t.layers.set(this._thirdPersonOnlyLayer));else{let t=new h.Group;t.name=`_headless_${e.name}`,t.layers.set(this._firstPersonOnlyLayer),e.parent.add(t),e.children.filter(n=>n.type==="SkinnedMesh").forEach(n=>{let i=n;this._createHeadlessModelForSkinnedMesh(t,i)})}else if(e.type==="SkinnedMesh"){let t=e;this._createHeadlessModelForSkinnedMesh(e.parent,t)}else this._isEraseTarget(e)&&(e.layers.set(this._thirdPersonOnlyLayer),e.traverse(t=>t.layers.set(this._thirdPersonOnlyLayer)))}_isEraseTarget(e){return e===this.humanoid.getRawBoneNode("head")?!0:e.parent?this._isEraseTarget(e.parent):!1}};ie.DEFAULT_FIRSTPERSON_ONLY_LAYER=9;ie.DEFAULT_THIRDPERSON_ONLY_LAYER=10;var ro=new Set(["1.0","1.0-beta"]),sn=class{get name(){return"VRMFirstPersonLoaderPlugin"}constructor(e){this.parser=e}afterRoot(e){return S(this,void 0,void 0,function*(){let t=e.userData.vrmHumanoid;if(t!==null){if(t===void 0)throw new Error("VRMFirstPersonLoaderPlugin: vrmHumanoid is undefined. VRMHumanoidLoaderPlugin have to be used first");e.userData.vrmFirstPerson=yield this._import(e,t)}})}_import(e,t){return S(this,void 0,void 0,function*(){if(t==null)return null;let n=yield this._v1Import(e,t);if(n)return n;let i=yield this._v0Import(e,t);return i||null})}_v1Import(e,t){var n,i;return S(this,void 0,void 0,function*(){let r=this.parser.json;if(!(((n=r.extensionsUsed)===null||n===void 0?void 0:n.indexOf("VRMC_vrm"))!==-1))return null;let s=(i=r.extensions)===null||i===void 0?void 0:i.VRMC_vrm;if(!s)return null;let a=s.specVersion;if(!ro.has(a))return console.warn(`VRMFirstPersonLoaderPlugin: Unknown VRMC_vrm specVersion "${a}"`),null;let l=s.firstPerson;if(!l)return null;let u=[],d=yield oi(e);return Array.from(d.entries()).forEach(([f,p])=>{var g;let m=l.meshAnnotations?l.meshAnnotations.find(_=>_.node===f):void 0;u.push({meshes:p,type:(g=m?.type)!==null&&g!==void 0?g:"both"})}),new ie(t,u)})}_v0Import(e,t){var n;return S(this,void 0,void 0,function*(){let i=this.parser.json,r=(n=i.extensions)===null||n===void 0?void 0:n.VRM;if(!r)return null;let o=r.firstPerson;if(!o)return null;let s=[],a=yield oi(e);return Array.from(a.entries()).forEach(([l,u])=>{let d=i.nodes[l],f=o.meshAnnotations?o.meshAnnotations.find(p=>p.mesh===d.mesh):void 0;s.push({meshes:u,type:this._convertV0FlagToV1Type(f?.firstPersonFlag)})}),new ie(t,s)})}_convertV0FlagToV1Type(e){return e==="FirstPersonOnly"?"firstPersonOnly":e==="ThirdPersonOnly"?"thirdPersonOnly":e==="Auto"?"auto":"both"}};var li=new h.Vector3,ui=new h.Vector3,oo=new h.Quaternion,Oe=class extends h.Group{constructor(e){super(),this.vrmHumanoid=e,this._boneAxesMap=new Map,Object.values(e.humanBones).forEach(t=>{let n=new h.AxesHelper(1);n.matrixAutoUpdate=!1,n.material.depthTest=!1,n.material.depthWrite=!1,this.add(n),this._boneAxesMap.set(t,n)})}dispose(){Array.from(this._boneAxesMap.values()).forEach(e=>{e.geometry.dispose(),e.material.dispose()})}updateMatrixWorld(e){Array.from(this._boneAxesMap.entries()).forEach(([t,n])=>{t.node.updateWorldMatrix(!0,!1),t.node.matrixWorld.decompose(li,oo,ui);let i=li.set(.1,.1,.1).divide(ui);n.matrix.copy(t.node.matrixWorld).scale(i)}),super.updateMatrixWorld(e)}},Kt=["hips","spine","chest","upperChest","neck","head","leftEye","rightEye","jaw","leftUpperLeg","leftLowerLeg","leftFoot","leftToes","rightUpperLeg","rightLowerLeg","rightFoot","rightToes","leftShoulder","leftUpperArm","leftLowerArm","leftHand","rightShoulder","rightUpperArm","rightLowerArm","rightHand","leftThumbMetacarpal","leftThumbProximal","leftThumbDistal","leftIndexProximal","leftIndexIntermediate","leftIndexDistal","leftMiddleProximal","leftMiddleIntermediate","leftMiddleDistal","leftRingProximal","leftRingIntermediate","leftRingDistal","leftLittleProximal","leftLittleIntermediate","leftLittleDistal","rightThumbMetacarpal","rightThumbProximal","rightThumbDistal","rightIndexProximal","rightIndexIntermediate","rightIndexDistal","rightMiddleProximal","rightMiddleIntermediate","rightMiddleDistal","rightRingProximal","rightRingIntermediate","rightRingDistal","rightLittleProximal","rightLittleIntermediate","rightLittleDistal"];var so={hips:null,spine:"hips",chest:"spine",upperChest:"chest",neck:"upperChest",head:"neck",leftEye:"head",rightEye:"head",jaw:"head",leftUpperLeg:"hips",leftLowerLeg:"leftUpperLeg",leftFoot:"leftLowerLeg",leftToes:"leftFoot",rightUpperLeg:"hips",rightLowerLeg:"rightUpperLeg",rightFoot:"rightLowerLeg",rightToes:"rightFoot",leftShoulder:"upperChest",leftUpperArm:"leftShoulder",leftLowerArm:"leftUpperArm",leftHand:"leftLowerArm",rightShoulder:"upperChest",rightUpperArm:"rightShoulder",rightLowerArm:"rightUpperArm",rightHand:"rightLowerArm",leftThumbMetacarpal:"leftHand",leftThumbProximal:"leftThumbMetacarpal",leftThumbDistal:"leftThumbProximal",leftIndexProximal:"leftHand",leftIndexIntermediate:"leftIndexProximal",leftIndexDistal:"leftIndexIntermediate",leftMiddleProximal:"leftHand",leftMiddleIntermediate:"leftMiddleProximal",leftMiddleDistal:"leftMiddleIntermediate",leftRingProximal:"leftHand",leftRingIntermediate:"leftRingProximal",leftRingDistal:"leftRingIntermediate",leftLittleProximal:"leftHand",leftLittleIntermediate:"leftLittleProximal",leftLittleDistal:"leftLittleIntermediate",rightThumbMetacarpal:"rightHand",rightThumbProximal:"rightThumbMetacarpal",rightThumbDistal:"rightThumbProximal",rightIndexProximal:"rightHand",rightIndexIntermediate:"rightIndexProximal",rightIndexDistal:"rightIndexIntermediate",rightMiddleProximal:"rightHand",rightMiddleIntermediate:"rightMiddleProximal",rightMiddleDistal:"rightMiddleIntermediate",rightRingProximal:"rightHand",rightRingIntermediate:"rightRingProximal",rightRingDistal:"rightRingIntermediate",rightLittleProximal:"rightHand",rightLittleIntermediate:"rightLittleProximal",rightLittleDistal:"rightLittleIntermediate"};function Ai(c){return c.invert?c.invert():c.inverse(),c}var G=new h.Vector3,X=new h.Quaternion,_e=class{constructor(e){this.humanBones=e,this.restPose=this.getAbsolutePose()}getAbsolutePose(){let e={};return Object.keys(this.humanBones).forEach(t=>{let n=t,i=this.getBoneNode(n);i&&(G.copy(i.position),X.copy(i.quaternion),e[n]={position:G.toArray(),rotation:X.toArray()})}),e}getPose(){let e={};return Object.keys(this.humanBones).forEach(t=>{let n=t,i=this.getBoneNode(n);if(!i)return;G.set(0,0,0),X.identity();let r=this.restPose[n];r?.position&&G.fromArray(r.position).negate(),r?.rotation&&Ai(X.fromArray(r.rotation)),G.add(i.position),X.premultiply(i.quaternion),e[n]={position:G.toArray(),rotation:X.toArray()}}),e}setPose(e){Object.entries(e).forEach(([t,n])=>{let i=t,r=this.getBoneNode(i);if(!r)return;let o=this.restPose[i];o&&(n?.position&&(r.position.fromArray(n.position),o.position&&r.position.add(G.fromArray(o.position))),n?.rotation&&(r.quaternion.fromArray(n.rotation),o.rotation&&r.quaternion.multiply(X.fromArray(o.rotation))))})}resetPose(){Object.entries(this.restPose).forEach(([e,t])=>{let n=this.getBoneNode(e);n&&(t?.position&&n.position.fromArray(t.position),t?.rotation&&n.quaternion.fromArray(t.rotation))})}getBone(e){var t;return(t=this.humanBones[e])!==null&&t!==void 0?t:void 0}getBoneNode(e){var t,n;return(n=(t=this.humanBones[e])===null||t===void 0?void 0:t.node)!==null&&n!==void 0?n:null}},Zt=new h.Vector3,ao=new h.Quaternion,lo=new h.Vector3,Ue=class c extends _e{static _setupTransforms(e){let t=new h.Object3D;t.name="VRMHumanoidRig";let n={},i={},r={};Kt.forEach(s=>{var a;let l=e.getBoneNode(s);if(l){let u=new h.Vector3,d=new h.Quaternion;l.updateWorldMatrix(!0,!1),l.matrixWorld.decompose(u,d,Zt),n[s]=u,i[s]=l.quaternion.clone();let f=new h.Quaternion;(a=l.parent)===null||a===void 0||a.matrixWorld.decompose(Zt,f,Zt),r[s]=f}});let o={};return Kt.forEach(s=>{var a;let l=e.getBoneNode(s);if(l){let u=n[s],d=s,f;for(;f==null&&(d=so[d],d!=null);)f=n[d];let p=new h.Object3D;p.name="Normalized_"+l.name,(d?(a=o[d])===null||a===void 0?void 0:a.node:t).add(p),p.position.copy(u),f&&p.position.sub(f),o[s]={node:p}}}),{rigBones:o,root:t,parentWorldRotations:r,boneRotations:i}}constructor(e){let{rigBones:t,root:n,parentWorldRotations:i,boneRotations:r}=c._setupTransforms(e);super(t),this.original=e,this.root=n,this._parentWorldRotations=i,this._boneRotations=r}update(){Kt.forEach(e=>{let t=this.original.getBoneNode(e);if(t!=null){let n=this.getBoneNode(e),i=this._parentWorldRotations[e],r=ao.copy(i).invert(),o=this._boneRotations[e];if(t.quaternion.copy(n.quaternion).multiply(i).premultiply(r).multiply(o),e==="hips"){let s=n.getWorldPosition(lo);t.parent.updateWorldMatrix(!0,!1);let a=t.parent.matrixWorld,l=s.applyMatrix4(a.invert());t.position.copy(l)}}})}},Ce=class c{get restPose(){return console.warn("VRMHumanoid: restPose is deprecated. Use either rawRestPose or normalizedRestPose instead."),this.rawRestPose}get rawRestPose(){return this._rawHumanBones.restPose}get normalizedRestPose(){return this._normalizedHumanBones.restPose}get humanBones(){return this._rawHumanBones.humanBones}get rawHumanBones(){return this._rawHumanBones.humanBones}get normalizedHumanBones(){return this._normalizedHumanBones.humanBones}get normalizedHumanBonesRoot(){return this._normalizedHumanBones.root}constructor(e,t){var n;this.autoUpdateHumanBones=(n=t?.autoUpdateHumanBones)!==null&&n!==void 0?n:!0,this._rawHumanBones=new _e(e),this._normalizedHumanBones=new Ue(this._rawHumanBones)}copy(e){return this.autoUpdateHumanBones=e.autoUpdateHumanBones,this._rawHumanBones=new _e(e.humanBones),this._normalizedHumanBones=new Ue(this._rawHumanBones),this}clone(){return new c(this.humanBones,{autoUpdateHumanBones:this.autoUpdateHumanBones}).copy(this)}getAbsolutePose(){return console.warn("VRMHumanoid: getAbsolutePose() is deprecated. Use either getRawAbsolutePose() or getNormalizedAbsolutePose() instead."),this.getRawAbsolutePose()}getRawAbsolutePose(){return this._rawHumanBones.getAbsolutePose()}getNormalizedAbsolutePose(){return this._normalizedHumanBones.getAbsolutePose()}getPose(){return console.warn("VRMHumanoid: getPose() is deprecated. Use either getRawPose() or getNormalizedPose() instead."),this.getRawPose()}getRawPose(){return this._rawHumanBones.getPose()}getNormalizedPose(){return this._normalizedHumanBones.getPose()}setPose(e){return console.warn("VRMHumanoid: setPose() is deprecated. Use either setRawPose() or setNormalizedPose() instead."),this.setRawPose(e)}setRawPose(e){return this._rawHumanBones.setPose(e)}setNormalizedPose(e){return this._normalizedHumanBones.setPose(e)}resetPose(){return console.warn("VRMHumanoid: resetPose() is deprecated. Use either resetRawPose() or resetNormalizedPose() instead."),this.resetRawPose()}resetRawPose(){return this._rawHumanBones.resetPose()}resetNormalizedPose(){return this._normalizedHumanBones.resetPose()}getBone(e){return console.warn("VRMHumanoid: getBone() is deprecated. Use either getRawBone() or getNormalizedBone() instead."),this.getRawBone(e)}getRawBone(e){return this._rawHumanBones.getBone(e)}getNormalizedBone(e){return this._normalizedHumanBones.getBone(e)}getBoneNode(e){return console.warn("VRMHumanoid: getBoneNode() is deprecated. Use either getRawBoneNode() or getNormalizedBoneNode() instead."),this.getRawBoneNode(e)}getRawBoneNode(e){return this._rawHumanBones.getBoneNode(e)}getNormalizedBoneNode(e){return this._normalizedHumanBones.getBoneNode(e)}update(){this.autoUpdateHumanBones&&this._normalizedHumanBones.update()}},uo={Hips:"hips",Spine:"spine",Head:"head",LeftUpperLeg:"leftUpperLeg",LeftLowerLeg:"leftLowerLeg",LeftFoot:"leftFoot",RightUpperLeg:"rightUpperLeg",RightLowerLeg:"rightLowerLeg",RightFoot:"rightFoot",LeftUpperArm:"leftUpperArm",LeftLowerArm:"leftLowerArm",LeftHand:"leftHand",RightUpperArm:"rightUpperArm",RightLowerArm:"rightLowerArm",RightHand:"rightHand"},co=new Set(["1.0","1.0-beta"]),ci={leftThumbProximal:"leftThumbMetacarpal",leftThumbIntermediate:"leftThumbProximal",rightThumbProximal:"rightThumbMetacarpal",rightThumbIntermediate:"rightThumbProximal"},an=class{get name(){return"VRMHumanoidLoaderPlugin"}constructor(e,t){this.parser=e,this.helperRoot=t?.helperRoot,this.autoUpdateHumanBones=t?.autoUpdateHumanBones}afterRoot(e){return S(this,void 0,void 0,function*(){e.userData.vrmHumanoid=yield this._import(e)})}_import(e){return S(this,void 0,void 0,function*(){let t=yield this._v1Import(e);if(t)return t;let n=yield this._v0Import(e);return n||null})}_v1Import(e){var t,n;return S(this,void 0,void 0,function*(){let i=this.parser.json;if(!(((t=i.extensionsUsed)===null||t===void 0?void 0:t.indexOf("VRMC_vrm"))!==-1))return null;let o=(n=i.extensions)===null||n===void 0?void 0:n.VRMC_vrm;if(!o)return null;let s=o.specVersion;if(!co.has(s))return console.warn(`VRMHumanoidLoaderPlugin: Unknown VRMC_vrm specVersion "${s}"`),null;let a=o.humanoid;if(!a)return null;let l=a.humanBones.leftThumbIntermediate!=null||a.humanBones.rightThumbIntermediate!=null,u={};a.humanBones!=null&&(yield Promise.all(Object.entries(a.humanBones).map(([f,p])=>S(this,void 0,void 0,function*(){let g=f,m=p.node;if(l){let v=ci[g];v!=null&&(g=v)}let _=yield this.parser.getDependency("node",m);if(_==null){console.warn(`A glTF node bound to the humanoid bone ${g} (index = ${m}) does not exist`);return}u[g]={node:_}}))));let d=new Ce(this._ensureRequiredBonesExist(u),{autoUpdateHumanBones:this.autoUpdateHumanBones});if(e.scene.add(d.normalizedHumanBonesRoot),this.helperRoot){let f=new Oe(d);this.helperRoot.add(f),f.renderOrder=this.helperRoot.renderOrder}return d})}_v0Import(e){var t;return S(this,void 0,void 0,function*(){let i=(t=this.parser.json.extensions)===null||t===void 0?void 0:t.VRM;if(!i)return null;let r=i.humanoid;if(!r)return null;let o={};r.humanBones!=null&&(yield Promise.all(r.humanBones.map(a=>S(this,void 0,void 0,function*(){let l=a.bone,u=a.node;if(l==null||u==null)return;let d=yield this.parser.getDependency("node",u);if(d==null){console.warn(`A glTF node bound to the humanoid bone ${l} (index = ${u}) does not exist`);return}let f=ci[l],p=f??l;if(o[p]!=null){console.warn(`Multiple bone entries for ${p} detected (index = ${u}), ignoring duplicated entries.`);return}o[p]={node:d}}))));let s=new Ce(this._ensureRequiredBonesExist(o),{autoUpdateHumanBones:this.autoUpdateHumanBones});if(e.scene.add(s.normalizedHumanBonesRoot),this.helperRoot){let a=new Oe(s);this.helperRoot.add(a),a.renderOrder=this.helperRoot.renderOrder}return s})}_ensureRequiredBonesExist(e){let t=Object.values(uo).filter(n=>e[n]==null);if(t.length>0)throw new Error(`VRMHumanoidLoaderPlugin: These humanoid bones are required but not exist: ${t.join(", ")}`);return e}},De=class extends h.BufferGeometry{constructor(){super(),this._currentTheta=0,this._currentRadius=0,this.theta=0,this.radius=0,this._currentTheta=0,this._currentRadius=0,this._attrPos=new h.BufferAttribute(new Float32Array(195),3),this.setAttribute("position",this._attrPos),this._attrIndex=new h.BufferAttribute(new Uint16Array(189),1),this.setIndex(this._attrIndex),this._buildIndex(),this.update()}update(){let e=!1;this._currentTheta!==this.theta&&(this._currentTheta=this.theta,e=!0),this._currentRadius!==this.radius&&(this._currentRadius=this.radius,e=!0),e&&this._buildPosition()}_buildPosition(){this._attrPos.setXYZ(0,0,0,0);for(let e=0;e<64;e++){let t=e/63*this._currentTheta;this._attrPos.setXYZ(e+1,this._currentRadius*Math.sin(t),0,this._currentRadius*Math.cos(t))}this._attrPos.needsUpdate=!0}_buildIndex(){for(let e=0;e<63;e++)this._attrIndex.setXYZ(e*3,0,e+1,e+2);this._attrIndex.needsUpdate=!0}},ln=class extends h.BufferGeometry{constructor(){super(),this.radius=0,this._currentRadius=0,this.tail=new h.Vector3,this._currentTail=new h.Vector3,this._attrPos=new h.BufferAttribute(new Float32Array(294),3),this.setAttribute("position",this._attrPos),this._attrIndex=new h.BufferAttribute(new Uint16Array(194),1),this.setIndex(this._attrIndex),this._buildIndex(),this.update()}update(){let e=!1;this._currentRadius!==this.radius&&(this._currentRadius=this.radius,e=!0),this._currentTail.equals(this.tail)||(this._currentTail.copy(this.tail),e=!0),e&&this._buildPosition()}_buildPosition(){for(let e=0;e<32;e++){let t=e/16*Math.PI;this._attrPos.setXYZ(e,Math.cos(t),Math.sin(t),0),this._attrPos.setXYZ(32+e,0,Math.cos(t),Math.sin(t)),this._attrPos.setXYZ(64+e,Math.sin(t),0,Math.cos(t))}this.scale(this._currentRadius,this._currentRadius,this._currentRadius),this.translate(this._currentTail.x,this._currentTail.y,this._currentTail.z),this._attrPos.setXYZ(96,0,0,0),this._attrPos.setXYZ(97,this._currentTail.x,this._currentTail.y,this._currentTail.z),this._attrPos.needsUpdate=!0}_buildIndex(){for(let e=0;e<32;e++){let t=(e+1)%32;this._attrIndex.setXY(e*2,e,t),this._attrIndex.setXY(64+e*2,32+e,32+t),this._attrIndex.setXY(128+e*2,64+e,64+t)}this._attrIndex.setXY(192,96,97),this._attrIndex.needsUpdate=!0}},ye=new h.Quaternion,di=new h.Quaternion,ce=new h.Vector3,hi=new h.Vector3,fi=Math.sqrt(2)/2,ho=new h.Quaternion(0,0,-fi,fi),fo=new h.Vector3(0,1,0),un=class extends h.Group{constructor(e){super(),this.matrixAutoUpdate=!1,this.vrmLookAt=e;{let t=new De;t.radius=.5;let n=new h.MeshBasicMaterial({color:65280,transparent:!0,opacity:.5,side:h.DoubleSide,depthTest:!1,depthWrite:!1});this._meshPitch=new h.Mesh(t,n),this.add(this._meshPitch)}{let t=new De;t.radius=.5;let n=new h.MeshBasicMaterial({color:16711680,transparent:!0,opacity:.5,side:h.DoubleSide,depthTest:!1,depthWrite:!1});this._meshYaw=new h.Mesh(t,n),this.add(this._meshYaw)}{let t=new ln;t.radius=.1;let n=new h.LineBasicMaterial({color:16777215,depthTest:!1,depthWrite:!1});this._lineTarget=new h.LineSegments(t,n),this._lineTarget.frustumCulled=!1,this.add(this._lineTarget)}}dispose(){this._meshYaw.geometry.dispose(),this._meshYaw.material.dispose(),this._meshPitch.geometry.dispose(),this._meshPitch.material.dispose(),this._lineTarget.geometry.dispose(),this._lineTarget.material.dispose()}updateMatrixWorld(e){let t=h.MathUtils.DEG2RAD*this.vrmLookAt.yaw;this._meshYaw.geometry.theta=t,this._meshYaw.geometry.update();let n=h.MathUtils.DEG2RAD*this.vrmLookAt.pitch;this._meshPitch.geometry.theta=n,this._meshPitch.geometry.update(),this.vrmLookAt.getLookAtWorldPosition(ce),this.vrmLookAt.getLookAtWorldQuaternion(ye),ye.multiply(this.vrmLookAt.getFaceFrontQuaternion(di)),this._meshYaw.position.copy(ce),this._meshYaw.quaternion.copy(ye),this._meshPitch.position.copy(ce),this._meshPitch.quaternion.copy(ye),this._meshPitch.quaternion.multiply(di.setFromAxisAngle(fo,t)),this._meshPitch.quaternion.multiply(ho);let{target:i,autoUpdate:r}=this.vrmLookAt;i!=null&&r&&(i.getWorldPosition(hi).sub(ce),this._lineTarget.geometry.tail.copy(hi),this._lineTarget.geometry.update(),this._lineTarget.position.copy(ce)),super.updateMatrixWorld(e)}},po=new h.Vector3,mo=new h.Vector3;function cn(c,e){return c.matrixWorld.decompose(po,e,mo),e}function be(c){return[Math.atan2(-c.z,c.x),Math.atan2(c.y,Math.sqrt(c.x*c.x+c.z*c.z))]}function pi(c){let e=Math.round(c/2/Math.PI);return c-2*Math.PI*e}var mi=new h.Vector3(0,0,1),go=new h.Vector3,_o=new h.Vector3,vo=new h.Vector3,Eo=new h.Quaternion,Jt=new h.Quaternion,gi=new h.Quaternion,To=new h.Quaternion,en=new h.Euler,Be=class c{get yaw(){return this._yaw}set yaw(e){this._yaw=e,this._needsUpdate=!0}get pitch(){return this._pitch}set pitch(e){this._pitch=e,this._needsUpdate=!0}get euler(){return console.warn("VRMLookAt: euler is deprecated. use getEuler() instead."),this.getEuler(new h.Euler)}constructor(e,t){this.offsetFromHeadBone=new h.Vector3,this.autoUpdate=!0,this.faceFront=new h.Vector3(0,0,1),this.humanoid=e,this.applier=t,this._yaw=0,this._pitch=0,this._needsUpdate=!0,this._restHeadWorldQuaternion=this.getLookAtWorldQuaternion(new h.Quaternion)}getEuler(e){return e.set(h.MathUtils.DEG2RAD*this._pitch,h.MathUtils.DEG2RAD*this._yaw,0,"YXZ")}copy(e){if(this.humanoid!==e.humanoid)throw new Error("VRMLookAt: humanoid must be same in order to copy");return this.offsetFromHeadBone.copy(e.offsetFromHeadBone),this.applier=e.applier,this.autoUpdate=e.autoUpdate,this.target=e.target,this.faceFront.copy(e.faceFront),this}clone(){return new c(this.humanoid,this.applier).copy(this)}reset(){this._yaw=0,this._pitch=0,this._needsUpdate=!0}getLookAtWorldPosition(e){let t=this.humanoid.getRawBoneNode("head");return e.copy(this.offsetFromHeadBone).applyMatrix4(t.matrixWorld)}getLookAtWorldQuaternion(e){let t=this.humanoid.getRawBoneNode("head");return cn(t,e)}getFaceFrontQuaternion(e){if(this.faceFront.distanceToSquared(mi)<.01)return e.copy(this._restHeadWorldQuaternion).invert();let[t,n]=be(this.faceFront);return en.set(0,.5*Math.PI+t,n,"YZX"),e.setFromEuler(en).premultiply(To.copy(this._restHeadWorldQuaternion).invert())}getLookAtWorldDirection(e){return this.getLookAtWorldQuaternion(Jt),this.getFaceFrontQuaternion(gi),e.copy(mi).applyQuaternion(Jt).applyQuaternion(gi).applyEuler(this.getEuler(en))}lookAt(e){let t=Eo.copy(this._restHeadWorldQuaternion).multiply(Ai(this.getLookAtWorldQuaternion(Jt))),n=this.getLookAtWorldPosition(_o),i=vo.copy(e).sub(n).applyQuaternion(t).normalize(),[r,o]=be(this.faceFront),[s,a]=be(i),l=pi(s-r),u=pi(o-a);this._yaw=h.MathUtils.RAD2DEG*l,this._pitch=h.MathUtils.RAD2DEG*u,this._needsUpdate=!0}update(e){this.target!=null&&this.autoUpdate&&this.lookAt(this.target.getWorldPosition(go)),this._needsUpdate&&(this._needsUpdate=!1,this.applier.applyYawPitch(this._yaw,this._pitch))}};Be.EULER_ORDER="YXZ";var Ro=new h.Vector3(0,0,1),H=new h.Quaternion,Z=new h.Quaternion,N=new h.Euler(0,0,0,"YXZ"),ne=class{constructor(e,t,n,i,r){this.humanoid=e,this.rangeMapHorizontalInner=t,this.rangeMapHorizontalOuter=n,this.rangeMapVerticalDown=i,this.rangeMapVerticalUp=r,this.faceFront=new h.Vector3(0,0,1),this._restQuatLeftEye=new h.Quaternion,this._restQuatRightEye=new h.Quaternion,this._restLeftEyeParentWorldQuat=new h.Quaternion,this._restRightEyeParentWorldQuat=new h.Quaternion;let o=this.humanoid.getRawBoneNode("leftEye"),s=this.humanoid.getRawBoneNode("rightEye");o&&(this._restQuatLeftEye.copy(o.quaternion),cn(o.parent,this._restLeftEyeParentWorldQuat)),s&&(this._restQuatRightEye.copy(s.quaternion),cn(s.parent,this._restRightEyeParentWorldQuat))}applyYawPitch(e,t){let n=this.humanoid.getRawBoneNode("leftEye"),i=this.humanoid.getRawBoneNode("rightEye"),r=this.humanoid.getNormalizedBoneNode("leftEye"),o=this.humanoid.getNormalizedBoneNode("rightEye");n&&(t<0?N.x=-h.MathUtils.DEG2RAD*this.rangeMapVerticalDown.map(-t):N.x=h.MathUtils.DEG2RAD*this.rangeMapVerticalUp.map(t),e<0?N.y=-h.MathUtils.DEG2RAD*this.rangeMapHorizontalInner.map(-e):N.y=h.MathUtils.DEG2RAD*this.rangeMapHorizontalOuter.map(e),H.setFromEuler(N),this._getWorldFaceFrontQuat(Z),r.quaternion.copy(Z).multiply(H).multiply(Z.invert()),H.copy(this._restLeftEyeParentWorldQuat),n.quaternion.copy(r.quaternion).multiply(H).premultiply(H.invert()).multiply(this._restQuatLeftEye)),i&&(t<0?N.x=-h.MathUtils.DEG2RAD*this.rangeMapVerticalDown.map(-t):N.x=h.MathUtils.DEG2RAD*this.rangeMapVerticalUp.map(t),e<0?N.y=-h.MathUtils.DEG2RAD*this.rangeMapHorizontalOuter.map(-e):N.y=h.MathUtils.DEG2RAD*this.rangeMapHorizontalInner.map(e),H.setFromEuler(N),this._getWorldFaceFrontQuat(Z),o.quaternion.copy(Z).multiply(H).multiply(Z.invert()),H.copy(this._restRightEyeParentWorldQuat),i.quaternion.copy(o.quaternion).multiply(H).premultiply(H.invert()).multiply(this._restQuatRightEye))}lookAt(e){console.warn("VRMLookAtBoneApplier: lookAt() is deprecated. use apply() instead.");let t=h.MathUtils.RAD2DEG*e.y,n=h.MathUtils.RAD2DEG*e.x;this.applyYawPitch(t,n)}_getWorldFaceFrontQuat(e){if(this.faceFront.distanceToSquared(Ro)<.01)return e.identity();let[t,n]=be(this.faceFront);return N.set(0,.5*Math.PI+t,n,"YZX"),e.setFromEuler(N)}};ne.type="bone";var ve=class{constructor(e,t,n,i,r){this.expressions=e,this.rangeMapHorizontalInner=t,this.rangeMapHorizontalOuter=n,this.rangeMapVerticalDown=i,this.rangeMapVerticalUp=r}applyYawPitch(e,t){t<0?(this.expressions.setValue("lookDown",0),this.expressions.setValue("lookUp",this.rangeMapVerticalUp.map(-t))):(this.expressions.setValue("lookUp",0),this.expressions.setValue("lookDown",this.rangeMapVerticalDown.map(t))),e<0?(this.expressions.setValue("lookLeft",0),this.expressions.setValue("lookRight",this.rangeMapHorizontalOuter.map(-e))):(this.expressions.setValue("lookRight",0),this.expressions.setValue("lookLeft",this.rangeMapHorizontalOuter.map(e)))}lookAt(e){console.warn("VRMLookAtBoneApplier: lookAt() is deprecated. use apply() instead.");let t=h.MathUtils.RAD2DEG*e.y,n=h.MathUtils.RAD2DEG*e.x;this.applyYawPitch(t,n)}};ve.type="expression";var Ve=class{constructor(e,t){this.inputMaxValue=e,this.outputScale=t}map(e){return this.outputScale*Mi(e/this.inputMaxValue)}},xo=new Set(["1.0","1.0-beta"]),we=.01,dn=class{get name(){return"VRMLookAtLoaderPlugin"}constructor(e,t){this.parser=e,this.helperRoot=t?.helperRoot}afterRoot(e){return S(this,void 0,void 0,function*(){let t=e.userData.vrmHumanoid;if(t===null)return;if(t===void 0)throw new Error("VRMLookAtLoaderPlugin: vrmHumanoid is undefined. VRMHumanoidLoaderPlugin have to be used first");let n=e.userData.vrmExpressionManager;if(n!==null){if(n===void 0)throw new Error("VRMLookAtLoaderPlugin: vrmExpressionManager is undefined. VRMExpressionLoaderPlugin have to be used first");e.userData.vrmLookAt=yield this._import(e,t,n)}})}_import(e,t,n){return S(this,void 0,void 0,function*(){if(t==null||n==null)return null;let i=yield this._v1Import(e,t,n);if(i)return i;let r=yield this._v0Import(e,t,n);return r||null})}_v1Import(e,t,n){var i,r,o;return S(this,void 0,void 0,function*(){let s=this.parser.json;if(!(((i=s.extensionsUsed)===null||i===void 0?void 0:i.indexOf("VRMC_vrm"))!==-1))return null;let l=(r=s.extensions)===null||r===void 0?void 0:r.VRMC_vrm;if(!l)return null;let u=l.specVersion;if(!xo.has(u))return console.warn(`VRMLookAtLoaderPlugin: Unknown VRMC_vrm specVersion "${u}"`),null;let d=l.lookAt;if(!d)return null;let f=d.type==="expression"?1:10,p=this._v1ImportRangeMap(d.rangeMapHorizontalInner,f),g=this._v1ImportRangeMap(d.rangeMapHorizontalOuter,f),m=this._v1ImportRangeMap(d.rangeMapVerticalDown,f),_=this._v1ImportRangeMap(d.rangeMapVerticalUp,f),v;d.type==="expression"?v=new ve(n,p,g,m,_):v=new ne(t,p,g,m,_);let T=this._importLookAt(t,v);return T.offsetFromHeadBone.fromArray((o=d.offsetFromHeadBone)!==null&&o!==void 0?o:[0,.06,0]),T})}_v1ImportRangeMap(e,t){var n,i;let r=(n=e?.inputMaxValue)!==null&&n!==void 0?n:90,o=(i=e?.outputScale)!==null&&i!==void 0?i:t;return r<we&&(console.warn("VRMLookAtLoaderPlugin: inputMaxValue of a range map is too small. Consider reviewing the range map!"),r=we),new Ve(r,o)}_v0Import(e,t,n){var i,r,o,s;return S(this,void 0,void 0,function*(){let l=(i=this.parser.json.extensions)===null||i===void 0?void 0:i.VRM;if(!l)return null;let u=l.firstPerson;if(!u)return null;let d=u.lookAtTypeName==="BlendShape"?1:10,f=this._v0ImportDegreeMap(u.lookAtHorizontalInner,d),p=this._v0ImportDegreeMap(u.lookAtHorizontalOuter,d),g=this._v0ImportDegreeMap(u.lookAtVerticalDown,d),m=this._v0ImportDegreeMap(u.lookAtVerticalUp,d),_;u.lookAtTypeName==="BlendShape"?_=new ve(n,f,p,g,m):_=new ne(t,f,p,g,m);let v=this._importLookAt(t,_);return u.firstPersonBoneOffset?v.offsetFromHeadBone.set((r=u.firstPersonBoneOffset.x)!==null&&r!==void 0?r:0,(o=u.firstPersonBoneOffset.y)!==null&&o!==void 0?o:.06,-((s=u.firstPersonBoneOffset.z)!==null&&s!==void 0?s:0)):v.offsetFromHeadBone.set(0,.06,0),v.faceFront.set(0,0,-1),_ instanceof ne&&_.faceFront.set(0,0,-1),v})}_v0ImportDegreeMap(e,t){var n,i;let r=e?.curve;JSON.stringify(r)!=="[0,0,0,1,1,1,1,0]"&&console.warn("Curves of LookAtDegreeMap defined in VRM 0.0 are not supported");let o=(n=e?.xRange)!==null&&n!==void 0?n:90,s=(i=e?.yRange)!==null&&i!==void 0?i:t;return o<we&&(console.warn("VRMLookAtLoaderPlugin: xRange of a degree map is too small. Consider reviewing the degree map!"),o=we),new Ve(o,s)}_importLookAt(e,t){let n=new Be(e,t);if(this.helperRoot){let i=new un(n);this.helperRoot.add(i),i.renderOrder=this.helperRoot.renderOrder}return n}};function Mo(c,e){return typeof c!="string"||c===""?"":(/^https?:\/\//i.test(e)&&/^\//.test(c)&&(e=e.replace(/(^https?:\/\/[^/]+).*/i,"$1")),/^(https?:)?\/\//i.test(c)||/^data:.*,.*$/i.test(c)||/^blob:.*$/i.test(c)?c:e+c)}var Ao=new Set(["1.0","1.0-beta"]),hn=class{get name(){return"VRMMetaLoaderPlugin"}constructor(e,t){var n,i,r;this.parser=e,this.needThumbnailImage=(n=t?.needThumbnailImage)!==null&&n!==void 0?n:!0,this.acceptLicenseUrls=(i=t?.acceptLicenseUrls)!==null&&i!==void 0?i:["https://vrm.dev/licenses/1.0/"],this.acceptV0Meta=(r=t?.acceptV0Meta)!==null&&r!==void 0?r:!0}afterRoot(e){return S(this,void 0,void 0,function*(){e.userData.vrmMeta=yield this._import(e)})}_import(e){return S(this,void 0,void 0,function*(){let t=yield this._v1Import(e);if(t!=null)return t;let n=yield this._v0Import(e);return n??null})}_v1Import(e){var t,n,i;return S(this,void 0,void 0,function*(){let r=this.parser.json;if(!(((t=r.extensionsUsed)===null||t===void 0?void 0:t.indexOf("VRMC_vrm"))!==-1))return null;let s=(n=r.extensions)===null||n===void 0?void 0:n.VRMC_vrm;if(s==null)return null;let a=s.specVersion;if(!Ao.has(a))return console.warn(`VRMMetaLoaderPlugin: Unknown VRMC_vrm specVersion "${a}"`),null;let l=s.meta;if(!l)return null;let u=l.licenseUrl;if(!new Set(this.acceptLicenseUrls).has(u))throw new Error(`VRMMetaLoaderPlugin: The license url "${u}" is not accepted`);let f;return this.needThumbnailImage&&l.thumbnailImage!=null&&(f=(i=yield this._extractGLTFImage(l.thumbnailImage))!==null&&i!==void 0?i:void 0),{metaVersion:"1",name:l.name,version:l.version,authors:l.authors,copyrightInformation:l.copyrightInformation,contactInformation:l.contactInformation,references:l.references,thirdPartyLicenses:l.thirdPartyLicenses,thumbnailImage:f,licenseUrl:l.licenseUrl,avatarPermission:l.avatarPermission,allowExcessivelyViolentUsage:l.allowExcessivelyViolentUsage,allowExcessivelySexualUsage:l.allowExcessivelySexualUsage,commercialUsage:l.commercialUsage,allowPoliticalOrReligiousUsage:l.allowPoliticalOrReligiousUsage,allowAntisocialOrHateUsage:l.allowAntisocialOrHateUsage,creditNotation:l.creditNotation,allowRedistribution:l.allowRedistribution,modification:l.modification,otherLicenseUrl:l.otherLicenseUrl}})}_v0Import(e){var t;return S(this,void 0,void 0,function*(){let i=(t=this.parser.json.extensions)===null||t===void 0?void 0:t.VRM;if(!i)return null;let r=i.meta;if(!r)return null;if(!this.acceptV0Meta)throw new Error("VRMMetaLoaderPlugin: Attempted to load VRM0.0 meta but acceptV0Meta is false");let o;return this.needThumbnailImage&&r.texture!=null&&r.texture!==-1&&(o=yield this.parser.getDependency("texture",r.texture)),{metaVersion:"0",allowedUserName:r.allowedUserName,author:r.author,commercialUssageName:r.commercialUssageName,contactInformation:r.contactInformation,licenseName:r.licenseName,otherLicenseUrl:r.otherLicenseUrl,otherPermissionUrl:r.otherPermissionUrl,reference:r.reference,sexualUssageName:r.sexualUssageName,texture:o??void 0,title:r.title,version:r.version,violentUssageName:r.violentUssageName}})}_extractGLTFImage(e){var t;return S(this,void 0,void 0,function*(){let i=(t=this.parser.json.images)===null||t===void 0?void 0:t[e];if(i==null)return console.warn(`VRMMetaLoaderPlugin: Attempt to use images[${e}] of glTF as a thumbnail but the image doesn't exist`),null;let r=i.uri;if(i.bufferView!=null){let s=yield this.parser.getDependency("bufferView",i.bufferView),a=new Blob([s],{type:i.mimeType});r=URL.createObjectURL(a)}return r==null?(console.warn(`VRMMetaLoaderPlugin: Attempt to use images[${e}] of glTF as a thumbnail but the image couldn't load properly`),null):yield new h.ImageLoader().loadAsync(Mo(r,this.parser.options.path)).catch(s=>(console.error(s),console.warn("VRMMetaLoaderPlugin: Failed to load a thumbnail image"),null))})}},fn=class{constructor(e){this.scene=e.scene,this.meta=e.meta,this.humanoid=e.humanoid,this.expressionManager=e.expressionManager,this.firstPerson=e.firstPerson,this.lookAt=e.lookAt}update(e){this.humanoid.update(),this.lookAt&&this.lookAt.update(e),this.expressionManager&&this.expressionManager.update()}};var pn=class extends fn{constructor(e){super(e),this.materials=e.materials,this.springBoneManager=e.springBoneManager,this.nodeConstraintManager=e.nodeConstraintManager}update(e){super.update(e),this.nodeConstraintManager&&this.nodeConstraintManager.update(),this.springBoneManager&&this.springBoneManager.update(e),this.materials&&this.materials.forEach(t=>{t.update&&t.update(e)})}};function Se(c,e,t,n){function i(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function s(u){try{l(n.next(u))}catch(d){o(d)}}function a(u){try{l(n.throw(u))}catch(d){o(d)}}function l(u){u.done?r(u.value):i(u.value).then(s,a)}l((n=n.apply(c,e||[])).next())})}function Q(c,e,t,n){function i(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function s(u){try{l(n.next(u))}catch(d){o(d)}}function a(u){try{l(n.throw(u))}catch(d){o(d)}}function l(u){u.done?r(u.value):i(u.value).then(s,a)}l((n=n.apply(c,e||[])).next())})}var yo=`// #define PHONG

varying vec3 vViewPosition;

#ifndef FLAT_SHADED
  varying vec3 vNormal;
#endif

#include <common>

// #include <uv_pars_vertex>
#ifdef MTOON_USE_UV
  varying vec2 vUv;

  // COMPAT: pre-r151 uses a common uvTransform
  #if THREE_VRM_THREE_REVISION < 151
    uniform mat3 uvTransform;
  #endif
#endif

// #include <uv2_pars_vertex>
// COMAPT: pre-r151 uses uv2 for lightMap and aoMap
#if THREE_VRM_THREE_REVISION < 151
  #if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
    attribute vec2 uv2;
    varying vec2 vUv2;
    uniform mat3 uv2Transform;
  #endif
#endif

// #include <displacementmap_pars_vertex>
// #include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

#ifdef USE_OUTLINEWIDTHMULTIPLYTEXTURE
  uniform sampler2D outlineWidthMultiplyTexture;
  uniform mat3 outlineWidthMultiplyTextureUvTransform;
#endif

uniform float outlineWidthFactor;

void main() {

  // #include <uv_vertex>
  #ifdef MTOON_USE_UV
    // COMPAT: pre-r151 uses a common uvTransform
    #if THREE_VRM_THREE_REVISION >= 151
      vUv = uv;
    #else
      vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
    #endif
  #endif

  // #include <uv2_vertex>
  // COMAPT: pre-r151 uses uv2 for lightMap and aoMap
  #if THREE_VRM_THREE_REVISION < 151
    #if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
      vUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;
    #endif
  #endif

  #include <color_vertex>

  #include <beginnormal_vertex>
  #include <morphnormal_vertex>
  #include <skinbase_vertex>
  #include <skinnormal_vertex>

  // we need this to compute the outline properly
  objectNormal = normalize( objectNormal );

  #include <defaultnormal_vertex>

  #ifndef FLAT_SHADED // Normal computed with derivatives when FLAT_SHADED
    vNormal = normalize( transformedNormal );
  #endif

  #include <begin_vertex>

  #include <morphtarget_vertex>
  #include <skinning_vertex>
  // #include <displacementmap_vertex>
  #include <project_vertex>
  #include <logdepthbuf_vertex>
  #include <clipping_planes_vertex>

  vViewPosition = - mvPosition.xyz;

  float outlineTex = 1.0;

  #ifdef OUTLINE
    #ifdef USE_OUTLINEWIDTHMULTIPLYTEXTURE
      vec2 outlineWidthMultiplyTextureUv = ( outlineWidthMultiplyTextureUvTransform * vec3( vUv, 1 ) ).xy;
      outlineTex = texture2D( outlineWidthMultiplyTexture, outlineWidthMultiplyTextureUv ).g;
    #endif

    #ifdef OUTLINE_WIDTH_WORLD
      float worldNormalLength = length( transformedNormal );
      vec3 outlineOffset = outlineWidthFactor * outlineTex * worldNormalLength * objectNormal;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( outlineOffset + transformed, 1.0 );
    #endif

    #ifdef OUTLINE_WIDTH_SCREEN
      vec3 clipNormal = ( projectionMatrix * modelViewMatrix * vec4( objectNormal, 0.0 ) ).xyz;
      vec2 projectedNormal = normalize( clipNormal.xy );
      projectedNormal.x *= projectionMatrix[ 0 ].x / projectionMatrix[ 1 ].y;
      gl_Position.xy += 2.0 * outlineWidthFactor * outlineTex * projectedNormal.xy;
    #endif

    gl_Position.z += 1E-6 * gl_Position.w; // anti-artifact magic
  #endif

  #include <worldpos_vertex>
  // #include <envmap_vertex>
  #include <shadowmap_vertex>
  #include <fog_vertex>

}`,wo=`// #define PHONG

uniform vec3 litFactor;

uniform float opacity;

uniform vec3 shadeColorFactor;
#ifdef USE_SHADEMULTIPLYTEXTURE
  uniform sampler2D shadeMultiplyTexture;
  uniform mat3 shadeMultiplyTextureUvTransform;
#endif

uniform float shadingShiftFactor;
uniform float shadingToonyFactor;

#ifdef USE_SHADINGSHIFTTEXTURE
  uniform sampler2D shadingShiftTexture;
  uniform mat3 shadingShiftTextureUvTransform;
  uniform float shadingShiftTextureScale;
#endif

uniform float giEqualizationFactor;

uniform vec3 parametricRimColorFactor;
#ifdef USE_RIMMULTIPLYTEXTURE
  uniform sampler2D rimMultiplyTexture;
  uniform mat3 rimMultiplyTextureUvTransform;
#endif
uniform float rimLightingMixFactor;
uniform float parametricRimFresnelPowerFactor;
uniform float parametricRimLiftFactor;

#ifdef USE_MATCAPTEXTURE
  uniform vec3 matcapFactor;
  uniform sampler2D matcapTexture;
  uniform mat3 matcapTextureUvTransform;
#endif

uniform vec3 emissive;
uniform float emissiveIntensity;

uniform vec3 outlineColorFactor;
uniform float outlineLightingMixFactor;

#ifdef USE_UVANIMATIONMASKTEXTURE
  uniform sampler2D uvAnimationMaskTexture;
  uniform mat3 uvAnimationMaskTextureUvTransform;
#endif

uniform float uvAnimationScrollXOffset;
uniform float uvAnimationScrollYOffset;
uniform float uvAnimationRotationPhase;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>

// #include <uv_pars_fragment>
#if ( defined( MTOON_USE_UV ) && !defined( MTOON_UVS_VERTEX_ONLY ) )
  varying vec2 vUv;
#endif

// #include <uv2_pars_fragment>
// COMAPT: pre-r151 uses uv2 for lightMap and aoMap
#if THREE_VRM_THREE_REVISION < 151
  #if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
    varying vec2 vUv2;
  #endif
#endif

#include <map_pars_fragment>

#ifdef USE_MAP
  uniform mat3 mapUvTransform;
#endif

// #include <alphamap_pars_fragment>

#if THREE_VRM_THREE_REVISION >= 132
  #include <alphatest_pars_fragment>
#endif

#include <aomap_pars_fragment>
// #include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>

#ifdef USE_EMISSIVEMAP
  uniform mat3 emissiveMapUvTransform;
#endif

// #include <envmap_common_pars_fragment>
// #include <envmap_pars_fragment>
// #include <cube_uv_reflection_fragment>
#include <fog_pars_fragment>

// #include <bsdfs>
// COMPAT: pre-r151 doesn't have BRDF_Lambert in <common>
#if THREE_VRM_THREE_REVISION < 151
  vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
    return RECIPROCAL_PI * diffuseColor;
  }
#endif

#include <lights_pars_begin>

#if THREE_VRM_THREE_REVISION >= 132
  #include <normal_pars_fragment>
#endif

// #include <lights_phong_pars_fragment>
varying vec3 vViewPosition;

#if THREE_VRM_THREE_REVISION < 132
  #ifndef FLAT_SHADED
    varying vec3 vNormal;
  #endif
#endif

struct MToonMaterial {
  vec3 diffuseColor;
  vec3 shadeColor;
  float shadingShift;
};

float linearstep( float a, float b, float t ) {
  return clamp( ( t - a ) / ( b - a ), 0.0, 1.0 );
}

/**
 * Convert NdotL into toon shading factor using shadingShift and shadingToony
 */
float getShading(
  const in float dotNL,
  const in float shadow,
  const in float shadingShift
) {
  float shading = dotNL;
  shading = shading + shadingShift;
  shading = linearstep( -1.0 + shadingToonyFactor, 1.0 - shadingToonyFactor, shading );
  shading *= shadow;
  return shading;
}

/**
 * Mix diffuseColor and shadeColor using shading factor and light color
 */
vec3 getDiffuse(
  const in MToonMaterial material,
  const in float shading,
  in vec3 lightColor
) {
  #ifdef DEBUG_LITSHADERATE
    return vec3( BRDF_Lambert( shading * lightColor ) );
  #endif

  #if THREE_VRM_THREE_REVISION < 132
    #ifndef PHYSICALLY_CORRECT_LIGHTS
      lightColor *= PI;
    #endif
  #endif

  vec3 col = lightColor * BRDF_Lambert( mix( material.shadeColor, material.diffuseColor, shading ) );

  // The "comment out if you want to PBR absolutely" line
  #ifdef V0_COMPAT_SHADE
    col = min( col, material.diffuseColor );
  #endif

  return col;
}

// COMPAT: pre-r156 uses a struct GeometricContext
#if THREE_VRM_THREE_REVISION >= 157
  void RE_Direct_MToon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in MToonMaterial material, const in float shadow, inout ReflectedLight reflectedLight ) {
    float dotNL = clamp( dot( geometryNormal, directLight.direction ), -1.0, 1.0 );
    vec3 irradiance = directLight.color;

    // directSpecular will be used for rim lighting, not an actual specular
    reflectedLight.directSpecular += irradiance;

    irradiance *= dotNL;

    float shading = getShading( dotNL, shadow, material.shadingShift );

    // toon shaded diffuse
    reflectedLight.directDiffuse += getDiffuse( material, shading, directLight.color );
  }

  void RE_IndirectDiffuse_MToon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in MToonMaterial material, inout ReflectedLight reflectedLight ) {
    // indirect diffuse will use diffuseColor, no shadeColor involved
    reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

    // directSpecular will be used for rim lighting, not an actual specular
    reflectedLight.directSpecular += irradiance;
  }
#else
  void RE_Direct_MToon( const in IncidentLight directLight, const in GeometricContext geometry, const in MToonMaterial material, const in float shadow, inout ReflectedLight reflectedLight ) {
    float dotNL = clamp( dot( geometry.normal, directLight.direction ), -1.0, 1.0 );
    vec3 irradiance = directLight.color;

    #if THREE_VRM_THREE_REVISION < 132
      #ifndef PHYSICALLY_CORRECT_LIGHTS
        irradiance *= PI;
      #endif
    #endif

    // directSpecular will be used for rim lighting, not an actual specular
    reflectedLight.directSpecular += irradiance;

    irradiance *= dotNL;

    float shading = getShading( dotNL, shadow, material.shadingShift );

    // toon shaded diffuse
    reflectedLight.directDiffuse += getDiffuse( material, shading, directLight.color );
  }

  void RE_IndirectDiffuse_MToon( const in vec3 irradiance, const in GeometricContext geometry, const in MToonMaterial material, inout ReflectedLight reflectedLight ) {
    // indirect diffuse will use diffuseColor, no shadeColor involved
    reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

    // directSpecular will be used for rim lighting, not an actual specular
    reflectedLight.directSpecular += irradiance;
  }
#endif

#define RE_Direct RE_Direct_MToon
#define RE_IndirectDiffuse RE_IndirectDiffuse_MToon
#define Material_LightProbeLOD( material ) (0)

#include <shadowmap_pars_fragment>
// #include <bumpmap_pars_fragment>

// #include <normalmap_pars_fragment>
#ifdef USE_NORMALMAP

  uniform sampler2D normalMap;
  uniform mat3 normalMapUvTransform;
  uniform vec2 normalScale;

#endif

// COMPAT: USE_NORMALMAP_OBJECTSPACE used to be OBJECTSPACE_NORMALMAP in pre-r151
#if defined( USE_NORMALMAP_OBJECTSPACE ) || defined( OBJECTSPACE_NORMALMAP )

  uniform mat3 normalMatrix;

#endif

// COMPAT: USE_NORMALMAP_TANGENTSPACE used to be TANGENTSPACE_NORMALMAP in pre-r151
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( TANGENTSPACE_NORMALMAP ) )

  // Per-Pixel Tangent Space Normal Mapping
  // http://hacksoflife.blogspot.ch/2009/11/per-pixel-tangent-space-normal-mapping.html

  // three-vrm specific change: it requires \`uv\` as an input in order to support uv scrolls

  // Temporary compat against shader change @ Three.js r126, r151
  #if THREE_VRM_THREE_REVISION >= 151

    mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {

      vec3 q0 = dFdx( eye_pos.xyz );
      vec3 q1 = dFdy( eye_pos.xyz );
      vec2 st0 = dFdx( uv.st );
      vec2 st1 = dFdy( uv.st );

      vec3 N = surf_norm;

      vec3 q1perp = cross( q1, N );
      vec3 q0perp = cross( N, q0 );

      vec3 T = q1perp * st0.x + q0perp * st1.x;
      vec3 B = q1perp * st0.y + q0perp * st1.y;

      float det = max( dot( T, T ), dot( B, B ) );
      float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );

      return mat3( T * scale, B * scale, N );

    }

  #elif THREE_VRM_THREE_REVISION >= 126

    vec3 perturbNormal2Arb( vec2 uv, vec3 eye_pos, vec3 surf_norm, vec3 mapN, float faceDirection ) {

      vec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );
      vec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );
      vec2 st0 = dFdx( uv.st );
      vec2 st1 = dFdy( uv.st );

      vec3 N = normalize( surf_norm );

      vec3 q1perp = cross( q1, N );
      vec3 q0perp = cross( N, q0 );

      vec3 T = q1perp * st0.x + q0perp * st1.x;
      vec3 B = q1perp * st0.y + q0perp * st1.y;

      // three-vrm specific change: Workaround for the issue that happens when delta of uv = 0.0
      // TODO: Is this still required? Or shall I make a PR about it?
      if ( length( T ) == 0.0 || length( B ) == 0.0 ) {
        return surf_norm;
      }

      float det = max( dot( T, T ), dot( B, B ) );
      float scale = ( det == 0.0 ) ? 0.0 : faceDirection * inversesqrt( det );

      return normalize( T * ( mapN.x * scale ) + B * ( mapN.y * scale ) + N * mapN.z );

    }

  #else

    vec3 perturbNormal2Arb( vec2 uv, vec3 eye_pos, vec3 surf_norm, vec3 mapN ) {

      // Workaround for Adreno 3XX dFd*( vec3 ) bug. See #9988

      vec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );
      vec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );
      vec2 st0 = dFdx( uv.st );
      vec2 st1 = dFdy( uv.st );

      float scale = sign( st1.t * st0.s - st0.t * st1.s ); // we do not care about the magnitude

      vec3 S = ( q0 * st1.t - q1 * st0.t ) * scale;
      vec3 T = ( - q0 * st1.s + q1 * st0.s ) * scale;

      // three-vrm specific change: Workaround for the issue that happens when delta of uv = 0.0
      // TODO: Is this still required? Or shall I make a PR about it?

      if ( length( S ) == 0.0 || length( T ) == 0.0 ) {
        return surf_norm;
      }

      S = normalize( S );
      T = normalize( T );
      vec3 N = normalize( surf_norm );

      #ifdef DOUBLE_SIDED

        // Workaround for Adreno GPUs gl_FrontFacing bug. See #15850 and #10331

        bool frontFacing = dot( cross( S, T ), N ) > 0.0;

        mapN.xy *= ( float( frontFacing ) * 2.0 - 1.0 );

      #else

        mapN.xy *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );

      #endif

      mat3 tsn = mat3( S, T, N );
      return normalize( tsn * mapN );

    }

  #endif

#endif

// #include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

// == post correction ==========================================================
void postCorrection() {
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
  #include <fog_fragment>
  #include <premultiplied_alpha_fragment>
  #include <dithering_fragment>
}

// == main procedure ===========================================================
void main() {
  #include <clipping_planes_fragment>

  vec2 uv = vec2(0.5, 0.5);

  #if ( defined( MTOON_USE_UV ) && !defined( MTOON_UVS_VERTEX_ONLY ) )
    uv = vUv;

    float uvAnimMask = 1.0;
    #ifdef USE_UVANIMATIONMASKTEXTURE
      vec2 uvAnimationMaskTextureUv = ( uvAnimationMaskTextureUvTransform * vec3( uv, 1 ) ).xy;
      uvAnimMask = texture2D( uvAnimationMaskTexture, uvAnimationMaskTextureUv ).b;
    #endif

    uv = uv + vec2( uvAnimationScrollXOffset, uvAnimationScrollYOffset ) * uvAnimMask;
    float uvRotCos = cos( uvAnimationRotationPhase * uvAnimMask );
    float uvRotSin = sin( uvAnimationRotationPhase * uvAnimMask );
    uv = mat2( uvRotCos, -uvRotSin, uvRotSin, uvRotCos ) * ( uv - 0.5 ) + 0.5;
  #endif

  #ifdef DEBUG_UV
    gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
    #if ( defined( MTOON_USE_UV ) && !defined( MTOON_UVS_VERTEX_ONLY ) )
      gl_FragColor = vec4( uv, 0.0, 1.0 );
    #endif
    return;
  #endif

  vec4 diffuseColor = vec4( litFactor, opacity );
  ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
  vec3 totalEmissiveRadiance = emissive * emissiveIntensity;

  #include <logdepthbuf_fragment>

  // #include <map_fragment>
  #ifdef USE_MAP
    vec2 mapUv = ( mapUvTransform * vec3( uv, 1 ) ).xy;
    vec4 sampledDiffuseColor = texture2D( map, mapUv );
    #ifdef DECODE_VIDEO_TEXTURE
      sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
    #endif
    diffuseColor *= sampledDiffuseColor;
  #endif

  // #include <color_fragment>
  #if ( defined( USE_COLOR ) && !defined( IGNORE_VERTEX_COLOR ) )
    diffuseColor.rgb *= vColor;
  #endif

  // #include <alphamap_fragment>

  #include <alphatest_fragment>

  // #include <specularmap_fragment>

  // #include <normal_fragment_begin>
  float faceDirection = gl_FrontFacing ? 1.0 : -1.0;

  #ifdef FLAT_SHADED

    vec3 fdx = dFdx( vViewPosition );
    vec3 fdy = dFdy( vViewPosition );
    vec3 normal = normalize( cross( fdx, fdy ) );

  #else

    vec3 normal = normalize( vNormal );

    #ifdef DOUBLE_SIDED

      normal *= faceDirection;

    #endif

  #endif

  #ifdef USE_NORMALMAP

    vec2 normalMapUv = ( normalMapUvTransform * vec3( uv, 1 ) ).xy;

  #endif

  #ifdef USE_NORMALMAP_TANGENTSPACE

    #ifdef USE_TANGENT

      mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );

    #else

      mat3 tbn = getTangentFrame( - vViewPosition, normal, normalMapUv );

    #endif

    #if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )

      tbn[0] *= faceDirection;
      tbn[1] *= faceDirection;

    #endif

  #endif

  #ifdef USE_CLEARCOAT_NORMALMAP

    #ifdef USE_TANGENT

      mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );

    #else

      mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );

    #endif

    #if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )

      tbn2[0] *= faceDirection;
      tbn2[1] *= faceDirection;

    #endif

  #endif

  // non perturbed normal for clearcoat among others

  vec3 nonPerturbedNormal = normal;

  #ifdef OUTLINE
    normal *= -1.0;
  #endif

  // #include <normal_fragment_maps>

  // COMPAT: USE_NORMALMAP_OBJECTSPACE used to be OBJECTSPACE_NORMALMAP in pre-r151
  #if defined( USE_NORMALMAP_OBJECTSPACE ) || defined( OBJECTSPACE_NORMALMAP )

    normal = texture2D( normalMap, normalMapUv ).xyz * 2.0 - 1.0; // overrides both flatShading and attribute normals

    #ifdef FLIP_SIDED

      normal = - normal;

    #endif

    #ifdef DOUBLE_SIDED

      // Temporary compat against shader change @ Three.js r126
      // See: #21205, #21307, #21299
      #if THREE_VRM_THREE_REVISION >= 126

        normal = normal * faceDirection;

      #else

        normal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );

      #endif

    #endif

    normal = normalize( normalMatrix * normal );

  // COMPAT: USE_NORMALMAP_TANGENTSPACE used to be TANGENTSPACE_NORMALMAP in pre-r151
  #elif defined( USE_NORMALMAP_TANGENTSPACE ) || defined( TANGENTSPACE_NORMALMAP )

    vec3 mapN = texture2D( normalMap, normalMapUv ).xyz * 2.0 - 1.0;
    mapN.xy *= normalScale;

    // COMPAT: pre-r151
    #if THREE_VRM_THREE_REVISION >= 151 || defined( USE_TANGENT )

      normal = normalize( tbn * mapN );

    #else

      // pre-r126
      #if THREE_VRM_THREE_REVISION >= 126

        normal = perturbNormal2Arb( uv, -vViewPosition, normal, mapN, faceDirection );

      #else

        normal = perturbNormal2Arb( uv, -vViewPosition, normal, mapN );

      #endif

    #endif

  #endif

  // #include <emissivemap_fragment>
  #ifdef USE_EMISSIVEMAP
    vec2 emissiveMapUv = ( emissiveMapUvTransform * vec3( uv, 1 ) ).xy;
    totalEmissiveRadiance *= texture2D( emissiveMap, emissiveMapUv ).rgb;
  #endif

  #ifdef DEBUG_NORMAL
    gl_FragColor = vec4( 0.5 + 0.5 * normal, 1.0 );
    return;
  #endif

  // -- MToon: lighting --------------------------------------------------------
  // accumulation
  // #include <lights_phong_fragment>
  MToonMaterial material;

  material.diffuseColor = diffuseColor.rgb;

  material.shadeColor = shadeColorFactor;
  #ifdef USE_SHADEMULTIPLYTEXTURE
    vec2 shadeMultiplyTextureUv = ( shadeMultiplyTextureUvTransform * vec3( uv, 1 ) ).xy;
    material.shadeColor *= texture2D( shadeMultiplyTexture, shadeMultiplyTextureUv ).rgb;
  #endif

  #if ( defined( USE_COLOR ) && !defined( IGNORE_VERTEX_COLOR ) )
    material.shadeColor.rgb *= vColor;
  #endif

  material.shadingShift = shadingShiftFactor;
  #ifdef USE_SHADINGSHIFTTEXTURE
    vec2 shadingShiftTextureUv = ( shadingShiftTextureUvTransform * vec3( uv, 1 ) ).xy;
    material.shadingShift += texture2D( shadingShiftTexture, shadingShiftTextureUv ).r * shadingShiftTextureScale;
  #endif

  // #include <lights_fragment_begin>

  // MToon Specific changes:
  // Since we want to take shadows into account of shading instead of irradiance,
  // we had to modify the codes that multiplies the results of shadowmap into color of direct lights.

  // COMPAT: pre-r156 uses a struct GeometricContext
  #if THREE_VRM_THREE_REVISION >= 157
    vec3 geometryPosition = - vViewPosition;
    vec3 geometryNormal = normal;
    vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );

    vec3 geometryClearcoatNormal;

    #ifdef USE_CLEARCOAT

      geometryClearcoatNormal = clearcoatNormal;

    #endif
  #else
    GeometricContext geometry;

    geometry.position = - vViewPosition;
    geometry.normal = normal;
    geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );

    #ifdef USE_CLEARCOAT

      geometry.clearcoatNormal = clearcoatNormal;

    #endif
  #endif

  IncidentLight directLight;

  // since these variables will be used in unrolled loop, we have to define in prior
  float shadow;

  #if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )

    PointLight pointLight;
    #if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
    PointLightShadow pointLightShadow;
    #endif

    #pragma unroll_loop_start
    for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {

      pointLight = pointLights[ i ];

      // COMPAT: pre-r156 uses a struct GeometricContext
      #if THREE_VRM_THREE_REVISION >= 157
        getPointLightInfo( pointLight, geometryPosition, directLight );
      #elif THREE_VRM_THREE_REVISION >= 132
        getPointLightInfo( pointLight, geometry, directLight );
      #else
        getPointDirectLightIrradiance( pointLight, geometry, directLight );
      #endif

      shadow = 1.0;
      #if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
      pointLightShadow = pointLightShadows[ i ];
      shadow = all( bvec2( directLight.visible, receiveShadow ) ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
      #endif

      // COMPAT: pre-r156 uses a struct GeometricContext
      #if THREE_VRM_THREE_REVISION >= 157
        RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, shadow, reflectedLight );
      #else
        RE_Direct( directLight, geometry, material, shadow, reflectedLight );
      #endif

    }
    #pragma unroll_loop_end

  #endif

  #if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )

    SpotLight spotLight;
    #if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
    SpotLightShadow spotLightShadow;
    #endif

    #pragma unroll_loop_start
    for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {

      spotLight = spotLights[ i ];

      // COMPAT: pre-r156 uses a struct GeometricContext
      #if THREE_VRM_THREE_REVISION >= 157
        getSpotLightInfo( spotLight, geometryPosition, directLight );
      #elif THREE_VRM_THREE_REVISION >= 132
        getSpotLightInfo( spotLight, geometry, directLight );
      #else
        getSpotDirectLightIrradiance( spotLight, geometry, directLight );
      #endif

      shadow = 1.0;
      #if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
      spotLightShadow = spotLightShadows[ i ];
      shadow = all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;
      #endif

      // COMPAT: pre-r156 uses a struct GeometricContext
      #if THREE_VRM_THREE_REVISION >= 157
        RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, shadow, reflectedLight );
      #else
        RE_Direct( directLight, geometry, material, shadow, reflectedLight );
      #endif

    }
    #pragma unroll_loop_end

  #endif

  #if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )

    DirectionalLight directionalLight;
    #if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
    DirectionalLightShadow directionalLightShadow;
    #endif

    #pragma unroll_loop_start
    for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {

      directionalLight = directionalLights[ i ];

      // COMPAT: pre-r156 uses a struct GeometricContext
      #if THREE_VRM_THREE_REVISION >= 157
        getDirectionalLightInfo( directionalLight, directLight );
      #elif THREE_VRM_THREE_REVISION >= 132
        getDirectionalLightInfo( directionalLight, geometry, directLight );
      #else
        getDirectionalDirectLightIrradiance( directionalLight, geometry, directLight );
      #endif

      shadow = 1.0;
      #if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
      directionalLightShadow = directionalLightShadows[ i ];
      shadow = all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
      #endif

      // COMPAT: pre-r156 uses a struct GeometricContext
      #if THREE_VRM_THREE_REVISION >= 157
        RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, shadow, reflectedLight );
      #else
        RE_Direct( directLight, geometry, material, shadow, reflectedLight );
      #endif

    }
    #pragma unroll_loop_end

  #endif

  // #if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )

  //   RectAreaLight rectAreaLight;

  //   #pragma unroll_loop_start
  //   for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {

  //     rectAreaLight = rectAreaLights[ i ];
  //     RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );

  //   }
  //   #pragma unroll_loop_end

  // #endif

  #if defined( RE_IndirectDiffuse )

    vec3 iblIrradiance = vec3( 0.0 );

    vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );

    // COMPAT: pre-r156 uses a struct GeometricContext
    // COMPAT: pre-r156 doesn't have a define USE_LIGHT_PROBES
    #if THREE_VRM_THREE_REVISION >= 157
      #if defined( USE_LIGHT_PROBES )
        irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
      #endif
    #elif THREE_VRM_THREE_REVISION >= 133
      irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );
    #else
      irradiance += getLightProbeIrradiance( lightProbe, geometry );
    #endif

    #if ( NUM_HEMI_LIGHTS > 0 )

      #pragma unroll_loop_start
      for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {

        // COMPAT: pre-r156 uses a struct GeometricContext
        #if THREE_VRM_THREE_REVISION >= 157
          irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
        #elif THREE_VRM_THREE_REVISION >= 133
          irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );
        #else
          irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );
        #endif

      }
      #pragma unroll_loop_end

    #endif

  #endif

  // #if defined( RE_IndirectSpecular )

  //   vec3 radiance = vec3( 0.0 );
  //   vec3 clearcoatRadiance = vec3( 0.0 );

  // #endif

  #include <lights_fragment_maps>
  #include <lights_fragment_end>

  // modulation
  #include <aomap_fragment>

  vec3 col = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;

  #ifdef DEBUG_LITSHADERATE
    gl_FragColor = vec4( col, diffuseColor.a );
    postCorrection();
    return;
  #endif

  // -- MToon: rim lighting -----------------------------------------
  vec3 viewDir = normalize( vViewPosition );

  #ifndef PHYSICALLY_CORRECT_LIGHTS
    reflectedLight.directSpecular /= PI;
  #endif
  vec3 rimMix = mix( vec3( 1.0 ), reflectedLight.directSpecular, 1.0 );

  vec3 rim = parametricRimColorFactor * pow( saturate( 1.0 - dot( viewDir, normal ) + parametricRimLiftFactor ), parametricRimFresnelPowerFactor );

  #ifdef USE_MATCAPTEXTURE
    {
      vec3 x = normalize( vec3( viewDir.z, 0.0, -viewDir.x ) );
      vec3 y = cross( viewDir, x ); // guaranteed to be normalized
      vec2 sphereUv = 0.5 + 0.5 * vec2( dot( x, normal ), -dot( y, normal ) );
      sphereUv = ( matcapTextureUvTransform * vec3( sphereUv, 1 ) ).xy;
      vec3 matcap = texture2D( matcapTexture, sphereUv ).rgb;
      rim += matcapFactor * matcap;
    }
  #endif

  #ifdef USE_RIMMULTIPLYTEXTURE
    vec2 rimMultiplyTextureUv = ( rimMultiplyTextureUvTransform * vec3( uv, 1 ) ).xy;
    rim *= texture2D( rimMultiplyTexture, rimMultiplyTextureUv ).rgb;
  #endif

  col += rimMix * rim;

  // -- MToon: Emission --------------------------------------------------------
  col += totalEmissiveRadiance;

  // #include <envmap_fragment>

  // -- Almost done! -----------------------------------------------------------
  #if defined( OUTLINE )
    col = outlineColorFactor.rgb * mix( vec3( 1.0 ), col, outlineLightingMixFactor );
  #endif

  #ifdef OPAQUE
    diffuseColor.a = 1.0;
  #endif

  gl_FragColor = vec4( col, diffuseColor.a );
  postCorrection();
}
`,So={None:"none",Normal:"normal",LitShadeRate:"litShadeRate",UV:"uv"},tn={None:"none",WorldCoordinates:"worldCoordinates",ScreenCoordinates:"screenCoordinates"},Lo={3e3:"",3001:"srgb"};function nn(c){return parseInt(h.REVISION,10)>=152?c.colorSpace:Lo[c.encoding]}var fe=class extends h.ShaderMaterial{get color(){return this.uniforms.litFactor.value}set color(e){this.uniforms.litFactor.value=e}get map(){return this.uniforms.map.value}set map(e){this.uniforms.map.value=e}get normalMap(){return this.uniforms.normalMap.value}set normalMap(e){this.uniforms.normalMap.value=e}get normalScale(){return this.uniforms.normalScale.value}set normalScale(e){this.uniforms.normalScale.value=e}get emissive(){return this.uniforms.emissive.value}set emissive(e){this.uniforms.emissive.value=e}get emissiveIntensity(){return this.uniforms.emissiveIntensity.value}set emissiveIntensity(e){this.uniforms.emissiveIntensity.value=e}get emissiveMap(){return this.uniforms.emissiveMap.value}set emissiveMap(e){this.uniforms.emissiveMap.value=e}get shadeColorFactor(){return this.uniforms.shadeColorFactor.value}set shadeColorFactor(e){this.uniforms.shadeColorFactor.value=e}get shadeMultiplyTexture(){return this.uniforms.shadeMultiplyTexture.value}set shadeMultiplyTexture(e){this.uniforms.shadeMultiplyTexture.value=e}get shadingShiftFactor(){return this.uniforms.shadingShiftFactor.value}set shadingShiftFactor(e){this.uniforms.shadingShiftFactor.value=e}get shadingShiftTexture(){return this.uniforms.shadingShiftTexture.value}set shadingShiftTexture(e){this.uniforms.shadingShiftTexture.value=e}get shadingShiftTextureScale(){return this.uniforms.shadingShiftTextureScale.value}set shadingShiftTextureScale(e){this.uniforms.shadingShiftTextureScale.value=e}get shadingToonyFactor(){return this.uniforms.shadingToonyFactor.value}set shadingToonyFactor(e){this.uniforms.shadingToonyFactor.value=e}get giEqualizationFactor(){return this.uniforms.giEqualizationFactor.value}set giEqualizationFactor(e){this.uniforms.giEqualizationFactor.value=e}get matcapFactor(){return this.uniforms.matcapFactor.value}set matcapFactor(e){this.uniforms.matcapFactor.value=e}get matcapTexture(){return this.uniforms.matcapTexture.value}set matcapTexture(e){this.uniforms.matcapTexture.value=e}get parametricRimColorFactor(){return this.uniforms.parametricRimColorFactor.value}set parametricRimColorFactor(e){this.uniforms.parametricRimColorFactor.value=e}get rimMultiplyTexture(){return this.uniforms.rimMultiplyTexture.value}set rimMultiplyTexture(e){this.uniforms.rimMultiplyTexture.value=e}get rimLightingMixFactor(){return this.uniforms.rimLightingMixFactor.value}set rimLightingMixFactor(e){this.uniforms.rimLightingMixFactor.value=e}get parametricRimFresnelPowerFactor(){return this.uniforms.parametricRimFresnelPowerFactor.value}set parametricRimFresnelPowerFactor(e){this.uniforms.parametricRimFresnelPowerFactor.value=e}get parametricRimLiftFactor(){return this.uniforms.parametricRimLiftFactor.value}set parametricRimLiftFactor(e){this.uniforms.parametricRimLiftFactor.value=e}get outlineWidthMultiplyTexture(){return this.uniforms.outlineWidthMultiplyTexture.value}set outlineWidthMultiplyTexture(e){this.uniforms.outlineWidthMultiplyTexture.value=e}get outlineWidthFactor(){return this.uniforms.outlineWidthFactor.value}set outlineWidthFactor(e){this.uniforms.outlineWidthFactor.value=e}get outlineColorFactor(){return this.uniforms.outlineColorFactor.value}set outlineColorFactor(e){this.uniforms.outlineColorFactor.value=e}get outlineLightingMixFactor(){return this.uniforms.outlineLightingMixFactor.value}set outlineLightingMixFactor(e){this.uniforms.outlineLightingMixFactor.value=e}get uvAnimationMaskTexture(){return this.uniforms.uvAnimationMaskTexture.value}set uvAnimationMaskTexture(e){this.uniforms.uvAnimationMaskTexture.value=e}get uvAnimationScrollXOffset(){return this.uniforms.uvAnimationScrollXOffset.value}set uvAnimationScrollXOffset(e){this.uniforms.uvAnimationScrollXOffset.value=e}get uvAnimationScrollYOffset(){return this.uniforms.uvAnimationScrollYOffset.value}set uvAnimationScrollYOffset(e){this.uniforms.uvAnimationScrollYOffset.value=e}get uvAnimationRotationPhase(){return this.uniforms.uvAnimationRotationPhase.value}set uvAnimationRotationPhase(e){this.uniforms.uvAnimationRotationPhase.value=e}get ignoreVertexColor(){return this._ignoreVertexColor}set ignoreVertexColor(e){this._ignoreVertexColor=e,this.needsUpdate=!0}get v0CompatShade(){return this._v0CompatShade}set v0CompatShade(e){this._v0CompatShade=e,this.needsUpdate=!0}get debugMode(){return this._debugMode}set debugMode(e){this._debugMode=e,this.needsUpdate=!0}get outlineWidthMode(){return this._outlineWidthMode}set outlineWidthMode(e){this._outlineWidthMode=e,this.needsUpdate=!0}get isOutline(){return this._isOutline}set isOutline(e){this._isOutline=e,this.needsUpdate=!0}get isMToonMaterial(){return!0}constructor(e={}){var t;super({vertexShader:yo,fragmentShader:wo}),this.uvAnimationScrollXSpeedFactor=0,this.uvAnimationScrollYSpeedFactor=0,this.uvAnimationRotationSpeedFactor=0,this.fog=!0,this.normalMapType=h.TangentSpaceNormalMap,this._ignoreVertexColor=!0,this._v0CompatShade=!1,this._debugMode=So.None,this._outlineWidthMode=tn.None,this._isOutline=!1,e.transparentWithZWrite&&(e.depthWrite=!0),delete e.transparentWithZWrite,e.fog=!0,e.lights=!0,e.clipping=!0,parseInt(h.REVISION,10)<129&&(e.skinning=e.skinning||!1),parseInt(h.REVISION,10)<131&&(e.morphTargets=e.morphTargets||!1,e.morphNormals=e.morphNormals||!1),this.uniforms=h.UniformsUtils.merge([h.UniformsLib.common,h.UniformsLib.normalmap,h.UniformsLib.emissivemap,h.UniformsLib.fog,h.UniformsLib.lights,{litFactor:{value:new h.Color(1,1,1)},mapUvTransform:{value:new h.Matrix3},colorAlpha:{value:1},normalMapUvTransform:{value:new h.Matrix3},shadeColorFactor:{value:new h.Color(.97,.81,.86)},shadeMultiplyTexture:{value:null},shadeMultiplyTextureUvTransform:{value:new h.Matrix3},shadingShiftFactor:{value:0},shadingShiftTexture:{value:null},shadingShiftTextureUvTransform:{value:new h.Matrix3},shadingShiftTextureScale:{value:1},shadingToonyFactor:{value:.9},giEqualizationFactor:{value:.9},matcapFactor:{value:new h.Color(0,0,0)},matcapTexture:{value:null},matcapTextureUvTransform:{value:new h.Matrix3},parametricRimColorFactor:{value:new h.Color(0,0,0)},rimMultiplyTexture:{value:null},rimMultiplyTextureUvTransform:{value:new h.Matrix3},rimLightingMixFactor:{value:0},parametricRimFresnelPowerFactor:{value:1},parametricRimLiftFactor:{value:0},emissive:{value:new h.Color(0,0,0)},emissiveIntensity:{value:1},emissiveMapUvTransform:{value:new h.Matrix3},outlineWidthMultiplyTexture:{value:null},outlineWidthMultiplyTextureUvTransform:{value:new h.Matrix3},outlineWidthFactor:{value:.5},outlineColorFactor:{value:new h.Color(0,0,0)},outlineLightingMixFactor:{value:1},uvAnimationMaskTexture:{value:null},uvAnimationMaskTextureUvTransform:{value:new h.Matrix3},uvAnimationScrollXOffset:{value:0},uvAnimationScrollYOffset:{value:0},uvAnimationRotationPhase:{value:0}},(t=e.uniforms)!==null&&t!==void 0?t:{}]),this.setValues(e),this._uploadUniformsWorkaround(),this.customProgramCacheKey=()=>[...Object.entries(this._generateDefines()).map(([n,i])=>`${n}:${i}`),this.matcapTexture?`matcapTextureColorSpace:${nn(this.matcapTexture)}`:"",this.shadeMultiplyTexture?`shadeMultiplyTextureColorSpace:${nn(this.shadeMultiplyTexture)}`:"",this.rimMultiplyTexture?`rimMultiplyTextureColorSpace:${nn(this.rimMultiplyTexture)}`:""].join(","),this.onBeforeCompile=n=>{let i=parseInt(h.REVISION,10),r=Object.entries(Object.assign(Object.assign({},this._generateDefines()),this.defines)).filter(([o,s])=>!!s).map(([o,s])=>`#define ${o} ${s}`).join(`
`)+`
`;n.vertexShader=r+n.vertexShader,n.fragmentShader=r+n.fragmentShader,i<154&&(n.fragmentShader=n.fragmentShader.replace("#include <colorspace_fragment>","#include <encodings_fragment>")),i<132&&(n.fragmentShader=n.fragmentShader.replace("#include <normal_pars_fragment>",""),n.fragmentShader=n.fragmentShader.replace("#include <alphatest_pars_fragment>",""))}}update(e){this._uploadUniformsWorkaround(),this._updateUVAnimation(e)}copy(e){return super.copy(e),this.map=e.map,this.normalMap=e.normalMap,this.emissiveMap=e.emissiveMap,this.shadeMultiplyTexture=e.shadeMultiplyTexture,this.shadingShiftTexture=e.shadingShiftTexture,this.matcapTexture=e.matcapTexture,this.rimMultiplyTexture=e.rimMultiplyTexture,this.outlineWidthMultiplyTexture=e.outlineWidthMultiplyTexture,this.uvAnimationMaskTexture=e.uvAnimationMaskTexture,this.normalMapType=e.normalMapType,this.uvAnimationScrollXSpeedFactor=e.uvAnimationScrollXSpeedFactor,this.uvAnimationScrollYSpeedFactor=e.uvAnimationScrollYSpeedFactor,this.uvAnimationRotationSpeedFactor=e.uvAnimationRotationSpeedFactor,this.ignoreVertexColor=e.ignoreVertexColor,this.v0CompatShade=e.v0CompatShade,this.debugMode=e.debugMode,this.outlineWidthMode=e.outlineWidthMode,this.isOutline=e.isOutline,this.needsUpdate=!0,this}_updateUVAnimation(e){this.uniforms.uvAnimationScrollXOffset.value+=e*this.uvAnimationScrollXSpeedFactor,this.uniforms.uvAnimationScrollYOffset.value+=e*this.uvAnimationScrollYSpeedFactor,this.uniforms.uvAnimationRotationPhase.value+=e*this.uvAnimationRotationSpeedFactor,this.uniformsNeedUpdate=!0}_uploadUniformsWorkaround(){this.uniforms.opacity.value=this.opacity,this._updateTextureMatrix(this.uniforms.map,this.uniforms.mapUvTransform),this._updateTextureMatrix(this.uniforms.normalMap,this.uniforms.normalMapUvTransform),this._updateTextureMatrix(this.uniforms.emissiveMap,this.uniforms.emissiveMapUvTransform),this._updateTextureMatrix(this.uniforms.shadeMultiplyTexture,this.uniforms.shadeMultiplyTextureUvTransform),this._updateTextureMatrix(this.uniforms.shadingShiftTexture,this.uniforms.shadingShiftTextureUvTransform),this._updateTextureMatrix(this.uniforms.matcapTexture,this.uniforms.matcapTextureUvTransform),this._updateTextureMatrix(this.uniforms.rimMultiplyTexture,this.uniforms.rimMultiplyTextureUvTransform),this._updateTextureMatrix(this.uniforms.outlineWidthMultiplyTexture,this.uniforms.outlineWidthMultiplyTextureUvTransform),this._updateTextureMatrix(this.uniforms.uvAnimationMaskTexture,this.uniforms.uvAnimationMaskTextureUvTransform),parseInt(h.REVISION,10)>=132&&(this.uniforms.alphaTest.value=this.alphaTest),this.uniformsNeedUpdate=!0}_generateDefines(){let e=parseInt(h.REVISION,10),t=this.outlineWidthMultiplyTexture!==null,n=this.map!==null||this.emissiveMap!==null||this.shadeMultiplyTexture!==null||this.shadingShiftTexture!==null||this.rimMultiplyTexture!==null||this.uvAnimationMaskTexture!==null;return{THREE_VRM_THREE_REVISION:e,OUTLINE:this._isOutline,MTOON_USE_UV:t||n,MTOON_UVS_VERTEX_ONLY:t&&!n,V0_COMPAT_SHADE:this._v0CompatShade,USE_SHADEMULTIPLYTEXTURE:this.shadeMultiplyTexture!==null,USE_SHADINGSHIFTTEXTURE:this.shadingShiftTexture!==null,USE_MATCAPTEXTURE:this.matcapTexture!==null,USE_RIMMULTIPLYTEXTURE:this.rimMultiplyTexture!==null,USE_OUTLINEWIDTHMULTIPLYTEXTURE:this._isOutline&&this.outlineWidthMultiplyTexture!==null,USE_UVANIMATIONMASKTEXTURE:this.uvAnimationMaskTexture!==null,IGNORE_VERTEX_COLOR:this._ignoreVertexColor===!0,DEBUG_NORMAL:this._debugMode==="normal",DEBUG_LITSHADERATE:this._debugMode==="litShadeRate",DEBUG_UV:this._debugMode==="uv",OUTLINE_WIDTH_WORLD:this._isOutline&&this._outlineWidthMode===tn.WorldCoordinates,OUTLINE_WIDTH_SCREEN:this._isOutline&&this._outlineWidthMode===tn.ScreenCoordinates}}_updateTextureMatrix(e,t){e.value&&(e.value.matrixAutoUpdate&&e.value.updateMatrix(),t.value.copy(e.value.matrix))}},bo={"":3e3,srgb:3001};function Po(c,e){parseInt(h.REVISION,10)>=152?c.colorSpace=e:c.encoding=bo[e]}var mn=class{get pending(){return Promise.all(this._pendings)}constructor(e,t){this._parser=e,this._materialParams=t,this._pendings=[]}assignPrimitive(e,t){t!=null&&(this._materialParams[e]=t)}assignColor(e,t,n){t!=null&&(this._materialParams[e]=new h.Color().fromArray(t),n&&this._materialParams[e].convertSRGBToLinear())}assignTexture(e,t,n){return Q(this,void 0,void 0,function*(){let i=Q(this,void 0,void 0,function*(){t!=null&&(yield this._parser.assignTexture(this._materialParams,e,t),n&&Po(this._materialParams[e],"srgb"))});return this._pendings.push(i),i})}assignTextureByIndex(e,t,n){return Q(this,void 0,void 0,function*(){return this.assignTexture(e,t!=null?{index:t}:void 0,n)})}},Io=new Set(["1.0","1.0-beta"]),Fe=class c{get name(){return c.EXTENSION_NAME}constructor(e,t={}){var n,i,r;this.parser=e,this.renderOrderOffset=(n=t.renderOrderOffset)!==null&&n!==void 0?n:0,this.v0CompatShade=(i=t.v0CompatShade)!==null&&i!==void 0?i:!1,this.debugMode=(r=t.debugMode)!==null&&r!==void 0?r:"none",this._mToonMaterialSet=new Set}beforeRoot(){return Q(this,void 0,void 0,function*(){this._removeUnlitExtensionIfMToonExists()})}afterRoot(e){return Q(this,void 0,void 0,function*(){e.userData.vrmMToonMaterials=Array.from(this._mToonMaterialSet)})}getMaterialType(e){return this._getMToonExtension(e)?fe:null}extendMaterialParams(e,t){let n=this._getMToonExtension(e);return n?this._extendMaterialParams(n,t):null}loadMesh(e){var t;return Q(this,void 0,void 0,function*(){let n=this.parser,r=(t=n.json.meshes)===null||t===void 0?void 0:t[e];if(r==null)throw new Error(`MToonMaterialLoaderPlugin: Attempt to use meshes[${e}] of glTF but the mesh doesn't exist`);let o=r.primitives,s=yield n.loadMesh(e);if(o.length===1){let a=s,l=o[0].material;l!=null&&this._setupPrimitive(a,l)}else{let a=s;for(let l=0;l<o.length;l++){let u=a.children[l],d=o[l].material;d!=null&&this._setupPrimitive(u,d)}}return s})}_removeUnlitExtensionIfMToonExists(){let n=this.parser.json.materials;n?.map((i,r)=>{var o;this._getMToonExtension(r)&&(!((o=i.extensions)===null||o===void 0)&&o.KHR_materials_unlit)&&delete i.extensions.KHR_materials_unlit})}_getMToonExtension(e){var t,n;let o=(t=this.parser.json.materials)===null||t===void 0?void 0:t[e];if(o==null){console.warn(`MToonMaterialLoaderPlugin: Attempt to use materials[${e}] of glTF but the material doesn't exist`);return}let s=(n=o.extensions)===null||n===void 0?void 0:n[c.EXTENSION_NAME];if(s==null)return;let a=s.specVersion;if(!Io.has(a)){console.warn(`MToonMaterialLoaderPlugin: Unknown ${c.EXTENSION_NAME} specVersion "${a}"`);return}return s}_extendMaterialParams(e,t){var n;return Q(this,void 0,void 0,function*(){delete t.metalness,delete t.roughness;let i=new mn(this.parser,t);i.assignPrimitive("transparentWithZWrite",e.transparentWithZWrite),i.assignColor("shadeColorFactor",e.shadeColorFactor),i.assignTexture("shadeMultiplyTexture",e.shadeMultiplyTexture,!0),i.assignPrimitive("shadingShiftFactor",e.shadingShiftFactor),i.assignTexture("shadingShiftTexture",e.shadingShiftTexture,!0),i.assignPrimitive("shadingShiftTextureScale",(n=e.shadingShiftTexture)===null||n===void 0?void 0:n.scale),i.assignPrimitive("shadingToonyFactor",e.shadingToonyFactor),i.assignPrimitive("giEqualizationFactor",e.giEqualizationFactor),i.assignColor("matcapFactor",e.matcapFactor),i.assignTexture("matcapTexture",e.matcapTexture,!0),i.assignColor("parametricRimColorFactor",e.parametricRimColorFactor),i.assignTexture("rimMultiplyTexture",e.rimMultiplyTexture,!0),i.assignPrimitive("rimLightingMixFactor",e.rimLightingMixFactor),i.assignPrimitive("parametricRimFresnelPowerFactor",e.parametricRimFresnelPowerFactor),i.assignPrimitive("parametricRimLiftFactor",e.parametricRimLiftFactor),i.assignPrimitive("outlineWidthMode",e.outlineWidthMode),i.assignPrimitive("outlineWidthFactor",e.outlineWidthFactor),i.assignTexture("outlineWidthMultiplyTexture",e.outlineWidthMultiplyTexture,!1),i.assignColor("outlineColorFactor",e.outlineColorFactor),i.assignPrimitive("outlineLightingMixFactor",e.outlineLightingMixFactor),i.assignTexture("uvAnimationMaskTexture",e.uvAnimationMaskTexture,!1),i.assignPrimitive("uvAnimationScrollXSpeedFactor",e.uvAnimationScrollXSpeedFactor),i.assignPrimitive("uvAnimationScrollYSpeedFactor",e.uvAnimationScrollYSpeedFactor),i.assignPrimitive("uvAnimationRotationSpeedFactor",e.uvAnimationRotationSpeedFactor),i.assignPrimitive("v0CompatShade",this.v0CompatShade),i.assignPrimitive("debugMode",this.debugMode),yield i.pending})}_setupPrimitive(e,t){let n=this._getMToonExtension(t);if(n){let i=this._parseRenderOrder(n);e.renderOrder=i+this.renderOrderOffset,this._generateOutline(e),this._addToMaterialSet(e);return}}_generateOutline(e){let t=e.material;if(!(t instanceof fe)||t.outlineWidthMode==="none"||t.outlineWidthFactor<=0)return;e.material=[t];let n=t.clone();n.name+=" (Outline)",n.isOutline=!0,n.side=h.BackSide,e.material.push(n);let i=e.geometry,r=i.index?i.index.count:i.attributes.position.count/3;i.addGroup(0,r,0),i.addGroup(0,r,1)}_addToMaterialSet(e){let t=e.material,n=new Set;Array.isArray(t)?t.forEach(i=>n.add(i)):n.add(t);for(let i of n)i instanceof fe&&this._mToonMaterialSet.add(i)}_parseRenderOrder(e){var t;return(e.transparentWithZWrite?0:19)+((t=e.renderQueueOffsetNumber)!==null&&t!==void 0?t:0)}};Fe.EXTENSION_NAME="VRMC_materials_mtoon";function No(c,e,t,n){function i(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function s(u){try{l(n.next(u))}catch(d){o(d)}}function a(u){try{l(n.throw(u))}catch(d){o(d)}}function l(u){u.done?r(u.value):i(u.value).then(s,a)}l((n=n.apply(c,e||[])).next())})}var ke=class c{get name(){return c.EXTENSION_NAME}constructor(e){this.parser=e}extendMaterialParams(e,t){return No(this,void 0,void 0,function*(){let n=this._getHDREmissiveMultiplierExtension(e);if(n==null)return;console.warn("VRMMaterialsHDREmissiveMultiplierLoaderPlugin: `VRMC_materials_hdr_emissiveMultiplier` is archived. Use `KHR_materials_emissive_strength` instead.");let i=n.emissiveMultiplier;t.emissiveIntensity=i})}_getHDREmissiveMultiplierExtension(e){var t,n;let o=(t=this.parser.json.materials)===null||t===void 0?void 0:t[e];if(o==null){console.warn(`VRMMaterialsHDREmissiveMultiplierLoaderPlugin: Attempt to use materials[${e}] of glTF but the material doesn't exist`);return}let s=(n=o.extensions)===null||n===void 0?void 0:n[c.EXTENSION_NAME];if(s!=null)return s}};ke.EXTENSION_NAME="VRMC_materials_hdr_emissiveMultiplier";function Ho(c,e,t,n){function i(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function s(u){try{l(n.next(u))}catch(d){o(d)}}function a(u){try{l(n.throw(u))}catch(d){o(d)}}function l(u){u.done?r(u.value):i(u.value).then(s,a)}l((n=n.apply(c,e||[])).next())})}function J(c){return Math.pow(c,2.2)}var gn=class{get name(){return"VRMMaterialsV0CompatPlugin"}constructor(e){var t;this.parser=e,this._renderQueueMapTransparent=new Map,this._renderQueueMapTransparentZWrite=new Map;let n=this.parser.json;n.extensionsUsed=(t=n.extensionsUsed)!==null&&t!==void 0?t:[],n.extensionsUsed.indexOf("KHR_texture_transform")===-1&&n.extensionsUsed.push("KHR_texture_transform")}beforeRoot(){var e;return Ho(this,void 0,void 0,function*(){let t=this.parser.json,n=(e=t.extensions)===null||e===void 0?void 0:e.VRM,i=n?.materialProperties;i&&(this._populateRenderQueueMap(i),i.forEach((r,o)=>{var s,a;let l=(s=t.materials)===null||s===void 0?void 0:s[o];if(l==null){console.warn(`VRMMaterialsV0CompatPlugin: Attempt to use materials[${o}] of glTF but the material doesn't exist`);return}if(r.shader==="VRM/MToon"){let u=this._parseV0MToonProperties(r,l);t.materials[o]=u}else if(!((a=r.shader)===null||a===void 0)&&a.startsWith("VRM/Unlit")){let u=this._parseV0UnlitProperties(r,l);t.materials[o]=u}else r.shader==="VRM_USE_GLTFSHADER"||console.warn(`VRMMaterialsV0CompatPlugin: Unknown shader: ${r.shader}`)}))})}_parseV0MToonProperties(e,t){var n,i,r,o,s,a,l,u,d,f,p,g,m,_,v,T,x,E,R,A,M,b,w,L,P,B,Y,Ke,Ze,Je,et,tt,nt,it,rt,ot,st,at,lt,ut,ct,dt,ht,ft;let Ln=(i=(n=e.keywordMap)===null||n===void 0?void 0:n._ALPHABLEND_ON)!==null&&i!==void 0?i:!1,Si=((r=e.floatProperties)===null||r===void 0?void 0:r._ZWrite)===1&&Ln,Li=this._v0ParseRenderQueue(e),bn=(s=(o=e.keywordMap)===null||o===void 0?void 0:o._ALPHATEST_ON)!==null&&s!==void 0?s:!1,bi=Ln?"BLEND":bn?"MASK":"OPAQUE",Pi=bn?(a=e.floatProperties)===null||a===void 0?void 0:a._Cutoff:void 0,Ii=((u=(l=e.floatProperties)===null||l===void 0?void 0:l._CullMode)!==null&&u!==void 0?u:2)===0,W=this._portTextureTransform(e),Ni=(f=(d=e.vectorProperties)===null||d===void 0?void 0:d._Color)===null||f===void 0?void 0:f.map((Bn,nr)=>nr===3?Bn:J(Bn)),Pn=(p=e.textureProperties)===null||p===void 0?void 0:p._MainTex,Hi=Pn!=null?{index:Pn,extensions:Object.assign({},W)}:void 0,Oi=(g=e.floatProperties)===null||g===void 0?void 0:g._BumpScale,In=(m=e.textureProperties)===null||m===void 0?void 0:m._BumpMap,Ui=In!=null?{index:In,scale:Oi,extensions:Object.assign({},W)}:void 0,Ci=(v=(_=e.vectorProperties)===null||_===void 0?void 0:_._EmissionColor)===null||v===void 0?void 0:v.map(J),Nn=(T=e.textureProperties)===null||T===void 0?void 0:T._EmissionMap,Di=Nn!=null?{index:Nn,extensions:Object.assign({},W)}:void 0,Bi=(E=(x=e.vectorProperties)===null||x===void 0?void 0:x._ShadeColor)===null||E===void 0?void 0:E.map(J),Hn=(R=e.textureProperties)===null||R===void 0?void 0:R._ShadeTexture,Vi=Hn!=null?{index:Hn,extensions:Object.assign({},W)}:void 0,Te=(M=(A=e.floatProperties)===null||A===void 0?void 0:A._ShadeShift)!==null&&M!==void 0?M:0,Re=(w=(b=e.floatProperties)===null||b===void 0?void 0:b._ShadeToony)!==null&&w!==void 0?w:.9;Re=h.MathUtils.lerp(Re,1,.5+.5*Te),Te=-Te-(1-Re);let On=(L=e.floatProperties)===null||L===void 0?void 0:L._IndirectLightIntensity,Fi=On?1-On:void 0,pt=(P=e.textureProperties)===null||P===void 0?void 0:P._SphereAdd,ki=pt!=null?[1,1,1]:void 0,Wi=pt!=null?{index:pt}:void 0,ji=(B=e.floatProperties)===null||B===void 0?void 0:B._RimLightingMix,Un=(Y=e.textureProperties)===null||Y===void 0?void 0:Y._RimTexture,zi=Un!=null?{index:Un,extensions:Object.assign({},W)}:void 0,Gi=(Ze=(Ke=e.vectorProperties)===null||Ke===void 0?void 0:Ke._RimColor)===null||Ze===void 0?void 0:Ze.map(J),Xi=(Je=e.floatProperties)===null||Je===void 0?void 0:Je._RimFresnelPower,qi=(et=e.floatProperties)===null||et===void 0?void 0:et._RimLift,Qi=["none","worldCoordinates","screenCoordinates"][(nt=(tt=e.floatProperties)===null||tt===void 0?void 0:tt._OutlineWidthMode)!==null&&nt!==void 0?nt:0],mt=(rt=(it=e.floatProperties)===null||it===void 0?void 0:it._OutlineWidth)!==null&&rt!==void 0?rt:0;mt=.01*mt;let Cn=(ot=e.textureProperties)===null||ot===void 0?void 0:ot._OutlineWidthTexture,Yi=Cn!=null?{index:Cn,extensions:Object.assign({},W)}:void 0,$i=(at=(st=e.vectorProperties)===null||st===void 0?void 0:st._OutlineColor)===null||at===void 0?void 0:at.map(J),Ki=((lt=e.floatProperties)===null||lt===void 0?void 0:lt._OutlineColorMode)===1?(ut=e.floatProperties)===null||ut===void 0?void 0:ut._OutlineLightingMix:0,Dn=(ct=e.textureProperties)===null||ct===void 0?void 0:ct._UvAnimMaskTexture,Zi=Dn!=null?{index:Dn,extensions:Object.assign({},W)}:void 0,Ji=(dt=e.floatProperties)===null||dt===void 0?void 0:dt._UvAnimScrollX,xe=(ht=e.floatProperties)===null||ht===void 0?void 0:ht._UvAnimScrollY;xe!=null&&(xe=-xe);let er=(ft=e.floatProperties)===null||ft===void 0?void 0:ft._UvAnimRotation,tr={specVersion:"1.0",transparentWithZWrite:Si,renderQueueOffsetNumber:Li,shadeColorFactor:Bi,shadeMultiplyTexture:Vi,shadingShiftFactor:Te,shadingToonyFactor:Re,giEqualizationFactor:Fi,matcapFactor:ki,matcapTexture:Wi,rimLightingMixFactor:ji,rimMultiplyTexture:zi,parametricRimColorFactor:Gi,parametricRimFresnelPowerFactor:Xi,parametricRimLiftFactor:qi,outlineWidthMode:Qi,outlineWidthFactor:mt,outlineWidthMultiplyTexture:Yi,outlineColorFactor:$i,outlineLightingMixFactor:Ki,uvAnimationMaskTexture:Zi,uvAnimationScrollXSpeedFactor:Ji,uvAnimationScrollYSpeedFactor:xe,uvAnimationRotationSpeedFactor:er};return Object.assign(Object.assign({},t),{pbrMetallicRoughness:{baseColorFactor:Ni,baseColorTexture:Hi},normalTexture:Ui,emissiveTexture:Di,emissiveFactor:Ci,alphaMode:bi,alphaCutoff:Pi,doubleSided:Ii,extensions:{VRMC_materials_mtoon:tr}})}_parseV0UnlitProperties(e,t){var n,i,r,o;let s=e.shader==="VRM/UnlitTransparentZWrite",a=e.shader==="VRM/UnlitTransparent"||s,l=this._v0ParseRenderQueue(e),u=e.shader==="VRM/UnlitCutout",d=a?"BLEND":u?"MASK":"OPAQUE",f=u?(n=e.floatProperties)===null||n===void 0?void 0:n._Cutoff:void 0,p=this._portTextureTransform(e),g=(r=(i=e.vectorProperties)===null||i===void 0?void 0:i._Color)===null||r===void 0?void 0:r.map(J),m=(o=e.textureProperties)===null||o===void 0?void 0:o._MainTex,_=m!=null?{index:m,extensions:Object.assign({},p)}:void 0,v={specVersion:"1.0",transparentWithZWrite:s,renderQueueOffsetNumber:l,shadeColorFactor:g,shadeMultiplyTexture:_};return Object.assign(Object.assign({},t),{pbrMetallicRoughness:{baseColorFactor:g,baseColorTexture:_},alphaMode:d,alphaCutoff:f,extensions:{VRMC_materials_mtoon:v}})}_portTextureTransform(e){var t,n,i,r,o;let s=(t=e.vectorProperties)===null||t===void 0?void 0:t._MainTex;if(s==null)return{};let a=[(n=s?.[0])!==null&&n!==void 0?n:0,(i=s?.[1])!==null&&i!==void 0?i:0],l=[(r=s?.[2])!==null&&r!==void 0?r:1,(o=s?.[3])!==null&&o!==void 0?o:1];return a[1]=1-l[1]-a[1],{KHR_texture_transform:{offset:a,scale:l}}}_v0ParseRenderQueue(e){var t,n,i;let r=(n=(t=e.keywordMap)===null||t===void 0?void 0:t._ALPHABLEND_ON)!==null&&n!==void 0?n:!1,o=((i=e.floatProperties)===null||i===void 0?void 0:i._ZWrite)===1,s=0;if(r){let a=e.renderQueue;a!=null&&(o?s=this._renderQueueMapTransparentZWrite.get(a):s=this._renderQueueMapTransparent.get(a))}return s}_populateRenderQueueMap(e){let t=new Set,n=new Set;e.forEach(i=>{var r,o,s;let a=(o=(r=i.keywordMap)===null||r===void 0?void 0:r._ALPHABLEND_ON)!==null&&o!==void 0?o:!1,l=((s=i.floatProperties)===null||s===void 0?void 0:s._ZWrite)===1;if(a){let u=i.renderQueue;u!=null&&(l?n.add(u):t.add(u))}}),t.size>10&&console.warn(`VRMMaterialsV0CompatPlugin: This VRM uses ${t.size} render queues for Transparent materials while VRM 1.0 only supports up to 10 render queues. The model might not be rendered correctly.`),n.size>10&&console.warn(`VRMMaterialsV0CompatPlugin: This VRM uses ${n.size} render queues for TransparentZWrite materials while VRM 1.0 only supports up to 10 render queues. The model might not be rendered correctly.`),Array.from(t).sort().forEach((i,r)=>{let o=Math.min(Math.max(r-t.size+1,-9),0);this._renderQueueMapTransparent.set(i,o)}),Array.from(n).sort().forEach((i,r)=>{let o=Math.min(Math.max(r,0),9);this._renderQueueMapTransparentZWrite.set(i,o)})}};var k=new h.Vector3,pe=class extends h.Group{constructor(e){super(),this._attrPosition=new h.BufferAttribute(new Float32Array([0,0,0,0,0,0]),3),this._attrPosition.setUsage(h.DynamicDrawUsage);let t=new h.BufferGeometry;t.setAttribute("position",this._attrPosition);let n=new h.LineBasicMaterial({color:16711935,depthTest:!1,depthWrite:!1});this._line=new h.Line(t,n),this.add(this._line),this.constraint=e}updateMatrixWorld(e){k.setFromMatrixPosition(this.constraint.destination.matrixWorld),this._attrPosition.setXYZ(0,k.x,k.y,k.z),this.constraint.source&&k.setFromMatrixPosition(this.constraint.source.matrixWorld),this._attrPosition.setXYZ(1,k.x,k.y,k.z),this._attrPosition.needsUpdate=!0,super.updateMatrixWorld(e)}};function _i(c,e){return e.set(c.elements[12],c.elements[13],c.elements[14])}var Oo=new h.Vector3,Uo=new h.Vector3;function Co(c,e){return c.decompose(Oo,e,Uo),e}function We(c){return c.invert?c.invert():c.inverse(),c}var Ee=class{constructor(e,t){this.destination=e,this.source=t,this.weight=1}},Do=new h.Vector3,Bo=new h.Vector3,Vo=new h.Vector3,Fo=new h.Quaternion,ko=new h.Quaternion,Wo=new h.Quaternion,_n=class extends Ee{get aimAxis(){return this._aimAxis}set aimAxis(e){this._aimAxis=e,this._v3AimAxis.set(e==="PositiveX"?1:e==="NegativeX"?-1:0,e==="PositiveY"?1:e==="NegativeY"?-1:0,e==="PositiveZ"?1:e==="NegativeZ"?-1:0)}get dependencies(){let e=new Set([this.source]);return this.destination.parent&&e.add(this.destination.parent),e}constructor(e,t){super(e,t),this._aimAxis="PositiveX",this._v3AimAxis=new h.Vector3(1,0,0),this._dstRestQuat=new h.Quaternion}setInitState(){this._dstRestQuat.copy(this.destination.quaternion)}update(){this.destination.updateWorldMatrix(!0,!1),this.source.updateWorldMatrix(!0,!1);let e=Fo.identity(),t=ko.identity();this.destination.parent&&(Co(this.destination.parent.matrixWorld,e),We(t.copy(e)));let n=Do.copy(this._v3AimAxis).applyQuaternion(this._dstRestQuat).applyQuaternion(e),i=_i(this.source.matrixWorld,Bo).sub(_i(this.destination.matrixWorld,Vo)).normalize(),r=Wo.setFromUnitVectors(n,i).premultiply(t).multiply(e).multiply(this._dstRestQuat);this.destination.quaternion.copy(this._dstRestQuat).slerp(r,this.weight)}};function vi(c,e,t,n){function i(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function s(u){try{l(n.next(u))}catch(d){o(d)}}function a(u){try{l(n.throw(u))}catch(d){o(d)}}function l(u){u.done?r(u.value):i(u.value).then(s,a)}l((n=n.apply(c,e||[])).next())})}function jo(c,e){let t=[c],n=c.parent;for(;n!==null;)t.unshift(n),n=n.parent;t.forEach(i=>{e(i)})}var vn=class{constructor(){this._constraints=new Set,this._objectConstraintsMap=new Map}get constraints(){return this._constraints}addConstraint(e){this._constraints.add(e);let t=this._objectConstraintsMap.get(e.destination);t==null&&(t=new Set,this._objectConstraintsMap.set(e.destination,t)),t.add(e)}deleteConstraint(e){this._constraints.delete(e),this._objectConstraintsMap.get(e.destination).delete(e)}setInitState(){let e=new Set,t=new Set;for(let n of this._constraints)this._processConstraint(n,e,t,i=>i.setInitState())}update(){let e=new Set,t=new Set;for(let n of this._constraints)this._processConstraint(n,e,t,i=>i.update())}_processConstraint(e,t,n,i){if(n.has(e))return;if(t.has(e))throw new Error("VRMNodeConstraintManager: Circular dependency detected while updating constraints");t.add(e);let r=e.dependencies;for(let o of r)jo(o,s=>{let a=this._objectConstraintsMap.get(s);if(a)for(let l of a)this._processConstraint(l,t,n,i)});i(e),n.add(e)}},zo=new h.Quaternion,Go=new h.Quaternion,En=class extends Ee{get dependencies(){return new Set([this.source])}constructor(e,t){super(e,t),this._dstRestQuat=new h.Quaternion,this._invSrcRestQuat=new h.Quaternion}setInitState(){this._dstRestQuat.copy(this.destination.quaternion),We(this._invSrcRestQuat.copy(this.source.quaternion))}update(){let e=zo.copy(this._invSrcRestQuat).multiply(this.source.quaternion),t=Go.copy(this._dstRestQuat).multiply(e);this.destination.quaternion.copy(this._dstRestQuat).slerp(t,this.weight)}},Xo=new h.Vector3,qo=new h.Quaternion,Qo=new h.Quaternion,Tn=class extends Ee{get rollAxis(){return this._rollAxis}set rollAxis(e){this._rollAxis=e,this._v3RollAxis.set(e==="X"?1:0,e==="Y"?1:0,e==="Z"?1:0)}get dependencies(){return new Set([this.source])}constructor(e,t){super(e,t),this._rollAxis="X",this._v3RollAxis=new h.Vector3(1,0,0),this._dstRestQuat=new h.Quaternion,this._invDstRestQuat=new h.Quaternion,this._invSrcRestQuatMulDstRestQuat=new h.Quaternion}setInitState(){this._dstRestQuat.copy(this.destination.quaternion),We(this._invDstRestQuat.copy(this._dstRestQuat)),We(this._invSrcRestQuatMulDstRestQuat.copy(this.source.quaternion)).multiply(this._dstRestQuat)}update(){let e=qo.copy(this._invDstRestQuat).multiply(this.source.quaternion).multiply(this._invSrcRestQuatMulDstRestQuat),t=Xo.copy(this._v3RollAxis).applyQuaternion(e),i=Qo.setFromUnitVectors(t,this._v3RollAxis).premultiply(this._dstRestQuat).multiply(e);this.destination.quaternion.copy(this._dstRestQuat).slerp(i,this.weight)}},Yo=new Set(["1.0","1.0-beta"]),je=class c{get name(){return c.EXTENSION_NAME}constructor(e,t){this.parser=e,this.helperRoot=t?.helperRoot}afterRoot(e){return vi(this,void 0,void 0,function*(){e.userData.vrmNodeConstraintManager=yield this._import(e)})}_import(e){var t;return vi(this,void 0,void 0,function*(){let n=this.parser.json;if(!(((t=n.extensionsUsed)===null||t===void 0?void 0:t.indexOf(c.EXTENSION_NAME))!==-1))return null;let r=new vn,o=yield this.parser.getDependencies("node");return o.forEach((s,a)=>{var l;let u=n.nodes[a],d=(l=u?.extensions)===null||l===void 0?void 0:l[c.EXTENSION_NAME];if(d==null)return;let f=d.specVersion;if(!Yo.has(f)){console.warn(`VRMNodeConstraintLoaderPlugin: Unknown ${c.EXTENSION_NAME} specVersion "${f}"`);return}let p=d.constraint;if(p.roll!=null){let g=this._importRollConstraint(s,o,p.roll);r.addConstraint(g)}else if(p.aim!=null){let g=this._importAimConstraint(s,o,p.aim);r.addConstraint(g)}else if(p.rotation!=null){let g=this._importRotationConstraint(s,o,p.rotation);r.addConstraint(g)}}),e.scene.updateMatrixWorld(),r.setInitState(),r})}_importRollConstraint(e,t,n){let{source:i,rollAxis:r,weight:o}=n,s=t[i],a=new Tn(e,s);if(r!=null&&(a.rollAxis=r),o!=null&&(a.weight=o),this.helperRoot){let l=new pe(a);this.helperRoot.add(l)}return a}_importAimConstraint(e,t,n){let{source:i,aimAxis:r,weight:o}=n,s=t[i],a=new _n(e,s);if(r!=null&&(a.aimAxis=r),o!=null&&(a.weight=o),this.helperRoot){let l=new pe(a);this.helperRoot.add(l)}return a}_importRotationConstraint(e,t,n){let{source:i,weight:r}=n,o=t[i],s=new En(e,o);if(r!=null&&(s.weight=r),this.helperRoot){let a=new pe(s);this.helperRoot.add(a)}return s}};je.EXTENSION_NAME="VRMC_node_constraint";var ze=class{},rn=new h.Vector3,q=new h.Vector3,Ge=class extends ze{get type(){return"capsule"}constructor(e){var t,n,i;super(),this.offset=(t=e?.offset)!==null&&t!==void 0?t:new h.Vector3(0,0,0),this.tail=(n=e?.tail)!==null&&n!==void 0?n:new h.Vector3(0,0,0),this.radius=(i=e?.radius)!==null&&i!==void 0?i:0}calculateCollision(e,t,n,i){rn.copy(this.offset).applyMatrix4(e),q.copy(this.tail).applyMatrix4(e),q.sub(rn);let r=q.lengthSq();i.copy(t).sub(rn);let o=q.dot(i);o<=0||(r<=o||q.multiplyScalar(o/r),i.sub(q));let s=n+this.radius,a=i.length()-s;return i.normalize(),a}},Xe=class extends ze{get type(){return"sphere"}constructor(e){var t,n;super(),this.offset=(t=e?.offset)!==null&&t!==void 0?t:new h.Vector3(0,0,0),this.radius=(n=e?.radius)!==null&&n!==void 0?n:0}calculateCollision(e,t,n,i){i.copy(this.offset).applyMatrix4(e),i.negate().add(t);let r=n+this.radius,o=i.length()-r;return i.normalize(),o}},O=new h.Vector3,Rn=class extends h.BufferGeometry{constructor(e){super(),this.worldScale=1,this._currentRadius=0,this._currentOffset=new h.Vector3,this._currentTail=new h.Vector3,this._shape=e,this._attrPos=new h.BufferAttribute(new Float32Array(396),3),this.setAttribute("position",this._attrPos),this._attrIndex=new h.BufferAttribute(new Uint16Array(264),1),this.setIndex(this._attrIndex),this._buildIndex(),this.update()}update(){let e=!1,t=this._shape.radius/this.worldScale;this._currentRadius!==t&&(this._currentRadius=t,e=!0),this._currentOffset.equals(this._shape.offset)||(this._currentOffset.copy(this._shape.offset),e=!0);let n=O.copy(this._shape.tail).divideScalar(this.worldScale);this._currentTail.distanceToSquared(n)>1e-10&&(this._currentTail.copy(n),e=!0),e&&this._buildPosition()}_buildPosition(){O.copy(this._currentTail).sub(this._currentOffset);let e=O.length()/this._currentRadius;for(let i=0;i<=16;i++){let r=i/16*Math.PI;this._attrPos.setXYZ(i,-Math.sin(r),-Math.cos(r),0),this._attrPos.setXYZ(17+i,e+Math.sin(r),Math.cos(r),0),this._attrPos.setXYZ(34+i,-Math.sin(r),0,-Math.cos(r)),this._attrPos.setXYZ(51+i,e+Math.sin(r),0,Math.cos(r))}for(let i=0;i<32;i++){let r=i/16*Math.PI;this._attrPos.setXYZ(68+i,0,Math.sin(r),Math.cos(r)),this._attrPos.setXYZ(100+i,e,Math.sin(r),Math.cos(r))}let t=Math.atan2(O.y,Math.sqrt(O.x*O.x+O.z*O.z)),n=-Math.atan2(O.z,O.x);this.rotateZ(t),this.rotateY(n),this.scale(this._currentRadius,this._currentRadius,this._currentRadius),this.translate(this._currentOffset.x,this._currentOffset.y,this._currentOffset.z),this._attrPos.needsUpdate=!0}_buildIndex(){for(let e=0;e<34;e++){let t=(e+1)%34;this._attrIndex.setXY(e*2,e,t),this._attrIndex.setXY(68+e*2,34+e,34+t)}for(let e=0;e<32;e++){let t=(e+1)%32;this._attrIndex.setXY(136+e*2,68+e,68+t),this._attrIndex.setXY(200+e*2,100+e,100+t)}this._attrIndex.needsUpdate=!0}},xn=class extends h.BufferGeometry{constructor(e){super(),this.worldScale=1,this._currentRadius=0,this._currentOffset=new h.Vector3,this._shape=e,this._attrPos=new h.BufferAttribute(new Float32Array(288),3),this.setAttribute("position",this._attrPos),this._attrIndex=new h.BufferAttribute(new Uint16Array(192),1),this.setIndex(this._attrIndex),this._buildIndex(),this.update()}update(){let e=!1,t=this._shape.radius/this.worldScale;this._currentRadius!==t&&(this._currentRadius=t,e=!0),this._currentOffset.equals(this._shape.offset)||(this._currentOffset.copy(this._shape.offset),e=!0),e&&this._buildPosition()}_buildPosition(){for(let e=0;e<32;e++){let t=e/16*Math.PI;this._attrPos.setXYZ(e,Math.cos(t),Math.sin(t),0),this._attrPos.setXYZ(32+e,0,Math.cos(t),Math.sin(t)),this._attrPos.setXYZ(64+e,Math.sin(t),0,Math.cos(t))}this.scale(this._currentRadius,this._currentRadius,this._currentRadius),this.translate(this._currentOffset.x,this._currentOffset.y,this._currentOffset.z),this._attrPos.needsUpdate=!0}_buildIndex(){for(let e=0;e<32;e++){let t=(e+1)%32;this._attrIndex.setXY(e*2,e,t),this._attrIndex.setXY(64+e*2,32+e,32+t),this._attrIndex.setXY(128+e*2,64+e,64+t)}this._attrIndex.needsUpdate=!0}},$o=new h.Vector3,qe=class extends h.Group{constructor(e){if(super(),this.matrixAutoUpdate=!1,this.collider=e,this.collider.shape instanceof Xe)this._geometry=new xn(this.collider.shape);else if(this.collider.shape instanceof Ge)this._geometry=new Rn(this.collider.shape);else throw new Error("VRMSpringBoneColliderHelper: Unknown collider shape type detected");let t=new h.LineBasicMaterial({color:16711935,depthTest:!1,depthWrite:!1});this._line=new h.LineSegments(this._geometry,t),this.add(this._line)}dispose(){this._geometry.dispose()}updateMatrixWorld(e){this.collider.updateWorldMatrix(!0,!1),this.matrix.copy(this.collider.matrixWorld);let t=this.matrix.elements;this._geometry.worldScale=$o.set(t[0],t[1],t[2]).length(),this._geometry.update(),super.updateMatrixWorld(e)}},Mn=class extends h.BufferGeometry{constructor(e){super(),this.worldScale=1,this._currentRadius=0,this._currentTail=new h.Vector3,this._springBone=e,this._attrPos=new h.BufferAttribute(new Float32Array(294),3),this.setAttribute("position",this._attrPos),this._attrIndex=new h.BufferAttribute(new Uint16Array(194),1),this.setIndex(this._attrIndex),this._buildIndex(),this.update()}update(){let e=!1,t=this._springBone.settings.hitRadius/this.worldScale;this._currentRadius!==t&&(this._currentRadius=t,e=!0),this._currentTail.equals(this._springBone.initialLocalChildPosition)||(this._currentTail.copy(this._springBone.initialLocalChildPosition),e=!0),e&&this._buildPosition()}_buildPosition(){for(let e=0;e<32;e++){let t=e/16*Math.PI;this._attrPos.setXYZ(e,Math.cos(t),Math.sin(t),0),this._attrPos.setXYZ(32+e,0,Math.cos(t),Math.sin(t)),this._attrPos.setXYZ(64+e,Math.sin(t),0,Math.cos(t))}this.scale(this._currentRadius,this._currentRadius,this._currentRadius),this.translate(this._currentTail.x,this._currentTail.y,this._currentTail.z),this._attrPos.setXYZ(96,0,0,0),this._attrPos.setXYZ(97,this._currentTail.x,this._currentTail.y,this._currentTail.z),this._attrPos.needsUpdate=!0}_buildIndex(){for(let e=0;e<32;e++){let t=(e+1)%32;this._attrIndex.setXY(e*2,e,t),this._attrIndex.setXY(64+e*2,32+e,32+t),this._attrIndex.setXY(128+e*2,64+e,64+t)}this._attrIndex.setXY(192,96,97),this._attrIndex.needsUpdate=!0}},Ko=new h.Vector3,An=class extends h.Group{constructor(e){super(),this.matrixAutoUpdate=!1,this.springBone=e,this._geometry=new Mn(this.springBone);let t=new h.LineBasicMaterial({color:16776960,depthTest:!1,depthWrite:!1});this._line=new h.LineSegments(this._geometry,t),this.add(this._line)}dispose(){this._geometry.dispose()}updateMatrixWorld(e){this.springBone.bone.updateWorldMatrix(!0,!1),this.matrix.copy(this.springBone.bone.matrixWorld);let t=this.matrix.elements;this._geometry.worldScale=Ko.set(t[0],t[1],t[2]).length(),this._geometry.update(),super.updateMatrixWorld(e)}},Qe=class extends h.Object3D{constructor(e){super(),this.shape=e}},Zo=new h.Matrix4;function yi(c){return c.invert?c.invert():c.getInverse(Zo.copy(c)),c}var yn=class{get inverse(){return this._shouldUpdateInverse&&(this._inverseCache.copy(this.matrix),yi(this._inverseCache),this._shouldUpdateInverse=!1),this._inverseCache}constructor(e){this._inverseCache=new h.Matrix4,this._shouldUpdateInverse=!0,this.matrix=e;let t={set:(n,i,r)=>(this._shouldUpdateInverse=!0,n[i]=r,!0)};this._originalElements=e.elements,e.elements=new Proxy(e.elements,t)}revert(){this.matrix.elements=this._originalElements}},Jo=new h.Matrix4,D=new h.Vector3,de=new h.Vector3,es=new h.Vector3,ee=new h.Vector3,Ei=new h.Vector3,he=new h.Vector3,Ti=new h.Quaternion,te=new h.Matrix4,ts=new h.Matrix4,wn=class{get center(){return this._center}set center(e){var t;!((t=this._center)===null||t===void 0)&&t.userData.inverseCacheProxy&&(this._center.userData.inverseCacheProxy.revert(),delete this._center.userData.inverseCacheProxy),this._center=e,this._center&&(this._center.userData.inverseCacheProxy||(this._center.userData.inverseCacheProxy=new yn(this._center.matrixWorld)))}get initialLocalChildPosition(){return this._initialLocalChildPosition}get _parentMatrixWorld(){return this.bone.parent?this.bone.parent.matrixWorld:Jo}constructor(e,t,n={},i=[]){var r,o,s,a,l,u;this._currentTail=new h.Vector3,this._prevTail=new h.Vector3,this._boneAxis=new h.Vector3,this._worldSpaceBoneLength=0,this._center=null,this._initialLocalMatrix=new h.Matrix4,this._initialLocalRotation=new h.Quaternion,this._initialLocalChildPosition=new h.Vector3,this.bone=e,this.bone.matrixAutoUpdate=!1,this.child=t,this.settings={hitRadius:(r=n.hitRadius)!==null&&r!==void 0?r:0,stiffness:(o=n.stiffness)!==null&&o!==void 0?o:1,gravityPower:(s=n.gravityPower)!==null&&s!==void 0?s:0,gravityDir:(l=(a=n.gravityDir)===null||a===void 0?void 0:a.clone())!==null&&l!==void 0?l:new h.Vector3(0,-1,0),dragForce:(u=n.dragForce)!==null&&u!==void 0?u:.4},this.colliderGroups=i}setInitState(){this._initialLocalMatrix.copy(this.bone.matrix),this._initialLocalRotation.copy(this.bone.quaternion),this.child?this._initialLocalChildPosition.copy(this.child.position):this._initialLocalChildPosition.copy(this.bone.position).normalize().multiplyScalar(.07);let e=this._getMatrixWorldToCenter(te);this.bone.localToWorld(this._currentTail.copy(this._initialLocalChildPosition)).applyMatrix4(e),this._prevTail.copy(this._currentTail),this._boneAxis.copy(this._initialLocalChildPosition).normalize()}reset(){this.bone.quaternion.copy(this._initialLocalRotation),this.bone.updateMatrix(),this.bone.matrixWorld.multiplyMatrices(this._parentMatrixWorld,this.bone.matrix);let e=this._getMatrixWorldToCenter(te);this.bone.localToWorld(this._currentTail.copy(this._initialLocalChildPosition)).applyMatrix4(e),this._prevTail.copy(this._currentTail)}update(e){if(e<=0)return;this._calcWorldSpaceBoneLength(),ee.setFromMatrixPosition(this.bone.matrixWorld);let t=this._getMatrixWorldToCenter(te);Ei.copy(ee).applyMatrix4(t);let n=Ti.setFromRotationMatrix(t),i=ts.copy(t).multiply(this._parentMatrixWorld),r=de.copy(this._boneAxis).applyMatrix4(this._initialLocalMatrix).applyMatrix4(i).sub(Ei).normalize(),o=es.copy(this.settings.gravityDir).applyQuaternion(n).normalize(),s=this._getMatrixCenterToWorld(te);he.copy(this._currentTail).add(D.copy(this._currentTail).sub(this._prevTail).multiplyScalar(1-this.settings.dragForce)).add(D.copy(r).multiplyScalar(this.settings.stiffness*e)).add(D.copy(o).multiplyScalar(this.settings.gravityPower*e)).applyMatrix4(s),he.sub(ee).normalize().multiplyScalar(this._worldSpaceBoneLength).add(ee),this._collision(he),t=this._getMatrixWorldToCenter(te),this._prevTail.copy(this._currentTail),this._currentTail.copy(D.copy(he).applyMatrix4(t));let a=yi(te.copy(this._parentMatrixWorld).multiply(this._initialLocalMatrix)),l=Ti.setFromUnitVectors(this._boneAxis,D.copy(he).applyMatrix4(a).normalize());this.bone.quaternion.copy(this._initialLocalRotation).multiply(l),this.bone.updateMatrix(),this.bone.matrixWorld.multiplyMatrices(this._parentMatrixWorld,this.bone.matrix)}_collision(e){this.colliderGroups.forEach(t=>{t.colliders.forEach(n=>{let i=n.shape.calculateCollision(n.matrixWorld,e,this.settings.hitRadius,D);i<0&&(e.add(D.multiplyScalar(-i)),e.sub(ee).normalize().multiplyScalar(this._worldSpaceBoneLength).add(ee))})})}_calcWorldSpaceBoneLength(){D.setFromMatrixPosition(this.bone.matrixWorld),this.child?de.setFromMatrixPosition(this.child.matrixWorld):(de.copy(this._initialLocalChildPosition),de.applyMatrix4(this.bone.matrixWorld)),this._worldSpaceBoneLength=D.sub(de).length()}_getMatrixCenterToWorld(e){return this._center?e.copy(this._center.matrixWorld):e.identity(),e}_getMatrixWorldToCenter(e){return this._center?e.copy(this._center.userData.inverseCacheProxy.inverse):e.identity(),e}};function Le(c,e,t,n){function i(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function s(u){try{l(n.next(u))}catch(d){o(d)}}function a(u){try{l(n.throw(u))}catch(d){o(d)}}function l(u){u.done?r(u.value):i(u.value).then(s,a)}l((n=n.apply(c,e||[])).next())})}function ns(c,e){let t=[],n=c;for(;n!==null;)t.unshift(n),n=n.parent;t.forEach(i=>{e(i)})}function wi(c,e){c.children.forEach(t=>{e(t)||wi(t,e)})}var Ye=class{constructor(){this._joints=new Set,this._objectSpringBonesMap=new Map}get joints(){return this._joints}get springBones(){return console.warn("VRMSpringBoneManager: springBones is deprecated. use joints instead."),this._joints}get colliderGroups(){let e=new Set;return this._joints.forEach(t=>{t.colliderGroups.forEach(n=>{e.add(n)})}),Array.from(e)}get colliders(){let e=new Set;return this.colliderGroups.forEach(t=>{t.colliders.forEach(n=>{e.add(n)})}),Array.from(e)}addJoint(e){this._joints.add(e);let t=this._objectSpringBonesMap.get(e.bone);t==null&&(t=new Set,this._objectSpringBonesMap.set(e.bone,t)),t.add(e)}addSpringBone(e){console.warn("VRMSpringBoneManager: addSpringBone() is deprecated. use addJoint() instead."),this.addJoint(e)}deleteJoint(e){this._joints.delete(e),this._objectSpringBonesMap.get(e.bone).delete(e)}deleteSpringBone(e){console.warn("VRMSpringBoneManager: deleteSpringBone() is deprecated. use deleteJoint() instead."),this.deleteJoint(e)}setInitState(){let e=new Set,t=new Set,n=new Set;for(let i of this._joints)this._processSpringBone(i,e,t,n,r=>r.setInitState())}reset(){let e=new Set,t=new Set,n=new Set;for(let i of this._joints)this._processSpringBone(i,e,t,n,r=>r.reset())}update(e){let t=new Set,n=new Set,i=new Set;for(let r of this._joints)this._processSpringBone(r,t,n,i,o=>o.update(e)),wi(r.bone,o=>{var s,a;return((a=(s=this._objectSpringBonesMap.get(o))===null||s===void 0?void 0:s.size)!==null&&a!==void 0?a:0)>0?!0:(o.updateWorldMatrix(!1,!1),!1)})}_processSpringBone(e,t,n,i,r){if(n.has(e))return;if(t.has(e))throw new Error("VRMSpringBoneManager: Circular dependency detected while updating springbones");t.add(e);let o=this._getDependencies(e);for(let s of o)ns(s,a=>{let l=this._objectSpringBonesMap.get(a);if(l)for(let u of l)this._processSpringBone(u,t,n,i,r);else i.has(a)||(a.updateWorldMatrix(!1,!1),i.add(a))});e.bone.updateMatrix(),e.bone.updateWorldMatrix(!1,!1),r(e),i.add(e.bone),n.add(e)}_getDependencies(e){let t=new Set,n=e.bone.parent;return n&&t.add(n),e.colliderGroups.forEach(i=>{i.colliders.forEach(r=>{t.add(r)})}),t}},is=new Set(["1.0","1.0-beta"]),$e=class c{get name(){return c.EXTENSION_NAME}constructor(e,t){this.parser=e,this.jointHelperRoot=t?.jointHelperRoot,this.colliderHelperRoot=t?.colliderHelperRoot}afterRoot(e){return Le(this,void 0,void 0,function*(){e.userData.vrmSpringBoneManager=yield this._import(e)})}_import(e){return Le(this,void 0,void 0,function*(){let t=yield this._v1Import(e);if(t!=null)return t;let n=yield this._v0Import(e);return n??null})}_v1Import(e){var t,n,i,r,o;return Le(this,void 0,void 0,function*(){let s=e.parser.json;if(!(((t=s.extensionsUsed)===null||t===void 0?void 0:t.indexOf(c.EXTENSION_NAME))!==-1))return null;let l=new Ye,u=yield e.parser.getDependencies("node"),d=(n=s.extensions)===null||n===void 0?void 0:n[c.EXTENSION_NAME];if(!d)return null;let f=d.specVersion;if(!is.has(f))return console.warn(`VRMSpringBoneLoaderPlugin: Unknown ${c.EXTENSION_NAME} specVersion "${f}"`),null;let p=(i=d.colliders)===null||i===void 0?void 0:i.map((m,_)=>{var v,T,x,E,R;let A=u[m.node],M=m.shape;if(M.sphere)return this._importSphereCollider(A,{offset:new h.Vector3().fromArray((v=M.sphere.offset)!==null&&v!==void 0?v:[0,0,0]),radius:(T=M.sphere.radius)!==null&&T!==void 0?T:0});if(M.capsule)return this._importCapsuleCollider(A,{offset:new h.Vector3().fromArray((x=M.capsule.offset)!==null&&x!==void 0?x:[0,0,0]),radius:(E=M.capsule.radius)!==null&&E!==void 0?E:0,tail:new h.Vector3().fromArray((R=M.capsule.tail)!==null&&R!==void 0?R:[0,0,0])});throw new Error(`VRMSpringBoneLoaderPlugin: The collider #${_} has no valid shape`)}),g=(r=d.colliderGroups)===null||r===void 0?void 0:r.map((m,_)=>{var v;return{colliders:((v=m.colliders)!==null&&v!==void 0?v:[]).map(x=>{let E=p?.[x];if(E==null)throw new Error(`VRMSpringBoneLoaderPlugin: The colliderGroup #${_} attempted to use a collider #${x} but not found`);return E}),name:m.name}});return(o=d.springs)===null||o===void 0||o.forEach((m,_)=>{var v;let T=m.joints,x=(v=m.colliderGroups)===null||v===void 0?void 0:v.map(A=>{let M=g?.[A];if(M==null)throw new Error(`VRMSpringBoneLoaderPlugin: The spring #${_} attempted to use a colliderGroup ${A} but not found`);return M}),E=m.center!=null?u[m.center]:void 0,R;T.forEach(A=>{if(R){let M=R.node,b=u[M],w=A.node,L=u[w],P={hitRadius:R.hitRadius,dragForce:R.dragForce,gravityPower:R.gravityPower,stiffness:R.stiffness,gravityDir:R.gravityDir!=null?new h.Vector3().fromArray(R.gravityDir):void 0},B=this._importJoint(b,L,P,x);E&&(B.center=E),l.addJoint(B)}R=A})}),l.setInitState(),l})}_v0Import(e){var t,n,i;return Le(this,void 0,void 0,function*(){let r=e.parser.json;if(!(((t=r.extensionsUsed)===null||t===void 0?void 0:t.indexOf("VRM"))!==-1))return null;let s=(n=r.extensions)===null||n===void 0?void 0:n.VRM,a=s?.secondaryAnimation;if(!a)return null;let l=a?.boneGroups;if(!l)return null;let u=new Ye,d=yield e.parser.getDependencies("node"),f=(i=a.colliderGroups)===null||i===void 0?void 0:i.map(p=>{var g;let m=d[p.node];return{colliders:((g=p.colliders)!==null&&g!==void 0?g:[]).map((v,T)=>{var x,E,R;let A=new h.Vector3(0,0,0);return v.offset&&A.set((x=v.offset.x)!==null&&x!==void 0?x:0,(E=v.offset.y)!==null&&E!==void 0?E:0,v.offset.z?-v.offset.z:0),this._importSphereCollider(m,{offset:A,radius:(R=v.radius)!==null&&R!==void 0?R:0})})}});return l?.forEach((p,g)=>{let m=p.bones;m&&m.forEach(_=>{var v,T,x,E;let R=d[_],A=new h.Vector3;p.gravityDir?A.set((v=p.gravityDir.x)!==null&&v!==void 0?v:0,(T=p.gravityDir.y)!==null&&T!==void 0?T:0,(x=p.gravityDir.z)!==null&&x!==void 0?x:0):A.set(0,-1,0);let M=p.center!=null?d[p.center]:void 0,b={hitRadius:p.hitRadius,dragForce:p.dragForce,gravityPower:p.gravityPower,stiffness:p.stiffiness,gravityDir:A},w=(E=p.colliderGroups)===null||E===void 0?void 0:E.map(L=>{let P=f?.[L];if(P==null)throw new Error(`VRMSpringBoneLoaderPlugin: The spring #${g} attempted to use a colliderGroup ${L} but not found`);return P});R.traverse(L=>{var P;let B=(P=L.children[0])!==null&&P!==void 0?P:null,Y=this._importJoint(L,B,b,w);M&&(Y.center=M),u.addJoint(Y)})})}),e.scene.updateMatrixWorld(),u.setInitState(),u})}_importJoint(e,t,n,i){let r=new wn(e,t,n,i);if(this.jointHelperRoot){let o=new An(r);this.jointHelperRoot.add(o),o.renderOrder=this.jointHelperRoot.renderOrder}return r}_importSphereCollider(e,t){let{offset:n,radius:i}=t,r=new Xe({offset:n,radius:i}),o=new Qe(r);if(e.add(o),this.colliderHelperRoot){let s=new qe(o);this.colliderHelperRoot.add(s),s.renderOrder=this.colliderHelperRoot.renderOrder}return o}_importCapsuleCollider(e,t){let{offset:n,radius:i,tail:r}=t,o=new Ge({offset:n,radius:i,tail:r}),s=new Qe(o);if(e.add(s),this.colliderHelperRoot){let a=new qe(s);this.colliderHelperRoot.add(a),a.renderOrder=this.colliderHelperRoot.renderOrder}return s}};$e.EXTENSION_NAME="VRMC_springBone";var Sn=class{get name(){return"VRMLoaderPlugin"}constructor(e,t){var n,i,r,o,s,a,l,u,d,f;this.parser=e;let p=t?.helperRoot,g=t?.autoUpdateHumanBones;this.expressionPlugin=(n=t?.expressionPlugin)!==null&&n!==void 0?n:new He(e),this.firstPersonPlugin=(i=t?.firstPersonPlugin)!==null&&i!==void 0?i:new sn(e),this.humanoidPlugin=(r=t?.humanoidPlugin)!==null&&r!==void 0?r:new an(e,{helperRoot:p,autoUpdateHumanBones:g}),this.lookAtPlugin=(o=t?.lookAtPlugin)!==null&&o!==void 0?o:new dn(e,{helperRoot:p}),this.metaPlugin=(s=t?.metaPlugin)!==null&&s!==void 0?s:new hn(e),this.mtoonMaterialPlugin=(a=t?.mtoonMaterialPlugin)!==null&&a!==void 0?a:new Fe(e),this.materialsHDREmissiveMultiplierPlugin=(l=t?.materialsHDREmissiveMultiplierPlugin)!==null&&l!==void 0?l:new ke(e),this.materialsV0CompatPlugin=(u=t?.materialsV0CompatPlugin)!==null&&u!==void 0?u:new gn(e),this.springBonePlugin=(d=t?.springBonePlugin)!==null&&d!==void 0?d:new $e(e,{colliderHelperRoot:p,jointHelperRoot:p}),this.nodeConstraintPlugin=(f=t?.nodeConstraintPlugin)!==null&&f!==void 0?f:new je(e,{helperRoot:p})}beforeRoot(){return Se(this,void 0,void 0,function*(){yield this.materialsV0CompatPlugin.beforeRoot(),yield this.mtoonMaterialPlugin.beforeRoot()})}loadMesh(e){return Se(this,void 0,void 0,function*(){return yield this.mtoonMaterialPlugin.loadMesh(e)})}getMaterialType(e){let t=this.mtoonMaterialPlugin.getMaterialType(e);return t??null}extendMaterialParams(e,t){return Se(this,void 0,void 0,function*(){yield this.materialsHDREmissiveMultiplierPlugin.extendMaterialParams(e,t),yield this.mtoonMaterialPlugin.extendMaterialParams(e,t)})}afterRoot(e){return Se(this,void 0,void 0,function*(){yield this.metaPlugin.afterRoot(e),yield this.humanoidPlugin.afterRoot(e),yield this.expressionPlugin.afterRoot(e),yield this.lookAtPlugin.afterRoot(e),yield this.firstPersonPlugin.afterRoot(e),yield this.springBonePlugin.afterRoot(e),yield this.nodeConstraintPlugin.afterRoot(e),yield this.mtoonMaterialPlugin.afterRoot(e);let t=e.userData.vrmMeta,n=e.userData.vrmHumanoid;if(t&&n){let i=new pn({scene:e.scene,expressionManager:e.userData.vrmExpressionManager,firstPerson:e.userData.vrmFirstPerson,humanoid:n,lookAt:e.userData.vrmLookAt,meta:t,materials:e.userData.vrmMToonMaterials,springBoneManager:e.userData.vrmSpringBoneManager,nodeConstraintManager:e.userData.vrmNodeConstraintManager});e.userData.vrm=i}})}};function Ri(c){if(Object.values(c).forEach(e=>{e?.isTexture&&e.dispose()}),c.isShaderMaterial){let e=c.uniforms;e&&Object.values(e).forEach(t=>{let n=t.value;n?.isTexture&&n.dispose()})}c.dispose()}function rs(c){let e=c.geometry;e&&e.dispose();let t=c.skeleton;t&&t.dispose();let n=c.material;n&&(Array.isArray(n)?n.forEach(i=>Ri(i)):n&&Ri(n))}function os(c){c.traverse(rs)}function ss(c){let e=new Map;c.traverse(t=>{if(t.type!=="SkinnedMesh")return;let n=t,r=n.geometry.getAttribute("skinIndex"),o=e.get(r);if(!o){let s=[],a=[],l={},u=r.array;for(let d=0;d<u.length;d++){let f=u[d];l[f]===void 0&&(l[f]=s.length,s.push(n.skeleton.bones[f]),a.push(n.skeleton.boneInverses[f])),u[d]=l[f]}r.copyArray(u),r.needsUpdate=!0,o=new h.Skeleton(s,a),e.set(r,o)}n.bind(o,new h.Matrix4)})}function as(c){let e=new Map;c.traverse(t=>{var n,i,r,o;if(!t.isMesh)return;let s=t,a=s.geometry,l=a.index;if(l==null)return;let u=e.get(a);if(u!=null){s.geometry=u;return}let d=new h.BufferGeometry;d.name=a.name,d.morphTargetsRelative=a.morphTargetsRelative,a.groups.forEach(m=>{d.addGroup(m.start,m.count,m.materialIndex)}),d.boundingBox=(i=(n=a.boundingBox)===null||n===void 0?void 0:n.clone())!==null&&i!==void 0?i:null,d.boundingSphere=(o=(r=a.boundingSphere)===null||r===void 0?void 0:r.clone())!==null&&o!==void 0?o:null,d.setDrawRange(a.drawRange.start,a.drawRange.count),d.userData=a.userData,e.set(a,d);let f=[],p=[];{let m=l.array,_=new m.constructor(m.length),v=0;for(let T=0;T<m.length;T++){let x=m[T],E=f[x];E==null&&(f[x]=v,p[v]=x,E=v,v++),_[T]=E}d.setIndex(new $t(_,1,!1))}Object.keys(a.attributes).forEach(m=>{let _=a.attributes[m];if(_.isInterleavedBufferAttribute)throw new Error("removeUnnecessaryVertices: InterleavedBufferAttribute is not supported");let v=_.array,{itemSize:T,normalized:x}=_,E=new v.constructor(p.length*T);p.forEach((R,A)=>{for(let M=0;M<T;M++)E[A*T+M]=v[R*T+M]}),d.setAttribute(m,new $t(E,T,x))});let g=!0;Object.keys(a.morphAttributes).forEach(m=>{d.morphAttributes[m]=[];let _=a.morphAttributes[m];for(let v=0;v<_.length;v++){let T=_[v];if(T.isInterleavedBufferAttribute)throw new Error("removeUnnecessaryVertices: InterleavedBufferAttribute is not supported");let x=T.array,{itemSize:E,normalized:R}=T,A=new x.constructor(p.length*E);p.forEach((M,b)=>{for(let w=0;w<E;w++)A[b*E+w]=x[M*E+w]}),g=g&&A.every(M=>M===0),d.morphAttributes[m][v]=new $t(A,E,R)}}),g&&(d.morphAttributes={}),s.geometry=d}),Array.from(e.keys()).forEach(t=>{t.dispose()})}function ls(c){var e;((e=c.meta)===null||e===void 0?void 0:e.metaVersion)==="0"&&(c.scene.rotation.y=Math.PI)}var re=class{constructor(){}};re.deepDispose=os;re.removeUnnecessaryJoints=ss;re.removeUnnecessaryVertices=as;re.rotateVRM0=ls;export{At as GLTFLoader,Sn as VRMLoaderPlugin};
/*! Bundled license information:

@pixiv/three-vrm/lib/three-vrm.module.js:
  (*!
   * @pixiv/three-vrm v2.1.0
   * VRM file loader for three.js.
   *
   * Copyright (c) 2019-2024 pixiv Inc.
   * @pixiv/three-vrm is distributed under MIT License
   * https://github.com/pixiv/three-vrm/blob/release/LICENSE
   *)
  (*!
   * @pixiv/three-vrm-core v2.1.0
   * The implementation of core features of VRM, for @pixiv/three-vrm
   *
   * Copyright (c) 2020-2024 pixiv Inc.
   * @pixiv/three-vrm-core is distributed under MIT License
   * https://github.com/pixiv/three-vrm/blob/release/LICENSE
   *)

@pixiv/three-vrm/lib/three-vrm.module.js:
  (*!
   * @pixiv/three-vrm-materials-mtoon v2.1.0
   * MToon (toon material) module for @pixiv/three-vrm
   *
   * Copyright (c) 2020-2024 pixiv Inc.
   * @pixiv/three-vrm-materials-mtoon is distributed under MIT License
   * https://github.com/pixiv/three-vrm/blob/release/LICENSE
   *)

@pixiv/three-vrm/lib/three-vrm.module.js:
  (*!
   * @pixiv/three-vrm-materials-hdr-emissive-multiplier v2.1.0
   * Support VRMC_hdr_emissiveMultiplier for @pixiv/three-vrm
   *
   * Copyright (c) 2020-2024 pixiv Inc.
   * @pixiv/three-vrm-materials-hdr-emissive-multiplier is distributed under MIT License
   * https://github.com/pixiv/three-vrm/blob/release/LICENSE
   *)

@pixiv/three-vrm/lib/three-vrm.module.js:
  (*!
   * @pixiv/three-vrm-materials-v0compat v2.1.0
   * VRM0.0 materials compatibility layer plugin for @pixiv/three-vrm
   *
   * Copyright (c) 2020-2024 pixiv Inc.
   * @pixiv/three-vrm-materials-v0compat is distributed under MIT License
   * https://github.com/pixiv/three-vrm/blob/release/LICENSE
   *)

@pixiv/three-vrm/lib/three-vrm.module.js:
  (*!
   * @pixiv/three-vrm-node-constraint v2.1.0
   * Node constraint module for @pixiv/three-vrm
   *
   * Copyright (c) 2020-2024 pixiv Inc.
   * @pixiv/three-vrm-node-constraint is distributed under MIT License
   * https://github.com/pixiv/three-vrm/blob/release/LICENSE
   *)

@pixiv/three-vrm/lib/three-vrm.module.js:
  (*!
   * @pixiv/three-vrm-springbone v2.1.0
   * Spring bone module for @pixiv/three-vrm
   *
   * Copyright (c) 2020-2024 pixiv Inc.
   * @pixiv/three-vrm-springbone is distributed under MIT License
   * https://github.com/pixiv/three-vrm/blob/release/LICENSE
   *)
*/
