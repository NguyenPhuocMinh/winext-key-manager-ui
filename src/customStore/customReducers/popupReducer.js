import { SHOW_POPUP } from '../customTypes';

const initialState = {};

const popupReducer = (state = initialState, action) => {
  const { type, payload } = action;

  if (type === SHOW_POPUP) {
    return payload;
  }
  return state;
};

export default popupReducer;
