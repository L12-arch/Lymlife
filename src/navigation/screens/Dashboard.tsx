import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import { Profile } from './Profile'; // Profile screen component
import Playlists from './Playlists'; // Playlists screen component

// Simple wrapper for Profile to keep navigation clean
const ProfileScreen = () => <Profile />;

const Tab = createBottomTabNavigator();

/**
 * Dashboard Component
 *
 * Provides a bottom tab navigation between Playlists and Profile screens.
 * Uses Ionicons for tab bar icons.
 */
const Dashboard = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // Hide header for all screens
        headerShown: false,
        // Dynamically set tab icons based on route name
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Playlists') {
            iconName = 'musical-notes-outline'; // Music note icon for playlists
          } else if (route.name === 'Profile') {
            iconName = 'person-outline'; // User icon for profile
          }

          return (
            <Icon
              name={iconName || 'musical-notes-outline'}
              size={size}
              color={color}
            />
          );
        },
        // Colors for active/inactive tabs
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      {/* Screens inside tab navigator */}
      <Tab.Screen name="Playlists" component={Playlists} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default Dashboard;
