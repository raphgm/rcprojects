import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  xp: number;
  completedLabs: string[];
  loginRedirect: () => void;
  logout: () => void;
  completeLab: (projectId: string, xpReward?: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [xp, setXp] = useState<number>(0);
  const [completedLabs, setCompletedLabs] = useState<string[]>([]);

  useEffect(() => {
    // 1. Check URL for SSO params from skill-sch.com
    const params = new URLSearchParams(window.location.search);
    const ssoToken = params.get('sso_token');
    const ssoUserStr = params.get('sso_user');
    const ssoXp = params.get('sso_xp');
    const ssoLabs = params.get('sso_labs');

    if (ssoToken && ssoUserStr) {
      try {
        const parsedUser = JSON.parse(decodeURIComponent(ssoUserStr));
        setUser(parsedUser);
        
        const initialXp = ssoXp ? parseInt(ssoXp, 10) : 0;
        const initialLabs = ssoLabs ? JSON.parse(decodeURIComponent(ssoLabs)) : [];
        
        setXp(initialXp);
        setCompletedLabs(initialLabs);

        // Persist session locally to maintain state across reloads
        localStorage.setItem('realcloud_user', JSON.stringify(parsedUser));
        localStorage.setItem('realcloud_sso_token', ssoToken);
        localStorage.setItem('realcloud_xp', initialXp.toString());
        localStorage.setItem('realcloud_completed_labs', JSON.stringify(initialLabs));
        
        // Clean up URL parameters to hide token
        params.delete('sso_token');
        params.delete('sso_user');
        params.delete('sso_xp');
        params.delete('sso_labs');
        const newUrl = window.location.pathname + (params.toString() ? `?${params.toString()}` : '');
        window.history.replaceState({}, '', newUrl);
        return;
      } catch (e) {
        console.error('Failed to parse SSO params', e);
      }
    }

    // 2. If no URL params, check local storage for an existing session
    const savedUser = localStorage.getItem('realcloud_user');
    const savedXp = localStorage.getItem('realcloud_xp');
    const savedLabs = localStorage.getItem('realcloud_completed_labs');

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
        if (savedXp) setXp(parseInt(savedXp, 10));
        if (savedLabs) setCompletedLabs(JSON.parse(savedLabs));
      } catch (e) {
        console.error('Failed to parse local session', e);
      }
    } else {
      // Allow guest usage for now, but fallback to local XP if present
      if (savedXp) setXp(parseInt(savedXp, 10));
      if (savedLabs) setCompletedLabs(JSON.parse(savedLabs));
    }
  }, []);

  const loginRedirect = () => {
    // Redirect to skill-sch.com for login, passing current URL as return path
    const returnUrl = encodeURIComponent(window.location.href);
    window.location.href = `https://skill-sch.com/login?redirect_to=${returnUrl}&service=realcloud`;
  };

  const logout = () => {
    setUser(null);
    setXp(0);
    setCompletedLabs([]);
    localStorage.removeItem('realcloud_user');
    localStorage.removeItem('realcloud_sso_token');
    localStorage.removeItem('realcloud_xp');
    localStorage.removeItem('realcloud_completed_labs');
    
    // Optional: Also redirect to skill-sch.com logout page
    // window.location.href = 'https://skill-sch.com/logout?redirect_to=' + encodeURIComponent(window.location.href);
  };

  const completeLab = async (projectId: string, xpReward?: number) => {
    if (!completedLabs.includes(projectId)) {
      const newLabs = [...completedLabs, projectId];
      const addedXp = xpReward || 250;
      const newXp = xp + addedXp;

      setCompletedLabs(newLabs);
      setXp(newXp);

      localStorage.setItem('realcloud_completed_labs', JSON.stringify(newLabs));
      localStorage.setItem('realcloud_xp', newXp.toString());

      // If user is authenticated via SSO, sync back to skill-sch.com
      if (user) {
        try {
          const ssoToken = localStorage.getItem('realcloud_sso_token');
          // NOTE: Replace this endpoint with the actual skill-sch.com API endpoint
          fetch('https://api.skill-sch.com/v1/sync/xp', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...(ssoToken ? { 'Authorization': `Bearer ${ssoToken}` } : {})
            },
            body: JSON.stringify({
              userId: user.id,
              xp: newXp,
              completedLabId: projectId,
            }),
          }).catch(err => {
            console.error('Failed to sync XP with skill-sch.com in background:', err);
          });
        } catch (err) {
          console.error('Failed to initiate sync XP with skill-sch.com:', err);
        }
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, xp, completedLabs, loginRedirect, logout, completeLab }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
