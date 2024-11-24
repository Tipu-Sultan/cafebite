const express = require("express");
const router = express.Router();
const { createPaymentOrder,verifyPayment, getPaymentInsights } = require("../controllers/PaymentController");
const { auth } = require("../middleware/authMiddleware");


router.post('/create-order',auth(['admin']), createPaymentOrder);
router.post('/verify-payment',auth(['admin']), verifyPayment);
router.get('/insights',auth(['owner']), getPaymentInsights);

module.exports = router;
