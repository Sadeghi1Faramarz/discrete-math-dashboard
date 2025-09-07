import React, { useState, useEffect } from 'react';
import MatrixDisplay from '../components/MatrixDisplay';

const ComplementMatrixCalculator = () => {
  const [matrixText, setMatrixText] = useState("0 1 0\n1 0 1\n0 1 0");
  const [originalMatrix, setOriginalMatrix] = useState(null);
  const [resultMatrix, setResultMatrix] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    try {
      const matrix = matrixText.trim().split('\n').map(row => row.trim().split(/\s+/).map(Number));
      const size = matrix.length;
      if (size === 0 || matrix.some(row => row.length !== size)) {
        setError("ماتریس باید مربع و غیرخالی باشد."); return;
      }

      setOriginalMatrix(matrix);
      const complementMatrix = matrix.map((row, i) =>
        row.map((cell, j) => {
          if (i === j) return 0;
          return 1 - cell;
        })
      );
      setResultMatrix(complementMatrix);
      setError('');
    } catch (e) {
      setError("خطا در پردازش ماتریس.");
    }
  };

  useEffect(() => { handleCalculate(); }, []);

  return (
    <div className="project-page-wrapper">
      <header><h1>محاسبه‌گر ماتریس متمم</h1></header>
      <div className="project-layout-split">
        <div className="controls-column">
            <div className="panel">
                <h3>ورودی</h3>
                <div className="input-group">
                    <h4>ماتریس مجاورت (R)</h4>
                    <textarea value={matrixText} onChange={(e) => setMatrixText(e.target.value)} rows="5" />
                </div>
                <div className="button-container">
                    <button className="generate-btn" onClick={handleCalculate}>محاسبه متمم</button>
                </div>
            </div>
            <div className="tutorial-box">
                <h4>راهنمای سریع</h4>
                <ul>
                    <li><b>رابطه متمم (R'):</b> شامل تمام زوج‌مرتب‌هایی است که در R نیستند.</li>
                    <li>برای ساخت ماتریس آن، ۰ به ۱ و ۱ به ۰ تبدیل می‌شود (به جز قطر اصلی).</li>
                </ul>
            </div>
        </div>
        <div className="results-column panel">
            <h3>خروجی</h3>
            {error && <p className="error-message">{error}</p>}
            {!error && originalMatrix && resultMatrix && (
                <div className="side-by-side-display">
                    <MatrixDisplay title="ماتریس اصلی" matrix={originalMatrix} />
                    <div className="arrow-symbol">→</div>
                    <MatrixDisplay title="ماتریس متمم" matrix={resultMatrix} />
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
export default ComplementMatrixCalculator;
