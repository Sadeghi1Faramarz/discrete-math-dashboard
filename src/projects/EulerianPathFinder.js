import React, { useState, useEffect } from 'react';

const EulerianPathFinder = () => {
    const [matrixText, setMatrixText] = useState("0 1 1 0\n1 0 1 1\n1 1 0 1\n0 1 1 0");
    const [result, setResult] = useState({ exists: false, type: '', path: [], message: '' });
    const [error, setError] = useState('');

    const handleFindPath = () => {
        try {
            const adj = matrixText.trim().split('\n').map(row => row.trim().split(/\s+/).map(Number));
            const n = adj.length;
            if (n === 0 || adj.some(row => row.length !== n)) { setError("ماتریس باید مربع باشد."); return; }

            const degrees = adj.map(row => row.reduce((sum, val) => sum + val, 0));
            const oddDegreeNodes = degrees.map((deg, i) => deg % 2 !== 0 ? i : -1).filter(i => i !== -1);

            if (oddDegreeNodes.length > 2) {
                setResult({ exists: false, message: `گراف بیش از دو رأس با درجه فرد دارد.` });
                setError(''); return;
            }

            let startNode = 0;
            if (oddDegreeNodes.length === 2) startNode = oddDegreeNodes[0];
            
            const tempAdj = adj.map(row => [...row]);
            const path = [];
            const stack = [startNode];

            while (stack.length > 0) {
                let u = stack[stack.length - 1];
                let foundEdge = false;
                for (let v = 0; v < n; v++) {
                    if (tempAdj[u][v] === 1) {
                        stack.push(v);
                        tempAdj[u][v] = 0;
                        tempAdj[v][u] = 0;
                        foundEdge = true;
                        break;
                    }
                }
                if (!foundEdge) {
                    path.push(stack.pop());
                }
            }
            
            const finalPath = path.reverse().map(nodeIndex => String.fromCharCode(65 + nodeIndex));
            const type = oddDegreeNodes.length === 0 ? "دور اولری" : "مسیر اولری";
            setResult({ exists: true, type, path: finalPath, message: `گراف دارای ${type} است.` });
            setError('');
        } catch (e) {
            setError("خطا در پردازش.");
        }
    };

    useEffect(() => { handleFindPath(); }, []);

    return (
        <div className="project-page-wrapper">
            <header><h1>یابنده مسیر و دور اولری</h1></header>
            <div className="project-layout-split">
                <div className="controls-column">
                    <div className="panel">
                        <h3>ورودی</h3>
                        <div className="input-group">
                            <h4>ماتریس مجاورت (بدون جهت)</h4>
                            <textarea value={matrixText} onChange={(e) => setMatrixText(e.target.value)} rows="5" />
                        </div>
                        <div className="button-container">
                            <button className="generate-btn" onClick={handleFindPath}>پیدا کردن مسیر</button>
                        </div>
                    </div>
                </div>
                <div className="results-column panel">
                    <h3>نتیجه</h3>
                    {error && <p className="error-message">{error}</p>}
                    {!error && result.message && (
                        <div className={`result-card ${result.exists ? 'holds' : 'fails'}`}>
                            <h4>آیا مسیر/دور اولری وجود دارد؟</h4>
                            <p className={`status ${result.exists ? 'holds' : 'fails'}`}>{result.exists ? `✓ بله، ${result.type}` : '✗ خیر'}</p>
                            <p className="reason">{result.message}</p>
                            {result.exists && (
                                <div className="euler-path-display">
                                    <h4>مسیر یافت شده:</h4>
                                    <p>{result.path.join(' → ')}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default EulerianPathFinder;
