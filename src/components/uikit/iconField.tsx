import React, { forwardRef, memo } from 'react';
import { StyleProp, StyleSheet, ViewStyle, TextInput } from 'react-native';
import { isNumber } from 'lodash/fp';
import { colors, constants } from '@values';
import FastImage from './fastImage';
import View from './view';
import FormField, { FormProps } from './formField';
import { ImageStyle } from 'react-native-fast-image';
import { ITextFieldProps } from './textField';

interface Props extends FormProps, ITextFieldProps {
  iconSource: string | number;
  iconStyle?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

const FuncComponent = memo(
  forwardRef<TextInput, Props>((props, ref) => {
    const { iconSource: source, iconStyle, containerStyle, ...rest } = props;
    return (
      <View style={[styles.container, containerStyle]}>
        <FastImage
          source={isNumber(source) ? source : { uri: source }}
          style={[styles.icon, iconStyle]}
          tintColor={colors.textColor}
        />
        <FormField
          {...rest}
          ref={ref as any}
          style={styles.input}
          borderWidth={0}
        />
      </View>
    );
  }),
);

export default FuncComponent;

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.silver,
    padding: constants.halfPadding,
  },
  icon: {
    width: 20,
    height: 20,
  },
  input: {
    flex: 1,
    marginLeft: constants.halfPadding,
  },
});
