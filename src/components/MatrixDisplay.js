// src/components/MatrixDisplay.js
import React from 'react';

const MatrixDisplay = ({ title, matrix }) => {
  if (!matrix || matrix.length === 0) {
    return null;
  }

  return (
    <div className="matrix-display">
      <h4>{title}</h4>
      <table>
        <tbody>
          {matrix.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MatrixDisplay;