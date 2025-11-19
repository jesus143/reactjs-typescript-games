"use client";

import React, { useMemo, useState } from "react";
import Chessboard from "chessboardjsx";
import { Chess } from "chess.js";

interface ChessProblem {
  id: number;
  fen: string;
  solution: string[]; // moves in UCI notation (e.g. "d2d4")
  prompt: string;
}

const problems: ChessProblem[] = [
  {
    id: 1,
    fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
    solution: ["d2d4", "e5d4", "c2c3"],
    prompt: "Break open the center with three precise moves.",
  },
  {
    id: 2,
    fen: "8/8/8/3k4/3P4/8/3K4/8 w - - 0 1",
    solution: ["d4d5", "d5d6", "d6d7", "d7d8q"],
    prompt: "Push the passed pawn all the way to promotion.",
  },
];

const ChessProblems: React.FC = () => {
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [chess, setChess] = useState(() => new Chess(problems[0].fen));
  const [moveIndex, setMoveIndex] = useState(0);
  const [status, setStatus] = useState<string>("Make the first move.");

  const currentProblem = useMemo(
    () => problems[currentProblemIndex],
    [currentProblemIndex]
  );

  const resetProblem = (problemIndex = currentProblemIndex) => {
    const problem = problems[problemIndex];
    setChess(new Chess(problem.fen));
    setMoveIndex(0);
    setStatus("Make the first move.");
  };

  const handleMove = (move: { sourceSquare: string; targetSquare: string }) => {
    const expectedMove = currentProblem.solution[moveIndex];
    const attemptedMove = `${move.sourceSquare}${move.targetSquare}`;
    const game = new Chess(chess.fen());
    const result = game.move({
      from: move.sourceSquare,
      to: move.targetSquare,
      promotion: "q",
    });

    if (!result) {
      setStatus("Illegal move. Try again.");
      return false;
    }

    if (attemptedMove !== expectedMove) {
      setStatus("That's not the puzzle move. Try again.");
      return false;
    }

    setChess(game);
    const nextMoveIndex = moveIndex + 1;
    if (nextMoveIndex >= currentProblem.solution.length) {
      setStatus("Puzzle solved! Great job.");
    } else {
      setStatus(
        `Nice! Move ${nextMoveIndex + 1} of ${currentProblem.solution.length}.`
      );
    }
    setMoveIndex(nextMoveIndex);
    return true;
  };

  const nextProblem = () => {
    const nextIndex = (currentProblemIndex + 1) % problems.length;
    setCurrentProblemIndex(nextIndex);
    resetProblem(nextIndex);
  };

  const previousProblem = () => {
    const prevIndex =
      currentProblemIndex === 0 ? problems.length - 1 : currentProblemIndex - 1;
    setCurrentProblemIndex(prevIndex);
    resetProblem(prevIndex);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Chess Problem #{currentProblem.id}</h2>
      <p>{currentProblem.prompt}</p>
      <p>{status}</p>
      <Chessboard
        width={420}
        position={chess.fen()}
        onDrop={({ sourceSquare, targetSquare }) =>
          handleMove({ sourceSquare, targetSquare })
        }
      />
      <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "20px" }}>
        <button onClick={previousProblem}>Previous</button>
        <button onClick={() => resetProblem()}>Reset</button>
        <button onClick={nextProblem}>Next</button>
      </div>
    </div>
  );
};

export default ChessProblems;
