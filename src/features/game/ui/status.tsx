import type { Player } from "../model"

type StatusProps = {
  win: { winner: Player; line: number[] } | null
  draw: boolean
  turn: Player
}

export function Status({ win, draw, turn }: StatusProps) {
  if (win) {
    return <strong className="font-galindo text-2xl">{win.winner} Won</strong>
  }

  if (draw) {
    return <strong className="font-galindo text-2xl">Draw</strong>
  }

  return <p className="font-galindo text-2xl">{turn} Turn</p>
}
