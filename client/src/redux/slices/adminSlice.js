import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import adminService from '../features/adminFeature';

const initialState = {
  user: null,
  confirmedOrders: [],
  insights: [],
  items: [],
  isLoading: null,
  error: null,
  message: null,
  formData: {
    name: "",
    description: "",
    price: "",
    inventoryCount: "",
    quality: "Low",
    discount: "",
    itemImage: "",
    foodType: "",
    category: "",
    foodSizeOrWeight: "",
  },

  filters: {
    startDate: '',
    endDate: '',
    month: '',
    year: '',
  }

};


// Thunk for adding new items
export const login = createAsyncThunk('admin/login', adminService.login);
export const register = createAsyncThunk('admin/register', adminService.register);
export const addNewItem = createAsyncThunk('admin/addNewItem', adminService.addNewItem);
export const fetchItems = createAsyncThunk('admin/fetchItems', adminService.fetchItems);
export const updateItem = createAsyncThunk('admin/updateItem', adminService.updateItem);
export const fetchItemDetails = createAsyncThunk('admin/fetchItemDetails', adminService.fetchItemDetails);
export const fetchPaymentInsights = createAsyncThunk('admin/fetchPaymentInsights', adminService.fetchPaymentInsights);
export const fetchConfirmedOrders = createAsyncThunk('admin/fetchConfirmedOrders', adminService.fetchConfirmedOrders);





const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    // Update form data reducer
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
    setError(state, action) {
      state.error = action.payload
    },

    logout(state){
      localStorage.removeItem('user')
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = 'adminRegister';
        state.error = null; // Clear previous errors
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; 
      })

      .addCase(login.pending, (state) => {
        state.isLoading = 'adminLogin';
        state.error = null; 
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.user = action.payload.user;
      })     
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; 
      })

      .addCase(addNewItem.pending, (state) => {
        state.isLoading = true;
        state.error = null; 
      })
      .addCase(addNewItem.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addNewItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Capture any error messages
      })

      .addCase(fetchItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.data;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(fetchItemDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.formData = action.payload.data;
      })
      .addCase(fetchItemDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(fetchPaymentInsights.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPaymentInsights.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.insights = action.payload;
      })
      .addCase(fetchPaymentInsights.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(fetchConfirmedOrders.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchConfirmedOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.confirmedOrders = action.payload;
      })
      .addCase(fetchConfirmedOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(updateItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedItem = action.payload.data;
        const itemIndex = state.items.findIndex((item) => item._id === updatedItem._id);
        if (itemIndex !== -1) {
          state.items[itemIndex] = updatedItem;
        }
        state.formData = {};
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

    ;
  },
});

// Export actions and reducer
export const { updateFormData, clearFormData, setFilters,setError } = adminSlice.actions;
export default adminSlice.reducer;
