import React, { useState, useEffect } from 'react';
import { Play, Check, FileSpreadsheet, Bold, Italic, AlignLeft, AlignCenter, AlignRight, Grid, Palette, Layout } from 'lucide-react';

interface CellFormat {
  bold?: boolean;
  italic?: boolean;
  align?: 'left' | 'center' | 'right';
  numberFormat?: 'general' | 'number' | 'currency' | 'date';
  color?: string;
  border?: boolean;
  style?: 'normal' | 'heading' | 'total' | 'accent';
}

interface ExcelGridProps {
  currentStepIndex: number;
  onVerifyStep: (
    gridData: { [key: string]: string }, 
    formats: { [key: string]: CellFormat }, 
    lastAction: string
  ) => boolean;
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

  const [formats, setFormats] = useState<{ [key: string]: CellFormat }>({});
  const [selectedCell, setSelectedCell] = useState<string>('A1');
  const [formulaValue, setFormulaValue] = useState<string>('');
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [history, setHistory] = useState<{ grid: { [key: string]: string }, formats: { [key: string]: CellFormat } }[]>([]);
  const [lastAction, setLastAction] = useState<string>('');

  const columns = ['A', 'B', 'C', 'D', 'E', 'F'];
  const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    setFormulaValue(grid[selectedCell] || '');
  }, [selectedCell, grid]);

  // Evaluates cell values
  const evaluateCell = (val: string): string => {
    if (!val) return '';
    if (val.startsWith('=')) {
      try {
        const formula = val.substring(1).toUpperCase().trim();
        
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
    setHistory(prev => [...prev, { grid: { ...grid }, formats: { ...formats } }]);
    setGrid(prev => ({ ...prev, [cellRef]: value }));
    setLastAction(actionType);
    setVerificationError(null);
  };

  const updateFormat = (updates: Partial<CellFormat>) => {
    setHistory(prev => [...prev, { grid: { ...grid }, formats: { ...formats } }]);
    setFormats(prev => {
      const current = prev[selectedCell] || {};
      const updated = { ...current, ...updates };
      return { ...prev, [selectedCell]: updated };
    });
    setLastAction('format');
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setHistory(prevHist => prevHist.slice(0, -1));
      setGrid(prev.grid);
      setFormats(prev.formats);
      setLastAction('undo');
      setVerificationError(null);
    }
  };

  const handleFormulaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCellChange(selectedCell, formulaValue);
  };

  const verifyCurrentStep = () => {
    const isSuccessful = onVerifyStep(grid, formats, lastAction);
    if (isSuccessful) {
      setVerificationError(null);
      onStepSuccess();
    } else {
      setVerificationError('Step verification failed. Please follow the formatting guidelines.');
    }
  };

  const currentFormat = formats[selectedCell] || {};

  return (
    <div className="border border-zinc-200 bg-white rounded-2xl p-0 shadow-2xl overflow-hidden text-zinc-800 flex flex-col h-full">
      
      {/* Top Ribbon / Title bar */}
      <div className="flex items-center justify-between bg-[#107c41] text-white px-5 py-3 shrink-0">
        <div className="flex items-center gap-2">
          <FileSpreadsheet className="w-5 h-5 text-white" />
          <span className="text-xs font-black uppercase tracking-wider">Microsoft Excel Online</span>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={handleUndo}
            disabled={history.length === 0}
            className="px-2.5 py-1 bg-[#0d6433] hover:bg-[#0b542b] border border-[#0d6433] text-white/90 hover:text-white rounded-lg text-[10px] disabled:opacity-30 transition-colors cursor-pointer"
          >
            Undo
          </button>
        </div>
      </div>

      {/* Formatting Toolbar */}
      <div className="bg-[#f3f2f1] border-b border-zinc-300 p-2 flex flex-wrap items-center gap-3 shrink-0">
        {/* Font styling */}
        <div className="flex items-center border-r border-zinc-300 pr-3 gap-1">
          <button 
            onClick={() => updateFormat({ bold: !currentFormat.bold })}
            className={`p-1.5 rounded transition-all cursor-pointer ${currentFormat.bold ? 'bg-[#107c41]/10 text-[#107c41] font-bold' : 'hover:bg-zinc-200'}`}
          >
            <Bold className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={() => updateFormat({ italic: !currentFormat.italic })}
            className={`p-1.5 rounded transition-all cursor-pointer ${currentFormat.italic ? 'bg-[#107c41]/10 text-[#107c41] italic' : 'hover:bg-zinc-200'}`}
          >
            <Italic className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Alignment */}
        <div className="flex items-center border-r border-zinc-300 pr-3 gap-1">
          <button 
            onClick={() => updateFormat({ align: 'left' })}
            className={`p-1.5 rounded transition-all cursor-pointer ${currentFormat.align === 'left' ? 'bg-[#107c41]/10 text-[#107c41]' : 'hover:bg-zinc-200'}`}
          >
            <AlignLeft className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={() => updateFormat({ align: 'center' })}
            className={`p-1.5 rounded transition-all cursor-pointer ${currentFormat.align === 'center' ? 'bg-[#107c41]/10 text-[#107c41]' : 'hover:bg-zinc-200'}`}
          >
            <AlignCenter className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={() => updateFormat({ align: 'right' })}
            className={`p-1.5 rounded transition-all cursor-pointer ${currentFormat.align === 'right' ? 'bg-[#107c41]/10 text-[#107c41]' : 'hover:bg-zinc-200'}`}
          >
            <AlignRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Number Format */}
        <div className="flex items-center border-r border-zinc-300 pr-3 gap-2">
          <span className="text-[10px] text-zinc-500 font-bold uppercase">Format</span>
          <select 
            value={currentFormat.numberFormat || 'general'}
            onChange={e => updateFormat({ numberFormat: e.target.value as any })}
            className="bg-white border border-zinc-300 rounded px-1.5 py-1 text-[10px] focus:outline-none text-zinc-700 font-bold cursor-pointer"
          >
            <option value="general">General</option>
            <option value="number">Number</option>
            <option value="currency">Currency ($)</option>
            <option value="date">Short Date</option>
          </select>
        </div>

        {/* Cell Styles */}
        <div className="flex items-center border-r border-zinc-300 pr-3 gap-2">
          <span className="text-[10px] text-zinc-500 font-bold uppercase">Style</span>
          <select 
            value={currentFormat.style || 'normal'}
            onChange={e => updateFormat({ style: e.target.value as any })}
            className="bg-white border border-zinc-300 rounded px-1.5 py-1 text-[10px] focus:outline-none text-zinc-700 font-bold cursor-pointer"
          >
            <option value="normal">Normal</option>
            <option value="heading">Heading 1</option>
            <option value="total">Total Style</option>
            <option value="accent">Accent Fill</option>
          </select>
        </div>

        {/* Borders and Colors */}
        <div className="flex items-center gap-1">
          <button 
            onClick={() => updateFormat({ border: !currentFormat.border })}
            className={`p-1.5 rounded transition-all cursor-pointer ${currentFormat.border ? 'bg-[#107c41]/10 text-[#107c41]' : 'hover:bg-zinc-200'}`}
            title="Toggle Borders"
          >
            <Grid className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={() => updateFormat({ color: currentFormat.color === '#e1f0e7' ? undefined : '#e1f0e7' })}
            className={`p-1.5 rounded transition-all cursor-pointer ${currentFormat.color === '#e1f0e7' ? 'bg-[#107c41]/10 text-[#107c41]' : 'hover:bg-zinc-200'}`}
            title="Fill Color"
          >
            <Palette className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="flex-1 p-5 flex flex-col min-h-0 bg-white">
        {/* Formula Bar */}
        <form onSubmit={handleFormulaSubmit} className="flex items-center gap-2 bg-[#f3f2f1] border border-zinc-300 rounded-lg p-2 mb-3 shrink-0">
          <span className="text-[#107c41] font-black text-xs italic px-1">fx</span>
          <div className="w-[1px] h-4 bg-zinc-300 mx-1" />
          <input 
            type="text" 
            value={formulaValue}
            onChange={e => setFormulaValue(e.target.value)}
            placeholder={`Enter value or formula for cell ${selectedCell} (e.g. =SUM(A1:A3))` }
            className="flex-1 bg-transparent border-0 focus:outline-none text-xs text-zinc-800 font-mono"
          />
          <button type="submit" className="hidden" />
        </form>

        {/* Grid Container */}
        <div className="overflow-auto flex-1 border border-zinc-300 rounded-lg mb-4 bg-white min-h-0">
          <table className="w-full text-[11px] border-collapse text-left font-sans">
            <thead>
              <tr className="bg-[#f3f2f1] border-b border-zinc-300">
                <th className="w-8 border-r border-zinc-300 p-1 text-center text-zinc-500 font-bold bg-[#f3f2f1]"></th>
                {columns.map(col => (
                  <th key={col} className="border-r border-zinc-300 p-1 text-center text-zinc-600 font-semibold uppercase">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(row => (
                <tr key={row} className="border-b border-zinc-200 last:border-0">
                  <td className="bg-[#f3f2f1] border-r border-zinc-300 p-1 text-center text-zinc-500 font-semibold">{row}</td>
                  {columns.map(col => {
                    const cellRef = `${col}${row}`;
                    const isSelected = selectedCell === cellRef;
                    const rawVal = grid[cellRef] || '';
                    const displayVal = evaluateCell(rawVal);
                    const cellFmt = formats[cellRef] || {};

                    // Dynamic cell styling based on formatting attributes
                    const inlineStyle: React.CSSProperties = {};
                    if (cellFmt.bold) inlineStyle.fontWeight = 'bold';
                    if (cellFmt.italic) inlineStyle.fontStyle = 'italic';
                    if (cellFmt.align) inlineStyle.textAlign = cellFmt.align;
                    if (cellFmt.color) inlineStyle.backgroundColor = cellFmt.color;
                    
                    // Borders
                    let borderClass = 'border-r border-zinc-200';
                    if (cellFmt.border) {
                      borderClass = 'border border-zinc-600 font-bold';
                    }

                    // Style presets
                    let presetClass = '';
                    if (cellFmt.style === 'heading') {
                      presetClass = 'bg-[#107c41]/5 text-[#107c41] text-xs font-bold border-b-2 border-[#107c41]';
                    } else if (cellFmt.style === 'total') {
                      presetClass = 'border-t border-b-4 border-zinc-800 font-black';
                    } else if (cellFmt.style === 'accent') {
                      presetClass = 'bg-amber-100 text-amber-800';
                    }

                    // Currency / Number / Date display adapters
                    let textValue = isSelected ? formulaValue : displayVal;
                    if (!isSelected && textValue) {
                      if (cellFmt.numberFormat === 'currency' && !isNaN(parseFloat(textValue))) {
                        textValue = `$${parseFloat(textValue).toFixed(2)}`;
                      } else if (cellFmt.numberFormat === 'date' && !isNaN(Date.parse(textValue)) && textValue.includes('-')) {
                        textValue = new Date(textValue).toLocaleDateString();
                      } else if (cellFmt.numberFormat === 'number' && !isNaN(parseFloat(textValue))) {
                        textValue = parseFloat(textValue).toLocaleString();
                      }
                    }

                    return (
                      <td 
                        key={cellRef}
                        onClick={() => setSelectedCell(cellRef)}
                        className={`p-1 cursor-pointer transition-all ${borderClass} ${presetClass} ${
                          isSelected 
                            ? 'bg-[#e1f0e7] ring-2 ring-[#107c41] text-zinc-950 font-semibold z-10' 
                            : 'hover:bg-zinc-50'
                        }`}
                        style={inlineStyle}
                      >
                        <input 
                          type="text"
                          value={textValue}
                          onChange={e => handleCellChange(cellRef, e.target.value)}
                          className="w-full bg-transparent border-none focus:outline-none focus:ring-0 p-0 text-inherit text-center text-[10px] font-sans"
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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-150 pt-4 shrink-0">
          {verificationError ? (
            <div className="text-[10px] text-rose-600 font-bold">{verificationError}</div>
          ) : (
            <div className="text-[10px] text-zinc-400">Formatting tags are checked dynamically. Select Check to verify.</div>
          )}

          <button 
            onClick={verifyCurrentStep}
            className="px-4 py-2 bg-[#107c41] hover:bg-[#0d6433] text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            Check Formula Progress <Check className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
}
