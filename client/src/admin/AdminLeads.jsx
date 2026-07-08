import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import { adminGetLeads, adminUpdateLeadStatus } from '../api';

const STATUS_COLORS = { new: '#1565C0', contacted: '#E65100', closed: '#2E7D32' };

export default function AdminLeads() {
  const [leads, setLeads]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter]   = useState('all');

  useEffect(() => {
    document.title = 'Contact Enquiries - Admin';
    adminGetLeads()
      .then(res => setLeads(res.data.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleStatus = async (id, status) => {
    try {
      await adminUpdateLeadStatus(id, status);
      setLeads(prev => prev.map(l => l._id === id ? { ...l, status } : l));
    } catch (err) {
      alert('Update failed: ' + (err.response?.data?.message || err.message));
    }
  };

  const displayed = filter === 'all' ? leads : leads.filter(l => l.status === filter);

  const tdStyle = { padding: '12px 14px', fontSize: '13.5px', borderBottom: '1px solid #f0f0f0', verticalAlign: 'middle' };
  const thStyle = { padding: '12px 14px', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#888', textAlign: 'left', borderBottom: '2px solid #f0f0f0' };

  return (
    <AdminLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#2C1A06', margin: 0 }}>Contact Enquiries</h1>
          <p style={{ color: '#888', fontSize: '13px', marginTop: '4px' }}>Submitted via the Contact Us page</p>
        </div>
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '13px', cursor: 'pointer' }}
        >
          <option value="all">All Enquiries</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {loading ? (
        <p style={{ color: '#888' }}>Loading enquiries...</p>
      ) : (
        <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', overflow: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
            <thead>
              <tr style={{ background: '#fafafa' }}>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Phone</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Product</th>
                <th style={thStyle}>Qty</th>
                <th style={thStyle}>City</th>
                <th style={thStyle}>Message</th>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {displayed.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{ ...tdStyle, textAlign: 'center', color: '#aaa', padding: '2rem' }}>
                    No enquiries found.
                  </td>
                </tr>
              ) : displayed.map(l => (
                <tr key={l._id}>
                  <td style={{ ...tdStyle, fontWeight: 500 }}>{l.name}</td>
                  <td style={tdStyle}>{l.phone}</td>
                  <td style={{ ...tdStyle, color: '#555' }}>{l.email || '-'}</td>
                  <td style={{ ...tdStyle, color: '#4A2E0A' }}>{l.product || '-'}</td>
                  <td style={tdStyle}>{l.qty || '-'}</td>
                  <td style={tdStyle}>{l.city || '-'}</td>
                  <td style={{ ...tdStyle, maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#666' }} title={l.message}>
                    {l.message || '-'}
                  </td>
                  <td style={{ ...tdStyle, fontSize: '12px', color: '#888' }}>
                    {new Date(l.createdAt).toLocaleDateString('en-IN')}
                  </td>
                  <td style={tdStyle}>
                    <select
                      value={l.status}
                      onChange={e => handleStatus(l._id, e.target.value)}
                      style={{ padding: '4px 8px', borderRadius: '6px', border: `1.5px solid ${STATUS_COLORS[l.status] || '#ccc'}`, color: STATUS_COLORS[l.status] || '#333', fontSize: '12px', cursor: 'pointer', fontWeight: 500, background: '#fff' }}
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
