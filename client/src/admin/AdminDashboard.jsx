import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { adminGetProducts, adminGetOrders, adminGetQuotes, adminGetLeads } from '../api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, orders: 0, newOrders: 0, quotes: 0, newQuotes: 0, leads: 0, newLeads: 0 });

  useEffect(() => {
    document.title = 'Admin - Nalini Jaggery';
    Promise.all([adminGetProducts(), adminGetOrders(), adminGetQuotes(), adminGetLeads()])
      .then(([pRes, oRes, qRes, lRes]) => {
        const orders = oRes.data.data || [];
        const quotes = qRes.data.data || [];
        const leads  = lRes.data.data || [];
        setStats({
          products:  (pRes.data.data || []).length,
          orders:    orders.length,
          newOrders: orders.filter(o => o.status === 'new').length,
          quotes:    quotes.length,
          newQuotes: quotes.filter(q => q.status === 'new').length,
          leads:     leads.length,
          newLeads:  leads.filter(l => l.status === 'new').length,
        });
      })
      .catch(console.error);
  }, []);

  const cards = [
    { label: 'Total Products',      value: stats.products,  to: '/admin-secret/products', color: '#4A2E0A' },
    { label: 'Orders',              value: stats.orders,    to: '/admin-secret/orders',   color: '#1565C0' },
    { label: 'New Orders',          value: stats.newOrders, to: '/admin-secret/orders',   color: '#2E7D32' },
    { label: 'Quote Requests',      value: stats.quotes,    to: '/admin-secret/quotes',   color: '#6A1B9A' },
    { label: 'New Quotes',          value: stats.newQuotes, to: '/admin-secret/quotes',   color: '#AD1457' },
    { label: 'Contact Enquiries',   value: stats.leads,     to: '/admin-secret/leads',    color: '#00695C' },
    { label: 'New Enquiries',       value: stats.newLeads,  to: '/admin-secret/leads',    color: '#E65100' },
  ];

  return (
    <AdminLayout>
      <h1 style={{ fontSize: '1.6rem', fontWeight: 600, color: '#2C1A06', marginBottom: '0.5rem' }}>Dashboard</h1>
      <p style={{ color: '#888', marginBottom: '2rem', fontSize: '14px' }}>Welcome to the Nalini Jaggery admin panel.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1.2rem', marginBottom: '2rem' }}>
        {cards.map(c => (
          <Link key={c.label} to={c.to} style={{ textDecoration: 'none' }}>
            <div style={{ background: '#fff', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', borderLeft: `4px solid ${c.color}` }}>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: c.color }}>{c.value}</div>
              <div style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>{c.label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <h2 style={{ fontSize: '1rem', fontWeight: 600, color: '#2C1A06', marginBottom: '1rem' }}>Quick Actions</h2>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Link to="/admin-secret/products/add" style={{ background: '#4A2E0A', color: '#F5C451', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>
          + Add New Product
        </Link>
        <Link to="/admin-secret/orders" style={{ background: '#1565C0', color: '#fff', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>
          🛒 View Orders
        </Link>
        <Link to="/admin-secret/quotes" style={{ background: '#6A1B9A', color: '#fff', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>
          📋 View Quotes
        </Link>
        <Link to="/admin-secret/leads" style={{ background: '#00695C', color: '#fff', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>
          ✉️ View Contact Enquiries
        </Link>
      </div>
    </AdminLayout>
  );
}
