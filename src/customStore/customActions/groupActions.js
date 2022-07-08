import { showNotification } from 'story-bootstrap';
import { get, isEmpty } from 'lodash';
import {
  getAllGroupService,
  createGroupService,
  getGroupByIdService,
  updateGroupByIdService,
  deleteGroupByIdService,
  getUsersInGroupByGroupNameService
} from '@services/index';
import {
  CALL_REQUEST,
  END_REQUEST,
  GET_ALL_GROUP,
  GET_GROUP_ID,
  CREATE_GROUP,
  UPDATE_GROUP,
  RESET_GROUP_RECORD,
  GET_ALL_USER_IN_GROUP
} from '../customTypes';
import { showPopup } from './popupActions';

export const resetGroupRecord = () => ({
  type: RESET_GROUP_RECORD
});

/**
 * @description GET ALL GROUP ACTION
 * @param {*} query
 */
export const getAllGroupAction =
  (query = {}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: CALL_REQUEST
      });

      const { result } = await getAllGroupService(query);

      if (!isEmpty(result)) {
        dispatch({
          type: GET_ALL_GROUP,
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
 * @description CREATE GROUP ACTION
 * @param {*} opts
 * @param {*} values
 */
export const createGroupAction =
  (opts = {}, values = {}) =>
  async (dispatch) => {
    const { navigate } = opts;
    try {
      dispatch({
        type: CALL_REQUEST
      });

      const { result } = await createGroupService(values);

      if (!isEmpty(result)) {
        const groupID = get(result, 'response.id');
        dispatch({
          type: CREATE_GROUP,
          payload: result
        });
        dispatch({
          type: END_REQUEST
        });
        navigate(`/group-edit/${groupID}`);
      }
    } catch (err) {
      dispatch({
        type: END_REQUEST
      });
      const errorMsg = get(err, 'response.data.message');
      dispatch(showNotification(errorMsg, 'error', { vertical: 'top' }));
    }
  };

/**
 * @description GET GROUP BY ID ACTION
 * @param {*} groupID
 */
export const getGroupByIdAction = (groupID) => async (dispatch) => {
  try {
    dispatch({
      type: CALL_REQUEST
    });

    const data = await getGroupByIdService(groupID);

    if (!isEmpty(data)) {
      dispatch({
        type: GET_GROUP_ID,
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
    const errorMsg = get(err, 'response.data.message');
    dispatch(showNotification(errorMsg, 'error', { vertical: 'top' }));
  }
};

/**
 * @description UPDATE GROUP BY ID ACTION
 * @param {*} groupID
 * @param {*} values
 */
export const updateGroupByIdAction =
  (groupID, values = {}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: CALL_REQUEST
      });

      const { result, message } = await updateGroupByIdService(groupID, values);

      if (!isEmpty(result)) {
        dispatch({
          type: UPDATE_GROUP,
          payload: result.response
        });
        dispatch(showNotification(message, 'success', { vertical: 'top' }));
        dispatch({
          type: END_REQUEST
        });
      }
    } catch (err) {
      dispatch({
        type: END_REQUEST
      });
      const errorMsg = get(err, 'response.data.message');
      dispatch(showNotification(errorMsg, 'error', { vertical: 'top' }));
    }
  };

export const deleteGroupByIdAction = (groupID, query) => async (dispatch) => {
  try {
    const result = await deleteGroupByIdService(groupID);
    if (!isEmpty(result)) {
      dispatch(
        showNotification(result.message, 'success', { vertical: 'top' })
      );
      dispatch(getAllGroupAction(query));
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
    const errorMsg = get(err, 'response.data.message');
    dispatch(showNotification(errorMsg, 'error', { vertical: 'top' }));
  }
};

/**
 * @description GET ALL USER BY GROUP NAME ACTION
 * @param {*} groupName
 * @param {*} query
 */
export const getUsersByGroupNameAction =
  (groupName, realmName, query) => async (dispatch) => {
    try {
      dispatch({
        type: CALL_REQUEST
      });

      const { result } = await getUsersInGroupByGroupNameService(
        groupName,
        realmName,
        query
      );

      if (!isEmpty(result)) {
        dispatch({
          type: GET_ALL_USER_IN_GROUP,
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
