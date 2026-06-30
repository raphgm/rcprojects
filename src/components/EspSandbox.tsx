import React, { useState } from 'react';
import { 
  Shield, Mail, ShieldAlert, Key, AlertTriangle, Eye, Check, XCircle, Search, Laptop, Monitor, AlertCircle, RefreshCw, Star
} from 'lucide-react';

interface EspSandboxProps {
  currentStepIndex: number;
  onVerifyStep: (
    action: string,
    inputs: { [key: string]: string },
    currentTab: 'inbox' | 'mfa' | 'desk' | 'url',
    score: number
  ) => boolean;
  onStepSuccess: () => void;
}

export function EspSandbox({ currentStepIndex, onVerifyStep, onStepSuccess }: EspSandboxProps) {
  // Navigation
  const [activeTab, setActiveTab] = useState<'inbox' | 'mfa' | 'desk' | 'url'>('inbox');
  const [statusBar, setStatusBar] = useState<{ type: 'success' | 'warning' | 'error' | 'info'; text: string }>({
    type: 'info',
    text: 'ESP Safe Environment active. Incident reporting enabled.'
  });

  // State Management
  const [mfaCode, setMfaCode] = useState<string>('');
  const [selectedEmail, setSelectedEmail] = useState<string>('ceo_giftcard');
  const [score, setScore] = useState<number>(0);
  const [verificationError, setVerificationError] = useState<string | null>(null);

  // Form Inputs
  const [inputs, setInputs] = useState<{ [key: string]: string }>({
    reportedDomain: '',
    stickyPasswordSecure: 'false',
    laptopLockSecure: 'false',
    badgeLockSecure: 'false',
    mfaInputToken: '',
    selectedAction: ''
  });

  const handleAction = (actionType: string) => {
    setVerificationError(null);
    let successMsg = '';
    let isCorrect = false;

    if (actionType === 'report_phishing') {
      if (selectedEmail === 'ceo_giftcard') {
        successMsg = 'Excellent! CEO Gift Card email successfully flagged. BEC attack blocked.';
        isCorrect = true;
      } else {
        successMsg = 'Warning: This email does not appear to be a threat.';
      }
    } else if (actionType === 'verify_url') {
      const domain = inputs.reportedDomain.trim().toLowerCase();
      if (domain === 'microsoft-security-auth.net' || domain.includes('microsoft-security')) {
        successMsg = 'Correct! Identified spoofed domain hijack.';
        isCorrect = true;
      } else {
        successMsg = 'Warning: Inspected domain is not a registered high-risk threat.';
      }
    } else if (actionType === 'secure_desk') {
      if (inputs.stickyPasswordSecure === 'true' && inputs.laptopLockSecure === 'true') {
        successMsg = 'Clean desk audit successfully passed. Physical workspace secured.';
        isCorrect = true;
      } else {
        successMsg = 'Warning: Sticky notes or unlocked screens are still exposed.';
      }
    } else if (actionType === 'setup_mfa') {
      if (inputs.mfaInputToken === '124056') {
        successMsg = 'Multi-Factor Authentication successfully enrolled. Account locked.';
        isCorrect = true;
      } else {
        successMsg = 'Incorrect MFA Token key entered.';
      }
    } else {
      successMsg = `Action '${actionType}' verified.`;
    }

    setStatusBar({ type: isCorrect ? 'success' : 'warning', text: successMsg });

    const isOk = onVerifyStep(actionType, inputs, activeTab, isCorrect ? 100 : score);
    if (isOk) {
      onStepSuccess();
    }
  };

  const triggerCheck = () => {
    const isOk = onVerifyStep('check_progress', inputs, activeTab, score);
    if (isOk) {
      setVerificationError(null);
      onStepSuccess();
    } else {
      setVerificationError('Step requirements not met. Please complete the security simulation exercise correctly.');
    }
  };

  return (
    <div className="border border-zinc-200 bg-[#f4f5f6] rounded-2xl p-0 shadow-2xl overflow-hidden text-zinc-800 flex flex-col h-full font-sans">
      
      {/* ESP Header Bar */}
      <div className="bg-[#0f172a] text-white px-5 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-emerald-400" />
          <div>
            <span className="text-[11px] font-black uppercase tracking-[0.2em] block text-emerald-400">Enterprise Security</span>
            <span className="text-[9px] text-zinc-400">Simulated Risk Environment v1.2</span>
          </div>
        </div>
        
        {/* Navigation tabs */}
        <div className="flex gap-1">
          <button 
            onClick={() => setActiveTab('inbox')}
            className={`px-3 py-1 rounded text-[10px] font-bold cursor-pointer transition-all ${activeTab === 'inbox' ? 'bg-[#3b82f6] text-white' : 'hover:bg-zinc-800 text-zinc-400'}`}
          >
            Email Inbox
          </button>
          <button 
            onClick={() => setActiveTab('mfa')}
            className={`px-3 py-1 rounded text-[10px] font-bold cursor-pointer transition-all ${activeTab === 'mfa' ? 'bg-[#3b82f6] text-white' : 'hover:bg-zinc-800 text-zinc-400'}`}
          >
            MFA Portal
          </button>
          <button 
            onClick={() => setActiveTab('desk')}
            className={`px-3 py-1 rounded text-[10px] font-bold cursor-pointer transition-all ${activeTab === 'desk' ? 'bg-[#3b82f6] text-white' : 'hover:bg-zinc-800 text-zinc-400'}`}
          >
            Clean Desk
          </button>
          <button 
            onClick={() => setActiveTab('url')}
            className={`px-3 py-1 rounded text-[10px] font-bold cursor-pointer transition-all ${activeTab === 'url' ? 'bg-[#3b82f6] text-white' : 'hover:bg-zinc-800 text-zinc-400'}`}
          >
            URL Inspector
          </button>
        </div>
      </div>

      {/* Main Workspace Body */}
      <div className="flex-1 p-5 overflow-auto bg-white min-h-0 text-xs">
        
        {activeTab === 'inbox' && (
          <div className="space-y-4 max-w-xl">
            <h3 className="text-sm font-black text-zinc-700 border-b pb-2 flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-blue-500" /> Simulated Work Email Client
            </h3>
            
            {/* Email select cards */}
            <div className="grid grid-cols-3 gap-3 shrink-0">
              <div 
                onClick={() => setSelectedEmail('ceo_giftcard')}
                className={`border rounded-xl p-3 cursor-pointer transition-all ${selectedEmail === 'ceo_giftcard' ? 'border-[#3b82f6] bg-blue-50/30' : 'border-zinc-200 hover:bg-zinc-50'}`}
              >
                <div className="text-[10px] font-black text-rose-600 uppercase">URGENT</div>
                <div className="font-bold mt-1 text-zinc-850">CEO request</div>
                <div className="text-[9px] text-zinc-400">Sender: CEO Office</div>
              </div>
              <div 
                onClick={() => setSelectedEmail('hr_payroll')}
                className={`border rounded-xl p-3 cursor-pointer transition-all ${selectedEmail === 'hr_payroll' ? 'border-[#3b82f6] bg-blue-50/30' : 'border-zinc-200 hover:bg-zinc-50'}`}
              >
                <div className="text-[10px] font-black text-zinc-400 uppercase">GENERAL</div>
                <div className="font-bold mt-1 text-zinc-850">Payroll Audit</div>
                <div className="text-[9px] text-zinc-400">Sender: payroll@corp</div>
              </div>
              <div 
                onClick={() => setSelectedEmail('sys_alert')}
                className={`border rounded-xl p-3 cursor-pointer transition-all ${selectedEmail === 'sys_alert' ? 'border-[#3b82f6] bg-blue-50/30' : 'border-zinc-200 hover:bg-zinc-50'}`}
              >
                <div className="text-[10px] font-black text-zinc-400 uppercase">SYSTEM</div>
                <div className="font-bold mt-1 text-zinc-850">Login Warning</div>
                <div className="text-[9px] text-zinc-400">Sender: accounts@office</div>
              </div>
            </div>

            {/* Selected Email Panel */}
            <div className="border border-zinc-300 rounded-xl p-4 bg-zinc-50 space-y-3">
              {selectedEmail === 'ceo_giftcard' ? (
                <>
                  <div className="flex justify-between items-start border-b pb-2">
                    <div>
                      <span className="font-bold text-zinc-850 block">From: CEO Office &lt;ceo-urgent-mail-portal@gmail.com&gt;</span>
                      <span className="text-[10px] text-zinc-400">Subject: Immediate purchase of gift cards required for client meeting.</span>
                    </div>
                    <span className="bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded text-[8px]">Urgency Flag</span>
                  </div>
                  <p className="text-zinc-600 leading-relaxed font-mono text-[10px]">
                    Hi Team,<br />
                    I am in a high-priority meeting. I need you to purchase 10 Amazon Gift Cards ($100 each) and send me the codes immediately. Do not call my phone as it is on silent. Reply as soon as possible.
                  </p>
                  <div className="flex gap-2 justify-end pt-2 border-t">
                    <button 
                      onClick={() => handleAction('reply_immediate')}
                      className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded text-[10px] font-bold cursor-pointer"
                    >
                      Reply Immediately
                    </button>
                    <button 
                      onClick={() => handleAction('report_phishing')}
                      className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[10px] font-bold cursor-pointer"
                    >
                      Report as Phishing / Threat
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-10 text-zinc-400">
                  Standard enterprise notification. No immediate phishing indicators detected.
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'mfa' && (
          <div className="space-y-4 max-w-md">
            <h3 className="text-sm font-black text-zinc-700 border-b pb-2 flex items-center gap-1.5">
              <Key className="w-4 h-4 text-emerald-500" /> Multi-Factor Authentication Setup
            </h3>
            
            <div className="border rounded-xl p-4 bg-zinc-50 space-y-4">
              <div>
                <span className="text-[10px] text-zinc-400 font-black uppercase">Step 1: Scan Authenticator QR</span>
                <div className="w-24 h-24 bg-zinc-200 border border-zinc-300 rounded mx-auto mt-2 flex items-center justify-center font-bold text-zinc-500">
                  MFA CODE QR
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-[10px] text-zinc-500 uppercase font-black">Step 2: Enter Verification Code</label>
                <p className="text-[9px] text-zinc-400">Enter "124056" to verify the token connection.</p>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={inputs.mfaInputToken}
                    onChange={e => setInputs({ ...inputs, mfaInputToken: e.target.value })}
                    placeholder="e.g. 124056" 
                    className="flex-1 bg-white border border-zinc-300 rounded px-2.5 py-1.5 font-mono focus:outline-none"
                  />
                  <button 
                    onClick={() => handleAction('setup_mfa')}
                    className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-[10px] font-bold cursor-pointer"
                  >
                    Enroll MFA
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'desk' && (
          <div className="space-y-4 max-w-xl">
            <h3 className="text-sm font-black text-zinc-700 border-b pb-2 flex items-center gap-1.5">
              <Laptop className="w-4 h-4 text-amber-500" /> Office Clean Desk Security Audit
            </h3>

            <div className="border border-dashed border-zinc-300 rounded-xl p-4 bg-zinc-50 grid grid-cols-2 gap-4">
              {/* Sticky Notes Passwords */}
              <div className="border rounded-lg p-3 bg-white space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-zinc-800">Sticky Note Password</span>
                  <span className={`w-2 h-2 rounded-full ${inputs.stickyPasswordSecure === 'true' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                </div>
                <p className="text-[10px] text-zinc-500">A yellow sticky note containing "AdminPass123!" is stuck under the monitor screen.</p>
                <button 
                  onClick={() => setInputs({ ...inputs, stickyPasswordSecure: 'true' })}
                  className="w-full py-1 bg-zinc-150 hover:bg-zinc-200 text-zinc-700 rounded text-[9px] font-bold cursor-pointer"
                >
                  {inputs.stickyPasswordSecure === 'true' ? 'Password Secured' : 'Remove Sticky Note'}
                </button>
              </div>

              {/* Unlocked Workstation */}
              <div className="border rounded-lg p-3 bg-white space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-zinc-800">Laptop Screen Lock</span>
                  <span className={`w-2 h-2 rounded-full ${inputs.laptopLockSecure === 'true' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                </div>
                <p className="text-[10px] text-zinc-500">The laptop is active, unlocked, and logged into the corporate payroll dashboard database.</p>
                <button 
                  onClick={() => setInputs({ ...inputs, laptopLockSecure: 'true' })}
                  className="w-full py-1 bg-zinc-150 hover:bg-zinc-200 text-zinc-700 rounded text-[9px] font-bold cursor-pointer"
                >
                  {inputs.laptopLockSecure === 'true' ? 'Screen Locked' : 'Press Win+L to Lock'}
                </button>
              </div>
            </div>

            <button 
              onClick={() => handleAction('secure_desk')}
              className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-[10px] font-bold cursor-pointer transition-colors"
            >
              Verify Desk Security Audit
            </button>
          </div>
        )}

        {activeTab === 'url' && (
          <div className="space-y-4 max-w-md">
            <h3 className="text-sm font-black text-zinc-700 border-b pb-2 flex items-center gap-1.5">
              <Search className="w-4 h-4 text-blue-500" /> URL Phishing Domain Inspector
            </h3>

            <div className="border rounded-xl p-4 bg-zinc-50 space-y-4">
              <div className="text-[10px] font-black text-zinc-400 uppercase tracking-wide">Threat list database lookup</div>
              
              <div className="space-y-2">
                <label className="block text-[10px] text-zinc-500 font-bold">Investigate Domain Name</label>
                <p className="text-[9px] text-zinc-400">e.g. microsoft-security-auth.net</p>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={inputs.reportedDomain}
                    onChange={e => setInputs({ ...inputs, reportedDomain: e.target.value })}
                    placeholder="Enter suspicious domain URL" 
                    className="flex-1 bg-white border border-zinc-300 rounded px-2.5 py-1.5 font-mono text-[10px] focus:outline-none"
                  />
                  <button 
                    onClick={() => handleAction('verify_url')}
                    className="px-4 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded text-[10px] font-bold cursor-pointer"
                  >
                    Flag Threat
                  </button>
                </div>
              </div>
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
        <div className="text-zinc-400">SCORE: {score}%</div>
      </div>

      {/* Bottom check progress */}
      <div className="bg-white border-t border-zinc-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
        {verificationError ? (
          <div className="text-[10px] text-rose-600 font-bold">{verificationError}</div>
        ) : (
          <div className="text-[10px] text-zinc-400">Security decisions are validated at each step. Click Check to verify.</div>
        )}

        <button 
          onClick={triggerCheck}
          className="px-4 py-2 bg-[#0f172a] hover:bg-[#1e293b] text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
        >
          Check Security Progress <Check className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
