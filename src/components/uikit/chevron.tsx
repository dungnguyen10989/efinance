import React, { ComponentType, memo, useMemo } from 'react';
import {
  ViewStyle,
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { getOr } from 'lodash/fp';

import { variants, colors } from '@values';

export interface IChevronProps {
  direction?: 'up' | 'down' | 'right' | 'left';
  size?: number;
  thickness?: number;
  color?: string;
  onPress?: (e: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
}

const FuncComponent = memo((props: IChevronProps) => {
  const { direction, size, thickness, color, onPress, style } = props;

  const rotate =
    direction === 'up'
      ? '-45deg'
      : direction === 'right'
      ? '45deg'
      : direction === 'down'
      ? '135deg'
      : '-135deg';

  const _style: ViewStyle = useMemo(() => {
    const transform = getOr([], 'transform', StyleSheet.flatten([style]));

    return StyleSheet.flatten([
      style,
      {
        width: size,
        height: size,
        borderTopWidth: thickness,
        borderRightWidth: thickness,
        borderColor: color,
        backgroundColor: colors.transparent,
        transform: [...transform, { rotate }],
      },
    ]);
  }, [color, rotate, size, style, thickness]);

  return typeof onPress === 'function' ? (
    <TouchableOpacity onPress={onPress} style={_style} />
  ) : (
    <View style={_style} />
  );
});

(FuncComponent as ComponentType<IChevronProps>).defaultProps = {
  size: variants.caption,
  thickness: 1,
  color: colors.gray,
  direction: 'right',
};

export default FuncComponent;
