# Hong Kong Street for Three.js

Open the [street material preview](preview.html) over HTTP to compare four night views and switch between dry and wet asphalt. Use **Animate rain** to pause the streaks on a frame. Rain starts paused when the browser requests reduced motion.

The preview uses a locally encoded night panorama for the sky and reflection probes. Greg Zaal photographed the Shanghai Bund panorama, used here as a city backdrop under CC0. [Poly Haven source](https://polyhaven.com/a/shanghai_bund)

The lobby and material preview both load `Maps/Demo.glb`. It contains the assembled street geometry in metres, with Y up. Its material definitions reference WebP images in `textures/` relative to the model. The two portfolio billboards are loaded by the street renderer.

Colour and emissive maps are capped at 1024 px on the longest side. Normal and packed material maps are capped at 512 px. ORM maps store ambient occlusion in red, roughness in green and metallic in blue.
