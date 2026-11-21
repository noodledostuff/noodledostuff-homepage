# NoodleDoStuff Homepage

Static bilingual personal website for YU Kwan Yin Timothy.

## Pages

- English: `index.html`, `work.html`, `skillset.html`, `about.html`, `contact.html`, `links/`
- ZH-HK: `zh-hk/`

## Notes

The site is designed for GitHub Pages and uses relative URLs so it can be served from a project repository path.

## Snowbreak 1.8 UI reconstruction

Open [the Snowbreak lobby](snowbreak/) on the local static server, or use **Settings → Snowbreak 1.8 lobby** in the portfolio. **Operatives** opens Lyfe’s level-up screen. Select Combat Records to preview the cost and stat changes, then confirm. **Neuronics** shows six selectable skill clusters. The preview uses a sample inventory and resets on reload.

## Main street lobby

Serve the checkout with `python -m http.server 8000` and open `http://localhost:8000/`. The homepage is a single-screen game lobby. The featured LED ICVFX project, work index, skill tree, profile, contact details and downloads open from the angular mission HUD. Their existing English and Traditional Chinese URLs remain valid.

The opening camera moves through a two-minute sequence with longer holds and eased moves inspired by the supplied [reference clip](https://x.com/Dstudio_ai/status/2122569461547098595/video/1). Framing is automatic. The eye hides the HUD and Settings controls motion and language. Reduced motion starts paused. Local stills cover camera and discipline states while the renderer loads or when WebGL is unavailable.

Selecting a discipline opens a work panel at the same street crossing. Work, Technique and Equipment reframe the live performer and equipment. Compact portrait layouts use a bottom sheet. The skill tree places six discipline nodes around the performer at the crossing. Its translucent inspector contains the tool types and all 54 tools. In portrait it moves below the character. Level up advances the selected tool’s lobby level for this visit and plays a close camera orbit.

The operator stands at the crossing in the Hong Kong Street demo map. The night panorama and camera-local probe light the facades and gear. The planar reflection pass includes the performer and production kit. The street renderer composites animated rain, volumetric fog, bloom, lens flare and a subtle CRT treatment beneath the HUD. [Street asset details](assets/models/hong-kong-street/README.md)

## Operative preview

The local 1.8 preview uses Snowbreak’s `girl004` body, facial rig and matching character-screen animations. Each discipline starts the same native entrance, followed by the standing loop. The portfolio camera follows the live head, wrist and pelvis from each discipline’s camera marks. Reduced motion goes straight to idle. The main-menu, operative and common HUD atlases provide the frames and navigation glyphs. Source details are in [the asset notice](assets/models/NOTICE.md).

The actor adapter lives in `assets/js/operator.js`. It supplies the stage root, head, wrist and hips, the entrance duration, and methods to begin a transition and sample the pose. Refresh the street stills in `assets/media/main-street` when changing the actor.

Run `node --test` on Node 22.12+ to check the camera sequence, operative clips and discipline equipment.

With Chrome and Playwright Core installed, run `node tests/street-hud.browser.mjs http://127.0.0.1:8000/` against the local server to check the live character and HUD at desktop and phone sizes. Set `PLAYWRIGHT_CORE_PATH` if Playwright Core is installed outside this checkout.
