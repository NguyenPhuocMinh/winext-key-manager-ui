import {
  CALL_REQUEST,
  END_REQUEST,
  GET_ALL_ROLE,
  CREATE_ROLE,
  GET_ROLE_ID,
  UPDATE_ROLE,
  RESET_ROLE_RECORD,
  GET_ALL_USER_IN_ROLE,
  GET_ALL_PERMISSION_IN_ROLE
} from '../customTypes';

const initialState = {
  data: [],
  total: 0,
  record: {},
  loading: false,
  dataUsersInRole: [],
  totalUsersInRole: 0,
  loadingUsersInRole: false,
  dataPermissionsInRole: [],
  totalPermissionsInRole: 0,
  loadingPermissionsInRole: false
};

const roleReducer = (state = initialState, action) => {
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
    case GET_ALL_ROLE:
      return {
        ...state,
        data: payload.data,
        total: payload.total,
        loading: false
      };
    case CREATE_ROLE:
      return {
        ...state,
        record: payload,
        loading: false
      };
    case GET_ROLE_ID:
      return {
        ...state,
        record: payload.record,
        loading: false
      };
    case UPDATE_ROLE:
      return {
        ...state,
        record: payload,
        loading: false
      };
    case RESET_ROLE_RECORD:
      return {
        ...state,
        record: {},
        dataUsersInRole: [],
        totalUsersInRole: 0,
        dataPermissionsInRole: [],
        totalPermissionsInRole: 0,
        loading: false,
        loadingUsersInRole: false,
        loadingPermissionsInRole: false
      };
    case GET_ALL_USER_IN_ROLE:
      return {
        ...state,
        dataUsersInRole: payload.data,
        totalUsersInRole: payload.total,
        loadingUsersInRole: false
      };
    case GET_ALL_PERMISSION_IN_ROLE:
      return {
        ...state,
        dataPermissionsInRole: payload.data,
        totalPermissionsInRole: payload.total,
        loadingPermissionsInRole: false
      };
    default:
      return state;
  }
};

export default roleReducer;
