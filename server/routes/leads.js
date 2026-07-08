const express   = require('express');
const router    = express.Router();
const adminAuth = require('../middleware/adminAuth');
const { createLead, getLeads, updateLeadStatus } = require('../controllers/leadController');

router.post('/',          createLead);
router.get('/',           adminAuth, getLeads);
router.put('/:id/status', adminAuth, updateLeadStatus);

module.exports = router;
