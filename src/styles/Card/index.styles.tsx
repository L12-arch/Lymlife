import { StyleSheet } from "react-native";
import { colors, radius, shadow } from '../../theme';

const cardStyles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: radius.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.card,
  },
});

export default cardStyles;