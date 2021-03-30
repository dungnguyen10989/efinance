import React, { ComponentType, PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import codePush from 'react-native-code-push';
import { t } from '@i18n';

import { DView, DTouchable, DVectorIcons, DText } from '@uikit';
import { colors } from '@values';

interface State {
  error: any;
  errorInfo?: any;
}

export const withContainer = (filePath: string) => <P extends {}>(
  WrappedComponent: ComponentType<P>,
) => {
  class Comp extends PureComponent<P, State> {
    constructor(props: P) {
      super(props);
      this.state = { error: undefined };
    }

    componentDidCatch(error: Error, errorInfo: any) {
      this.setState({
        error: error,
        errorInfo: errorInfo,
      });
      console.log(`[JS-EXCEPTION]in path ${filePath}`, error, errorInfo);
    }

    render() {
      try {
        return <WrappedComponent {...this.props} />;
      } catch (error) {
        console.log(`[JS-EXCEPTION]in path ${filePath}`, error);

        return (
          <DView>
            <DTouchable style={styles.wrapper} onPress={codePush.restartApp}>
              <DVectorIcons
                name="ios-alert-circle"
                color={colors.brightRed}
                size={60}
              />
              <DText style={styles.text}>{t('error')}</DText>
            </DTouchable>
          </DView>
        );
      }
      const { error } = this.state;
      return error ? (
        <DView>
          <DTouchable style={styles.wrapper} onPress={codePush.restartApp}>
            <DVectorIcons
              name="ios-alert-circle"
              color={colors.brightRed}
              size={60}
            />
            <DText style={styles.text}>{t('error')}</DText>
          </DTouchable>
        </DView>
      ) : (
        <WrappedComponent {...this.props} />
      );
    }
  }

  return Comp;
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    alignItems: 'center',
  },
});
