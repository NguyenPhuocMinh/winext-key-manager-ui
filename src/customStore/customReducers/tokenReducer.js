import {
  CALL_REQUEST,
  END_REQUEST,
  SAVE_TOKEN_BY_REALM,
  GET_TOKEN_BY_REALM
} from '../customTypes';

const initialState = {
  record: {},
  loading: false
};

const tokenReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CALL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case END_REQUEST:
      return {
        ...state,
        loading: false
      };
    case SAVE_TOKEN_BY_REALM:
      return {
        ...state,
        record: payload,
        loading: false
      };
    case GET_TOKEN_BY_REALM:
      return {
        ...state,
        record: payload.record,
        loading: false
      };
    default:
      return state;
  }
};

export default tokenReducer;
