import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Topbar from '../components/Topbar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { saveQuote } from '../api';

export default function Quote() {
  const [submitted, setSubmitted] = useState(false);
  const [btnText, setBtnText]     = useState('Send My Quote Request →');
  const [btnStyle, setBtnStyle]   = useState({});
  const [disabled, setDisabled]   = useState(false);

  async function submitQuoteForm(e) {
    e.preventDefault();
    const form = e.target;
    setBtnText('Sending...');
    setDisabled(true);
    try {
      const data = {
        type:     'quote_enquiry',
        title:    form.querySelector('[name="title"]').value,
        name:     form.querySelector('[name="name"]').value,
        phone:    form.querySelector('[name="phone"]').value,
        email:    form.querySelector('[name="email"]').value,
        company:  form.querySelector('[name="company"]').value,
        product:  form.querySelector('[name="product"]').value,
        qty:      form.querySelector('[name="qty"]').value,
        packSize: form.querySelector('[name="packsize"]').value,
        city:     form.querySelector('[name="city"]').value,
        message:  form.querySelector('[name="message"]').value,
      };
      console.log('Submitting quote:', data);
      const res = await saveQuote(data);
      console.log('Response:', res.data);
      if (res.data.success) {
        setSubmitted(true);
      } else throw new Error(res.data.message || 'Unknown error');
    } catch (err) {
      console.error('Quote form error:', err);
      setBtnText('Error - Please try again');
      setBtnStyle({ background: '#e53935', color: '#fff' });
      setDisabled(false);
    }
  }

  return (
    <>
      <SEO 
        title="Get Free Quote"
        description="Request a free custom quote for bulk or wholesale jaggery. Get the best prices within 24 hours."
        keywords="jaggery quote, buy jaggery bulk price, wholesale jaggery cost"
        url="/quote"
      />
      <Topbar />
      <Navbar />

      {/* HERO */}
      <section style={{background:'linear-gradient(135deg,#2C1505 0%,#5A2E0C 50%,#8B5A0A 100%)',padding:'4.5rem 2rem',textAlign:'center'}}>
        <div className="section-tag">Free Quote</div>
        <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(2rem,5vw,3.4rem)',fontWeight:600,color:'#FBF6EE',lineHeight:1.15,margin:'1rem 0'}}>
          Get the Best Price for<br /><em style={{color:'#F5C451'}}>Bulk Jaggery Supply</em>
        </h1>
        <p style={{color:'rgba(251,246,238,0.65)',fontSize:'15px',maxWidth:'520px',margin:'0 auto',lineHeight:1.8}}>
          Fill in your requirement below. We respond within 24 hours with pricing, packaging options and delivery details.
        </p>
      </section>

      {/* QUOTE FORM */}
      <div className="quote-page">
        <div className="quote-wrapper">
          {/* Left info card */}
          <div className="quote-info-card">
            <h3>Why Get a Quote?</h3>
            <div className="quote-info-item">
              <div className="quote-info-icon">⚡</div>
              <div><div className="quote-info-label">Fast Response</div><div className="quote-info-val">We reply within 24 hours with exact pricing and availability.</div></div>
            </div>
            <div className="quote-info-item">
              <div className="quote-info-icon">📦</div>
              <div><div className="quote-info-label">Custom Packaging</div><div className="quote-info-val">250g retail packs to 30kg bulk bags — we match your requirement.</div></div>
            </div>
            <div className="quote-info-item">
              <div className="quote-info-icon">🌍</div>
              <div><div className="quote-info-label">Pan-India &amp; Export</div><div className="quote-info-val">Reliable supply across India and export-ready with APEDA certification.</div></div>
            </div>
            <div className="quote-info-item">
              <div className="quote-info-icon">📞</div>
              <div><div className="quote-info-label">Direct Contact</div><div className="quote-info-val">+91 91126 58473 &nbsp;|&nbsp; info@nalinijaggery.com</div></div>
            </div>
            <div className="quote-perks">
              <div className="quote-perk">No hidden charges</div>
              <div className="quote-perk">FSSAI &amp; ISO Certified products</div>
              <div className="quote-perk">Private label &amp; OEM available</div>
              <div className="quote-perk">Minimum order from 50 kg</div>
              <div className="quote-perk">GST invoice provided</div>
            </div>
          </div>

          {/* Right form card */}
          <div className="quote-form-card">
            <div className="section-tag">Request a Quote</div>
            <h2>Tell Us Your Requirement</h2>
            <p>Share your details and we'll send you the best price for your order.</p>

            {submitted ? (
              <div className="qform-success" style={{display:'block'}}>
                <div className="tick">✅</div>
                <strong style={{fontSize:'17px',color:'var(--brown-dark)'}}>Quote Request Sent!</strong><br />
                Thank you. Our team will contact you within 24 hours with pricing and details.<br /><br />
                <Link to="/products" className="btn-outline" style={{display:'inline-flex'}}>Browse Products</Link>
              </div>
            ) : (
              <form className="qform" id="quoteForm" onSubmit={submitQuoteForm}>
                <div className="form-row">
                  <select required name="title" defaultValue="">
                    <option value="" disabled>Title</option>
                    <option>Mr.</option><option>Ms.</option><option>Mrs.</option><option>Dr.</option>
                  </select>
                  <input type="text" name="name" placeholder="Full Name *" required />
                </div>
                <div className="form-row">
                  <input type="tel"   name="phone" placeholder="Mobile Number *" required />
                  <input type="email" name="email" placeholder="Email Address *" required />
                </div>
                <input type="text" name="company" placeholder="Company / Business Name (optional)" />
                <select required name="product" defaultValue="">
                  <option value="" disabled>Product Required *</option>
                  <option>Organic Jaggery</option>
                  <option>Jaggery Powder</option>
                  <option>Sugarcane Jaggery</option>
                  <option>Chemical Free Jaggery</option>
                  <option>Natural Jaggery</option>
                  <option>Ball Jaggery</option>
                  <option>Jaggery Cubes</option>
                  <option>Jaggery Syrup</option>
                  <option>Multiple Products</option>
                </select>
                <div className="form-row">
                  <input type="number" name="qty" placeholder="Quantity (kg) *" min="1" required />
                  <select name="packsize" defaultValue="">
                    <option value="" disabled>Pack Size</option>
                    <option>250g</option><option>500g</option><option>1 kg</option>
                    <option>2 kg</option><option>5 kg</option><option>10 kg</option>
                    <option>25 kg</option><option>30 kg</option><option>Custom</option>
                  </select>
                </div>
                <input type="text" name="city" placeholder="City / State *" required />
                <textarea name="message" placeholder="Any specific requirements? (e.g. organic certification, export packaging, private label…)"></textarea>
                <button type="submit" className="btn-primary" style={{width:'100%',justifyContent:'center',padding:'14px',border:'none',cursor:'pointer',...btnStyle}} disabled={disabled}>
                  {btnText}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
