const express   = require('express');
const router    = express.Router();
const adminAuth = require('../middleware/adminAuth');
const {
  createOrder, getOrders, exportOrdersCSV, updateOrderStatus
} = require('../controllers/orderController');

router.post('/',                  createOrder);              // public
router.get('/',                   adminAuth, getOrders);     // admin
router.get('/export/csv',         adminAuth, exportOrdersCSV); // admin
router.put('/:id/status',         adminAuth, updateOrderStatus); // admin

module.exports = router;
