import { OIcon } from "../icons/o-icon"
import { XIcon } from "../icons/x-icon"

type ScoreBoardProps = {
  x: number
  o: number
}

export function ScoreBoard({ x, o }: ScoreBoardProps) {
  return (
    <div className="grid w-full max-w-[320px] grid-cols-5">
      <div className="col-span-2 flex items-center rounded-md border border-slate-500 bg-slate-600">
        <div className="flex h-full flex-1 items-center justify-center rounded-tl-md rounded-bl-md bg-slate-700 text-xs uppercase opacity-70">
          <XIcon />
        </div>
        <div className="w-12 px-4 py-3 text-center font-bold text-2xl">{x}</div>
      </div>
      <div className="col-span-1 flex flex-col items-center justify-center">
        <span className="font-galindo text-4xl">x</span>
      </div>
      <div className="col-span-2 flex items-center rounded-md border border-slate-500 bg-slate-600">
        <div className="w-12 px-4 py-3 text-center font-bold text-2xl">{o}</div>
        <div className="flex h-full flex-1 items-center justify-center rounded-tr-md rounded-br-md bg-slate-700 text-xs uppercase opacity-70">
          <OIcon />
        </div>
      </div>
    </div>
  )
}
