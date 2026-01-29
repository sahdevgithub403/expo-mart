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
  login: async (phone, password) => {
    const response = await api.post('/auth/login', { phone, password });
    if (response.data.token) {
      await setItem('token', response.data.token);
      await setItem('user', JSON.stringify(response.data));
      setAuthToken(response.data.token);
    }
    return response.data;
  },

  register: async (name, phone, email, password) => {
    const response = await api.post('/auth/register', { name, phone, email, password });
    if (response.data.token) {
      await setItem('token', response.data.token);
      await setItem('user', JSON.stringify(response.data));
      setAuthToken(response.data.token);
    }
    return response.data;
  },

  firebaseLogin: async (credentials) => {
    const response = await api.post('/auth/firebase-login', credentials);
    if (response.data.token) {
      await setItem('token', response.data.token);
      await setItem('user', JSON.stringify(response.data));
      setAuthToken(response.data.token);
    }
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
  
  getToken: async () => {
      return await getItem('token');
  }
};
