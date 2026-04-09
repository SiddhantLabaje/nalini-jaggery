import React, { useState } from 'react';
import { placeOrder } from '../api';

export default function OrderModal({ product, onClose }) {
  const [btnText, setBtnText]   = useState('Send Enquiry');
  const [btnStyle, setBtnStyle] = useState({});
  const [disabled, setDisabled] = useState(false);

  if (!product) return null;

  async function submitOrder(e) {
    e.preventDefault();
    const form = e.target;
    setBtnText('Sending...');
    setDisabled(true);

    try {
      const data = {
        product: product.name,
        name:    form.querySelector('[name="name"]').value,
        phone:   form.querySelector('[name="phone"]').value,
        city:    form.querySelector('[name="city"]').value,
        qty:     form.querySelector('[name="qty"]').value,
      };
      const res = await placeOrder(data);
      if (res.data.success) {
        setBtnText('Enquiry Sent!');
        setBtnStyle({ background: '#4caf50', color: '#fff' });
        setTimeout(() => {
          onClose();
          setBtnText('Send Enquiry');
          setBtnStyle({});
          setDisabled(false);
          form.reset();
        }, 2000);
      } else throw new Error(res.data.message);
    } catch (err) {
      console.error('Order modal error:', err);
      setBtnText('Error - Try Again');
      setBtnStyle({ background: '#e53935', color: '#fff' });
      setDisabled(false);
    }
  }

  return (
    <div id="orderModal" style={{ display: 'flex' }} onClick={e => e.target.id === 'orderModal' && onClose()}>
      <div className="modal-box quote-modal">
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-grid">
          <div className="modal-product">
            <div className="modal-product-img">
              <img id="modalProductImg" src={product.img} alt={product.name} />
            </div>
            <div className="modal-product-info">
              <div className="modal-product-title">Selected Product</div>
              <div className="modal-product-name">{product.name}</div>
              <div className="modal-product-price">{product.price}</div>
            </div>
          </div>
          <div className="modal-form-col">
            <div className="section-tag">Get a Quote</div>
            <p className="modal-subtext">Fill in your details and we'll get back to you within 24 hours.</p>
            <form id="orderForm" onSubmit={submitOrder}>
              <input type="text"   name="name"  placeholder="Your Name *"          required />
              <input type="tel"    name="phone" placeholder="Phone Number *"        required />
              <input type="text"   name="city"  placeholder="City / State"                   />
              <input type="number" name="qty"   placeholder="Quantity Required (kg)"         />
              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', ...btnStyle }}
                disabled={disabled}
              >
                {btnText}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
