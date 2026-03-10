import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, ChevronRight } from 'lucide-react';
import { LinuxFlavor } from '../App';

interface TerminalProps {
  initialMessage?: string;
  availableCommands?: string[];
  onCommand?: (command: string) => string;
  flavor?: LinuxFlavor;
}

export const Terminal: React.FC<TerminalProps> = ({ 
  initialMessage = 'Welcome to the Realcloud Sandbox!', 
  availableCommands = ['ls', 'pwd', 'whoami', 'date', 'clear'],
  onCommand,
  flavor = 'ubuntu'
}) => {
  const [history, setHistory] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [isBooting, setIsBooting] = useState(true);
  const [bootProgress, setBootProgress] = useState(0);
  const [currentDir, setCurrentDir] = useState('/home/user');
  const scrollRef = useRef<HTMLDivElement>(null);

  const fileSystem: Record<string, string[]> = {
    '/': ['bin', 'etc', 'home', 'var', 'tmp', 'usr', 'root', 'dev', 'proc'],
    '/bin': ['bash', 'ls', 'pwd', 'cat', 'mkdir', 'touch', 'rm', 'cp', 'mv', 'echo', 'ps', 'apt', 'top', 'uname'],
    '/etc': ['passwd', 'group', 'hosts', 'hostname', 'network', 'ssh', 'os-release'],
    '/home': ['user'],
    '/home/user': ['Documents', 'Downloads', 'README.md', 'projects'],
    '/home/user/Documents': ['notes.txt', 'budget.xlsx'],
    '/home/user/Downloads': ['installer.sh'],
    '/home/user/projects': ['cloud-app', 'devops-scripts'],
    '/var': ['log', 'mail', 'spool', 'www'],
    '/tmp': []
  };

  const bootSequence = [
    `[    0.000000] Linux version 5.15.0-generic (buildd@lgw01-amd64-060) (${flavor})`,
    `[    0.000000] Command line: BOOT_IMAGE=/boot/vmlinuz-5.15.0-generic root=UUID=... ro quiet flavor=${flavor}`,
    '[    0.052341] x86/fpu: Supporting XSAVE feature 0x001: \'x87 floating point registers\'',
    '[    0.052342] x86/fpu: Supporting XSAVE feature 0x002: \'SSE registers\'',
    '[    0.124512] Memory: 8142340K/8388608K available (16384K kernel code, 2340K rwdata...)',
    '[    0.451234] Checking connectivity... OK',
    '[    0.891231] Initializing Realcloud Virtual Environment...',
    '[    1.234121] Mounting root filesystem... OK',
    '[    1.567123] Starting system services...',
    '[    1.890123] Loading network drivers... OK',
    '[    2.123451] Configuring network interfaces... OK',
    '[    2.456781] Starting SSH daemon... OK',
    '[    2.789012] System ready.',
    '',
    initialMessage || 'Welcome to the Realcloud Sandbox!',
    'Type "help" to see available commands.',
    ''
  ];

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < bootSequence.length) {
        setHistory(prev => [...prev, bootSequence[currentLine]]);
        currentLine++;
        setBootProgress((currentLine / bootSequence.length) * 100);
      } else {
        setIsBooting(false);
        clearInterval(interval);
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (isBooting || !input.trim()) return;

    const cmd = input.trim();
    const args = cmd.split(' ');
    const baseCmd = args[0].toLowerCase();
    
    const newHistory = [...history, `user@${flavor}:${currentDir}$ ${input}`];

    if (baseCmd === 'clear') {
      setHistory([]);
    } else {
      let output = '';
      
      // Check for built-in commands first
      switch (baseCmd) {
        case 'ls': {
          let targetPath = currentDir;
          const pathArg = args.find(a => !a.startsWith('-') && a !== baseCmd);
          
          if (pathArg) {
            if (pathArg.startsWith('/')) {
              targetPath = pathArg;
            } else {
              targetPath = currentDir === '/' ? `/${pathArg}` : `${currentDir}/${pathArg}`;
            }
          }

          // Normalize path (remove trailing slash)
          if (targetPath.length > 1 && targetPath.endsWith('/')) {
            targetPath = targetPath.slice(0, -1);
          }

          if (fileSystem[targetPath]) {
            const files = [...fileSystem[targetPath]];
            if (args.includes('-a')) {
              files.unshift('.', '..');
            }
            output = files.join('  ');
          } else {
            output = `ls: cannot access '${pathArg}': No such file or directory`;
          }
          break;
        }
        case 'pwd':
          output = currentDir;
          break;
        case 'whoami':
          output = 'user';
          break;
        case 'date':
          output = new Date().toString();
          break;
        case 'cat':
          if (args[1]?.toLowerCase() === 'readme.md') {
            output = '# Welcome to Realcloud\nThis is a simulated Linux environment for learning cloud engineering and DevOps.';
          } else if (args[1]?.toLowerCase() === '/etc/passwd') {
            output = 'root:x:0:0:root:/root:/bin/bash\nuser:x:1000:1000:user:/home/user:/bin/bash';
          } else if (args[1]?.toLowerCase() === '/etc/os-release') {
            if (flavor === 'ubuntu') {
              output = 'PRETTY_NAME="Ubuntu 22.04.3 LTS"\nNAME="Ubuntu"\nVERSION_ID="22.04"\nID=ubuntu\nID_LIKE=debian';
            } else if (flavor === 'centos') {
              output = 'PRETTY_NAME="CentOS Linux 7 (Core)"\nNAME="CentOS Linux"\nVERSION_ID="7"\nID="centos"\nID_LIKE="rhel fedora"';
            } else if (flavor === 'rhel') {
              output = 'PRETTY_NAME="Red Hat Enterprise Linux 9.2 (Plow)"\nNAME="Red Hat Enterprise Linux"\nVERSION_ID="9.2"\nID="rhel"\nID_LIKE="fedora"';
            } else {
              output = 'PRETTY_NAME="Alpine Linux v3.15"\nNAME="Alpine Linux"\nID=alpine\nVERSION_ID=3.15.0';
            }
          } else if (!args[1]) {
            output = 'cat: missing file operand';
          } else {
            output = `cat: ${args[1]}: No such file or directory`;
          }
          break;
        case 'mkdir':
          output = args[1] ? `Created directory ${args[1]}` : 'mkdir: missing operand';
          break;
        case 'touch':
          output = args[1] ? `Created file ${args[1]}` : 'touch: missing file operand';
          break;
        case 'rm':
          output = args[1] ? `Removed ${args[1]}` : 'rm: missing operand';
          break;
        case 'sudo':
          output = '[sudo] password for user: \nsudo: 1 incorrect password attempt';
          break;
        case 'apt':
          if (flavor === 'ubuntu') {
            output = 'Reading package lists... Done\nBuilding dependency tree... Done\nReading state information... Done\nAll packages are up to date.';
          } else {
            output = `bash: apt: command not found (Did you mean ${flavor === 'centos' || flavor === 'rhel' ? 'yum' : 'apk'}?)`;
          }
          break;
        case 'yum':
        case 'dnf':
          if (flavor === 'centos' || flavor === 'rhel') {
            output = `Loaded plugins: fastestmirror, ovl\nLoading mirror speeds from cached hostfile\nNo packages marked for update on ${flavor.toUpperCase()}`;
          } else {
            output = `bash: ${baseCmd}: command not found (Did you mean ${flavor === 'ubuntu' ? 'apt' : 'apk'}?)`;
          }
          break;
        case 'apk':
          if (flavor === 'alpine') {
            output = 'fetch https://dl-cdn.alpinelinux.org/alpine/v3.15/main/x86_64/APKINDEX.tar.gz\nOK: 0 distinct packages available';
          } else {
            output = `bash: apk: command not found (Did you mean ${flavor === 'ubuntu' ? 'apt' : 'yum'}?)`;
          }
          break;
        case 'top':
          output = 'top - 15:32:40 up 1 min, 1 user, load average: 0.00, 0.00, 0.00\nTasks: 1 total, 0 running, 1 sleeping, 0 stopped, 0 zombie\n%Cpu(s):  0.0 us,  0.0 sy,  0.0 ni,100.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st';
          break;
        case 'uname':
          if (args.includes('-a')) {
            const flavorInfo = flavor === 'ubuntu' ? 'Ubuntu' : flavor === 'centos' ? 'CentOS' : flavor === 'rhel' ? 'Red Hat' : 'Alpine';
            output = `Linux realcloud 5.15.0-generic #54-${flavorInfo} SMP x86_64 GNU/Linux`;
          } else {
            output = 'Linux';
          }
          break;
        case 'echo':
          output = args.slice(1).join(' ');
          break;
        case 'ps':
          output = '  PID TTY          TIME CMD\n 1234 pts/0    00:00:00 bash\n 5678 pts/0    00:00:00 ps';
          break;
        case 'cp':
          output = args[1] && args[2] ? `Copied ${args[1]} to ${args[2]}` : 'cp: missing file operand';
          break;
        case 'mv':
          output = args[1] && args[2] ? `Moved ${args[1]} to ${args[2]}` : 'mv: missing destination file operand';
          break;
        case 'cd': {
          const path = args[1];
          if (!path || path === '~') {
            setCurrentDir('/home/user');
          } else if (path === '..') {
            const parts = currentDir.split('/').filter(Boolean);
            parts.pop();
            setCurrentDir('/' + parts.join('/'));
          } else if (path === '/') {
            setCurrentDir('/');
          } else {
            let targetPath = path.startsWith('/') ? path : (currentDir === '/' ? `/${path}` : `${currentDir}/${path}`);
            // Normalize path
            if (targetPath.length > 1 && targetPath.endsWith('/')) {
              targetPath = targetPath.slice(0, -1);
            }
            if (fileSystem[targetPath]) {
              setCurrentDir(targetPath);
            } else {
              output = `bash: cd: ${path}: No such file or directory`;
            }
          }
          break;
        }
        case 'help':
          output = `Available commands: ${[...availableCommands, 'cat', 'mkdir', 'touch', 'rm', 'sudo', 'apt', 'top', 'uname', 'echo', 'ps', 'cp', 'mv', 'cd'].join(', ')}, help, clear`;
          break;
        default: {
          // Check if the user is typing a directory path or a directory definition
          const dirDescriptions: Record<string, string> = {
            '/bin': 'Essential user binaries (e.g., ls, cd, cat).',
            'bin': 'Essential user binaries (e.g., ls, cd, cat).',
            '/etc': 'System-wide configuration files.',
            'etc': 'System-wide configuration files.',
            '/home': 'User home directories.',
            'home': 'User home directories.',
            '/var': 'Variable data files like logs and databases.',
            'var': 'Variable data files like logs and databases.',
            '/tmp': 'Temporary files.',
            'tmp': 'Temporary files.',
            '/usr': 'User utilities and applications.',
            'usr': 'User utilities and applications.',
            '/root': 'Home directory for the root user.',
            'root': 'Home directory for the root user.',
            '/dev': 'Device files.',
            'dev': 'Device files.',
            '/proc': 'Process information.',
            'proc': 'Process information.'
          };

          const normalizedCmd = baseCmd.endsWith(':') ? baseCmd.slice(0, -1) : baseCmd;
          
          if (dirDescriptions[normalizedCmd]) {
            output = `${normalizedCmd}: ${dirDescriptions[normalizedCmd]}`;
          } else if (onCommand) {
            output = onCommand(cmd.toLowerCase());
          } else {
            output = `bash: ${baseCmd}: command not found. Type "help" for a list of commands.`;
          }
        }
      }
      
      if (output) {
        newHistory.push(output);
      }
      setHistory(newHistory);
    }

    setInput('');
  };

  return (
    <div className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 shadow-2xl font-mono text-sm flex-1 flex flex-col min-h-[400px]">
      <div className="bg-zinc-800 px-4 py-2 flex items-center gap-2 border-b border-zinc-700">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-rose-500"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
          <div className="w-3 h-3 rounded-full bg-brand-blue"></div>
        </div>
        <div className="flex items-center gap-2 ml-4 text-zinc-400">
          <TerminalIcon className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-widest">
            {isBooting ? `Booting System... ${Math.round(bootProgress)}%` : 'Interactive Terminal'}
          </span>
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto text-zinc-300 space-y-1 scrollbar-thin scrollbar-thumb-zinc-700"
      >
        {history.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap break-all">
            {line?.includes(`user@${flavor}:`) && line?.includes('$') ? (
              <span className="text-brand-blue font-bold">{line}</span>
            ) : line?.startsWith('[') ? (
              <span className="text-zinc-500 text-xs">{line}</span>
            ) : line}
          </div>
        ))}
        {isBooting && (
          <div className="flex items-center gap-2 text-brand-blue text-xs animate-pulse mt-2">
            <div className="w-1 h-4 bg-brand-blue"></div>
            <span>System initializing...</span>
          </div>
        )}
      </div>

      <form onSubmit={handleCommand} className={`p-4 bg-zinc-900 border-t border-zinc-800 flex items-center gap-2 ${isBooting ? 'opacity-50 cursor-not-allowed' : ''}`}>
        <ChevronRight className={`w-4 h-4 text-brand-blue shrink-0 ${isBooting ? 'animate-pulse' : ''}`} />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isBooting}
          className="bg-transparent border-none outline-none text-zinc-300 w-full focus:ring-0 p-0"
          placeholder={isBooting ? "System booting..." : "Type a command..."}
          autoFocus
        />
      </form>
    </div>
  );
};
