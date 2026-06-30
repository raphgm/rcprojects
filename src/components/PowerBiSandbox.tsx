import React, { useState } from 'react';
import { 
  BarChart2, Grid, Layers, Play, Check, Shield, FileText, Layout, Database, RefreshCw, 
  Settings, FileSpreadsheet, Plus, HelpCircle, ChevronRight, ChevronDown, Table, 
  Map, PieChart, TrendingUp, Cpu, HardDrive, ZoomIn, Sliders, Maximize2, Download, ExternalLink
} from 'lucide-react';

interface PowerBiSandboxProps {
  currentStepIndex: number;
  onVerifyStep: (
    action: string,
    inputs: { [key: string]: string },
    currentView: 'report' | 'data' | 'model',
    daxFormula: string
  ) => boolean;
  onStepSuccess: () => void;
}

export function PowerBiSandbox({ currentStepIndex, onVerifyStep, onStepSuccess }: PowerBiSandboxProps) {
  // Navigation & UI States
  const [viewMode, setViewMode] = useState<'report' | 'data' | 'model'>('report');
  const [activeTab, setActiveTab] = useState<'home' | 'insert' | 'modeling' | 'view' | 'help'>('home');
  const [activePage, setActivePage] = useState<string>('Sales Overview');
  const [daxFormula, setDaxFormula] = useState<string>('');
  const [selectedTable, setSelectedTable] = useState<string>('Fact_Sales');
  const [zoomLevel, setZoomLevel] = useState<number>(85);
  const [visualType, setVisualType] = useState<'bar' | 'line' | 'pie' | 'map'>('bar');
  const [dynamicPages, setDynamicPages] = useState<string[]>(['Sales Overview', 'Customer Demographics']);
  const [canvasTheme, setCanvasTheme] = useState<'light' | 'dark'>('light');
  
  const [statusBar, setStatusBar] = useState<{ type: 'success' | 'warning' | 'error' | 'info'; text: string }>({
    type: 'info',
    text: 'Power BI Desktop Connected. Live Semantic Model Active.'
  });

  // ETL Form States
  const [inputs, setInputs] = useState<{ [key: string]: string }>({
    dataSourceType: '',
    etlStep: '',
    relationshipType: '',
    refreshPolicy: '',
    rlsRole: '',
    copilotPrompt: '',
    workspaceName: ''
  });

  const [verificationError, setVerificationError] = useState<string | null>(null);

  const handleAction = (actionType: string) => {
    setVerificationError(null);
    let successMsg = '';

    if (actionType === 'apply_dax') {
      if (!daxFormula.trim()) {
        setStatusBar({ type: 'warning', text: 'DAX formula input is empty.' });
        return;
      }
      successMsg = `DAX Measure compiles successfully. Added: ${daxFormula.split('=')[0] || 'Measure'}`;
    } else if (actionType === 'apply_etl') {
      successMsg = `Power Query transformation applied: ${inputs.etlStep || 'Clean Data'}.`;
    } else if (actionType === 'connect_source') {
      successMsg = `Connected successfully to source: ${inputs.dataSourceType || 'Excel File'}.`;
    } else if (actionType === 'save_relationship') {
      successMsg = `Active relationship set: ${inputs.relationshipType || '1-to-many'}.`;
    } else if (actionType === 'refresh_data') {
      successMsg = 'Gateway trigger successfully executed. Refresh completed in 1.4s.';
    } else if (actionType === 'publish_report') {
      successMsg = `Report successfully published to Cloud Workspace: ${inputs.workspaceName || 'Production'}.`;
    } else {
      successMsg = `Action '${actionType}' completed successfully.`;
    }

    setStatusBar({ type: 'success', text: successMsg });

    const isOk = onVerifyStep(actionType, inputs, viewMode, daxFormula);
    if (isOk) {
      onStepSuccess();
    }
  };

  const triggerCheck = () => {
    const isOk = onVerifyStep('check_progress', inputs, viewMode, daxFormula);
    if (isOk) {
      setVerificationError(null);
      onStepSuccess();
    } else {
      setVerificationError('Step requirements not met. Check DAX query syntax, active view configurations, or form values.');
    }
  };

  return (
    <div className="border border-zinc-300 bg-[#f3f2f1] rounded-2xl p-0 shadow-2xl overflow-hidden text-zinc-800 flex flex-col h-full font-sans select-none">
      
      {/* Power BI Title Bar */}
      <div className="bg-[#1f1f1f] text-zinc-300 px-4 py-1.5 flex items-center justify-between text-[11px] shrink-0 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 bg-[#f2c811] text-zinc-950 flex items-center justify-center rounded font-black text-[9px]">
            Pb
          </div>
          <span className="font-medium text-zinc-400">Sales Analytics Model - Power BI Desktop</span>
        </div>
        <div className="flex items-center gap-3 text-zinc-500">
          <span className="text-zinc-400 text-[10px]">Client Mode: DEV (100)</span>
        </div>
      </div>

      {/* Power BI File/Tab Ribbon Menu */}
      <div className="bg-[#f3f2f1] border-b border-zinc-200 shrink-0">
        {/* Ribbon Tabs */}
        <div className="flex items-center gap-1 border-b border-zinc-200 px-4 text-[11px] font-semibold text-zinc-600 bg-[#f3f2f1]">
          <button className="px-3 py-1.5 hover:bg-zinc-200 text-zinc-700 font-bold border-b-2 border-transparent">File</button>
          <button 
            onClick={() => setActiveTab('home')}
            className={`px-3 py-1.5 border-b-2 transition-all cursor-pointer ${activeTab === 'home' ? 'border-[#f2c811] text-zinc-900 font-bold bg-white' : 'border-transparent hover:bg-zinc-200'}`}
          >
            Home
          </button>
          <button 
            onClick={() => setActiveTab('insert')}
            className={`px-3 py-1.5 border-b-2 transition-all cursor-pointer ${activeTab === 'insert' ? 'border-[#f2c811] text-zinc-900 font-bold bg-white' : 'border-transparent hover:bg-zinc-200'}`}
          >
            Insert
          </button>
          <button 
            onClick={() => setActiveTab('modeling')}
            className={`px-3 py-1.5 border-b-2 transition-all cursor-pointer ${activeTab === 'modeling' ? 'border-[#f2c811] text-zinc-900 font-bold bg-white' : 'border-transparent hover:bg-zinc-200'}`}
          >
            Modeling
          </button>
          <button 
            onClick={() => setActiveTab('view')}
            className={`px-3 py-1.5 border-b-2 transition-all cursor-pointer ${activeTab === 'view' ? 'border-[#f2c811] text-zinc-900 font-bold bg-white' : 'border-transparent hover:bg-zinc-200'}`}
          >
            View
          </button>
        </div>

        {/* Home Ribbon Actions Row */}
        {activeTab === 'home' && (
          <div className="bg-white p-2 border-b border-zinc-300 flex items-center justify-between gap-4 overflow-x-auto text-[10px] font-medium text-zinc-700">
            <div className="flex items-center gap-4 divide-x divide-zinc-200">
              {/* Ingestion Group */}
              <div className="flex items-center gap-2.5">
                <button 
                  onClick={() => { setViewMode('data'); handleAction('connect_source'); }}
                  className="flex flex-col items-center gap-1 hover:bg-zinc-100 p-1.5 rounded transition-all cursor-pointer"
                >
                  <Database className="w-4 h-4 text-emerald-600" />
                  <span>Get Data</span>
                </button>
                <button 
                  onClick={() => { setViewMode('data'); setInputs({ ...inputs, dataSourceType: 'Sales.xlsx' }); }}
                  className="flex flex-col items-center gap-1 hover:bg-zinc-100 p-1.5 rounded transition-all cursor-pointer"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
                  <span>Excel Book</span>
                </button>
              </div>

              {/* Calculations Group */}
              <div className="flex items-center gap-2.5 pl-4">
                <button 
                  onClick={() => { setViewMode('report'); }}
                  className="flex flex-col items-center gap-1 hover:bg-zinc-100 p-1.5 rounded transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-blue-600" />
                  <span>New Measure</span>
                </button>
                <button 
                  onClick={() => handleAction('refresh_data')}
                  className="flex flex-col items-center gap-1 hover:bg-zinc-100 p-1.5 rounded transition-all cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4 text-amber-500 animate-spin-slow" />
                  <span>Refresh</span>
                </button>
              </div>

              {/* Share Group */}
              <div className="flex items-center gap-2.5 pl-4">
                <button 
                  onClick={() => handleAction('publish_report')}
                  className="flex flex-col items-center gap-1 hover:bg-zinc-100 p-1.5 rounded transition-all cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4 text-indigo-600" />
                  <span>Publish</span>
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-2 pr-2">
              <span className="text-[9px] text-zinc-400">Environment:</span>
              <span className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded text-[9px]">SaaS Fabric Client</span>
            </div>
          </div>
        )}

        {/* Other Ribbon Tabs */}
        {activeTab === 'insert' && (
          <div className="bg-white p-2 border-b border-zinc-300 flex items-center gap-4 text-[10px] font-medium text-zinc-700 overflow-x-auto">
            <button 
              onClick={() => { setViewMode('report'); setVisualType('pie'); setStatusBar({ type: 'success', text: 'Inserted dynamic pie chart visual.' }); }}
              className="flex flex-col items-center gap-1 hover:bg-zinc-100 p-1.5 rounded cursor-pointer"
            >
              <PieChart className="w-4 h-4 text-indigo-600" />
              <span>Pie Chart</span>
            </button>
            <button 
              onClick={() => { setViewMode('report'); setVisualType('map'); setStatusBar({ type: 'success', text: 'Inserted map visual.' }); }}
              className="flex flex-col items-center gap-1 hover:bg-zinc-100 p-1.5 rounded cursor-pointer"
            >
              <Map className="w-4 h-4 text-amber-600" />
              <span>Map Visual</span>
            </button>
            <button 
              onClick={() => { setStatusBar({ type: 'info', text: 'Copilot AI Q&A session initialized.' }); }}
              className="flex flex-col items-center gap-1 hover:bg-zinc-100 p-1.5 rounded cursor-pointer"
            >
              <Cpu className="w-4 h-4 text-blue-500" />
              <span>AI Q&A</span>
            </button>
          </div>
        )}

        {activeTab === 'modeling' && (
          <div className="bg-white p-2 border-b border-zinc-300 flex items-center gap-4 text-[10px] font-medium text-zinc-700 overflow-x-auto">
            <button 
              onClick={() => { setViewMode('model'); setInputs({ ...inputs, relationshipType: '1-to-many' }); setStatusBar({ type: 'info', text: 'Please define relationship type.' }); }}
              className="flex flex-col items-center gap-1 hover:bg-zinc-100 p-1.5 rounded cursor-pointer"
            >
              <Layers className="w-4 h-4 text-[#f2c811]" />
              <span>Manage Relations</span>
            </button>
            <button 
              onClick={() => { setStatusBar({ type: 'success', text: 'Active RLS security filter applied.' }); }}
              className="flex flex-col items-center gap-1 hover:bg-zinc-100 p-1.5 rounded cursor-pointer"
            >
              <Shield className="w-4 h-4 text-rose-500" />
              <span>Manage Roles</span>
            </button>
          </div>
        )}

        {activeTab === 'view' && (
          <div className="bg-white p-2 border-b border-zinc-300 flex items-center gap-4 text-[10px] font-medium text-zinc-700 overflow-x-auto">
            <button 
              onClick={() => { setCanvasTheme(canvasTheme === 'light' ? 'dark' : 'light'); setStatusBar({ type: 'info', text: `Canvas theme set to: ${canvasTheme === 'light' ? 'dark' : 'light'}` }); }}
              className="flex flex-col items-center gap-1 hover:bg-zinc-100 p-1.5 rounded cursor-pointer"
            >
              <Sliders className="w-4 h-4 text-zinc-650" />
              <span>High Contrast Theme</span>
            </button>
            <button 
              onClick={() => { setZoomLevel(zoomLevel === 100 ? 85 : 100); }}
              className="flex flex-col items-center gap-1 hover:bg-zinc-100 p-1.5 rounded cursor-pointer"
            >
              <ZoomIn className="w-4 h-4 text-zinc-500" />
              <span>Toggle Zoom</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Workspace (Views selector, Canvas and Visualizations/Fields Panes) */}
      <div className="flex-1 flex min-h-0 bg-white">
        
        {/* Left Side View Switcher (Report, Data, Model) */}
        <div className="w-12 bg-[#eae8e6] border-r border-zinc-200 flex flex-col items-center py-4 gap-4 shrink-0 shadow-inner">
          <button 
            onClick={() => setViewMode('report')}
            className={`p-2 rounded-lg cursor-pointer transition-all border ${viewMode === 'report' ? 'bg-[#f2c811]/20 text-zinc-950 border-[#f2c811]' : 'text-zinc-500 border-transparent hover:text-zinc-800 hover:bg-zinc-200'}`}
            title="Report View (Canvas)"
          >
            <Layout className="w-5 h-5 text-amber-600" />
          </button>
          <button 
            onClick={() => setViewMode('data')}
            className={`p-2 rounded-lg cursor-pointer transition-all border ${viewMode === 'data' ? 'bg-[#f2c811]/20 text-zinc-950 border-[#f2c811]' : 'text-zinc-500 border-transparent hover:text-zinc-800 hover:bg-zinc-200'}`}
            title="Data View (Table Rows)"
          >
            <Grid className="w-5 h-5 text-emerald-600" />
          </button>
          <button 
            onClick={() => setViewMode('model')}
            className={`p-2 rounded-lg cursor-pointer transition-all border ${viewMode === 'model' ? 'bg-[#f2c811]/20 text-zinc-950 border-[#f2c811]' : 'text-zinc-500 border-transparent hover:text-zinc-800 hover:bg-zinc-200'}`}
            title="Model View (Semantic Schema)"
          >
            <Layers className="w-5 h-5 text-indigo-600" />
          </button>
        </div>

        {/* Central Active Workspace */}
        <div className="flex-1 flex flex-col min-h-0 bg-[#eae8e6] p-4 relative">
          
          {/* DAX Formula Bar */}
          <div className="bg-white border border-zinc-300 p-1.5 rounded-lg mb-3 flex items-center gap-2 shadow-sm shrink-0">
            <span className="font-mono text-[9px] font-black text-zinc-400 bg-zinc-100 px-1.5 py-0.5 rounded">fx</span>
            <input 
              type="text"
              value={daxFormula}
              onChange={e => setDaxFormula(e.target.value)}
              placeholder="Total Sales = SUM(Sales[Amount])"
              className="flex-1 bg-transparent border-0 focus:outline-none font-mono text-[11px] text-zinc-850"
            />
            <button 
              onClick={() => handleAction('apply_dax')}
              className="p-1 bg-[#f2c811] hover:bg-[#ebd460] text-zinc-950 rounded text-[9px] font-bold cursor-pointer transition-all flex items-center gap-0.5 px-3 py-1 shadow-sm"
            >
              Apply <Check className="w-3 h-3 stroke-[3]" />
            </button>
          </div>

          {/* Canvas Area */}
          <div className={`flex-1 border border-zinc-300 rounded-lg p-6 overflow-auto min-h-0 relative shadow-inner transition-colors duration-300 ${canvasTheme === 'dark' ? 'bg-zinc-900 border-zinc-750 text-white' : 'bg-white text-zinc-800'}`}>
            {canvasTheme === 'dark' && (
              <div className="absolute inset-0 bg-[#0e1726]/10 pointer-events-none" />
            )}
            
            {/* Dashed layout bounding box of a printable page */}
            <div className="absolute inset-4 border border-dashed border-zinc-200 pointer-events-none rounded" />
            
            {viewMode === 'report' && (
              <div className="h-full flex flex-col relative z-10">
                {/* Canvas Header */}
                <div className="flex justify-between items-center border-b pb-3 mb-4 shrink-0">
                  <div>
                    <h3 className="text-sm font-black text-zinc-800 uppercase tracking-wider">{activePage}</h3>
                    <p className="text-[9px] text-zinc-400">Power BI Desktop Interactive Canvas</p>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-bold bg-zinc-100 px-2 py-0.5 rounded">Scale: {zoomLevel}%</span>
                </div>

                {/* Dashboard grid */}
                <div className="flex-1 grid grid-cols-3 gap-4 min-h-0">
                  {/* Cards columns */}
                  <div className="col-span-3 grid grid-cols-3 gap-4 shrink-0">
                    {/* KPI 1 */}
                    <div className={`border rounded-xl p-3 shadow-sm transition-all ${canvasTheme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-900'}`}>
                      <span className="text-[9px] text-zinc-400 uppercase font-black tracking-wider">Total Sales Revenue</span>
                      <div className="text-xl font-black mt-1">$1,240,500</div>
                      <div className="text-[8px] text-emerald-600 font-bold mt-0.5">▲ +14.5% vs Target</div>
                    </div>
                    {/* KPI 2 */}
                    <div className={`border rounded-xl p-3 shadow-sm transition-all ${canvasTheme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-900'}`}>
                      <span className="text-[9px] text-zinc-400 uppercase font-black tracking-wider">Total Order Volume</span>
                      <div className="text-xl font-black mt-1">12,450 units</div>
                      <div className="text-[8px] text-zinc-500 font-bold mt-0.5">● Dynamic aggregate model</div>
                    </div>
                    {/* KPI 3 */}
                    <div className={`border rounded-xl p-3 shadow-sm transition-all ${canvasTheme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-900'}`}>
                      <span className="text-[9px] text-zinc-400 uppercase font-black tracking-wider">Active Customers</span>
                      <div className="text-xl font-black mt-1">1,024 clients</div>
                      <div className="text-[8px] text-indigo-500 font-bold mt-0.5">★ Customer Retention: 98%</div>
                    </div>
                  </div>

                  {/* Main visuals */}
                  <div className={`col-span-2 border rounded-xl p-4 flex flex-col justify-between shadow-sm min-h-0 transition-all ${canvasTheme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-950'}`}>
                    <span className="text-[10px] text-zinc-400 uppercase font-black tracking-wider border-b pb-1.5">Sales Trend Over Time ({visualType.toUpperCase()})</span>
                    
                    {visualType === 'bar' && (
                      <div className="flex-1 flex items-end gap-3 justify-center py-4 min-h-0">
                        <div className="w-8 bg-[#f2c811] h-3/4 rounded-sm animate-pulse-slow" />
                        <div className="w-8 bg-[#f2c811] h-1/2 rounded-sm" />
                        <div className="w-8 bg-zinc-400 h-full rounded-sm" />
                        <div className="w-8 bg-[#f2c811] h-2/3 rounded-sm" />
                      </div>
                    )}

                    {visualType === 'line' && (
                      <div className="flex-1 flex items-end justify-center py-2 min-h-0 relative">
                        <svg className="w-full h-full max-h-28" viewBox="0 0 100 30" preserveAspectRatio="none">
                          <path d="M0,25 Q20,10 40,18 T80,5 T100,12" fill="none" stroke="#f2c811" strokeWidth="2.5" />
                          <circle cx="40" cy="18" r="2.5" fill="#242f3d" />
                          <circle cx="80" cy="5" r="2.5" fill="#242f3d" />
                        </svg>
                      </div>
                    )}

                    {visualType === 'pie' && (
                      <div className="flex-1 flex items-center justify-center py-2">
                        <PieChart className="w-16 h-16 text-[#f2c811] stroke-[2]" />
                      </div>
                    )}

                    {visualType === 'map' && (
                      <div className="flex-1 flex items-center justify-center py-2">
                        <Map className="w-16 h-16 text-indigo-500 stroke-[2] animate-bounce" />
                      </div>
                    )}

                    <div className="flex justify-between text-[8px] text-zinc-400 font-semibold border-t pt-1.5">
                      <span>Q1 Sales</span>
                      <span>Q2 Sales</span>
                      <span>Q3 Sales</span>
                      <span>Q4 Sales</span>
                    </div>
                  </div>

                  <div className={`col-span-1 border rounded-xl p-4 flex flex-col justify-between shadow-sm min-h-0 transition-all ${canvasTheme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-950'}`}>
                    <span className="text-[10px] text-zinc-400 uppercase font-black tracking-wider border-b pb-1.5">Market Share</span>
                    <div className="flex-1 flex items-center justify-center py-2">
                      <PieChart className="w-14 h-14 text-indigo-500 stroke-[1.5]" />
                    </div>
                    <div className="text-[8px] text-zinc-400 text-center font-bold">
                      Enterprise: 58% | Retail: 42%
                    </div>
                  </div>
                </div>

                {/* Source connection parameters */}
                <div className="mt-4 bg-zinc-50 border border-zinc-200 rounded-xl p-4 shrink-0 space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input 
                      type="text" 
                      value={inputs.dataSourceType}
                      onChange={e => setInputs({ ...inputs, dataSourceType: e.target.value })}
                      placeholder="Enter Data Source Connection (e.g. Sales.csv or SQL Server)" 
                      className="flex-1 bg-white border border-zinc-300 rounded-lg px-3 py-1.5 text-[10px] focus:outline-none focus:ring-1 focus:ring-[#f2c811] font-mono text-zinc-800"
                    />
                    <button 
                      onClick={() => handleAction('connect_source')}
                      className="px-4 py-1.5 bg-[#242f3d] hover:bg-[#1a232f] text-white rounded-lg text-[10px] font-bold cursor-pointer transition-colors shadow"
                    >
                      Connect Connector
                    </button>
                  </div>
                </div>
              </div>
            )}

            {viewMode === 'data' && (
              <div className="h-full flex flex-col relative z-10">
                <div className="flex justify-between items-center border-b pb-3 mb-4 shrink-0">
                  <div>
                    <h3 className="text-sm font-black text-zinc-800 uppercase tracking-wider">Data Table Grid View</h3>
                    <p className="text-[9px] text-zinc-400">Preview ingested raw rows</p>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-bold bg-zinc-100 px-2 py-0.5 rounded uppercase">Table: {selectedTable}</span>
                </div>

                {/* ETL Applied transform actions */}
                <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 mb-4 shrink-0 space-y-3">
                  <span className="text-[10px] text-zinc-400 uppercase font-black tracking-wide">Ingestion ETL Step Actions</span>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={inputs.etlStep}
                      onChange={e => setInputs({ ...inputs, etlStep: e.target.value })}
                      placeholder="Enter Power Query step (e.g. UNPIVOT or REMOVE_NULLS)" 
                      className="flex-1 bg-white border border-zinc-300 rounded px-2.5 py-1.5 text-[10px] focus:outline-none font-mono"
                    />
                    <button 
                      onClick={() => handleAction('apply_etl')}
                      className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[10px] font-bold cursor-pointer shadow"
                    >
                      Apply Step
                    </button>
                  </div>
                </div>

                {/* Grid table */}
                <div className="flex-1 border border-zinc-200 rounded overflow-x-auto">
                  <table className="w-full text-[10px] font-mono text-zinc-700">
                    <thead>
                      <tr className="bg-zinc-50 border-b font-bold uppercase text-zinc-500">
                        <th className="p-2 border-r text-center">RowID</th>
                        <th className="p-2 border-r text-center">Date</th>
                        <th className="p-2 border-r text-center">Segment</th>
                        <th className="p-2 text-center">Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2 border-r text-center font-bold">1</td>
                        <td className="p-2 border-r text-center">2026-06-30</td>
                        <td className="p-2 border-r text-center">Enterprise</td>
                        <td className="p-2 text-center font-bold">$12,450</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 border-r text-center font-bold">2</td>
                        <td className="p-2 border-r text-center">2026-06-29</td>
                        <td className="p-2 border-r text-center">Mid-Market</td>
                        <td className="p-2 text-center font-bold">$8,210</td>
                      </tr>
                      <tr>
                        <td className="p-2 border-r text-center font-bold">3</td>
                        <td className="p-2 border-r text-center">2026-06-28</td>
                        <td className="p-2 border-r text-center">Developer</td>
                        <td className="p-2 text-center font-bold">$3,900</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {viewMode === 'model' && (
              <div className="h-full flex flex-col relative z-10">
                <div className="flex justify-between items-center border-b pb-3 mb-4 shrink-0">
                  <div>
                    <h3 className="text-sm font-black text-zinc-800 uppercase tracking-wider">Semantic Relationship Map</h3>
                    <p className="text-[9px] text-zinc-400">Star Schema connections configuration</p>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-bold bg-zinc-100 px-2 py-0.5 rounded uppercase">Relations: star schema</span>
                </div>

                <div className="flex-1 grid grid-cols-2 gap-6 items-center justify-center relative">
                  {/* Table card 1: Fact Sales */}
                  <div className="border-2 border-[#f2c811] rounded-xl p-4 bg-zinc-50 relative shadow">
                    <span className="text-[9px] text-[#f2c811] uppercase font-black tracking-wider">Fact Table</span>
                    <h4 className="font-mono font-bold text-zinc-800 border-b pb-1 mb-2">Fact_Sales</h4>
                    <div className="text-[9px] text-zinc-500 font-mono space-y-1">
                      <div>🔑 SalesKey (Integer)</div>
                      <div>🔗 CustomerKey (Integer)</div>
                      <div>💲 Revenue (Decimal)</div>
                    </div>
                  </div>
                  {/* Table card 2: Dim Customer */}
                  <div className="border border-zinc-200 rounded-xl p-4 bg-zinc-50 relative shadow">
                    <span className="text-[9px] text-zinc-400 uppercase font-black tracking-wider">Dimension Table</span>
                    <h4 className="font-mono font-bold text-zinc-800 border-b pb-1 mb-2">Dim_Customer</h4>
                    <div className="text-[9px] text-zinc-500 font-mono space-y-1">
                      <div>🔑 CustomerKey (Integer)</div>
                      <div>👤 CustomerName (String)</div>
                      <div>📍 Region (String)</div>
                    </div>
                  </div>
                </div>

                {/* Relationship setup */}
                <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 shrink-0 space-y-3">
                  <span className="text-[10px] text-zinc-400 uppercase font-black tracking-wide">Define Card Relationship Constraints</span>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={inputs.relationshipType}
                      onChange={e => setInputs({ ...inputs, relationshipType: e.target.value })}
                      placeholder="Enter cardinality (e.g. 1-to-many or many-to-many)" 
                      className="flex-1 bg-white border border-zinc-300 rounded px-2.5 py-1.5 text-[10px] focus:outline-none font-mono"
                    />
                    <button 
                      onClick={() => handleAction('save_relationship')}
                      className="px-4 py-1.5 bg-[#242f3d] text-white rounded-lg text-[10px] font-bold cursor-pointer shadow"
                    >
                      Define Relationship
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Bottom page tabs within active canvas */}
          <div className="flex items-center justify-between mt-3 bg-white border border-zinc-300 rounded-lg px-4 py-1.5 text-[10px] font-bold text-zinc-500 shrink-0 shadow-sm">
            <div className="flex items-center gap-2">
              {dynamicPages.map((page) => (
                <button 
                  key={page}
                  onClick={() => setActivePage(page)}
                  className={`px-3 py-1 rounded transition-all cursor-pointer ${activePage === page ? 'bg-[#f2c811]/20 text-zinc-950 border border-[#f2c811]/40' : 'hover:bg-zinc-100'}`}
                >
                  {page}
                </button>
              ))}
              <button 
                onClick={() => {
                  const newPageName = `Page ${dynamicPages.length + 1}`;
                  setDynamicPages([...dynamicPages, newPageName]);
                  setActivePage(newPageName);
                  setStatusBar({ type: 'success', text: `Created new workspace sheet: ${newPageName}` });
                }}
                className="p-1 hover:bg-zinc-100 rounded text-zinc-400 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
              </button>
            </div>
            <div className="flex items-center gap-3 text-zinc-400 text-[9px] font-black uppercase">
              <span>Page {dynamicPages.indexOf(activePage) + 1} of {dynamicPages.length}</span>
            </div>
          </div>
        </div>

        {/* Right Panel: Fields & Visualizations Pane */}
        <div className="w-56 bg-[#f3f2f1] border-l border-zinc-200 p-4 flex flex-col gap-5 shrink-0 overflow-y-auto">
          {/* Visualizations Pane Section */}
          <div className="space-y-2">
            <div className="text-[10px] text-zinc-400 uppercase font-black tracking-wider border-b pb-1.5 flex items-center justify-between">
              <span>Visualizations</span>
              <Settings className="w-3.5 h-3.5" />
            </div>
            <div className="grid grid-cols-4 gap-1">
              {/* Grid of micro-chart icon shapes */}
              <div 
                onClick={() => { setViewMode('report'); setVisualType('bar'); }}
                className={`border p-1.5 rounded cursor-pointer flex items-center justify-center transition-all ${visualType === 'bar' ? 'border-[#f2c811] bg-[#f2c811]/10' : 'border-zinc-300 bg-white hover:border-[#f2c811]'}`} 
                title="Bar Chart"
              >
                <BarChart2 className="w-4 h-4 text-sky-600" />
              </div>
              <div 
                onClick={() => { setViewMode('report'); setVisualType('line'); }}
                className={`border p-1.5 rounded cursor-pointer flex items-center justify-center transition-all ${visualType === 'line' ? 'border-[#f2c811] bg-[#f2c811]/10' : 'border-zinc-300 bg-white hover:border-[#f2c811]'}`} 
                title="Line Chart"
              >
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              </div>
              <div 
                onClick={() => { setViewMode('report'); setVisualType('pie'); }}
                className={`border p-1.5 rounded cursor-pointer flex items-center justify-center transition-all ${visualType === 'pie' ? 'border-[#f2c811] bg-[#f2c811]/10' : 'border-zinc-300 bg-white hover:border-[#f2c811]'}`} 
                title="Donut Chart"
              >
                <PieChart className="w-4 h-4 text-indigo-650" />
              </div>
              <div 
                onClick={() => { setViewMode('report'); setVisualType('map'); }}
                className={`border p-1.5 rounded cursor-pointer flex items-center justify-center transition-all ${visualType === 'map' ? 'border-[#f2c811] bg-[#f2c811]/10' : 'border-zinc-300 bg-white hover:border-[#f2c811]'}`} 
                title="Map"
              >
                <Map className="w-4 h-4 text-amber-650" />
              </div>
            </div>
          </div>

          {/* Fields Pane Section */}
          <div className="space-y-3 flex-1 flex flex-col min-h-0">
            <div className="text-[10px] text-zinc-400 uppercase font-black tracking-wider border-b pb-1.5">
              Data Pane Fields
            </div>
            <div className="space-y-3 overflow-y-auto text-[10px] text-zinc-650 font-bold select-none">
              
              <div className="space-y-1">
                <div 
                  onClick={() => setSelectedTable('Fact_Sales')}
                  className="flex items-center gap-1.5 hover:text-zinc-900 cursor-pointer"
                >
                  <ChevronDown className="w-3 h-3" />
                  <Table className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Fact_Sales</span>
                </div>
                {selectedTable === 'Fact_Sales' && (
                  <div className="pl-4 font-mono font-medium text-zinc-500 space-y-1.5 border-l border-zinc-200 ml-1.5 pt-1">
                    <div className="flex items-center gap-1">∑ SalesKey</div>
                    <div className="flex items-center gap-1">∑ CustomerKey</div>
                    <div className="flex items-center gap-1">📅 Date</div>
                    <div className="flex items-center gap-1">∑ Revenue</div>
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <div 
                  onClick={() => setSelectedTable('Dim_Customer')}
                  className="flex items-center gap-1.5 hover:text-zinc-900 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3" />
                  <Table className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Dim_Customer</span>
                </div>
                {selectedTable === 'Dim_Customer' && (
                  <div className="pl-4 font-mono font-medium text-zinc-500 space-y-1.5 border-l border-zinc-200 ml-1.5 pt-1">
                    <div className="flex items-center gap-1">🔑 CustomerKey</div>
                    <div className="flex items-center gap-1">👤 CustomerName</div>
                    <div className="flex items-center gap-1">📍 Region</div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Bottom Check Bar */}
      <div className="bg-white border-t border-zinc-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
        {verificationError ? (
          <div className="text-[10px] text-rose-600 font-bold">{verificationError}</div>
        ) : (
          <div className="text-[10px] text-zinc-400">Power BI formulas, viewmodes, and connections are evaluated. Click Check to verify.</div>
        )}

        <button 
          onClick={triggerCheck}
          className="px-4 py-2 bg-[#242f3d] hover:bg-[#1a232f] text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
        >
          Check Power BI Progress <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
        </button>
      </div>

    </div>
  );
}
