import languageReducer from './languageReducer';
import themeReducer from './themeReducer';
import popupReducer from './popupReducer';
import realmReducer from './realmReducer';

const customReducers = {
  theme: themeReducer,
  language: languageReducer,
  popup: popupReducer,
  realm: realmReducer
};

export default customReducers;
