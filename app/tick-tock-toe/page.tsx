"use client";

import React, { useState } from "react";

type Player = "X" | "O" | null;

export default function TickPage() {
  const [squares, setSquares] = useState<Player[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const calculateWinner = (currentSquares: Player[]): Player | null => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const [a, b, c] of lines) {
      if (
        currentSquares[a] &&
        currentSquares[a] === currentSquares[b] &&
        currentSquares[a] === currentSquares[c]
      ) {
        return currentSquares[a];
      }
    }
    return null;
  };

  const handleClick = (index: number) => {
    if (squares[index] || calculateWinner(squares)) return;
    const nextSquares = squares.slice();
    nextSquares[index] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  const winner = calculateWinner(squares);
  const status = winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? "Draw!"
    : `Next player: ${xIsNext ? "X" : "O"}`;

  const squareStyle: React.CSSProperties = {
    width: "60px",
    height: "60px",
    fontSize: "24px",
    margin: "3px",
    cursor: "pointer",
  };

  const rowStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    marginBottom: "5px",
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px", fontFamily: "Arial, sans-serif" }}>
      <h1>Tic-Tac-Toe</h1>
      <h2>{status}</h2>
      <div style={rowStyle}>
        {squares.slice(0, 3).map((value, idx) => (
          <button key={idx} style={squareStyle} onClick={() => handleClick(idx)}>
            {value}
          </button>
        ))}
      </div>
      <div style={rowStyle}>
        {squares.slice(3, 6).map((value, idx) => (
          <button key={idx + 3} style={squareStyle} onClick={() => handleClick(idx + 3)}>
            {value}
          </button>
        ))}
      </div>
      <div style={rowStyle}>
        {squares.slice(6, 9).map((value, idx) => (
          <button key={idx + 6} style={squareStyle} onClick={() => handleClick(idx + 6)}>
            {value}
          </button>
        ))}
      </div>
      <button onClick={resetGame} style={{ marginTop: "10px", padding: "8px 16px" }}>
        Reset Game
      </button>
    </div>
  );
}
 
