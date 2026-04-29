import React, { useState } from 'react';
import { Search, Bell, User, Menu, LogOut, Sparkle } from 'lucide-react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logout } from '../firebase';
import { AuthModal } from './AuthModal';

interface NavbarProps {
  activeTab: 'projects' | 'learn';
  onTabChange: (tab: 'projects' | 'learn') => void;
  xp?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange, xp = 0 }) => {
  const [user, loading] = useAuthState(auth);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const openAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center gap-1 cursor-pointer shrink-0"
            onClick={() => onTabChange('projects')}
          >
            <div className="bg-zinc-900 w-9 h-9 rounded-lg flex items-center justify-center relative">
              <Sparkle className="absolute -top-1.5 -left-1.5 w-4 h-4 text-brand-blue fill-brand-blue" />
              <span className="text-white font-black text-xl">R</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-zinc-900">
              ealcloud<span className="text-zinc-500 font-mono font-medium tracking-tight">projects</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 ml-12">
            <button 
              onClick={() => onTabChange('learn')}
              className={`text-sm font-bold transition-colors ${activeTab === 'learn' ? 'text-zinc-900' : 'text-zinc-500 hover:text-zinc-900'}`}
            >
              Skill Trees
            </button>
            <button 
              onClick={() => onTabChange('projects')}
              className={`text-sm font-bold transition-colors ${activeTab === 'projects' ? 'text-zinc-900' : 'text-zinc-500 hover:text-zinc-900'}`}
            >
              Labs
            </button>
            <a
              href="#about"
              onClick={() => onTabChange('projects')}
              className="text-sm font-bold text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              About
            </a>
            <a
              href="#blog"
              onClick={() => onTabChange('projects')}
              className="text-sm font-bold text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              Blog
            </a>
          </div>

          <div className="hidden lg:flex items-center flex-1 max-w-sm mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-zinc-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-1.5 border border-zinc-200 rounded-lg bg-zinc-50 text-sm placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all"
                placeholder="Search labs..."
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {xp > 0 && (
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-amber-50 rounded-full border border-amber-200">
                <Sparkle className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span className="text-[10px] font-black text-amber-600 uppercase tracking-wider">{xp} XP</span>
              </div>
            )}
            {!loading && (
              <>
                {user ? (
                  <div className="relative">
                    <button 
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center gap-2 p-1 rounded-full hover:bg-zinc-100 transition-colors"
                    >
                      {user.photoURL ? (
                        <img src={user.photoURL} alt={user.displayName || 'User'} className="w-8 h-8 rounded-full border border-zinc-200" referrerPolicy="no-referrer" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center border border-zinc-200">
                          <User className="w-4 h-4 text-zinc-500" />
                        </div>
                      )}
                    </button>
                    
                    {isUserMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border border-zinc-200 rounded-2xl shadow-2xl py-2 z-[60]">
                        <div className="px-4 py-2 border-b border-zinc-100 mb-2">
                          <p className="text-xs font-bold text-zinc-900 truncate">{user.displayName || 'User'}</p>
                          <p className="text-[10px] text-zinc-400 truncate">{user.email}</p>
                        </div>
                        <button 
                          onClick={() => { logout(); setIsUserMenuOpen(false); }}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition-colors font-bold"
                        >
                          <LogOut className="w-4 h-4" />
                          Log out
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <button 
                      onClick={() => openAuth('login')}
                      className="hidden sm:block text-sm font-bold text-zinc-600 hover:text-zinc-900 px-4 py-2 transition-colors"
                    >
                      Log in
                    </button>
                    <button 
                      onClick={() => openAuth('signup')}
                      className="bg-brand-blue text-white text-sm font-bold px-5 py-2 rounded-lg hover:bg-brand-blue/90 transition-all shadow-lg shadow-brand-blue/10"
                    >
                      Sign up
                    </button>
                  </>
                )}
              </>
            )}
            <button className="md:hidden p-2 text-zinc-500 hover:text-zinc-900 transition-colors">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        mode={authMode} 
      />
    </nav>
  );
};
