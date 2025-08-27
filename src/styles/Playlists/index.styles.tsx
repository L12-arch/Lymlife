import { StyleSheet } from "react-native";
import { colors, radius } from "../../theme";

const playlistsStyles = StyleSheet.create({
  stats: { flexDirection: 'row', gap: 12 },
  h2: { marginTop: 8, fontWeight: '800', color: colors.text, fontSize: 16 },
  item: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});

export default playlistsStyles;