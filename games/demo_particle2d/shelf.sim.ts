// The hall's exhibits. The shelf's definition in `assets/demo_particle2d.json` lists them, each an
// `effect` of `assets/effects.json` and the point `at` it is thrown from, [x, the hall's floor, its
// height above the floor], with the `scale`, `dir` and `floor` it gives particle2d when it has them,
// and one of:
//   stream   the effect runs from the first step on without a break: it is emitted once, its entry's id
//            kept in the row's `held` by the exhibit's place in the list, and each step after its `life`
//            is kept the definition's `hold` seconds past its age.
//   every    the effect is one burst, thrown on the first step and again every `every` seconds.
// The row keeps the seconds since the scene began, `t`. Each step it also drives each driver of the
// definition's `drive` on particle2d's ledger row, so every seat's page plays by it: `name` swells from
// `low` to `high` and back over each `period` seconds, a cosine's wave.
import type { Kind } from '#engine/engine.ts'
import { def } from '#plugins/loader/loader.sim.ts'
import * as math from '#plugins/math/math.sim.ts'
import { drive, emit, entry, type Spawn } from '#plugins/particle2d/particle2d.sim.ts'

export type Exhibit = Spawn & { effect: string; at: number[]; stream?: boolean; every?: number }
type Wave = { low: number; high: number; period: number }

export const shelf: Kind = {
  tick(me, dt, w) {
    const d = me.data, k = def(w, me.kind)
    const was = d.t
    d.t += dt
    for (const [name, { low, high, period }] of Object.entries(k.drive as Record<string, Wave>))
      drive(w, name, low + (high - low) * (0.5 - 0.5 * math.cos((2 * Math.PI * d.t) / period)))
    ;(k.exhibits as Exhibit[]).forEach(({ effect, at, stream, every, ...spawn }, i) => {
      if (stream) {
        const held = d.held[i] ? entry(w, d.held[i]) : undefined
        if (held) held.life = held.age + k.hold
        else d.held = { ...d.held, [i]: emit(w, effect, at, { ...spawn, life: k.hold }).id }
        return
      }
      if (was > 0 && Math.floor(d.t / every!) === Math.floor(was / every!)) return
      emit(w, effect, at, spawn)
    })
  },
}
