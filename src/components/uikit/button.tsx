import React, {
  ComponentType,
  memo,
  PropsWithChildren,
  useCallback,
} from 'react';
import {
  TouchableOpacityProps,
  StyleSheet,
  ActivityIndicator,
  GestureResponderEvent,
  TextStyle,
  StyleProp,
  TouchableOpacity,
  Text,
} from 'react-native';
import { IModifiersTest } from 'custom-ui-kit';

import { colors, constants } from '@values';

export interface Props extends TouchableOpacityProps, IModifiersTest {
  textStyle?: StyleProp<TextStyle>;
  title?: string;
  loading?: boolean;
  indicatorColor?: string;
  indicatorSize?: 'large' | 'small';
  disabledBg?: string;
  disabledColor?: string;
}

const FuncComponent = memo((props: PropsWithChildren<Props>) => {
  const {
    textStyle,
    style,
    title,
    loading,
    indicatorColor,
    indicatorSize,
    disabledBg,
    disabledColor,
    onPress,
    disabled,
    ...rest
  } = props;

  const _onPress = useCallback(
    (e: GestureResponderEvent) => {
      !loading && onPress?.(e);
    },
    [loading, onPress],
  );

  return (
    <TouchableOpacity
      {...rest}
      onPress={_onPress}
      disabled={disabled}
      style={[styles.wrapper, style]}>
      {loading ? (
        <ActivityIndicator size={indicatorSize} color={indicatorColor} />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
});

(FuncComponent as ComponentType<Props>).defaultProps = {
  indicatorSize: 'small',
  disabledBg: colors.gray,
  disabledColor: colors.white,
  indicatorColor: colors.white,
};

export default FuncComponent;

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    paddingVertical: constants.halfPadding,
  },
  absolute: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  textW: {
    zIndex: 0,
  },
  transparent: {
    opacity: 0,
  },
});
