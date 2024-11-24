import { createSlice } from '@reduxjs/toolkit';
import addSound from '../../assests/add-sound.wav'; 
import removeSound from '../../assests/remove-sound.wav'; 



// Function to load cart state from localStorage
const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem('cart');
    return serializedCart ? JSON.parse(serializedCart) : null;
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
    return null;
  }
};

// Function to save cart state to localStorage
const saveCartToLocalStorage = (state) => {
  try {
    const serializedCart = JSON.stringify(state);
    localStorage.setItem('cart', serializedCart);
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

// Initial state with localStorage loading
const initialState = loadCartFromLocalStorage() || {
  items: [],
  cartCount: 0,
  discount: 0,
  discountAmount: 0,
  initialTotal: 0,
  total: 0,
  subtotal: 0,
  gst: 0,
  paymentDetails: {
    paymentStatus: '',
    paymentMethod: '',
    paymentId: '',
    orderId: '',
    Currency: '',
    receipt: '',
  },
  userDetails: {
    name: '',
    email: '',
    phone: '',
  },
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find((i) => i._id === action.payload._id);

      // Play coin sound
      const audio = new Audio(addSound);
      audio.play().catch((err) => {
        console.error("Error playing sound:", err); // Handle any errors (e.g., user hasn't interacted with the page)
      });

      if (!existingItem) {
        state.items.push(action.payload);
        state.cartCount += action.payload.quantity;
      } else {
        existingItem.quantity += action.payload.quantity;
        state.cartCount += action.payload.quantity; // Increment cartCount for additional quantity
      }

      calculateTotal(state);
      saveCartToLocalStorage(state); // Save updated state
    },


    removeItem: (state, action) => {
      const itemToRemove = state.items.find((i) => i._id === action.payload);
      const audio = new Audio(removeSound);
      audio.play().catch((err) => {
        console.error("Error playing sound:", err); // Handle any errors (e.g., user hasn't interacted with the page)
      });
      if (itemToRemove) {
        state.cartCount -= itemToRemove.quantity;
        if (state.cartCount < 0) state.cartCount = 0;
      }
      state.items = state.items.filter((i) => i._id !== action.payload);
      calculateTotal(state);
      saveCartToLocalStorage(state);
    },


    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i._id === id);
      
      const audio = new Audio(removeSound);
      audio.play().catch((err) => {
        console.error("Error playing sound:", err); // Handle any errors (e.g., user hasn't interacted with the page)
      });
      
      if (item) {
        const quantityDifference = quantity - item.quantity; // Calculate the difference
        state.cartCount += quantityDifference; // Adjust cartCount
        item.quantity = quantity;

        // If the quantity becomes 0 or less, remove the item
        if (item.quantity <= 0) {
          state.cartCount -= item.quantity; // Remove the remaining count
          state.items = state.items.filter((i) => i._id !== id);
        }
      }

      if (state.cartCount < 0) state.cartCount = 0; // Ensure cartCount doesn't go negative

      calculateTotal(state);
      saveCartToLocalStorage(state); // Save updated state
    },


    applyDiscount: (state, action) => {
      state.discount = action.payload;
      calculateTotal(state);
      saveCartToLocalStorage(state); // Save updated state
    },

    setPaymentDetails(state, action) {
      state.paymentDetails = { ...state.paymentDetails, ...action.payload };
      saveCartToLocalStorage(state); // Save updated state
    },

    setUserDetails(state, action) {
      state.userDetails = { ...state.userDetails, ...action.payload };
      saveCartToLocalStorage(state); // Save updated state
    },

    clearPaymentDetails(state) {
      state.paymentDetails = null;
      saveCartToLocalStorage(state); // Save updated state
    },

    clearCart: (state) => {
      Object.assign(state, {
        items: [],
        cartCount: 0,
        discount: 0,
        initialTotal: 0,
        total: 0,
        subtotal: 0,
        gst: 0,
        paymentDetails: {
          paymentStatus: '',
          paymentMethod: '',
          paymentId: '',
          orderId: '',
          Currency: '',
          reciept: '',
        },
        userDetails: {
          name: '',
          email: '',
          mobile: '',
        },
      });
      localStorage.removeItem('cart'); // Clear cart from localStorage
    },
  },
});

// Function to recalculate totals including taxes, GST, and discounts
const calculateTotal = (state) => {
  const gstRate = 0.18; // GST rate: 18%

  let newSubtotal = state.items.reduce(
    (subtotal, item) =>
      subtotal +
      (item.price - (item.price * (item.discount || 0)) / 100) *
      item.quantity,
    0
  );

  state.initialTotal = parseFloat((newSubtotal).toFixed(2));
  const gst = parseFloat((newSubtotal * gstRate).toFixed(2));
  state.discountAmount = parseFloat(newSubtotal * (state.discount || 0)) / 100
  newSubtotal = parseFloat((newSubtotal - (newSubtotal * (state.discount || 0)) / 100).toFixed(2));

  state.gst = gst;
  state.subtotal = newSubtotal;
  state.total = parseFloat((newSubtotal + gst).toFixed(2));
};

export const { addItem, removeItem, updateQuantity, applyDiscount, clearCart, setPaymentDetails, setUserDetails } =
  cartSlice.actions;
export default cartSlice.reducer;
