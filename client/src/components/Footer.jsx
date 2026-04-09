import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="footer-logo">Nalini <span>Jaggery</span></div>
          <p className="footer-desc">India's trusted manufacturer of organic, chemical-free jaggery. Proudly serving groceries, supermarkets, exporters and health brands across India since 2008.</p>
          <div className="footer-cert-tags">
            <span>GST Verified</span><span>FSSAI Certified</span><span>ISO 22000</span>
          </div>
        </div>
        <div className="footer-col">
          <h4>Products</h4>
          <ul>
            <li><Link to="/products">Organic Jaggery</Link></li>
            <li><Link to="/products">Jaggery Powder</Link></li>
            <li><Link to="/products">Sugarcane Jaggery</Link></li>
            <li><Link to="/products">Chemical Free Jaggery</Link></li>
            <li><Link to="/products">Natural Jaggery</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/about#testimonials">Testimonials</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/quote">Get Free Quote</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Markets We Serve</h4>
          <ul>
            <li><Link to="/about#markets">Retail &amp; Supermarkets</Link></li>
            <li><Link to="/about#markets">Wholesale Traders</Link></li>
            <li><Link to="/about#markets">Export / International</Link></li>
            <li><Link to="/about#markets">Health Food Brands</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2025 <strong>Nalini Jaggery</strong>. All Rights Reserved. Made with ❤️ in Maharashtra, India</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <span>GST: 27AAICK8476F1Z2</span>
          <Link
            to="/admin-secret"
            style={{ fontSize: '11px', color: 'rgba(251,246,238,0.2)', textDecoration: 'none', letterSpacing: '0.05em', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = 'rgba(245,196,81,0.5)'}
            onMouseLeave={e => e.target.style.color = 'rgba(251,246,238,0.2)'}
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
