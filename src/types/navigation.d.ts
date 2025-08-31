import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    Signup: undefined;
    ForgetPassword: undefined;
    OtpVerification: { email: string };
    NewPassword: { email: string; otp: string };
    EmailSent: undefined;
    Dashboard: NavigatorScreenParams<DashboardTabParamList>;
    Profile: undefined;
    NotFound: undefined;
    Playlists: undefined;
    NewPlaylist: undefined;
    Connect: { playlistId?: string };
};

// For the bottom tab inside Dashboard
export type DashboardTabParamList = {
    Playlist: undefined;
    Profile: undefined;
};
