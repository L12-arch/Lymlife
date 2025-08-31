import { StyleSheet } from 'react-native';

const otpVerificationStyles = StyleSheet.create({
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
  verifyBtn: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  verifyText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  resendBtn: {
    marginTop: 10,
    alignItems: 'center',
  },
  resendText: {
    color: '#007bff',
  },
});

export default otpVerificationStyles;
