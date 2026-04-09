const express    = require('express');
const router     = express.Router();
const adminAuth  = require('../middleware/adminAuth');
const {
  getProducts, getAllProducts, createProduct, updateProduct, deleteProduct
} = require('../controllers/productController');

router.get('/',        getProducts);               // public
router.get('/all',     adminAuth, getAllProducts);  // admin
router.post('/',       adminAuth, createProduct);  // admin
router.put('/:id',     adminAuth, updateProduct);  // admin
router.delete('/:id',  adminAuth, deleteProduct);  // admin

module.exports = router;
