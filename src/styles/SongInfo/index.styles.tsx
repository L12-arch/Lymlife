import { StyleSheet } from 'react-native';

export const songInfoStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },
  details: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
