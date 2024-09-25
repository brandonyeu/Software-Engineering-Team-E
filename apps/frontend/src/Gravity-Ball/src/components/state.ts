import { atom } from "recoil";

export enum GameState {
  initial = "initial",
  playing = "playing",
  lost = "lost",
  won = "won",
}

export const gameState = atom<GameState>({
  key: "game",
  default: GameState.initial,
});

export const levelState = atom<number>({
  key: "level",
  default: 0,
});

export const levelSeedState = atom<number>({
  key: "levelSeed",
  default: 0,
});

export const scoreState = atom<number>({
  key: "score",
  default: 0,
});

export const bestScoreState = atom<number>({
  key: "bestScore",
  default: 0,
});
