import api, { setAuthToken } from './api';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web';

const setItem = async (key, value) => {
  if (isWeb) {
    try {
        localStorage.setItem(key, value);
    } catch (e) {
        console.error('Local storage error', e);
    }
  } else {
    await SecureStore.setItemAsync(key, value);
  }
};

const getItem = async (key) => {
  if (isWeb) {
      if (typeof localStorage !== 'undefined') {
          return localStorage.getItem(key);
      }
      return null;
  } else {
    return await SecureStore.getItemAsync(key);
  }
};

const deleteItem = async (key) => {
  if (isWeb) {
      if (typeof localStorage !== 'undefined') {
          localStorage.removeItem(key);
      }
  } else {
    await SecureStore.deleteItemAsync(key);
  }
};

export const AuthService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      await setItem('token', response.data.token);
      await setItem('user', JSON.stringify(response.data));
      setAuthToken(response.data.token);
    }
    return response.data;
  },

  register: async (name, email, password) => {
    const response = await api.post('/auth/register', { name, email, password });
    if (response.data.token) {
      await setItem('token', response.data.token);
      await setItem('user', JSON.stringify(response.data));
      setAuthToken(response.data.token);
    }
    return response.data;
  },

  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  resetPassword: async (email, newPassword) => {
    const response = await api.post('/auth/reset-password', { email, newPassword });
    return response.data;
  },

  logout: async () => {
    await deleteItem('token');
    await deleteItem('user');
    setAuthToken(null);
  },

  getUser: async () => {
    const user = await getItem('user');
    return user ? JSON.parse(user) : null;
  },

  fetchProfile: async () => {
    try {
      const response = await api.get('/auth/me');
      if (response.data) {
        await setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  },
  
  updateProfile: async (updatedData) => {
    const response = await api.put('/auth/profile', updatedData);
    if (response.data) {
        // Sync local storage with updated data from server
        await setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },

  getToken: async () => {
      return await getItem('token');
  }
};
