import React, { memo, PropsWithChildren } from 'react';
import {
  TouchableOpacityProps,
  StyleSheet,
  TextStyle,
  StyleProp,
} from 'react-native';
import { IModifiersTest } from 'custom-ui-kit';
import Text from './text';
import Touchable from './touchable';

export interface Props extends TouchableOpacityProps, IModifiersTest {
  textStyle?: StyleProp<TextStyle>;
  title?: string;
}

const FuncComponent = memo((props: PropsWithChildren<Props>) => {
  const { textStyle, style, title, ...rest } = props;

  return (
    <Touchable {...rest} style={[styles.wrapper, style]}>
      <Text style={textStyle}>{title}</Text>
    </Touchable>
  );
});

export default FuncComponent;

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    paddingVertical: 2,
  },
});
