const Order = require('../models/Order');

// POST /api/orders — public (place order)
const createOrder = async (req, res) => {
  try {
    const { name, phone, product } = req.body;
    if (!name || !phone || !product)
      return res.status(400).json({ success: false, message: 'Name, phone and product are required' });
    const order = await Order.create(req.body);
    res.status(201).json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/orders — admin
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/orders/export/csv — admin
const exportOrdersCSV = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    const header = 'Name,Phone,Email,City,Product,Qty,Message,Status,Date';
    const rows = orders.map(o =>
      [o.name, o.phone, o.email || '', o.city || '', o.product, o.qty || '', o.message || '', o.status,
       new Date(o.createdAt).toLocaleDateString('en-IN')]
      .map(v => `"${String(v).replace(/"/g, '""')}"`)
      .join(',')
    );
    const csv = [header, ...rows].join('\n');
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="orders.csv"');
    res.send(csv);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/orders/:id/status — admin
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { createOrder, getOrders, exportOrdersCSV, updateOrderStatus };
