import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import UploadDrop from '../../components/UploadDrop';
import PrimaryButton from '../../components/PrimaryButton';
import { colors } from '../../theme';
import * as ImagePicker from 'expo-image-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import newPlaylistStyles from '../../styles/NewPlaylist.tsx/index.styles';

type Props = NativeStackScreenProps<any, 'NewPlaylist'>;

const NewPlaylist = ({ navigation }: Props) => {
  const [name, setName] = useState('');
  const [images, setImages] = useState<string[]>([]);

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

  const canCreate = name.trim().length > 0;

  function handleCreate() {
    // stub: normally persist to state/store/server
    Alert.alert('Playlist Saved', `${name} (${images.length} images)`);
    navigation.goBack();
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.bg }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={{ padding: 16, gap: 14, flex: 1 }}>
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

        <PrimaryButton
          title={canCreate ? 'Save Playlist' : 'Enter Playlist Name'}
          disabled={!canCreate}
          onPress={handleCreate}
          style={{ marginTop: 'auto' }}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

export default NewPlaylist;

