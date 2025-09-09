import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { setNewPassword } from '../../api/auth';

//css
import newPasswordStyles from '../../styles/NewPassword/index.styles';

/**
 * NewPasswordPage Component
 * @param param route Route prop to get parameters passed to this screen
 * @returns A screen for users to set a new password after OTP verification
 */
const NewPasswordPage = ({ route }: any) => {
  const [newPassword, setNewPasswordInput] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();
  const { email, otp } = route.params || {};

  /**
   * Handle setting a new password
   * - Call API to update password
   * - Navigate to Login screen on success
   */
  const handleSetNewPassword = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    const res = await setNewPassword(email, otp, newPassword);
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
    <View style={newPasswordStyles.wrapper}>
      {/* Title */}
      <Text style={newPasswordStyles.title}>Set New Password</Text>
      {/* New password input */}
      <TextInput
        style={newPasswordStyles.input}
        placeholder="Enter new Password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPasswordInput}
      />
      {/* Confirm password input */}
      <TextInput
        style={newPasswordStyles.input}
        placeholder="Confirm new Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      {/* Reset button */}
      <TouchableOpacity
        style={newPasswordStyles.resetBtn}
        onPress={handleSetNewPassword}
      >
        <Text style={newPasswordStyles.resetText}>Reset Password</Text>
      </TouchableOpacity>
      {/* Back to Login */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={newPasswordStyles.backToLogin}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewPasswordPage;
