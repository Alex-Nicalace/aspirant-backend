import {
    FETCH_LIST_USERS_ACTION,
    REQUEST_LIST_USERS_ACTION,
    FAILURE_LIST_USERS_ACTION, INS_LIST_USERS_ACTION, DEL_LIST_USERS_ACTION, UPD_LIST_USERS_ACTION,
} from "../utils/consts";

const usersListReducer = (state, action) => {
    if (state === undefined) {
        return {
            dataset: [],
            isLoading: false,
            error: null,
        }
    }

    switch (action.type) {
        case FETCH_LIST_USERS_ACTION:
            return {
                dataset: action.payload.data,
                isLoading: false,
                error: null,
            }
        case REQUEST_LIST_USERS_ACTION:
            return {
                ...state,
                isLoading: true
            }
        case FAILURE_LIST_USERS_ACTION:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            }
        case INS_LIST_USERS_ACTION:
            return {
                dataset: [...state.dataset, action.payload.data],
                isLoading: false,
                error: null,
            }
        case DEL_LIST_USERS_ACTION:
            return {
                dataset: state.dataset.filter(item => item.id !== action.payload),
                isLoading: false,
                error: null,
            }
        case UPD_LIST_USERS_ACTION:
            return {
                dataset: state.dataset.map(i => {
                    if (i.id === action.payload.data.id) {
                        return action.payload.data
                    }
                    return i
                }),
                isLoading: false,
                error: null,
            }
        default:
            return state

    }
};

export default usersListReducer;