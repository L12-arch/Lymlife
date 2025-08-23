// src/api/auth.js
import axios from 'axios';
import CryptoJs from 'crypto-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:3000/api/auth'; 

// ---------- Signup ----------
export const signup = async (userData) => {
  try {
    const ciphertext = CryptoJs.AES.encrypt(userData.password, 'register').toString();
    const [firstName, lastName] = userData.name.split(' ');
    const userDetails = {
      email: userData.email,
      phoneNumber: userData.phoneNumber,
      firstName,
      lastName,
      password: ciphertext,
    };

    const res = await axios.post(`${API_URL}/signup`, userDetails);
    return { success: true, status: res.status, code: res.data.code, data: res.data };
  } catch (err) {
    return { success: false, status: err.response?.status, code: err.response?.data?.code, message: err.response?.data?.message || 'Internal Error' };
  }
};

// ---------- Login ----------
export const login = async (userData) => {
  try {
    const ciphertext = CryptoJs.AES.encrypt(userData.password, 'login').toString();
    const res = await axios.post(`${API_URL}/login`, { email: userData.email, password: ciphertext });

    if (res.data.token) {
      await AsyncStorage.setItem('token', res.data.token);
      await AsyncStorage.setItem('id', userData.email);
    }

    return { success: true, status: res.status, code: res.data.code, data: res.data };
  } catch (err) {
    return { success: false, status: err.response?.status, code: err.response?.data?.code, message: err.response?.data?.message || 'Internal Error' };
  }
};

// ---------- Forgot Password ----------
export const forgotPassword = async (email, newPassword) => {
  try {
    const ciphertext = CryptoJs.AES.encrypt(newPassword, 'forgetPassword').toString();
    const res = await axios.post(`${API_URL}/forgot-password`, { email, newPassword: ciphertext });
    return { success: true, status: res.status, code: res.data.code, data: res.data };
  } catch (err) {
    return { success: false, status: err.response?.status, code: err.response?.data?.code, message: err.response?.data?.message || 'Internal Error' };
  }
};

// ---------- Reset Password ----------
export const resetPassword = async (oldPassword, newPassword) => {
  try {
    const email = await AsyncStorage.getItem('id');
    const oldCiphertext = CryptoJs.AES.encrypt(oldPassword, 'resetPassword').toString();
    const newCiphertext = CryptoJs.AES.encrypt(newPassword, 'resetPassword').toString();

    const res = await axios.post(`${API_URL}/reset-password`, {
      email,
      oldPassword: oldCiphertext,
      newPassword: newCiphertext,
    });

    return { success: true, status: res.status, code: res.data.code, data: res.data };
  } catch (err) {
    return { success: false, status: err.response?.status, code: err.response?.data?.code, message: err.response?.data?.message || 'Internal Error' };
  }
};

// ---------- Get Profile ----------
export const getProfile = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const email = await AsyncStorage.getItem('id');

    const res = await axios.get(`${API_URL}/${email}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return { success: true, status: res.status, code: res.data.code, data: res.data };
  } catch (err) {
    return { success: false, status: err.response?.status, code: err.response?.data?.code, message: err.response?.data?.message || 'Internal Error' };
  }
};

// ---------- Logout ----------
export const logout = async () => {
  try {
    const email = await AsyncStorage.getItem('id');
    const res = await axios.post(`${API_URL}/logout`, { email });

    if (res.data.code === 'logout') {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('id');
    }

    return { success: true, status: res.status, code: res.data.code, data: res.data };
  } catch (err) {
    return { success: false, status: err.response?.status, code: err.response?.data?.code, message: err.response?.data?.message || 'Internal Error' };
  }
};
