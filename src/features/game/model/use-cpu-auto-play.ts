import { useEffect } from "react"
import { bestCpuMoveWithDifficulty } from "./ai"
import { CPU } from "./constants"
import { calculateWinner, isDraw, nextPlayer } from "./rules"
import { useActions, useBoard, useDifficulty, useVsCpu } from "./selectors"

export function useCpuAutoPlay(delayMs = 160) {
  const board = useBoard()
  const vsCpu = useVsCpu()
  const difficulty = useDifficulty()
  const { playAs } = useActions()
  const win = calculateWinner(board)
  const draw = isDraw(board)
  const turn = nextPlayer(board)

  useEffect(() => {
    if (!vsCpu || win || draw || turn !== CPU) {
      return
    }
    const id = setTimeout(() => {
      const move = bestCpuMoveWithDifficulty(board, difficulty)
      if (move != null) {
        playAs(move, CPU)
      }
    }, delayMs)
    return () => clearTimeout(id)
  }, [vsCpu, win, draw, turn, board, playAs, delayMs, difficulty])
}
