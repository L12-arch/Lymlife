import { StyleSheet } from 'react-native';
import { colors } from '../../theme';

const statCardStyles = StyleSheet.create({
  wrap: { flex: 1, alignItems: 'center', gap: 6 },
  value: { fontWeight: '800', fontSize: 22, color: colors.text },
  label: { color: colors.sub, fontSize: 12 },
});

export default statCardStyles;