import React from 'react';
import { Text, Pressable, ViewStyle } from 'react-native';
import btnStyles from '../styles/PrimaryButton';

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

