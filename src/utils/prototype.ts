/* eslint-disable no-bitwise */
import { isString } from 'lodash';
import i18n from 'i18n-js';
import moment from 'moment';

class ArrayPrototype {
  static standardizedByUnique = (arr: Array<any>, uniqueId = 'id') => {
    return arr.reduce<Array<any>>((result, item) => {
      if (
        !result.find(
          (i) =>
            !isNullOrUndefined(i[uniqueId]) && i[uniqueId] === item[uniqueId],
        )
      ) {
        result.push(item);
      }
      return result;
    }, []);
  };
}

class StringPrototype {
  static isLetter = (s: string) => {
    if (isString(s) && s.length === 1) {
      return RegExp(/^\p{L}/, 'u').test(s);
    }
    return false;
  };

  static capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  static isUpperCase = (s: string) => {
    if (!StringPrototype.isLetter(s)) {
      return false;
    }
    return s.toUpperCase() === s;
  };

  static isLowerCase = (s: string) => {
    if (!StringPrototype.isLetter(s)) {
      return false;
    }
    return s.toLowerCase() === s;
  };

  static standardizedKey = (key: string, comma: string) => {
    const arr = [...key];
    arr.forEach((item, index) => {
      if (
        StringPrototype.isUpperCase(item) &&
        StringPrototype.isLowerCase(arr[index - 1])
      ) {
        arr[index] = `${comma}${item}`;
      }
    });
    return arr.join('');
  };

  static mapKeyToValue = (
    obj: any,
    nestedKey = '',
    prefix = '',
    comma = '_',
  ) => {
    return new Promise((resolve) => {
      try {
        for (const key in obj) {
          const value = obj[key];
          if (isString(value)) {
            const additional = nestedKey ? `${nestedKey}${comma}` : '';
            obj[key] = `${prefix}${additional}${StringPrototype.standardizedKey(
              key,
              comma,
            )}`.toUpperCase();
          } else {
            StringPrototype.mapKeyToValue(obj[key], key, prefix, comma);
          }
        }
        resolve(true);
      } catch (error) {
        resolve(false);
      }
    });
  };

  static removeAllSpaces = (target: string) => target?.replace(/\s/g, '');

  static replaceAll = (
    target: string | undefined,
    oldStr: string,
    newStr: string,
  ) => {
    const regex = new RegExp(oldStr, 'g');
    return target?.replace(regex, newStr) || newStr;
  };

  static cutLongString = (target: string, maxLength: number) => {
    if (!isString(target)) {
      return '';
    }
    const len = target.length;
    if (len <= maxLength || maxLength < 4) {
      return target;
    }
    return target.slice(0, maxLength - 4).concat(' ...');
  };

  //  bỏ dấu tiếng việt
  static removeDiacritics = (target: string) =>
    target.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  static formatDate = (date?: Date | string, withTime?: boolean) => {
    if (!date) {
      return undefined;
    }
    const locale = i18n.currentLocale();
    const s = moment(date).locale(locale).format('dddd, Do MMMM, YYYY');
    return StringPrototype.capitalize(s);
  };

  static normalizeVNPhone = (
    phone: string,
    isRevert?: boolean,
    prefix = '84',
  ) => {
    if (!phone || !isString(phone)) {
      return '';
    }
    if (isRevert) {
      return phone.startsWith(prefix) ? phone.replace(/^.{3}/g, '0') : phone;
    }
    return phone.startsWith('0') ? phone.replace(/^.{1}/g, prefix) : phone;
  };

  static genBase64 = (
    data: string | null | undefined,
    backup?: string | null | undefined,
  ) => (data ? `data:image/jpg;base64,${data}` : backup);

  static toCurrency = (
    _amount: string | number,
    fixedCount = 2,
    currency = ' đ',
  ) => {
    try {
      const amount =
        typeof _amount === 'string' ? parseFloat(_amount) : _amount;
      return (
        amount.toFixed(fixedCount).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') +
        currency
      );
    } catch (error) {
      return '';
    }
  };
}

class NumberPrototype {
  static uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  static random = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1) + min);
}

const isNullOrUndefined = (s: any) => {
  return s === undefined || s === null;
};

export { StringPrototype, NumberPrototype, ArrayPrototype, isNullOrUndefined };
