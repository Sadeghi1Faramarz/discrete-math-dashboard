import React, { useState, useEffect } from 'react';

const ConnectivityChecker = () => {
    const [matrixText, setMatrixText] = useState("0 1 0\n1 0 1\n0 1 0");
    const [result, setResult] = useState({ isConnected: false, message: '' });
    const [error, setError] = useState('');

    const handleCheck = () => {
        try {
            const matrix = matrixText.trim().split('\n').map(row => row.trim().split(/\s+/).map(Number));
            const size = matrix.length;
            if (size === 0) { setError("ماتریس نمی‌تواند خالی باشد."); return; }

            const visited = new Array(size).fill(false);
            const queue = [0];
            visited[0] = true;
            let count = 1;

            while (queue.length > 0) {
                const u = queue.shift();
                for (let v = 0; v < size; v++) {
                    if ((matrix[u][v] === 1 || matrix[v][u] === 1) && !visited[v]) {
                        visited[v] = true;
                        queue.push(v);
                        count++;
                    }
                }
            }

            if (count === size) {
                setResult({ isConnected: true, message: 'گراف همبند است.' });
            } else {
                setResult({ isConnected: false, message: `گراف همبند نیست. تنها ${count} گره از ${size} گره قابل دسترسی هستند.` });
            }
            setError('');
        } catch (e) {
            setError("خطا در پردازش ماتریس.");
        }
    };

    useEffect(() => { handleCheck(); }, []);

    return (
        <div className="project-page-wrapper">
            <header><h1>بررسی‌کننده همبندی گراف</h1></header>
            <div className="project-layout-split">
                <div className="controls-column">
                    <div className="panel">
                        <h3>ورودی</h3>
                        <div className="input-group">
                            <h4>ماتریس مجاورت</h4>
                            <textarea value={matrixText} onChange={(e) => setMatrixText(e.target.value)} rows="5" />
                        </div>
                        <div className="button-container">
                            <button className="generate-btn" onClick={handleCheck}>بررسی همبندی</button>
                        </div>
                    </div>
                </div>
                <div className="results-column panel">
                    <h3>نتیجه بررسی</h3>
                    {error && <p className="error-message">{error}</p>}
                    {!error && result.message && (
                        <div className={`result-card ${result.isConnected ? 'holds' : 'fails'}`}>
                            <h4>آیا گراف همبند است؟</h4>
                            <p className={`status ${result.isConnected ? 'holds' : 'fails'}`}>{result.isConnected ? '✓ بله' : '✗ خیر'}</p>
                            <p className="reason">{result.message}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default ConnectivityChecker;
