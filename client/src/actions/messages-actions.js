import {CLEAR_MESSAGE_ACTION, DURATION_MESSAGE, SET_MESSAGE_ACTION} from "../utils/consts";

export const setMessage = (message, typeMessage = null) => {
    return {
        type: SET_MESSAGE_ACTION,
        payload: {message, typeMessage},
    }
}

export const clearMessage = () => {
    return {
        type: CLEAR_MESSAGE_ACTION,
    }
}

export const setDisappearingMessage = (message, typeMessage, timeout = DURATION_MESSAGE) => (dispatch) => {
    dispatch(setMessage(message, typeMessage));
    setTimeout(() => dispatch(clearMessage()), timeout);
}