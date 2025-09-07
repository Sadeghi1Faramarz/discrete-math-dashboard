import React, { useState, useEffect } from 'react';

const NodeDegreeCalculator = () => {
  const [matrixText, setMatrixText] = useState("0 1 1 0\n1 0 0 1\n1 0 0 0\n0 1 0 0");
  const [degrees, setDegrees] = useState([]);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    try {
      const matrix = matrixText.trim().split('\n').map(row => row.trim().split(/\s+/).map(Number));
      const size = matrix.length;
      if (size === 0 || matrix.some(row => row.length !== size)) {
        setError("ماتریس باید مربع و غیرخالی باشد."); setDegrees([]); return;
      }

      const results = [];
      for (let i = 0; i < size; i++) {
        let inDegree = 0;
        let outDegree = 0;
        for (let j = 0; j < size; j++) {
          outDegree += matrix[i][j];
          inDegree += matrix[j][i];
        }
        results.push({ node: String.fromCharCode(65 + i), inDegree, outDegree });
      }
      setDegrees(results);
      setError('');
    } catch (e) {
      setError("خطا در پردازش ماتریس.");
      setDegrees([]);
    }
  };

  useEffect(() => { handleCalculate(); }, []);

  return (
    <div className="project-page-wrapper">
      <header><h1>محاسبه‌گر درجه گره‌ها</h1></header>
      <div className="project-layout-split">
        <div className="controls-column">
            <div className="panel">
                <h3>ورودی</h3>
                <div className="input-group">
                    <h4>ماتریس مجاورت</h4>
                    <textarea value={matrixText} onChange={(e) => setMatrixText(e.target.value)} rows="5" />
                </div>
                <div className="button-container">
                    <button className="generate-btn" onClick={handleCalculate}>محاسبه درجه</button>
                </div>
            </div>
            <div className="tutorial-box">
                <h4>راهنمای سریع</h4>
                <ul>
                    <li><b>درجه خروجی (Out):</b> مجموع درآیه‌های سطر متناظر.</li>
                    <li><b>درجه ورودی (In):</b> مجموع درآیه‌های ستون متناظر.</li>
                </ul>
            </div>
        </div>
        <div className="results-column panel">
            <h3>درجه گره‌ها</h3>
            {error && <p className="error-message">{error}</p>}
            {degrees.length > 0 && !error && (
                <div className="project-content-area">
                    <table className="matrix-display">
                        <thead>
                          <tr>
                            <th>گره</th>
                            <th>درجه ورودی (In)</th>
                            <th>درجه خروجی (Out)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {degrees.map(d => (
                            <tr key={d.node}>
                              <td>{d.node}</td>
                              <td>{d.inDegree}</td>
                              <td>{d.outDegree}</td>
                            </tr>
                          ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
export default NodeDegreeCalculator;
