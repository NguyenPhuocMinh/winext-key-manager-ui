import { isEmpty, get } from 'lodash';
import { httpClientAuthProvider } from './http-client';

/**
 * @description GET ALL REALM SERVICE
 * @param {*} query
 */
export const getAllRealmService = async (query = {}) => {
  try {
    const { data } = await httpClientAuthProvider.get('/realms', {
      params: query
    });

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description CREATE REALM SERVICE
 * @param {*} values
 */
export const createRealmService = async (values = {}) => {
  try {
    const { data } = await httpClientAuthProvider.post('/realms', values);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * GET REALM BY ID SERVICE
 * @param {*} realmID
 */
export const getRealmByIdService = async (realmID) => {
  try {
    const { data } = await httpClientAuthProvider.get(`/realms/${realmID}`);

    return !isEmpty(data) ? get(data, 'result.response') : {};
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description UPDATE REALM BY ID SERVICE
 * @param {*} realmID
 * @param {*} values
 */
export const updateRealmByIdService = async (realmID, values) => {
  try {
    const { data } = await httpClientAuthProvider.put(
      `/realms/${realmID}`,
      values
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description DELETE REALM BY ID SERVICE
 * @param {*} realmID
 */
export const deleteRealmByIdService = async (realmID) => {
  try {
    const { data } = await httpClientAuthProvider.delete(`/realms/${realmID}`);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description GET ALL USER IN REALM BY REALM NAME SERVICE
 * @param {*} realmName
 * @param {*} query
 */
export const getUsersInRealmByRealmNameService = async (realmName, query) => {
  try {
    const { data } = await httpClientAuthProvider.get(
      `/realms/${realmName}/users`,
      {
        params: query
      }
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description GET ALL GROUP IN REALM BY REALM NAME SERVICE
 * @param {*} realmName
 * @param {*} query
 */
export const getGroupsInRealmByRealmNameService = async (realmName, query) => {
  try {
    const { data } = await httpClientAuthProvider.get(
      `/realms/${realmName}/groups`,
      {
        params: query
      }
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
