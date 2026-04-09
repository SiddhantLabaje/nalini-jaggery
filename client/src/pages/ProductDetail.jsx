import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Topbar from '../components/Topbar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { catLabels, descriptions } from '../data/products';
import { getProducts, saveLead, placeOrder } from '../api';
import { toSlug } from '../utils/slugify';

export default function ProductDetail() {
  const { name }    = useParams();
  const navigate    = useNavigate();
  // Name is already a slug from the URL

  const [p, setP]               = useState(null);
  const [allProducts, setAll]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [btnText, setBtnText]   = useState('Send Enquiry');
  const [btnStyle, setBtnStyle] = useState({});
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    getProducts().then(res => {
      const list = res.data.data || [];
      setAll(list);
      const found = list.find(x => toSlug(x.name) === name);
      setP(found || null);
    }).catch(console.error).finally(() => setLoading(false));
  }, [name]);

  if (loading) return (
    <>
      <Topbar /><Navbar />
      <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--muted)' }}>Loading...</div>
      <Footer />
    </>
  );

  if (!p) return (
    <>
      <Topbar /><Navbar />
      <div style={{ padding: '4rem', textAlign: 'center' }}>
        <h2>Product not found</h2>
        <Link to="/products" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>Back to Products</Link>
      </div>
      <Footer />
    </>
  );

  const waMsg  = encodeURIComponent(`Hi, I am interested in ${p.name} (${p.price}). Please share more details.`);
  const related = allProducts.filter(x => x.cat === p.cat && x.name !== p.name).slice(0, 4);

  async function submitDetailQuote(e) {
    e.preventDefault();
    const form = e.target;
    setBtnText('Sending...');
    setDisabled(true);
    try {
      const res = await placeOrder({
        product: p.name,
        name:    form.querySelector('[name="name"]').value,
        phone:   form.querySelector('[name="phone"]').value,
        city:    form.querySelector('[name="city"]').value,
        qty:     form.querySelector('[name="qty"]').value,
      });
      if (res.data.success) {
        setBtnText('Enquiry Sent!');
        setBtnStyle({ background: '#4caf50', color: '#fff' });
        setTimeout(() => { setBtnText('Send Enquiry'); setBtnStyle({}); setDisabled(false); form.reset(); }, 3000);
      } else throw new Error(res.data.message);
    } catch (err) {
      console.error('Product enquiry error:', err);
      setBtnText('Error - Try Again');
      setBtnStyle({ background: '#e53935', color: '#fff' });
      setDisabled(false);
    }
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": p.name,
    "image": p.img,
    "description": descriptions[p.cat] || `Premium quality ${p.name} from Nalini Jaggery.`,
    "sku": toSlug(p.name),
    "brand": {
      "@type": "Brand",
      "name": "Nalini Jaggery"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://www.nalinijaggery.com/products/${toSlug(p.name)}`,
      "priceCurrency": "INR",
      "price": p.price.replace(/[^\d]/g, ''),
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <>
      <SEO 
        title={p.name}
        description={`Buy pure ${p.name}. FSSAI certified, chemical-free and available in bulk. Available pan-India.`}
        keywords={`${p.name}, order ${p.name}, buy ${p.name} bulk, organic jaggery`}
        image={p.img}
        url={`/products/${toSlug(p.name)}`}
        schema={schema}
      />
      <Topbar />
      <Navbar />

      {/* PRODUCT HERO */}
      <section className="pd-hero">
        <div style={{maxWidth:'1100px',margin:'0 auto'}}>
          <div className="pd-breadcrumb">
            <Link to="/">Home</Link> &rsaquo; <Link to="/products">Products</Link> &rsaquo; <span>{p.name}</span>
          </div>
          <div className="pd-layout">
            <div className="pd-img-wrap">
              <img src={p.img} alt={p.name} />
              {p.badge && <div className="pd-badge-overlay">{p.badge}</div>}
            </div>
            <div className="pd-info">
              <div className="pd-cat-tag">{catLabels[p.cat] || p.cat}</div>
              <div className="pd-name">{p.name}</div>
              <div className="pd-price" dangerouslySetInnerHTML={{ __html: p.price.replace(/(\/\w+)$/, '<span>$1</span>') }} />
              <div className="pd-specs">
                <div className="pd-spec-row"><div className="pd-spec-key">Form</div><div className="pd-spec-val">{p.form}</div></div>
                <div className="pd-spec-row"><div className="pd-spec-key">Pack Size</div><div className="pd-spec-val">{p.packing}</div></div>
                <div className="pd-spec-row"><div className="pd-spec-key">Type</div><div className="pd-spec-val">{p.type}</div></div>
                <div className="pd-spec-row"><div className="pd-spec-key">Origin</div><div className="pd-spec-val">Maharashtra, India</div></div>
                <div className="pd-spec-row"><div className="pd-spec-key">Certification</div><div className="pd-spec-val">FSSAI Certified</div></div>
                <div className="pd-spec-row"><div className="pd-spec-key">Availability</div><div className="pd-spec-val" style={{color:'#4caf50'}}>● In Stock</div></div>
              </div>
              <div className="pd-actions">
                <button className="btn-primary" onClick={() => document.getElementById('quoteCard').scrollIntoView({behavior:'smooth',block:'center'})} style={{background:'var(--gold-light)',color:'var(--brown)',border:'none',cursor:'pointer',fontSize:'15px',padding:'14px',borderRadius:'10px',width:'100%'}}>
                  Get Free Quote →
                </button>
                <a href={`https://wa.me/919112658473?text=${waMsg}`} target="_blank" rel="noreferrer" className="pd-btn-wa">
                  Enquire on WhatsApp
                </a>
                <a href="tel:+919112658473" className="pd-btn-call">📞 Call to Order: 09112658473</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DESCRIPTION + QUOTE FORM */}
      <section className="pd-desc-section">
        <div className="pd-desc-inner">
          <div className="pd-desc">
            <h2>Product Details</h2>
            <p>{descriptions[p.cat] || 'Premium quality jaggery from Nalini Jaggery. FSSAI certified, chemical-free, and available in bulk.'}</p>
            <div className="pd-features">
              <div className="pd-feature">100% Chemical-Free — no sulphur, no artificial colour</div>
              <div className="pd-feature">Traditionally processed using open-pan method</div>
              <div className="pd-feature">FSSAI Certified &amp; ISO 22000:2005 quality standards</div>
              <div className="pd-feature">Farm-sourced sugarcane from Maharashtra</div>
              <div className="pd-feature">Available for bulk supply pan-India and export</div>
              <div className="pd-feature">Custom packaging &amp; private labelling available</div>
            </div>
          </div>
          <div className="pd-quote-card" id="quoteCard">
            <h3>Get a Free Quote</h3>
            <p>Fill in your details and we'll respond within 24 hours.</p>
            <form onSubmit={submitDetailQuote}>
              <input type="text"   name="name"  placeholder="Your Name *"          required />
              <input type="tel"    name="phone" placeholder="Phone Number *"        required />
              <input type="text"   name="city"  placeholder="City / State"                   />
              <input type="number" name="qty"   placeholder="Quantity Required (kg)"         />
              <button type="submit" className="btn-primary" id="quoteSubmitBtn" style={{width:'100%',textAlign:'center',border:'none',cursor:'pointer',...btnStyle}} disabled={disabled}>
                {btnText}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      {related.length > 0 && (
        <section className="pd-related">
          <div className="pd-related-inner">
            <h2>Related Products</h2>
            <div className="pd-related-grid">
              {related.map(r => (
                <div key={r.name} className="pd-related-card" onClick={() => navigate(`/products/${toSlug(r.name)}`)}>
                  <div className="pd-related-img"><img src={r.img} alt={`${r.name} - Nalini Jaggery`} loading="lazy" /></div>
                  <div className="pd-related-body">
                    <div className="pd-related-name">{r.name}</div>
                    <div className="pd-related-price">{r.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
