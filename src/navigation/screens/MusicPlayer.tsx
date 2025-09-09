import React from 'react';
import { View, Image, FlatList } from 'react-native';
import TrackPlayer, {
  Event,
  Track,
  useTrackPlayerEvents,
} from 'react-native-track-player';

import { playListData } from '../../constants';
import ControlCenter from '../../components/ControlCenter';
import SongInfo from '../../components/SongInfo';
import SongSlider from '../../components/SongSlider';

// Styles
import { styles } from '../../styles/MusicPlayer/index.styles';

/**
 * MusicPlayer Component
 * Displays a music player UI with:
 * - Artwork carousel
 * - Song information
 * - Progress slider
 * - Playback controls
 */
const MusicPlayer = () => {
  const [track, setTrack] = React.useState<Track | null>();

  /**
   * Listen for active track changes and update state.
   */
  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async (event) => {
    if (
      event.type === Event.PlaybackActiveTrackChanged &&
      event.index != null
    ) {
      // Fetch the currently active track from TrackPlayer
      const track = await TrackPlayer.getTrack(event.index + 1);
      setTrack(track);
    }
  });

  /**
   * Renders artwork for the current track.
   */
  const renderArtWork = () => {
    return (
      <View style={styles.listArtWrapper}>
        <View style={styles.albumContainer}>
          {track?.artwork ? (
            <Image
              source={{ uri: track.artwork as string }}
              alt="Album Art"
              style={styles.albumArtImg}
            />
          ) : null}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Artwork carousel */}
      <FlatList
        data={playListData}
        renderItem={renderArtWork}
        horizontal
        keyExtractor={(song) => song.id.toString()}
      />

      {/* Track details */}
      <SongInfo track={track} />

      {/* Progress bar */}
      <SongSlider />

      {/* Playback controls */}
      <ControlCenter />
    </View>
  );
};

export default MusicPlayer;
