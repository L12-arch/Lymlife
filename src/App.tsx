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
import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import { RootStackParamList } from './types/naviagtion';

GoogleSignin.configure({
  webClientId: '640081209561-r46f96s673fos1sbj8a7dcmpm520g3hj.apps.googleusercontent.com', // Replace with your Web Client ID
  scopes: ['https://www.googleapis.com/auth/drive'], // Request access to Google Drive
});

const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    const tokens = await GoogleSignin.getTokens();
    console.log('Access Token:', tokens.accessToken);
  } catch (error) {
    console.error(error);
  }
};

const fetchDriveFiles = async (accessToken: string) => {
    try {
      const response = await fetch('https://www.googleapis.com/drive/v3/files', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await response.json();
      console.log('Drive Files:', data);
    } catch (error) {
      console.error(error);
    }
  };

const Stack = createNativeStackNavigator();

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
            name="ForgetPassword"
            component={ForgetPasswordPage} // Placeholder for ForgetPassword screen
            options={{ title: 'Forget Password' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
