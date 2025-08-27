// src/api/auth_fixed.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://10.0.2.2:8000/api/auth';

// ---------- Signup ----------
export const signup = async (userData) => {
  try {
    const [firstName, lastName] = userData.name.split(' ');
    const userDetails = {
      email: userData.email,
      phoneNumber: userData.phoneNumber,
      firstName,
      lastName,
      password: userData.password,
    };

    const res = await axios.post(`${API_URL}/register`, userDetails);
    return {
      success: true,
      status: res.status,
      code: res.data.code,
      data: res.data,
    };
  } catch (err) {
    console.error('Signup error:', err);
    return {
      success: false,
      status: err.response?.status,
      code: err.response?.data?.code,
      message: err.response?.data?.message || 'Internal Error',
    };
  }
};

// ---------- Login ----------
export const login = async (userData) => {
  try {
    const res = await axios.post(`${API_URL}/login`, {
      email: userData.email,
      password: userData.password,
    });

    if (res.data && res.data.code === 'loggedIn') {
      // Store email in AsyncStorage for profile retrieval
      await AsyncStorage.setItem('id', userData.email);

      // Store user data if available
      if (res.data.user) {
        await AsyncStorage.setItem('userData', JSON.stringify(res.data.user));
      }
    } else {
      console.log('Login not successful or unexpected response format');
    }

    return {
      success: true,
      status: res.status,
      code: res.data.code,
      data: res.data,
    };
  } catch (err) {
    return {
      success: false,
      status: err.response?.status,
      code: err.response?.data?.code,
      message: err.response?.data?.message || 'Internal Error',
    };
  }
};

// ---------- Forgot Password ----------
export const forgotPassword = async (email, newPassword) => {
  try {
    const res = await axios.post(`${API_URL}/forgetpassword`, {
      email,
      newPassword: newPassword,
    });
    return {
      success: true,
      status: res.status,
      code: res.data.code,
      data: res.data,
    };
  } catch (err) {
    return {
      success: false,
      status: err.response?.status,
      code: err.response?.data?.code,
      message: err.response?.data?.message || 'Internal Error',
    };
  }
};

// ---------- Reset Password ----------
export const resetPassword = async (oldPassword, newPassword) => {
  try {
    const email = await AsyncStorage.getItem('id');
    const res = await axios.post(`${API_URL}/resetpassword`, {
      email,
      oldPassword: oldPassword,
      newPassword: newPassword,
    });

    return {
      success: true,
      status: res.status,
      code: res.data.code,
      data: res.data,
    };
  } catch (err) {
    return {
      success: false,
      status: err.response?.status,
      code: err.response?.data?.code,
      message: err.response?.data?.message || 'Internal Error',
    };
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

    return {
      success: true,
      status: res.status,
      code: res.data.code,
      data: res.data,
    };
  } catch (err) {
    return {
      success: false,
      status: err.response?.status,
      code: err.response?.data?.code,
      message: err.response?.data?.message || 'Internal Error',
    };
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

    return {
      success: true,
      status: res.status,
      code: res.data.code,
      data: res.data,
    };
  } catch (err) {
    return {
      success: false,
      status: err.response?.status,
      code: err.response?.data?.code,
      message: err.response?.data?.message || 'Internal Error',
    };
  }
};
