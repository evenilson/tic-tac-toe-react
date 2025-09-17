import { cn } from "@/utils/cn"
import { OIcon, XIcon } from "../icons"
import type { Board as BoardType } from "../model"

export function GameBoard({
  board,
  winningLine,
  disabled,
  onPlay,
}: {
  board: BoardType
  winningLine: number[]
  disabled: boolean
  onPlay: (index: number) => void
}) {
  return (
    <div
      className="grid grid-cols-3 gap-4 rounded-lg bg-slate-600 p-4"
      style={{ width: 320 }}
    >
      {board.map((cell, i) => {
        const isWin = winningLine.includes(i)
        return (
          <button
            aria-label={`Célula ${i + 1}: ${cell ?? "vazia"}`}
            className={cn(
              "aspect-square rounded-lg bg-slate-800 font-bold text-3xl shadow-lg shadow-slate-900 hover:bg-slate-900",
              disabled && "bg-slate-900",
              isWin &&
                "border-4 border-green-300 motion-safe:animate-[spin_1s_linear_1]",
              disabled && !isWin && "opacity-50"
            )}
            disabled={disabled || cell !== null}
            // biome-ignore lint/suspicious/noArrayIndexKey: is safe
            key={i}
            onClick={() => !disabled && onPlay(i)}
            type="button"
          >
            <div className="flex h-full w-full items-center justify-center p-4 *:h-full *:w-full">
              {cell === "O" && <OIcon />}
              {cell === "X" && <XIcon />}
            </div>
          </button>
        )
      })}
    </div>
  )
}
