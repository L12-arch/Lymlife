import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UploadDrop from '../../components/UploadDrop';
import PrimaryButton from '../../components/PrimaryButton';
import { colors } from '../../theme';
import * as ImagePicker from 'expo-image-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import newPlaylistStyles from '../../styles/NewPlaylist.tsx/index.styles';
import { googleDriveService } from '../../api/googleDrive';
import { Playlist } from '../../types';
import { VideoProps } from '../../types/index';

type Props = NativeStackScreenProps<any, 'NewPlaylist'>;

const NewPlaylist = ({ navigation }: Props) => {
  const [name, setName] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [songs, setSongs] = useState<VideoProps[]>([]);
  const [selectedSongs, setSelectedSongs] = useState<Set<string>>(new Set());
  const [loadingSongs, setLoadingSongs] = useState(false);

  async function addImages() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Please allow photo library access.');
      return;
    }
    const res = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      selectionLimit: 10,
    });
    if (!res.canceled) {
      const uris = res.assets.map((a) => a.uri);
      setImages((prev) => [...prev, ...uris]);
    }
  }

  async function fetchSongsFromGoogleDrive() {
    setLoadingSongs(true);
    try {
      const fetchedSongs = await googleDriveService.getAllAudioFiles();
      const convertedSongs = fetchedSongs.map((file) =>
        googleDriveService.convertToSong(file),
      );
      console.log('Fetched Songs:', convertedSongs);
      setSongs(convertedSongs);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch songs from Google Drive');
    } finally {
      setLoadingSongs(false);
    }
  }

  function toggleSongSelection(songId: string) {
    setSelectedSongs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(songId)) {
        newSet.delete(songId);
      } else {
        newSet.add(songId);
      }
      return newSet;
    });
  }

  const canCreate = name.trim().length > 0;

  async function handleCreate() {
    if (!canCreate) {
      Alert.alert('Validation', 'Please enter a playlist name');
      return;
    }
    const selectedSongObjects = songs.filter((song) =>
      selectedSongs.has(song.id),
    );

    const newPlaylist: Playlist = {
      id: Date.now().toString(), // Simple ID generation
      name: name.trim(),
      images,
      songs: selectedSongObjects,
    };

    try {
      // Load existing playlists
      const storedPlaylists = await AsyncStorage.getItem('playlists');
      const playlists: Playlist[] = storedPlaylists
        ? JSON.parse(storedPlaylists)
        : [];

      // Add new playlist
      playlists.push(newPlaylist);

      // Save back to storage
      await AsyncStorage.setItem('playlists', JSON.stringify(playlists));

      Alert.alert(
        'Playlist Saved',
        `${name} (${images.length} images, ${selectedSongObjects.length} songs)`,
      );
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to save playlist');
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.bg }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView style={{ flex: 1, padding: 16 }}>
        <Text style={newPlaylistStyles.label}>Playlist Name</Text>
        <TextInput
          placeholder="e.g. Lunch Specials, Daily Menu"
          value={name}
          onChangeText={setName}
          style={newPlaylistStyles.input}
          placeholderTextColor="#9CA3AF"
        />

        <Text style={newPlaylistStyles.label}>Images</Text>
        <UploadDrop images={images} onAdd={addImages} />

        <View style={{ marginTop: 20 }}>
          <PrimaryButton
            title="Fetch Songs from Google Drive"
            onPress={fetchSongsFromGoogleDrive}
            disabled={loadingSongs}
          />
        </View>

        {loadingSongs && <Text>Loading songs...</Text>}

        {songs.length > 0 && (
          <>
            <Text style={[newPlaylistStyles.label, { marginTop: 20 }]}>
              Select Songs
            </Text>
            {songs.map((song) => (
              <TouchableOpacity
                key={song.id}
                onPress={() => toggleSongSelection(song.id)}
                style={{
                  padding: 10,
                  backgroundColor: selectedSongs.has(song.id)
                    ? colors.primary
                    : colors.bg,
                  marginVertical: 4,
                  borderRadius: 6,
                }}
              >
                <Text
                  style={{
                    color: selectedSongs.has(song.id) ? 'white' : colors.text,
                  }}
                >
                  {song.title}
                </Text>
              </TouchableOpacity>
            ))}
          </>
        )}

        <PrimaryButton
          title={canCreate ? 'Save Playlist' : 'Enter Playlist Name'}
          disabled={!canCreate}
          onPress={handleCreate}
          style={{ marginTop: 20, marginBottom: 40 }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default NewPlaylist;
