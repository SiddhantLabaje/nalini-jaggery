import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { adminCreateProduct, adminUpdateProduct, adminGetProducts } from '../api';

const CATS = ['organic', 'powder', 'sugarcane', 'chemical-free', 'natural'];
const EMPTY = { name: '', cat: 'organic', price: '', form: '', packing: '', type: '', img: '', badge: '', description: '', inStock: true };

export default function ProductForm() {
  const { id }     = useParams();
  const navigate   = useNavigate();
  const isEdit     = Boolean(id);

  const [form, setForm]     = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState('');
  const [imageType, setImageType] = useState('url');

  useEffect(() => {
    document.title = isEdit ? 'Edit Product - Admin' : 'Add Product - Admin';
    if (isEdit) {
      adminGetProducts().then(res => {
        const found = (res.data.data || []).find(p => p._id === id);
        if (found) {
          setForm({ ...EMPTY, ...found });
          if (found.img && found.img.startsWith('data:')) {
            setImageType('file');
          } else {
            setImageType('url');
          }
        }
      }).catch(console.error);
    }
  }, [id, isEdit]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      if (isEdit) {
        await adminUpdateProduct(id, form);
      } else {
        await adminCreateProduct(form);
      }
      navigate('/admin-secret/products');
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed. Please try again.');
      setSaving(false);
    }
  };

  const inputStyle = { width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' };
  const labelStyle = { display: 'block', fontSize: '13px', fontWeight: 500, color: '#444', marginBottom: '5px' };

  return (
    <AdminLayout>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#2C1A06', marginBottom: '1.5rem' }}>
        {isEdit ? 'Edit Product' : 'Add New Product'}
      </h1>

      {error && <div style={{ background: '#ffebee', color: '#c62828', padding: '12px 16px', borderRadius: '8px', marginBottom: '1rem', fontSize: '14px' }}>{error}</div>}

      <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: '12px', padding: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', maxWidth: '700px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>

          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>Product Name *</label>
            <input name="name" value={form.name} onChange={handleChange} required style={inputStyle} placeholder="e.g. Organic Jaggery 10 Kg" />
          </div>

          <div>
            <label style={labelStyle}>Category *</label>
            <select name="cat" value={form.cat} onChange={handleChange} required style={inputStyle}>
              {CATS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label style={labelStyle}>Price *</label>
            <input name="price" value={form.price} onChange={handleChange} required style={inputStyle} placeholder="e.g. Rs.44/kg" />
          </div>

          <div>
            <label style={labelStyle}>Form</label>
            <input name="form" value={form.form} onChange={handleChange} style={inputStyle} placeholder="e.g. Solid, Powder, Cubes" />
          </div>

          <div>
            <label style={labelStyle}>Pack Size</label>
            <input name="packing" value={form.packing} onChange={handleChange} style={inputStyle} placeholder="e.g. 10 kg, 500g" />
          </div>

          <div>
            <label style={labelStyle}>Type</label>
            <input name="type" value={form.type} onChange={handleChange} style={inputStyle} placeholder="e.g. Organic, Natural" />
          </div>

          <div>
            <label style={labelStyle}>Badge</label>
            <input name="badge" value={form.badge} onChange={handleChange} style={inputStyle} placeholder="e.g. Best Seller, Export" />
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>Product Image</label>
            <div style={{ display: 'flex', gap: '15px', marginBottom: '10px' }}>
              <label style={{ fontSize: '14px', cursor: 'pointer' }}>
                <input type="radio" checked={imageType === 'url'} onChange={() => { setImageType('url'); setForm(prev => ({ ...prev, img: '' })); }} style={{ marginRight: '5px' }} />
                Image URL
              </label>
              <label style={{ fontSize: '14px', cursor: 'pointer' }}>
                <input type="radio" checked={imageType === 'file'} onChange={() => { setImageType('file'); setForm(prev => ({ ...prev, img: '' })); }} style={{ marginRight: '5px' }} />
                Upload File (JPG/PNG)
              </label>
            </div>
            
            {imageType === 'url' ? (
              <input name="img" value={form.img} onChange={handleChange} style={inputStyle} placeholder="https://..." />
            ) : (
              <input type="file" accept="image/*" onChange={(e) => {
                 const file = e.target.files[0];
                 if(file) {
                    const reader = new FileReader();
                    reader.onloadend = () => setForm(prev => ({ ...prev, img: reader.result }));
                    reader.readAsDataURL(file);
                 }
              }} style={{ ...inputStyle, padding: '7px 12px' }} />
            )}
            
            {form.img && <img src={form.img} alt="preview" style={{ marginTop: '8px', height: '80px', borderRadius: '8px', objectFit: 'cover' }} />}
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={3} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Product description..." />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" name="inStock" id="inStock" checked={form.inStock} onChange={handleChange} style={{ width: '16px', height: '16px', cursor: 'pointer' }} />
            <label htmlFor="inStock" style={{ ...labelStyle, marginBottom: 0, cursor: 'pointer' }}>In Stock</label>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
          <button type="submit" disabled={saving} style={{ background: '#4A2E0A', color: '#F5C451', padding: '10px 24px', borderRadius: '8px', border: 'none', cursor: saving ? 'not-allowed' : 'pointer', fontSize: '14px', fontWeight: 500, opacity: saving ? 0.7 : 1 }}>
            {saving ? 'Saving...' : isEdit ? 'Update Product' : 'Add Product'}
          </button>
          <button type="button" onClick={() => navigate('/admin-secret/products')} style={{ background: '#f0f0f0', color: '#444', padding: '10px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '14px' }}>
            Cancel
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}
