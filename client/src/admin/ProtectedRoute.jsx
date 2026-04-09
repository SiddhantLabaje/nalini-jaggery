import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from './AdminAuthContext';

export default function ProtectedRoute({ children }) {
  const { isLoggedIn, checked } = useAdminAuth();

  // Wait for token verification before deciding
  if (!checked) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', color: '#888' }}>
        Checking session...
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/admin-secret" replace />;
  }

  return children;
}
