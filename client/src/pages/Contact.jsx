import React, { useState, useEffect } from 'react';
import Topbar from '../components/Topbar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { saveLead } from '../api';

export default function Contact() {
  const [btnText, setBtnText] = useState('Send Enquiry');
  const [btnStyle, setBtnStyle] = useState({});
  const [disabled, setDisabled] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    setBtnText('Sending...');
    setDisabled(true);
    try {
      const data = {
        type:    'contact_enquiry',
        name:    form.querySelector('[name="name"]').value,
        phone:   form.querySelector('[name="phone"]').value,
        email:   form.querySelector('[name="email"]').value,
        message: form.querySelector('[name="message"]').value,
        company: form.querySelector('[name="company"]').value,
      };
      const res = await saveLead(data);
      if (res.data.success) {
        setBtnText('Enquiry Sent!');
        setBtnStyle({ background: '#4caf50', color: '#fff' });
        setTimeout(() => {
          setBtnText('Send Enquiry');
          setBtnStyle({});
          setDisabled(false);
          form.reset();
        }, 4000);
      } else {
        throw new Error(res.data.message || 'Unknown error');
      }
    } catch (err) {
      console.error('Contact form error:', err);
      setBtnText('Error - Please try again');
      setBtnStyle({ background: '#e53935', color: '#fff' });
      setDisabled(false);
    }
  }

  return (
    <React.Fragment>
      <SEO 
        title="Contact Us"
        description="Get in touch with Nalini Jaggery for bulk orders, wholesale supply, or any inquiries."
        keywords="contact nalini jaggery, jaggery bulk orders, jaggery supplier contact details"
        url="/contact"
      />
      <Topbar />
      <Navbar />
      <section id="contact" style={{ paddingTop: '4rem' }}>
        <div className="contact-grid">
          <div className="contact-left">
            <div className="section-tag">Contact Us</div>
            <h2 className="section-title">Tell Us Your Requirement</h2>
            <p className="contact-intro">
              Share your jaggery requirement, and our team will get back to you with price, packaging and delivery details.
            </p>
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">Company</div>
                <div>
                  <div className="contact-label">Company</div>
                  <div className="contact-value">Klass Exim Corporate Private Limited</div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">Location</div>
                <div>
                  <div className="contact-label">Registered Office</div>
                  <div className="contact-value">Navi Mumbai - 400614, Maharashtra, India</div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">Phone</div>
                <div>
                  <div className="contact-label">Phone</div>
                  <div className="contact-value">+91-7942715360</div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">Email</div>
                <div>
                  <div className="contact-label">Email</div>
                  <div className="contact-value">info@nalinijaggery.com</div>
                </div>
              </div>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <select name="title" required defaultValue="">
                <option value="" disabled>Title</option>
                <option>Mr.</option>
                <option>Ms.</option>
                <option>Mrs.</option>
                <option>Dr.</option>
              </select>
              <input type="text" name="name" placeholder="Name *" required />
            </div>
            <textarea name="message" placeholder="Describe your requirement *" required></textarea>
            <div className="form-row">
              <input type="tel" name="phone" placeholder="Mobile Number *" required />
              <input type="email" name="email" placeholder="Email ID *" required />
            </div>
            <input type="text" name="company" placeholder="Company / Business Name (optional)" />
            <button type="submit" className="form-submit" style={btnStyle} disabled={disabled}>
              {btnText}
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </React.Fragment>
  );
}
