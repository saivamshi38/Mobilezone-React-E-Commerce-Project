import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { addToast } = useToast();

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('mz_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'

  useEffect(() => {
    if (user) {
      localStorage.setItem('mz_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('mz_user');
    }
  }, [user]);

  const login = (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    
    // Check if admin login
    if (cleanEmail === 'admin@mobilezone.com' || cleanEmail === 'admin') {
      const adminUser = {
        name: 'Master Admin',
        email: 'admin@mobilezone.com',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        joinDate: 'Jan 2024'
      };
      setUser(adminUser);
      setIsAuthModalOpen(false);
      addToast('👑 Welcome back, Master Admin!', 'success');
      return { success: true, user: adminUser };
    }

    // Standard customer login
    const customerUser = {
      name: email.split('@')[0] ? email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1) : 'Alex Reynolds',
      email: cleanEmail,
      role: 'customer',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      joinDate: 'March 2026'
    };
    setUser(customerUser);
    setIsAuthModalOpen(false);
    addToast(`👋 Welcome back, ${customerUser.name}!`, 'success');
    return { success: true, user: customerUser };
  };

  const signup = (name, email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    const newUser = {
      name: name.trim() || 'New User',
      email: cleanEmail,
      role: 'customer',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      joinDate: 'August 2026'
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
    addToast(`🎉 Account created! Welcome, ${newUser.name}!`, 'success');
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
    addToast('Logged out successfully', 'info');
  };

  const openLogin = () => {
    setAuthMode('login');
    setIsAuthModalOpen(true);
  };

  const openSignup = () => {
    setAuthMode('signup');
    setIsAuthModalOpen(true);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        isAuthModalOpen,
        setIsAuthModalOpen,
        authMode,
        setAuthMode,
        login,
        signup,
        logout,
        openLogin,
        openSignup
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
