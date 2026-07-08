const express   = require('express');
const router    = express.Router();
const adminAuth = require('../middleware/adminAuth');
const { createQuote, getQuotes, updateQuoteStatus } = require('../controllers/quoteController');

router.post('/',          createQuote);
router.get('/',           adminAuth, getQuotes);
router.put('/:id/status', adminAuth, updateQuoteStatus);

module.exports = router;
