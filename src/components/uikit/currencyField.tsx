import { colors, constants } from '@values';
import React, { forwardRef, memo } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import TextField from './textField';
import { FormikProps } from 'formik';

const formatNumber = (input: number, options?: any) => {
  const {
    precision,
    separator = ',',
    delimiter = '.',
    unit = '',
    ignoreNegative,
  } = options || {};

  const negative = ignoreNegative ? false : input < 0;
  const sign = negative ? '-' : '';

  const string = Math.abs(input).toFixed(precision);

  const parts = string.split('.');
  const buffer = [];

  let number = parts[0];
  while (number.length > 0) {
    buffer.unshift(number.substr(Math.max(0, number.length - 3), 3));
    number = number.substr(0, number.length - 3);
  }

  let formattedNumber = '';
  formattedNumber = buffer.join(delimiter);

  const decimals = parts[1];
  if (!!precision && decimals) {
    formattedNumber += separator + decimals;
  }

  formattedNumber = `${unit} ${sign}${formattedNumber}`;

  return formattedNumber;
};

export interface CurrencyFieldProps extends Omit<TextInputProps, 'value'> {
  delimiter?: string;
  ignoreNegative?: boolean;
  maxValue?: number;
  minValue?: number;
  onChangeValue?(value: number | null): void;
  precision?: number;
  separator?: string;
  unit?: string;
  value: number | null;
  formID?: string;
  form?: FormikProps<any>;
}

const FuncComponent = memo(
  forwardRef<TextInput, CurrencyFieldProps>((props, ref) => {
    const {
      value,
      onChangeText,
      onChangeValue,
      separator,
      delimiter,
      unit = '',
      precision = 2,
      maxValue,
      minValue,
      ignoreNegative,
      form,
      formID,
      ...rest
    } = props;

    const [startNegative, setStartNegative] = React.useState(false);

    const formattedValue = React.useMemo(() => {
      if (!!value || value === 0 || value === -0) {
        return formatNumber(value, {
          separator,
          unit,
          precision,
          delimiter,
          ignoreNegative: !!ignoreNegative,
        });
      } else {
        return '';
      }
    }, [delimiter, ignoreNegative, precision, separator, unit, value]);

    React.useEffect(() => onChangeText?.(formattedValue), [
      onChangeText,
      formattedValue,
    ]);

    const handleChangeText = React.useCallback(
      (text: string) => {
        const textWithoutUnit = text.replace(unit, '');

        // Allow starting with a minus sign
        if (/^(-|-0)$/.test(textWithoutUnit) && !ignoreNegative) {
          setStartNegative(true);
          onChangeText && onChangeText(unit + '-');
          return;
        } else {
          setStartNegative(false);
        }

        const negative = textWithoutUnit.charAt(0) === '-';

        const textNumericValue = text.replace(/\D+/g, '');

        const numberValue = Number(textNumericValue) * (negative ? -1 : 1);

        const zerosOnValue = textNumericValue.replace(/[^0]/g, '').length;

        let newValue: number | null;

        if (!textNumericValue || (!numberValue && zerosOnValue === precision)) {
          // Allow to clean the value instead of beign 0
          newValue = null;
        } else {
          newValue = numberValue / 10 ** precision;
        }

        if (newValue && maxValue && newValue > maxValue) {
          return;
        } else if (newValue && minValue && newValue < minValue) {
          return;
        }

        onChangeValue?.(newValue);
        form?.setFieldValue(formID as any, newValue, form?.validateOnChange);
      },
      [
        unit,
        ignoreNegative,
        precision,
        maxValue,
        minValue,
        onChangeValue,
        onChangeText,
        form,
        formID,
      ],
    );

    return (
      <TextField
        value={startNegative ? unit + '-' : formattedValue}
        onChangeText={handleChangeText}
        keyboardType="numeric"
        {...rest}
        ref={ref}
      />
    );
  }),
);

(FuncComponent as React.ComponentType<CurrencyFieldProps>).defaultProps = {
  unit: '₫',
  maxLength: 19,
  placeholderTextColor: colors.gray,
  clearButtonMode: 'never',
  underlineColorAndroid: colors.transparent,
  maxValue: constants.maxCurrency,
};

export default FuncComponent;
