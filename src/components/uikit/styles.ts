import { StyleSheet } from 'react-native';
import { variants, constants, colors } from '@values';

export default StyleSheet.create({
  flex1: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  padding: {
    padding: constants.dfPadding,
  },
  paddingV: {
    paddingVertical: constants.dfPadding,
  },
  containerPaddingV: {
    paddingVertical: constants.isIphoneX ? 0 : constants.dfPadding,
  },
  paddingH: {
    paddingHorizontal: constants.dfPadding,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    color: colors.error,
    fontSize: variants.caption,
    paddingVertical: 3,
  },
  paddingWithoutBottom: {
    padding: constants.dfPadding,
    paddingBottom: 0,
  },
});
