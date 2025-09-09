// src/navigation/screens/PlaylistViewer.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, Pressable, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Video from 'react-native-video';
import GoogleCast, {
  CastButton,
  useRemoteMediaClient,
} from 'react-native-google-cast';
import { NativeEventEmitter, NativeModules } from 'react-native';

import { RootStackParamList } from '../../types/navigation';
import { styles } from '../../styles/PlaylistViewer/index.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'PlaylistViewer'>;

const PlaylistViewer = ({ navigation, route }: Props) => {
  const { playlist } = route.params;
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const currentVideo = playlist.songs[currentIndex];
  const client = useRemoteMediaClient();

  const handleNext = () => {
    if (currentIndex < playlist.songs.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const startCasting = async () => {
    if (!currentVideo || !client) return;

    client.loadMedia({
      mediaInfo: {
        contentUrl: currentVideo.webContentLink,
        metadata: {
          type: 'generic', // ✅ required field
          images: [{ url: currentVideo.thumbnailLink }],
          title: currentVideo.title,
          subtitle: currentVideo.category,
        },
        streamDuration: Number(currentVideo.duration) || 0,
        contentType: 'video/mp4',
      },
    });
  };

  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(NativeModules.GoogleCast);
    const sub = eventEmitter.addListener('MEDIA_STATUS_UPDATED', (event) => {
      console.log('Cast status updated:', event);
    });

    return () => sub.remove();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header with Cast Button */}
      <View style={styles.headerRow}>
        <Text style={styles.playlistName}>{playlist.name}</Text>
        <CastButton style={styles.castButton} />
      </View>

      {/* Video Player */}
      {currentVideo && (
        <>
          <Video
            source={{ uri: currentVideo.webContentLink }}
            style={styles.videoPlayer}
            controls
            resizeMode="contain"
            audioOutput="speaker"
            playInBackground={false}
            playWhenInactive={false}
            ignoreSilentSwitch="ignore"
            volume={1.0}
            muted={false}
            onEnd={handleNext}
            onError={(err) => console.log('Video Error:', err)}
          />

          <Text style={styles.videoTitle}>{currentVideo.title}</Text>

          <View style={styles.controlsRow}>
            <Button
              title="Previous"
              onPress={handlePrevious}
              disabled={currentIndex === 0}
            />
            <Button
              title="Next"
              onPress={handleNext}
              disabled={currentIndex === playlist.songs.length - 1}
            />
          </View>

          <Button title="Cast to Device" onPress={startCasting} />
        </>
      )}

      {/* Playlist List */}
      <FlatList
        data={playlist.songs}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => setCurrentIndex(index)}
            style={[
              styles.playlistItem,
              index === currentIndex && styles.playlistItemSelected,
            ]}
          >
            <Image
              source={{ uri: item.thumbnailLink }}
              style={styles.playlistItemImage}
            />
            <View style={styles.playlistItemTextContainer}>
              <Text style={styles.playlistItemTitle}>{item.title}</Text>
              <Text style={styles.playlistItemSubtitle}>
                {item.category} • {item.duration}
              </Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

export default PlaylistViewer;
