import React from 'react';

const ItemList = ({ orderDetails }) => {
  return (
    <div className="p-4 border-t border-b border-gray-200">
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="text-left py-1">Item</th>
            <th className="text-right py-1">Qty</th>
            <th className="text-right py-1">Price</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails?.totalItems?.map((item, index) => (
            <tr key={index} className="border-t">
              <td className="py-1">{item.itemName}</td>
              <td className="py-1 text-right">{item.quantity}</td>
              <td className="py-1 text-right">₹{item?.finalPrice?.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemList;
