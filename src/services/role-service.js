import { isEmpty, get } from 'lodash';
import { httpClientAuthProvider } from './http-client';

/**
 * @description Get All Role Service
 * @param {Object} query { _start: 0, _end: 100 }
 */
export const getAllRoleService = async (query = {}) => {
  try {
    const { data } = await httpClientAuthProvider.get('/roles', {
      params: query
    });

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description Create Role Service
 * @param {Object} values
 */
export const createRoleService = async (values = {}) => {
  try {
    const { data } = await httpClientAuthProvider.post('/roles', values);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getRoleByIdService = async (roleID) => {
  try {
    const { data } = await httpClientAuthProvider.get(`/roles/${roleID}`);

    return !isEmpty(data) ? get(data, 'result.response') : {};
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateRoleByIdService = async (roleID, values) => {
  try {
    const { data } = await httpClientAuthProvider.put(
      `/roles/${roleID}`,
      values
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteRoleByIdService = async (roleID) => {
  try {
    const { data } = await httpClientAuthProvider.delete(`/roles/${roleID}`);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description Get Users In Role By Name Service
 * @param {*} roleName
 * @param {*} query
 */
export const getUsersInRoleByRoleNameService = async (roleName, query) => {
  try {
    const { data } = await httpClientAuthProvider.get(
      `/roles/${roleName}/users`,
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
 * @description GET ALL PERMISSION IN ROLE BY ROLE NAME SERVICE
 * @param {*} roleName
 * @param {*} query
 */
export const getPermissionsInRoleByRoleNameService = async (
  roleName,
  query
) => {
  try {
    const { data } = await httpClientAuthProvider.get(
      `/roles/${roleName}/permissions`,
      {
        params: query
      }
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
