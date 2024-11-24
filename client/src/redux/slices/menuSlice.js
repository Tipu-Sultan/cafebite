import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import menuService from '../features/menuFeatures';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

export const fetchMenu = createAsyncThunk('menu/fetchMenu',menuService.fetchMenu);

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenu.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      ;
  },
});

export default menuSlice.reducer;
