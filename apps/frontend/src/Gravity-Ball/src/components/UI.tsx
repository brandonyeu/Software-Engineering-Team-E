import React, { useCallback, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  gameState,
  GameState,
  levelSeedState,
  levelState,
  scoreState,
  bestScoreState,
} from "./state";

export const UI = () => {
  const [_gameState, setGameState] = useRecoilState(gameState);
  const setLevel = useSetRecoilState(levelState);
  const setLevelSeed = useSetRecoilState(levelSeedState);
  const [score, setScore] = useRecoilState(scoreState);
  const [bestScore, setBestScore] = useRecoilState(bestScoreState); // Use Recoil state for best score

  const initial = _gameState === GameState.initial;
  const lost = _gameState === GameState.lost;
  const won = _gameState === GameState.won;
  const skip = !initial && !lost && !won;

  const start = useCallback(() => {
    if (won) {
      setLevel((l) => l + 1);
    }
    setGameState(GameState.playing);
  }, [won, setLevel, setGameState]);

  useEffect(() => {
    if (won) {
      setScore((prevScore) => prevScore + 1);
    }
  }, [won, setScore]);

  useEffect(() => {
    if (lost) {
      if (score >= bestScore) { // Update best score if current score equals or surpasses best score
        setBestScore(score);
      }
      setScore(0);
    }
  }, [lost, score, bestScore, setScore, setBestScore]);


  const regenerateLevel = () => {
    setLevelSeed((seed) => seed + 1);
  };

  useEffect(() => {
    if (skip) {
      return;
    }

    const onKeyDown = (e) => {
      if (e.code === "Space") {
        start();
      }
    };

    document.addEventListener("keydown", onKeyDown, { passive: true });

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [skip, start]);

  if (skip) {
    return null;
  }

  return (
    <div className="absolute inset-0 z-20 bg-white/80 p-12 flex flex-col text-center items-center justify-between">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl text-black font-bold mb-8">
          Gravity Ball
        </h1>
        <div className="text-lg md:text-xl text-gray-600 mb-12">
          Use arrow keys or WASD to move and click "Play" or press
          space to start
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        {won && (
          <div className="text-2xl text-green-600 font-bold mb-4">
            Congratulations, You Won!
          </div>
        )}
        {lost && (
          <div className="text-2xl text-red-600 font-bold mb-4">
            Game Over, You Lost!
          </div>
        )}

        <div className="text-xl md:text-2xl text-black font-bold mb-4">
          Score: {score}
        </div>
        <div className="text-xl md:text-2xl text-black font-bold mb-4">
          Best Score: {bestScore}
        </div>
        <button
          onClick={start}
          className="uppercase text-xl md:text-2xl bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out mb-8"
        >
          Play
        </button>

        {lost && (
          <button
            onClick={regenerateLevel}
            className="uppercase text-xl md:text-2xl bg-gray-700 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out"
          >
            Regenerate Level
          </button>
        )}
      </div>
    </div>
  );
};
