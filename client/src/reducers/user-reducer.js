import {
    FETCH_USER_ACTION,
    REQUEST_USER_ACTION,
    FAILURE_USER_ACTION,
} from "../utils/consts";

const userReducer = (state, action) => {
    if (state === undefined) {
        return {
            data: null,
            isLoading: true,
            error: null,
        }
    }

    switch (action.type) {
        case FETCH_USER_ACTION:
            return {
                data: action.payload,
                isLoading: false,
                error: null,
            }
        case REQUEST_USER_ACTION:
            return {
                data: null,
                isLoading: true,
                error: null,
            }
        case FAILURE_USER_ACTION:
            return {
                data: null,
                isLoading: false,
                error: action.payload,
            }
        default:
            return state

    }
};

export default userReducer;