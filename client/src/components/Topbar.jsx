import React from 'react';
import { Link } from 'react-router-dom';

const WhatsAppIcon = () => (
  <svg className="topbar-icon" width="16" height="16" viewBox="0 0 32 32" aria-hidden="true">
    <path fill="currentColor" d="M19.11 17.56c-.27-.14-1.61-.79-1.86-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.13-.42-2.16-1.33-.8-.72-1.34-1.6-1.5-1.87-.16-.27-.02-.42.12-.56.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.48-.84-2.02-.22-.54-.45-.46-.61-.46h-.52c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27 0 1.33.98 2.62 1.11 2.8.14.18 1.93 2.95 4.68 4.13.65.28 1.16.44 1.55.56.65.21 1.23.18 1.7.11.52-.08 1.61-.66 1.84-1.3.23-.64.23-1.18.16-1.3-.07-.12-.25-.2-.52-.34z"/>
    <path fill="currentColor" d="M16.02 3.2c-6.97 0-12.64 5.65-12.64 12.6 0 2.23.59 4.41 1.7 6.33L3.2 28.8l6.88-1.8c1.86 1.02 3.96 1.56 6.11 1.56h.01c6.97 0 12.64-5.65 12.64-12.6 0-3.36-1.31-6.52-3.69-8.89-2.39-2.36-5.56-3.67-8.93-3.67zm0 23.22h-.01c-1.9 0-3.77-.51-5.4-1.49l-.39-.23-4.08 1.07 1.09-3.98-.25-.4a10.46 10.46 0 0 1-1.63-5.6c0-5.78 4.72-10.48 10.52-10.48 2.81 0 5.45 1.09 7.44 3.06a10.42 10.42 0 0 1 3.08 7.42c0 5.78-4.72 10.48-10.37 10.63z"/>
  </svg>
);

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbar-right">
        <a href="https://wa.me/7666362808" target="_blank" rel="noreferrer" className="topbar-pill topbar-pill--whatsapp">
          <WhatsAppIcon /> WhatsApp
        </a>
        <a href="tel:+7666362808" className="topbar-pill">
          <span className="topbar-pill-icon">📞</span> Call +91-7666362808
        </a>
        <a
          href="mailto:labajesiddhant07@gmail.com"
          onClick={() => {
            setTimeout(() => {
              window.open("https://mail.google.com/mail/?view=cm&fs=1&to=labajesiddhant07@gmail.com", "_blank");
            }, 500);
          }}
          className="topbar-pill"
        >
          <span className="topbar-pill-icon">✉️</span> Send Email
        </a>
        {/* <Link
          to="/admin-secret"
          className="topbar-pill topbar-pill--admin"
        >
          <span className="topbar-pill-icon">⚙️</span> Admin Panel
        </Link> */}
      </div>
    </div>
  );
}
