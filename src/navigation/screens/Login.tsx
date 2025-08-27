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
import loginStyles from '../../styles/Login/index.styles';
import { login } from '../../api/auth'; // Update to use auth_fixed
import { useAuth } from '../../context/AuthContext'; // Import auth context

/**
 * 
 * @returns 
 */
const LoginPage = () => {
  const [emailPhone, setEmailPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<any>();
  const { login: authLogin } = useAuth(); // Get login function from auth context

  const handleLogin = async () => {
    if (!emailPhone || !password) {
      Alert.alert('Error', 'Please enter both email/phone and password');
      return;
    }

    const res = await login({ email: emailPhone, password });
    if (res.success && res.code === 'loggedIn') {
      Alert.alert('Success', 'Logged in successfully');
      console.log('User data being passed to auth context:', res.data); // Log user data
      await authLogin(res.data);
      navigation.navigate('Dashboard');
    } else {
      Alert.alert('Login Failed', res.message || 'Something went wrong');
    }
  };

  return (
    <View style={loginStyles.wrapper}>
      <Text style={loginStyles.welcomeText}>Welcome to LYMLife</Text>
      <Text style={loginStyles.title}>Login</Text>
      <TextInput
        style={loginStyles.input}
        placeholder="Enter your Email or phone number"
        value={emailPhone}
        onChangeText={setEmailPhone}
      />
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
      <TouchableOpacity style={loginStyles.loginBtn} onPress={handleLogin}>
        <Text style={loginStyles.loginText}>Login</Text>
      </TouchableOpacity>
      <View style={loginStyles.signupRow}>
        <Text style={loginStyles.text}>Don't have an account? </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Signup' as never)}
        >
          <Text style={loginStyles.signup}>Signup</Text>
        </TouchableOpacity>
      </View>
      <View style={loginStyles.orRow}>
        <View style={loginStyles.hr} />
        <Text style={loginStyles.orText}>Or</Text>
        <View style={loginStyles.hr} />
      </View>
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
