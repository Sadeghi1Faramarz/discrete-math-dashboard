import React, { useState, useEffect, useCallback } from 'react';

const InteractiveMatrixInput = ({ value, onChange, maxSize = 8 }) => {
  // Internal state to manage the matrix
  const [matrix, setMatrix] = useState(value);

  // This effect ensures that the parent component is notified of any changes.
  useEffect(() => {
    onChange(matrix);
  }, [matrix, onChange]);

  // Handles changes to an individual cell in the matrix grid.
  const handleCellChange = (e, r, c) => {
    // Ensure the value is a number, default to 0 if invalid.
    const newValue = parseInt(e.target.value, 10) || 0;
    const newMatrix = matrix.map((row, rowIndex) =>
      rowIndex === r ? row.map((cell, colIndex) => (colIndex === c ? newValue : cell)) : row
    );
    setMatrix(newMatrix);
  };

  // Handles resizing the matrix (adding or removing rows/columns).
  const handleSizeChange = useCallback((newSize) => {
    if (newSize < 1 || newSize > maxSize) return;
    
    const oldSize = matrix.length;
    let newMatrix = Array(newSize).fill(0).map(() => Array(newSize).fill(0));

    // Preserve the old values when resizing.
    for (let i = 0; i < Math.min(oldSize, newSize); i++) {
      for (let j = 0; j < Math.min(oldSize, newSize); j++) {
        newMatrix[i][j] = matrix[i][j];
      }
    }
    setMatrix(newMatrix);
  }, [matrix, maxSize]);

  return (
    <div className="interactive-matrix-input">
      <div className="size-controls">
        <span>اندازه: {matrix.length}x{matrix.length}</span>
        <button onClick={() => handleSizeChange(matrix.length + 1)} disabled={matrix.length >= maxSize}>+</button>
        <button onClick={() => handleSizeChange(matrix.length - 1)} disabled={matrix.length <= 1}>-</button>
      </div>
      <div className="matrix-grid" style={{ gridTemplateColumns: `repeat(${matrix.length}, 45px)` }}>
        {matrix.map((row, r) =>
          row.map((cell, c) => (
            <input
              key={`${r}-${c}`}
              type="number"
              value={cell}
              onChange={(e) => handleCellChange(e, r, c)}
              className="matrix-cell"
            />
          ))
        )}
      </div>
    </div>
  );
};

export default InteractiveMatrixInput;
