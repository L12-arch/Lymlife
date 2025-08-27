import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import forgetPasswordStyles from '../../styles/ForgotPassword/index.styles';
import { forgotPassword } from '../../api/auth';

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigation = useNavigation();

  const handleForgotPassword = async () => {
    if (!email || !newPassword) {
      Alert.alert('Error', 'Please enter both email and new password');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    const res = await forgotPassword(email, newPassword);
    if (res.success) {
      Alert.alert('Success', 'Password has been reset successfully');
      navigation.navigate('Login');
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
      <TextInput
        style={forgetPasswordStyles.input}
        placeholder="Enter new Password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TouchableOpacity
        style={forgetPasswordStyles.resetBtn}
        onPress={handleForgotPassword}
      >
        <Text style={forgetPasswordStyles.resetText}>Reset Password</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={forgetPasswordStyles.backToLogin}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgetPasswordPage;
