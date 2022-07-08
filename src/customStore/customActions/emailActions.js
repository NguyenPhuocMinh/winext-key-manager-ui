import { showNotification } from 'story-bootstrap';
import { get, isEmpty } from 'lodash';
import {
  saveEmailByRealmService,
  getEmailByRealmService
} from '@services/index';
import { formatErrorMsg } from '@helpers/index';
import {
  CALL_REQUEST,
  END_REQUEST,
  SAVE_EMAIL_BY_REALM,
  GET_EMAIL_BY_REALM
} from '../customTypes';

/**
 * @description SAVE EMAIL BY REALM ACTION
 * @param {*} realmName
 * @param {*} values
 */
export const saveEmailByRealmAction =
  (realmName, values = {}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: CALL_REQUEST
      });

      const { result, message } = await saveEmailByRealmService(
        realmName,
        values
      );

      if (!isEmpty(result)) {
        dispatch({
          type: SAVE_EMAIL_BY_REALM,
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
 * @description GET EMAIL BY REALM ACTION
 * @param {*} realmName
 */
export const getEmailByRealmAction = (realmName) => async (dispatch) => {
  try {
    dispatch({
      type: CALL_REQUEST
    });

    const data = await getEmailByRealmService(realmName);

    if (!isEmpty(data)) {
      dispatch({
        type: GET_EMAIL_BY_REALM,
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
