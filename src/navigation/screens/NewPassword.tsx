import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { setNewPassword } from '../../api/auth';
import newPasswordStyles from '../../styles/NewPassword/index.styles';

const NewPasswordPage = ({ route }: any) => {
  const [newPassword, setNewPasswordInput] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();
  const { email, otp } = route.params || {};

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
      <Text style={newPasswordStyles.title}>Set New Password</Text>
      <TextInput
        style={newPasswordStyles.input}
        placeholder="Enter new Password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPasswordInput}
      />
      <TextInput
        style={newPasswordStyles.input}
        placeholder="Confirm new Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity
        style={newPasswordStyles.resetBtn}
        onPress={handleSetNewPassword}
      >
        <Text style={newPasswordStyles.resetText}>Reset Password</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={newPasswordStyles.backToLogin}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewPasswordPage;
