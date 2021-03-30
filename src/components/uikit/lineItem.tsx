import React, { memo, useMemo } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
  View,
} from 'react-native';
import Touchable from './touchable';
import Image from './fastImage';
import Text from './text';
import Chevron from './chevron';

import { colors, constants, variants } from '@values';
import { isString } from 'lodash';
import { assets } from '@assets';
import VectorIcons, { VectorIconProvider } from './vectorIcons';

const size = 20;

interface Props {
  onPress?: () => void;
  title?: string;
  subTitle?: string;
  iconName?: string;
  iconProvider?: VectorIconProvider;
  iconStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  chevronSize?: number;
  chevronColor?: string;
  chevronThickness?: number;
  chevronStyle?: StyleProp<ViewStyle>;
  withChevron?: boolean;
  rightComponent?: JSX.Element;
  borderBottomWidth?: number;
  borderTopWidth?: number;
  borderColor?: string;
  titleStyle?: StyleProp<TextStyle>;
  subTitleStyle?: StyleProp<TextStyle>;
}

const FuncComponent = memo((props: Props) => {
  const {
    onPress,
    title,
    subTitle,
    iconName = '',
    iconStyle,
    iconProvider,
    containerStyle,
    chevronSize,
    chevronColor,
    chevronThickness,
    chevronStyle,
    withChevron,
    rightComponent,
    borderColor,
    borderBottomWidth,
    borderTopWidth,
    titleStyle,
    subTitleStyle,
  } = props;

  const borderStyle = useMemo(
    () => ({
      borderBottomWidth,
      borderTopWidth,
      borderColor,
    }),
    [borderBottomWidth, borderTopWidth, borderColor],
  );

  const children = useMemo(
    () => (
      <View style={[styles.container, containerStyle, borderStyle]}>
        <VectorIcons
          name={iconName}
          provider={iconProvider}
          style={iconStyle}
        />
        <View style={styles.center}>
          <Text style={[styles.title, titleStyle]} numberOfLines={2}>
            {title}
          </Text>
          {subTitle ? (
            <Text style={[styles.subTitle, subTitleStyle]} numberOfLines={2}>
              {subTitle}
            </Text>
          ) : null}
        </View>
        {rightComponent ? (
          rightComponent
        ) : withChevron ? (
          <Chevron
            direction="right"
            size={chevronSize}
            thickness={chevronThickness}
            style={chevronStyle}
            color={chevronColor}
          />
        ) : null}
      </View>
    ),
    [
      containerStyle,
      title,
      subTitle,
      titleStyle,
      subTitleStyle,
      rightComponent,
      withChevron,
      chevronSize,
      chevronThickness,
      chevronStyle,
      chevronColor,
      iconStyle,
      borderStyle,
      iconName,
      iconProvider,
    ],
  );

  return typeof onPress === 'function' ? (
    <Touchable onPress={onPress}>{children}</Touchable>
  ) : (
    children
  );
});

(FuncComponent as React.ComponentType<Props>).defaultProps = {
  borderBottomWidth: 1,
  borderColor: colors.silver,
  chevronSize: 12,
  chevronThickness: 2,
  withChevron: true,
};

export default FuncComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: constants.dfPadding,
    backgroundColor: colors.background2,
  },
  flex: {
    flex: 1,
  },
  padding: {
    padding: constants.dfPadding,
  },
  icon: {
    width: size,
    height: size,
  },
  center: {
    flex: 1,
    justifyContent: 'space-around',
    marginHorizontal: constants.dfPadding,
  },
  title: {
    fontSize: variants.title,
    color: colors.textColor,
  },
  subTitle: {
    fontSize: variants.subTitle,
    color: colors.gray,
  },
});
