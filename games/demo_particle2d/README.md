# demo_particle2d

particle2d's effects running on their own in a flat hall drawn by render2d: a row of plinths, each
firing its exhibit (a fountain, smoke, a vortex, twinkling stars, a firework, a jet, snow and
sparks), a kite going round with a trail riding it, and a bouncing ball that throws up dust each
time it lands. The exhibits, the kite and the bouncer are in `assets/demo_particle2d.json`, every
effect is in `assets/effects2d.json`, and `world.particle2d` is in `main.scene.json`.

## Playing it

`yarn vite`, then `/games/demo_particle2d/dev.html`, the demo: three's stats panel at the top left,
and a panel at the right with particle2d's `hold`, copy JSON, reset to the file, and a render2d
folder (zoom, where the camera looks, the background and the mosaic). `/games/demo_particle2d/index.html`
is the game as it ships. Its server is
`node --experimental-strip-types games/demo_particle2d/demo_particle2d.server.ts`, then
`/games/demo_particle2d/client.html`.

The hall plays itself; there are no keys.

## The art

The three particle sheets, `assets/smoke.png`, `assets/ember.png` and `assets/star.png`, with their
`.json` frame tables, came over from the zoo game of the old core.
