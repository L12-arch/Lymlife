import React from 'react';
import { View, ViewProps, StyleProp, ViewStyle } from 'react-native';
import cardStyles from '../styles/Card/index.styles';

export interface CardProps extends ViewProps {
  style?: StyleProp<ViewStyle>;
}

/**
 * Card Component
 * A simple wrapper around `View` that applies default
 * card styling while still allowing custom props and styles.
 */
function Card({ style, children, ...rest }: CardProps) {
  return (
    <View style={[cardStyles.cardWrapper, style]} {...rest}>
      {children}
    </View>
  );
}

export default Card;
