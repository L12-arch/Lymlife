import React, { PropsWithChildren } from 'react';
import { Text, View } from 'react-native';
import { Track } from 'react-native-track-player';
import { songInfoStyles } from '../styles/SongInfo/index.styles';

type SongInfoProps = PropsWithChildren<{
  track: Track | null | undefined;
}>;

/**
 * SongInfo Component
 *
 * Displays information about the current track,
 * such as title and artist. If no track is available,
 * renders nothing.
 */
function SongInfo({ track }: SongInfoProps) {
  return (
    <View style={songInfoStyles.container}>
      <View style={songInfoStyles.details}>
        {/* title Artist */}
        <Text style={songInfoStyles.title} numberOfLines={1}>
          {track?.title} {track?.artist}
        </Text>
      </View>
    </View>
  );
}

export default SongInfo;
