"use client";

import React, { useState } from "react";

type Player = "X" | "O" | null;

const TickTockToe: React.FC = () => {
  const [squares, setSquares] = useState<Player[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const calculateWinner = (squares: Player[]): Player | null => {
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
    for (let [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i: number) => {
    if (squares[i] || calculateWinner(squares)) return;
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
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
};

export default TickTockToe;
