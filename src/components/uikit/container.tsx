import React, { PureComponent } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  StyleProp,
  ViewStyle,
  View,
} from 'react-native';
import codePush from 'react-native-code-push';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, constants } from '@values';
import { memoize } from 'lodash';
import Text from './text';
import Touchable from './touchable';
import { t } from '@i18n';

export interface IContainerProps {
  safe?: boolean;
  style?: StyleProp<ViewStyle>;
  padding?: boolean;
  paddingV?: boolean;
  paddingH?: boolean;
  color?: string;
}

interface State {
  error?: Error | undefined;
  errorInfo?: any;
}

export const generateStyle = memoize((props: IContainerProps) => {
  const { padding, paddingH, paddingV, color, style: _style } = props;
  const style: ViewStyle = StyleSheet.flatten([{}, _style]);
  if (padding) {
    style.padding = constants.dfPadding;
  }
  if (paddingH) {
    style.paddingHorizontal = constants.dfPadding;
  }
  if (paddingV) {
    style.paddingVertical = constants.dfPadding;
  }
  if (color) {
    style.backgroundColor = color;
  }

  return style;
});

export default class Container extends PureComponent<IContainerProps, State> {
  constructor(props: IContainerProps) {
    super(props);
    this.state = { error: undefined };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    console.log('[JS-EXCEPTION]: ', error, errorInfo);
  }

  renderError = () => {
    return (
      <Touchable style={styles.errorWrapper} onPress={codePush.restartApp}>
        <Ionicons name="ios-alert-circle" color={colors.brightRed} size={60} />
        <Text style={styles.errorText}>{t('error')}</Text>
      </Touchable>
    );
  };

  render() {
    const { error } = this.state;
    const { children, safe } = this.props;
    const style = generateStyle(this.props);

    const Wrapper = safe ? SafeAreaView : View;
    return (
      <Wrapper
        style={[styles.wrapper, style, error ? styles.center : undefined]}>
        {error ? this.renderError() : children}
      </Wrapper>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
