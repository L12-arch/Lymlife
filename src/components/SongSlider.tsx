import React from 'react';
import { Text, View } from 'react-native';
import { useProgress } from 'react-native-track-player';
import Slider from '@react-native-community/slider';
import { songSliderStyles } from '../styles/SongSlider/index.styles';

/**
 * SongSlider Component
 * - position: current playback time (in seconds)
 * - duration: total track length (in seconds)
 * @returns A slider with elapsed and remaining time labels
 */
function SongSlider() {
  // Get current position & duration from track player
  const { position, duration } = useProgress();

  return (
    <View style={songSliderStyles.container}>
      {/* Progress slider (non-draggable in this version) */}
      <Slider
        value={position}
        minimumValue={0}
        maximumValue={duration}
        minimumTrackTintColor="#fff"
        maximumTrackTintColor="#fff"
        style={songSliderStyles.slider}
      />

      {/* Time labels: current position (elapsed) and remaining time */}
      <View style={songSliderStyles.timeContainer}>
        {/* Format elapsed time mm:ss */}
        <Text style={songSliderStyles.timeText}>
          {new Date(position * 1000).toISOString().substring(15, 19)}
        </Text>

        {/* Format remaining time mm:ss */}
        <Text style={songSliderStyles.timeText}>
          {new Date((duration - position) * 1000)
            .toISOString()
            .substring(15, 19)}
        </Text>
      </View>
    </View>
  );
}

export default SongSlider;
