const express = require('express');
const router = express.Router();
const { generateInvoice } = require('../Controllers/invoiceController');
const authenticate = require('../middleware/authenticate'); // Assuming you have middleware for authentication

// Route to generate invoice
router.post('/generate-invoice', authenticate, generateInvoice);
// router.post('/generate-invoice', generateInvoice);

module.exports = router;
