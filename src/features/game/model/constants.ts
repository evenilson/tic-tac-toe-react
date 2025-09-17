/** biome-ignore-all lint/style/noMagicNumbers: constants file */

import type { Board, Player } from "./types"

export const WINNING_COMBINATIONS: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

export const EMPTY_BOARD: Board = new Array(9).fill(null)
export const CPU: Player = "O"
export const HUMAN: Player = "O"
