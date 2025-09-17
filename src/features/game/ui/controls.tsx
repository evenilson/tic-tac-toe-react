import { StepForwardIcon } from "lucide-react"

type ControlsProps = {
  onReset: () => void
  onResetScore: () => void
  vsCpu: boolean
  onToggleCpu: () => void
}

export function Controls({
  onReset,
  onResetScore,
  vsCpu,
  onToggleCpu,
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
    </div>
  )
}
