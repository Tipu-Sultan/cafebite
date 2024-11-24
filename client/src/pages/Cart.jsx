import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TrashIcon } from '@heroicons/react/20/solid'; // Heroicons v2
import CartCount from '../components/cart/cartCount';
import CartSummary from '../components/cart/CartSummary';
import { removeItem } from '../redux/slices/cartSlice';
import Layout from '../components/Layout/Layout';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemoveItem = (itemId) => {
    dispatch(removeItem(itemId));
  };

  return (
    <Layout>
      <div className="p-6 max-w-7xl mx-auto flex flex-col lg:flex-row bg-white rounded-lg shadow-md">
        {/* If cart is empty, show an empty message */}
        {items.length === 0 ? (
          <div className="w-full text-center py-16">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven’t added anything to your cart yet.
            </p>
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row w-full">
            {/* Left side: Cart items */}
            <div className="w-full lg:w-3/4 pr-6 mb-6 lg:mb-0">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Cart Items</h2>
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item.id} className="flex items-center justify-between border-b py-4">
                    <div className="flex items-center space-x-4">
                      {item.itemImage !== 'na' ? (
                        <img
                          src={item.itemImage}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-300 rounded-lg flex items-center justify-center text-white">
                          No Image
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-gray-800">{item.name}</p>
                        <CartCount item={item} />
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <p className="text-gray-600 font-semibold">
                        {item.quantity} {'X '}
                        {((item.price - (item.price * (item.discount || 0)) / 100)).toFixed(2)}
                        {' = '}
                        ₹ {((item.price - (item.price * (item.discount || 0)) / 100) * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => handleRemoveItem(item._id)}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right side: Summary */}
            <CartSummary />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
