import React, { useState, useEffect } from 'react';

const PathLengthCalculator = () => {
    const [adjMatrixText, setAdjMatrixText] = useState("0 1 1 0\n1 0 0 1\n1 0 0 1\n0 1 1 0");
    const [weightMatrixText, setWeightMatrixText] = useState("0 5 3 0\n5 0 0 2\n3 0 0 8\n0 2 8 0");
    const [pathText, setPathText] = useState("A, B, D, C");
    const [result, setResult] = useState({ length: null, message: '' });
    const [error, setError] = useState('');

    const handleCalculate = () => {
        try {
            const adjMatrix = adjMatrixText.trim().split('\n').map(r => r.trim().split(/\s+/).map(Number));
            const weightMatrix = weightMatrixText.trim().split('\n').map(r => r.trim().split(/\s+/).map(Number));
            const path = pathText.trim().split(',').map(p => p.trim().toUpperCase());

            if (adjMatrix.length !== weightMatrix.length || adjMatrix.some((r, i) => r.length !== weightMatrix[i].length)) {
                setError("ابعاد ماتریس‌ها باید یکسان باشد."); return;
            }
            if (path.length < 2) {
                setError("مسیر باید حداقل شامل دو گره باشد."); return;
            }

            let totalLength = 0;
            for (let i = 0; i < path.length - 1; i++) {
                const startNodeIndex = path[i].charCodeAt(0) - 65;
                const endNodeIndex = path[i + 1].charCodeAt(0) - 65;

                if (startNodeIndex < 0 || startNodeIndex >= adjMatrix.length || endNodeIndex < 0 || endNodeIndex >= adjMatrix.length) {
                    setResult({ length: null, message: `گره نامعتبر در مسیر: ${path[i]} یا ${path[i+1]}` });
                    setError(''); return;
                }

                if (adjMatrix[startNodeIndex][endNodeIndex] === 1) {
                    totalLength += weightMatrix[startNodeIndex][endNodeIndex];
                } else {
                    setResult({ length: null, message: `مسیر نامعتبر است. یالی بین ${path[i]} و ${path[i+1]} وجود ندارد.` });
                    setError(''); return;
                }
            }
            setResult({ length: totalLength, message: `طول کل مسیر '${path.join(' → ')}' برابر است با:` });
            setError('');
        } catch (e) {
            setError("خطا در پردازش ورودی‌ها.");
        }
    };

    useEffect(() => { handleCalculate(); }, []);

    return (
        <div className="project-page-wrapper">
            <header><h1>محاسبه‌گر طول مسیر در گراف وزن‌دار</h1></header>
            <div className="project-layout-split">
                <div className="controls-column">
                    <div className="panel">
                        <h3>ورودی‌ها</h3>
                        <div className="input-group">
                            <h4>ماتریس مجاورت</h4>
                            <textarea value={adjMatrixText} onChange={(e) => setAdjMatrixText(e.target.value)} rows="4" />
                        </div>
                        <div className="input-group">
                            <h4>ماتریس وزن یال‌ها</h4>
                            <textarea value={weightMatrixText} onChange={(e) => setWeightMatrixText(e.target.value)} rows="4" />
                        </div>
                        <div className="input-group">
                            <h4>مسیر (مانند: A,B,C)</h4>
                            <input type="text" value={pathText} onChange={(e) => setPathText(e.target.value)} />
                        </div>
                         <div className="button-container">
                            <button className="generate-btn" onClick={handleCalculate}>محاسبه طول</button>
                        </div>
                    </div>
                </div>
                <div className="results-column panel">
                    <h3>نتیجه محاسبه</h3>
                    {error && <p className="error-message">{error}</p>}
                    {!error && result.message && (
                        <div className={`result-card ${result.length !== null ? 'holds' : 'fails'}`}>
                            <h4>نتیجه</h4>
                            <p className="reason">{result.message}</p>
                            {result.length !== null && <p className="status holds" style={{fontSize: '2rem', marginTop: '1rem'}}>{result.length}</p>}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default PathLengthCalculator;
