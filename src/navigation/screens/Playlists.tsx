import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PrimaryButton from '../../components/PrimaryButton';
import StatCard from '../../components/StatCard';
import Card from '../../components/Card';
import { colors } from '../../theme';
import { Playlist } from '../../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import playlistsStyles from '../../styles/Playlists/index.styles';

type Props = NativeStackScreenProps<any, 'Playlists'>;

const Playlists = ({ navigation }: Props) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const totalImages = playlists.reduce((a, p) => a + p.images.length, 0);
  const totalSongs = playlists.reduce((a, p) => a + (p.songs?.length || 0), 0);

  const loadPlaylists = async () => {
    try {
      const storedPlaylists = await AsyncStorage.getItem('playlists');
      if (storedPlaylists) {
        let parsedPlaylists = JSON.parse(storedPlaylists);

        parsedPlaylists = parsedPlaylists.map((playlist: Playlist) => {
          let songs = playlist.songs || [];
          // If songs is an array containing arrays, flatten it
          if (
            Array.isArray(songs) &&
            songs.length > 0 &&
            Array.isArray(songs[0])
          ) {
            songs = songs.flat();
          }
          return {
            ...playlist,
            songs,
          };
        });

        setPlaylists(parsedPlaylists);
        console.log('Loaded Playlists:', parsedPlaylists, storedPlaylists);
      }
    } catch (error) {
      console.error('Failed to load playlists:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadPlaylists();
    }, []),
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 14 }}>
        <PrimaryButton
          title="+  New Playlist"
          onPress={() => navigation.navigate('NewPlaylist')}
        />
        <View style={playlistsStyles.stats}>
          <StatCard label="Total Playlists" value={playlists.length} />
          <StatCard label="Total Images" value={totalImages} />
          <StatCard label="Total Songs" value={totalSongs} />
        </View>

        <Text style={playlistsStyles.h2}>My Playlists</Text>

        {playlists.length === 0 ? (
          <Card style={{ alignItems: 'center', gap: 10 }}>
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                backgroundColor: '#EAF0FF',
              }}
            />
            <Text style={{ fontWeight: '800', color: colors.text }}>
              No playlists yet
            </Text>
            <Text style={{ color: colors.sub, textAlign: 'center' }}>
              Create your first image playlist to display beautiful content on
              your TV
            </Text>
            <PrimaryButton
              title="+  Create Your First Playlist"
              onPress={() => navigation.navigate('NewPlaylist')}
            />
          </Card>
        ) : (
          playlists.map((p) => (
            <Pressable
              key={p.id}
              style={playlistsStyles.item}
              onPress={() =>
                navigation.navigate('PlaylistViewer', { playlist: p })
              }
            >
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  backgroundColor: colors.blueGray,
                }}
              />
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: '700', color: colors.text }}>
                  {p.name}
                </Text>
                <Text style={{ color: colors.sub, marginTop: 2 }}>
                  {p.images.length} images, {p.songs?.length || 0} songs
                </Text>
              </View>
              <Text style={{ color: colors.primary, fontWeight: '700' }}>
                Connect
              </Text>
            </Pressable>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default Playlists;
