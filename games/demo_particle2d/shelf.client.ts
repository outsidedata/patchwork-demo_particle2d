// The hall's floor and plinths, on render2d's `ground` layer: a band of the shelf's `ground` colour from
// its `floor` down to the bottom of the canvas under a line of its `edge` colour, and a plinth of its
// `plinth` standing on the floor under each exhibit it lists, its top a band of the plinth's `top`. The
// hall's world is the stage's pixels. The effects are particle2d's.
import type { Row } from '#engine/engine.ts'
import type { Plugins } from '#engine/browser.ts'
import { def } from '#plugins/loader/loader.sim.ts'
import type { Exhibit } from './shelf.sim.ts'

let drawn: any

export function setup(row: Row, plugins: Plugins) {
  const { PIXI } = plugins.render2d
  const { floor, ground, edge, plinth, exhibits } = def(plugins.wire, row.kind)
  const { width, height } = plugins.wire.scene.prefabs.engine
  drawn = new PIXI.Graphics().rect(0, floor, width, height - floor).fill(ground).rect(0, floor, width, 3).fill(edge)
  for (const { at } of exhibits as Exhibit[]) {
    const x = at[0] - plinth.width / 2, y = floor - plinth.height
    drawn.rect(x, y, plinth.width, plinth.height).fill(plinth.colour).rect(x, y, plinth.width, 6).fill(plinth.top)
  }
  plugins.render2d.layer('ground').addChild(drawn)
}

export function tick() {}

export function remove() {
  drawn.destroy()
}
