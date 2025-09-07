import React, { useState, useEffect } from 'react';

const SubgraphChecker = () => {
    const [matrixG1Text, setMatrixG1Text] = useState("0 1\n1 0");
    const [matrixG2Text, setMatrixG2Text] = useState("0 1 1\n1 0 0\n1 0 0");
    const [result, setResult] = useState({ isSubgraph: false, message: '' });
    const [error, setError] = useState('');

    const handleCheck = () => {
        try {
            const g1 = matrixG1Text.trim().split('\n').map(r => r.trim().split(/\s+/).map(Number));
            const g2 = matrixG2Text.trim().split('\n').map(r => r.trim().split(/\s+/).map(Number));

            if (g1.length > g2.length) {
                setResult({ isSubgraph: false, message: 'تعداد رئوس G1 از G2 بیشتر است.' });
                setError(''); return;
            }

            let isSubgraph = true;
            let reason = "تمام یال‌های G1 در G2 نیز وجود دارند.";
            for (let i = 0; i < g1.length; i++) {
                for (let j = 0; j < g1.length; j++) {
                    if (g1[i][j] === 1 && g2[i][j] === 0) {
                        isSubgraph = false;
                        reason = `نقض: یال (${String.fromCharCode(65 + i)}, ${String.fromCharCode(65 + j)}) در G1 هست اما در G2 نیست.`;
                        break;
                    }
                }
                if (!isSubgraph) break;
            }
            setResult({ isSubgraph, message: reason });
            setError('');
        } catch (e) {
            setError("خطا در پردازش ماتریس‌ها.");
        }
    };

    useEffect(() => { handleCheck(); }, []);

    return (
        <div className="project-page-wrapper">
            <header><h1>بررسی‌کننده زیرگراف (Subgraph)</h1></header>
            <div className="project-layout-split">
                <div className="controls-column">
                    <div className="panel">
                        <h3>ورودی‌ها</h3>
                        <div className="input-group">
                            <h4>ماتریس G1 (گراف کوچکتر)</h4>
                            <textarea value={matrixG1Text} onChange={(e) => setMatrixG1Text(e.target.value)} rows="4" />
                        </div>
                        <div className="input-group">
                            <h4>ماتریس G2 (گراف بزرگتر)</h4>
                            <textarea value={matrixG2Text} onChange={(e) => setMatrixG2Text(e.target.value)} rows="4" />
                        </div>
                        <div className="button-container">
                            <button className="generate-btn" onClick={handleCheck}>بررسی کن</button>
                        </div>
                    </div>
                </div>
                <div className="results-column panel">
                    <h3>نتیجه بررسی</h3>
                    {error && <p className="error-message">{error}</p>}
                    {!error && result.message && (
                        <div className={`result-card ${result.isSubgraph ? 'holds' : 'fails'}`}>
                            <h4>آیا G1 زیرگراف G2 است؟</h4>
                            <p className={`status ${result.isSubgraph ? 'holds' : 'fails'}`}>{result.isSubgraph ? '✓ بله' : '✗ خیر'}</p>
                            <p className="reason">{result.message}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default SubgraphChecker;
