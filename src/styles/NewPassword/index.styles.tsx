import { StyleSheet } from 'react-native';

const newPasswordStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
  },
  resetBtn: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  resetText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  backToLogin: {
    marginTop: 15,
    color: '#007bff',
  },
});

export default newPasswordStyles;
