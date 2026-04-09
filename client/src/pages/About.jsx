import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Topbar from '../components/Topbar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

export default function About() {
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
        title="About Us"
        description="Learn about Klass Exim Corporate Pvt. Ltd. and Nalini Jaggery. Rooted in tradition, committed to purity."
        keywords="about nalini jaggery, jaggery manufacturer Maharashtra, organic jaggery exporters, FSSAI certified jaggery"
        url="/about"
      />
      <Topbar />
      <Navbar />

      {/* PAGE HERO */}
      <section style={{background:'linear-gradient(135deg,#2C1505 0%,#5A2E0C 40%,#8B5A0A 100%)',padding:'6rem 2rem',textAlign:'center'}}>
        <div className="section-tag">About Us</div>
        <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(2.4rem,5vw,4rem)',fontWeight:600,color:'#FBF6EE',lineHeight:1.1,margin:'1rem 0'}}>
          Rooted in Tradition,<br /><em style={{color:'#F5C451',fontStyle:'italic'}}>Committed to Purity</em>
        </h1>
        <p style={{color:'rgba(251,246,238,0.65)',fontSize:'17px',fontWeight:300,maxWidth:'640px',margin:'0 auto',lineHeight:1.8}}>
          Klass Exim Corporate Pvt. Ltd. — a registered manufacturer, producer and exporter of organic jaggery products operating from Navi Mumbai, Maharashtra.
        </p>
      </section>

      {/* WHO WE ARE */}
      <section style={{background:'var(--warm-white)',padding:'5rem 2rem'}}>
        <div className="container">
          <div className="section-center">
            <div className="section-tag">Who We Are</div>
            <h2 className="section-title">Klass Exim Corporate Pvt. Ltd.</h2>
            <p className="section-sub">We are a topnotch business enterprise catering to demand for consumables such as manufacturing of Jaggery &amp; Jaggery Products.</p>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'2rem',marginTop:'3rem'}}>
            <div style={{background:'var(--card-bg)',border:'1px solid var(--border)',borderRadius:'16px',padding:'2rem',lineHeight:1.8,color:'var(--muted)',fontSize:'14.5px'}}>
              <p>We supply our offered range in bulk to suffice needs of customers in the retail industry. Our business entity has its own farm for producing certain products — we maintain a healthy farm to provide genuine quality in the market.</p>
              <p style={{marginTop:'1rem'}}>Our company has entered business in Panvel, Maharashtra, India, running operations independently as a manufacturer, producer and exporter to complete needs of unique and fresh edible products.</p>
            </div>
            <div style={{background:'var(--card-bg)',border:'1px solid var(--border)',borderRadius:'16px',padding:'2rem',lineHeight:1.8,color:'var(--muted)',fontSize:'14.5px'}}>
              <p>Our products are catered to street vendors, big retailers, small groceries and more. We maintain an easy flow in the market of our healthy and tasty edibles in order to suffice growing needs of final customers.</p>
              <p style={{marginTop:'1rem'}}>Our product range encompasses Jaggery Cube, Jaggery Powder and Jaggery Syrup and several others. We protect our products from moisture, debris, mixing and other sorts of defects.</p>
            </div>
          </div>
        </div>
      </section>

      {/* OUR AIM */}
      <section className="why" id="about">
        <div className="container">
          <div className="section-center">
            <div className="section-tag">Our Aim</div>
            <h2 className="section-title">What We Stand For</h2>
            <p className="section-sub">We source directly from sugarcane farms and follow age-old traditional methods — no chemicals, no additives, just pure sweetness.</p>
          </div>
          <div className="why-grid">
            <div className="features-list">
              {[
                { icon:'📦', title:'Fresh Dispatch in Packs', desc:'Our company dispatches fresh and healthy products in properly sealed packs to ensure quality reaches you intact.' },
                { icon:'💰', title:'Competitive Pricing', desc:'We maintain our food products at lesser prices without compromising on quality — value for every rupee spent.' },
                { icon:'✅', title:'Pre-Market Quality Check', desc:'Our entire product range is thoroughly checked before the marketing process to eliminate any defects from the source.' },
                { icon:'🌾', title:'High Quality Standards', desc:'We keep high quality standards in our range of Jaggery Cube, Jaggery Powder, Jaggery Syrup and more.' },
              ].map(f => (
                <div key={f.title} className="feature-item reveal">
                  <div className="feature-icon">{f.icon}</div>
                  <div><div className="feature-title">{f.title}</div><div className="feature-desc">{f.desc}</div></div>
                </div>
              ))}
            </div>
            <div className="why-image-col reveal">
              <div className="image-placeholder">
                <div className="emoji">🏭</div>
                <h3>Traditional Production Unit</h3>
                <p>State-of-the-art facility combining traditional methods with modern hygiene standards. Every batch tested for purity.</p>
              </div>
              <div className="cert-badges">
                <span className="badge">✓ FSSAI Certified</span>
                <span className="badge">✓ ISO 22000</span>
                <span className="badge">✓ APEDA</span>
                <span className="badge">✓ GST Verified</span>
                <span className="badge">✓ IEC Registered</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARKETS */}
      <section className="markets" id="markets">
        <div className="container">
          <div className="section-center">
            <div className="section-tag">Who We Serve</div>
            <h2 className="section-title">Markets We Supply</h2>
            <p className="section-sub">From local kiranas to international exporters, we supply the right quality at the right scale.</p>
          </div>
          <div className="markets-grid">
            {[
              { icon:'🏪', title:'Retail & Supermarkets', desc:'Branded packs in 250g, 500g, 1kg, 2kg for shelf-ready retail distribution.' },
              { icon:'🏭', title:'Wholesale Traders', desc:'Bulk supply in 10kg, 25kg & 30kg bags for distributors and wholesale dealers.' },
              { icon:'✈️', title:'Export / International', desc:'Export-grade packaging with APEDA certification. UAE, UK, USA & more.' },
              { icon:'🍵', title:'Health Food Brands', desc:'Private label and OEM jaggery products for health, wellness and FMCG brands.' },
            ].map(m => (
              <div key={m.title} className="market-card reveal">
                <div className="market-icon">{m.icon}</div>
                <div className="market-title">{m.title}</div>
                <div className="market-desc">{m.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" style={{background:'var(--cream)'}}>
        <div className="container">
          <div className="section-center">
            <div className="section-tag">Testimonials</div>
            <h2 className="section-title">Trusted by Businesses Across India</h2>
          </div>
          <div className="testimonials-grid">
            {[
              { initial:'R', name:'Rishit Sanghvi', place:'Organic Store, Ahmedabad, Gujarat', text:'"Exceptional quality and consistent supply. Nalini Jaggery has been our go-to supplier for 3 years. The organic certification makes it easy to sell in premium stores."' },
              { initial:'S', name:'Satish Kulkarni', place:'Exporter, Bhiwandi, Maharashtra', text:'"We export to UAE and the export-quality jaggery from Nalini meets all international standards. Packaging is excellent and delivery is always on time."' },
              { initial:'P', name:'Santosh Patil', place:'Health Brand Owner, Shajapur, MP', text:'"The jaggery powder is incredibly pure — no clumping, perfect color, and the taste is authentic. Our health food brand swears by this supplier."' },
            ].map(t => (
              <div key={t.name} className="testimonial-card reveal">
                <div className="stars">★★★★★</div>
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{t.initial}</div>
                  <div><div className="author-name">{t.name}</div><div className="author-place">{t.place}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
