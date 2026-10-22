// The kite: it goes round a circle of `radius` about `centre` on the stage, `speed` radians a
// second, and its trail is one particle2d effect spawned `from` it, so every page draws it on the
// kite for as long as the kite is here. `trail` is the entry's id, 0 until it is emitted. Its
// numbers are its definition in `assets/demo_particle2d.json`.
import type { Kind } from '#engine/engine.ts'
import { def } from '#plugins/loader/loader.sim.ts'
import { emit } from '#plugins/particle2d/particle2d.sim.ts'
import * as math from '#plugins/math/math.sim.ts'

export const kite: Kind = {
  tick(me, dt, w) {
    const d = me.data, k = def(w, me.kind)
    d.angle += k.speed * dt
    d.pos = [k.centre[0] + k.radius * math.cos(d.angle), k.centre[1] + k.radius * math.sin(d.angle)]
    if (!d.trail) d.trail = emit(w, k.effect, d.pos, { from: me.id }).id
  },
}
