import { showNotification } from 'story-bootstrap';
import { get, isEmpty } from 'lodash';
import {
  getAllRoleService,
  createRoleService,
  getRoleByIdService,
  updateRoleByIdService,
  deleteRoleByIdService,
  getUsersInRoleByRoleNameService,
  getPermissionsInRoleByRoleNameService
} from '@services/index';
import { formatErrorMsg } from '@helpers/index';
import {
  CALL_REQUEST,
  END_REQUEST,
  GET_ALL_ROLE,
  GET_ROLE_ID,
  CREATE_ROLE,
  UPDATE_ROLE,
  RESET_ROLE_RECORD,
  GET_ALL_USER_IN_ROLE,
  GET_ALL_PERMISSION_IN_ROLE
} from '../customTypes';
import { showPopup } from './popupActions';

export const resetRoleRecord = () => ({
  type: RESET_ROLE_RECORD
});

/**
 * @description GET ALL ROLE ACTION
 * @param {*} query
 */
export const getAllRoleAction =
  (query = {}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: CALL_REQUEST
      });

      const { result } = await getAllRoleService(query);

      if (!isEmpty(result)) {
        dispatch({
          type: GET_ALL_ROLE,
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
 * @description CREATE ROLE ACTION
 * @param {*} opts
 * @param {*} values
 */
export const createRoleAction =
  (opts = {}, values = {}) =>
  async (dispatch) => {
    const { navigate } = opts;
    try {
      dispatch({
        type: CALL_REQUEST
      });

      const { result } = await createRoleService(values);

      if (!isEmpty(result)) {
        const roleID = get(result, 'response.id');
        dispatch({
          type: CREATE_ROLE,
          payload: result
        });
        dispatch({
          type: END_REQUEST
        });
        navigate(`/role-edit/${roleID}`);
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
 * @description GET ROLE BY ID ACTION
 * @param {*} roleID
 */
export const getRoleByIdAction = (roleID) => async (dispatch) => {
  try {
    dispatch({
      type: CALL_REQUEST
    });

    const data = await getRoleByIdService(roleID);

    if (!isEmpty(data)) {
      dispatch({
        type: GET_ROLE_ID,
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
 * @description UPDATE ROLE BY ID ACTION
 * @param {*} roleID
 * @param {*} values
 */
export const updateRoleByIdAction =
  (roleID, values = {}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: CALL_REQUEST
      });

      const { result, message } = await updateRoleByIdService(roleID, values);

      if (!isEmpty(result)) {
        dispatch({
          type: UPDATE_ROLE,
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
 * @description DELETE ROLE BY ID ACTION
 * @param {*} roleID
 * @param {*} query
 */
export const deleteRoleByIdAction = (roleID, query) => async (dispatch) => {
  try {
    dispatch({
      type: CALL_REQUEST
    });

    const result = await deleteRoleByIdService(roleID);
    if (!isEmpty(result)) {
      dispatch(
        showNotification(result.message, 'success', { vertical: 'top' })
      );
      dispatch(getAllRoleAction(query));
      dispatch(
        showPopup({
          open: false,
          title: '',
          content: '',
          onSubmit: () => ({}),
          options: {}
        })
      );
    } else {
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
 * @description GET ALL USER BY ROLE NAME ACTION
 * @param {*} roleName
 * @param {*} query
 */
export const getUsersByRoleNameAction =
  (roleName, query) => async (dispatch) => {
    try {
      dispatch({
        type: CALL_REQUEST
      });

      const { result } = await getUsersInRoleByRoleNameService(roleName, query);

      if (!isEmpty(result)) {
        dispatch({
          type: GET_ALL_USER_IN_ROLE,
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
 * @description GET ALL PERMISSION BY ROLE NAME ACTION
 * @param {*} roleName
 * @param {*} query
 */
export const getPermissionsByRoleNameAction =
  (roleName, query) => async (dispatch) => {
    try {
      dispatch({
        type: CALL_REQUEST
      });

      const { result } = await getPermissionsInRoleByRoleNameService(
        roleName,
        query
      );

      if (!isEmpty(result)) {
        dispatch({
          type: GET_ALL_PERMISSION_IN_ROLE,
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
