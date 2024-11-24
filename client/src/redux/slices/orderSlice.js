import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import orderService from "../features/orderService";

const initialState = {
  currentOrder: null,
  orders: [],
  orderDetails:{},
  loading:null,
  error:null,
};

export const fetchOrderDetails = createAsyncThunk('order/fetchOrderDetails', orderService.fetchOrderDetails);
export const saveOrderDetails = createAsyncThunk('order/saveOrderDetails', orderService.saveOrderDetails);


const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder(state, action) {
      state.orders.push(action.payload);
      state.currentOrder = action.payload;
    },
    clearCurrentOrder(state) {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderDetails.pending, (state) => {
        state.loading = 'fetchOrder';
        state.error = null; // Clear previous errors
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload; 
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })

      .addCase(saveOrderDetails.pending, (state) => {
        state.loading = 'saveOrder';
        state.error = null; // Clear previous errors
      })
      .addCase(saveOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload.order; 
      })
      .addCase(saveOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      ;
  },
});


export const { addOrder, clearCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;
