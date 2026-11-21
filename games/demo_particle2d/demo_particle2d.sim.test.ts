// demo_particle2d, as a seat watches it: the manager booted as its page boots it and main loaded; from
// the first step every exhibit on the shelf plays its effect, the streams held on while the hall runs,
// the kite's comet riding the kite, and the shelf driving the fountain's pressure on the ledger row.
import { expect, test } from 'vitest'
import { boot, type Scene } from '#engine/engine.ts'
import { connection, load, manager } from '#addons/scenemanager/scenemanager.addon.ts'
import { sim } from './demo_particle2d.sim.ts'
import file from './demo_particle2d.scene.json' with { type: 'json' }
import defs from './assets/demo_particle2d.json' with { type: 'json' }

const DT = file.prefabs.engine.dt

test('a seat joins and every exhibit plays from the first step, the streams running on, the kite trailing its comet and the pressure driven', async () => {
  const truth = boot(file as Scene, sim)
  const room = (await load(truth, import.meta.url)).get('main')!
  connection(manager(truth), () => {})
  truth.step(DT)
  truth.step(DT)
  const ledger = () => room.rows.find(r => r.kind === 'particle2d')!.data
  for (const { effect } of defs.shelf.exhibits) expect(ledger().live.some((e: { effect: string }) => e.effect === effect)).toBe(true)
  const kite = room.rows.find(r => r.kind === 'kite')!
  expect(ledger().live.find((e: { id: number }) => e.id === kite.data.trail).from).toBe(kite.id)
  const pressure = ledger().drivers.pressure
  for (let i = 0; i < 300; i++) truth.step(DT)
  const streams = defs.shelf.exhibits.filter(x => x.stream).map(x => x.effect)
  for (const effect of streams) expect(ledger().live.filter((e: { effect: string }) => e.effect === effect)).toHaveLength(1)
  expect(ledger().drivers.pressure).not.toBe(pressure)
})
