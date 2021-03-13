import React, {
  forwardRef,
  memo,
  MutableRefObject,
  useCallback,
  RefObject,
  ComponentType,
  useMemo,
} from 'react';
import {
  TextInput,
  TextInputProps,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
} from 'react-native';
import {
  IModifiersSpacing,
  IModifiersStyling,
  IModifiersText,
  IModifiersLayout,
  IModifiersTest,
} from 'custom-ui-kit';
import { colors } from '@values';
import { useDestructProps } from './helper';

interface Props {
  borderWidth?: number;
  borderColor?: string;
  nextRef?: RefObject<TextInput> | MutableRefObject<TextInput>;
}

export interface ITextFieldProps
  extends TextInputProps,
    IModifiersSpacing,
    IModifiersStyling,
    IModifiersText,
    IModifiersLayout,
    IModifiersTest,
    Props {}

const FuncComponent = memo(
  forwardRef<TextInput, ITextFieldProps>((props, ref) => {
    const { dProps, dStyles } = useDestructProps(props);
    const {
      borderWidth,
      borderColor,
      nextRef,
      returnKeyType,
      value,
      onSubmitEditing,
      ...rest
    } = dProps;

    const borderStyle = useMemo(
      () => ({
        borderBottomWidth: borderWidth,
        borderBottomColor: borderColor,
      }),
      [borderWidth, borderColor],
    );

    const _onSubmitEditing = useCallback(
      (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
        nextRef?.current?.focus();
        onSubmitEditing?.(e);
      },
      [nextRef, onSubmitEditing],
    );

    return (
      <TextInput
        {...rest}
        value={value ? `${value}` : ''}
        ref={ref}
        style={[dStyles, borderStyle]}
        returnKeyType={nextRef && nextRef.current ? 'next' : returnKeyType}
        onSubmitEditing={_onSubmitEditing}
      />
    );
  }),
);

(FuncComponent as ComponentType<ITextFieldProps>).defaultProps = {
  borderColor: colors.silver,
  borderWidth: 0,
  placeholderTextColor: colors.gray,
  clearButtonMode: 'while-editing',
  underlineColorAndroid: colors.transparent,
};

export default FuncComponent;
