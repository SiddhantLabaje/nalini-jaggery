import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAdminAuth } from './AdminAuthContext';

const NAV = [
  { to: '/admin-secret/dashboard', label: 'Dashboard',  icon: '📊' },
  { to: '/admin-secret/products',  label: 'Products',   icon: '📦' },
  { to: '/admin-secret/orders',    label: 'Orders',     icon: '🛒' },
];

export default function AdminLayout({ children }) {
  const location       = useLocation();
  const navigate       = useNavigate();
  const { logout }     = useAdminAuth();

  const handleLogout = () => {
    logout();
    navigate('/admin-secret', { replace: true });
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif", background: '#f4f6f9' }}>

      {/* Sidebar */}
      <aside style={{ width: '230px', background: '#2C1A06', color: '#fff', padding: '0', flexShrink: 0, display: 'flex', flexDirection: 'column' }}>

        {/* Brand */}
        <div style={{ padding: '1.8rem 1.4rem 1.2rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: 700, color: '#F5C451' }}>
            Nalini Admin
          </div>
          <div style={{ fontSize: '11.5px', color: 'rgba(251,246,238,0.4)', marginTop: '2px' }}>Management Panel</div>
        </div>

        {/* Nav links */}
        <nav style={{ padding: '1rem 0.8rem', display: 'flex', flexDirection: 'column', gap: '0.2rem', flex: 1 }}>
          {NAV.map(n => (
            <Link
              key={n.to}
              to={n.to}
              style={{
                padding: '10px 14px',
                borderRadius: '8px',
                color: isActive(n.to) ? '#F5C451' : 'rgba(251,246,238,0.65)',
                background: isActive(n.to) ? 'rgba(245,196,81,0.12)' : 'transparent',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: isActive(n.to) ? 500 : 400,
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'all 0.15s',
              }}
            >
              <span>{n.icon}</span> {n.label}
            </Link>
          ))}
        </nav>

        {/* Bottom actions */}
        <div style={{ padding: '1rem 0.8rem', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button
            onClick={() => navigate('/')}
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.6)', padding: '9px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', width: '100%', textAlign: 'left' }}
          >
            View Website
          </button>
          <button
            onClick={handleLogout}
            style={{ background: 'rgba(198,40,40,0.15)', border: '1px solid rgba(198,40,40,0.3)', color: '#ef9a9a', padding: '9px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', width: '100%', textAlign: 'left' }}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  );
}
