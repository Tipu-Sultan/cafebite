import React from 'react';
import { formatIndianTime } from '../../utils/formatIndianTime';

const OrderDetails = ({ orderDetails }) => {
  return (
    <div className="p-4">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-semibold">Date:</span>
        <span className="text-sm">{formatIndianTime(orderDetails?.createdAt)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="text-sm font-semibold">Order ID:</span>
        <span className="text-sm">{orderDetails?.receipt}</span>
      </div>
    </div>
  );
};

export default OrderDetails;
