# NoodleDoStuff Homepage

Static bilingual personal website for YU Kwan Yin Timothy.

## Pages

- English: `index.html`, `work.html`, `skillset.html`, `about.html`, `contact.html`, `links/`
- ZH-HK: `zh-hk/`

## Notes

The site is designed for GitHub Pages and uses relative URLs so it can be served from a project repository path.

## Main street lobby

Serve the checkout with `python -m http.server 8000` and open `http://localhost:8000/`. The homepage is a single-screen game lobby. Selected work opens the screen credits and production case studies. The other lobby commands lead to the skill tree and contact details with downloads. The creator badge opens the profile. Their existing English and Traditional Chinese URLs remain valid.

The opening camera follows a 72-second orbit, drifting through six compositions and accelerating between them. Framing is automatic. The eye hides the HUD and Settings controls motion and language. Phones and tablets open with a muted film of the crossing. Project and equipment views use the corresponding scene stills. Reduced motion and data saving start with stills. Settings lets visitors pause motion or switch between the lightweight and live 3D views.

Selecting a discipline opens a work panel at the same street crossing. Work, Technique and Equipment reframe the live performer and equipment. Compact portrait layouts use a bottom sheet. The skill tree places six discipline nodes around the performer at the crossing. Its translucent inspector contains the tool types and all 54 tools. In portrait it moves below the character. Level up advances the selected tool’s lobby level for this visit and plays a close camera orbit.

The operator stands at the crossing in the Hong Kong Street demo map. The night panorama and camera-local probe light the facades and gear. The planar reflection pass includes the performer and production kit. The street renderer composites animated rain, volumetric fog, bloom, lens flare and a subtle CRT treatment beneath the HUD. [Street asset details](assets/models/hong-kong-street/README.md)

## Portfolio character

The portfolio lobby uses Timothy’s rigged portrait with the tapered blue nape and fitted gunmetal glasses. The arrival, equipment presentation and listening loop use three retargeted performances from Pedestrian Conversations MoCap Pack 1. Both feet are planted from the sneaker soles. Equipping Cinema, Edit, Model, Mocap or Live switches to a dedicated looping performance with keyed gaze, brow, blink and mouth shapes. The camera has a support grip, the edit tablet takes a fingertip tap, the stylus traces a left-hand slate, the tracking wand sweeps a calibration pattern and the radio cues a silent call. The live hand props attach to the portrait’s calibrated sockets. The equipment GLB also contains the stands, LED panels, monitors, turntable, tracking cameras and mixing desk. Film lights and displays illuminate both the portrait and the street. Reduced motion starts in idle. The compact site model includes the curved lenses and facial shapes. The live lens shader reflects the street lighting probe.

The actor adapter lives in `assets/js/operator.js`. It supplies the stage root, head, wrist and hips, the entrance duration, and methods to begin a transition and sample the pose. Refresh the street stills in `assets/media/main-street` when changing the actor.

Run `node --test` on Node 22.12+ to check the camera sequence, portrait rig and clips and discipline equipment.

With Chrome and Playwright Core installed, run `node tests/street-hud.browser.mjs http://127.0.0.1:8000/` against the local server to check the live character and HUD at desktop and phone sizes. Set `PLAYWRIGHT_CORE_PATH` if Playwright Core is installed outside this checkout.
