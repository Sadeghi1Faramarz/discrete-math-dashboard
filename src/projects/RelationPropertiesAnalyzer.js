import React, { useState, useEffect } from 'react';

const RelationPropertiesAnalyzer = () => {
    const [matrixText, setMatrixText] = useState("1 1 0\n0 1 1\n0 0 1");
    const [results, setResults] = useState(null);
    const [error, setError] = useState('');

    const analyzeProperties = () => {
        try {
            const R = matrixText.trim().split('\n').map(r => r.trim().split(/\s+/).map(Number));
            const size = R.length;
            if (R.some(row => row.length !== size)) { setError("ماتریس باید مربع باشد."); return; }
            
            let analysis = {};
            analysis.reflexive = { holds: true, reason: "تمام درآیه‌های قطر اصلی ۱ هستند." };
            for(let i=0; i<size; i++) if(R[i][i] !== 1) { analysis.reflexive = {holds: false, reason: `نقض: R(${i+1},${i+1}) برابر ۰ است.`}; break; }

            analysis.symmetric = { holds: true, reason: "ماتریس حول قطر اصلی متقارن است." };
            for (let i = 0; i < size; i++) {
                for (let j = i + 1; j < size; j++) {
                    if (R[i][j] !== R[j][i]) { analysis.symmetric = { holds: false, reason: `نقض: R(${i+1},${j+1})≠R(${j+1},${i+1})` }; break; }
                } if (!analysis.symmetric.holds) break;
            }
            
            analysis.antisymmetric = { holds: true, reason: "اگر R(i,j)=1 و i≠j، آنگاه R(j,i)=0." };
            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                    if (i !== j && R[i][j] === 1 && R[j][i] === 1) { analysis.antisymmetric = { holds: false, reason: `نقض: R(${i+1},${j+1})=1 و R(${j+1},${i+1})=1` }; break; }
                } if (!analysis.antisymmetric.holds) break;
            }

            setResults(analysis);
            setError('');
        } catch (e) {
            setError("خطا در پردازش.");
        }
    };

    useEffect(() => { analyzeProperties(); }, [matrixText]);

    return (
        <div className="project-page-wrapper">
            <header><h1>تحلیل‌گر خواص رابطه</h1></header>
            <div className="project-layout-split">
                <div className="controls-column">
                    <div className="panel">
                        <h3>ورودی</h3>
                        <div className="input-group">
                            <h4>ماتریس رابطه (R)</h4>
                            <textarea value={matrixText} onChange={(e) => setMatrixText(e.target.value)} rows="5" />
                        </div>
                        <div className="button-container">
                            <button className="generate-btn" onClick={analyzeProperties}>تحلیل کن</button>
                        </div>
                    </div>
                </div>
                <div className="results-column panel">
                    <h3>نتایج تحلیل</h3>
                    {error && <p className="error-message">{error}</p>}
                    {results && !error && (
                        <div className="project-content-area" style={{display: 'flex', flexDirection:'column', gap: '1rem'}}>
                           <div className={`result-card ${results.reflexive.holds ? 'holds' : 'fails'}`}><h4>بازتابی</h4><p className={`status ${results.reflexive.holds ? 'holds' : 'fails'}`}>{results.reflexive.holds ? '✓ دارد' : '✗ ندارد'}</p><p className="reason">{results.reflexive.reason}</p></div>
                           <div className={`result-card ${results.symmetric.holds ? 'holds' : 'fails'}`}><h4>تقارنی</h4><p className={`status ${results.symmetric.holds ? 'holds' : 'fails'}`}>{results.symmetric.holds ? '✓ دارد' : '✗ ندارد'}</p><p className="reason">{results.symmetric.reason}</p></div>
                           <div className={`result-card ${results.antisymmetric.holds ? 'holds' : 'fails'}`}><h4>پادتقارنی</h4><p className={`status ${results.antisymmetric.holds ? 'holds' : 'fails'}`}>{results.antisymmetric.holds ? '✓ دارد' : '✗ ندارد'}</p><p className="reason">{results.antisymmetric.reason}</p></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default RelationPropertiesAnalyzer;
