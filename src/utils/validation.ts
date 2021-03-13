import { t } from '@i18n';
import { constants } from '@values';
import * as yup from 'yup';

const validatePhone = (value: string | undefined) => {
  if (
    !value?.startsWith('0') &&
    !value?.startsWith('84') &&
    !value?.startsWith('+84')
  ) {
    return false;
  }
  if (value) {
    const text = value.replace(/ /g, '');
    if (!/^(([(][+][8][4][)])|([+][8][4])|[0]|[84])[0-9]{9,10}$/g.test(text)) {
      return false;
    }
    return true;
  }
  return false;
};

const validateEmail = (email: string | undefined) => {
  if (!email) {
    return false;
  }
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const validateUsername = () => {
  return yup
    .string()
    .required(t('vdRequiredField', { field: t('phUsername') }))
    .test(
      'validate-username',
      t('usernameInvalid'),
      (value) => validatePhone(value) || validateEmail(value),
    );
};

const validatePassword = () => {
  return yup
    .string()
    .required(t('vdRequiredField', { field: t('password') }))
    .test('passwords-min-length', t('vdPswLength'), (value) =>
      Boolean(value && value.length >= constants.pswMinLength),
    );
};

const validateOtp = () => {
  return yup
    .string()
    .required(t('vdRequiredField', { field: 'OTP' }))
    .test('otp-length', t('vdOtpLength'), (value) =>
      Boolean(value && value.length === constants.otpLength),
    );
};

const validateRequireField = (field: string) => {
  return yup.mixed().required(t('vdRequiredField', { field }));
};

export {
  validatePhone,
  validateEmail,
  validateUsername,
  validatePassword,
  validateRequireField,
  validateOtp,
};
