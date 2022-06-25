import {
  GET_ALL_REALM,
  CREATE_REALM,
  GET_REALM_ID,
  UPDATE_REALM,
  RESET_REALM_RECORD
} from '../customTypes';

const initialState = {
  data: [],
  total: 0,
  record: {},
  loading: true
};

const realmReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_REALM:
      return {
        ...state,
        data: payload.data,
        total: payload.total,
        loading: false
      };
    case CREATE_REALM:
      return {
        ...state,
        record: payload,
        loading: false
      };
    case GET_REALM_ID:
      return {
        ...state,
        record: payload.record
      };
    case UPDATE_REALM:
      return {
        ...state,
        record: payload,
        loading: false
      };
    case RESET_REALM_RECORD:
      return {
        ...state,
        record: {}
      };
    default:
      return state;
  }
};

export default realmReducer;
