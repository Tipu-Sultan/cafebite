// controllers/paymentController.js
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Payment = require('../models/paymentModel');
const axios = require('axios');
const { generateOrderId } = require('../config/generateOrderId');

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,  // Replace with your Razorpay Key ID
    key_secret: process.env.RAZORPAY_KEY_SECRET,      // Replace with your Razorpay Key Secret
});

// Create payment order
exports.createPaymentOrder = async (req, res) => {
    try {
        const { amount } = req.body;

        const options = {
            amount: amount * 100,
            currency: 'INR',
            receipt: generateOrderId(),
        };

        const order = await razorpayInstance.orders.create(options);

        // Save order details in the database
        const payment = new Payment({
            orderId: order.id,
            receipt: order.receipt,
            amount: amount,
        });

        await payment.save();

        res.status(201).json({
            success: true,
            order,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Unable to create payment order' });
    }
};

exports.verifyPayment = async (req, res) => {
    try {
        const { orderId, paymentId, signature } = req.body;

        // Verify the signature
        const generatedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(`${orderId}|${paymentId}`)
            .digest('hex');

        if (generatedSignature !== signature) {
            return res.status(400).json({ success: false, message: 'Payment verification failed' });
        } else {
            const paymentDetails = await axios.get(
                `https://api.razorpay.com/v1/payments/${paymentId}`,
                {
                    auth: {
                        username: process.env.RAZORPAY_KEY_ID,
                        password: process.env.RAZORPAY_KEY_SECRET,
                    },
                }
            );

            const {
                method,
                receipt
            } = paymentDetails.data;

            // Update payment status in the database
            const payment = await Payment.findOneAndUpdate(
                { orderId },
                { paymentId, signature, status: 'successful', PaymentMethod: method,receipt },
                { new: true }
            );

            if (!payment) {
                return res.status(404).json({ success: false, message: 'Payment record not found' });
            }
            res.status(200).json({ success: true, message: 'Payment verified successfully', payment });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error verifying payment' });
    }
};

exports.getPaymentInsights = async (req, res) => {
    try {
        // Extract filter parameters from the query
        const { startDate, endDate, month, year } = req.query;

        let filter = {};
        if (startDate && endDate) {
            filter.createdAt = {
                $gte: new Date(startDate),  // greater than or equal to startDate
                $lte: new Date(endDate),    // less than or equal to endDate
            };
        } else if (month && year) {
            filter.createdAt = {
                $gte: new Date(`${year}-${month}-01`),
                $lt: new Date(`${year}-${parseInt(month) + 1}-01`),
            };
        }

        // Fetch all payments based on the filter
        const payments = await Payment.find(filter);

        // Calculate insights
        const totalRevenue = payments.reduce((acc, payment) => {
            if (payment.status === 'successful') {
                acc += payment.amount;
            }
            return acc;
        }, 0);

        const averagePayment = payments.reduce((acc, payment) => {
            if (payment.status === 'successful') {
                acc += payment.amount;
            }
            return acc;
        }, 0) / payments.length || 0;

        const successfulPayments = payments.filter(payment => payment.status === 'successful').length;
        const failedPayments = payments.filter(payment => payment.status === 'failed').length;

        const paymentMethodDistribution = payments.reduce((acc, payment) => {
            if (payment.status === 'successful') {
                acc[payment.PaymentMethod] = acc[payment.PaymentMethod] || 0;
                acc[payment.PaymentMethod] += payment.amount;
            }
            return acc;
        }, {});

        // Calculate daily revenue (payments between 10 AM and 11 PM today)
        const now = new Date();
        const startOfToday = new Date(now.setHours(0, 0, 0, 0)); // 10 AM today
        const endOfToday = new Date(now.setHours(23, 59, 59, 999)); // 11 PM today

        const dailyRevenue = payments.reduce((acc, payment) => {
            const paymentDate = new Date(payment.createdAt);
            if (
                payment.status === 'successful' &&
                paymentDate >= startOfToday &&
                paymentDate <= endOfToday
            ) {
                acc += payment.amount;
            }
            return acc;
        }, 0);

        // Send insights and data back to frontend
        res.status(200).json({
            totalRevenue,
            averagePayment,
            successfulPayments,
            failedPayments,
            paymentMethodDistribution,
            dailyRevenue,  // New field added for daily revenue
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




