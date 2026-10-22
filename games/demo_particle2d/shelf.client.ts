// The hall's ground and plinths, on render2d's `ground` layer: a band of the shelf's `ground` colour
// from its `floor` down to the bottom of the canvas, and a plinth of its `plinth` standing on the
// floor under each exhibit it lists. The hall's world is the stage's pixels. The effects are
// particle2d's.
import type { Row } from '#engine/engine.ts'
import type { Plugins } from '#engine/browser.ts'
import { def } from '#plugins/loader/loader.sim.ts'
import type { Exhibit } from './shelf.sim.ts'

let drawn: any

export function setup(row: Row, plugins: Plugins) {
  const { PIXI } = plugins.render2d
  const { floor, ground, plinth, exhibits } = def(plugins.wire, row.kind)
  const { width, height } = plugins.wire.scene.prefabs.engine
  drawn = new PIXI.Graphics().rect(0, floor, width, height - floor).fill(ground)
  for (const { at } of exhibits as Exhibit[]) drawn.rect(at[0] - plinth.width / 2, floor - plinth.height, plinth.width, plinth.height).fill(plinth.colour)
  plugins.render2d.layer('ground').addChild(drawn)
}

export function tick() {}

export function remove() {
  drawn.destroy()
}
