import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { AdminAuthProvider } from './admin/AdminAuthContext';
import ProtectedRoute from './admin/ProtectedRoute';

// Public pages — lazy loaded for code splitting
const Home          = lazy(() => import('./pages/Home'));
const Products      = lazy(() => import('./pages/Products'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const About         = lazy(() => import('./pages/About'));
const Contact       = lazy(() => import('./pages/Contact'));
const Quote         = lazy(() => import('./pages/Quote'));

// Admin pages — lazy loaded (separate chunk)
const AdminLogin     = lazy(() => import('./admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./admin/AdminDashboard'));
const AdminProducts  = lazy(() => import('./admin/AdminProducts'));
const ProductForm    = lazy(() => import('./admin/ProductForm'));
const AdminOrders    = lazy(() => import('./admin/AdminOrders'));

function PageLoader() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)' }}>
      Loading...
    </div>
  );
}

function KeyboardShortcut() {
  const navigate = useNavigate();
  useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        navigate('/admin-secret');
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [navigate]);
  return null;
}

export default function App() {
  return (
    <AdminAuthProvider>
      <KeyboardShortcut />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public */}
          <Route path="/"                element={<Home />} />
          <Route path="/products"        element={<Products />} />
          <Route path="/products/:name"  element={<ProductDetail />} />
          <Route path="/about"           element={<About />} />
          <Route path="/contact"         element={<Contact />} />
          <Route path="/quote"           element={<Quote />} />

          {/* Admin login */}
          <Route path="/admin-secret" element={<AdminLogin />} />

          {/* Admin protected */}
          <Route path="/admin-secret/dashboard"            element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin-secret/products"             element={<ProtectedRoute><AdminProducts /></ProtectedRoute>} />
          <Route path="/admin-secret/products/add"         element={<ProtectedRoute><ProductForm /></ProtectedRoute>} />
          <Route path="/admin-secret/products/edit/:id"    element={<ProtectedRoute><ProductForm /></ProtectedRoute>} />
          <Route path="/admin-secret/orders"               element={<ProtectedRoute><AdminOrders /></ProtectedRoute>} />
        </Routes>
      </Suspense>
    </AdminAuthProvider>
  );
}
