import React, {
  forwardRef,
  memo,
  useCallback,
  ComponentType,
  useMemo,
} from 'react';
import {
  TextInput,
  TextInputFocusEventData,
  NativeSyntheticEvent,
} from 'react-native';
import { FormikProps } from 'formik';
import { isEqual } from 'lodash';
import { colors } from '@values';

import FormError from './formError';
import TextField, { ITextFieldProps } from './textField';

export interface FormProps {
  formID: string;
  form: FormikProps<any>;
  withError?: boolean;
  errorColor?: string;
}

export interface Props extends ITextFieldProps, FormProps {}

const FuncComponent = forwardRef<TextInput, Props>((props, ref) => {
  const {
    formID,
    form,
    withError,
    errorColor,
    returnKeyType,
    autoFocus,
    onFocus,
    onBlur,
    ...rest
  } = props;

  const { handleBlur, setFieldTouched, validateOnChange } = form;

  const error = useMemo(
    () => (formID && form ? form?.errors[formID] : undefined),
    [formID, form],
  );

  const onChangeText = useCallback(
    (text: string) => {
      form.setFieldValue(formID, text, form.validateOnChange);
    },
    [form, formID],
  );

  const onLocalFocus = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      onFocus?.(e);
      setFieldTouched(formID, true, validateOnChange);
    },
    [formID, validateOnChange, setFieldTouched, onFocus],
  );

  const onLocalBlur = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      onBlur?.(e);
      handleBlur(formID)(e);
      setFieldTouched(formID, undefined, validateOnChange);
    },
    [formID, validateOnChange, onBlur, handleBlur, setFieldTouched],
  );

  return (
    <>
      <TextField
        {...rest}
        ref={ref}
        autoFocus={autoFocus}
        value={form.values[formID]}
        onChangeText={onChangeText}
        onFocus={onLocalFocus}
        onBlur={onLocalBlur}
      />
      {!!withError && (
        <FormError
          message={error as string}
          color={error ? errorColor : colors.transparent}
        />
      )}
    </>
  );
});

(FuncComponent as ComponentType<Props>).defaultProps = {
  withError: true,
  errorColor: colors.error,
};

export default memo(FuncComponent, (prev: Props, next: Props) => {
  if (next.form.touched[next.formID] !== prev.form.touched[prev.formID]) {
    return false;
  }
  if (!next.form.touched[next.formID]) {
    return true;
  }
  if (!isEqual(prev.form.values, next.form.values)) {
    return prev.form.values[prev.formID] === next.form.values[next.formID];
  }
  if (!isEqual(prev.form.errors, next.form.errors)) {
    return prev.form.errors[prev.formID] === next.form.errors[next.formID];
  }
  return false;
});
