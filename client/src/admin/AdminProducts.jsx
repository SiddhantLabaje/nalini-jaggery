import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { adminGetProducts, adminDeleteProduct } from '../api';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);

  const load = () => {
    adminGetProducts()
      .then(res => setProducts(res.data.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { document.title = 'Products - Admin'; load(); }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return;
    try {
      await adminDeleteProduct(id);
      setProducts(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      alert('Delete failed: ' + (err.response?.data?.message || err.message));
    }
  };

  const tdStyle = { padding: '12px 14px', fontSize: '13.5px', borderBottom: '1px solid #f0f0f0', verticalAlign: 'middle' };
  const thStyle = { padding: '12px 14px', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#888', textAlign: 'left', borderBottom: '2px solid #f0f0f0' };

  return (
    <AdminLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#2C1A06' }}>Products</h1>
        <Link to="/admin-secret/products/add" style={{ background: '#4A2E0A', color: '#F5C451', padding: '9px 18px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>
          + Add Product
        </Link>
      </div>

      {loading ? (
        <p style={{ color: '#888' }}>Loading...</p>
      ) : (
        <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#fafafa' }}>
                <th style={thStyle}>Image</th>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Category</th>
                <th style={thStyle}>Price</th>
                <th style={thStyle}>Stock</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr><td colSpan={6} style={{ ...tdStyle, textAlign: 'center', color: '#aaa', padding: '2rem' }}>No products yet. Add your first product.</td></tr>
              ) : products.map(p => (
                <tr key={p._id} style={{ transition: 'background 0.15s' }}>
                  <td style={tdStyle}>
                    {p.img
                      ? <img src={p.img} alt={p.name} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px' }} />
                      : <div style={{ width: '48px', height: '48px', background: '#f0e8d8', borderRadius: '8px' }} />
                    }
                  </td>
                  <td style={{ ...tdStyle, fontWeight: 500, color: '#2C1A06', maxWidth: '200px' }}>{p.name}</td>
                  <td style={tdStyle}><span style={{ background: '#f0e8d8', color: '#4A2E0A', padding: '3px 10px', borderRadius: '20px', fontSize: '12px' }}>{p.cat}</span></td>
                  <td style={{ ...tdStyle, fontWeight: 600, color: '#C8922A' }}>{p.price}</td>
                  <td style={tdStyle}>
                    <span style={{ color: p.inStock ? '#2E7D32' : '#c62828', fontSize: '13px' }}>
                      {p.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Link to={`/admin-secret/products/edit/${p._id}`} style={{ background: '#1565C0', color: '#fff', padding: '5px 12px', borderRadius: '6px', textDecoration: 'none', fontSize: '12px' }}>Edit</Link>
                      <button onClick={() => handleDelete(p._id, p.name)} style={{ background: '#c62828', color: '#fff', padding: '5px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontSize: '12px' }}>Delete</button>
                    </div>
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
