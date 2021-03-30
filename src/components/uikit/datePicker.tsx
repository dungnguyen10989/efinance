import React, {
  ComponentType,
  FC,
  memo,
  useCallback,
  useMemo,
  useState,
} from 'react';
import {
  Platform,
  View,
  StyleSheet,
  Modal,
  StyleProp,
  TextStyle,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import DateTimePicker, {
  IOSNativeProps,
  AndroidNativeProps,
} from '@react-native-community/datetimepicker';
import moment from 'moment';
import Touchable from './touchable';
import Text from './text';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { variants, colors, constants } from '@values';

type DatePickerProps = Omit<IOSNativeProps, 'value'> &
  Omit<AndroidNativeProps, 'value'>;

export interface IDatePickerProps extends DatePickerProps {
  caretSize?: number;
  iconStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

interface State {
  visible?: boolean;
}

const FuncComponent: FC<IDatePickerProps> = memo((props) => {
  const [visible, setVisible] = useState(false);
  const { onChange, date, iconStyle, labelStyle, style, ...rest } = props;

  const _onChange = useCallback(
    (e: any, value: Date | undefined) => {
      onChange?.(e, value);
      setVisible(false);
    },
    [onChange],
  );

  const renderPicker = useMemo(() => {
    return (
      <DateTimePicker
        {...rest}
        onChange={_onChange}
        style={undefined}
        value={date || new Date()}
        locale="vi-VN"
        display="inline"
      />
    );
  }, [date, rest, _onChange]);

  const openPicker = useCallback(() => {
    setVisible(false);
    Keyboard.dismiss();
  }, []);

  const closePicker = useCallback(() => setVisible(false), []);

  const generateText = useMemo(() => {
    if (!date) {
      return '';
    }
    try {
      return moment(date)?.format('DD-MM-YYYY');
    } catch (error) {
      return '';
    }
  }, [date]);

  return (
    <View style={style}>
      <Touchable onPress={openPicker} style={styles.wrapper}>
        <FontAwesome name="calendar" style={[styles.calendar, iconStyle]} />
        <Text style={[styles.text, labelStyle]}>{generateText}</Text>
      </Touchable>

      {Platform.OS === 'ios' ? (
        <Modal visible={visible} transparent animationType="fade">
          <TouchableWithoutFeedback onPress={closePicker}>
            <View style={styles.modal}>
              <View style={styles.content}>{renderPicker}</View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      ) : (
        renderPicker
      )}
    </View>
  );
});

(FuncComponent as ComponentType<IDatePickerProps>).defaultProps = {
  caretSize: variants.normal,
};

export default FuncComponent;

export const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
  },
  content: {
    padding: constants.halfPadding,
    margin: constants.dfPadding,
    backgroundColor: colors.white,
    borderRadius: 2,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginHorizontal: constants.halfPadding,
  },
  calendar: {
    fontSize: variants.h4,
    color: colors.primaryBlue,
  },
});
