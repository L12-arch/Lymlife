import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HeaderButton, Text } from '@react-navigation/elements';
import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';
import newspaper from '../../assets/newspaper.png';
import { Profile } from './screens/Profile';
import LoginPage from './screens/Login';
import SignupPage from './screens/Signup';
import HomePage from './screens/Home';
import ForgetPasswordPage from './screens/ForgotPassword';
import DashboardPage from './screens/Dashboard';
import NewPlaylistScreen from './screens/NewPlaylist';
import EmailSentPage from './screens/EmailSent';
import NewPasswordPage from './screens/NewPassword';
import OtpVerificationPage from './screens/OtpVerification';
import Playlists from './screens/Playlists';

const HomeTabs = createBottomTabNavigator({
  screens: {
    Home: {
      screen: HomePage,
      options: {
        title: 'Feed',
        tabBarIcon: ({ color, size }) => (
          <Image
            source={newspaper}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
  },
});

const RootStack = createNativeStackNavigator({
  screens: {
     OtpVerification: {
      screen: OtpVerificationPage,
      options: {
        title: 'Verify OTP',
      },
    },
    NewPassword: {
      screen: NewPasswordPage,
      options: {
        title: 'Set New Password',
      },
    },
    EmailSent: {
      screen: EmailSentPage,
      options: {
        title: 'Email Sent',
      },
    },
    HomeTabs: {
      screen: HomeTabs,
      options: {
        title: 'Home',
        headerShown: false,
      },
    },
    Login: {
      screen: LoginPage,
    },
    Signup: {
      screen: SignupPage, // Assuming Signup uses the same component for now
      options: {
        title: 'Signup',
      },
    },
    ForgetPassword: {
      screen: ForgetPasswordPage,
      options: {
        title: 'Forgot Password',
      },
    },
    Profile: {
      screen: Profile,
      linking: {
        path: ':user(@[a-zA-Z0-9-_]+)',
        parse: {
          user: (value) => value.replace(/^@/, ''),
        },
        stringify: {
          user: (value) => `@${value}`,
        },
      },
    },
    Dashboard: {
      screen: DashboardPage,
      options: {
        title: 'Dashboard',
      },
    },
    NewPlaylist: {
      screen: NewPlaylistScreen,
      options: {
        title: 'New Playlist',
        presentation: 'modal',
      },
    },
     Playlists: {
      screen: Playlists,
      options: {
        title: 'Image Playlists',
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
