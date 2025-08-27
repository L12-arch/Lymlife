import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { Profile } from './Profile'; // Assuming Profile is a separate component
import Playlists from './Playlists';

// Define song type
type Song = {
  id: string;
  title: string;
  singer: string;
  category: string;
  theme: string;
  duration: string;
  image: string;
  fileId?: string;
  webContentLink?: string;
};


const ProfileScreen = () => <Profile />;

const Tab = createBottomTabNavigator();

const Dashboard = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Playlist') {
            iconName = 'musical-notes-outline';
          } else if (route.name === 'Profile') {
            iconName = 'person-outline';
          }

          return (
            <Icon
              name={iconName || 'musical-notes-outline'}
              size={size}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Playlists" component={Playlists} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default Dashboard;
