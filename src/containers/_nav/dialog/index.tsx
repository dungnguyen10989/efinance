import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, DeviceEventEmitter, Animated } from 'react-native';
import { IDialog, IScreen } from 'screen-props';
import { colors, constants, events, variants } from '@values';
import { t } from '@i18n';
import { GNav } from '@navigator/helper';
import { DText, DTouchable, DView } from '@components/uikit';
import { Easing } from 'react-native-reanimated';

interface Props extends IScreen {
  params: IDialog;
}

const speed = 50;

export default memo((props: Props) => {
  const anim = useRef(new Animated.Value(0)).current;
  const [params, setParams] = useState<Array<IDialog>>([props.params]);

  useEffect(() => {
    Animated.spring(anim, {
      toValue: 1,
      useNativeDriver: true,
      speed,
    }).start();
    const sub = DeviceEventEmitter.addListener(
      events.showDialog,
      (iParams: IDialog) => {
        params.push(iParams);
        setParams([...params]);
      },
    );
    return () => sub.remove();
  }, [params, anim]);

  const renderButtons = useMemo(() => {
    const onPress = (callback?: any) => {
      if (params.length === 1) {
        Animated.spring(anim, {
          toValue: 0,
          useNativeDriver: true,
          speed,
        }).start(({ finished }) => {
          GNav.dismissOverlay(props.componentId)
            .then(() => (GNav.alertId = undefined))
            .catch((error) => {
              console.log('Dismiss overlay error', error);
            });
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
  }, [params, props.componentId, anim]);

  const scale = useMemo(() => {
    return {
      opacity: anim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        // easing: Easing.bounce,
      }),
      transform: [
        {
          scale: anim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5, 1],
            // easing: Easing.bounce,
          }),
        },
      ],
    };
  }, [anim]);

  return (
    <DView style={styles.container}>
      <Animated.View style={[styles.content, scale]}>
        <DText style={styles.title}>
          {params[0]?.title || t('alert.alert')}
        </DText>
        <DText style={styles.message}>{params[0]?.message}</DText>
        <DView style={styles.buttons}>{renderButtons}</DView>
      </Animated.View>
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
    borderRadius: constants.halfPadding,
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
    marginHorizontal: constants.dfPadding,
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
    fontWeight: 'bold',
  },
});
