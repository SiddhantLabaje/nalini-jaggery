const express   = require('express');
const router    = express.Router();
const adminAuth = require('../middleware/adminAuth');
const { createLead, getLeads } = require('../controllers/leadController');

router.post('/', createLead);
router.get('/',  adminAuth, getLeads);  // admin only

module.exports = router;
