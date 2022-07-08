import { showNotification } from 'story-bootstrap';
import { get, isEmpty } from 'lodash';
import { saveKeyByRealmService, getKeyByRealmService } from '@services/index';
import { formatErrorMsg } from '@helpers/index';
import {
  CALL_REQUEST,
  END_REQUEST,
  SAVE_KEY_BY_REALM,
  GET_KEY_BY_REALM
} from '../customTypes';

/**
 * @description SAVE KEY BY REALM ACTION
 * @param {*} realmName
 * @param {*} values
 */
export const saveKeyByRealmAction =
  (realmName, values = {}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: CALL_REQUEST
      });

      const { result, message } = await saveKeyByRealmService(
        realmName,
        values
      );

      if (!isEmpty(result)) {
        dispatch({
          type: SAVE_KEY_BY_REALM,
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
 * @description GET KEY BY REALM ACTION
 * @param {*} realmName
 */
export const getKeyByRealmAction = (realmName) => async (dispatch) => {
  try {
    dispatch({
      type: CALL_REQUEST
    });

    const data = await getKeyByRealmService(realmName);

    if (!isEmpty(data)) {
      dispatch({
        type: GET_KEY_BY_REALM,
        payload: {
          record: data
        }
      });
      dispatch({
        type: END_REQUEST
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
