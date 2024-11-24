import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { applyDiscount } from '../../redux/slices/cartSlice';
import { Link } from 'react-router-dom';

const CartSummary = () => {
  const { total, subtotal, discount, discountAmount, initialTotal, gst } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleDiscountChange = (e) => {
    dispatch(applyDiscount(Number(e.target.value)));
  };

  return (
    <div className="w-full lg:w-1/4 border-l lg:border-l-2 pl-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Summary</h2>
      <div className="space-y-2">
        <div className="flex justify-between text-gray-800">
          <span className="font-semibold">Initial Total:</span>
          <span className="font-semibold">₹ {initialTotal}</span>
        </div>
        <hr />
        <div className="flex justify-between text-lg font-medium text-gray-800">
          <span>Discount:{` (${discount})%`}</span>
          <span>- {discountAmount}</span>
        </div>
        <div className="flex justify-between text-gray-800">
          <span className="font-semibold">Subtotal:</span>
          <span className="font-semibold">₹ {subtotal}</span>
        </div>
        <div className="flex justify-between text-gray-800">
          <span className="font-semibold">GST (18%):</span>
          <span className="font-semibold">₹ {gst}</span>
        </div>
        <div className="flex justify-between text-gray-800">
          <span className="font-semibold">Discount: <span className='text-sm text-green-600'>{discount && discountAmount + '₹ applied'}</span></span>
          <input
            type="number"
            value={discount}
            onChange={handleDiscountChange}
            className="border px-3 py-2 rounded-lg w-24 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-between font-semibold text-xl text-gray-800">
          <span>Total:</span>
          <span className="text-green-600">
            ₹{total}
          </span>
        </div>
      </div>
      <div className="mt-6">
        <Link to={'/cart/checkout'} className="w-full py-2 px-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default CartSummary;
