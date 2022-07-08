import { isEmpty, get } from 'lodash';
import { httpClientAuthProvider } from './http-client';

/**
 * @description SAVE KEY BY REALM SERVICE
 * @param {*} values
 */
export const saveKeyByRealmService = async (realmName, values = {}) => {
  try {
    const { data } = await httpClientAuthProvider.post(
      `/${realmName}/keys`,
      values
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description GET KEY BY REALM SERVICE
 * @param {*} realmName
 */
export const getKeyByRealmService = async (realmName) => {
  try {
    const { data } = await httpClientAuthProvider.get(`/${realmName}/keys`);

    return !isEmpty(data) ? get(data, 'result.response') : {};
  } catch (error) {
    return Promise.reject(error);
  }
};
