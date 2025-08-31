import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { verifyOtp, resendOtp } from '../../api/auth';
import otpVerificationStyles from '../../styles/OtpVerification/index.styles';
import { RootStackParamList } from '../../types/navigation';

const OtpVerificationPage = ({
  route,
}: {
  route: { params: { email: string } };
}) => {
  const [otp, setOtp] = useState('');
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { email } = route.params;

  const handleVerifyOtp = async () => {
    if (!otp) {
      Alert.alert('Error', 'Please enter the OTP');
      return;
    }

    const res = await verifyOtp(email, otp);
    if (res.success) {
      Alert.alert('Success', 'OTP verified successfully');
      navigation.navigate('NewPassword', { email, otp }); // Navigate to New Password screen with email and OTP
    } else {
      Alert.alert('Verification Failed', res.message || 'Invalid OTP');
    }
  };

  const handleResendOtp = async () => {
    const res = await resendOtp(email);
    if (res.success) {
      Alert.alert('Success', 'OTP has been resent to your email');
    } else {
      Alert.alert('Resend Failed', res.message || 'Failed to resend OTP');
    }
  };

  return (
    <View style={otpVerificationStyles.wrapper}>
      <Text style={otpVerificationStyles.title}>Verify OTP</Text>
      <TextInput
        style={otpVerificationStyles.input}
        placeholder="Enter your OTP"
        value={otp}
        onChangeText={setOtp}
      />
      <TouchableOpacity
        style={otpVerificationStyles.verifyBtn}
        onPress={handleVerifyOtp}
      >
        <Text style={otpVerificationStyles.verifyText}>Verify OTP</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={otpVerificationStyles.resendBtn}
        onPress={handleResendOtp}
      >
        <Text style={otpVerificationStyles.resendText}>Resend OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OtpVerificationPage;