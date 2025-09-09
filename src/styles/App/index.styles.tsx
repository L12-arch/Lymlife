import { StyleSheet, Platform, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
  gestureContainer: { flex: 1 },
  screenContainer: {
    flex: 1,
    backgroundColor: '#212121',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: Platform.OS === 'web' ? Dimensions.get('window').height : '100%',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  topBarContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  sheetBackgroundContainer: {
    backgroundColor: '#181818',
  },
  sheetHandle: {
    backgroundColor: 'white',
  },
});
