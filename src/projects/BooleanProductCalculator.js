import React, { useState, useEffect } from 'react';
import MatrixDisplay from '../components/MatrixDisplay';

const BooleanProductCalculator = () => {
    const [matrixA_text, setMatrixA_text] = useState("1 0 1\n0 1 0");
    const [matrixB_text, setMatrixB_text] = useState("0 1\n1 1\n1 0");
    const [resultMatrix, setResultMatrix] = useState(null);
    const [error, setError] = useState('');

    const handleCalculate = () => {
        try {
            const matrixA = matrixA_text.trim().split('\n').map(r => r.trim().split(/\s+/).map(Number));
            const matrixB = matrixB_text.trim().split('\n').map(r => r.trim().split(/\s+/).map(Number));
            if (matrixA[0].length !== matrixB.length) {
                setError(`ضرب امکان‌پذیر نیست (ستون آ=${matrixA[0].length} != سطر ب=${matrixB.length}).`);
                setResultMatrix(null);
                return;
            }
            const res = Array(matrixA.length).fill(0).map(() => Array(matrixB[0].length).fill(0));
            for (let i = 0; i < matrixA.length; i++) {
                for (let j = 0; j < matrixB[0].length; j++) {
                    let sum = 0;
                    for (let k = 0; k < matrixA[0].length; k++) {
                        sum = sum || (matrixA[i][k] && matrixB[k][j]);
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
            <header><h1>محاسبه‌گر ضرب بولی ماتریس‌ها</h1></header>
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
                            <button className="generate-btn" onClick={handleCalculate}>محاسبه ضرب</button>
                        </div>
                    </div>
                     <div className="tutorial-box">
                        <h4>راهنمای سریع</h4>
                        <ul>
                            <li>شرط ضرب: تعداد ستون‌های ماتریس اول با تعداد سطرهای ماتریس دوم برابر باشد.</li>
                        </ul>
                    </div>
                </div>
                <div className="results-column panel">
                    <h3>خروجی</h3>
                    {error && <p className="error-message">{error}</p>}
                    {!error && resultMatrix && <MatrixDisplay title="ماتریس حاصل‌ضرب" matrix={resultMatrix} />}
                </div>
            </div>
        </div>
    );
};
export default BooleanProductCalculator;
