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
export const HUMAN: Player = "X"

// AI preferences and scoring constants
export const PREFERRED_ORDER: number[] = [4, 0, 2, 6, 8, 1, 3, 5, 7]
export const WIN_SCORE_BASE = 10
export const CENTER_INDEX = 4
export const CORNER_INDICES: number[] = [0, 2, 6, 8]
export const HEURISTIC_WEIGHT_CPU_TWO = 3
export const HEURISTIC_WEIGHT_HUMAN_TWO = 2
export const HEURISTIC_BONUS_CENTER = 2
export const HEURISTIC_BONUS_CORNER = 1
export const MEDIUM_RANDOM_CHANCE = 0.25
export const EASY_BIAS_CHANCE = 0.7
