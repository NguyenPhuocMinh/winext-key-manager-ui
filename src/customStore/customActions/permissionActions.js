import { showNotification } from 'story-bootstrap';
import { get, isEmpty } from 'lodash';
import {
  getAllPermissionService,
  createPermissionService,
  getPermissionByIdService,
  updatePermissionByIdService,
  deletePermissionByIdService,
  addRolesToPermissionService
} from '@services/index';
import { formatErrorMsg } from '@helpers/index';
import {
  CALL_REQUEST,
  END_REQUEST,
  GET_ALL_PERMISSION,
  GET_PERMISSION_ID,
  CREATE_PERMISSION,
  UPDATE_PERMISSION,
  RESET_PERMISSION_RECORD
} from '../customTypes';
import { showPopup } from './popupActions';

export const resetPermissionRecord = () => ({
  type: RESET_PERMISSION_RECORD
});

/**
 * @description Get All Permission Action
 * @param {*} permissionID
 * @param {*} values
 */
export const getAllPermissionAction =
  (query = {}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: CALL_REQUEST
      });

      const { result } = await getAllPermissionService(query);

      if (!isEmpty(result)) {
        dispatch({
          type: GET_ALL_PERMISSION,
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
 * @description Create Permission Action
 * @param {*} permissionID
 * @param {*} values
 */
export const createPermissionAction =
  (opts = {}, values = {}) =>
  async (dispatch) => {
    const { navigate } = opts;

    try {
      dispatch({
        type: CALL_REQUEST
      });

      const { result } = await createPermissionService(values);

      if (!isEmpty(result)) {
        const permissionID = get(result, 'response.id');
        dispatch({
          type: CREATE_PERMISSION,
          payload: result
        });
        dispatch({
          type: END_REQUEST
        });
        navigate(`/permission-edit/${permissionID}`);
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
 * @description Get Permission By ID Action
 * @param {*} permissionID
 * @param {*} values
 */
export const getPermissionByIdAction = (permissionID) => async (dispatch) => {
  try {
    dispatch({
      type: CALL_REQUEST
    });

    const data = await getPermissionByIdService(permissionID);

    if (!isEmpty(data)) {
      dispatch({
        type: GET_PERMISSION_ID,
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
 * @description Update Permission By ID Action
 * @param {*} permissionID
 * @param {*} values
 */
export const updatePermissionByIdAction =
  (permissionID, values = {}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: CALL_REQUEST
      });

      const { result, message } = await updatePermissionByIdService(
        permissionID,
        values
      );

      if (!isEmpty(result)) {
        dispatch({
          type: UPDATE_PERMISSION,
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
 * @description Delete Permission By ID Action
 * @param {*} permissionID
 * @param {*} values
 */
export const deletePermissionByIdAction =
  (permissionID, query) => async (dispatch) => {
    try {
      dispatch({
        type: CALL_REQUEST
      });

      const result = await deletePermissionByIdService(permissionID);
      if (!isEmpty(result)) {
        dispatch(
          showNotification(result.message, 'success', { vertical: 'top' })
        );
        dispatch(getAllPermissionAction(query));
        dispatch(
          showPopup({
            open: false,
            title: '',
            content: '',
            onSubmit: () => ({}),
            options: {}
          })
        );
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
 * @description Add Roles To Permission Action
 * @param {*} permissionID
 * @param {*} values
 */
export const addRolesToPermissionAction =
  (permissionID, values = {}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: CALL_REQUEST
      });

      const { result, message } = await addRolesToPermissionService(
        permissionID,
        values
      );

      if (!isEmpty(result)) {
        dispatch({
          type: UPDATE_PERMISSION,
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
