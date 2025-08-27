import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {View,Text,FlatList,TouchableOpacity,ActivityIndicator,Alert,RefreshControl,} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Profile } from './Profile'; // Assuming Profile is a separate component
import { googleDriveService } from '../../api/googleDrive';
import dashboardStyles from '../../styles/Dashboard/index.styles';

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

// Group songs by category, singer, and theme
const groupSongsBy = (songs: Song[], key: keyof Song) => {
  const grouped: Record<string, Song[]> = {};
  songs.forEach((song) => {
    const groupKey = song[key] || 'Unknown';
    if (!grouped[groupKey]) {
      grouped[groupKey] = [];
    }
    grouped[groupKey].push(song);
  });
  return grouped;
};

const PlaylistScreen = () => {
  const [activeTab, setActiveTab] = React.useState<keyof Song>('category');
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const groupedSongs = groupSongsBy(songs, activeTab);
  const groupKeys = Object.keys(groupedSongs);

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    setLoading(true);
    try {
      const audioFiles = await googleDriveService.getAllAudioFiles();
      const convertedSongs = audioFiles.map((file) =>
        googleDriveService.convertToSong(file),
      );
      setSongs(convertedSongs);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch songs from Google Drive');
      console.error('Error fetching songs:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchSongs();
  };

  const renderSongItem = ({ item }: { item: Song }) => {
    return (
      <View style={dashboardStyles.songItem}>
        <Text style={dashboardStyles.songImage}>{item.image}</Text>
        {/* Displaying image as emoji */}
        <View style={dashboardStyles.songInfo}>
          <Text style={dashboardStyles.songTitle}>{item.title}</Text>
          <Text style={dashboardStyles.songDetails}>
            {item.singer} • {item.duration}
          </Text>
        </View>
      </View>
    );
  };

  const renderGroup = (groupKey: string) => (
    <View key={groupKey} style={dashboardStyles.groupContainer}>
      <Text style={dashboardStyles.groupTitle}>{groupKey}</Text>
      <FlatList
        data={groupedSongs[groupKey]}
        renderItem={renderSongItem}
        keyExtractor={(item) => item.id}
        style={dashboardStyles.songList}
      />
    </View>
  );

  if (loading && songs.length === 0) {
    return (
      <View style={dashboardStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={dashboardStyles.loadingText}>
          Loading your music library...
        </Text>
      </View>
    );
  }

  if (songs.length === 0) {
    return (
      <View style={dashboardStyles.emptyContainer}>
        <Icon name="musical-notes-outline" size={64} color="#666" />
        <Text style={dashboardStyles.emptyText}>
          No songs found in your Google Drive
        </Text>
        <Text style={dashboardStyles.emptySubtext}>
          Make sure you have audio files (MP3, M4A, WAV, etc.) in your Google
          Drive
        </Text>
        <TouchableOpacity
          style={dashboardStyles.refreshButton}
          onPress={onRefresh}
        >
          <Icon name="refresh-outline" size={20} color="#007AFF" />
          <Text style={dashboardStyles.refreshButtonText}>Refresh</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={dashboardStyles.container}>
      <View style={dashboardStyles.tabContainer}>
        <TouchableOpacity
          style={[
            dashboardStyles.tab,
            activeTab === 'category' && dashboardStyles.activeTab,
          ]}
          onPress={() => setActiveTab('category')}
        >
          <Icon
            name="albums-outline"
            size={20}
            color={activeTab === 'category' ? '#007AFF' : '#666'}
          />
          <Text
            style={[
              dashboardStyles.tabText,
              { color: activeTab === 'category' ? '#007AFF' : '#666' },
            ]}
          >
            Category
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            dashboardStyles.tab,
            activeTab === 'singer' && dashboardStyles.activeTab,
          ]}
          onPress={() => setActiveTab('singer')}
        >
          <Icon
            name="mic-outline"
            size={20}
            color={activeTab === 'singer' ? '#007AFF' : '#666'}
          />
          <Text
            style={[
              dashboardStyles.tabText,
              { color: activeTab === 'singer' ? '#007AFF' : '#666' },
            ]}
          >
            Singer
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            dashboardStyles.tab,
            activeTab === 'theme' && dashboardStyles.activeTab,
          ]}
          onPress={() => setActiveTab('theme')}
        >
          <Icon
            name="color-palette-outline"
            size={20}
            color={activeTab === 'theme' ? '#007AFF' : '#666'}
          />
          <Text
            style={[
              dashboardStyles.tabText,
              { color: activeTab === 'theme' ? '#007AFF' : '#666' },
            ]}
          >
            Theme
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={groupKeys}
        renderItem={({ item }) => renderGroup(item)}
        keyExtractor={(item) => item}
        style={dashboardStyles.groupList}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#007AFF']}
          />
        }
      />
    </View>
  );
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
      <Tab.Screen name="Playlist" component={PlaylistScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default Dashboard;
