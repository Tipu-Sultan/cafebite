import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import menuReducer from "./slices/menuSlice";
import orderReducer from "./slices/orderSlice";
import cartReducer from "./slices/cartSlice";
import adminReducer from "./slices/adminSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    menu: menuReducer,
    orders: orderReducer,
    cart: cartReducer,
    admin:adminReducer
  },
});

export default store;
