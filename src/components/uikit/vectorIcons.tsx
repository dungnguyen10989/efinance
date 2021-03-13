import React, { ComponentType, memo, useMemo } from 'react';
import {
  TouchableOpacity,
  GestureResponderEvent,
  StyleSheet,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';
import { IModifiersTest } from 'custom-ui-kit';

import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Zocial from 'react-native-vector-icons/Zocial';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { View } from 'react-native-animatable';
import { colors } from '@values';

interface IIcon {
  name: string;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle | TextStyle>;
}

export type VectorIconProvider =
  | 'Entypo'
  | 'EvilsIcons'
  | 'Feather'
  | 'FontAwesome'
  | 'Foundation'
  | 'Ionicons'
  | 'MaterialIcons'
  | 'MaterialCommunityIcons'
  | 'Octicons'
  | 'Zocial'
  | 'SimpleLineIcons';

interface IVectorProps extends IIcon, IModifiersTest {
  provider?: VectorIconProvider;
  containerStyle?: StyleProp<ViewStyle>; // only with props onPress

  onPress?: (event: GestureResponderEvent) => any;
  getImageSource?: (
    name: string,
    size?: number,
    color?: string,
  ) => Promise<any>;
  getRawGlyphMap?: () => { [name: string]: number };
  loadFont?: (file?: string) => Promise<void>;
  hasIcon?: (name: string) => boolean;
}

const genProvider = (provider?: VectorIconProvider) => {
  switch (provider) {
    case 'Entypo':
      return Entypo;
    case 'EvilsIcons':
      return EvilIcons;
    case 'Feather':
      return Feather;
    case 'FontAwesome':
      return FontAwesome;
    case 'Foundation':
      return Foundation;
    case 'SimpleLineIcons':
      return SimpleLineIcons;
    case 'MaterialIcons':
      return MaterialIcons;
    case 'MaterialCommunityIcons':
      return MaterialCommunityIcons;
    case 'Octicons':
      return Octicons;
    case 'Zocial':
      return Zocial;
    default:
      return Ionicons;
  }
};

const FuncComponent = memo((props: IVectorProps) => {
  const {
    style,
    containerStyle,
    name,
    color,
    size,
    onPress,
    provider,
    ...rest
  } = props;

  const Icon = useMemo(() => genProvider(provider), [provider]);

  if (onPress) {
    return (
      <TouchableOpacity
        {...rest}
        style={[styles.wrapper, containerStyle]}
        onPress={onPress}>
        <Icon style={style} name={name} color={color} size={size} />
      </TouchableOpacity>
    );
  }

  if (containerStyle) {
    return (
      <View {...rest} style={[styles.wrapper, containerStyle]}>
        <Icon style={style} name={name} color={color} size={size} />
      </View>
    );
  }

  return <Icon style={style} name={name} color={color} size={size} />;
});

(FuncComponent as ComponentType<IVectorProps>).defaultProps = {
  provider: 'Ionicons',
  name: 'ios-search',
  color: colors.textColor,
};

export default FuncComponent;

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
});
