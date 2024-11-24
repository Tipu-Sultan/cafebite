import React from "react";
import { updateQuantity, removeItem } from "../../redux/slices/cartSlice";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { useDispatch } from "react-redux";

const CartCount = ({ item }) => {
  const dispatch = useDispatch();

  const handleIncreaseQuantity = (itemId, quantity) => {
    dispatch(updateQuantity({ id: itemId, quantity: quantity + 1 }));
  };

  const handleDecreaseQuantity = (itemId, quantity) => {
    if (quantity > 1) {
      // Decrease quantity if it's greater than 1
      dispatch(updateQuantity({ id: itemId, quantity: quantity - 1 }));
    } else {
      dispatch(removeItem(itemId));
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <button
        onClick={() => handleDecreaseQuantity(item._id, item.quantity)}
        className="px-3 border border-green-300 text-green-600 py-2 rounded-md hover:bg-green-50 transition"
      >
        <MinusIcon className="w-5 h-5 text-gray-800" />
      </button>
      <span className="font-semibold">{item.quantity}</span>
      <button
        onClick={() => handleIncreaseQuantity(item._id, item.quantity)}
        className="px-3 border border-green-300 text-green-600 py-2 rounded-md hover:bg-green-50 transition"
      >
        <PlusIcon className="w-5 h-5 text-gray-800" />
      </button>
    </div>
  );
};

export default CartCount;
