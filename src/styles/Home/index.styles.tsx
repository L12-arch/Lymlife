import { StyleSheet } from 'react-native';

const homeStyles = StyleSheet.create({
  initialtext: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1877F2',
    marginBottom: 80,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  btn: {
    backgroundColor: '#1877F2',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginVertical: 10,
    width: '90%',
    alignItems: 'center',
    height: 60,
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default homeStyles;
