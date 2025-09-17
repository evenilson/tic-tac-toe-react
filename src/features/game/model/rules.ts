import { WINNING_COMBINATIONS } from "./constants"
import type { Board, Player } from "./types"

export function nextPlayer(board: Board): Player {
  const x = board.filter((c) => c === "X").length
  const o = board.filter((c) => c === "O").length

  return x === o ? "X" : "O"
}

export function calculateWinner(
  board: Board
): { winner: Player; line: number[] } | null {
  for (const [a, b, c] of WINNING_COMBINATIONS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as Player, line: [a, b, c] }
    }
  }

  return null
}

export function isDraw(board: Board): boolean {
  return !calculateWinner(board) && board.every((c) => c !== null)
}
