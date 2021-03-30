import { create, ApisauceConfig, ApiResponse } from 'apisauce';
import { getOr } from 'lodash/fp';
import { PopupManager } from '@utils';
import i18n from 'i18n-js';
import { configs, constants } from '@values';
import { Keyboard } from 'react-native';
import { routes } from '@navigator/routes';

type Method =
  | 'get'
  | 'post'
  | 'delete'
  | 'patch'
  | 'put'
  | 'link'
  | 'unlink'
  | 'head';

const apisauceInstance = create({
  baseURL: 'https://admin-shop.babaza.vn/api/v1/',
  timeout: 60000,
});

export type HttpResponse = {
  data?: any;
  error?: any;
};

const fetchAPI = async function (
  path: string,
  method: Method,
  _params?: any,
  config?: ApisauceConfig | undefined,
): Promise<HttpResponse> {
  const func: <T = any, U = T>(
    path: string,
    params?: object,
    axiosConfig?: ApisauceConfig,
  ) => Promise<ApiResponse<T, U>> = apisauceInstance[method];

  return new Promise((resolve) => {
    const params =
      method === 'get'
        ? Object.assign({}, _params, {
            pageSize: constants.pageSize,
            page: _params?.page || 1,
          })
        : _params;
    if (!params?.ignoreDismissKeyboard) {
      Keyboard.dismiss();
    }
    func(path, params, config)
      .then((res: ApiResponse<any>) => {
        console.log(':::API RESPONSE:::', res);
        if (res.status === 200 && res.data?.success) {
          delete res.data.success;
          resolve({ data: res.data });
        } else {
          resolve({ error: res.data });
        }
      })
      .catch((error: Error) => {
        console.log(':::API RESPONSE:::', error);
        resolve({ error });
      });
  });
};

const getMessageError = (error: any) => {
  const status: any = getOr(undefined, 'status', error);
  const problem: any = getOr(undefined, 'problem', error);

  const localize = i18n.t('error') as any;
  return localize[status] || localize[problem] || localize.defaultError;
};

const handleApiError = (error: any, callback?: () => void) => {
  const status: any = getOr(undefined, 'status', error);
  const problem: any = getOr(undefined, 'problem', error);

  if (!status && !problem) {
    return;
  }

  const message = i18n.t('error')[problem] || i18n.t('error')[status];

  if (!message) {
    return;
  }

  PopupManager.alert({
    title: i18n.t('alert.error'),
    message,
    buttons: [
      {
        text: i18n.t('ok'),
        onPress: callback,
      },
    ],
  });
};

const setHttpAuthorizationToken = (token: string) =>
  apisauceInstance.setHeader('Authorization', `Bearer ${token}`);

const deleteHttpAuthorizationToken = () =>
  apisauceInstance.deleteHeader('Authorization');

const updateLocalAuth = (user: any) => {
  setHttpAuthorizationToken(user.token);
};

const clearUserInfo = () => {
  deleteHttpAuthorizationToken();
};

export {
  apisauceInstance,
  fetchAPI,
  getMessageError,
  handleApiError,
  deleteHttpAuthorizationToken,
  setHttpAuthorizationToken,
  clearUserInfo,
  updateLocalAuth,
};
