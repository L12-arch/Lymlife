import React from 'react';
import { Text } from 'react-native';
import Card from './Card';
import statCardStyles from '../styles/StatCard/index.styles';

const StatCard = ({
  label,
  value,
}: {
  label: string;
  value: number | string;
}) => {
  return (
    <Card style={statCardStyles.wrap}>
      <Text style={statCardStyles.value}>{value}</Text>
      <Text style={statCardStyles.label}>{label}</Text>
    </Card>
  );
};

export default StatCard;