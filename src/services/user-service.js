import { isEmpty, get } from 'lodash';
import { httpClientAuthProvider } from './http-client';

/**
 * @description GET ALL USER SERVICE
 * @param {*} query
 */
export const getAllUserService = async (query = {}) => {
  try {
    const { data } = await httpClientAuthProvider.get('/users', {
      params: query
    });

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description CREATE USER SERVICE
 * @param {*} values
 */
export const createUserService = async (values = {}) => {
  try {
    const { data } = await httpClientAuthProvider.post('/users', values);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description GET USER BY ID SERVICE
 * @param {*} userID
 */
export const getUserByIdService = async (userID) => {
  try {
    const { data } = await httpClientAuthProvider.get(`/users/${userID}`);

    return !isEmpty(data) ? get(data, 'result.response') : {};
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description UPDATE USER BY ID SERVICE
 * @param {*} userID
 * @param {*} values
 */
export const updateUserByIdService = async (userID, values) => {
  try {
    const { data } = await httpClientAuthProvider.patch(
      `/users/${userID}`,
      values
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description ADD ROLES TO USER SERVICE
 * @param {*} userID
 * @param {*} values
 */
export const addRolesToUserService = async (userID, values) => {
  try {
    const { data } = await httpClientAuthProvider.patch(
      `/users/${userID}/assign-roles`,
      values
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description ADD GROUPS TO USER SERVICE
 * @param {*} userID
 * @param {*} values
 */
export const addGroupsToUserService = async (userID, values) => {
  try {
    const { data } = await httpClientAuthProvider.patch(
      `/users/${userID}/assign-groups`,
      values
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description SET USER TEMPORARY PASSWORD SERVICE
 * @param {*} userID
 * @param {*} values
 */
export const setUserTemporaryPasswordService = async (userID, values) => {
  try {
    const { data } = await httpClientAuthProvider.patch(
      `/users/${userID}/temporary-password`,
      values
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description DELETE USER BY ID SERVICE
 * @param {*} userID
 */
export const deleteUserByIdService = async (userID) => {
  try {
    const { data } = await httpClientAuthProvider.delete(`/users/${userID}`);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
