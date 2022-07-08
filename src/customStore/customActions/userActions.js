import { showNotification } from 'story-bootstrap';
import { get, isEmpty } from 'lodash';
import {
  getAllUserService,
  createUserService,
  getUserByIdService,
  updateUserByIdService,
  addRolesToUserService,
  addGroupsToUserService,
  setUserTemporaryPasswordService,
  deleteUserByIdService
} from '@services/index';
import { formatErrorMsg } from '@helpers/index';
import {
  CALL_REQUEST,
  END_REQUEST,
  GET_ALL_USER,
  GET_USER_ID,
  CREATE_USER,
  UPDATE_USER,
  RESET_USER_RECORD
} from '../customTypes';
import { showPopup } from './popupActions';

export const resetUserRecord = () => ({
  type: RESET_USER_RECORD
});

/**
 * @description GET ALL USER ACTION
 * @param {*} query
 */
export const getAllUserAction =
  (query = {}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: CALL_REQUEST
      });

      const { result } = await getAllUserService(query);

      if (!isEmpty(result)) {
        dispatch({
          type: GET_ALL_USER,
          payload: {
            data: result.response,
            total: result.total
          }
        });
        dispatch({
          type: END_REQUEST
        });
      }
    } catch (error) {
      dispatch({
        type: END_REQUEST
      });
      const errorMsg = get(error, 'response.data.message', error.message);
      dispatch(showNotification(errorMsg, 'error', { vertical: 'top' }));
    }
  };

/**
 * @description CREATE USER ACTION
 * @param {*} opts
 * @param {*} values
 */
export const createUserAction =
  (opts = {}, values = {}) =>
  async (dispatch) => {
    const { navigate } = opts;
    try {
      dispatch({
        type: CALL_REQUEST
      });

      const { result, message } = await createUserService(values);

      if (!isEmpty(result)) {
        const userID = get(result, 'response.id');
        dispatch(
          setUserTemporaryPasswordAction(userID, { generatePass: false })
        );
        dispatch({
          type: CREATE_USER,
          payload: result
        });
        dispatch(showNotification(message, 'success', { vertical: 'top' }));
        dispatch({
          type: END_REQUEST
        });
        navigate(`/user-edit/${userID}`);
      }
    } catch (err) {
      const errorMsg = formatErrorMsg(err);
      dispatch(showNotification(errorMsg, 'error', { vertical: 'top' }));
    }
  };

/**
 * @description GET USER BY ID ACTION
 * @param {*} userID
 */
export const getUserByIdAction = (userID) => async (dispatch) => {
  try {
    const data = await getUserByIdService(userID);

    if (!isEmpty(data)) {
      dispatch({
        type: GET_USER_ID,
        payload: {
          record: data
        }
      });
    }
  } catch (err) {
    const errorMsg = formatErrorMsg(err);
    dispatch(showNotification(errorMsg, 'error', { vertical: 'top' }));
  }
};

/**
 * @description UPDATE USER BY ID ACTION
 * @param {*} userID
 * @param {*} values
 */
export const updateUserByIdAction =
  (userID, values = {}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: CALL_REQUEST
      });

      const { result, message } = await updateUserByIdService(userID, values);

      if (!isEmpty(result)) {
        dispatch({
          type: UPDATE_USER,
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
 * @description ADD ROLES TO USER ACTION
 * @param {*} userID
 * @param {*} values
 */
export const addRolesToUserAction =
  (userID, values = {}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: CALL_REQUEST
      });

      const { result, message } = await addRolesToUserService(userID, values);

      if (!isEmpty(result)) {
        dispatch({
          type: UPDATE_USER,
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
 * @description ADD GROUPS TO USER ACTION
 * @param {*} userID
 * @param {*} values
 */
export const addGroupsToUserAction =
  (userID, values = {}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: CALL_REQUEST
      });
      const { result, message } = await addGroupsToUserService(userID, values);

      if (!isEmpty(result)) {
        dispatch({
          type: UPDATE_USER,
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
 * @description DELETE USER BY ID ACTION
 * @param {*} userID
 * @param {*} query
 */
export const deleteUserByIdAction = (userID, query) => async (dispatch) => {
  try {
    dispatch({
      type: CALL_REQUEST
    });

    const result = await deleteUserByIdService(userID);

    if (!isEmpty(result)) {
      dispatch(
        showNotification(result.message, 'success', { vertical: 'top' })
      );
      dispatch(getAllUserAction(query));
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
 * @description SET USER TEMPORARY PASSWORD ACTION
 * @param {*} userID
 * @param {*} generatePass
 */
export const setUserTemporaryPasswordAction =
  (userID, generatePass) => async (dispatch) => {
    try {
      const result = await setUserTemporaryPasswordService(userID, {
        generatePass
      });
      if (!isEmpty(result)) {
        dispatch(
          showNotification(result.message, 'success', { vertical: 'top' })
        );
      }
    } catch (err) {
      const errorMsg = formatErrorMsg(err);
      dispatch(showNotification(errorMsg, 'error', { vertical: 'top' }));
    }
  };
