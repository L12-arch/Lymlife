import React from 'react';
import { Text } from '@react-navigation/elements';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import profileStyles from '../../styles/Profile/index.styles';

export function Profile() {
  const { userData, loading } = useAuth();

  if (loading) {
    return (
      <View style={profileStyles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={profileStyles.loadingText}>Loading your profile...</Text>
      </View>
    );
  }

  return (
    <View style={profileStyles.container}>
      <Text style={profileStyles.title}>👤 Profile</Text>

      {userData && userData.user ? (
        <View style={profileStyles.profileInfo}>
          <View style={profileStyles.infoRow}>
            <Text style={profileStyles.label}>Name:</Text>
            <Text style={profileStyles.value}>
              {userData.user.firstName} {userData.user.lastName}
            </Text>
          </View>

          <View style={profileStyles.infoRow}>
            <Text style={profileStyles.label}>Email:</Text>
            <Text style={profileStyles.value}>{userData.user.email}</Text>
          </View>

          <View style={profileStyles.infoRow}>
            <Text style={profileStyles.label}>Phone:</Text>
            <Text style={profileStyles.value}>
              {userData.user.phoneNumber || 'Not provided'}
            </Text>
          </View>
        </View>
      ) : (
        <Text style={profileStyles.errorText}>No profile data available</Text>
      )}
    </View>
  );
}
