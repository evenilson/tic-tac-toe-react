import {
  CENTER_INDEX,
  CORNER_INDICES,
  CPU,
  EASY_BIAS_CHANCE,
  HEURISTIC_BONUS_CENTER,
  HEURISTIC_BONUS_CORNER,
  HEURISTIC_WEIGHT_CPU_TWO,
  HEURISTIC_WEIGHT_HUMAN_TWO,
  HUMAN,
  MEDIUM_RANDOM_CHANCE,
  PREFERRED_ORDER,
  WIN_SCORE_BASE,
  WINNING_COMBINATIONS,
} from "./constants"
import type { Board, Player } from "./types"

function winnerOf(board: Board): Player | null {
  for (const [a, b, c] of WINNING_COMBINATIONS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a] as Player
    }
  }
  return null
}

function isDraw(board: Board) {
  return !winnerOf(board) && board.every((c) => c !== null)
}

function available(board: Board) {
  return board.flatMap((c, i) => (c === null ? i : []))
}

// Preference and scoring constants come from constants.ts

function keyFor(board: Board, player: Player): string {
  // Board uniquely determines depth; no need to include depth in key
  return `${board.join("")}|${player}`
}

const cache = new Map<string, { score: number; move?: number }>()

function computeDepth(board: Board): number {
  return board.reduce((acc, c) => (c === null ? acc : acc + 1), 0)
}

function terminalScore(board: Board): number | null {
  const depth = computeDepth(board)
  const w = winnerOf(board)
  if (w === CPU) {
    return WIN_SCORE_BASE - depth
  }
  if (w === HUMAN) {
    return depth - WIN_SCORE_BASE
  }
  if (isDraw(board)) {
    return 0
  }
  return null
}

function orderedMoves(board: Board): number[] {
  const moves = available(board)
  return PREFERRED_ORDER.filter((m) => moves.includes(m))
}

function heuristicForMove(board: Board, move: number): number {
  const next = board.slice()
  next[move] = CPU
  let cpuTwoInRow = 0
  let humanTwoInRow = 0
  for (const [a, b, c] of WINNING_COMBINATIONS) {
    const line = [next[a], next[b], next[c]]
    const cpuCount = line.filter((v) => v === CPU).length
    const humanCount = line.filter((v) => v === HUMAN).length
    const emptyCount = line.filter((v) => v === null).length
    if (cpuCount === 2 && emptyCount === 1) {
      cpuTwoInRow += 1
    }
    if (humanCount === 2 && emptyCount === 1) {
      humanTwoInRow += 1
    }
  }
  const centerBonus = move === CENTER_INDEX ? HEURISTIC_BONUS_CENTER : 0
  const cornerBonus = CORNER_INDICES.includes(move) ? HEURISTIC_BONUS_CORNER : 0
  return (
    cpuTwoInRow * HEURISTIC_WEIGHT_CPU_TWO +
    humanTwoInRow * HEURISTIC_WEIGHT_HUMAN_TWO +
    centerBonus +
    cornerBonus
  )
}

function searchMax(board: Board, alpha: number, beta: number) {
  let bestScore = Number.NEGATIVE_INFINITY
  let bestMove: number | undefined
  let localAlpha = alpha
  for (const m of orderedMoves(board)) {
    const next = board.slice()
    next[m] = CPU
    const { score } = minimaxAlphaBeta(next, HUMAN, localAlpha, beta)
    if (score > bestScore) {
      bestScore = score
      bestMove = m
    }
    localAlpha = Math.max(localAlpha, bestScore)
    if (beta <= localAlpha) {
      break
    }
  }
  return { score: bestScore, move: bestMove }
}

function searchMin(board: Board, alpha: number, beta: number) {
  let bestScore = Number.POSITIVE_INFINITY
  let bestMove: number | undefined
  let localBeta = beta
  for (const m of orderedMoves(board)) {
    const next = board.slice()
    next[m] = HUMAN
    const { score } = minimaxAlphaBeta(next, CPU, alpha, localBeta)
    if (score < bestScore) {
      bestScore = score
      bestMove = m
    }
    localBeta = Math.min(localBeta, bestScore)
    if (localBeta <= alpha) {
      break
    }
  }
  return { score: bestScore, move: bestMove }
}

function minimaxAlphaBeta(
  board: Board,
  player: Player,
  alpha: number,
  beta: number
): { score: number; move?: number } {
  const term = terminalScore(board)
  if (term !== null) {
    return { score: term }
  }

  const cacheKey = keyFor(board, player)
  const cached = cache.get(cacheKey)
  if (cached) {
    return { score: cached.score, move: cached.move }
  }

  const result =
    player === CPU
      ? searchMax(board, alpha, beta)
      : searchMin(board, alpha, beta)

  cache.set(cacheKey, { score: result.score, move: result.move })
  return result
}

export function bestCpuMove(board: Board): number | null {
  // Evaluate once and gather all equally optimal moves
  const result = minimaxAlphaBeta(
    board,
    CPU,
    Number.NEGATIVE_INFINITY,
    Number.POSITIVE_INFINITY
  )

  const moves = available(board)
  if (moves.length === 0) {
    return null
  }
  const scoresByMove = new Map<number, number>()
  for (const m of moves) {
    const next = board.slice()
    next[m] = CPU
    const r = minimaxAlphaBeta(
      next,
      HUMAN,
      Number.NEGATIVE_INFINITY,
      Number.POSITIVE_INFINITY
    )
    scoresByMove.set(m, r.score)
  }

  const bestScore = Math.max(...Array.from(scoresByMove.values()))
  const bestMoves = Array.from(scoresByMove.entries())
    .filter(([, s]) => s === bestScore)
    .map(([m]) => m)

  if (bestMoves.length > 1) {
    bestMoves.sort((a, b) => {
      const hb = heuristicForMove(board, b)
      const ha = heuristicForMove(board, a)
      if (hb !== ha) {
        return hb - ha
      }
      return PREFERRED_ORDER.indexOf(a) - PREFERRED_ORDER.indexOf(b)
    })
    return bestMoves.at(-1) || null
  }
  if (bestMoves.length === 1) {
    return bestMoves[0]
  }
  // Fallbacks to ensure we never return undefined
  if (bestMoves.length > 0) {
    return bestMoves[0]
  }
  if (result.move != null) {
    return result.move
  }
  return moves[0] ?? null
}

export function bestCpuMoveWithDifficulty(
  board: Board,
  difficulty: "easy" | "medium" | "hard"
): number | null {
  const moves = available(board)
  if (moves.length === 0) {
    return null
  }
  if (difficulty === "hard") {
    // Hard+: pick the optimal move, break ties with heuristic
    return bestCpuMove(board)
  }
  if (difficulty === "easy") {
    // Easy+: prefer center/corners but keep randomness
    const ordered = PREFERRED_ORDER.filter((m) => moves.includes(m))
    const sample = Math.random() < EASY_BIAS_CHANCE ? ordered : moves
    return sample[Math.floor(Math.random() * sample.length)] ?? null
  }
  // medium: mostly optimal, sometimes random to be beatable
  if (Math.random() < MEDIUM_RANDOM_CHANCE) {
    // When random, bias towards decent moves
    const ordered = PREFERRED_ORDER.filter((m) => moves.includes(m))
    const top = ordered.slice(0, Math.max(1, Math.ceil(ordered.length / 2)))
    const pool = top.length > 0 ? top : moves
    return pool[Math.floor(Math.random() * pool.length)] ?? null
  }
  return bestCpuMove(board)
}
