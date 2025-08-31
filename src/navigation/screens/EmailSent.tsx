import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import emailSentStyles from '../../styles/EmailSent/index.styles';

interface EmailSentPageProps {
  navigation: NavigationProp<any>;
}

const EmailSentPage = ({ navigation }: EmailSentPageProps) => {
  return (
    <View style={emailSentStyles.wrapper}>
      <Text style={emailSentStyles.title}>Email Sent!</Text>
      <Text style={emailSentStyles.message}>
        A verification email has been sent to your email address. Please check
        your inbox.
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={emailSentStyles.backToLogin}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmailSentPage;
