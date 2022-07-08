import { showNotification } from 'story-bootstrap';
import { get, isEmpty } from 'lodash';
import {
  saveTokenByRealmService,
  getTokenByRealmService
} from '@services/index';
import { formatErrorMsg } from '@helpers/index';
import {
  CALL_REQUEST,
  END_REQUEST,
  SAVE_TOKEN_BY_REALM,
  GET_TOKEN_BY_REALM
} from '../customTypes';

/**
 * @description SAVE TOKEN BY REALM ACTION
 * @param {*} realmName
 * @param {*} values
 */
export const saveTokenByRealmAction =
  (realmName, values = {}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: CALL_REQUEST
      });

      const { result, message } = await saveTokenByRealmService(
        realmName,
        values
      );

      if (!isEmpty(result)) {
        dispatch({
          type: SAVE_TOKEN_BY_REALM,
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
      const errorMsg = get(err, 'response.data.message');
      dispatch(showNotification(errorMsg, 'error', { vertical: 'top' }));
    }
  };

/**
 * @description GET TOKEN BY REALM ACTION
 * @param {*} realmName
 */
export const getTokenByRealmAction = (realmName) => async (dispatch) => {
  try {
    dispatch({
      type: CALL_REQUEST
    });

    const data = await getTokenByRealmService(realmName);

    if (!isEmpty(data)) {
      dispatch({
        type: GET_TOKEN_BY_REALM,
        payload: {
          record: data
        }
      });
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
