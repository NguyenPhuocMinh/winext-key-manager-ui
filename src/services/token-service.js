import { isEmpty, get } from 'lodash';
import { httpClientAuthProvider } from './http-client';

/**
 * @description SAVE TOKEN BY REALM SERVICE
 * @param {*} values
 */
export const saveTokenByRealmService = async (realmName, values = {}) => {
  try {
    const { data } = await httpClientAuthProvider.post(
      `${realmName}/tokens`,
      values
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description GET TOKEN BY REALM SERVICE
 * @param {*} realmName
 */
export const getTokenByRealmService = async (realmName) => {
  try {
    const { data } = await httpClientAuthProvider.get(`/${realmName}/tokens`);

    return !isEmpty(data) ? get(data, 'result.response') : {};
  } catch (error) {
    return Promise.reject(error);
  }
};
