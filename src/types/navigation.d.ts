import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    Signup: undefined;
    ForgetPassword: undefined;
    Dashboard: NavigatorScreenParams<DashboardTabParamList>;
    Profile: undefined;
    NotFound: undefined;
};

// For the bottom tab inside Dashboard
export type DashboardTabParamList = {
    Playlist: undefined;
    Profile: undefined;
};
