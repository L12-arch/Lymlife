import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HeaderButton, Text } from '@react-navigation/elements';
import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';
import bell from '../assets/bell.png';
import newspaper from '../../assets/newspaper.png';
import { Profile } from './screens/Profile';
import { Settings } from './screens/Settings';
import { Updates } from './screens/Updates';
import { NotFound } from './screens/NotFound';
import LoginPage from './screens/Login';
import SignupPage from './screens/Signup';
import HomePage from './screens/Home';
import ForgetPasswordPage from './screens/ForgotPassword';
import DashboardPage from './screens/Dashboard';
import NewPlaylistScreen from './screens/NewPlaylist';
import ConnectScreen from './screens/Connect';

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
    Updates: {
      screen: Updates,
      options: {
        tabBarIcon: ({ color, size }) => (
          <Image
            source={bell}
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
    Settings: {
      screen: Settings,
      options: ({ navigation }) => ({
        presentation: 'modal',
        headerRight: () => (
          <HeaderButton onPress={navigation.goBack}>
            <Text>Close</Text>
          </HeaderButton>
        ),
      }),
    },
    NotFound: {
      screen: NotFound,
      options: {
        title: '404',
      },
      linking: {
        path: '*',
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
    Connect: {
      screen: ConnectScreen,
      options: {
        title: 'Connect to TV',
      },
      linking: {
        path: 'connect/:playlistId',
        parse: {
          playlistId: (playlistId) => playlistId,
        },
        stringify: {
          playlistId: (playlistId) => playlistId,
        },
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
