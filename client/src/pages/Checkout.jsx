import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../utils/api";
import { clearCart, setPaymentDetails, setUserDetails } from "../redux/slices/cartSlice";
import { generateOrderId } from "../utils/generateOrderId";
import { useNavigate } from "react-router-dom";
import { saveOrderDetails } from "../redux/slices/orderSlice";
import Layout from "../components/Layout/Layout";

const CheckoutPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const { items, initialTotal, subtotal, total, discount,discountAmount, gst, paymentDetails, userDetails } = useSelector((state) => state.cart);
    const [paymentMethod, setPaymentMethod] = useState("razorpay");
    const [isOrderBtn, setIsOrderBtn] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        dispatch(setUserDetails({ ...userDetails, [name]: value }))
    };


    const handlePayment = async () => {
        if (paymentMethod === "razorpay") {

            try {
                // Create payment order
                const { data } = await api.post('/payments/create-order', {
                    amount: total
                });

                const options = {
                    key: `${process.env.REACT_APP_RazorPay_KEY}`,
                    amount: data.order.amount,
                    currency: data.order.currency,
                    name: 'CafeBite',
                    description: 'Payment for your order',
                    order_id: data.order.id,
                    handler: async function (response) {
                        // Verify payment
                        const verificationResponse = await api.post('/payments/verify-payment', {
                            orderId: response.razorpay_order_id,
                            paymentId: response.razorpay_payment_id,
                            signature: response.razorpay_signature,
                        });

                        if (verificationResponse.data.success) {
                            setIsOrderBtn(verificationResponse.data.success)
                            dispatch(setPaymentDetails({
                                paymentMethod: verificationResponse.data.payment.PaymentMethod,
                                currency: verificationResponse.data.payment.currency,
                                orderId: verificationResponse.data.payment.orderId,
                                paymentId: verificationResponse.data.payment.paymentId,
                                receipt: verificationResponse.data.payment.receipt,
                                paymentStatus: verificationResponse.data.payment.status,

                            }));
                            alert('Payment successful and verified!');
                        } else {
                            alert('Payment verification failed');
                        }
                    },
                    prefill: {
                        name: 'Customer Name',
                        email: 'customer@example.com',
                        contact: '9999999999',
                    },
                    theme: {
                        color: '#3399cc',
                    },
                };

                const razorpay = new window.Razorpay(options);
                razorpay.open();
            } catch (error) {
                console.error(error);
                alert('Error initializing payment');
            }
        } else {
            await handleConfirmOrder();
        }
    };


    const handleConfirmOrder = async () => {
        const orderDetails = {
            userDetails,
            paymentId: paymentDetails.paymentId || 'none',
            orderId: paymentDetails.orderId || generateOrderId(),
            paymentMethod: paymentDetails.paymentMethod || 'Cash',
            paymentStatus: paymentDetails.paymentStatus || 'Cash',
            currency: paymentDetails.currency || 'Cash',
            receipt: paymentDetails.receipt || 'none',
            items,
            initialTotal,
            subtotal,
            total: total,
            discount,
            gst,
        };

        try {
            dispatch(saveOrderDetails(orderDetails))
            dispatch(clearCart(orderDetails))
            alert("Order confirmed and stored in the database!");
            navigate(`/cart/checkout/bill?orderId=${orderDetails?.receipt}`)
        } catch (error) {
            console.error("Error storing order:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h2>

                {/* User Details Form */}
                <div className="mb-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={userDetails?.name}
                            onChange={handleInputChange}
                            className="mt-1 block w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={userDetails?.phone}
                            onChange={handleInputChange}
                            className="mt-1 block w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your phone number"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={userDetails?.email}
                            onChange={handleInputChange}
                            className="mt-1 block w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                </div>

                {/* Payment Method */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Payment Method
                    </label>
                    <div className="space-y-2">
                        <div className="flex items-center">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="razorpay"
                                checked={paymentMethod === "razorpay"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                            />
                            <label className="ml-2 text-sm text-gray-700">Razorpay</label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="cash"
                                checked={paymentMethod === "cash"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                            />
                            <label className="ml-2 text-sm text-gray-700">Cash</label>
                        </div>
                    </div>
                </div>

                {/* Total Summary */}
                <div className="mb-6">
                    <div className="flex justify-between text-lg font-medium text-gray-800">
                        <span>Initial Total:</span>
                        <span>₹ {initialTotal}</span>
                    </div>
                    <div className="flex justify-between text-lg font-medium text-gray-800">
                        <span>Discount:{` (${discount})%`}</span>
                        <span>- {discountAmount}</span>
                    </div>
                    <div className="flex justify-between text-lg font-medium text-gray-800">
                        <span>Subtotal:</span>
                        <span>₹ {subtotal}</span>
                    </div>
                    <div className="flex justify-between text-lg font-medium text-gray-800">
                        <span>GST (18%):</span>
                        <span>₹ {gst}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                        <span>Total:</span>
                        <span>₹ {total}</span>
                    </div>
                </div>
                {/* Payment Button */}
                <button
                    onClick={isOrderBtn ? handleConfirmOrder : handlePayment}
                    className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    {!isOrderBtn && paymentMethod === "razorpay" ? "Pay with Razorpay" : "Confirm Order"}
                </button>
            </div>
        </Layout>
    );
};

export default CheckoutPage;
