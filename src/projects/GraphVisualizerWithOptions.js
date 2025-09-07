import React, { useState, useEffect } from 'react';
import GraphCanvas from '../components/GraphCanvas';

const GraphVisualizerWithOptions = () => {
  const [matrixText, setMatrixText] = useState("0 1 1\n1 0 1\n1 1 0");
  const [graphData, setGraphData] = useState(null);
  const [isDirected, setIsDirected] = useState(false);
  const [error, setError] = useState('');

  const generateGraph = () => {
    try {
      const matrix = matrixText.trim().split('\n').map(r => r.trim().split(/\s+/).map(Number));
      const size = matrix.length;
      if (size === 0 || size > 8) { setError("اندازه ماتریس باید بین ۱ تا ۸ باشد."); return; }
      if (matrix.some(r => r.length !== size)) { setError("ماتریس باید مربع باشد."); return; }
      
      const nodes = Array.from({ length: size }, (_, i) => ({ id: String.fromCharCode(65 + i) }));
      const links = [];
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          if (matrix[i][j] === 1) {
            links.push({ source: nodes[i].id, target: nodes[j].id });
          }
        }
      }
      setGraphData({ nodes, links });
      setError('');
    } catch (e) {
      setError("خطا در پردازش ماتریس.");
      setGraphData(null);
    }
  };

  useEffect(() => { generateGraph(); }, [isDirected]);

  return (
    <div className="project-page-wrapper">
      <header><h1>نمایش گراف پیشرفته</h1></header>
      <div className="project-layout-split">
        <div className="controls-column">
            <div className="panel">
                <h3>ورودی و تنظیمات</h3>
                <div className="input-group">
                    <h4>ماتریس مجاورت</h4>
                    <textarea value={matrixText} onChange={(e) => setMatrixText(e.target.value)} rows={window.innerHeight > 800 ? 6 : 4} />
                </div>
                <div className="input-group">
                    <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'}}>
                        <input type="checkbox" checked={isDirected} onChange={(e) => setIsDirected(e.target.checked)} />
                        گراف جهت‌دار (نمایش فلش)
                    </label>
                </div>
                <div className="button-container">
                    <button className="generate-btn" onClick={generateGraph}>رسم گراف</button>
                </div>
            </div>
        </div>
        <div className="results-column panel">
            <h3>نمایش گراف</h3>
            {error && <p className="error-message">{error}</p>}
            <div style={{flexGrow: 1, minHeight: 0}}>
                <GraphCanvas data={graphData} isDirected={isDirected} />
            </div>
        </div>
      </div>
    </div>
  );
};
export default GraphVisualizerWithOptions;
