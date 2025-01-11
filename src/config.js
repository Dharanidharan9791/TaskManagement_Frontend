import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'https://taskmangement-with-authentication.onrender.com', // Replace with your API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in API requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    if (token && config.url !== '/login') { // Exclude login API
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
