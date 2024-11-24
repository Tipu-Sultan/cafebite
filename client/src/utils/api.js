import axios from 'axios';

// Create Axios instance
const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_HOST}/api`, 
  timeout: 10000, 
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Retrieve token from local storage or state management
    const token = localStorage.getItem('token');
    if (token) {
      // Attach token to Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error.message);
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response, // Pass through successful responses
  (error) => {
    if (error.response) {
      // Handle common response errors (e.g., token expiration)
      if (error.response.status === 401) {
        console.warn('Unauthorized. Redirecting to login.');
        window.location.href = '/not-authorized'; // Redirect to login
      } else {
        console.error('Response error:', error.response.data.message || 'Unknown error');
      }
    } else if (error.request) {
      console.error('No response received:', error.message);
    } else {
      console.error('Error setting up request:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
