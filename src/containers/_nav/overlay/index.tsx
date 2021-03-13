import React, { memo } from 'react';
import LottieView from 'lottie-react-native';
import { StyleSheet, Text, View, Image } from 'react-native';
import { IOverlay } from 'screen-props';
import { assets } from '@assets';
import { colors, constants, variants } from '@values';

interface Props extends IOverlay {}

export default memo((props: Props) => {
  const { style, img, label } = props || {};

  return (
    <View style={styles.container}>
      <View style={styles.spinnerWrapper}>
        <LottieView
          source={assets.lottie.spinner}
          autoPlay
          loop
          style={[StyleSheet.absoluteFill, style]}
        />
        {img ? <Image source={img} style={styles.img} /> : null}
      </View>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
});

const size = Math.min(constants.width, constants.height) / 4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.overlay,
  },
  spinnerWrapper: {
    width: size,
    height: size,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: size / 2,
    height: size / 2,
  },
  label: {
    color: colors.white,
    textAlign: 'center',
    fontSize: variants.title,
  },
});
