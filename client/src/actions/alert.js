import * as types from '../actions/types';
import uuid from 'uuid';

export const setAlert = (msg, alertType, timeout = 3000) => dispatch => {
    const id = uuid.v4();
    if (msg?.response?.data?.message?.length && msg.response?.data.message[0].messages?.length) {
        msg = msg.response?.data.message[0].messages[0].message;
    }
    if (typeof msg !== 'string' && !(msg instanceof String)) msg = 'error';
    dispatch({
        type: types.SET_ALERT,
        payload: { msg, alertType, timeout, id }
    });
}