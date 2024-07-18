import React from 'react';

type SquareProps = {
  value: string | null;
  onClick: () => void;
  size: number;
};

const Square: React.FC<SquareProps> = ({ value, onClick, size }) => {
  return (
    <button
      className="border-2 border-gray-500 flex items-center justify-center text-lg"
      style={{ width: 50, height: 50 }}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default React.memo(Square);
