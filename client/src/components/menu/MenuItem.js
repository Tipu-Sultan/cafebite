import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/slices/cartSlice";
import CartCount from "../cart/cartCount";
import { Link } from "react-router-dom";

const MenuItem = ({ item }) => {
  const dispatch = useDispatch();

  // Get the cart items from Redux store
  const cartItems = useSelector((state) => state.cart.items);

  // Check if the item is already in the cart
  const cartItem = cartItems.find((cartItem) => cartItem._id === item._id);

  const discountedPrice = (item.price - item.price * (item.discount / 100)).toFixed(2);
  const savings = (item.price * (item.discount / 100)).toFixed(2);

  const handleAddToCart = () => {
    dispatch(addItem({ ...item, quantity: 1 }));
  };

  return (
    <div className="p-3 border rounded-lg shadow-md bg-white hover:shadow-lg transition duration-200">
      <Link to={`/item/details/${item._id}`}>
        {item.itemImage ? (
          <img
            src={item.itemImage}
            alt={item.name}
            className="w-full h-40 object-cover rounded-md mb-4"
          />
        ) : (
          <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-700 text-lg">
            No Image
          </div>
        )}
      </Link>

      <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
      <p className="text-sm text-gray-600 mb-2">
        {item.description.length > 60 ? `${item.description.slice(0, 60)}...` : item.description}
      </p>
      <p className="text-sm text-gray-600 mb-2">{item.foodSizeOrWeight}</p>

      <div className="text-green-500 font-semibold">
        ₹ {discountedPrice} <span className="text-sm text-gray-500">after off {`(${item.discount})%`}</span>
      </div>
      {item.discount > 0 && (
        <div className="text-sm text-gray-500">
          <span className="line-through">${item.price.toFixed(2)}</span> - You save: ₹{savings}
        </div>
      )}

      {/* Conditionally render the button or CartCount */}
      <div className="mt-4 w-full">
        {cartItem ? (
          <div className="flex justify-center items-center">
            <CartCount item={cartItem} />
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            className="w-full font-semibold border border-green-300 text-green-600 py-2 rounded-md hover:bg-green-50"
          >
            Add
          </button>
        )}
      </div>

    </div>
  );
};

export default MenuItem;
