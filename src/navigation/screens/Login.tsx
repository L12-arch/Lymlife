import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { login } from '../../api/auth'; // API call for login
import { useAuth } from '../../context/AuthContext'; // Auth context

// Styles
import loginStyles from '../../styles/Login/index.styles';

/**
 * LoginPage Component
 *
 * Provides a login form where users can authenticate
 * using email/phone and password. Integrates with the
 * global AuthContext for authentication state.
 */
const LoginPage = () => {
  const [emailPhone, setEmailPhone] = useState(''); // State for email/phone input
  const [password, setPassword] = useState(''); // State for password input
  const navigation = useNavigation<any>(); // Navigation instance
  const { login: authLogin } = useAuth(); // Login method from auth context

  /**
   * Handles login logic:
   * - Validates inputs
   * - Calls login API
   * - Updates AuthContext on success
   * - Navigates to Dashboard
   */
  const handleLogin = async () => {
    if (!emailPhone || !password) {
      Alert.alert('Error', 'Please enter both email/phone and password');
      return;
    }

    const res = await login({ email: emailPhone, password });

    if (res.success && res.code === 'loggedIn') {
      Alert.alert('Success', 'Logged in successfully');
      console.log('User data being passed to auth context:', res.data); // Debug log
      await authLogin(res.data);
      navigation.navigate('Dashboard');
    } else {
      Alert.alert('Login Failed', res.message || 'Something went wrong');
    }
  };

  return (
    <View style={loginStyles.wrapper}>
      {/* Header */}
      <Text style={loginStyles.welcomeText}>Welcome to LYMLife</Text>
      <Text style={loginStyles.title}>Login</Text>

      {/* Email / Phone input */}
      <TextInput
        style={loginStyles.input}
        placeholder="Enter your Email or phone number"
        value={emailPhone}
        onChangeText={setEmailPhone}
      />

      {/* Password input */}
      <TextInput
        style={loginStyles.input}
        placeholder="Enter your Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate('ForgetPassword' as never)}
      >
        <Text style={loginStyles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Login button */}
      <TouchableOpacity style={loginStyles.loginBtn} onPress={handleLogin}>
        <Text style={loginStyles.loginText}>Login</Text>
      </TouchableOpacity>

      {/* Signup row */}
      <View style={loginStyles.signupRow}>
        <Text style={loginStyles.text}>Don't have an account? </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Signup' as never)}
        >
          <Text style={loginStyles.signup}>Signup</Text>
        </TouchableOpacity>
      </View>

      {/* Divider with "Or" */}
      <View style={loginStyles.orRow}>
        <View style={loginStyles.hr} />
        <Text style={loginStyles.orText}>Or</Text>
        <View style={loginStyles.hr} />
      </View>

      {/* Google login button */}
      <TouchableOpacity style={loginStyles.googleLoginBtn}>
        <Image
          source={require('../../assets/google.png')}
          style={loginStyles.google}
        />
        <Text style={loginStyles.socialText}>LogIn with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginPage;
