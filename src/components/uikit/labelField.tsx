import React, { forwardRef, memo } from 'react';
import {
  StyleSheet,
  StyleProp,
  TextStyle,
  TextInput,
  View,
} from 'react-native';
import { colors, constants } from '@values';
import Touchable from './touchable';
import Text from './text';
import Image from './fastImage';
import TextField, { ITextFieldProps } from './textField';
import { assets } from '@assets';

interface Props extends ITextFieldProps {
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  onPress?: () => void;
}

const FuncComponent = memo(
  forwardRef<TextInput, Props>((props, ref) => {
    const { label, labelStyle, disabled, onPress, ...rest } = props;

    return (
      <View>
        <Text style={styles.label}>{label}</Text>
        <View style={disabled ? styles.disabled : undefined}>
          <TextField
            editable={!disabled}
            style={styles.container}
            {...rest}
            ref={ref}
            borderWidth={0}
          />
          {disabled ? (
            <View style={styles.lockWrapper}>
              <Image
                source={assets.icon.ic_lock}
                style={styles.lock}
                tintColor={colors.black7}
              />
            </View>
          ) : null}
          {typeof onPress === 'function' ? (
            <Touchable onPress={onPress} style={StyleSheet.absoluteFill} />
          ) : null}
        </View>
      </View>
    );
  }),
);

export default FuncComponent;

const styles = StyleSheet.create({
  label: {
    color: colors.black7,
    marginBottom: 5,
  },
  container: {
    borderWidth: 1,
    borderColor: colors.borders,
    borderRadius: 2,
    padding: constants.dfPadding,
  },
  disabled: {
    backgroundColor: colors.background,
  },
  lockWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: constants.dfPadding,
  },
  lock: {
    width: 20,
    height: 20,
  },
});
