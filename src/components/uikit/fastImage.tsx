import React, { ComponentType, memo, useMemo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import FastImage, { FastImageProps } from 'react-native-fast-image';
import {
  IModifiersTest,
  IModifiersSpacing,
  IModifiersLayout,
  IModifiersStyling,
} from 'custom-ui-kit';
import { isNumber } from 'lodash';
import { useDestructProps } from './helper';
import Touchable from './touchable';
import { assets } from '@assets';

interface IImageProps
  extends FastImageProps,
    IModifiersSpacing,
    IModifiersStyling,
    IModifiersLayout,
    IModifiersTest {
  size?: number | [number, number];
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  withSandWatch?: boolean;
}

const FuncComponent = memo((props: IImageProps) => {
  const {
    style,
    size,
    onPress,
    containerStyle,
    source,
    withSandWatch,
    resizeMode,
    ...rest
  } = props;

  const { dProps, dStyles } = useDestructProps(rest);

  const enhanceSize = Array.isArray(size)
    ? { width: size[0], height: size[1] }
    : isNumber(size)
    ? { width: size, height: size }
    : undefined;
  const enhanceStyle = Object.assign({}, style, dStyles, enhanceSize);

  const dSource = useMemo(
    () =>
      !withSandWatch
        ? source
        : typeof source === 'number'
        ? source
        : source.uri
        ? source
        : assets.icon.ic_sand_watch,
    [source, withSandWatch],
  );

  const rsm = useMemo(
    () => (dSource === assets.icon.ic_sand_watch ? 'contain' : resizeMode),
    [resizeMode, dSource],
  );

  const comp = (
    <FastImage
      {...dProps}
      style={enhanceStyle}
      source={dSource}
      resizeMode={rsm}
    />
  );

  return typeof onPress === 'function' ? (
    <Touchable onPress={onPress} style={containerStyle}>
      {comp}
    </Touchable>
  ) : (
    comp
  );
});

(FuncComponent as ComponentType<IImageProps>).defaultProps = {
  resizeMode: 'cover',
  withSandWatch: true,
};

export default FuncComponent;
