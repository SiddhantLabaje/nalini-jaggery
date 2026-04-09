const express = require('express');
const router  = express.Router();
const { createQuote, getQuotes } = require('../controllers/quoteController');

router.post('/', createQuote);
router.get('/',  getQuotes);

module.exports = router;
