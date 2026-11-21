# Operative preview assets

The local prototype uses character and interface artwork from *Snowbreak: Containment Zone*, developed by Amazing Seasun Games. The supplied 1.8 unpack is the source for the following assets.

- `assets/models/operative-004.glb` combines `girl004_body01_skm` and `girl004_face01_skm` with their corresponding body, hair, eye and facial textures. It includes the `girl004_ui_enter01` and `girl004_ui_stand01` body tracks and matching `AnimPart00` facial tracks.
- `assets/media/snowbreak-ui` contains cropped sprites from the Main, Common and Role interface atlases. Fallback stills are renders of the same operative.
- The portfolio camera, rooftop lighting, architecture and production equipment are implemented for this site.

The standalone `snowbreak/` page uses source assets from the same unpack.

- The lobby background is a 1920 × 1080 render of the `Maps/Entry_01` scene using its mesh transforms, diffuse textures and the `Environment/07Terrain/entry01/LightMapAndShadowMask` textures. Lyfe is a transparent render of `girl002` with the native body and facial idle animation. Both layers are stills.
- The lobby, training and neuronics layouts reference the 1920 × 1080 UMG widgets `umg_main`, `uw_role_growth_lvup` and `uw_nerve_main`. The page uses the source frame rectangles from Mainnew2, Role2, TestRole, Common2, Skill and Props200. Its operative backdrop is `pic_bg018` and its typeface is the bundled Source Sans Pro Semibold.
- Lyfe’s training values come from `Settings/item/upgrade_exp.txt`, `item/card/grow.txt` (1003), and `item/templates/suplies.txt`. Cluster names and effects use `Settings/all_language/ui/spine.txt` (100021–100026). Portrait mode repositions the HUD and stacks the training panel below the character.

Permission to redistribute the game assets publicly has not been verified.

## Earlier rooftop stand-in

Adapted from **VRM1_Constraint_Twist_Sample**, © 2022 pixiv Inc. The original VRM metadata is embedded in the distributed model, including author, usage permissions and license URL. This edition reduces texture sizes, recolours the hair and irises, and adds a rooftop operator uniform. The headset and cuffs are rendered by the site.

[Original model](https://github.com/pixiv/three-vrm/blob/dev/packages/three-vrm/examples/models/VRM1_Constraint_Twist_Sample.vrm) · [VRM Public License 1.0](https://vrm.dev/licenses/1.0/)

The bundled loader combines Three.js r160 GLTFLoader and three-vrm 2.1.0. Their MIT licenses are provided in `assets/vendor/three/LICENSE` and `assets/vendor/three-vrm/LICENSE`.
