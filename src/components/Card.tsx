import React from 'react';
import { View,ViewProps } from 'react-native';
import cardStyles from '../styles/Card/index.styles';

const Card = (props: ViewProps) => {
  return <View {...props} style={[cardStyles.card, props.style]} />;
}

export default Card;