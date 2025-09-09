import { View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

//css
import homeStyles from '../../styles/Home/index.styles';

/**
 * HomePage Component
 * - Initial screen with options to LogIn or Signup
 * @returns HomePage Component
 */
export function HomePage() {
  const navigation = useNavigation();
  return (
    <View style={homeStyles.initialtext}>
      {/* Welcome message */}
      <Text style={homeStyles.welcomeText}>Welcome to LYMLife</Text>
      {/* Subtitle */}
      <Text style={homeStyles.title}>
        Get started by selecting an option below.
      </Text>
      {/* Login button */}
      <TouchableOpacity
        style={homeStyles.btn}
        onPress={() => navigation.navigate('Login')} // navigate to Login
      >
        <Text style={homeStyles.btnText}>LogIn</Text>
      </TouchableOpacity>
      {/* Signup button */}
      <TouchableOpacity
        style={homeStyles.btn}
        onPress={() => navigation.navigate('Signup')} // navigate to Login
      >
        <Text style={homeStyles.btnText}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
}

export default HomePage;
