"use client"

import React, { useState } from 'react';
import Board from '../components/Board';

const TicTacToePage: React.FC = () => {
  const [boardSize, setBoardSize] = useState<number>(3); // Default board size

  const handleBoardSizeChange = (size: number) => {
    setBoardSize(size);
  };

  return (
    <div className="text-black min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-8">Tic Tac Toe</h1>
      <div className="mb-4">
        <label htmlFor="boardSize" className="mr-4">Board Size:</label>
        <select
          id="boardSize"
          value={boardSize}
          onChange={(e) => handleBoardSizeChange(Number(e.target.value))}
          className="p-2 border border-gray-300 rounded"
        >
          <option value={3}>3x3</option>
          <option value={4}>4x4</option>
          <option value={5}>5x5</option>
          <option value={9}>9x9</option>
          <option value={16}>16x16</option>
        </select>
      </div>
      <Board size={boardSize} />
    </div>
  );
};

export default TicTacToePage;
