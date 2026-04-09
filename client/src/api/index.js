import axios from 'axios';

const API = axios.create({ baseURL: '/api' });

// Admin API — attaches JWT token from localStorage on every request
const adminAPI = axios.create({ baseURL: '/api' });
adminAPI.interceptors.request.use(config => {
  const token = localStorage.getItem('admin_token');
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

// Public
export const saveLead    = (data) => API.post('/leads', data);
export const saveQuote   = (data) => API.post('/quotes', data);
export const getProducts = ()     => API.get('/products');
export const placeOrder  = (data) => API.post('/orders', data);

// Admin — auth
export const adminLogin  = (creds) => API.post('/admin/login', creds);

// Admin — products
export const adminGetProducts   = ()         => adminAPI.get('/products/all');
export const adminCreateProduct = (data)     => adminAPI.post('/products', data);
export const adminUpdateProduct = (id, data) => adminAPI.put(`/products/${id}`, data);
export const adminDeleteProduct = (id)       => adminAPI.delete(`/products/${id}`);

// Admin — orders
export const adminGetOrders    = ()      => adminAPI.get('/orders');
export const adminUpdateStatus = (id, s) => adminAPI.put(`/orders/${id}/status`, { status: s });
