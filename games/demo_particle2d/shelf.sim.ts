// The hall's exhibits. The shelf's definition in `assets/demo_particle2d.json` lists them, each an
// `effect` in `assets/effects2d.json`, the point `at` it fires from, [x, the hall's floor, its
// height above the floor], and how many seconds apart it fires (`every`), with the `life`, `dir`,
// `scale` and `floor` it gives particle2d when it has them. The row keeps the seconds since the scene
// began, `t`, and each step fires every exhibit whose period that step starts: all of them on the
// first step, then each on every multiple of its `every`. An exhibit whose `life` is its `every` runs
// without a break.
import type { Kind } from '#engine/engine.ts'
import { def } from '#plugins/loader/loader.sim.ts'
import { emit, type Spawn } from '#plugins/particle2d/particle2d.sim.ts'

export type Exhibit = Spawn & { effect: string; at: number[]; every: number }

export const shelf: Kind = {
  tick(me, dt, w) {
    const was = me.data.t
    me.data.t += dt
    for (const { effect, at, every, ...spawn } of def(w, me.kind).exhibits as Exhibit[]) {
      if (was > 0 && Math.floor(me.data.t / every) === Math.floor(was / every)) continue
      emit(w, effect, at, spawn)
    }
  },
}
