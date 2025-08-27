import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import homeStyles from '../../styles/Home/index.styles';
import { useNavigation } from '@react-navigation/native';

export function HomePage() {
  const navigation = useNavigation();
  return (
    <View style={styles.initialtext}>
      <Text style={homeStyles.welcomeText}>Welcome to LYMLife</Text>
      <Text style={homeStyles.title}>
        Get started by selecting an option below.
      </Text>
      <TouchableOpacity
        style={homeStyles.btn}
        onPress={() => navigation.navigate('Login')} // navigate to Login
      >
        <Text style={homeStyles.btnText}>LogIn</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={homeStyles.btn}
        onPress={() => navigation.navigate('Signup')} // navigate to Login
      >
        <Text style={homeStyles.btnText}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  initialtext: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});
export default HomePage;
