import api from "../../utils/api";

const fetchOrderDetails = async (orderId) => {
  try {
    const response = await api.get(`/orders/fetch`, {
      params: { orderId },
    });
    return response.data.order; 
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch the order details'); 
  }
};

const saveOrderDetails = async (orderDetails) => {
    try {
      const response = await api.post(`/orders/save`,orderDetails);
      return response.data; 
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch the order details'); 
    }
  };

const orderService = { fetchOrderDetails,saveOrderDetails };
export default orderService;
