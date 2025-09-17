import {
  calculateWinner,
  isDraw,
  nextPlayer,
  useActions,
  useBoard,
  useCpuAutoPlay,
  useDifficulty,
  useScore,
  useVsCpu,
} from "@/features/game/model"
import { Controls, GameBoard, ScoreBoard, Status } from "@/features/game/ui"

const DELAY_CPU = 160

export function TicTacToePage() {
  const board = useBoard()
  const vsCpu = useVsCpu()
  const score = useScore()
  const { play, reset, resetScore, toggleCpu, setDifficulty } = useActions()
  const difficulty = useDifficulty()

  const win = calculateWinner(board)
  const draw = isDraw(board)
  const turn = nextPlayer(board)

  useCpuAutoPlay(DELAY_CPU)

  return (
    <div className="mx-auto flex h-full max-h-dvh max-w-sm flex-col justify-center p-4">
      <div className="flex flex-col items-center space-y-3">
        <h1 className="mb-10 font-bold font-galindo text-7xl tracking-wider">
          TicTacToe
        </h1>
        <ScoreBoard o={score.O} x={score.X} />
        <div className="my-4 flex w-full flex-col items-center">
          <Status draw={draw} turn={turn} win={win} />
          <GameBoard
            board={board}
            disabled={!!win || draw || (vsCpu && turn === "O")}
            onPlay={play}
            winningLine={win?.line ?? []}
          />
        </div>
        <Controls
          onReset={reset}
          onResetScore={resetScore}
          onToggleCpu={toggleCpu}
          vsCpu={vsCpu}
          difficulty={difficulty}
          onChangeDifficulty={setDifficulty}
        />
      </div>
    </div>
  )
}
