// The bouncer: a disc of its `radius` and `colour` on render2d's `things` layer, standing on the
// point [`at`, `floor`] of the hall, its row's height `y` above it. The frame its row counts a
// bounce more than this page has seen, it asks particle2d in this page for its `dust` where it
// landed, coming to rest on the floor; the rule never hears of it.
import type { Row } from '#engine/engine.ts'
import type { Plugins } from '#engine/browser.ts'
import { def } from '#plugins/loader/loader.sim.ts'

let disc: any
let seen = 0

export function setup(row: Row, plugins: Plugins) {
  const { PIXI } = plugins.render2d
  const k = def(plugins.wire, row.kind)
  disc = new PIXI.Graphics().circle(0, 0, k.radius).fill(k.colour)
  plugins.render2d.layer('things').addChild(disc)
  seen = row.data.bounces
}

export function tick(row: Row, plugins: Plugins) {
  const k = def(plugins.wire, row.kind)
  disc.position.set(...plugins.render2d.place([k.at[0], k.floor, row.data.y + k.radius]))
  if (row.data.bounces <= seen) return
  seen = row.data.bounces
  plugins.particle2d.emit(k.dust, [k.at[0], k.floor], { floor: 0 })
}

export function remove() {
  disc.destroy()
}
