import { showNotification } from 'story-bootstrap';
import { get, isEmpty } from 'lodash';
import {
  getAllRealmService,
  createRealmService,
  getRealmByIdService,
  updateRealmByIdService,
  deleteRealmByIdService
} from '@services/index';
import {
  GET_ALL_REALM,
  GET_REALM_ID,
  CREATE_REALM,
  UPDATE_REALM,
  RESET_REALM_RECORD
} from '../customTypes';
import { showPopup } from './popupActions';

export const resetRealmRecord = () => ({
  type: RESET_REALM_RECORD
});

export const getAllRealmAction =
  (query = {}) =>
  async (dispatch) => {
    try {
      const { result } = await getAllRealmService(query);

      if (!isEmpty(result)) {
        dispatch({
          type: GET_ALL_REALM,
          payload: {
            data: result.response,
            total: result.total
          }
        });
      }
    } catch (error) {
      const errorMsg = get(error, 'response.data.message', error.message);
      dispatch(showNotification(errorMsg, 'error', { vertical: 'top' }));
    }
  };

export const createRealmAction =
  (opts = {}, values = {}) =>
  async (dispatch) => {
    const { navigate } = opts;
    try {
      const { result } = await createRealmService(values);

      if (!isEmpty(result)) {
        const realmID = get(result, 'response.id');
        dispatch({
          type: CREATE_REALM,
          payload: result
        });
        navigate(`/realm-edit/${realmID}`);
      }
    } catch (err) {
      const errorMsg = get(err, 'response.data.message');
      dispatch(showNotification(errorMsg, 'error', { vertical: 'top' }));
    }
  };

export const getRealmByIdAction = (realmID) => async (dispatch) => {
  try {
    const data = await getRealmByIdService(realmID);

    if (!isEmpty(data)) {
      dispatch({
        type: GET_REALM_ID,
        payload: {
          record: data
        }
      });
    }
  } catch (err) {
    const errorMsg = get(err, 'response.data.message');
    dispatch(showNotification(errorMsg, 'error', { vertical: 'top' }));
  }
};

export const updateRealmByIdAction =
  (realmID, values = {}) =>
  async (dispatch) => {
    try {
      const { result, message } = await updateRealmByIdService(realmID, values);

      if (!isEmpty(result)) {
        dispatch({
          type: UPDATE_REALM,
          payload: result.response
        });
        dispatch(showNotification(message, 'success', { vertical: 'top' }));
      }
    } catch (err) {
      const errorMsg = get(err, 'response.data.message');
      dispatch(showNotification(errorMsg, 'error', { vertical: 'top' }));
    }
  };

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
    const errorMsg = get(err, 'response.data.message');
    dispatch(showNotification(errorMsg, 'error', { vertical: 'top' }));
  }
};
