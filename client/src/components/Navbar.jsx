import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { products } from '../data/products';

export default function Navbar() {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [query, setQuery]         = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate  = useNavigate();
  const location  = useLocation();

  const isActive = (path) => location.pathname === path ? 'active' : '';

  function showSuggestions(val) {
    setQuery(val);
    const q = val.trim().toLowerCase();
    const matches = q
      ? products.filter(p => p.name.toLowerCase().includes(q))
      : products.slice(0, 8);
    setSuggestions(matches);
  }

  function selectSuggestion(name) {
    setQuery(name);
    setSuggestions([]);
    navigate(`/products?search=${encodeURIComponent(name)}`);
  }

  function handleSearch() {
    setSuggestions([]);
    if (!query.trim()) return;
    navigate(`/products?search=${encodeURIComponent(query.trim())}`);
  }

  return (
    <nav>
      <Link to="/" className="logo">Nalini <span>Jaggery</span></Link>
      <ul id="navMenu" className={menuOpen ? 'open' : ''}>
        <li><Link to="/"         className={isActive('/')}         onClick={() => setMenuOpen(false)}>Home</Link></li>
        <li><Link to="/products" className={isActive('/products')} onClick={() => setMenuOpen(false)}>Products</Link></li>
        <li><Link to="/about"    className={isActive('/about')}    onClick={() => setMenuOpen(false)}>About</Link></li>
        <li><Link to="/contact"  className={isActive('/contact')}  onClick={() => setMenuOpen(false)}>Contact</Link></li>
        <li><Link to="/quote"    className={isActive('/quote')}    onClick={() => setMenuOpen(false)}>Get Free Quote</Link></li>
      </ul>
      <div className="nav-search">
        <div className="nav-search-wrap">
          <input
            type="text"
            id="navSearchInput"
            placeholder="Search Products"
            autoComplete="off"
            value={query}
            onChange={e => showSuggestions(e.target.value)}
            onFocus={e => showSuggestions(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
          />
          {suggestions.length > 0 && (
            <ul className="search-suggestions open">
              {suggestions.map(p => (
                <li key={p.name} onClick={() => selectSuggestion(p.name)}>{p.name}</li>
              ))}
            </ul>
          )}
        </div>
        <button className="nav-search-btn" onClick={handleSearch}>Search</button>
      </div>
      <div className="nav-hamburger" id="hamburger" onClick={() => setMenuOpen(o => !o)}>
        <span></span><span></span><span></span>
      </div>
    </nav>
  );
}
