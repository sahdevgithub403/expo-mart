import axios from 'axios';
import { Platform } from 'react-native';

const getBaseUrl = () => {
    // Priority: .env > platform-specific fallback
    if (Platform.OS === 'android') {
        return process.env.EXPO_PUBLIC_API_URL_ANDROID || 'http://10.211.242.6:8081/api';
    } else if (Platform.OS === 'ios') {
        return process.env.EXPO_PUBLIC_API_URL_IOS || 'http://10.211.242.6:8081/api';
    } else {
        return process.env.EXPO_PUBLIC_API_URL_WEB || 'http://localhost:8081/api';
    }
};

const api = axios.create({
  baseURL: getBaseUrl(),
  timeout: 10000, // 10 second timeout for mobile networks
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a response interceptor to handle unauthorized access and log errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('Network Timeout: The server took too long to respond.');
    } else if (!error.response) {
      console.error('Network Error: Could not reach the server at ' + getBaseUrl() + '. Check if your phone and PC are on the same Wi-Fi.');
    }
    
    if (error.response && error.response.status === 401) {
      console.log('Session expired, logging out...');
    }
    return Promise.reject(error);
  }
);

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export default api;
