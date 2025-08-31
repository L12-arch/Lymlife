import { Assets as NavigationAssets } from '@react-navigation/elements';
import { Asset } from 'expo-asset';
import { createURL } from 'expo-linking';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomePage } from './navigation/screens/Home';
import LoginPage from './navigation/screens/Login';
import SignupPage from './navigation/screens/Signup';
import DashboardPage from './navigation/screens/Dashboard';
import { Profile } from './navigation/screens/Profile';
import ForgetPasswordPage from './navigation/screens/ForgotPassword';
import { AuthProvider } from './context/AuthContext';
import NewPlaylist from './navigation/screens/NewPlaylist';
import EmailSentPage from './navigation/screens/EmailSent';
import OtpVerificationPage from './navigation/screens/OtpVerification';
import NewPasswordPage from './navigation/screens/NewPassword';
import { RootStackParamList } from './types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

Asset.loadAsync([
  ...NavigationAssets,
  require('./assets/newspaper.png'),
  require('./assets/bell.png'),
]);

SplashScreen.preventAutoHideAsync();

export function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Signup" component={SignupPage} />
          <Stack.Screen name="Dashboard" component={DashboardPage} />
          <Stack.Screen name="Profile" component={Profile} />
           <Stack.Screen name="NewPlaylist" component={NewPlaylist} />
            <Stack.Screen
            name="EmailSent"
            component={EmailSentPage}
            options={{ title: 'Email Sent' }}
          />
          <Stack.Screen
            name="ForgetPassword"
            component={ForgetPasswordPage} // Placeholder for ForgetPassword screen
            options={{ title: 'Forget Password' }}
          />
          <Stack.Screen
            name="OtpVerification"
            component={OtpVerificationPage}
            options={{ title: 'Verify OTP' }}
          />
          <Stack.Screen
            name="NewPassword"
            component={NewPasswordPage}
            options={{ title: 'Set New Password' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
