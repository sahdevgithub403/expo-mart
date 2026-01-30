import axios from 'axios';
import { Platform } from 'react-native';

const getBaseUrl = () => {
    if (Platform.OS === 'android') {
        return process.env.EXPO_PUBLIC_API_URL_ANDROID || 'http://10.0.2.2:8081/api';
    } else if (Platform.OS === 'ios') {
        return process.env.EXPO_PUBLIC_API_URL_IOS || 'http://localhost:8081/api';
    } else {
        return process.env.EXPO_PUBLIC_API_URL_WEB || 'http://localhost:8081/api';
    }
};

const api = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a response interceptor to handle unauthorized access
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.log('Session expired, logging out...');
      // You can add a callback or use a custom hook to redirect here
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
