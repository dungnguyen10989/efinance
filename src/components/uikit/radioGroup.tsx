import React, {
  ComponentType,
  memo,
  useCallback,
  useMemo,
  useState,
} from 'react';
import {
  StyleSheet,
  TextStyle,
  ViewStyle,
  ListRenderItemInfo,
  StyleProp,
  FlatListProps,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { constants, colors, durations } from '@values';

import Text from './text';
import View from './view';
import Divider from './divider';

export interface Props {
  label: string;
  data?: any;
}
interface IRadioButtonsProps extends Partial<FlatListProps<any>> {
  data: Props[];
  onChanged?: (index: number, data?: Props) => void;
  initialIndex?: number;
  activeColor?: string;
  inactiveColor?: string;
  iconSize?: number;
  disabled?: boolean;
  labelStyle?: StyleProp<TextStyle>;
  itemStyle?: StyleProp<ViewStyle>;
  separatorStyle?: StyleProp<ViewStyle>;
  spacing?: number;
}
const size = 20;
const Icon = Animatable.createAnimatableComponent(Ionicons);

const RadioButton = memo(
  (props: { active?: boolean; color?: string; spacing?: number }) => {
    const { active, color, spacing } = props;
    return (
      <View marginR={spacing || 5}>
        <Icon
          size={size}
          color={color}
          name={`${constants.iconPrefix}radio-button-off`}
          duration={durations.short}
          animation={active ? 'fadeOut' : 'fadeIn'}
        />

        <Icon
          size={size}
          color={color}
          name={`${constants.iconPrefix}radio-button-on`}
          style={StyleSheet.absoluteFill}
          duration={durations.short}
          animation={active ? 'zoomIn' : 'zoomOut'}
        />
      </View>
    );
  },
);

const FuncComponent = memo((props: IRadioButtonsProps) => {
  const {
    onChanged,
    separatorStyle,
    iconSize,
    data,
    itemStyle,
    disabled,
    activeColor,
    inactiveColor,
    spacing,
    labelStyle,
    initialIndex,
    ...rest
  } = props;
  const [selected, setSelected] = useState(initialIndex || 0);

  const onPress = useCallback(
    (index: number, item?: Props) => {
      setSelected(index);
      onChanged?.(index, item);
    },
    [onChanged],
  );

  const renderSeparator = useMemo(() => {
    const style = [separatorStyle, { marginLeft: iconSize || size }];
    return <Divider style={style} />;
  }, [separatorStyle, iconSize]);

  const keyExtractor = useCallback(
    (_: any, _index: number) => `key-${_index}`,
    [],
  );

  const renderIRadioItem = useCallback(
    (info: ListRenderItemInfo<Props>) => {
      const { item, index } = info;
      const active = selected === index;
      const len = data.length;
      return (
        <>
          <TouchableOpacity
            style={[styles.wrapper, itemStyle]}
            onPress={onPress.bind(this, index, item)}
            disabled={disabled}>
            <RadioButton
              active={active}
              color={active ? activeColor : inactiveColor}
              spacing={spacing}
            />

            <Text
              style={labelStyle}
              color={active ? activeColor : inactiveColor}>
              {item.label}
            </Text>
          </TouchableOpacity>
          {index < len - 1 ? renderSeparator : null}
        </>
      );
    },
    [
      activeColor,
      inactiveColor,
      labelStyle,
      itemStyle,
      selected,
      onPress,
      disabled,
      renderSeparator,
      spacing,
      data.length,
    ],
  );

  return (
    <FlatList
      {...rest}
      data={data}
      extraData={selected}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      bounces={false}
      keyExtractor={keyExtractor}
      renderItem={renderIRadioItem}
    />
  );
});

(FuncComponent as ComponentType<IRadioButtonsProps>).defaultProps = {
  activeColor: colors.textColor,
  inactiveColor: colors.grayBlur,
  horizontal: false,
};

export default FuncComponent;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
});
