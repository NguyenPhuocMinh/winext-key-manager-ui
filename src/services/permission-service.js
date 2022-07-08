import { isEmpty, get } from 'lodash';
import { httpClientAuthProvider } from './http-client';

/**
 * @description Get All Permission Service
 * @param {*} perID
 * @param {*} values
 */
export const getAllPermissionService = async (query = {}) => {
  try {
    const { data } = await httpClientAuthProvider.get('/permissions', {
      params: query
    });

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description Create Permission Service
 * @param {*} perID
 * @param {*} values
 */
export const createPermissionService = async (values = {}) => {
  try {
    const { data } = await httpClientAuthProvider.post('/permissions', values);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description Get Permission By ID Service
 * @param {*} perID
 * @param {*} values
 */
export const getPermissionByIdService = async (perID) => {
  try {
    const { data } = await httpClientAuthProvider.get(`/permissions/${perID}`);

    return !isEmpty(data) ? get(data, 'result.response') : {};
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description Update Permission By ID Service
 * @param {*} perID
 * @param {*} values
 */
export const updatePermissionByIdService = async (perID, values) => {
  try {
    const { data } = await httpClientAuthProvider.put(
      `/permissions/${perID}`,
      values
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description Delete Permission By ID Service
 * @param {*} perID
 * @param {*} values
 */
export const deletePermissionByIdService = async (perID) => {
  try {
    const { data } = await httpClientAuthProvider.delete(
      `/permissions/${perID}`
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description Add Roles To Permission Service
 * @param {*} perID
 * @param {*} values
 */
export const addRolesToPermissionService = async (perID, values) => {
  try {
    const { data } = await httpClientAuthProvider.patch(
      `/permissions/${perID}/assign-roles`,
      values
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
