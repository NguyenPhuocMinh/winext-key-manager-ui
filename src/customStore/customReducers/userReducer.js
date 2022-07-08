import {
  CALL_REQUEST,
  END_REQUEST,
  GET_ALL_USER,
  CREATE_USER,
  GET_USER_ID,
  UPDATE_USER,
  RESET_USER_RECORD
} from '../customTypes';

const initialState = {
  data: [],
  total: 0,
  record: {},
  loading: true
};

const userReducer = (state = initialState, action) => {
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
    case GET_ALL_USER:
      return {
        ...state,
        data: payload.data,
        total: payload.total,
        loading: false
      };
    case CREATE_USER:
      return {
        ...state,
        record: payload,
        loading: false
      };
    case GET_USER_ID:
      return {
        ...state,
        record: payload.record,
        loading: false
      };
    case UPDATE_USER:
      return {
        ...state,
        record: payload,
        loading: false
      };
    case RESET_USER_RECORD:
      return {
        ...state,
        record: {},
        loading: false
      };
    default:
      return state;
  }
};

export default userReducer;
