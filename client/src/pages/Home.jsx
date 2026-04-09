import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Topbar from '../components/Topbar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const homeSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Nalini Jaggery",
  "url": "https://www.nalinijaggery.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.nalinijaggery.com/products?search={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <SEO 
        title="Home"
        description="India's trusted manufacturer of organic, chemical-free jaggery. FSSAI Certified. Bulk supply pan-India."
        keywords="organic jaggery manufacturer India, pure sugarcane jaggery, chemical free jaggery, zero chemical jaggery, FSSAI certified jaggery"
        url="/"
        schema={homeSchema}
      />
      <Topbar />
      <Navbar />

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-text">
          <div className="hero-badge">🌿 FSSAI Certified &nbsp;|&nbsp; Chemical Free &nbsp;|&nbsp; APEDA Registered</div>
          <h1>Pure Organic<br /><em>Jaggery</em> From<br />Nature's Finest</h1>
          <p>India's trusted manufacturer of chemical-free, organic jaggery. Farm-sourced, traditionally processed, and available in bulk for retailers, exporters &amp; supermarkets across India.</p>
          <div className="hero-actions">
            <Link to="/quote" className="btn-primary">Get a Free Quote</Link>
            <Link to="/products" className="btn-outline">View Products ↓</Link>
          </div>
          <div className="hero-stats">
            <div className="stat"><div className="num">15+</div><div className="label">Years Exp.</div></div>
            <div className="stat"><div className="num">500+</div><div className="label">Clients</div></div>
            <div className="stat"><div className="num">100%</div><div className="label">Organic</div></div>
            <div className="stat"><div className="num">Pan India</div><div className="label">Supply</div></div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-circle">
            <div className="hero-circle-inner">
              <div className="big">गुड़</div>
              <div className="small">Pure &amp; Natural</div>
            </div>
          </div>
          <div className="hero-quick-info">
            <div className="quick-info-item"><div className="qi-val">₹35–₹90/kg</div><div className="qi-key">Price Range</div></div>
            <div className="quick-info-item"><div className="qi-val">250g–30kg</div><div className="qi-key">Pack Sizes</div></div>
            <div className="quick-info-item"><div className="qi-val">24 hr</div><div className="qi-key">Quote Response</div></div>
            <div className="quick-info-item"><div className="qi-val">Export Ready</div><div className="qi-key">International</div></div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <div className="trust-strip">
        <div className="trust-item"><span>✅</span><span>FSSAI Certified</span></div>
        <div className="trust-divider"></div>
        <div className="trust-item"><span>🏅</span><span>ISO 22000:2005</span></div>
        <div className="trust-divider"></div>
        <div className="trust-item"><span>🌿</span><span>100% Organic</span></div>
        <div className="trust-divider"></div>
        <div className="trust-item"><span>📦</span><span>Bulk Supply Available</span></div>
        <div className="trust-divider"></div>
        <div className="trust-item"><span>🚢</span><span>Export Quality</span></div>
        <div className="trust-divider"></div>
        <div className="trust-item"><span>🇮🇳</span><span>Made in Maharashtra</span></div>
      </div>

      {/* CTA */}
      <section id="contact" style={{background:'var(--brown)',padding:'5rem 2rem',textAlign:'center'}}>
        <div className="section-tag" style={{color:'rgba(251,246,238,0.6)',borderColor:'rgba(251,246,238,0.2)'}}>Get In Touch</div>
        <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(1.8rem,4vw,2.8rem)',color:'#FBF6EE',margin:'1rem 0'}}>Ready to Place an Order?</h2>
        <p style={{color:'rgba(251,246,238,0.65)',fontSize:'15px',maxWidth:'500px',margin:'0 auto 2rem',lineHeight:'1.7'}}>
          Whether you need 10 kg or 10 tonnes — we're ready. Get a free quote within 24 hours.
        </p>
        <div style={{display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap'}}>
          <Link to="/quote" className="btn-primary">Get Free Quote</Link>
          <Link to="/contact" className="btn-outline" style={{color:'#FBF6EE',borderColor:'rgba(251,246,238,0.4)'}}>Contact Us</Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
