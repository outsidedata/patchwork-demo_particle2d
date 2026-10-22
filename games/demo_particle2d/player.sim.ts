// The row one seat possesses. `addons/player` spawns it, sends it to that seat alone, and writes the
// slot it gave the connection into `seat`. The hall plays itself, so the seat only watches: the row
// has no rule and no act.
import type { Kind } from '#engine/engine.ts'

export const player: Kind = {}
