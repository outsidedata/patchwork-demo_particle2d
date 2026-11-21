// The kinds of the hall and the main.scene.json file next to this one, drawn on render2d: a row of
// exhibits, each playing its effect from the first step, a kite trailing a comet, and a bouncer that
// throws up dust where it lands. Every number of a kind is its definition in
// `assets/demo_particle2d.json`, which the scene's `world.defs` names, and every effect, force generator
// and driver is in `assets/effects.json`, which `world.particle2d` names. The hall is render2d's world,
// whose points are the stage's: x grows to the right and y down, and a height lifts a thing up the screen.
import type { Scene, Sim } from '#engine/engine.ts'
import { scenemanager } from '#plugins/scenemanager/scenemanager.sim.ts'
import { loader } from '#plugins/loader/loader.sim.ts'
import { particle2d } from '#plugins/particle2d/particle2d.sim.ts'
import { player } from './player.sim.ts'
import { shelf } from './shelf.sim.ts'
import { kite } from './kite.sim.ts'
import { bouncer } from './bouncer.sim.ts'
import file from './main.scene.json' with { type: 'json' }

export const sim: Sim = { scenemanager, loader, particle2d, player, shelf, kite, bouncer }

export const scene = file as Scene
