import { useEffect } from "react"
import { bestCpuMove } from "./ai"
import { CPU } from "./constants"
import { calculateWinner, isDraw, nextPlayer } from "./rules"
import { useActions, useBoard, useVsCpu } from "./selectors"

export function useCpuAutoPlay(delayMs = 160) {
  const board = useBoard()
  const vsCpu = useVsCpu()
  const { playAs } = useActions()
  const win = calculateWinner(board)
  const draw = isDraw(board)
  const turn = nextPlayer(board)

  useEffect(() => {
    if (!vsCpu || win || draw || turn !== CPU) {
      return
    }
    const id = setTimeout(() => {
      const move = bestCpuMove(board)
      if (move != null) {
        playAs(move, CPU)
      }
    }, delayMs)
    return () => clearTimeout(id)
  }, [vsCpu, win, draw, turn, board, playAs, delayMs])
}
