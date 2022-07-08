import {
  CALL_REQUEST,
  END_REQUEST,
  GET_ALL_GROUP,
  CREATE_GROUP,
  GET_GROUP_ID,
  UPDATE_GROUP,
  RESET_GROUP_RECORD,
  GET_ALL_USER_IN_GROUP
} from '../customTypes';

const initialState = {
  data: [],
  total: 0,
  record: {},
  loading: false,
  dataUsersInGroup: [],
  totalUsersInGroup: 0,
  loadingUsersInGroup: false
};

const groupReducer = (state = initialState, action) => {
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
    case GET_ALL_GROUP:
      return {
        ...state,
        data: payload.data,
        total: payload.total,
        loading: false
      };
    case CREATE_GROUP:
      return {
        ...state,
        record: payload,
        loading: false
      };
    case GET_GROUP_ID:
      return {
        ...state,
        record: payload.record,
        loading: false
      };
    case UPDATE_GROUP:
      return {
        ...state,
        record: payload,
        loading: false
      };
    case RESET_GROUP_RECORD:
      return {
        ...state,
        record: {},
        loading: false,
        dataUsersInGroup: [],
        totalUsersInGroup: 0,
        loadingUsersInGroup: false
      };
    case GET_ALL_USER_IN_GROUP:
      return {
        ...state,
        dataUsersInGroup: payload.data,
        totalUsersInGroup: payload.total,
        loadingUsersInGroup: false
      };
    default:
      return state;
  }
};

export default groupReducer;
