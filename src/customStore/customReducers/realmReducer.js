import {
  CALL_REQUEST,
  END_REQUEST,
  GET_ALL_REALM,
  CREATE_REALM,
  GET_REALM_ID,
  UPDATE_REALM,
  RESET_REALM_RECORD,
  GET_ALL_USER_IN_REALM,
  GET_ALL_GROUP_IN_REALM
} from '../customTypes';

const initialState = {
  data: [],
  total: 0,
  record: {},
  loading: false,
  dataUsersInRealm: [],
  totalUsersInRealm: 0,
  loadingUsersInRealm: false,
  dataGroupsInRealm: [],
  totalGroupsInRealm: 0,
  loadingGroupsInRealm: false
};

const realmReducer = (state = initialState, action) => {
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
        record: payload.record,
        loading: false
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
        record: {},
        loading: false
      };
    case GET_ALL_USER_IN_REALM:
      return {
        ...state,
        dataUsersInRealm: payload.data,
        totalUsersInRealm: payload.total,
        loadingUsersInRealm: false
      };
    case GET_ALL_GROUP_IN_REALM:
      return {
        ...state,
        dataGroupsInRealm: payload.data,
        totalGroupsInRealm: payload.total,
        loadingGroupsInRealm: false
      };
    default:
      return state;
  }
};

export default realmReducer;
