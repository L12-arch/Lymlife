import { StyleSheet } from 'react-native';
import { colors, radius } from '../../theme';

const uploadStyles = StyleSheet.create({
  wrap: {
    borderWidth: 1.5,
    borderColor: '#D6DBFF',
    borderStyle: 'dashed',
    borderRadius: radius.lg,
    alignItems: 'center',
    paddingVertical: 28,
    backgroundColor: '#F7F9FF',
    gap: 8,
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.blueGray,
  },
  title: { fontWeight: '800', color: colors.text },
  sub: { color: colors.sub },
  addBtn: {
    marginTop: 8,
    borderRadius: radius.pill,
    borderColor: '#CFE0FF',
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: 'white',
  },
  grid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 6,
  },
  addTile: {
    width: '31%',
    aspectRatio: 1,
    borderRadius: 10,
    margin: '1%',
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});

export default uploadStyles;