const express = require("express");
const router = express.Router();
const { createPaymentOrder,verifyPayment, getPaymentInsights } = require("../controllers/PaymentController");
const { auth } = require("../middleware/authMiddleware");


router.post('/create-order', createPaymentOrder);
router.post('/verify-payment', verifyPayment);
router.get('/insights',auth(['owner']), getPaymentInsights);

module.exports = router;
