import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GraphCanvas from '../components/GraphCanvas';
import InteractiveMatrixInput from '../components/InteractiveMatrixInput';

const GraphVisualizer = () => {
  // State is now a 2D array, not a string
  const [matrix, setMatrix] = useState([[0, 1, 1], [0, 0, 1], [0, 0, 0]]);
  const [graphData, setGraphData] = useState(null);
  const [error, setError] = useState('');

  // Using useCallback to memoize the function
  const generateGraph = useCallback(() => {
    try {
      const size = matrix.length;
      if (size === 0 || size > 8) { 
        setError("اندازه ماتریس باید بین ۱ تا ۸ باشد."); 
        setGraphData(null);
        return; 
      }
      
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
  }, [matrix]); // Re-run only when the matrix state changes

  useEffect(() => {
    generateGraph();
  }, [generateGraph]);

  return (
    <div className="project-page-wrapper">
      <header><h1>نمایش گراف از ماتریس مجاورت</h1></header>
      <div className="project-layout-split">
        <div className="controls-column">
            <div className="panel">
                <div className="panel-header"><h3>ورودی</h3></div>
                <div className="panel-body">
                  <div className="input-group">
                      <h4>ماتریس مجاورت</h4>
                      {/* Using the new InteractiveMatrixInput component */}
                      <InteractiveMatrixInput value={matrix} onChange={setMatrix} />
                  </div>
                </div>
            </div>
             <div className="tutorial-box">
                <h4>راهنمای سریع</h4>
                <ul>
                    <li>مقدار <code>1</code> یعنی یک یال از گره سطر به گره ستون وجود دارد.</li>
                    <li>اندازه ماتریس را با دکمه‌های +/- تغییر دهید.</li>
                    <li>گره‌ها را می‌توانید در صفحه نتیجه با موس جابجا کنید.</li>
                </ul>
            </div>
        </div>
        <div className="results-column panel">
            <div className="panel-header"><h3>نمایش گراف</h3></div>
            <div className="panel-body">
              {error && <p className="error-message">{error}</p>}
              <AnimatePresence>
                {!error && graphData && (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }}
                      style={{flexGrow: 1, minHeight: 400}}>
                      <GraphCanvas data={graphData} isDirected={true} />
                    </motion.div>
                )}
              </AnimatePresence>
            </div>
        </div>
      </div>
    </div>
  );
};

export default GraphVisualizer;
