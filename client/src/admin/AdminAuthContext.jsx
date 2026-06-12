import React, { createContext, useContext, useState, useEffect } from 'react';
import { adminVerify } from '../api';

const AuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [token, setToken]     = useState(() => localStorage.getItem('admin_token') || '');
  const [checked, setChecked] = useState(false);

  // Verify token on mount
  useEffect(() => {
    if (!token) { setChecked(true); return; }
    adminVerify(token)
      .then(() => setChecked(true))
      .catch(() => { logout(); setChecked(true); });
  }, []);

  const login = (t) => {
    localStorage.setItem('admin_token', t);
    setToken(t);
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    setToken('');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, isLoggedIn: Boolean(token), checked }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAdminAuth = () => useContext(AuthContext);
