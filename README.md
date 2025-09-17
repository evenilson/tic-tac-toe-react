# Tic-Tac-Toe React

Tic-Tac-Toe built with React + Vite featuring a configurable CPU (AI) with three difficulty levels.

## Requirements

- Node.js 18+ (or Bun if you prefer)

## Install

```bash
npm install
```

## Run (development)

```bash
npm run dev
```

Open `http://localhost:5173` (or the port shown in the terminal).

## Production build

```bash
npm run build
npm run preview
```

## Project structure

- `src/features/game/model`: rules, Zustand store, AI, and hooks
- `src/features/game/ui`: UI components (board, score, controls)
- `src/pages/tic-tac-toe-page.tsx`: main page

## AI (CPU)

- Strategy: Minimax with Alpha-Beta pruning, memoization, and heuristic tie-breaking
- Heuristic considers:
  - Center and corners
  - Two-in-a-row threats (CPU and human)

### Difficulty levels

- Easy: random moves with a slight bias to center/corners
- Medium: 75% optimal, 25% random biased to decent moves
- Hard: always optimal (at least a draw; very hard to beat)

AI-related constants live in `src/features/game/model/constants.ts`:
`PREFERRED_ORDER`, `WIN_SCORE_BASE`, `CENTER_INDEX`, `CORNER_INDICES`, weights and random chances.

## Accessibility & UX

- Restart game, reset score, and vs CPU toggle
- Visual feedback for winning line
- Cells include `aria-label`

## Scripts

- `npm run dev`: development server
- `npm run build`: production build
- `npm run preview`: serve local production build
