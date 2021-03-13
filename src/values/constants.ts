import { Dimensions, Platform, StatusBar, StyleSheet } from 'react-native';
import { normalize } from '@utils/responsive';

const { width, height } = Dimensions.get('window');

const isIphoneX =
  Platform.OS === 'ios' &&
  !Platform.isPad &&
  !Platform.isTVOS &&
  (width > 780 || height > 780);

enum FeatureStatus {
  ON = 'ON',
  OFF = 'OFF',
  MAINTAIN = 'MAINTAIN',
  ANDROID_ONLY = 'ANDROID_ONLY',
  IOS_ONLY = 'IOS_ONLY',
}

enum FeatureType {
  DEFAULT = 'DEFAULT',
  CONFIG = 'CONFIG',
}

const constants = {
  line: StyleSheet.hairlineWidth,
  bottomSpace: isIphoneX ? 34 : 0,
  dfPadding: 16,
  halfPadding: 8,
  quarterPadding: 4,
  width,
  height,
  isIphoneX,
  isAndroid: Platform.OS === 'android',
  isIos: Platform.OS === 'ios',
  isIphone: Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS,
  statusBarHeight: Platform.select({
    ios: isIphoneX ? 44 : 30,
    android: StatusBar.currentHeight,
    default: 0,
  }),
  iconPrefix: Platform.OS === 'ios' ? 'ios-' : 'md-',
  pageSize: 15,
  pswMinLength: 6,
  otpLength: 6,
  maxCurrency: 99999999999,
};

const colors = {
  bg: '#0F262E',
  primary: '#2E302F',
  primaryBlue: '#2980b9',
  primaryGreen: 'rgb(144,185,181)',
  primaryYellow: '#FEDE10',
  primaryGrayYellow: '#937129',
  primaryGrayYellow61: 'rgba(147, 113, 41, 0.61)',
  primaryGrayYellow5: '#f4f1ea',
  primaryGrayYellow8: '#f7f7f5',
  primaryBlur: '#d5d6d5',
  borders: '#D9D9D9',
  lightSkyBlue: 'rgb(128,189,255)',

  white: 'rgba(255,255,255,1)',
  white1: 'rgba(255,255,255,0.1)',
  white2: 'rgba(255,255,255,0.2)',
  white3: 'rgba(255,255,255,0.3)',
  white4: 'rgba(255,255,255,0.4)',
  white5: 'rgba(255,255,255,0.5)',
  white6: 'rgba(255,255,255,0.6)',
  white7: 'rgba(255,255,255,0.7)',
  white8: 'rgba(255,255,255,0.8)',
  white9: 'rgba(255,255,255,0.9)',

  black333: '#333',
  black: 'rgba(0,0,0,1)',
  black1: 'rgba(0,0,0,0.1)',
  black2: 'rgba(0,0,0,0.2)',
  black3: 'rgba(0,0,0,0.3)',
  black4: 'rgba(0,0,0,0.4)',
  black5: 'rgba(0,0,0,0.5)',
  black6: 'rgba(0,0,0,0.6)',
  black7: 'rgba(0,0,0,0.7)',
  black8: 'rgba(0,0,0,0.8)',
  black9: 'rgba(0,0,0,0.9)',

  grayBlur: '#B3B3B3',
  textColor: '#333',
  textColorSecondary: '#3F4A59',
  green: '#2faa33',
  gray: '#808080',
  green4: 'rgba(47,170,51,0.4)',
  error: '#c0392b',
  brightRed: '#e00606',
  deepCove: '#130f40',
  background: '#E5E5E5',
  background2: '#f7f7f5',

  darkModeTextColor: 'black',
  transparent: 'transparent',
  main: '#2b7ef6',
  overlay: 'rgba(0,0,0,0.5)',
  button: 'rgb(0,122,255)',
  disabledButton: '#B5B5B5',

  silver: '#c0c0c0',
  placeholderTextColor: '#C7C7CD',
  skyBlue: 'rgb(103,173,201)',
  skyBlue5: 'rgba(103,173,201,0.5)',
};

const variants = {
  h1: normalize(28),
  h2: normalize(24),
  h3: normalize(20),
  h4: normalize(18),
  title: normalize(16),
  normal: normalize(14),
  subTitle: normalize(12),
  caption: normalize(10),
};

enum durations {
  short = 200,
  normal = 400,
  long = 600,
}

const configs = {
  user: 'user',
  unit: 'unit',
  branch: 'branch',
  qr: 'qr',
};

const events = {
  showOverlay: 'show-overlay',
  showDialog: 'show-dialog',
  dismissOverlay: 'dismiss-overlay',
  dismissDialog: 'dismiss-dialog',
};

export {
  constants,
  colors,
  variants,
  configs,
  events,
  durations,
  FeatureStatus,
  FeatureType,
};
