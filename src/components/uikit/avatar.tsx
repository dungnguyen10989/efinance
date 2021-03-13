import React, { ComponentType, memo } from 'react';
import {
  StyleSheet,
  LayoutChangeEvent,
  StyleProp,
  ViewStyle,
  GestureResponderEvent,
} from 'react-native';
import FastImage, {
  Source,
  OnLoadEvent,
  OnProgressEvent,
  ImageStyle,
} from 'react-native-fast-image';
import Touchable from './touchable';
import { IModifiersTest } from 'custom-ui-kit';
import { colors } from '@values';

const defaultSize = 50;

export interface Props extends IModifiersTest {
  source: Source | number;
  size?: number;
  borderWidth?: number;
  borderColor?: string;
  style?: StyleProp<ImageStyle>;
  tintColor?: number | string;
  fallback?: boolean;
  containerStyle?: ViewStyle;

  onPress?: (e: GestureResponderEvent) => void | undefined;
  onLoadStart?(): void;
  onProgress?(event: OnProgressEvent): void;
  onLoad?(event: OnLoadEvent): void;
  onError?(): void;
  onLoadEnd?(): void;
  onLayout?: (event: LayoutChangeEvent) => void;
}

const FuncComponent = memo((Props: Props) => {
  const {
    containerStyle,
    size,
    borderColor,
    borderWidth,
    onPress,
    style,
    ...rest
  } = Props;
  const _size = size || defaultSize;

  const _style: StyleProp<ViewStyle> = {
    width: _size,
    height: _size,
    borderRadius: _size / 2,
    borderColor,
    borderWidth,
    overflow: 'hidden',
  };

  return (
    <Touchable
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      style={[containerStyle, _style]}>
      <FastImage {...rest} style={[styles.image, style]} />
    </Touchable>
  );
});

(FuncComponent as ComponentType<Props>).defaultProps = {
  size: defaultSize,
  borderWidth: 3,
  borderColor: colors.white,
};

export default FuncComponent;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
});
