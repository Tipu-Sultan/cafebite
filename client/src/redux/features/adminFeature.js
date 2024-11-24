import api from "../../utils/api";

const register = async (formData, { rejectWithValue }) => {
  try {
    const response = await api.post('/admin/register', formData); // Replace '/items' with your actual endpoint
    return response.data; // Return the added item's data
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || 'Failed to add the item');
  }
};

const login = async (credentials, { rejectWithValue }) => {
  try {
    const response = await api.post("/admin/login", credentials, {
      headers: { "Content-Type": "application/json" },
    });
    const data = response.data;
    localStorage.setItem("token", data?.token);
    localStorage.setItem("user", JSON.stringify(data?.user));
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || "Invalid credentials. Please try again.");
  }
};


const addNewItem = async (itemData, { rejectWithValue }) => {
  try {
    const response = await api.post('/admin/item', itemData); // Replace '/items' with your actual endpoint
    return response.data; // Return the added item's data
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || 'Failed to add the item');
  }
};

const updateItem = async ({ id, formData }, { rejectWithValue }) => {
  try {
    const response = await api.put(`/admin/item/${id}`, formData); // Replace '/items' with your actual endpoint
    return response.data; // Return the added item's data
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || 'Failed to add the item');
  }
};

const fetchItemDetails = async (itemId, { rejectWithValue }) => {
  try {
    const response = await api.get(`/admin/item/${itemId}`); // Replace '/items' with your actual endpoint
    return response.data; // Return the added item's data
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || 'Failed to add the item');
  }
};

const fetchItems = async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/admin/item');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || 'Failed to add the item');
  }
};

const fetchConfirmedOrders = async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/admin/orders/confirmed');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || 'Failed to add the item');
  }
};

const fetchPaymentInsights = async (filters, { rejectWithValue }) => {
  const { startDate, endDate, month, year } = filters;
  const queryParams = new URLSearchParams();

  if (startDate && endDate) {
    queryParams.append('startDate', startDate);
    queryParams.append('endDate', endDate);
  } else if (month && year) {
    queryParams.append('month', month);
    queryParams.append('year', year);
  }
  try {
    const response = await api.get(`/payments/insights?${queryParams.toString()}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || 'Failed to add the item');
  }
};
const adminService = {register,login, addNewItem, fetchItems, updateItem, fetchItemDetails, fetchPaymentInsights ,fetchConfirmedOrders};
export default adminService;
