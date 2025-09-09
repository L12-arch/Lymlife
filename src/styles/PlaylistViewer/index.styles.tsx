import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  playlistName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  castButton: {
    width: 28,
    height: 28,
    tintColor: '#000',
  },
  videoPlayer: {
    width: width - 32,
    height: 220,
    borderRadius: 12,
    backgroundColor: '#000',
    marginBottom: 12,
  },
  videoTitle: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 8,
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  playlistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
    borderRadius: 8,
    padding: 6,
  },
  playlistItemSelected: {
    backgroundColor: '#EAF0FF',
  },
  playlistItemImage: {
    width: 80,
    height: 60,
    borderRadius: 8,
  },
  playlistItemTextContainer: {
    flex: 1,
  },
  playlistItemTitle: {
    fontWeight: '600',
    color: '#111',
  },
  playlistItemSubtitle: {
    color: '#555',
  },
});
