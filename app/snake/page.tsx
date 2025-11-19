"use client";

import React, { useState, useEffect, useRef } from "react";

const BOARD_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 0, y: -1 }; // moving up initially

type Position = { x: number; y: number };

const App: React.FC = () => {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Position>(INITIAL_DIRECTION);
  const [food, setFood] = useState<Position>(getRandomFood(INITIAL_SNAKE));
  const [gameOver, setGameOver] = useState(false);
  const [speed, setSpeed] = useState(200);

  const moveSnake = () => {
    const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // Check collision with walls
    if (
      newHead.x < 0 ||
      newHead.y < 0 ||
      newHead.x >= BOARD_SIZE ||
      newHead.y >= BOARD_SIZE ||
      snake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)
    ) {
      setGameOver(true);
      return;
    }

    let newSnake = [newHead, ...snake];

    // Check if food eaten
    if (newHead.x === food.x && newHead.y === food.y) {
      setFood(getRandomFood(newSnake));
      // optionally increase speed
      setSpeed((prev) => Math.max(50, prev - 5));
    } else {
      newSnake.pop(); // remove tail if not eating
    }

    setSnake(newSnake);
  };

  // Game loop
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(moveSnake, speed);
    return () => clearInterval(interval);
  }, [snake, direction, speed, gameOver]);

  // Keyboard controls
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [direction]);

  const handleRestart = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(getRandomFood(INITIAL_SNAKE));
    setGameOver(false);
    setSpeed(200);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Snake Game</h1>
      {gameOver && (
        <div>
          <h2>Game Over!</h2>
          <button onClick={handleRestart}>Restart</button>
        </div>
      )}
      <div
        style={{
          display: "grid",
          gridTemplateRows: `repeat(${BOARD_SIZE}, 20px)`,
          gridTemplateColumns: `repeat(${BOARD_SIZE}, 20px)`,
          margin: "20px auto",
          border: "2px solid black",
        }}
      >
        {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, idx) => {
          const x = idx % BOARD_SIZE;
          const y = Math.floor(idx / BOARD_SIZE);
          const isSnake = snake.some((s) => s.x === x && s.y === y);
          const isFood = food.x === x && food.y === y;
          return (
            <div
              key={idx}
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: isSnake ? "green" : isFood ? "red" : "white",
                border: "1px solid #ccc",
              }}
            />
          );
        })}
      </div>
      <p>Use arrow keys to move the snake</p>
    </div>
  );
};

// Generate food position not on snake
function getRandomFood(snake: Position[]): Position {
  let position: Position;
  do {
    position = {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE),
    };
  } while (snake.some((s) => s.x === position.x && s.y === position.y));
  return position;
}

export default App;
