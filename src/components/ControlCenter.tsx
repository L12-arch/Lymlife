import React from 'react';
import { Pressable, View } from 'react-native';
import TrackPlayer, {
  State,
  usePlaybackState,
  PlaybackState,
} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/MaterialIcons';

// styles
import { controlCenterStyles } from '../styles/ControlCenter/index.styles';

/**
 * ControlCenter Component
 *
 * Provides basic music playback controls:
 * - Skip to previous track
 * - Play/Pause toggle
 * - Skip to next track
 */
function ControlCenter() {
  const playBackState = usePlaybackState();

  /** Skip to the next track in the queue */
  const skipToNext = async () => {
    await TrackPlayer.skipToNext();
  };

  /** Skip to the previous track in the queue */
  const skipToPrevious = async () => {
    await TrackPlayer.skipToPrevious();
  };

  /**
   * Toggle playback (play/pause).
   * Plays if the player is paused or ready, pauses otherwise.
   */
  const togglePlayBack = async (
    playBackState: PlaybackState | { state: undefined },
  ) => {
    const currentTrack = await TrackPlayer.getActiveTrack();
    if (currentTrack != null) {
      if (
        playBackState.state === State.Paused ||
        playBackState.state === State.Ready
      ) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };

  return (
    <View style={controlCenterStyles.container}>
      {/* Skip to Previous Button */}
      <Pressable onPress={skipToPrevious}>
        <Icon name="skip-previous" size={40} style={controlCenterStyles.icon} />
      </Pressable>

      <Pressable
        onPress={() => togglePlayBack(playBackState)}
        style={controlCenterStyles.playButton}
      >
        <Icon
          name={playBackState.state === State.Playing ? 'pause' : 'play-arrow'}
          size={50}
          style={controlCenterStyles.icon}
        />
      </Pressable>

      <Pressable onPress={skipToNext}>
        <Icon name="skip-next" size={40} style={controlCenterStyles.icon} />
      </Pressable>
    </View>
  );
}

export default ControlCenter;
