import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
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
                navigation.navigate('Connect', { playlistId: p.id })
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
                  {p.images.length} images
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
}

export default Playlists;
