import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { requestPasswordReset } from '../../api/auth';

//props
import { RootStackParamList } from '../../types/navigation';
//css
import forgetPasswordStyles from '../../styles/ForgotPassword/index.styles';

/**
 * ForgetPasswordPage Component
 * @returns A screen for users to request a password reset
 */
const ForgetPasswordPage = () => {
  // Local state to store email input
  const [email, setEmail] = useState('');

  // Typed navigation hook for navigating between screens
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  /**
   * Handles password reset request.
   * - Validates email input
   * - Calls API to request OTP
   * - Navigates to OTP verification screen on success
   */
  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    const res = await requestPasswordReset(email);

    if (res.success) {
      Alert.alert('Success', 'OTP has been sent to your email address');
      navigation.navigate('OtpVerification', { email }); // Pass email to OTP screen
    } else {
      Alert.alert(
        'Reset Failed',
        res.message || 'Something went wrong. Please try again.',
      );
    }
  };

  return (
    <View style={forgetPasswordStyles.wrapper}>
      {/* Title */}
      <Text style={forgetPasswordStyles.title}>Forgot Password?</Text>

      {/* Email input field */}
      <TextInput
        style={forgetPasswordStyles.input}
        placeholder="Enter your Email address"
        value={email}
        onChangeText={setEmail}
      />

      {/* Send OTP button */}
      <TouchableOpacity
        style={forgetPasswordStyles.resetBtn}
        onPress={handleForgotPassword}
      >
        <Text style={forgetPasswordStyles.resetText}>Send OTP</Text>
      </TouchableOpacity>

      {/* Back to Login navigation link */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={forgetPasswordStyles.backToLogin}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgetPasswordPage;
