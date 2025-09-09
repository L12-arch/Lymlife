import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import emailSentStyles from '../../styles/EmailSent/index.styles';

// Props for EmailSentPage component
interface EmailSentPageProps {
  navigation: NavigationProp<any>;
}

/**
 * EmailSentPage Component
 * - Informs the user that a verification email has been sent
 * @param param navigation Navigation prop to navigate between screens
 * @returns A screen informing the user that a verification email has been sent
 */
const EmailSentPage = ({ navigation }: EmailSentPageProps) => {
  return (
    <View style={emailSentStyles.wrapper}>
      {/* Title */}
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
