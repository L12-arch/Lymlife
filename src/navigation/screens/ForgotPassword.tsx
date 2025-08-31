import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import forgetPasswordStyles from '../../styles/ForgotPassword/index.styles';
import { requestPasswordReset } from '../../api/auth';

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    const res = await requestPasswordReset(email);
    if (res.success) {
      Alert.alert('Success', 'OTP has been sent to your email address');
      navigation.navigate('OtpVerification', { email }); // Navigate to OTP verification screen with email
    } else {
      Alert.alert(
        'Reset Failed',
        res.message || 'Something went wrong. Please try again.',
      );
    }
  };

  return (
    <View style={forgetPasswordStyles.wrapper}>
      <Text style={forgetPasswordStyles.title}>Forgot Password?</Text>
      <TextInput
        style={forgetPasswordStyles.input}
        placeholder="Enter your Email address"
        value={email}
        onChangeText={setEmail}
      />
      <TouchableOpacity
        style={forgetPasswordStyles.resetBtn}
        onPress={handleForgotPassword}
      >
        <Text style={forgetPasswordStyles.resetText}>Send OTP</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={forgetPasswordStyles.backToLogin}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgetPasswordPage;
