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
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithCredential,
} from '@react-native-firebase/auth';

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

  GoogleSignin.configure({
    webClientId:
      '508092075320-u1383gtebg3fuj4bgtea40snu7vhoc81.apps.googleusercontent.com',
  });
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

  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const signInResult: any = await GoogleSignin.signIn();

    // Try the new style of google-sign in result, from v13+ of that module
    let idToken = signInResult.data?.idToken;

    if (!idToken) {
      // if you are using older versions of google-signin, try old style result
      idToken = signInResult.idToken;
    }
    if (!idToken) {
      throw new Error('No ID token found');
    }

    // Create a Google credential with the token
    const googleCredential = GoogleAuthProvider.credential(
      signInResult.data.idToken,
    );

    Alert.alert('Success', 'Logged in with Google successfully');
    navigation.navigate('Dashboard');

    // Sign-in the user with the credential
    return signInWithCredential(getAuth(), googleCredential);
  }

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
        <Text
          style={loginStyles.socialText}
          onPress={() =>
            onGoogleButtonPress().then(() =>
              console.log('Signed in with Google!'),
            )
          }
        >
          LogIn with Google
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginPage;
