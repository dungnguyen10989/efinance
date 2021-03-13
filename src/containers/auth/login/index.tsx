import React, { memo, useCallback, useRef } from 'react';
import { ImageBackground, TextInput } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  DButton,
  DButtonText,
  DContainer,
  DFastImage,
  DFormError,
  DIconField,
  DKeyboardAwareScrollView,
  DView,
} from '@uikit';
import { PopupManager, validatePassword, validateUsername } from '@utils';
import { assets } from '@assets';
import { variants } from '@values';
import styles from './styles';
import { t } from '@i18n';
import { IScreen } from 'screen-props';

interface Form {
  username: string;
  password: string;
}
interface Props extends IScreen {}

const Login = memo((props: Props) => {
  const pswRef = useRef<TextInput>() as React.MutableRefObject<TextInput>;

  const onSubmit = useCallback(() => {}, []);
  const form = useFormik<Form>({
    initialValues: {
      // username: 'tainc@ftcjsc.com',
      // password: 'ftc2018',
      username: '',
      password: '',
    },
    onSubmit,
    validateOnMount: false,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: () =>
      yup.object().shape({
        username: validateUsername(),
        password: validatePassword(),
      }),
  });

  const onForgot = useCallback(() => {
    PopupManager.showProtectedOverlay();
    setTimeout(() => PopupManager.dismissOverlay(), 4000);
  }, []);

  const onRegister = useCallback(() => {
    PopupManager.alert();
    setTimeout(
      () =>
        PopupManager.alert({
          title: 'hahaha',
          message: 'heheh',
          buttons: [
            {
              text: 'hahaha',
            },
            {
              text: 'hehehe',
            },
          ],
        }),
      1000,
    );
    // setTimeout(() => PopupManager.dismissOverlay(), 4000);
  }, []);

  return (
    <DContainer>
      <ImageBackground style={styles.bg} source={assets.image.login_background}>
        <DKeyboardAwareScrollView
          padding
          scrollEnabled={false}
          contentContainerStyle={styles.content}>
          <DView style={styles.top}>
            <DFastImage
              source={assets.image.logo}
              style={styles.logo}
              resizeMode="contain"
            />
          </DView>
          <DView style={styles.bottom}>
            <DIconField
              iconSource={assets.icon.ic_account}
              containerStyle={styles.input}
              iconStyle={styles.icon}
              placeholder={t('phUsername')}
              clearButtonMode="while-editing"
              fontSize={variants.title}
              nextRef={pswRef}
              returnKeyType="next"
              form={form}
              formID="username"
              autoCapitalize="none"
              autoCorrect={false}
              autoCompleteType="username"
              withError={false}
            />

            <DIconField
              ref={pswRef}
              iconSource={assets.icon.ic_lock}
              containerStyle={styles.input}
              iconStyle={styles.icon}
              placeholder={t('password')}
              clearButtonMode="while-editing"
              fontSize={variants.title}
              secureTextEntry
              onSubmitEditing={form.submitForm}
              returnKeyType="go"
              form={form}
              formID="password"
              withError={false}
            />
            <DFormError
              message={form.errors.username || form.errors.password}
            />

            <DButton
              style={styles.buttonLogin}
              title={t('login')}
              onPress={form.submitForm}
            />
            <DView style={styles.control}>
              <DButtonText
                style={styles.controlBtn}
                title={t('registerNow')}
                onPress={onRegister}
              />
              <DView style={styles.separator} />
              <DButtonText
                style={styles.controlBtn}
                title={t('forgotPsw')}
                onPress={onForgot}
              />
            </DView>
          </DView>
        </DKeyboardAwareScrollView>
      </ImageBackground>
    </DContainer>
  );
});

export default Login;
