import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toSlug } from '../utils/slugify';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { name, price, form, packing, type, img, badge } = product;
  const detailUrl = `/products/${toSlug(name)}`;

  const priceHtml = price.replace(/(\/\w+)$/, '<span>$1</span>');

  return (
    <div className="product-card" onClick={() => navigate(detailUrl)}>
      <div className="product-img">
        <img src={img} alt={`${name} - Nalini Jaggery`} loading="lazy" style={{width:'100%',height:'100%',objectFit:'cover'}} />
        {badge && <div className="product-badge">{badge}</div>}
      </div>
      <div className="product-body">
        <div className="product-name">{name}</div>
        <div className="product-meta">
          <div className="product-meta-row"><span>Form</span><span>{form}</span></div>
          <div className="product-meta-row"><span>Pack Size</span><span>{packing}</span></div>
          <div className="product-meta-row"><span>Type</span><span>{type}</span></div>
        </div>
        <div className="product-footer">
          <div className="product-price" dangerouslySetInnerHTML={{ __html: priceHtml }} />
          <a
            className="btn-quote"
            href={detailUrl}
            onClick={e => { e.stopPropagation(); navigate(detailUrl); e.preventDefault(); }}
          >
            View Details
          </a>
        </div>
      </div>
    </div>
  );
}
