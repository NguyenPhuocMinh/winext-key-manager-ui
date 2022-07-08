import { isEmpty, get } from 'lodash';
import { httpClientAuthProvider } from './http-client';

/**
 * @description SAVE EMAIL BY REALM SERVICE
 * @param {*} values
 */
export const saveEmailByRealmService = async (realmName, values = {}) => {
  try {
    const { data } = await httpClientAuthProvider.post(
      `${realmName}/emails`,
      values
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description GET EMAIL BY REALM SERVICE
 * @param {*} realmName
 */
export const getEmailByRealmService = async (realmName) => {
  try {
    const { data } = await httpClientAuthProvider.get(`/${realmName}/emails`);

    return !isEmpty(data) ? get(data, 'result.response') : {};
  } catch (error) {
    return Promise.reject(error);
  }
};
