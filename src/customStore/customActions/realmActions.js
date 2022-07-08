import { showNotification } from 'story-bootstrap';
import { get, isEmpty } from 'lodash';
import {
  getAllRealmService,
  createRealmService,
  getRealmByIdService,
  updateRealmByIdService,
  deleteRealmByIdService,
  getUsersInRealmByRealmNameService,
  getGroupsInRealmByRealmNameService
} from '@services/index';
import { formatErrorMsg } from '@helpers/index';
import {
  CALL_REQUEST,
  END_REQUEST,
  GET_ALL_REALM,
  GET_REALM_ID,
  CREATE_REALM,
  UPDATE_REALM,
  RESET_REALM_RECORD,
  GET_ALL_USER_IN_REALM,
  GET_ALL_GROUP_IN_REALM
} from '../customTypes';
import { showPopup } from './popupActions';

export const resetRealmRecord = () => ({
  type: RESET_REALM_RECORD
});

/**
 * @description GET ALL REALM ACTION
 * @param {*} query
 */
export const getAllRealmAction =
  (query = {}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: CALL_REQUEST
      });

      const { result } = await getAllRealmService(query);

      if (!isEmpty(result)) {
        dispatch({
          type: GET_ALL_REALM,
          payload: {
            data: result.response,
            total: result.total
          }
        });
        dispatch({
          type: END_REQUEST
        });
      }
    } catch (err) {
      dispatch({
        type: END_REQUEST
      });
      const errorMsg = formatErrorMsg(err);
      dispatch(showNotification(errorMsg, 'error', { vertical: 'top' }));
    }
  };

/**
 * @description CREATE REALM ACTION
 * @param {*} opts
 * @param {*} values
 */
export const createRealmAction =
  (opts = {}, values = {}) =>
  async (dispatch) => {
    const { navigate } = opts;
    try {
      dispatch({
        type: CALL_REQUEST
      });

      const { result } = await createRealmService(values);

      if (!isEmpty(result)) {
        const realmID = get(result, 'response.id');
        dispatch({
          type: CREATE_REALM,
          payload: result
        });
        dispatch({
          type: END_REQUEST
        });
        navigate(`/realm-edit/${realmID}`);
      }
    } catch (err) {
      dispatch({
        type: END_REQUEST
      });
      const errorMsg = formatErrorMsg(err);
      dispatch(showNotification(errorMsg, 'error', { vertical: 'top' }));
    }
  };

/**
 * @description GET REALM BY ID ACTION
 * @param {*} realmID
 */
export const getRealmByIdAction = (realmID) => async (dispatch) => {
  try {
    dispatch({
      type: CALL_REQUEST
    });

    const data = await getRealmByIdService(realmID);

    if (!isEmpty(data)) {
      dispatch({
        type: GET_REALM_ID,
        payload: {
          record: data
        }
      });
      dispatch({
        type: END_REQUEST
      });
    }
  } catch (err) {
    dispatch({
      type: END_REQUEST
    });
    const errorMsg = formatErrorMsg(err);
    dispatch(showNotification(errorMsg, 'error', { vertical: 'top' }));
  }
};

/**
 * @description UPDATE REALM BY ID ACTION
 * @param {*} realmID
 * @param {*} values
 */
export const updateRealmByIdAction =
  (realmID, values = {}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: CALL_REQUEST
      });
      const { result, message } = await updateRealmByIdService(realmID, values);

      if (!isEmpty(result)) {
        dispatch({
          type: UPDATE_REALM,
          payload: result.response
        });
        dispatch({
          type: END_REQUEST
        });
        dispatch(showNotification(message, 'success', { vertical: 'top' }));
      }
    } catch (err) {
      dispatch({
        type: END_REQUEST
      });
      const errorMsg = formatErrorMsg(err);
      dispatch(showNotification(errorMsg, 'error', { vertical: 'top' }));
    }
  };

/**
 * @description DELETE REALM BY ID ACTION
 * @param {*} realmID
 * @param {*} query
 */
export const deleteRealmByIdAction = (realmID, query) => async (dispatch) => {
  try {
    const result = await deleteRealmByIdService(realmID);
    if (!isEmpty(result)) {
      dispatch(
        showNotification(result.message, 'success', { vertical: 'top' })
      );
      dispatch(getAllRealmAction(query));
      dispatch(
        showPopup({
          open: false,
          title: '',
          content: '',
          onSubmit: () => ({}),
          options: {}
        })
      );
    }
  } catch (err) {
    dispatch({
      type: END_REQUEST
    });
    const errorMsg = formatErrorMsg(err);
    dispatch(showNotification(errorMsg, 'error', { vertical: 'top' }));
  }
};

/**
 * @description GET ALL USER BY REALM NAME ACTION
 * @param {*} realmName
 * @param {*} query
 */
export const getUsersByRealmNameAction =
  (realmName, query) => async (dispatch) => {
    try {
      dispatch({
        type: CALL_REQUEST
      });

      const { result } = await getUsersInRealmByRealmNameService(
        realmName,
        query
      );

      if (!isEmpty(result)) {
        dispatch({
          type: GET_ALL_USER_IN_REALM,
          payload: {
            data: result.response,
            total: result.total
          }
        });
        dispatch({
          type: END_REQUEST
        });
      }
    } catch (err) {
      dispatch({
        type: END_REQUEST
      });
      const errorMsg = get(err, 'response.data.message') || err.message;
      dispatch(showNotification(errorMsg, 'error', { vertical: 'top' }));
    }
  };

/**
 * @description GET ALL GROUP BY REALM NAME ACTION
 * @param {*} realmName
 * @param {*} query
 */
export const getGroupsByRealmNameAction =
  (realmName, query) => async (dispatch) => {
    try {
      dispatch({
        type: CALL_REQUEST
      });

      const { result } = await getGroupsInRealmByRealmNameService(
        realmName,
        query
      );

      if (!isEmpty(result)) {
        dispatch({
          type: GET_ALL_GROUP_IN_REALM,
          payload: {
            data: result.response,
            total: result.total
          }
        });
        dispatch({
          type: END_REQUEST
        });
      }
    } catch (err) {
      dispatch({
        type: END_REQUEST
      });
      const errorMsg = get(err, 'response.data.message') || err.message;
      dispatch(showNotification(errorMsg, 'error', { vertical: 'top' }));
    }
  };
