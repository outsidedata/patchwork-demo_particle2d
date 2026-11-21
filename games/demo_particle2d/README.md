# demo_particle2d

The demo of the `particle2d` plugin: a dark hall drawn by render2d in which every effect plays from
the moment the page opens, with no keys. A row of plinths each plays one effect, a comet circles over
the hall, and a ball bounces in the middle, throwing up dust each time it lands.

| plinth | effect | shows |
|---|---|---|
| torch | `torch` | own shapes (`glow`, `puff`, `spark`, `puff2`), colour, size and opacity as stops over life, smoke in the `rise` force generator's turbulence |
| sparks | `sparks` | stretched `streak`s that bounce off the floor and come to rest, a flash and smoke |
| smoke | `smoke` | a billowing column: `heat`'s turbulence and scroll, `column`'s pull to its axis, `air`'s wind |
| vortex | `vortex` | `whirl`: a swirl about the effect and a pull to a ring, rings that grow out |
| fountain | `fountain` | a driver: its speed is `pressure`, which the shelf drives on the ledger row, swelling and falling |
| firework | `firework` | a flash, a shockwave ring, `star`s thrown `outward` in `air` and `gravity`, each carrying a trail of `glitter` |
| storm | `storm` | a cloud, and carried effects whose `bolt` and `bolt2` beams reach back to its middle: lightning |
| blast | `blast` | `blastwave`, a push out of the effect's point that ends a tenth of a second in, a fireball rolled through its range, rocks that bounce, streaks and rising smoke |

The comet is the kite's `comet`, ridden on the kite's row (`from`), its sparks inheriting half its
speed. The ball's dust is thrown by its page (`bouncer.client.ts`) the frame its row lands.

The plinths are the shelf's definition in `assets/demo_particle2d.json`: each its effect, its point,
and whether it streams or bursts every so many seconds, and the drivers the shelf drives. Every
effect, force generator and driver is in `assets/effects.json`, drawn with particle2d's own shapes, so
the demo has no art of its own.

## The dev page

`dev.html` is the demo's main page. Three's stats panel is at the top left. The panel holds
`world.particle2d`'s `hold`, the effects file's `cap`, how many particles the page draws, each driver
of the file with its value now and a hold that drives it from the page, and a render2d folder (zoom,
where the camera looks, the background and the mosaic). Changes apply to the running page only;
"copy world.particle2d JSON" copies the values for the scene file, and "reset to the file" puts the
file's back.

## Playing it

```
yarn dev
```

then open `/games/demo_particle2d/dev.html`, or `/games/demo_particle2d/index.html` for the plain
game. Against its server:

```
yarn serve demo_particle2d
```

then open `/games/demo_particle2d/client.html`.
