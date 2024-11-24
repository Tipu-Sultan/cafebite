import React from 'react';

const BillingSummary = ({ orderDetails }) => {
  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex justify-between text-lg font-medium text-gray-800">
        <span>Initial Total:</span>
        <span>₹ {orderDetails.initialTotal}</span>
      </div>
      <div className="flex justify-between text-lg  text-gray-800">
        <span>Discount:{` (${orderDetails.discount})%`}</span>
        <span>- {(orderDetails.initialTotal*orderDetails.discount)/100}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="text-sm font-semibold">Subtotal:</span>
        <span className="text-sm">₹{orderDetails?.subtotal?.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="text-sm font-semibold">GST (18%):</span>
        <span className="text-sm">₹{orderDetails?.gst?.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="text-sm font-semibold">Discount:</span>
        <span className="text-sm">₹{orderDetails?.discount?.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm font-semibold">Total:</span>
        <span className="text-lg font-bold">₹{orderDetails?.total?.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default BillingSummary;
