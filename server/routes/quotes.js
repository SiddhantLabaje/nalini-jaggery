const express   = require('express');
const router    = express.Router();
const adminAuth = require('../middleware/adminAuth');
const { createQuote, getQuotes } = require('../controllers/quoteController');

router.post('/', createQuote);
router.get('/',  adminAuth, getQuotes);  // admin only

module.exports = router;
