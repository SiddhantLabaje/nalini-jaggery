import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { adminGetProducts, adminGetOrders } from '../api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, orders: 0, newOrders: 0 });

  useEffect(() => {
    document.title = 'Admin - Nalini Jaggery';
    Promise.all([adminGetProducts(), adminGetOrders()])
      .then(([pRes, oRes]) => {
        const orders = oRes.data.data || [];
        setStats({
          products: (pRes.data.data || []).length,
          orders:   orders.length,
          newOrders: orders.filter(o => o.status === 'new').length,
        });
      })
      .catch(console.error);
  }, []);

  const cards = [
    { label: 'Total Products', value: stats.products, to: '/admin-secret/products', color: '#4A2E0A' },
    { label: 'Total Orders',   value: stats.orders,   to: '/admin-secret/orders',   color: '#1565C0' },
    { label: 'New Orders',     value: stats.newOrders, to: '/admin-secret/orders',  color: '#2E7D32' },
  ];

  return (
    <AdminLayout>
      <h1 style={{ fontSize: '1.6rem', fontWeight: 600, color: '#2C1A06', marginBottom: '0.5rem' }}>Dashboard</h1>
      <p style={{ color: '#888', marginBottom: '2rem', fontSize: '14px' }}>Welcome to the Nalini Jaggery admin panel.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.2rem', marginBottom: '2rem' }}>
        {cards.map(c => (
          <Link key={c.label} to={c.to} style={{ textDecoration: 'none' }}>
            <div style={{ background: '#fff', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', borderLeft: `4px solid ${c.color}` }}>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: c.color }}>{c.value}</div>
              <div style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>{c.label}</div>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Link to="/admin-secret/products/add" style={{ background: '#4A2E0A', color: '#F5C451', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>
          + Add New Product
        </Link>
        <Link to="/admin-secret/orders" style={{ background: '#1565C0', color: '#fff', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>
          View Orders
        </Link>
      </div>
    </AdminLayout>
  );
}
