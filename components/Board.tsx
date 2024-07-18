import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Square from './Square';

type SquareType = {
  id: string;
  value: string | null;
};

type Board = {
  size: number;
};

const Board: React.FC<Board> = ({ size }) => {
  const [squares, setSquares] = useState<SquareType[]>([]);
  const [playerNext, setPlayerNext] = useState(true);

  useEffect(() => {
    const initialSquares: SquareType[] = Array.from({ length: size * size }, () => ({
      id: uuidv4(),
      value: null
    }));
    setSquares(initialSquares);
  }, [size]);

  const handleClick = (index: number) => {
    const newSquares = squares.slice();
    if (checkWinner(newSquares, size) || newSquares[index].value) {
      return;
    }
    newSquares[index] = { ...newSquares[index], value: playerNext ? 'X' : 'O' };
    setSquares(newSquares);
    setPlayerNext(!playerNext);
  };

  const winner = checkWinner(squares, size);
  const isDraw = !winner && squares.every(square => square.value !== null);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (isDraw) {
    status = 'Draw';
  } else {
    status = 'Next player: ' + (playerNext ? 'X' : 'O');
  }

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
    gap: '0.1rem',
  };

  return (
    <div>
      <div className="status mb-4 text-xl">{status}</div>
      <div style={gridStyle}>
        {squares.map((square, index) => (
          <Square
            key={square.id}
            value={square.value}
            onClick={() => handleClick(index)}
            size={10}
          />
        ))}
      </div>
    </div>
  );
};

function checkWinner(squares: SquareType[], size: number) {
  const lines = generateWinningLines(size);

  for (const line of lines) {
    const firstSquare = squares[line[0]];
    if (firstSquare && firstSquare.value !== null) {
      if (line.every(index => squares[index].value === firstSquare.value)) {
        return firstSquare.value;
      }
    }
  }
  return null;
}

function generateWinningLines(size: number) {
  const lines = [];

  // Rows
  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 0; j < size; j++) {
      row.push(i * size + j);
    }
    lines.push(row);
  }

  // Columns
  for (let i = 0; i < size; i++) {
    const col = [];
    for (let j = 0; j < size; j++) {
      col.push(j * size + i);
    }
    lines.push(col);
  }

  // Diagonals
  const diag1 = [];
  const diag2 = [];
  for (let i = 0; i < size; i++) {
    diag1.push(i * size + i);
    diag2.push(i * size + (size - i - 1));
  }
  lines.push(diag1, diag2);

  return lines;
}

export default Board;
