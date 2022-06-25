import { get, isEmpty } from 'lodash';
import { httpClientAuthProvider } from '../services';
import {
  refreshTokenHandler,
  removeLogin,
  prepareResponse,
  getProfile,
  getExpires
} from './authHandler';
import constants from '../constants';

const authProvider = {
  login: async (params) => {
    const { userName, password } = params;

    try {
      const response = await httpClientAuthProvider.post('/login', {
        userName,
        password
      });
      const data = !isEmpty(response) && get(response, 'data.data.result', {});

      prepareResponse(data);
      refreshTokenHandler();

      return response;
    } catch (err) {
      return err.response;
    }
  },
  logout: () => {
    removeLogin();
    return Promise.resolve();
  },
  checkError: (params) => {
    const { status } = params;
    switch (status) {
      case constants.STATUS.UNAUTHORIZED:
        removeLogin();
        return Promise.reject();
      case constants.STATUS.ACCESS_DENIED:
        return Promise.resolve({ redirectTo: '/access-denied' });
      default:
        return Promise.resolve();
    }
  },
  checkAuth: () => {
    const authenticated = localStorage.getItem('authenticated');
    return authenticated
      ? Promise.resolve({ authenticated: true })
      : Promise.reject(new Error('Authenticated failed'));
  },
  getPermissions: () => {
    const permissions = localStorage.getItem('permissions');
    return permissions ? Promise.resolve(permissions) : Promise.reject();
  },
  getIdentity: () => Promise.resolve(getProfile()),
  checkExpiredToken: () => Promise.resolve(getExpires())
};

export default authProvider;
