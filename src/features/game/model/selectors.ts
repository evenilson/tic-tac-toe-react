import { useShallow } from "zustand/react/shallow"
import { useGame } from "./store"

export const useBoard = () => useGame((s) => s.history[s.step])
export const useStep = () => useGame((s) => s.step)
export const useVsCpu = () => useGame((s) => s.vsCpu)
export const useScore = () => useGame((s) => s.score)

export const useActions = () =>
  useGame(
    useShallow((s) => ({
      play: s.play,
      playAs: s.playAs,
      reset: s.reset,
      jump: s.jump,
      toggleCpu: s.toggleCpu,
      resetScore: s.resetScore,
    }))
  )
