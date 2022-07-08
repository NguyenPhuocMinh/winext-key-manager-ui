import {
  CALL_REQUEST,
  END_REQUEST,
  GET_ALL_PERMISSION,
  CREATE_PERMISSION,
  GET_PERMISSION_ID,
  UPDATE_PERMISSION,
  RESET_PERMISSION_RECORD
} from '../customTypes';

const initialState = {
  data: [],
  total: 0,
  record: {},
  loading: false
};

const permissionReducer = (state = initialState, action) => {
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
    case GET_ALL_PERMISSION:
      return {
        ...state,
        data: payload.data,
        total: payload.total,
        loading: false
      };
    case CREATE_PERMISSION:
      return {
        ...state,
        record: payload,
        loading: false
      };
    case GET_PERMISSION_ID:
      return {
        ...state,
        record: payload.record,
        loading: false
      };
    case UPDATE_PERMISSION:
      return {
        ...state,
        record: payload,
        loading: false
      };
    case RESET_PERMISSION_RECORD:
      return {
        ...state,
        record: {},
        loading: false
      };
    default:
      return state;
  }
};

export default permissionReducer;
