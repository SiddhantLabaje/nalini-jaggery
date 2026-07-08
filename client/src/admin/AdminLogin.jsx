import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from './AdminAuthContext';
import { adminLogin } from '../api';

export default function AdminLogin() {
  const { login, isLoggedIn } = useAdminAuth();
  const navigate = useNavigate();

  const [username, setUsername]         = useState('');
  const [password, setPassword]         = useState('');
  const [error, setError]               = useState('');
  const [loading, setLoading]           = useState(false);
  const [showPass, setShowPass]         = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(null); // null = unknown yet
  const [lockSeconds, setLockSeconds]   = useState(0);    // countdown in seconds
  const timerRef                        = useRef(null);

  // Start or sync the lockout countdown
  const startCountdown = (seconds) => {
    setLockSeconds(seconds);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setLockSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setAttemptsLeft(null);
          setError('');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Clean up timer on unmount
  useEffect(() => () => clearInterval(timerRef.current), []);

  useEffect(() => {
    document.title = 'Admin Login - Nalini Jaggery';
    if (isLoggedIn) navigate('/admin-secret/dashboard', { replace: true });
  }, [isLoggedIn, navigate]);

  const isLocked = lockSeconds > 0;

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLocked) return;
    setError('');
    setLoading(true);
    try {
      const res = await adminLogin({ username, password });
      if (res.data.success) {
        login(res.data.token);
        navigate('/admin-secret/dashboard', { replace: true });
      } else {
        setError(res.data.message || 'Login failed');
      }
    } catch (err) {
      const data = err.response?.data || {};
      if (data.locked && data.retryAfter) {
        startCountdown(data.retryAfter);
        setAttemptsLeft(0);
        setError(data.message);
      } else {
        if (typeof data.attemptsLeft === 'number') {
          setAttemptsLeft(data.attemptsLeft);
        }
        setError(data.message || 'Invalid credentials');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #2C1505 0%, #5A2E0C 50%, #8B5A0A 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'DM Sans', sans-serif",
      padding: '1rem',
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '20px',
        padding: '2.5rem',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 700, color: '#2C1A06' }}>
            Nalini <span style={{ color: '#C8922A', fontStyle: 'italic' }}>Jaggery</span>
          </div>
          <div style={{ fontSize: '13px', color: '#888', marginTop: '4px' }}>Admin Panel</div>
        </div>

        <h2 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#2C1A06', marginBottom: '1.5rem', textAlign: 'center' }}>
          Sign in to continue
        </h2>

        {error && (
          <div style={{
            background: isLocked ? '#fff3e0' : '#ffebee',
            color: isLocked ? '#e65100' : '#c62828',
            padding: '10px 14px',
            borderRadius: '8px',
            marginBottom: '1rem',
            fontSize: '13.5px',
          }}>
            {error}
          </div>
        )}

        {/* Attempts warning (not yet locked) */}
        {!isLocked && attemptsLeft !== null && attemptsLeft > 0 && (
          <div style={{
            background: '#fff8e1',
            color: '#f57f17',
            padding: '8px 14px',
            borderRadius: '8px',
            marginBottom: '1rem',
            fontSize: '13px',
            fontWeight: 500,
          }}>
            ⚠️ {attemptsLeft} attempt{attemptsLeft !== 1 ? 's' : ''} remaining before lockout
          </div>
        )}

        {/* Lockout countdown banner */}
        {isLocked && (
          <div style={{
            background: '#fbe9e7',
            color: '#bf360c',
            padding: '16px 14px',
            borderRadius: '10px',
            marginBottom: '1rem',
            textAlign: 'center',
            fontSize: '13.5px',
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '2px', color: '#e53935' }}>
              {formatTime(lockSeconds)}
            </div>
            <div style={{ marginTop: '4px' }}>Login locked. Try again after the timer expires.</div>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#444', marginBottom: '5px' }}>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              autoFocus
              placeholder="Enter username"
              style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #ddd', borderRadius: '10px', fontSize: '14px', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', transition: 'border-color 0.2s' }}
              onFocus={e => e.target.style.borderColor = '#C8922A'}
              onBlur={e => e.target.style.borderColor = '#ddd'}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#444', marginBottom: '5px' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="Enter password"
                style={{ width: '100%', padding: '11px 40px 11px 14px', border: '1.5px solid #ddd', borderRadius: '10px', fontSize: '14px', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', transition: 'border-color 0.2s' }}
                onFocus={e => e.target.style.borderColor = '#C8922A'}
                onBlur={e => e.target.style.borderColor = '#ddd'}
              />
              <button
                type="button"
                onClick={() => setShowPass(s => !s)}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#888', fontSize: '13px', padding: 0 }}
              >
                {showPass ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || isLocked}
            style={{
              background: (loading || isLocked) ? '#a0856a' : '#4A2E0A',
              color: '#F5C451',
              padding: '13px',
              borderRadius: '10px',
              border: 'none',
              cursor: (loading || isLocked) ? 'not-allowed' : 'pointer',
              fontSize: '15px',
              fontWeight: 600,
              fontFamily: 'inherit',
              marginTop: '0.5rem',
              transition: 'background 0.2s',
            }}
          >
            {loading ? 'Signing in...' : isLocked ? `Locked (${formatTime(lockSeconds)})` : 'Sign In'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '12.5px', color: '#aaa' }}>
          This is a restricted area. Unauthorized access is prohibited.
        </p>
      </div>
    </div>
  );
}
