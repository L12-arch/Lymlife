// src/api/auth.js
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

    // Handle different response codes from backend
    if (res.data.code === 'existUser') {
      return {
        success: false,
        status: res.status,
        code: res.data.code,
        message: res.data.message || 'User already exists',
        data: res.data,
      };
    }

    return {
      success: true,
      status: res.status,
      code: res.data.code,
      message: res.data.message,
      data: res.data,
    };
  } catch (err) {
    console.error('Signup error:', err);
    return {
      success: false,
      status: err.response?.status,
      code: err.response?.data?.code || 'error',
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

    // Handle different response codes from backend
    if (res.data.code === 'userNotFound') {
      return {
        success: false,
        status: res.status,
        code: res.data.code,
        message: res.data.message || 'User not found',
        data: res.data,
      };
    }

    if (res.data.code === 'incorrectPassword') {
      return {
        success: false,
        status: res.status,
        code: res.data.code,
        message: res.data.message || 'Incorrect password',
        data: res.data,
      };
    }

    // Store user data in AsyncStorage for successful login
    if (res.data.code === 'loggedIn' && res.data.user) {
      console.log('Storing user data in AsyncStorage...');
      await AsyncStorage.setItem('id', userData.email);
      await AsyncStorage.setItem('userData', JSON.stringify(res.data.user));

      // Verify storage
      const storedEmail = await AsyncStorage.getItem('id');
      const storedUserData = await AsyncStorage.getItem('userData');
      console.log('Stored Email after login:', storedEmail);
      console.log('Stored User Data after login:', storedUserData);
    }

    return {
      success: res.data.code === 'loggedIn',
      status: res.status,
      code: res.data.code,
      message: res.data.message,
      data: res.data,
    };
  } catch (err) {
    return {
      success: false,
      status: err.response?.status,
      code: err.response?.data?.code || 'error',
      message: err.response?.data?.message || 'Internal Error',
    };
  }
};

// ---------- Request Password Reset Email ----------
export const requestPasswordReset = async (email) => {
  try {
    const res = await axios.post(`${API_URL}/forgetpassword`, {
      email,
    });

    // Handle different response codes from backend
    if (res.data.code === 'userNotFound') {
      return {
        success: false,
        status: res.status,
        code: res.data.code,
        message: res.data.message || 'User not found',
        data: res.data,
      };
    }

    if (res.data.code === 'emailError') {
      return {
        success: false,
        status: res.status,
        code: res.data.code,
        message: res.data.message || 'Failed to send email',
        data: res.data,
      };
    }

    return {
      success: true,
      status: res.status,
      code: res.data.code,
      message: res.data.message,
      data: res.data,
    };
  } catch (err) {
    console.error('Request Password Reset error:', err);
    let errorMessage = 'Internal Error';
    if (!err.response) {
      errorMessage = 'Network Error: Please check your connection';
    } else if (err.response.status === 500) {
      errorMessage = 'Server Error: Please try again later';
    } else if (err.response.status === 404) {
      errorMessage = 'Endpoint not found';
    } else if (err.response.data?.message) {
      errorMessage = err.response.data.message;
    }
    return {
      success: false,
      status: err.response?.status,
      code: err.response?.data?.code || 'error',
      message: errorMessage,
    };
  }
};

// ---------- Verify OTP ----------
export const verifyOtp = async (email, otp) => {
  try {
    const res = await axios.post(`${API_URL}/verify-otp`, {
      email,
      otp,
    });

    // Handle different response codes from backend
    if (res.data.code === 'invalidOtp') {
      return {
        success: false,
        status: res.status,
        code: res.data.code,
        message: res.data.message || 'Invalid or expired OTP',
        data: res.data,
      };
    }

    if (res.data.code === 'missingFields') {
      return {
        success: false,
        status: res.status,
        code: res.data.code,
        message: res.data.message || 'Email and OTP are required',
        data: res.data,
      };
    }

    return {
      success: true,
      status: res.status,
      code: res.data.code,
      message: res.data.message,
      data: res.data,
    };
  } catch (err) {
    return {
      success: false,
      status: err.response?.status,
      code: err.response?.data?.code || 'error',
      message: err.response?.data?.message || 'Internal Error',
    };
  }
};

// ---------- Set New Password with OTP ----------
export const setNewPassword = async (email, otp, newPassword) => {
  try {
    const res = await axios.post(`${API_URL}/set-new-password`, {
      email,
      otp,
      newPassword,
    });

    // Handle different response codes from backend
    if (res.data.code === 'invalidOtp') {
      return {
        success: false,
        status: res.status,
        code: res.data.code,
        message: res.data.message || 'Invalid or expired OTP',
        data: res.data,
      };
    }

    if (res.data.code === 'missingFields') {
      return {
        success: false,
        status: res.status,
        code: res.data.code,
        message: res.data.message || 'Email, OTP and new password are required',
        data: res.data,
      };
    }

    return {
      success: true,
      status: res.status,
      code: res.data.code,
      message: res.data.message,
      data: res.data,
    };
  } catch (err) {
    return {
      success: false,
      status: err.response?.status,
      code: err.response?.data?.code || 'error',
      message: err.response?.data?.message || 'Internal Error',
    };
  }
};

// ---------- Resend OTP ----------
export const resendOtp = async (email) => {
  try {
    const res = await axios.post(`${API_URL}/resendOtp`, {
      email,
    });

    // Handle different response codes from backend
    if (res.data.code === 'userNotFound') {
      return {
        success: false,
        status: res.status,
        code: res.data.code,
        message: res.data.message || 'User not found',
        data: res.data,
      };
    }

    if (res.data.code === 'emailError') {
      return {
        success: false,
        status: res.status,
        code: res.data.code,
        message: res.data.message || 'Failed to send email',
        data: res.data,
      };
    }

    return {
      success: true,
      status: res.status,
      code: res.data.code,
      message: res.data.message,
      data: res.data,
    };
  } catch (err) {
    return {
      success: false,
      status: err.response?.status,
      code: err.response?.data?.code || 'error',
      message: err.response?.data?.message || 'Internal Error',
    };
  }
};

// ---------- Get Profile ----------
export const getProfile = async () => {
  try {
    const email = await AsyncStorage.getItem('id');

    console.log('Profile Request - Email:', email);
    console.log('Profile Request - URL:', `${API_URL}/${email}`);

    const res = await axios.get(`${API_URL}/${email}`);

    console.log('Profile Response:', res.data);

    // Handle different response codes from backend
    if (res.data.code === 'userNotFound') {
      return {
        success: false,
        status: res.status,
        code: res.data.code,
        message: res.data.message || 'User not found',
        data: res.data,
      };
    }

    return {
      success: true,
      status: res.status,
      code: res.data.code,
      message: res.data.message,
      data: res.data,
    };
  } catch (err) {
    return {
      success: false,
      status: err.response?.status,
      code: err.response?.data?.code || 'error',
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
      await AsyncStorage.removeItem('id');
      await AsyncStorage.removeItem('userData');
    }

    return {
      success: res.data.code === 'logout',
      status: res.status,
      code: res.data.code,
      message: res.data.message,
      data: res.data,
    };
  } catch (err) {
    return {
      success: false,
      status: err.response?.status,
      code: err.response?.data?.code || 'error',
      message: err.response?.data?.message || 'Internal Error',
    };
  }
};

// ---------- Update User ----------
export const updateUser = async (userDetails) => {
  try {
    const email = await AsyncStorage.getItem('id');
    const res = await axios.post(`${API_URL}/update`, {
      email,
      userDetails,
    });

    // Handle different response codes from backend
    if (res.data.code === 'userNotFound') {
      return {
        success: false,
        status: res.status,
        code: res.data.code,
        message: res.data.message || 'User not found',
        data: res.data,
      };
    }

    return {
      success: true,
      status: res.status,
      code: res.data.code,
      message: res.data.message,
      data: res.data,
    };
  } catch (err) {
    return {
      success: false,
      status: err.response?.status,
      code: err.response?.data?.code || 'error',
      message: err.response?.data?.message || 'Internal Error',
    };
  }
};
