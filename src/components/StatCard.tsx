import React from 'react';
import { Text } from 'react-native';
import Card from './Card';
import statCardStyles from '../styles/StatCard/index.styles';

type StatCardProps = {
  label: string;
  value: number | string;
};

/**
 * StatCard Component
 * - label: description of the statistic
 * - value: numeric or string value of the statistic
 * @param props Component props
 * @param label
 * @param value
 * @returns A card displaying a statistic with a label and value
 */
function StatCard({ label, value }: StatCardProps) {
  return (
    <Card style={statCardStyles.wrap}>
      <Text style={statCardStyles.value}>{value}</Text>
      <Text style={statCardStyles.label}>{label}</Text>
    </Card>
  );
}

export default StatCard;
