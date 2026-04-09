import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Topbar from '../components/Topbar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import OrderModal from '../components/OrderModal';
import SEO from '../components/SEO';
import { getProducts } from '../api';

const CATS = [
  { key: 'all',           label: 'All Products' },
  { key: 'organic',       label: 'Organic Jaggery' },
  { key: 'powder',        label: 'Jaggery Powder' },
  { key: 'sugarcane',     label: 'Sugarcane Jaggery' },
  { key: 'chemical-free', label: 'Chemical Free' },
  { key: 'natural',       label: 'Natural Jaggery' },
];

export default function Products() {
  const [searchParams]  = useSearchParams();
  const searchQ         = searchParams.get('search') || '';

  const [products, setProducts]       = useState([]);
  const [loading, setLoading]         = useState(true);
  const [activeCat, setActiveCat]     = useState('all');
  const [modalProduct, setModalProduct] = useState(null);

  useEffect(() => {
    getProducts()
      .then(res => setProducts(res.data.data || []))
      .catch(err => console.error('Failed to load products:', err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = searchQ
    ? products.filter(p => p.name.toLowerCase().includes(searchQ.toLowerCase()))
    : activeCat === 'all' ? products : products.filter(p => p.cat === activeCat);

  return (
    <>
      <SEO 
        title="Our Products"
        description="Explore our range of premium, organic jaggery products. Jaggery blocks, powder, chemical-free blocks available in bulk."
        keywords="buy jaggery online, pure organic jaggery, jaggery powder, jaggery blocks, natural jaggery"
        url="/products"
      />
      <Topbar />
      <Navbar />

      <section className="cat-section" id="products" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <div className="cat-tabs" id="catTabs">
            {CATS.map(c => (
              <button
                key={c.key}
                className={`cat-tab${activeCat === c.key && !searchQ ? ' active' : ''}`}
                onClick={() => setActiveCat(c.key)}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="products-grid" id="productsContainer">
            {loading ? (
              <p style={{ color: 'var(--muted)', padding: '2rem', textAlign: 'center' }}>Loading products...</p>
            ) : filtered.length === 0 ? (
              <p style={{ color: 'var(--muted)', padding: '2rem', textAlign: 'center' }}>
                {searchQ ? `No products found for "${searchQ}"` : 'No products available.'}
              </p>
            ) : (
              filtered.map(p => (
                <ProductCard key={p._id || p.name} product={p} onQuote={() => setModalProduct(p)} />
              ))
            )}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--brown)', padding: '4rem 2rem', textAlign: 'center' }}>
        <div className="section-tag" style={{ color: 'rgba(251,246,238,0.6)', borderColor: 'rgba(251,246,238,0.2)' }}>Bulk Orders Welcome</div>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.8rem,4vw,2.8rem)', color: '#FBF6EE', margin: '1rem 0' }}>Need a Custom Quote?</h2>
        <p style={{ color: 'rgba(251,246,238,0.65)', fontSize: '15px', maxWidth: '500px', margin: '0 auto 2rem', lineHeight: '1.7' }}>
          We supply in bulk from 10kg to 30kg bags. Custom packaging and private labeling available.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/contact" className="btn-primary">Get Free Quote</Link>
          <a href="https://wa.me/919112658473" target="_blank" rel="noreferrer" className="btn-outline" style={{ color: '#FBF6EE', borderColor: 'rgba(251,246,238,0.4)' }}>WhatsApp Us</a>
        </div>
      </section>

      {modalProduct && <OrderModal product={modalProduct} onClose={() => setModalProduct(null)} />}
      <Footer />
    </>
  );
}
