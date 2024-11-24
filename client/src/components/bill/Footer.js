import React from 'react';

const Footer = ({ orderDetails }) => {
  return (
    <div className="p-4 text-center">
      <p className="text-sm text-gray-500">Payment Method: {orderDetails?.paymentMethod}</p>
      <p className="text-sm text-gray-500 mt-2">Thank you for dining with us!</p>
    </div>
  );
};

export default Footer;
