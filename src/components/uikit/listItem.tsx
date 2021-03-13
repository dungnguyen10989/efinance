import React, { memo, useMemo } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
  View,
} from 'react-native';
import { ImageStyle } from 'react-native-fast-image';
import Touchable from './touchable';
import Image from './fastImage';
import Text from './text';

import { colors, constants, variants } from '@values';
import { isString } from 'lodash';
import { assets } from '@assets';

const size = 60;

interface Props {
  onPress?: () => void;
  title?: string;
  subTitle?: string;
  caption?: string;
  source?: number | string;
  containerStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ImageStyle>;
  rightComponent?: JSX.Element;
  borderBottomWidth?: number;
  borderTopWidth?: number;
  borderColor?: string;
  titleStyle?: StyleProp<TextStyle>;
  subTitleStyle?: StyleProp<TextStyle>;
  captionStyle?: StyleProp<TextStyle>;
  centerStyle?: StyleProp<ViewStyle>;
  withSandWatch?: boolean;
}

const FuncComponent = memo((props: Props) => {
  const {
    onPress,
    title,
    subTitle,
    caption,
    source,
    containerStyle,
    iconStyle,
    rightComponent,
    borderColor,
    borderBottomWidth,
    borderTopWidth,
    titleStyle,
    subTitleStyle,
    captionStyle,
    centerStyle,
    withSandWatch,
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
        <Image
          source={
            isString(source)
              ? { uri: source }
              : source ?? assets.icon.ic_sand_watch
          }
          style={[styles.icon, iconStyle]}
          withSandWatch={withSandWatch}
        />
        <View style={[styles.center, centerStyle]}>
          <Text style={[styles.title, titleStyle]} numberOfLines={1}>
            {title}
          </Text>
          {subTitle ? (
            <Text style={[styles.subTitle, subTitleStyle]} numberOfLines={1}>
              {subTitle}
            </Text>
          ) : null}
          {caption ? (
            <Text style={[styles.caption, captionStyle]} numberOfLines={1}>
              {caption}
            </Text>
          ) : null}
        </View>
        {rightComponent}
      </View>
    ),
    [
      source,
      title,
      subTitle,
      caption,
      titleStyle,
      subTitleStyle,
      captionStyle,
      containerStyle,
      borderStyle,
      rightComponent,
      iconStyle,
      centerStyle,
      withSandWatch,
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
};

export default FuncComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingVertical: constants.halfPadding,
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
    borderRadius: 5,
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
  caption: {
    fontSize: variants.caption,
    color: colors.silver,
  },
});
