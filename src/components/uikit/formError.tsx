import React, { ComponentType, memo } from 'react';
import {
  StyleSheet,
  StyleProp,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Svg, { Path, G, Circle } from 'react-native-svg';
import Text from './text';

import { colors, constants } from '@values';

interface Props {
  message?: any;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  color?: string;
  size?: number;
}

const FuncComponent = memo((props: Props) => {
  const { message, style, size = 16, textStyle, color } = props;
  if (!message) {
    return null;
  }
  return (
    <View style={[styles.wrapper, style]}>
      <Svg width={size} height={size} viewBox="0 0 32 32">
        <G>
          <G id="Error_1_">
            <G id="Error">
              <Circle cx="16" cy="16" id="BG" r="16" fill="#D72828" />
              <Path
                d="M14.5,25h3v-3h-3V25z M14.5,6v13h3V6H14.5z"
                id="Exclamatory_x5F_Sign"
                fill="#E6E6E6"
              />
            </G>
          </G>
        </G>
      </Svg>

      <Text numberOfLines={2} style={[styles.text, textStyle]} color={color}>
        {'  '}
        {`${message}`}
      </Text>
    </View>
  );
});

(FuncComponent as ComponentType<Props>).defaultProps = {
  color: colors.error,
};

export default FuncComponent;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    paddingVertical: constants.dfPadding / 2,
  },
  text: {
    flexWrap: 'wrap',
    flexShrink: 1,
    fontSize: 12,
  },
  icon: {
    width: 16,
    height: 16,
  },
});
