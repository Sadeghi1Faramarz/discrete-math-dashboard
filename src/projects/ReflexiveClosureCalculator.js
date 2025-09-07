import React, { useState, useEffect } from 'react';
import MatrixDisplay from '../components/MatrixDisplay';

const ReflexiveClosureCalculator = () => {
  const [matrixText, setMatrixText] = useState("0 1 0\n1 0 0\n0 0 0");
  const [originalMatrix, setOriginalMatrix] = useState(null);
  const [resultMatrix, setResultMatrix] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    try {
      const matrixR = matrixText.trim().split('\n').map(r => r.trim().split(/\s+/).map(Number));
      const size = matrixR.length;
      if (matrixR.some(row => row.length !== size)) { setError("ماتریس باید مربع باشد."); return; }

      setOriginalMatrix(matrixR);
      const closureMatrix = matrixR.map(row => [...row]);
      for (let i = 0; i < size; i++) {
        closureMatrix[i][i] = 1;
      }
      setResultMatrix(closureMatrix);
      setError('');
    } catch (e) {
      setError("خطا در پردازش ماتریس.");
    }
  };

  useEffect(() => { handleCalculate(); }, []);

  return (
    <div className="project-page-wrapper">
      <header><h1>محاسبه‌گر بستار بازتابی رابطه</h1></header>
      <div className="project-layout-split">
        <div className="controls-column">
            <div className="panel">
                <h3>ورودی</h3>
                <div className="input-group">
                    <h4>ماتریس رابطه (R)</h4>
                    <textarea value={matrixText} onChange={(e) => setMatrixText(e.target.value)} rows="5" />
                </div>
                <div className="button-container">
                    <button className="generate-btn" onClick={handleCalculate}>محاسبه بستار</button>
                </div>
            </div>
            <div className="tutorial-box">
                <h4>راهنمای سریع</h4>
                <ul>
                    <li><b>بستار بازتابی:</b> کوچکترین رابطه بازتابی است که شامل R باشد.</li>
                    <li>برای ساخت آن، تمام درآیه‌های روی قطر اصلی ماتریس را ۱ می‌کنیم.</li>
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
                    <MatrixDisplay title="بستار بازتابی" matrix={resultMatrix} />
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
export default ReflexiveClosureCalculator;
