import api from "../../utils/api";

const fetchMenu = async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/menu/item'); 
    return response.data; 
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || 'Failed to add the item');
  }
};

const menuService = { fetchMenu };
export default menuService;
