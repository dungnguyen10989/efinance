import React, {
  ComponentType,
  memo,
  PropsWithChildren,
  useRef,
  MutableRefObject,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { Platform, View, StyleSheet, StyleProp, TextStyle } from 'react-native';
import { Modalize } from 'react-native-modalize';
import commonStyles from './styles';
import Text from './text';
import Touchable from './touchable';

import { Picker } from '@react-native-picker/picker';
import {
  PickerProps,
  PickerItemProps,
  ItemValue,
} from '@react-native-picker/picker/typings/Picker';
import { isEqual } from 'lodash';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { variants, colors } from '@values';

export interface Props extends Partial<PickerProps> {
  items: PickerItemProps[];
  value?: any;
  itemKey?: string;
  caretSize?: number;
  labelStyle?: StyleProp<TextStyle>;
  labelContainerStyle?: StyleProp<TextStyle>;
}

export type IPickerSelectProps = PropsWithChildren<Props>;

const FuncComponent = memo((props: IPickerSelectProps) => {
  const modalRef = useRef<Modalize>() as MutableRefObject<Modalize>;

  const {
    items,
    value,
    caretSize,
    labelStyle,
    labelContainerStyle,
    style,
    ...rest
  } = props;

  const getSelectedItem = (params: {
    items: PickerItemProps[];
    value?: any;
  }) => {
    let idx = params.items.findIndex((item) => {
      return isEqual(item.value, params.value);
    });

    return {
      selectedItem: params.items[idx] || {},
      idx,
    };
  };

  const [selected, setSelected] = useState<PickerItemProps<ItemValue>>(
    getSelectedItem(props).selectedItem,
  );

  useEffect(() => {
    setSelected(getSelectedItem({ items, value }).selectedItem);
  }, [items, value]);

  const onValueChange = useCallback(
    (valueChanged: any, index: number) => {
      onValueChange?.(valueChanged, index);
      setSelected(items[index]);
    },
    [items],
  );

  const renderPickerItems = useMemo(
    () =>
      items.map((item: PickerItemProps, index: number) => (
        <Picker.Item
          key={`key.${index}`}
          label={item.label}
          value={item.value}
          color={item.color}
        />
      )),
    [items],
  );

  const openPicker = useCallback(() => modalRef.current?.open(), []);

  const renderIOSPicker = useMemo(() => {
    return (
      <View style={styles.viewContainer}>
        <Touchable onPress={openPicker}>
          <View
            pointerEvents="box-only"
            style={[labelContainerStyle, styles.labelContainer]}>
            <Text style={[labelStyle, commonStyles.flex1]}>
              {selected?.label}
            </Text>
            <FontAwesome name="caret-down" size={caretSize} />
          </View>
        </Touchable>

        <Modalize
          ref={modalRef}
          adjustToContentHeight
          closeOnOverlayTap
          handlePosition="inside"
          useNativeDriver
          withOverlay
          withHandle
          threshold={100}
          withReactModal>
          <Picker
            {...rest}
            onValueChange={onValueChange}
            selectedValue={selected?.value}
            style={[styles.picker, style]}>
            {renderPickerItems}
          </Picker>
        </Modalize>
      </View>
    );
  }, [
    renderPickerItems,
    caretSize,
    onValueChange,
    openPicker,
    labelContainerStyle,
    labelStyle,
    rest,
    style,
    selected?.label,
    selected?.value,
  ]);

  const renderAndroidPicker = useMemo(() => {
    return (
      <View style={styles.viewContainer}>
        <Picker
          {...rest}
          onValueChange={onValueChange}
          selectedValue={selected?.value}>
          {renderPickerItems}
        </Picker>
      </View>
    );
  }, [renderPickerItems, onValueChange, rest, selected?.value]);

  return Platform.OS === 'ios' ? renderIOSPicker : renderAndroidPicker;
});

(FuncComponent as ComponentType<IPickerSelectProps>).defaultProps = {
  value: undefined,
  enabled: true,
  itemKey: undefined,
  children: undefined,
  mode: 'dropdown',
  caretSize: variants.normal,
};

export default FuncComponent;

export const styles = StyleSheet.create({
  viewContainer: {
    alignSelf: 'stretch',
  },
  modal: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  picker: {
    backgroundColor: colors.white,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
