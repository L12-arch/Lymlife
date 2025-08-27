import { StyleSheet } from "react-native";
import { colors, radius, shadow } from "../../theme";

const btnStyles = StyleSheet.create({
  btn: {
    backgroundColor: colors.primary2,
    borderRadius: radius.pill,
    padding: 14,
    alignItems: 'center',
    ...shadow.card,
  },
  text: { color: 'white', fontWeight: '800', letterSpacing: 0.3 },
});

export default btnStyles;