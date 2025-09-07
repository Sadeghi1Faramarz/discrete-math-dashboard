import React, { useState, useEffect } from 'react';
import MatrixDisplay from '../components/MatrixDisplay';

const MatrixPowerCalculator = () => {
    const [matrixText, setMatrixText] = useState("0 1 0\n0 0 1\n1 0 0");
    const [powerN, setPowerN] = useState(2);
    const [resultMatrix, setResultMatrix] = useState(null);
    const [error, setError] = useState('');

    const booleanMultiply = (matrixA, matrixB) => {
        const res = Array(matrixA.length).fill(0).map(() => Array(matrixB[0].length).fill(0));
        for (let i = 0; i < matrixA.length; i++) {
            for (let j = 0; j < matrixB[0].length; j++) {
                for (let k = 0; k < matrixA[0].length; k++) {
                    res[i][j] = res[i][j] || (matrixA[i][k] && matrixB[k][j]);
                }
            }
        }
        return res.map(r => r.map(c => c ? 1: 0));
    };

    const handleCalculate = () => {
        try {
            const matrixR = matrixText.trim().split('\n').map(r => r.trim().split(/\s+/).map(Number));
            const n = parseInt(powerN, 10);
            if (matrixR.length !== matrixR[0].length) { setError("ماتریس باید مربع باشد."); return; }
            if (isNaN(n) || n < 1) { setError("توان باید عدد صحیح مثبت باشد."); return; }
            
            let currentResult = matrixR;
            for (let i = 1; i < n; i++) {
                currentResult = booleanMultiply(currentResult, matrixR);
            }
            setResultMatrix(currentResult);
            setError('');
        } catch (e) {
            setError("خطا در پردازش.");
        }
    };

    useEffect(() => { handleCalculate(); }, []);

    return (
        <div className="project-page-wrapper">
            <header><h1>محاسبه‌گر توان بولی ماتریس (Rⁿ)</h1></header>
            <div className="project-layout-split">
                <div className="controls-column">
                    <div className="panel">
                        <h3>ورودی‌ها</h3>
                        <div className="input-group">
                            <h4>توان (n)</h4>
                            <input type="number" value={powerN} onChange={(e) => setPowerN(e.target.value)} min="1" />
                        </div>
                        <div className="input-group">
                            <h4>ماتریس رابطه (R)</h4>
                            <textarea value={matrixText} onChange={(e) => setMatrixText(e.target.value)} rows="5" />
                        </div>
                        <div className="button-container">
                            <button className="generate-btn" onClick={handleCalculate}>محاسبه Rⁿ</button>
                        </div>
                    </div>
                     <div className="tutorial-box">
                        <h4>راهنمای سریع</h4>
                        <ul>
                            <li><b>کاربرد:</b> درآیه (i,j) از ماتریس Rⁿ برابر ۱ است اگر مسیری به طول دقیقاً n از گره i به گره j وجود داشته باشد.</li>
                        </ul>
                    </div>
                </div>
                <div className="results-column panel">
                    <h3>خروجی</h3>
                    {error && <p className="error-message">{error}</p>}
                    {!error && resultMatrix && <MatrixDisplay title={`ماتریس نتیجه (R^${powerN})`} matrix={resultMatrix} />}
                </div>
            </div>
        </div>
    );
};
export default MatrixPowerCalculator;
