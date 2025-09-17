import { StepForwardIcon } from "lucide-react"
import { cn } from "@/utils/cn"

type ControlsProps = {
  onReset: () => void
  onResetScore: () => void
  vsCpu: boolean
  onToggleCpu: () => void
  difficulty: "easy" | "medium" | "hard"
  onChangeDifficulty: (d: "easy" | "medium" | "hard") => void
}

export function Controls({
  onReset,
  onResetScore,
  vsCpu,
  onToggleCpu,
  difficulty,
  onChangeDifficulty,
}: ControlsProps) {
  return (
    <div className="flex w-full max-w-[320px] flex-col items-center gap-2">
      <button
        className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border bg-white px-3 py-2 text-black"
        onClick={onReset}
        type="button"
      >
        <StepForwardIcon />
        Restart Game
      </button>
      <button
        className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border bg-slate-800 px-3 py-2 text-white"
        onClick={onResetScore}
        type="button"
      >
        Reset Score
      </button>

      <label className="inline-flex items-center gap-2">
        <input checked={vsCpu} onChange={onToggleCpu} type="checkbox" />
        vs CPU (O)
      </label>

      <div
        className={cn(
          "flex w-full items-center justify-between gap-2",
          !vsCpu && "opacity-50"
        )}
      >
        <label className="text-sm" htmlFor="difficulty">
          Difficulty
        </label>
        <select
          aria-label="Difficulty"
          className="flex-1 rounded-md border bg-white px-2 py-1 text-black"
          disabled={!vsCpu}
          id="difficulty"
          onChange={(e) =>
            onChangeDifficulty(e.target.value as "easy" | "medium" | "hard")
          }
          value={difficulty}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
    </div>
  )
}
