import * as React from 'react';
import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Assets as NavigationAssets } from '@react-navigation/elements';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider } from './context/AuthContext';
import { RootStackParamList } from './types/navigation';
import { HomePage } from './navigation/screens/Home';
import LoginPage from './navigation/screens/Login';
import SignupPage from './navigation/screens/Signup';
import DashboardPage from './navigation/screens/Dashboard';
import { Profile } from './navigation/screens/Profile';
import ForgetPasswordPage from './navigation/screens/ForgotPassword';
import NewPlaylist from './navigation/screens/NewPlaylist';
import PlaylistViewer from './navigation/screens/PlaylistViewer';
import EmailSentPage from './navigation/screens/EmailSent';
import OtpVerificationPage from './navigation/screens/OtpVerification';
import NewPasswordPage from './navigation/screens/NewPassword';

import { styles } from './styles/App/index.styles';

const Stack = createNativeStackNavigator<RootStackParamList>();

GoogleSignin.configure({
  webClientId:
    '640081209561-r46f96s673fos1sbj8a7dcmpm520g3hj.apps.googleusercontent.com', // Replace with your Web Client ID
  scopes: ['https://www.googleapis.com/auth/drive'], // Request access to Google Drive
});

Asset.loadAsync([
  ...NavigationAssets,
  require('./assets/newspaper.png'),
  require('./assets/bell.png'),
]);

SplashScreen.preventAutoHideAsync();

export function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.gestureContainer}>
        <AuthProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen name="Home" component={HomePage} />
              <Stack.Screen name="Login" component={LoginPage} />
              <Stack.Screen name="Signup" component={SignupPage} />
              <Stack.Screen name="Dashboard" component={DashboardPage} />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="NewPlaylist" component={NewPlaylist} />
              <Stack.Screen name="PlaylistViewer" component={PlaylistViewer} />
              {/* <Stack.Screen name="Connect" component={Connect} /> */}
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
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
