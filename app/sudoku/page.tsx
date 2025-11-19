"use client";
import React, { useState } from "react";

const App: React.FC = () => {
  // Initialize empty 9x9 board
  const [board, setBoard] = useState<number[][]>(
    Array.from({ length: 9 }, () => Array(9).fill(0))
  );

  // Handle input change
  const handleChange = (row: number, col: number, value: string) => {
    const newBoard = board.map((r) => [...r]);
    const num = parseInt(value);
    newBoard[row][col] = isNaN(num) ? 0 : num;
    setBoard(newBoard);
  };

  // Check if number can be placed at board[row][col]
  const isSafe = (board: number[][], row: number, col: number, num: number) => {
    for (let x = 0; x < 9; x++) {
      if (board[row][x] === num || board[x][col] === num) return false;
    }
    const startRow = row - (row % 3);
    const startCol = col - (col % 3);
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
        if (board[startRow + i][startCol + j] === num) return false;
    return true;
  };

  // Backtracking solver
  const solveSudoku = (board: number[][]): boolean => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isSafe(board, row, col, num)) {
              board[row][col] = num;
              if (solveSudoku(board)) return true;
              board[row][col] = 0; // backtrack
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  // Solve button click
  const handleSolve = () => {
    const newBoard = board.map((r) => [...r]);
    if (solveSudoku(newBoard)) {
      setBoard(newBoard);
    } else {
      alert("No solution exists!");
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Sudoku Solver</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(9, 40px)",
          gap: "2px",
          justifyContent: "center",
        }}
      >
        {board.flatMap((row, r) =>
          row.map((num, c) => (
            <input
              key={`${r}-${c}`}
              type="text"
              value={num === 0 ? "" : num}
              onChange={(e) => handleChange(r, c, e.target.value)}
              style={{
                width: "40px",
                height: "40px",
                textAlign: "center",
                fontSize: "18px",
                border:
                  r % 3 === 2 && r !== 8
                    ? c % 3 === 2 && c !== 8
                      ? "2px solid black"
                      : "2px solid black"
                    : c % 3 === 2 && c !== 8
                    ? "2px solid black"
                    : "1px solid gray",
              }}
            />
          ))
        )}
      </div>
      <button
        onClick={handleSolve}
        style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px" }}
      >
        Solve
      </button>
    </div>
  );
};

export default App;
