import React, { useState, useEffect } from 'react';
import MatrixDisplay from '../components/MatrixDisplay';

const CompositionCalculator = () => {
  const [matrixR_text, setMatrixR_text] = useState("1 0 1\n0 1 0");
  const [matrixS_text, setMatrixS_text] = useState("0 1\n1 1\n1 0");
  const [resultMatrix, setResultMatrix] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    try {
      const matrixR = matrixR_text.trim().split('\n').map(r => r.trim().split(/\s+/).map(Number));
      const matrixS = matrixS_text.trim().split('\n').map(r => r.trim().split(/\s+/).map(Number));

      if (matrixR[0].length !== matrixS.length) {
        setError(`ترکیب امکان‌پذیر نیست (ستون R=${matrixR[0].length} != سطر S=${matrixS.length}).`);
        setResultMatrix(null);
        return;
      }

      const res = Array(matrixR.length).fill(0).map(() => Array(matrixS[0].length).fill(0));
      for (let i = 0; i < matrixR.length; i++) {
        for (let j = 0; j < matrixS[0].length; j++) {
          let sum = 0;
          for (let k = 0; k < matrixR[0].length; k++) {
            sum = sum || (matrixR[i][k] && matrixS[k][j]);
          }
          res[i][j] = sum ? 1 : 0;
        }
      }
      setResultMatrix(res);
      setError('');
    } catch (e) {
      setError("خطا در پردازش ماتریس‌ها.");
      setResultMatrix(null);
    }
  };
  
  useEffect(() => { handleCalculate(); }, []);

  return (
    <div className="project-page-wrapper">
      <header><h1>محاسبه‌گر ترکیب روابط (RoS)</h1></header>
      <div className="project-layout-split">
        <div className="controls-column">
            <div className="panel">
                <h3>ورودی‌ها</h3>
                <div className="input-group">
                    <h4>ماتریس رابطه R</h4>
                    <textarea value={matrixR_text} onChange={(e) => setMatrixR_text(e.target.value)} rows="4" />
                </div>
                <div className="input-group">
                    <h4>ماتریس رابطه S</h4>
                    <textarea value={matrixS_text} onChange={(e) => setMatrixS_text(e.target.value)} rows="4" />
                </div>
                <div className="button-container">
                    <button className="generate-btn" onClick={handleCalculate}>محاسبه RoS</button>
                </div>
            </div>
            <div className="tutorial-box">
                <h4>راهنمای سریع</h4>
                <ul>
                    <li>ماتریس ترکیب RoS از طریق ضرب بولی M<sub>R</sub> · M<sub>S</sub> به دست می‌آید.</li>
                    <li>شرط ترکیب: برابری ستون‌های R با سطرهای S.</li>
                </ul>
            </div>
        </div>
        <div className="results-column panel">
            <h3>خروجی</h3>
            {error && <p className="error-message">{error}</p>}
            {!error && resultMatrix && (
                <MatrixDisplay title="ماتریس ترکیب RoS" matrix={resultMatrix} />
            )}
        </div>
      </div>
    </div>
  );
};
export default CompositionCalculator;
