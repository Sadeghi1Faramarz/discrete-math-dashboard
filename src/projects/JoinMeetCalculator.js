import React, { useState, useEffect } from 'react';
import MatrixDisplay from '../components/MatrixDisplay';

const JoinMeetCalculator = () => {
  const [matrixA_text, setMatrixA_text] = useState("1 0 1\n0 1 1");
  const [matrixB_text, setMatrixB_text] = useState("0 1 1\n1 1 0");
  const [joinMatrix, setJoinMatrix] = useState(null);
  const [meetMatrix, setMeetMatrix] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    try {
      const matrixA = matrixA_text.trim().split('\n').map(r => r.trim().split(/\s+/).map(Number));
      const matrixB = matrixB_text.trim().split('\n').map(r => r.trim().split(/\s+/).map(Number));
      if (matrixA.length !== matrixB.length || matrixA[0].length !== matrixB[0].length) {
        setError("ابعاد دو ماتریس باید یکسان باشد."); return;
      }
      const newJoin = matrixA.map((row, i) => row.map((cell, j) => cell || matrixB[i][j]));
      const newMeet = matrixA.map((row, i) => row.map((cell, j) => cell && matrixB[i][j] ? 1 : 0));
      setJoinMatrix(newJoin);
      setMeetMatrix(newMeet);
      setError('');
    } catch (e) {
      setError("خطا در پردازش ماتریس‌ها.");
    }
  };
  
  useEffect(() => { handleCalculate(); }, []);

  return (
    <div className="project-page-wrapper">
      <header><h1>محاسبه‌گر وست (Join) و رسند (Meet)</h1></header>
      <div className="project-layout-split">
        <div className="controls-column">
            <div className="panel">
                <h3>ورودی‌ها</h3>
                <div className="input-group">
                    <h4>ماتریس آ</h4>
                    <textarea value={matrixA_text} onChange={(e) => setMatrixA_text(e.target.value)} rows="4" />
                </div>
                <div className="input-group">
                    <h4>ماتریس ب</h4>
                    <textarea value={matrixB_text} onChange={(e) => setMatrixB_text(e.target.value)} rows="4" />
                </div>
                 <div className="button-container">
                    <button className="generate-btn" onClick={handleCalculate}>محاسبه</button>
                </div>
            </div>
            <div className="tutorial-box">
                <h4>راهنمای سریع</h4>
                <ul>
                    <li><b>وست (Join - ∨):</b> حاصل، OR منطقی درآیه‌هاست.</li>
                    <li><b>رسند (Meet - ∧):</b> حاصل، AND منطقی درآیه‌هاست.</li>
                </ul>
            </div>
        </div>
        <div className="results-column">
            <div className="panel">
                <h3>خروجی</h3>
                {error && <p className="error-message">{error}</p>}
                {!error && joinMatrix && meetMatrix && (
                    <div className="project-content-area" style={{display: 'flex', flexDirection:'column', gap: '1.5rem'}}>
                        <MatrixDisplay title="ماتریس وست (Join)" matrix={joinMatrix} />
                        <MatrixDisplay title="ماتریس رسند (Meet)" matrix={meetMatrix} />
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};
export default JoinMeetCalculator;
