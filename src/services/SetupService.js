import TrackPlayer, {
  //   AppKilledPlaybackBehavior,
  //   Capability,
  RepeatMode,
} from 'react-native-track-player';
import { playListData } from '../constants';

// export const DefaultRepeatMode = RepeatMode.Queue;
// export const DefaultAudioServiceBehaviour =
//   AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification;

export const setupPlayer = async () => {
  let isSetup = false;
  try {
    await TrackPlayer.getTrack();
    isSetup = true;
  } catch (error) {
    await TrackPlayer.setupPlayer();
    isSetup = true;
  } finally {
    return isSetup;
  }
};

export const addTrack = async () => {
  await TrackPlayer.add(playListData);
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
};

// export const SetupService = async () => {
//   try {
//     await setupPlayer({
//       autoHandleInterruptions: true,
//     });
//     await TrackPlayer.updateOptions({
//       android: {
//         appKilledPlaybackBehavior: DefaultAudioServiceBehaviour,
//       },
//       capabilities: [
//         Capability.Play,
//         Capability.Pause,
//         Capability.SkipToNext,
//         Capability.SkipToPrevious,
//         Capability.SeekTo,
//         Capability.JumpBackward,
//         Capability.JumpForward,
//       ],
//       notificationCapabilities: [
//         Capability.Play,
//         Capability.Pause,
//         Capability.SeekTo,
//         Capability.SkipToNext,
//         Capability.SkipToPrevious,
//       ],
//       progressUpdateEventInterval: 2,
//     });
//     await TrackPlayer.setRepeatMode(DefaultRepeatMode);
//   } catch (error) {
//     console.error('Error setting up player:', error);
//     throw error;
//   }
// };
