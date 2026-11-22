# Portfolio assets

The twelve assemblies in `studio-equipment.glb` were modeled for the portfolio. Their monitor textures incorporate the existing Parallel Phantasia and LED-stage portfolio photographs.

The portfolio uses `portrait-operator.glb`, with a user-supplied portrait likeness, modeled eyewear, an MPFB/MakeHuman body, MakeHuman’s CC0 `male_casualsuit06` and `shoes05` clothing, and retargeted body motion from the supplied Character Conversation library (Pedestrian Conversations MoCap Pack 1, Low Key, Gesturing to Side A Right, and Listening). The discipline performances adapt `TakePicture_CAMERA`, `TakePicture_Phone` and `CellPhone_TALKING_02` from the supplied Pedestrians pack, and `Convo_10_Big_Idea_Loop` and `Convo_08_Directions_A_Left_Loop` from the supplied Character Conversation pack. The grip corrections and facial animation were authored for the portrait. Geometry compression uses the bundled MIT-licensed meshoptimizer decoder.

## Snowbreak interface study

The standalone `snowbreak/` page uses artwork from the supplied *Snowbreak: Containment Zone* 1.8 unpack, developed by Amazing Seasun Games. The portfolio skill tree also uses its node artwork.

- The lobby background is a 1920 × 1080 render of the `Maps/Entry_01` scene using its mesh transforms, diffuse textures and the `Environment/07Terrain/entry01/LightMapAndShadowMask` textures. Lyfe is a transparent render of `girl002` with the native body and facial idle animation. Both layers are stills.
- The lobby, training and neuronics layouts reference the 1920 × 1080 UMG widgets `umg_main`, `uw_role_growth_lvup` and `uw_nerve_main`. The page uses the source frame rectangles from Mainnew2, Role2, TestRole, Common2, Skill and Props200. Its operative backdrop is `pic_bg018` and its typeface is the bundled Source Sans Pro Semibold.
- Lyfe’s training values come from `Settings/item/upgrade_exp.txt`, `item/card/grow.txt` (1003), and `item/templates/suplies.txt`. Cluster names and effects use `Settings/all_language/ui/spine.txt` (100021–100026). Portrait mode repositions the HUD and stacks the training panel below the character.

Permission to redistribute the game assets publicly has not been verified.

## Runtime libraries

The bundled loader combines Three.js r160 GLTFLoader and three-vrm 2.1.0. Their MIT licenses are provided in `assets/vendor/three/LICENSE` and `assets/vendor/three-vrm/LICENSE`.
