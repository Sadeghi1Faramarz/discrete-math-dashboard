import React, { useState, useEffect } from 'react';

const DijkstraPathfinder = () => {
    const [matrixText, setMatrixText] = useState("0 4 2 0\n4 0 1 5\n2 1 0 8\n0 5 8 0");
    const [startNode, setStartNode] = useState("A");
    const [endNode, setEndNode] = useState("D");
    const [result, setResult] = useState({ path: [], distance: null, message: '' });
    const [error, setError] = useState('');

    const dijkstra = (graph, start, end) => {
        const n = graph.length;
        const dist = new Array(n).fill(Infinity);
        const prev = new Array(n).fill(null);
        const visited = new Array(n).fill(false);
        dist[start] = 0;

        for (let i = 0; i < n; i++) {
            let u = -1;
            for (let j = 0; j < n; j++) {
                if (!visited[j] && (u === -1 || dist[j] < dist[u])) u = j;
            }
            if (u === -1 || dist[u] === Infinity) break;
            visited[u] = true;
            for (let v = 0; v < n; v++) {
                if (graph[u][v] > 0 && !visited[v] && dist[u] + graph[u][v] < dist[v]) {
                    dist[v] = dist[u] + graph[u][v];
                    prev[v] = u;
                }
            }
        }

        if (dist[end] === Infinity) return { path: [], distance: null };
        const path = [];
        let current = end;
        while (current !== null) {
            path.unshift(String.fromCharCode(65 + current));
            current = prev[current];
        }
        return { path, distance: dist[end] };
    };

    const handleCalculate = () => {
        try {
            const graph = matrixText.trim().split('\n').map(r => r.trim().split(/\s+/).map(Number));
            const startIndex = startNode.toUpperCase().charCodeAt(0) - 65;
            const endIndex = endNode.toUpperCase().charCodeAt(0) - 65;
            if (startIndex < 0 || endIndex < 0 || startIndex >= graph.length || endIndex >= graph.length) {
                setError("گره شروع یا پایان نامعتبر است."); return;
            }
            const { path, distance } = dijkstra(graph, startIndex, endIndex);
            if (distance === null) {
                setResult({ path: [], distance: null, message: `هیچ مسیری از ${startNode} به ${endNode} یافت نشد.` });
            } else {
                setResult({ path, distance, message: `کوتاه‌ترین مسیر از ${startNode} به ${endNode}:` });
            }
            setError('');
        } catch (e) {
            setError("خطا در پردازش ورودی‌ها.");
        }
    };

    useEffect(() => { handleCalculate(); }, []);

    return (
        <div className="project-page-wrapper">
            <header><h1>الگوریتم دایکسترا برای کوتاه‌ترین مسیر</h1></header>
            <div className="project-layout-split">
                <div className="controls-column">
                    <div className="panel">
                        <h3>ورودی‌ها</h3>
                        <div className="input-group">
                            <h4>ماتریس وزن</h4>
                            <textarea value={matrixText} onChange={(e) => setMatrixText(e.target.value)} rows="5" />
                        </div>
                        <div className="dijkstra-controls">
                            <div className="input-group">
                                <h4>مبدأ</h4>
                                <input type="text" value={startNode} onChange={(e) => setStartNode(e.target.value)} maxLength="1" />
                            </div>
                            <div className="input-group">
                                <h4>مقصد</h4>
                                <input type="text" value={endNode} onChange={(e) => setEndNode(e.target.value)} maxLength="1" />
                            </div>
                        </div>
                        <div className="button-container">
                            <button className="generate-btn" onClick={handleCalculate}>یافتن مسیر</button>
                        </div>
                    </div>
                </div>
                <div className="results-column panel">
                    <h3>نتیجه</h3>
                    {error && <p className="error-message">{error}</p>}
                    {!error && result.message && (
                         <div className={`result-card ${result.distance !== null ? 'holds' : 'fails'}`}>
                            <h4>نتیجه محاسبه</h4>
                            <p className="reason">{result.message}</p>
                            {result.distance !== null ? (
                                <div className="euler-path-display">
                                    <h4>مسیر: {result.path.join(' → ')}</h4>
                                    <p className="status holds" style={{fontSize: '1.5rem'}}>طول کل: {result.distance}</p>
                                </div>
                            ) : null}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default DijkstraPathfinder;
