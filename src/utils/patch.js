import {
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import _ from 'lodash';

import { colors, variants } from '@values';
import { normalize } from './responsive';

const setCustomText = (customProps) => {
  const TextRender = Text.render;
  const initialDefaultProps = Text.defaultProps;
  Text.defaultProps = {
    ...initialDefaultProps,
    ...customProps,
  };
  Text.render = function render(props) {
    const oldProps = props;
    const style = StyleSheet.flatten([{}, customProps.style, props.style]);
    const fontSize = normalize(style.fontSize || variants.normal);
    style.fontSize = fontSize;
    props = { ...props, style };
    try {
      return TextRender.apply(this, arguments);
    } finally {
      props = oldProps;
    }
  };
};

const setCustomTextInput = (customProps) => {
  const TextInputRender = TextInput.render;
  const initialDefaultProps = TextInput.defaultProps;
  TextInput.defaultProps = {
    ...initialDefaultProps,
    ...customProps,
  };
  TextInput.render = function render(props) {
    const oldProps = props;
    const style = StyleSheet.flatten([{}, customProps.style, props.style]);
    const fontSize = normalize(style.fontSize || variants.title);
    style.fontSize = fontSize;
    props = { ...props, style };
    try {
      return TextInputRender.apply(this, arguments);
    } finally {
      props = oldProps;
    }
  };
};

const setCustomFlatList = (customProps) => {
  const FlatListRender = FlatList.render;
  const initialDefaultProps = FlatList.defaultProps;
  FlatList.defaultProps = {
    ...initialDefaultProps,
    ...customProps,
  };
  FlatList.render = function render(props) {
    const oldProps = props;
    props = { ...props, style: [customProps.style, props.style] };
    try {
      return FlatListRender.apply(this, arguments);
    } finally {
      props = oldProps;
    }
  };
};

const setCustomTouchableOpacity = (customProps) => {
  const TouchableRender = TouchableOpacity.render;
  const initialDefaultProps = TouchableOpacity.defaultProps;
  TouchableOpacity.defaultProps = {
    ...initialDefaultProps,
    ...customProps,
  };
  TouchableOpacity.render = function render(props) {
    const oldProps = props;
    const { onPress = () => {} } = props;
    const debounceOnPress = _.debounce(onPress, 500, {
      leading: true,
      trailing: false,
    });
    props = {
      ...props,
      style: [customProps.style, props.style],
      onPress: debounceOnPress,
    };
    try {
      return TouchableRender.apply(this, arguments);
    } finally {
      props = oldProps;
    }
  };
};

const setCustomTouchableNativeFeedback = (customProps) => {
  const TouchableNativeFeedbackRender = TouchableNativeFeedback.render;
  const initialDefaultProps = TouchableNativeFeedback.defaultProps;
  TouchableNativeFeedback.defaultProps = {
    ...initialDefaultProps,
    ...customProps,
  };
  TouchableNativeFeedback.render = function render(props) {
    const oldProps = props;
    const { onPress } = props;
    const debounceOnPress = _.debounce(onPress, 500, {
      leading: true,
      trailing: false,
    });
    props = {
      ...props,
      style: [customProps.style, props.style],
      onPress: debounceOnPress,
    };
    try {
      return TouchableNativeFeedbackRender.apply(this, arguments);
    } finally {
      props = oldProps;
    }
  };
};
const setCustomTouchableWithoutFeedback = (customProps) => {
  const TouchableWithoutFeedbackRender = TouchableWithoutFeedback.render;
  const initialDefaultProps = TouchableWithoutFeedback.defaultProps;
  TouchableWithoutFeedback.defaultProps = {
    ...initialDefaultProps,
    ...customProps,
  };
  TouchableWithoutFeedback.render = function render(props) {
    const oldProps = props;
    const { onPress } = props;
    const debounceOnPress = _.debounce(onPress, 500, {
      leading: true,
      trailing: false,
    });
    props = {
      ...props,
      style: [customProps.style, props.style],
      onPress: debounceOnPress,
    };
    try {
      return TouchableWithoutFeedbackRender.apply(this, arguments);
    } finally {
      props = oldProps;
    }
  };
};

const setCustomTouchableHighlight = (customProps) => {
  const TouchableHighlightRender = TouchableHighlight.render;
  const initialDefaultProps = TouchableHighlight.defaultProps;
  TouchableHighlight.defaultProps = {
    ...initialDefaultProps,
    ...customProps,
  };
  TouchableHighlight.render = function render(props) {
    const oldProps = props;
    const { onPress } = props;
    const debounceOnPress = _.debounce(onPress, 500, {
      leading: true,
      trailing: false,
    });
    props = {
      ...props,
      style: [customProps.style, props.style],
      onPress: debounceOnPress,
    };
    try {
      return TouchableHighlightRender.apply(this, arguments);
    } finally {
      props = oldProps;
    }
  };
};

const setDefaultsComponentsProps = () => {
  setCustomText({
    suppressHighlighting: true, // disable highlight text on press
    allowFontScaling: false, // disable scale font with system scaling,
    style: {
      color: colors.textColor,
    },
  });
  setCustomTextInput({
    allowFontScaling: false,
    underlineColorAndroid: colors.transparent,
    style: {
      color: colors.textColor,
    },
  });
  setCustomTouchableOpacity({
    activeOpacity: 0.7,
  });

  setCustomTouchableHighlight();
  setCustomTouchableNativeFeedback();
  setCustomTouchableWithoutFeedback();

  setCustomFlatList({
    keyboardShouldPersistTaps: 'always',
    keyboardDismissMode: 'interactive',
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
    onEndReachedThreshold: 0.1,
  });
};

const patchJson = () => {
  const parse = JSON.parse;
  const stringify = JSON.stringify;

  JSON.parse = (str, defaultValue) => {
    try {
      return parse(str);
    } catch (error) {
      return defaultValue;
    }
  };

  JSON.stringify = (obj) => {
    try {
      return stringify(obj);
    } catch (error) {
      return '';
    }
  };
};

const pathConsole = () => {
  const l = console.log;
  const w = console.warn;
  const e = console.error;

  console.log = (...args) => __DEV__ && l(...args);
  console.warn = (...args) => __DEV__ && w(...args);
  console.error = (...args) => __DEV__ && e(...args);
};

const patch = () => {
  patchJson();
  pathConsole();
  setDefaultsComponentsProps();
};

export default patch();
