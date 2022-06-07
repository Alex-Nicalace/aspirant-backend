import {
    FETCH_FACES_ACTION,
    REQUEST_FACES_ACTION,
    FAILURE_FACES_ACTION, INS_FACES_ACTION, DEL_FACES_ACTION, UPD_FACES_ACTION,
} from "../utils/consts";

const facesReducer = (state, action) => {
    if (state === undefined) {
        return {
            dataset: [],
            isLoading: false,
            error: null,
        }
    }

    switch (action.type) {
        case FETCH_FACES_ACTION:
            return {
                dataset: action.payload.data,
                isLoading: false,
                error: null,
            }
        case REQUEST_FACES_ACTION:
            return {
                ...state,
                isLoading: true
            }
        case FAILURE_FACES_ACTION:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            }
        case INS_FACES_ACTION:
            return {
                dataset: [...state.dataset, action.payload.data],
                isLoading: false,
                error: null,
            }
        case DEL_FACES_ACTION:
            return {
                dataset: state.dataset.filter(item => item.id !== action.payload),
                isLoading: false,
                error: null,
            }
        case UPD_FACES_ACTION:
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

export default facesReducer;