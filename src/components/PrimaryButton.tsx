import React from 'react';
import { Text, Pressable, ViewStyle } from 'react-native';
import btnStyles from '../styles/PrimaryButton/index.styles';

/**
 * Primary Button Component
 * @param title Button title
 * @param onPress Function to call on button press
 * @param disabled Disable button
 * @param style Custom button style
 * @returns A styled primary button component
 */
export default function PrimaryButton({
  title,
  onPress,
  disabled,
  style,
}: {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        btnStyles.btn,
        style,
        disabled && { opacity: 0.6 },
        pressed && { transform: [{ scale: 0.99 }] },
      ]}
    >
      <Text style={btnStyles.text}>{title}</Text>
    </Pressable>
  );
}
