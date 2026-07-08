import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import { adminGetQuotes, adminUpdateQuoteStatus } from '../api';

const STATUS_COLORS = { new: '#1565C0', contacted: '#E65100', closed: '#2E7D32' };

export default function AdminQuotes() {
  const [quotes, setQuotes]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter]   = useState('all');

  useEffect(() => {
    document.title = 'Quotes - Admin';
    adminGetQuotes()
      .then(res => setQuotes(res.data.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleStatus = async (id, status) => {
    try {
      await adminUpdateQuoteStatus(id, status);
      setQuotes(prev => prev.map(q => q._id === id ? { ...q, status } : q));
    } catch (err) {
      alert('Update failed: ' + (err.response?.data?.message || err.message));
    }
  };

  const displayed = filter === 'all' ? quotes : quotes.filter(q => q.status === filter);

  const tdStyle = { padding: '12px 14px', fontSize: '13.5px', borderBottom: '1px solid #f0f0f0', verticalAlign: 'middle' };
  const thStyle = { padding: '12px 14px', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#888', textAlign: 'left', borderBottom: '2px solid #f0f0f0' };

  return (
    <AdminLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#2C1A06', margin: 0 }}>Bulk Quote Requests</h1>
          <p style={{ color: '#888', fontSize: '13px', marginTop: '4px' }}>Submitted via the Get a Quote page</p>
        </div>
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '13px', cursor: 'pointer' }}
        >
          <option value="all">All Quotes</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {loading ? (
        <p style={{ color: '#888' }}>Loading quotes...</p>
      ) : (
        <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', overflow: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
            <thead>
              <tr style={{ background: '#fafafa' }}>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Phone</th>
                <th style={thStyle}>Company</th>
                <th style={thStyle}>Product</th>
                <th style={thStyle}>Qty</th>
                <th style={thStyle}>Pack Size</th>
                <th style={thStyle}>City</th>
                <th style={thStyle}>Message</th>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {displayed.length === 0 ? (
                <tr>
                  <td colSpan={10} style={{ ...tdStyle, textAlign: 'center', color: '#aaa', padding: '2rem' }}>
                    No quote requests found.
                  </td>
                </tr>
              ) : displayed.map(q => (
                <tr key={q._id}>
                  <td style={{ ...tdStyle, fontWeight: 500 }}>{q.name}</td>
                  <td style={tdStyle}>{q.phone}</td>
                  <td style={{ ...tdStyle, color: '#555' }}>{q.company || '-'}</td>
                  <td style={{ ...tdStyle, color: '#4A2E0A' }}>{q.product || '-'}</td>
                  <td style={tdStyle}>{q.qty || '-'}</td>
                  <td style={tdStyle}>{q.packSize || '-'}</td>
                  <td style={tdStyle}>{q.city || '-'}</td>
                  <td style={{ ...tdStyle, maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#666' }} title={q.message}>
                    {q.message || '-'}
                  </td>
                  <td style={{ ...tdStyle, fontSize: '12px', color: '#888' }}>
                    {new Date(q.createdAt).toLocaleDateString('en-IN')}
                  </td>
                  <td style={tdStyle}>
                    <select
                      value={q.status}
                      onChange={e => handleStatus(q._id, e.target.value)}
                      style={{ padding: '4px 8px', borderRadius: '6px', border: `1.5px solid ${STATUS_COLORS[q.status] || '#ccc'}`, color: STATUS_COLORS[q.status] || '#333', fontSize: '12px', cursor: 'pointer', fontWeight: 500, background: '#fff' }}
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
