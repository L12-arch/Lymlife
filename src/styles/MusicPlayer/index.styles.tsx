import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    // justifyContent: 'center',
    height: '70%',
    width: '100%',
    margin: 0,
  },
  listArtWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
  },
  albumContainer: {
    width: 300,
    height: 300,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#1E1E1E',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
    marginBottom: 20,
  },
  albumArtImg: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    resizeMode: 'cover',
  },
});
