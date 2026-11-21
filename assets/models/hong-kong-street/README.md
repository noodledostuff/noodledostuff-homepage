# Hong Kong Street for Three.js

Open the [street material preview](preview.html) over HTTP to compare four night views and switch between dry and wet asphalt. Use **Animate rain** to pause the streaks on a frame. Rain starts paused when the browser requests reduced motion.

The preview uses a locally encoded night panorama for the sky and reflection probes. Greg Zaal photographed the Shanghai Bund panorama, used here as a city backdrop under CC0. [Poly Haven source](https://polyhaven.com/a/shanghai_bund)

Load one model at a time for a webpage. Each GLB contains geometry, UVs, material assignments and PBR settings. Its images live in the shared `textures/` folder. Serve the directory over HTTP and preserve its folder layout so relative texture URLs resolve.

From a module in `assets/js/`:

```js
import { GLTFLoader } from '../vendor/three-vrm/runtime.js';

const url = new URL('../models/hong-kong-street/Models/Props/SM_Bicycle_01.glb', import.meta.url);
const { scene: bicycle } = await new GLTFLoader().loadAsync(url.href);
scene.add(bicycle);
```

The models use metres, Y-up, and the source pivots. The site's bundled GLTFLoader supports the WebP texture extension. Add lights or an environment to illuminate the PBR materials.

[manifest.json](manifest.json) lists the models and scenes, with paths relative to this folder. Its `textures` entries map each Unreal texture name to its web versions, including material-specific variants.

| Directory | Contents |
| --- | --- |
| `Models/Assembled_Houses/` | 15 complete buildings |
| `Models/Blueprints/` | 8 static assemblies from Unreal Blueprints |
| `Models/Decals/` | 20 decal meshes |
| `Models/Facade_Props/` | 104 facade details |
| `Models/Modules/` | 98 modular building pieces |
| `Models/Props/` | 78 props |
| `Models/Street/` | 77 street pieces |
| `Maps/` | `Demo.glb` contains the placed street geometry. `Models.glb` contains the source display layout. Both request many textures. |

Colour and emissive textures are capped at 1024 px on the longest side. Normal and packed material maps are capped at 512 px and use lossless WebP. ORM maps store ambient occlusion in red, roughness in green and metallic in blue. OpenGL tangent-space normals, wall tints, cutouts and emission use the source material settings.

The two layouts and Blueprint assemblies capture static geometry. Unreal lighting, baked lightmaps, post-processing, collision and Blueprint behaviour are excluded.
