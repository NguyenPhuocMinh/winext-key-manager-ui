import { isEmpty, get } from 'lodash';
import { httpClientAuthProvider } from './http-client';

/**
 * @description GET ALL GROUP SERVICE
 * @param {*} query
 */
export const getAllGroupService = async (query = {}) => {
  try {
    const { data } = await httpClientAuthProvider.get('/groups', {
      params: query
    });

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description CREATE GROUP SERVICE
 * @param {*} values
 */
export const createGroupService = async (values = {}) => {
  try {
    const { data } = await httpClientAuthProvider.post('/groups', values);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description GET GROUP BY ID SERVICE
 * @param {*} groupID
 */
export const getGroupByIdService = async (groupID) => {
  try {
    const { data } = await httpClientAuthProvider.get(`/groups/${groupID}`);

    return !isEmpty(data) ? get(data, 'result.response') : {};
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description UPDATE GROUP BY ID SERVICE
 * @param {*} groupID
 * @param {*} values
 */
export const updateGroupByIdService = async (groupID, values) => {
  try {
    const { data } = await httpClientAuthProvider.put(
      `/groups/${groupID}`,
      values
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description DELETE GROUP BY ID SERVICE
 * @param {*} groupID
 */
export const deleteGroupByIdService = async (groupID) => {
  try {
    const { data } = await httpClientAuthProvider.delete(`/groups/${groupID}`);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description GET ALL USER IN GROUP BY GROUP NAME SERVICE
 * @param {*} groupName
 * @param {*} realmName
 * @param {*} query
 */
export const getUsersInGroupByGroupNameService = async (
  groupName,
  realmName,
  query
) => {
  try {
    const { data } = await httpClientAuthProvider.get(
      `/groups/${groupName}/${realmName}/users`,
      {
        params: query
      }
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
