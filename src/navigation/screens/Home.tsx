import React, { useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  ImageBackground,
  Text,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
  withRepeat,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../context/AuthContext';

// css
import homeStyles from '../../styles/Home/index.styles';

/**
 * HomePage Component with animations
 * @returns HomePage Component
 */
export function HomePage() {
  const navigation = useNavigation();

  // Shared values for animations
  const fadeIn = useSharedValue(0);
  const slideUp = useSharedValue(50);
  const scaleBtn = useSharedValue(0);
  // Background blob animation
  const moveX = useSharedValue(0);
  const moveY = useSharedValue(0);

  // Text animations (fade + slide up)
  const textStyle = useAnimatedStyle(() => ({
    opacity: fadeIn.value,
    transform: [{ translateY: slideUp.value }],
  }));

  // Button animations (scale in)
  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleBtn.value }],
  }));

  const blobStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: moveX.value }, { translateY: moveY.value }],
  }));
  useEffect(() => {
    fadeIn.value = withTiming(1, { duration: 1000 });
    slideUp.value = withTiming(0, { duration: 1000 });
    scaleBtn.value = withSpring(1, { damping: 8, stiffness: 100 });

    moveX.value = withRepeat(withTiming(40, { duration: 8000 }), -1, true);
    moveY.value = withRepeat(withTiming(60, { duration: 10000 }), -1, true);
  }, []);

  const { isAuthenticated, userData } = useAuth();
  console.log('User Data on Home Page:', userData, isAuthenticated);
  return (
    <ImageBackground
      source={{
        uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsMrvj-RsIzTkHmVXsIyIppRVx4HWuY9EZq6uXhhPkv5GrQ12r0089d2yotiStlYSQif6Z71Z21cIu43t5vuJ1Qm5wIyP3DZdyMoVnBe_m_2ejctrOA69I0t2r7MFZUBoaNh3SET0vR7ek2A3olu117Ff2ZbWBrgIpJWDSMwRnuM1ZkkiVmt2a8DF2hjAlkizF2PKohJOrEH69yhJ6L6z8Nwt5yusJ29pO0I284MLruaUK_AsM6zMcC6rN-KMWtp0hTF_ZtK2rqA',
      }}
      style={homeStyles.background}
      blurRadius={6}
    >
      <Animated.View
        style={[homeStyles.blob, homeStyles.blobBlue, blobStyle]}
      />
      <Animated.View
        style={[homeStyles.blob, homeStyles.blobPurple, blobStyle]}
      />
      <Animated.View
        style={[homeStyles.blob, homeStyles.blobCyan, blobStyle]}
      />

      {/* Dark overlay (gradient like in HTML) */}
      <LinearGradient
        colors={['#efd5ff', '#515ada']}
        start={{ x: 0, y: 0 }} // left
        end={{ x: 1, y: 0 }} // right (90deg)
        style={homeStyles.overlay}
      />

      <View style={homeStyles.container}>
        {/* Title */}
        <View>
          <Animated.Text style={[homeStyles.title, textStyle]}>
            LYMLife
          </Animated.Text>

          {/* Subtitle */}
          <Animated.Text style={[homeStyles.subtitle, textStyle]}>
            Discover, create, and share your video playlists with the world.
          </Animated.Text>
        </View>
        {/* Buttons */}
        <View style={homeStyles.buttonContainer}>
          {/* Login */}
          <Animated.View style={buttonStyle}>
            <TouchableOpacity
              style={homeStyles.loginBtn}
              onPress={() => {
                scaleBtn.value = withSequence(
                  withSpring(0.9, { damping: 10, stiffness: 200 }),
                  withSpring(1),
                );
                navigation.navigate('Login');
              }}
            >
              <Text style={homeStyles.loginText}>Login</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Signup */}
          <Animated.View style={buttonStyle}>
            <TouchableOpacity
              style={homeStyles.signupBtn}
              onPress={() => {
                scaleBtn.value = withSequence(
                  withSpring(0.9, { damping: 10, stiffness: 200 }),
                  withSpring(1),
                );
                navigation.navigate('Signup');
              }}
            >
              <Text style={homeStyles.signupText}>Signup</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </ImageBackground>
  );
}

export default HomePage;
