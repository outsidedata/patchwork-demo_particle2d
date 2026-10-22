// The bouncer: it falls under its `gravity` from the height `y` its row starts at, and each time it
// reaches the floor it leaves it again at `bounce` a second and counts one more in `bounces`. Its
// numbers are its definition in `assets/demo_particle2d.json`, in the stage's units. The dust it
// throws up is its actor's, drawn in the page (`bouncer.client.ts`).
import type { Kind } from '#engine/engine.ts'
import { def } from '#plugins/loader/loader.sim.ts'

export const bouncer: Kind = {
  tick(me, dt, w) {
    const d = me.data, k = def(w, me.kind)
    d.vy -= k.gravity * dt
    d.y += d.vy * dt
    if (d.y > 0) return
    d.y = 0
    d.vy = k.bounce
    d.bounces++
  },
}
