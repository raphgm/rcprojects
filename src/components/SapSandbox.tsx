import React, { useState, useEffect } from 'react';
import { 
  Check, Save, ArrowLeft, XCircle, Terminal as TermIcon, Play, RefreshCw,
  Layout, Layers, Monitor, Shield, FileText, Database, Server, Settings, UserPlus, ShoppingCart, Briefcase, Key
} from 'lucide-react';

interface SapSandboxProps {
  currentStepIndex: number;
  onVerifyStep: (
    action: string,
    inputs: { [key: string]: string },
    currentTCode: string,
    environment: 'gui' | 'fiori'
  ) => boolean;
  onStepSuccess: () => void;
}

export function SapSandbox({ currentStepIndex, onVerifyStep, onStepSuccess }: SapSandboxProps) {
  // Navigation & UI States
  const [environment, setEnvironment] = useState<'gui' | 'fiori'>('gui');
  const [currentTCode, setCurrentTCode] = useState<string>('EASY_ACCESS');
  const [commandInputValue, setCommandInputValue] = useState<string>('');
  const [statusBar, setStatusBar] = useState<{ type: 'success' | 'warning' | 'error' | 'info'; text: string }>({
    type: 'info',
    text: 'System connected. Client 100 - DEV Landscape.'
  });

  // Form Inputs
  const [inputs, setInputs] = useState<{ [key: string]: string }>({
    username: '',
    roleName: '',
    password: '',
    soldTo: '',
    material: '',
    quantity: '',
    vendor: '',
    purchOrg: '',
    abapCode: `REPORT Z_SALES_SUMMARY.\nSELECT * FROM VBAK INTO TABLE @DATA(LT_ORDERS).\nLOOP AT LT_ORDERS ASSIGNING FIELD-SYMBOL(<FS_ORDER>).\n  WRITE: / <FS_ORDER>-VBELN, <FS_ORDER>-NETWR.\nENDLOOP.`,
    transportReq: 'DEVK900124',
    validationRule: ''
  });

  const [verificationError, setVerificationError] = useState<string | null>(null);

  // Quick T-Code shortcuts helper
  const handleTCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tcode = commandInputValue.trim().toUpperCase();
    if (tcode === '/N' || tcode === '/NEX') {
      setCurrentTCode('EASY_ACCESS');
      setStatusBar({ type: 'info', text: 'Returned to SAP Easy Access main menu.' });
    } else if (tcode.startsWith('/N')) {
      const code = tcode.substring(2);
      setCurrentTCode(code);
      setStatusBar({ type: 'info', text: `Navigated to transaction: ${code}` });
    } else {
      setCurrentTCode(tcode);
      setStatusBar({ type: 'info', text: `Navigated to transaction: ${tcode}` });
    }
    setCommandInputValue('');
    setVerificationError(null);
  };

  const handleToolbarSave = () => {
    if (currentTCode === 'SU01') {
      handleAction('save_su01');
    } else if (currentTCode === 'VA01') {
      handleAction('save_va01');
    } else if (currentTCode === 'ME21N') {
      handleAction('save_me21n');
    } else if (currentTCode === 'SE38') {
      handleAction('run_abap');
    } else if (currentTCode === 'STMS') {
      handleAction('release_tr');
    } else {
      setStatusBar({ type: 'warning', text: 'No active transaction data to save.' });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F8') {
        e.preventDefault();
        handleToolbarSave();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentTCode, inputs]);

  const handleAction = (actionType: string) => {
    setVerificationError(null);
    let successMsg = '';
    
    if (actionType === 'save_su01') {
      successMsg = `User ${inputs.username || 'DEVELOPER'} created and locked successfully.`;
    } else if (actionType === 'save_va01') {
      successMsg = `Sales Order 14920 created for Sold-To ${inputs.soldTo || '100240'}.`;
    } else if (actionType === 'save_me21n') {
      successMsg = `Purchase Order 450002134 generated for Vendor ${inputs.vendor || 'VEND-01'}.`;
    } else if (actionType === 'run_abap') {
      successMsg = `Z_SALES_SUMMARY compiled and run. 15 records fetched in 42ms.`;
    } else if (actionType === 'release_tr') {
      successMsg = `Transport Request ${inputs.transportReq} released and exported to QA queue.`;
    } else {
      successMsg = `Action '${actionType}' completed successfully.`;
    }

    setStatusBar({ type: 'success', text: successMsg });
    
    // Verify against step conditions
    const isOk = onVerifyStep(actionType, inputs, currentTCode, environment);
    if (isOk) {
      onStepSuccess();
    }
  };

  const triggerCheck = () => {
    const isOk = onVerifyStep('check_progress', inputs, currentTCode, environment);
    if (isOk) {
      setVerificationError(null);
      onStepSuccess();
    } else {
      setVerificationError('Step requirements not met. Please follow the instructions and complete the SAP form fields/T-Codes.');
    }
  };

  return (
    <div className="border border-zinc-200 bg-[#f0f0f0] rounded-2xl p-0 shadow-2xl overflow-hidden text-zinc-800 flex flex-col h-full font-sans">
      
      {/* View Switcher Ribbon */}
      <div className="bg-[#242f3d] text-white px-5 py-2.5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Monitor className="w-4 h-4 text-sky-400" />
          <span className="text-xs font-black uppercase tracking-wider">SAP S/4HANA Enterprise Sandbox</span>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => { setEnvironment('gui'); setStatusBar({ type: 'info', text: 'Switched to SAP GUI Classic mode.' }); }}
            className={`px-3 py-1 rounded text-[10px] font-bold transition-all cursor-pointer ${environment === 'gui' ? 'bg-[#3b82f6] text-white shadow' : 'hover:bg-zinc-700/50 text-zinc-300'}`}
          >
            SAP GUI (Classic)
          </button>
          <button 
            onClick={() => { setEnvironment('fiori'); setStatusBar({ type: 'info', text: 'Switched to SAP Fiori modern Launchpad.' }); }}
            className={`px-3 py-1 rounded text-[10px] font-bold transition-all cursor-pointer ${environment === 'fiori' ? 'bg-[#3b82f6] text-white shadow' : 'hover:bg-zinc-700/50 text-zinc-300'}`}
          >
            SAP Fiori Launchpad
          </button>
        </div>
      </div>

      {environment === 'gui' ? (
        // Classic SAP GUI Layout
        <div className="flex-1 flex flex-col min-h-0 bg-[#e6e6e6]">
          
          {/* SAP GUI Command toolbar */}
          <div className="bg-[#f0f0f0] border-b border-zinc-300 p-2 flex items-center justify-between shrink-0 gap-3">
            <div className="flex items-center gap-2">
              <form onSubmit={handleTCodeSubmit} className="flex items-center bg-white border border-zinc-400 px-1 rounded shadow-inner">
                <input 
                  type="text" 
                  value={commandInputValue}
                  onChange={e => setCommandInputValue(e.target.value)}
                  placeholder="Enter T-Code (e.g. SU01)" 
                  className="bg-transparent border-0 focus:outline-none text-[10px] font-mono w-28 uppercase py-0.5 text-zinc-800"
                />
                <button type="submit" className="p-0.5 hover:bg-zinc-100 rounded text-zinc-600">
                  <Play className="w-2.5 h-2.5 fill-current" />
                </button>
              </form>

              {/* Navigation controls */}
              <div className="flex items-center gap-1 border-l border-zinc-300 pl-2">
                <button onClick={handleToolbarSave} className="p-1 hover:bg-zinc-200 rounded text-zinc-600 cursor-pointer" title="Save (F8)">
                  <Save className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => { setCurrentTCode('EASY_ACCESS'); setStatusBar({ type: 'info', text: 'Returned to menu.' }); }} className="p-1 hover:bg-zinc-200 rounded text-emerald-600 cursor-pointer" title="Back">
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => { setCurrentTCode('EASY_ACCESS'); }} className="p-1 hover:bg-zinc-200 rounded text-rose-600 cursor-pointer" title="Exit">
                  <XCircle className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="text-[10px] text-zinc-500 font-bold bg-[#e1e1e1] px-3 py-1 rounded">
              T-Code: <span className="font-mono text-zinc-800">{currentTCode}</span>
            </div>
          </div>

          {/* Active Transaction Viewport */}
          <div className="flex-1 p-5 overflow-auto bg-white min-h-0 text-xs">
            
            {currentTCode === 'EASY_ACCESS' && (
              <div className="space-y-4">
                <h3 className="text-sm font-black text-zinc-700 border-b pb-2 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-zinc-400" /> SAP Easy Access Menu
                </h3>
                <div className="space-y-2 text-[11px] font-semibold text-zinc-600 pl-4 border-l border-dashed border-zinc-300">
                  <div className="hover:text-blue-600 cursor-pointer flex items-center gap-1.5" onClick={() => setCurrentTCode('SU01')}>
                    <UserPlus className="w-3.5 h-3.5 text-zinc-400" /> 📁 User Maintenance (SU01)
                  </div>
                  <div className="hover:text-blue-600 cursor-pointer flex items-center gap-1.5" onClick={() => setCurrentTCode('VA01')}>
                    <ShoppingCart className="w-3.5 h-3.5 text-zinc-400" /> 📁 Create Sales Order (VA01)
                  </div>
                  <div className="hover:text-blue-600 cursor-pointer flex items-center gap-1.5" onClick={() => setCurrentTCode('ME21N')}>
                    <Briefcase className="w-3.5 h-3.5 text-zinc-400" /> 📁 Create Purchase Order (ME21N)
                  </div>
                  <div className="hover:text-blue-600 cursor-pointer flex items-center gap-1.5" onClick={() => setCurrentTCode('SE38')}>
                    <TermIcon className="w-3.5 h-3.5 text-zinc-400" /> 📁 ABAP Editor (SE38)
                  </div>
                  <div className="hover:text-blue-600 cursor-pointer flex items-center gap-1.5" onClick={() => setCurrentTCode('STMS')}>
                    <Server className="w-3.5 h-3.5 text-zinc-400" /> 📁 Transport Organizer (STMS)
                  </div>
                  <div className="hover:text-blue-600 cursor-pointer flex items-center gap-1.5" onClick={() => setCurrentTCode('SM50')}>
                    <Settings className="w-3.5 h-3.5 text-zinc-400" /> 📁 Work Process Monitor (SM50)
                  </div>
                </div>
              </div>
            )}

            {currentTCode === 'SU01' && (
              <div className="space-y-4 max-w-md">
                <h3 className="text-sm font-black text-zinc-800 border-b pb-2 flex items-center gap-2">
                  <UserPlus className="w-4 h-4 text-blue-500" /> User Maintenance: Create User
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] text-zinc-500 uppercase font-black mb-1">User ID</label>
                    <input 
                      type="text" 
                      value={inputs.username}
                      onChange={e => setInputs({ ...inputs, username: e.target.value })}
                      placeholder="e.g. DEVELOPER"
                      className="w-full bg-zinc-50 border border-zinc-300 rounded px-2 py-1 text-zinc-850 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-zinc-500 uppercase font-black mb-1">Role / Profile Assignment</label>
                    <input 
                      type="text" 
                      value={inputs.roleName}
                      onChange={e => setInputs({ ...inputs, roleName: e.target.value })}
                      placeholder="e.g. SAP_ALL"
                      className="w-full bg-zinc-50 border border-zinc-300 rounded px-2 py-1 text-zinc-850 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-zinc-500 uppercase font-black mb-1">Password</label>
                    <input 
                      type="password" 
                      value={inputs.password}
                      onChange={e => setInputs({ ...inputs, password: e.target.value })}
                      placeholder="••••••••"
                      className="w-full bg-zinc-50 border border-zinc-300 rounded px-2 py-1 text-zinc-850 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                    />
                  </div>
                  <button 
                    onClick={() => handleAction('save_su01')}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-[10px] font-bold cursor-pointer transition-colors shadow"
                  >
                    Save User Profile (F8)
                  </button>
                </div>
              </div>
            )}

            {currentTCode === 'VA01' && (
              <div className="space-y-4 max-w-md">
                <h3 className="text-sm font-black text-zinc-800 border-b pb-2 flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-emerald-500" /> Create Sales Order: Overview
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] text-zinc-500 uppercase font-black mb-1">Sold-To Party ID</label>
                    <input 
                      type="text" 
                      value={inputs.soldTo}
                      onChange={e => setInputs({ ...inputs, soldTo: e.target.value })}
                      placeholder="e.g. 100240"
                      className="w-full bg-zinc-50 border border-zinc-300 rounded px-2 py-1 text-zinc-850 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-zinc-500 uppercase font-black mb-1">Material SKU</label>
                    <input 
                      type="text" 
                      value={inputs.material}
                      onChange={e => setInputs({ ...inputs, material: e.target.value })}
                      placeholder="e.g. MAT-01"
                      className="w-full bg-zinc-50 border border-zinc-300 rounded px-2 py-1 text-zinc-850 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-zinc-500 uppercase font-black mb-1">Order Quantity</label>
                    <input 
                      type="text" 
                      value={inputs.quantity}
                      onChange={e => setInputs({ ...inputs, quantity: e.target.value })}
                      placeholder="e.g. 100"
                      className="w-full bg-zinc-50 border border-zinc-300 rounded px-2 py-1 text-zinc-850 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                    />
                  </div>
                  <button 
                    onClick={() => handleAction('save_va01')}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[10px] font-bold cursor-pointer transition-colors shadow"
                  >
                    Generate Order
                  </button>
                </div>
              </div>
            )}

            {currentTCode === 'ME21N' && (
              <div className="space-y-4 max-w-md">
                <h3 className="text-sm font-black text-zinc-800 border-b pb-2 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-purple-500" /> Create Purchase Order: Header
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] text-zinc-500 uppercase font-black mb-1">Vendor Account</label>
                    <input 
                      type="text" 
                      value={inputs.vendor}
                      onChange={e => setInputs({ ...inputs, vendor: e.target.value })}
                      placeholder="e.g. VEND-01"
                      className="w-full bg-zinc-50 border border-zinc-300 rounded px-2 py-1 text-zinc-850 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-zinc-500 uppercase font-black mb-1">Purchase Organization</label>
                    <input 
                      type="text" 
                      value={inputs.purchOrg}
                      onChange={e => setInputs({ ...inputs, purchOrg: e.target.value })}
                      placeholder="e.g. 1000"
                      className="w-full bg-zinc-50 border border-zinc-300 rounded px-2 py-1 text-zinc-850 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                    />
                  </div>
                  <button 
                    onClick={() => handleAction('save_me21n')}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded text-[10px] font-bold cursor-pointer transition-colors shadow"
                  >
                    Save Purchase Order
                  </button>
                </div>
              </div>
            )}

            {currentTCode === 'SE38' && (
              <div className="space-y-4 flex flex-col h-full">
                <h3 className="text-sm font-black text-zinc-800 border-b pb-2 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2">
                    <TermIcon className="w-4 h-4 text-amber-500" /> ABAP Editor: Z_SALES_SUMMARY
                  </div>
                  <button 
                    onClick={() => handleAction('run_abap')}
                    className="px-2 py-1 bg-amber-500 text-zinc-950 rounded text-[9px] font-bold hover:bg-amber-400 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Play className="w-3 h-3 fill-current" /> RUN COMPILER (F8)
                  </button>
                </h3>
                <textarea 
                  value={inputs.abapCode}
                  onChange={e => setInputs({ ...inputs, abapCode: e.target.value })}
                  rows={8}
                  className="flex-1 w-full p-3 bg-zinc-900 text-amber-400 font-mono text-[10px] rounded focus:outline-none leading-relaxed"
                />
              </div>
            )}

            {currentTCode === 'STMS' && (
              <div className="space-y-4">
                <h3 className="text-sm font-black text-zinc-800 border-b pb-2 flex items-center gap-2">
                  <Server className="w-4 h-4 text-sky-500" /> Transport Management System (STMS)
                </h3>
                <div className="border border-zinc-200 rounded p-4 bg-zinc-50 max-w-md">
                  <div className="text-[10px] font-black text-zinc-400 uppercase tracking-wider mb-2">Active Transport Queue</div>
                  <div className="flex items-center justify-between border-b py-2 text-xs">
                    <div>
                      <span className="font-mono font-bold text-zinc-700">{inputs.transportReq}</span>
                      <div className="text-[9px] text-zinc-400">Description: Custom VBA/ABAP Sales Query Schema</div>
                    </div>
                    <button 
                      onClick={() => handleAction('release_tr')}
                      className="px-3 py-1 bg-sky-600 hover:bg-sky-500 text-white rounded text-[10px] font-bold cursor-pointer transition-colors"
                    >
                      Release & Import
                    </button>
                  </div>
                </div>
              </div>
            )}

            {currentTCode === 'SM50' && (
              <div className="space-y-4">
                <h3 className="text-sm font-black text-zinc-800 border-b pb-2 flex items-center gap-2">
                  <Settings className="w-4 h-4 text-zinc-500" /> Process Overview (SM50)
                </h3>
                <div className="overflow-x-auto border border-zinc-200 rounded">
                  <table className="w-full text-[10px] font-mono">
                    <thead>
                      <tr className="bg-zinc-100 border-b text-zinc-500 font-bold uppercase">
                        <th className="p-2 border-r">No</th>
                        <th className="p-2 border-r">Type</th>
                        <th className="p-2 border-r">Status</th>
                        <th className="p-2 border-r">Reason</th>
                        <th className="p-2 border-r">User</th>
                        <th className="p-2">Time (s)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2 border-r text-center font-bold">0</td>
                        <td className="p-2 border-r text-center text-blue-600 font-bold">DIA</td>
                        <td className="p-2 border-r text-center text-emerald-600 font-bold">Waiting</td>
                        <td className="p-2 border-r text-center">-</td>
                        <td className="p-2 border-r text-center">SYSTEM</td>
                        <td className="p-2 text-center">0</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 border-r text-center font-bold">1</td>
                        <td className="p-2 border-r text-center text-blue-600 font-bold">DIA</td>
                        <td className="p-2 border-r text-center text-amber-600 font-bold">Running</td>
                        <td className="p-2 border-r text-center">Database Read</td>
                        <td className="p-2 border-r text-center">DEVELOPER</td>
                        <td className="p-2 text-center">12</td>
                      </tr>
                      <tr>
                        <td className="p-2 border-r text-center font-bold">2</td>
                        <td className="p-2 border-r text-center text-purple-600 font-bold">BTC</td>
                        <td className="p-2 border-r text-center text-emerald-600 font-bold">Waiting</td>
                        <td className="p-2 border-r text-center">-</td>
                        <td className="p-2 border-r text-center">BATCH_JOB</td>
                        <td className="p-2 text-center">0</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {!['EASY_ACCESS', 'SU01', 'VA01', 'ME21N', 'SE38', 'STMS', 'SM50'].includes(currentTCode) && (
              <div className="space-y-4 max-w-md">
                <h3 className="text-sm font-black text-zinc-800 border-b pb-2 flex items-center gap-2">
                  <Settings className="w-4 h-4 text-blue-500" /> Transaction: {currentTCode}
                </h3>
                <div className="space-y-3 bg-zinc-50 border p-4 rounded">
                  <p className="text-xs text-zinc-500">Configure parameters for {currentTCode} validation.</p>
                  <div>
                    <label className="block text-[10px] text-zinc-500 uppercase font-black mb-1">Value input validation</label>
                    <input 
                      type="text" 
                      value={inputs.validationRule}
                      onChange={e => setInputs({ ...inputs, validationRule: e.target.value })}
                      placeholder={`Enter verification string for ${currentTCode}`}
                      className="w-full bg-white border border-zinc-300 rounded px-2 py-1 text-zinc-850 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                    />
                  </div>
                  <button 
                    onClick={() => handleAction('custom_tcode')}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-[10px] font-bold cursor-pointer transition-colors shadow"
                  >
                    Execute Command
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Bottom Status bar */}
          <div className="bg-[#f0f0f0] border-t border-zinc-300 px-4 py-1.5 flex items-center justify-between text-[10px] font-bold tracking-wide shrink-0">
            <div className="flex items-center gap-2 text-zinc-600">
              <span className={`inline-block w-2.5 h-2.5 rounded-full ${
                statusBar.type === 'success' ? 'bg-emerald-500' :
                statusBar.type === 'warning' ? 'bg-amber-500' :
                statusBar.type === 'error' ? 'bg-rose-500' : 'bg-sky-500'
              }`} />
              <span>{statusBar.text}</span>
            </div>
            <div className="text-zinc-400">DEV [100]</div>
          </div>

        </div>
      ) : (
        // Modern SAP Fiori Launchpad Layout
        <div className="flex-1 flex flex-col min-h-0 bg-[#e7ebf0]">
          
          {/* Fiori Top Bar */}
          <div className="bg-white border-b border-zinc-200 px-5 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <Layout className="w-4 h-4 text-sky-600" />
              <span className="text-[11px] font-black text-zinc-700 uppercase tracking-widest">SAP Fiori Launchpad</span>
            </div>
            <span className="text-[9px] text-zinc-400 font-bold uppercase bg-zinc-100 px-2 py-0.5 rounded">User: DEVELOPER</span>
          </div>

          {/* Grid Tiles */}
          <div className="flex-1 p-6 overflow-auto min-h-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              
              <div 
                onClick={() => { setCurrentTCode('SU01'); setEnvironment('gui'); setStatusBar({ type: 'info', text: 'Opened SU01 Fiori app.' }); }}
                className="bg-white border border-zinc-200 hover:border-sky-500/40 rounded-xl p-4 cursor-pointer transition-all flex flex-col justify-between h-28 shadow-sm hover:shadow"
              >
                <div className="flex items-center justify-between">
                  <UserPlus className="w-5 h-5 text-sky-600" />
                  <span className="text-[8px] font-bold text-zinc-400 uppercase">SU01</span>
                </div>
                <div>
                  <h4 className="text-[11px] font-bold text-zinc-700 leading-tight">Manage Users</h4>
                  <p className="text-[9px] text-zinc-400">Create, lock, and copy profiles</p>
                </div>
              </div>

              <div 
                onClick={() => { setCurrentTCode('VA01'); setEnvironment('gui'); setStatusBar({ type: 'info', text: 'Opened VA01 Fiori app.' }); }}
                className="bg-white border border-zinc-200 hover:border-emerald-500/40 rounded-xl p-4 cursor-pointer transition-all flex flex-col justify-between h-28 shadow-sm hover:shadow"
              >
                <div className="flex items-center justify-between">
                  <ShoppingCart className="w-5 h-5 text-emerald-600" />
                  <span className="text-[8px] font-bold text-zinc-400 uppercase">VA01</span>
                </div>
                <div>
                  <h4 className="text-[11px] font-bold text-zinc-700 leading-tight">Create Sales Order</h4>
                  <p className="text-[9px] text-zinc-400">Sales order processing app</p>
                </div>
              </div>

              <div 
                onClick={() => { setCurrentTCode('ME21N'); setEnvironment('gui'); setStatusBar({ type: 'info', text: 'Opened ME21N Fiori app.' }); }}
                className="bg-white border border-zinc-200 hover:border-purple-500/40 rounded-xl p-4 cursor-pointer transition-all flex flex-col justify-between h-28 shadow-sm hover:shadow"
              >
                <div className="flex items-center justify-between">
                  <Briefcase className="w-5 h-5 text-purple-600" />
                  <span className="text-[8px] font-bold text-zinc-400 uppercase">ME21N</span>
                </div>
                <div>
                  <h4 className="text-[11px] font-bold text-zinc-700 leading-tight">Manage Purchase Orders</h4>
                  <p className="text-[9px] text-zinc-400">Configure procurement orders</p>
                </div>
              </div>

              <div 
                onClick={() => { setCurrentTCode('STMS'); setEnvironment('gui'); setStatusBar({ type: 'info', text: 'Opened STMS app.' }); }}
                className="bg-white border border-zinc-200 hover:border-sky-500/40 rounded-xl p-4 cursor-pointer transition-all flex flex-col justify-between h-28 shadow-sm hover:shadow"
              >
                <div className="flex items-center justify-between">
                  <Server className="w-5 h-5 text-sky-600" />
                  <span className="text-[8px] font-bold text-zinc-400 uppercase">STMS</span>
                </div>
                <div>
                  <h4 className="text-[11px] font-bold text-zinc-700 leading-tight">Transport Organizer</h4>
                  <p className="text-[9px] text-zinc-400">Release transport routes</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* Bottom Verification Actions */}
      <div className="bg-white border-t border-zinc-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
        {verificationError ? (
          <div className="text-[10px] text-rose-600 font-bold">{verificationError}</div>
        ) : (
          <div className="text-[10px] text-zinc-400">SAP commands, values, and environments are checked dynamically. Select Check to verify.</div>
        )}

        <button 
          onClick={triggerCheck}
          className="px-4 py-2 bg-[#242f3d] hover:bg-[#1a232f] text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
        >
          Check SAP Progress <Check className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
