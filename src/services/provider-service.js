import { isEmpty, get } from 'lodash';
import { httpClientAuthProvider } from './http-client';

export const getAllProviderService = async (query = {}) => {
  try {
    const { data } = await httpClientAuthProvider.get('/realms', {
      params: query
    });

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createProviderService = async (values = {}) => {
  try {
    const { data } = await httpClientAuthProvider.post('/realms', values);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getProviderByIdService = async (realmID) => {
  try {
    const { data } = await httpClientAuthProvider.get(`/realms/${realmID}`);

    return !isEmpty(data) ? get(data, 'result.response') : {};
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateProviderByIdService = async (realmID, values) => {
  try {
    const { data } = await httpClientAuthProvider.patch(
      `/realms/${realmID}`,
      values
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteProviderByIdService = async (realmID) => {
  try {
    const { data } = await httpClientAuthProvider.delete(`/realms/${realmID}`);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
