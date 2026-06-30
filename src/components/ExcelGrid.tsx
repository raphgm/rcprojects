import React, { useState, useEffect } from 'react';
import { Play, Check, RefreshCw, HelpCircle, FileSpreadsheet } from 'lucide-react';

interface ExcelGridProps {
  currentStepIndex: number;
  onVerifyStep: (gridData: { [key: string]: string }, lastAction: string) => boolean;
  onStepSuccess: () => void;
}

export function ExcelGrid({ currentStepIndex, onVerifyStep, onStepSuccess }: ExcelGridProps) {
  const [grid, setGrid] = useState<{ [key: string]: string }>({
    A1: '', A2: '', A3: '', A4: '', A5: '',
    B1: '', B2: '', B3: '', B4: '', B5: '',
    C1: '', C2: '', C3: '', C4: '', C5: '',
    D1: '', D2: '', D3: '', D4: '', D5: '',
    E1: '', E2: '', E3: '', E4: '', E5: '',
    F1: '', F2: '', F3: '', F4: '', F5: ''
  });
  const [selectedCell, setSelectedCell] = useState<string>('A1');
  const [formulaValue, setFormulaValue] = useState<string>('');
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [history, setHistory] = useState<{ [key: string]: string }[]>([]);
  const [lastAction, setLastAction] = useState<string>('');

  const columns = ['A', 'B', 'C', 'D', 'E', 'F'];
  const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    setFormulaValue(grid[selectedCell] || '');
  }, [selectedCell, grid]);

  // Evaluates cell values (including simple math and sums)
  const evaluateCell = (val: string): string => {
    if (!val) return '';
    if (val.startsWith('=')) {
      try {
        const formula = val.substring(1).toUpperCase().trim();
        
        // Handle simple SUM: SUM(A1:A3)
        if (formula.startsWith('SUM(') && formula.endsWith(')')) {
          const range = formula.substring(4, formula.length - 1);
          const [start, end] = range.split(':');
          if (start && end) {
            const startCol = start[0];
            const startRow = parseInt(start.substring(1));
            const endCol = end[0];
            const endRow = parseInt(end.substring(1));
            
            let sum = 0;
            for (let c = startCol.charCodeAt(0); c <= endCol.charCodeAt(0); c++) {
              for (let r = startRow; r <= endRow; r++) {
                const cellRef = String.fromCharCode(c) + r;
                const cellVal = parseFloat(grid[cellRef] || '0');
                if (!isNaN(cellVal)) sum += cellVal;
              }
            }
            return sum.toString();
          }
        }
        
        // Handle simple math: A1+B1
        if (formula.includes('+')) {
          const parts = formula.split('+');
          const val1 = isNaN(parseFloat(parts[0])) ? parseFloat(grid[parts[0]] || '0') : parseFloat(parts[0]);
          const val2 = isNaN(parseFloat(parts[1])) ? parseFloat(grid[parts[1]] || '0') : parseFloat(parts[1]);
          return (val1 + val2).toString();
        }

        return 'ERROR';
      } catch (err) {
        return 'ERROR';
      }
    }
    return val;
  };

  const handleCellChange = (cellRef: string, value: string, actionType = 'edit') => {
    // Save history for undo support
    setHistory(prev => [...prev, { ...grid }]);
    
    setGrid(prev => {
      const nextGrid = { ...prev, [cellRef]: value };
      return nextGrid;
    });
    setLastAction(actionType);
    setVerificationError(null);
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setHistory(prevHist => prevHist.slice(0, -1));
      setGrid(prev);
      setLastAction('undo');
      setVerificationError(null);
    }
  };

  const handleFormulaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCellChange(selectedCell, formulaValue);
  };

  const verifyCurrentStep = () => {
    const isSuccessful = onVerifyStep(grid, lastAction);
    if (isSuccessful) {
      setVerificationError(null);
      onStepSuccess();
    } else {
      setVerificationError('Step verification failed. Please check the instructions.');
    }
  };

  return (
    <div className="border border-zinc-800 bg-[#0a0d14]/75 rounded-2xl p-6 shadow-2xl backdrop-blur-md text-zinc-300">
      
      {/* Top Ribbon / Title bar */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-4">
        <div className="flex items-center gap-2">
          <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-bold text-zinc-200">INTERACTIVE EXCEL SANDBOX</span>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={handleUndo}
            disabled={history.length === 0}
            className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 rounded-lg text-[10px] disabled:opacity-20 transition-colors"
          >
            Undo Action
          </button>
        </div>
      </div>

      {/* Formula Bar */}
      <form onSubmit={handleFormulaSubmit} className="flex items-center gap-2 bg-zinc-950/60 border border-zinc-800 rounded-xl p-2 mb-4">
        <span className="text-zinc-500 font-bold text-xs italic px-1">fx</span>
        <div className="w-[1px] h-4 bg-zinc-800 mx-1" />
        <input 
          type="text" 
          value={formulaValue}
          onChange={e => setFormulaValue(e.target.value)}
          placeholder={`Enter value or formula for cell ${selectedCell} (e.g. =SUM(A1:A3))` }
          className="flex-1 bg-transparent border-0 focus:outline-none text-xs text-zinc-200"
        />
        <button type="submit" className="hidden" />
      </form>

      {/* Grid Container */}
      <div className="overflow-x-auto max-h-[300px] border border-zinc-900 rounded-xl mb-4 bg-zinc-950/30">
        <table className="w-full text-[11px] border-collapse text-left">
          <thead>
            <tr className="bg-zinc-900/60 border-b border-zinc-850">
              <th className="w-8 border-r border-zinc-850 p-1 text-center text-zinc-500 font-bold"></th>
              {columns.map(col => (
                <th key={col} className="border-r border-zinc-850 p-1 text-center text-zinc-400 font-bold uppercase">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row} className="border-b border-zinc-850 last:border-0">
                <td className="bg-zinc-900/40 border-r border-zinc-850 p-1 text-center text-zinc-500 font-bold">{row}</td>
                {columns.map(col => {
                  const cellRef = `${col}${row}`;
                  const isSelected = selectedCell === cellRef;
                  const rawVal = grid[cellRef] || '';
                  const displayVal = evaluateCell(rawVal);
                  return (
                    <td 
                      key={cellRef}
                      onClick={() => setSelectedCell(cellRef)}
                      className={`border-r border-zinc-850 p-1 cursor-pointer transition-all ${
                        isSelected 
                          ? 'bg-cyan-500/10 border-cyan-500 ring-1 ring-cyan-500/30 text-cyan-300' 
                          : 'hover:bg-zinc-900/30'
                      }`}
                    >
                      <input 
                        type="text"
                        value={isSelected ? formulaValue : displayVal}
                        onChange={e => handleCellChange(cellRef, e.target.value)}
                        className="w-full bg-transparent border-none focus:outline-none focus:ring-0 p-0 text-inherit text-center text-[10px]"
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom Verification buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-900 pt-4">
        {verificationError ? (
          <div className="text-[10px] text-rose-400 font-bold">{verificationError}</div>
        ) : (
          <div className="text-[10px] text-zinc-500">Formulas automatically recalculate. Click check below to confirm logic.</div>
        )}

        <button 
          onClick={verifyCurrentStep}
          className="px-4 py-2 bg-emerald-500 text-zinc-950 rounded-xl text-xs font-bold hover:bg-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-500/10"
        >
          Check Formula Progress <Check className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
