import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import { EMPTY_BOARD } from "./constants"
import { calculateWinner, isDraw, nextPlayer } from "./rules"
import type { Board, Player } from "./types"

type Score = { X: number; O: number; draws: number }

type State = {
  history: Board[]
  step: number
  vsCpu: boolean
  score: Score
}
type Actions = {
  play: (index: number) => void
  playAs: (index: number, who: Player) => void
  reset: () => void
  jump: (step: number) => void
  toggleCpu: () => void
  resetScore: () => void
}

export const useGame = create<State & Actions>()(
  devtools(
    persist(
      (set, get) => ({
        history: [EMPTY_BOARD],
        step: 0,
        vsCpu: false,
        score: { X: 0, O: 0, draws: 0 },

        play: (index) => {
          const { history, step, score } = get()
          const board = history[step]
          if (board[index] !== null) {
            return
          }
          if (calculateWinner(board)) {
            return
          }

          const next = board.slice()
          next[index] = nextPlayer(board)
          const newHistory = history.slice(0, step + 1).concat([next])

          // atualiza placar se terminou
          const win = calculateWinner(next)
          const draw = isDraw(next)

          const updates: Partial<State> = {
            history: newHistory,
            step: newHistory.length - 1,
          }

          if (win) {
            updates.score =
              win.winner === "X"
                ? { ...score, X: score.X + 1 }
                : { ...score, O: score.O + 1 }
          } else if (draw) {
            updates.score = { ...score, draws: score.draws + 1 }
          }

          set(updates, false, "game/play")
        },

        playAs: (index, who) => {
          const { history, step, score } = get()
          const board = history[step]
          if (board[index] !== null) {
            return
          }
          if (calculateWinner(board)) {
            return
          }

          const next = board.slice()
          next[index] = who
          const newHistory = history.slice(0, step + 1).concat([next])

          const win = calculateWinner(next)
          const draw = isDraw(next)

          const updates: Partial<State> = {
            history: newHistory,
            step: newHistory.length - 1,
          }

          if (win) {
            updates.score =
              win.winner === "X"
                ? { ...score, X: score.X + 1 }
                : { ...score, O: score.O + 1 }
          } else if (draw) {
            updates.score = { ...score, draws: score.draws + 1 }
          }

          set(updates, false, "game/playAs")
        },

        reset: () =>
          set({ history: [EMPTY_BOARD], step: 0 }, false, "game/reset"),

        jump: (s) =>
          set(
            (st) => ({ step: Math.max(0, Math.min(s, st.history.length - 1)) }),
            false,
            "game/jump"
          ),

        toggleCpu: () =>
          set((st) => ({ vsCpu: !st.vsCpu }), false, "game/toggleCpu"),

        resetScore: () =>
          set({ score: { X: 0, O: 0, draws: 0 } }, false, "game/resetScore"),
      }),
      { name: "ttt-state-v1" }
    )
  )
)
