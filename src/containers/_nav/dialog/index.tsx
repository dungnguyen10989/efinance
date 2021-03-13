import React, { memo, useEffect, useMemo, useState } from 'react';
import { StyleSheet, DeviceEventEmitter } from 'react-native';
import { IDialog, IScreen } from 'screen-props';
import { colors, constants, events, variants } from '@values';
import { t } from '@i18n';
import { GNav } from '@navigator/helper';
import { ConsoleUtils } from '@utils';
import { DText, DTouchable, DView } from '@components/uikit';

interface Props extends IScreen {
  params: IDialog;
}

export default memo((props: Props) => {
  const [params, setParams] = useState<Array<IDialog>>([props.params]);

  useEffect(() => {
    const sub = DeviceEventEmitter.addListener(
      events.showDialog,
      (iParams: IDialog) => {
        params.push(iParams);
        setParams([...params]);
      },
    );
    return () => sub.remove();
  }, [params]);

  const renderButtons = useMemo(() => {
    const onPress = (callback?: any) => {
      if (params.length === 1) {
        GNav.dismissOverlay(props.componentId)
          .then(() => (GNav.alertId = undefined))
          .catch((error) => {
            ConsoleUtils.l('Dismiss overlay error', error);
          });
      } else {
        params.shift();
        setParams([...params]);
      }
      callback?.();
    };

    const buttons = params[0]?.buttons || [{ text: t('alert.ok') }];
    return buttons.map((button, index) => {
      return (
        <DTouchable
          style={styles.button}
          key={`${index}`}
          onPress={onPress.bind(null, button.onPress)}>
          <DText style={styles.buttonText}>{button.text}</DText>
        </DTouchable>
      );
    });
  }, [params, props.componentId]);

  return (
    <DView style={styles.container}>
      <DView style={styles.content}>
        <DText style={styles.title}>
          {params[0]?.title || t('alert.alert')}
        </DText>
        <DText style={styles.message}>{params[0]?.message}</DText>
        <DView style={styles.buttons}>{renderButtons}</DView>
      </DView>
    </DView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.overlay,
  },
  content: {
    marginHorizontal: constants.dfPadding * 2,
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: 3,
  },
  title: {
    fontSize: variants.title,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: constants.dfPadding,
    marginHorizontal: constants.halfPadding,
  },
  message: {
    marginBottom: constants.dfPadding,
    marginHorizontal: constants.halfPadding,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.borders,
  },
  column: {
    flexDirection: 'column',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: constants.halfPadding,
    paddingVertical: constants.dfPadding,
  },
  buttonText: {
    fontSize: variants.title,
  },
});
