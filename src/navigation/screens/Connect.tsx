// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Alert,
//   ScrollView,
//   StyleSheet,
//   ActivityIndicator,
// } from 'react-native';
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import PrimaryButton from '../../components/PrimaryButton';
// import { colors } from '../../theme';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Playlist } from '../../types';
// import { useFocusEffect } from '@react-navigation/native';

// type Props = NativeStackScreenProps<any, 'Connect'>;

// const Connect = ({ navigation, route }: Props) => {
//   const { playlistId } = route.params || {};
//   const [playlist, setPlaylist] = useState<Playlist | null>(null);
//   const [isConnected, setIsConnected] = useState(false);
//   const [connectedDevice, setConnectedDevice] = useState<string | null>(null);
//   const [isScanning, setIsScanning] = useState(false);
//   const [availableDevices, setAvailableDevices] = useState<any[]>([]);

//   useEffect(() => {
//     if (playlistId) {
//       loadPlaylist();
//     }
//   }, [playlistId]);

//   const loadPlaylist = async () => {
//     try {
//       const storedPlaylists = await AsyncStorage.getItem('playlists');
//       if (storedPlaylists) {
//         const playlists: Playlist[] = JSON.parse(storedPlaylists);
//         const foundPlaylist = playlists.find((p) => p.id === playlistId);
//         if (foundPlaylist) {
//           setPlaylist(foundPlaylist);
//         }
//       }
//     } catch (error) {
//       console.error('Failed to load playlist:', error);
//     }
//   };

//   const handleScanDevices = () => {
//     setIsScanning(true);
//     // In real implementation, this would scan for cast devices
//     // For now, we'll simulate
//     setTimeout(() => {
//       setAvailableDevices([
//         { name: 'Living Room TV', id: 'tv1' },
//         { name: 'Bedroom Monitor', id: 'monitor1' },
//         { name: 'Kitchen Display', id: 'display1' },
//       ]);
//       setIsScanning(false);
//     }, 2000);
//   };

//   const handleConnect = async (device: any) => {
//     try {
//       // Simulate connection delay
//       setIsScanning(true);
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//       setIsConnected(true);
//       setConnectedDevice(device.name);
//       setIsScanning(false);
//       Alert.alert('Connected', `Successfully connected to ${device.name}`);
//     } catch (error) {
//       setIsScanning(false);
//       Alert.alert('Connection Failed', 'Unable to connect to device');
//     }
//   };

//   const handleDisconnect = async () => {
//     try {
//       setIsConnected(false);
//       setConnectedDevice(null);
//       Alert.alert('Disconnected', 'Remote connection ended');
//     } catch (error) {
//       Alert.alert('Error', 'Failed to disconnect');
//     }
//   };

//   const handleStartDisplay = async () => {
//     if (isConnected && playlist) {
//       try {
//         // For demonstration, show alert with media types included
//         const mediaCount = playlist.songs.length;
//         const imageCount = playlist.images.length;
//         Alert.alert(
//           'Displaying Playlist',
//           `Now displaying "${playlist.name}" on ${connectedDevice} with ${imageCount} images and ${mediaCount} audio/video files.`,
//         );
//         // TODO: Implement actual media playback for audio and video
//       } catch (error) {
//         Alert.alert('Error', 'Failed to start display');
//       }
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <ScrollView contentContainerStyle={styles.content}>
//         <Text style={styles.title}>Connect to Remote Screen</Text>

//         {playlist && (
//           <View style={styles.playlistInfo}>
//             <Text style={styles.playlistTitle}>{playlist.name}</Text>
//             <Text style={styles.playlistDetails}>
//               {playlist.images.length} images, {playlist.songs?.length || 0}{' '}
//               songs
//             </Text>
//           </View>
//         )}

//         {/* Connection Status */}
//         <View style={styles.connectionSection}>
//           <Text style={styles.sectionTitle}>Connection Status</Text>

//           {isConnected ? (
//             <View style={styles.connectedDevice}>
//               <Text style={styles.deviceText}>
//                 Connected to: {connectedDevice}
//               </Text>
//               <PrimaryButton
//                 title="Disconnect"
//                 onPress={handleDisconnect}
//                 style={{ marginTop: 10 }}
//               />
//             </View>
//           ) : (
//             <View>
//               {!isScanning && availableDevices.length === 0 && (
//                 <PrimaryButton
//                   title="Scan for Devices"
//                   onPress={handleScanDevices}
//                 />
//               )}

//               {isScanning && (
//                 <View style={styles.scanningContainer}>
//                   <ActivityIndicator size="large" color={colors.primary} />
//                   <Text style={styles.scanningText}>
//                     Scanning for devices...
//                   </Text>
//                 </View>
//               )}

//               {availableDevices.length > 0 && (
//                 <View style={styles.devicesList}>
//                   <Text style={styles.devicesTitle}>Available Devices:</Text>
//                   {availableDevices.map((device, index) => (
//                     <TouchableOpacity
//                       key={index}
//                       style={styles.deviceItem}
//                       onPress={() => handleConnect(device)}
//                     >
//                       <Text style={styles.deviceName}>{device.name}</Text>
//                       <Text style={styles.connectText}>Connect</Text>
//                     </TouchableOpacity>
//                   ))}
//                 </View>
//               )}
//             </View>
//           )}
//         </View>

//         {/* Display Controls */}
//         {isConnected && playlist && (
//           <View style={styles.displaySection}>
//             <Text style={styles.sectionTitle}>Display Controls</Text>
//             <PrimaryButton
//               title="Start Displaying Playlist"
//               onPress={handleStartDisplay}
//             />
//             <Text style={styles.displayInfo}>
//               This will display your playlist on the connected device
//             </Text>
//           </View>
//         )}

//         {/* Info Section */}
//         <View style={styles.infoSection}>
//           <Text style={styles.infoTitle}>Remote Display Features:</Text>
//           <Text style={styles.infoText}>• Display playlists on smart TVs</Text>
//           <Text style={styles.infoText}>• Cast images and play music</Text>
//           <Text style={styles.infoText}>• Control playback remotely</Text>
//           <Text style={styles.infoText}>• Auto-play slideshows</Text>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.bg,
//   },
//   content: {
//     padding: 20,
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: colors.text,
//     marginBottom: 30,
//   },
//   playlistInfo: {
//     alignItems: 'center',
//     marginBottom: 30,
//     padding: 20,
//     backgroundColor: colors.blueGray,
//     borderRadius: 10,
//     width: '100%',
//   },
//   playlistTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: colors.text,
//   },
//   playlistDetails: {
//     fontSize: 14,
//     color: colors.sub,
//     marginTop: 5,
//   },
//   connectionSection: {
//     width: '100%',
//     marginBottom: 30,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: colors.text,
//     marginBottom: 15,
//   },
//   connectedDevice: {
//     backgroundColor: colors.blueGray,
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   deviceText: {
//     fontSize: 16,
//     color: colors.text,
//   },
//   scanningContainer: {
//     alignItems: 'center',
//     padding: 20,
//   },
//   scanningText: {
//     fontSize: 16,
//     color: colors.sub,
//     marginTop: 10,
//   },
//   devicesList: {
//     width: '100%',
//   },
//   devicesTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: colors.text,
//     marginBottom: 10,
//   },
//   deviceItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 15,
//     backgroundColor: colors.blueGray,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   deviceName: {
//     fontSize: 16,
//     color: colors.text,
//   },
//   connectText: {
//     fontSize: 16,
//     color: colors.primary,
//     fontWeight: '600',
//   },
//   displaySection: {
//     width: '100%',
//     marginBottom: 30,
//   },
//   displayInfo: {
//     fontSize: 14,
//     color: colors.sub,
//     textAlign: 'center',
//     marginTop: 10,
//   },
//   infoSection: {
//     width: '100%',
//   },
//   infoTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: colors.text,
//     marginBottom: 10,
//   },
//   infoText: {
//     fontSize: 14,
//     color: colors.sub,
//     marginBottom: 5,
//   },
// });

// export default Connect;
