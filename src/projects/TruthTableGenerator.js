import React, { useState, useMemo, useRef } from 'react';
import { evaluate, parse } from 'mathjs';

// --- Icons for better UX ---
const Icons = {
  Check: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>,
  Tautology: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>,
  Contradiction: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line></svg>,
};

// --- Custom Hook for Core Logic ---
const useTruthTable = (expression) => {
  return useMemo(() => {
    try {
      // Replace logical symbols with mathjs-compatible operators
      let processedExpr = expression.replace(/¬/g, 'not ').replace(/∧/g, ' and ').replace(/∨/g, ' or ').replace(/⊕/g, ' xor ');
      
      // Convert implication and biconditional to basic operators
      // Important: Process biconditional first as it contains the implication symbol
      processedExpr = processedExpr.replace(/(\w+|\([^)]+\))\s*↔\s*(\w+|\([^)]+\))/g, (_, p1, p2) => `((${p1} and ${p2}) or (not ${p1} and not ${p2}))`);
      processedExpr = processedExpr.replace(/(\w+|\([^)]+\))\s*→\s*(\w+|\([^)]+\))/g, (_, p1, p2) => `((not ${p1}) or ${p2})`);

      // Extract unique variables
      const uniqueVars = [...new Set(expression.match(/[a-zA-Z]+/g) || [])].sort();
      
      if (uniqueVars.length === 0) {
          return { error: null, tableData: [], variables: [], analysis: null };
      }
      if (uniqueVars.length > 5) {
        return { error: 'حداکثر ۵ متغیر مجاز است.', tableData: [], variables: uniqueVars, analysis: null };
      }

      const numRows = 2 ** uniqueVars.length;
      const newTableData = [];
      const compiledExpression = parse(processedExpr).compile();

      let trueCount = 0;
      // Generate truth table rows
      for (let i = 0; i < numRows; i++) {
        const row = {};
        const scope = {};
        uniqueVars.forEach((variable, index) => {
          const value = (i >> (uniqueVars.length - 1 - index)) & 1;
          row[variable] = value;
          scope[variable] = !!value;
        });
        const result = compiledExpression.evaluate(scope);
        row.Result = result ? 1 : 0;
        if (row.Result === 1) trueCount++;
        newTableData.push(row);
      }
      
      // Analyze the proposition type
      let analysis = { type: 'Contingency', description: 'گزاره ممکن (نه همیشه درست و نه همیشه غلط).' };
      if (trueCount === numRows) {
        analysis = { type: 'Tautology', description: 'گزاره راست‌گو (همیشه درست).' };
      } else if (trueCount === 0) {
        analysis = { type: 'Contradiction', description: 'گزاره متناقض (همیشه نادرست).' };
      }

      return { tableData: newTableData, variables: uniqueVars, error: null, analysis };
    } catch (e) {
      return { error: 'عبارت وارد شده نامعتبر است.', tableData: [], variables: [...new Set(expression.match(/[a-zA-Z]+/g) || [])].sort(), analysis: null };
    }
  }, [expression]);
};

// --- Main Component ---
const TruthTableGenerator = () => {
  const [expression, setExpression] = useState('p → (q ∧ r)');
  const { tableData, variables, error, analysis } = useTruthTable(expression);
  const inputRef = useRef(null);

  const handleSymbolClick = (symbol) => {
    const input = inputRef.current;
    if (!input) return;
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const newText = input.value.substring(0, start) + symbol + input.value.substring(end);
    setExpression(newText);
    input.focus();
    // Restore cursor position after insertion
    setTimeout(() => input.setSelectionRange(start + symbol.length, start + symbol.length), 0);
  };
  
  const symbolButtons = [
    { symbol: '¬', label: 'نقیض' }, { symbol: '∧', label: 'عطف (AND)' }, { symbol: '∨', label: 'فصل (OR)' },
    { symbol: '→', label: 'شرطی' }, { symbol: '↔', label: 'دو شرطی' }, { symbol: '(', label: 'پرانتز باز' }, { symbol: ')', label: 'پرانتز بسته' },
  ];

  return (
    <div className="project-page-wrapper">
      <header><h1>تحلیل‌گر و سازنده جدول ارزش</h1></header>
      <div className="project-content-area">
        <div className="tt-redesigned-grid">
          <div className="panel">
            <div className="panel-header"><h3>۱. عبارت منطقی</h3></div>
            <div className="panel-body">
              <p className="description">عبارت خود را با استفاده از متغیرها (p, q, ...) و عملگرهای زیر وارد کنید.</p>
              <input ref={inputRef} type="text" value={expression} onChange={(e) => setExpression(e.target.value)} placeholder="مثال: (p ∨ q) → ¬r" className="expression-input" dir="ltr" />
              <div className="symbol-buttons">{symbolButtons.map(btn => <button key={btn.symbol} onClick={() => handleSymbolClick(btn.symbol)} title={btn.label}>{btn.symbol}</button>)}</div>
              <div className="variables-display">
                <strong>متغیرهای شناسایی‌شده:</strong>
                <span>{variables.length > 0 ? variables.join(', ') : '-'}</span>
              </div>
            </div>
          </div>
          <div className="panel">
            <div className="panel-header"><h3>۲. تحلیل گزاره</h3></div>
            <div className="panel-body">
              {error && <div className="error-message compact">{error}</div>}
              {analysis && !error && (
                <div className={`analysis-box ${analysis.type.toLowerCase()}`}>
                  <div className="analysis-title">
                    {analysis.type === 'Tautology' && <Icons.Tautology />}
                    {analysis.type === 'Contradiction' && <Icons.Contradiction />}
                    {analysis.type === 'Contingency' && <Icons.Check />}
                    <span>{analysis.type}</span>
                  </div>
                  <p>{analysis.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="panel result-panel">
          <div className="panel-header"><h3>۳. جدول ارزش</h3></div>
          <div className="panel-body">
            {tableData.length > 0 && !error ? (
              <div className="truth-table-container professional">
                <table>
                  <thead>
                    <tr>
                      {variables.map(v => <th key={v}>{v}</th>)}
                      <th className="result-header">نتیجه</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((row, index) => (
                      <tr key={index}>
                        {variables.map(v => <td key={v} className={row[v] ? 'true' : 'false'}>{row[v] ? 'T' : 'F'}</td>)}
                        <td className={`result-col ${row.Result ? 'true' : 'false'}`}>{row.Result ? 'T' : 'F'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="description">جدول ارزش پس از وارد کردن یک عبارت معتبر در اینجا نمایش داده خواهد شد.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TruthTableGenerator;

