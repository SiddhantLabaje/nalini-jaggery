import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import { adminGetOrders, adminUpdateStatus } from '../api';

const STATUS_COLORS = { new: '#1565C0', contacted: '#E65100', closed: '#2E7D32' };

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter]   = useState('all');

  useEffect(() => {
    document.title = 'Orders - Admin';
    adminGetOrders()
      .then(res => setOrders(res.data.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleStatus = async (id, status) => {
    try {
      await adminUpdateStatus(id, status);
      setOrders(prev => prev.map(o => o._id === id ? { ...o, status } : o));
    } catch (err) {
      alert('Update failed: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleExport = () => {
    const ADMIN_KEY = import.meta.env.VITE_ADMIN_SECRET || 'nalini-admin-2025';
    fetch('/api/orders/export/csv', { headers: { 'admin-key': ADMIN_KEY } })
      .then(res => res.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const a   = document.createElement('a');
        a.href    = url;
        a.download = 'orders.csv';
        a.click();
        URL.revokeObjectURL(url);
      })
      .catch(() => alert('Export failed'));
  };

  const displayed = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  const tdStyle = { padding: '12px 14px', fontSize: '13.5px', borderBottom: '1px solid #f0f0f0', verticalAlign: 'middle' };
  const thStyle = { padding: '12px 14px', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#888', textAlign: 'left', borderBottom: '2px solid #f0f0f0' };

  return (
    <AdminLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#2C1A06' }}>Orders</h1>
        <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <select value={filter} onChange={e => setFilter(e.target.value)} style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '13px', cursor: 'pointer' }}>
            <option value="all">All Orders</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="closed">Closed</option>
          </select>
          <button onClick={handleExport} style={{ background: '#2E7D32', color: '#fff', padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 500 }}>
            Export CSV
          </button>
        </div>
      </div>

      {loading ? (
        <p style={{ color: '#888' }}>Loading orders...</p>
      ) : (
        <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', overflow: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
            <thead>
              <tr style={{ background: '#fafafa' }}>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Phone</th>
                <th style={thStyle}>Product</th>
                <th style={thStyle}>Qty</th>
                <th style={thStyle}>City</th>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {displayed.length === 0 ? (
                <tr><td colSpan={7} style={{ ...tdStyle, textAlign: 'center', color: '#aaa', padding: '2rem' }}>No orders found.</td></tr>
              ) : displayed.map(o => (
                <tr key={o._id}>
                  <td style={{ ...tdStyle, fontWeight: 500 }}>{o.name}</td>
                  <td style={tdStyle}>{o.phone}</td>
                  <td style={{ ...tdStyle, maxWidth: '180px', color: '#4A2E0A' }}>{o.product}</td>
                  <td style={tdStyle}>{o.qty || '-'}</td>
                  <td style={tdStyle}>{o.city || '-'}</td>
                  <td style={{ ...tdStyle, fontSize: '12px', color: '#888' }}>{new Date(o.createdAt).toLocaleDateString('en-IN')}</td>
                  <td style={tdStyle}>
                    <select
                      value={o.status}
                      onChange={e => handleStatus(o._id, e.target.value)}
                      style={{ padding: '4px 8px', borderRadius: '6px', border: `1.5px solid ${STATUS_COLORS[o.status] || '#ccc'}`, color: STATUS_COLORS[o.status] || '#333', fontSize: '12px', cursor: 'pointer', fontWeight: 500, background: '#fff' }}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}
