// The kite: a disc of its `size` and `colour` at the row's `pos`, on render2d's `things` layer. Its
// trail is particle2d's, following the entry its rule moves.
import type { Row } from '#engine/engine.ts'
import type { Plugins } from '#engine/browser.ts'
import { def } from '#plugins/loader/loader.sim.ts'

let disc: any

export function setup(row: Row, plugins: Plugins) {
  const { PIXI } = plugins.render2d
  const k = def(plugins.wire, row.kind)
  disc = new PIXI.Graphics().circle(0, 0, k.size).fill(k.colour)
  plugins.render2d.layer('things').addChild(disc)
}

export function tick(row: Row, plugins: Plugins) {
  disc.position.set(...plugins.render2d.place(row.data.pos))
}

export function remove() {
  disc.destroy()
}
