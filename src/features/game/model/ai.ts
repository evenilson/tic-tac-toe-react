import { CPU, HUMAN, WINNING_COMBINATIONS } from "./constants"
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

function minimax(
  board: Board,
  player: Player
): { score: number; move?: number } {
  const w = winnerOf(board)
  if (w === CPU) {
    return { score: +10 }
  }
  if (w === HUMAN) {
    return { score: -10 }
  }
  if (isDraw(board)) {
    return { score: 0 }
  }

  const moves = available(board)
  if (player === CPU) {
    let best = {
      score: Number.NEGATIVE_INFINITY,
      move: undefined as number | undefined,
    }
    for (const m of moves) {
      const next = board.slice()
      next[m] = CPU
      const r = minimax(next, HUMAN)
      if (r.score > best.score) {
        best = { score: r.score, move: m }
      }
    }
    return best
  }
  let best = {
    score: Number.POSITIVE_INFINITY,
    move: undefined as number | undefined,
  }
  for (const m of moves) {
    const next = board.slice()
    next[m] = HUMAN
    const r = minimax(next, CPU)
    if (r.score < best.score) {
      best = { score: r.score, move: m }
    }
  }
  return best
}

export function bestCpuMove(board: Board): number | null {
  // biome-ignore lint/style/noMagicNumbers: preferences
  const pref = [4, 0, 2, 6, 8, 1, 3, 5, 7]
  const base = minimax(board, CPU)
  if (base.move == null) {
    return null
  }

  const eq: number[] = []
  for (const m of available(board)) {
    const next = board.slice()
    next[m] = CPU
    if (minimax(next, HUMAN).score === base.score) {
      eq.push(m)
    }
  }
  for (const p of pref) {
    if (eq.includes(p)) {
      return p
    }
  }
  return base.move
}
