import React, { memo, useCallback, useRef, useState } from 'react';
import { Alert, ImageBackground, TextInput, Touchable } from 'react-native';
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
  DText,
  DView,
} from '@uikit';
import { PopupManager, validatePassword, validateUsername } from '@utils';
import { assets } from '@assets';
import { colors, variants } from '@values';
import styles from './styles';
import { t } from '@i18n';
import { IScreen } from 'screen-props';
import { withContainer } from '@containers/hocs';

interface Form {
  username: string;
  password: string;
}
interface Props extends IScreen {}

const Login = memo((props: Props) => {
  const [text, setText] = useState<any>('');

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
    // setText({ id: 1 });
    PopupManager.showProtectedOverlay();
    setTimeout(() => PopupManager.dismissOverlay(), 4000);
    // Alert.alert('title', 'This is message`');
  }, []);

  const onRegister = useCallback(() => {
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
    });
  }, []);

  // return <DView flex bg={colors.skyBlue} />;

  return (
    <DContainer>
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
        <DText>{text}</DText>
      </DView>
    </DContainer>
  );
});

export default withContainer('src/auth/login/index.tsx')(Login);
