// demo_particle2d, as a seat watches it: the manager booted as its page boots it and main loaded; on
// the first step every exhibit on the shelf fires its effect, and the kite's trail rides the kite.
import { expect, test } from 'vitest'
import { boot, type Scene } from '#engine/engine.ts'
import { connection, load, manager } from '#addons/scenemanager/scenemanager.addon.ts'
import { sim } from './demo_particle2d.sim.ts'
import file from './demo_particle2d.scene.json' with { type: 'json' }
import defs from './assets/demo_particle2d.json' with { type: 'json' }

const DT = file.prefabs.engine.dt

test('a seat joins and the hall fires every exhibit, with the kite trailing its effect', async () => {
  const truth = boot(file as Scene, sim)
  const room = (await load(truth, import.meta.url)).get('main')!
  connection(manager(truth), () => {})
  truth.step(DT)
  truth.step(DT)
  const live = room.rows.find(r => r.kind === 'particle2d')!.data.live
  for (const { effect } of defs.shelf.exhibits) expect(live.some((e: { effect: string }) => e.effect === effect)).toBe(true)
  const kite = room.rows.find(r => r.kind === 'kite')!
  expect(live.find((e: { id: number }) => e.id === kite.data.trail).from).toBe(kite.id)
})
