# NoodleDoStuff Homepage

Static bilingual personal website for YU Kwan Yin Timothy.

## Pages

- English: `index.html`, `work.html`, `skillset.html`, `about.html`, `contact.html`, `links/`
- ZH-HK: `zh-hk/`

## Notes

The site is designed for GitHub Pages and uses relative URLs so it can be served from a project repository path.

## Rooftop lobby

Serve the checkout with `python -m http.server 8000` and open `http://localhost:8000/`. The homepage is a single-screen game lobby. The featured LED ICVFX project, work index, skill tree, profile, contact details and downloads open from the angular mission HUD. Their existing English and Traditional Chinese URLs remain valid.

The opening camera moves through a two-minute sequence with longer holds and eased moves inspired by the supplied [reference clip](https://x.com/Dstudio_ai/status/2122569461547098595/video/1). Keys 1–4 select shots. The eye hides the HUD, the camera exports a still, and Settings controls motion and language. Reduced motion starts paused. Nine locally rendered posters cover the four camera views and five discipline setups during loading or when WebGL is unavailable. Compact portrait layouts retain the four shot tabs and open records in scrollable bottom sheets.

Select a discipline in the left rail to equip the operator and reveal its set. Select it again to clear the set. The featured banner opens related portfolio work. The skill tree groups all 54 tools by discipline and type.

The near rooftops use instanced façade and service hardware, baked shadows and a local environment probe for metal. A lower-resolution planar pass reflects the glass district, equipment and operator in the wet concrete. Fine scan lines and edge chroma separation are applied only to the rendered scene.

## Replacing the stand-in

The licensed pixiv humanoid is a temporary character. Its credits and adaptation details are in [the model notice](assets/models/NOTICE.md). For the final model, a VRM 1.0 humanoid with mapped bones and a blink expression can use the existing pose driver. Align the new model at the feet, face +Z and adjust the camera heights and headset fittings for its proportions.

For an animated GLB, adapt `createOperator()` in `assets/js/operator.js` to return the loaded `root` and a right-hand `wrist` node and a `pose(mode, time, delta, skill)` function. Map `turn`, `lean`, `gaze` and `rear` to the four loops. The stage owns framing and timing. A zero delta requests an immediate pose for paused selections. Refresh the nine `assets/media/rooftop-*.webp` posters when the character changes.

Run `node --test` on Node 22.12+ to check the camera sequence, humanoid rig and discipline equipment.
