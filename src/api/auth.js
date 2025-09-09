import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://10.0.2.2:8000/api/auth';

export async function signup(userData) {
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
  } catch (error) {
    console.error('Signup error:', error);
    return {
      success: false,
      status: error.response?.status,
      code: error.response?.data?.code || 'error',
      message: error.response?.data?.message || 'Internal Error',
    };
  }
}

export async function login(userData) {
  try {
    const res = await axios.post(`${API_URL}/login`, {
      email: userData.email,
      password: userData.password,
    });

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

    if (res.data.code === 'loggedIn' && res.data.user) {
      await AsyncStorage.setItem('id', userData.email);
      await AsyncStorage.setItem('userData', JSON.stringify(res.data.user));
    }

    return {
      success: res.data.code === 'loggedIn',
      status: res.status,
      code: res.data.code,
      message: res.data.message,
      data: res.data,
    };
  } catch (error) {
    return {
      success: false,
      status: error.response?.status,
      code: error.response?.data?.code || 'error',
      message: error.response?.data?.message || 'Internal Error',
    };
  }
}

export async function requestPasswordReset(email) {
  try {
    const res = await axios.post(`${API_URL}/forgetpassword`, {
      email,
    });

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
  } catch (error) {
    console.error('Request Password Reset error:', error);
    let errorMessage = 'Internal Error';
    if (!error.response) {
      errorMessage = 'Network Error';
    } else if (error.response.status === 500) {
      errorMessage = 'Server Error';
    } else if (error.response.status === 404) {
      errorMessage = 'Endpoint not found';
    } else if (error.response.data?.message) {
      errorMessage = error.response.data.message;
    }
    return {
      success: false,
      status: error.response?.status,
      code: error.response?.data?.code || 'error',
      message: errorMessage,
    };
  }
}

export async function verifyOtp(email, otp) {
  try {
    const res = await axios.post(`${API_URL}/verify-otp`, {
      email,
      otp,
    });

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
  } catch (error) {
    return {
      success: false,
      status: error.response?.status,
      code: error.response?.data?.code || 'error',
      message: error.response?.data?.message || 'Internal Error',
    };
  }
}

export async function setNewPassword(email, otp, newPassword) {
  try {
    const res = await axios.post(`${API_URL}/set-new-password`, {
      email,
      otp,
      newPassword,
    });

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
  } catch (error) {
    return {
      success: false,
      status: error.response?.status,
      code: error.response?.data?.code || 'error',
      message: error.response?.data?.message || 'Internal Error',
    };
  }
}

export async function resendOtp(email) {
  try {
    const res = await axios.post(`${API_URL}/resendOtp`, {
      email,
    });

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
  } catch (error) {
    return {
      success: false,
      status: error.response?.status,
      code: error.response?.data?.code || 'error',
      message: error.response?.data?.message || 'Internal Error',
    };
  }
}

export async function getProfile() {
  try {
    const email = await AsyncStorage.getItem('id');
    const res = await axios.get(`${API_URL}/${email}`);

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
  } catch (error) {
    return {
      success: false,
      status: error.response?.status,
      code: error.response?.data?.code || 'error',
      message: error.response?.data?.message || 'Internal Error',
    };
  }
}

export async function logout() {
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
  } catch (error) {
    return {
      success: false,
      status: error.response?.status,
      code: error.response?.data?.code || 'error',
      message: error.response?.data?.message || 'Internal Error',
    };
  }
}

export async function updateUser(userDetails) {
  try {
    const email = await AsyncStorage.getItem('id');
    const res = await axios.post(`${API_URL}/update`, {
      email,
      userDetails,
    });

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
  } catch (error) {
    return {
      success: false,
      status: error.response?.status,
      code: error.response?.data?.code || 'error',
      message: error.response?.data?.message || 'Internal Error',
    };
  }
}
