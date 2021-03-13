import { PixelRatio, Dimensions } from 'react-native';

const pixelRatio = PixelRatio.get();
const { height: deviceHeight, width: deviceWidth } = Dimensions.get('window');

export const normalize = (size: number, factor = 1): number => {
  return size;
  // if (pixelRatio >= 2 && pixelRatio < 3) {
  //   // iphone 5s and older Androids
  //   if (deviceWidth < 360) {
  //     return factor * (size - 0.5);
  //   }

  //   // iphone 5
  //   if (deviceHeight < 667) {
  //     return size * factor;
  //     // iphone 6-6s
  //   }

  //   if (deviceHeight >= 667 && deviceHeight <= 735) {
  //     return factor * (size + 0.5);
  //   }
  //   // older phablets
  //   return factor * (size + 1);
  // }

  // if (pixelRatio >= 3 && pixelRatio < 3.5) {
  //   // catch Android font scaling on small machines
  //   // where pixel ratio / font scale ratio => 3:3
  //   if (deviceWidth <= 360) {
  //     return factor * size;
  //   }

  //   // Catch other weird android width sizings
  //   if (deviceHeight < 667) {
  //     return factor * (size + 0.5);
  //     // catch in-between size Androids and scale font up
  //     // a tad but not too much
  //   }

  //   if (deviceHeight >= 667 && deviceHeight <= 735) {
  //     return factor * (size + 1);
  //   }

  //   // catch larger devices
  //   // ie iphone 6s plus / 7 plus / mi note 等等
  //   return factor * (size + 1.5);
  // }

  // if (pixelRatio >= 3.5) {
  //   // catch Android font scaling on small machines
  //   // where pixel ratio / font scale ratio => 3:3
  //   if (deviceWidth <= 360) {
  //     return factor * size;
  //     // Catch other smaller android height sizings
  //   }

  //   if (deviceHeight < 667) {
  //     return factor * (size + 1);
  //     // catch in-between size Androids and scale font up
  //     // a tad but not too much
  //   }

  //   if (deviceHeight >= 667 && deviceHeight <= 735) {
  //     return factor * (size + 1.5);
  //   }

  //   // catch larger phablet devices
  //   return factor * (size + 2);
  // }

  // return factor * size;
};
