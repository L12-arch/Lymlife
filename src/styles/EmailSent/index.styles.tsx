import { StyleSheet } from 'react-native';

const emailSentStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  backToLogin: {
    color: '#007bff',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default emailSentStyles;
