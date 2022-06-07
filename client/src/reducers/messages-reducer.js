import {CLEAR_MESSAGE_ACTION, SET_MESSAGE_ACTION} from "../utils/consts";

const messagesReducer = (state, action) => {
    if (state === undefined) {
        return {
            message: '',
            typeMessage: '',
        }
    }

    switch (action.type) {
        case SET_MESSAGE_ACTION:
            return {
                message: action.payload.message,
                typeMessage: action.payload.typeMessage,
            }
        case CLEAR_MESSAGE_ACTION:
            return {
                message: '',
                typeMessage: '',
            }
        default:
            return state
    }
}

export default messagesReducer;