import { StyleSheet } from "react-native";
import { colors, radius } from "../../theme";

const newPlaylistStyles = StyleSheet.create({
  label: { fontWeight: '800', color: colors.text, marginTop: 2 },
  input: {
    backgroundColor: 'white',
    borderRadius: radius.lg,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
});

export default newPlaylistStyles;