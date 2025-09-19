import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const homeStyles = StyleSheet.create({
  background: {
    flex: 1,
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: '100%',
  },
  title: {
    fontSize: 60, // Larger for TV
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
  },
  blob: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    opacity: 0.9,
  },
  blobBlue: { backgroundColor: 'blue', top: height * 0.2, left: width * 0.2 },
  blobPurple: {
    backgroundColor: 'purple',
    top: height * 0.3,
    right: width * 0.1,
  },
  blobCyan: {
    backgroundColor: 'cyan',
    bottom: height * 0.2,
    left: width * 0.4,
  },
  subtitle: {
    fontSize: 16,
    color: '#3d3d3d',
    marginBottom: 30,
    textAlign: 'center',
    maxWidth: 300,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  loginBtn: {
    backgroundColor: '#1919e6',
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
    width: '100%',
    cursor: 'pointer',
  },
  loginText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupBtn: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
    width: '100%',
    cursor: 'pointer',
  },
  signupText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  tvPairBtn: {
    backgroundColor: '#1919e6',
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
  },
  tvPairText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  mobileScanBtn: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
  },
  mobileScanText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    borderColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
    width: '100%',
    cursor: 'pointer',
    padding: 16,
    alignItems: 'center',
  },
});

export default homeStyles;
