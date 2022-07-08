import languageReducer from './languageReducer';
import themeReducer from './themeReducer';
import popupReducer from './popupReducer';
import realmReducer from './realmReducer';
import keyReducer from './keyReducer';
import emailReducer from './emailReducer';
import tokenReducer from './tokenReducer';
import userReducer from './userReducer';
import roleReducer from './roleReducer';
import groupReducer from './groupReducer';
import permissionReducer from './permissionReducer';

/**
 * @description USE IN APP
 */
const customReducers = {
  theme: themeReducer,
  language: languageReducer,
  popup: popupReducer,
  realm: realmReducer,
  key: keyReducer,
  email: emailReducer,
  token: tokenReducer,
  user: userReducer,
  role: roleReducer,
  group: groupReducer,
  permission: permissionReducer
};

export default customReducers;
