import {
    FETCH_ORDERS_ACTION,
    REQUEST_ORDERS_ACTION,
    FAILURE_ORDERS_ACTION, INS_ORDERS_ACTION, DEL_ORDERS_ACTION, UPD_ORDERS_ACTION,
} from "../utils/consts";

const ordersReducer = (state, action) => {
    if (state === undefined) {
        return {
            dataset: [],
            isLoading: false,
            error: null,
        }
    }

    switch (action.type) {
        case FETCH_ORDERS_ACTION:
            return {
                dataset: action.payload.data,
                isLoading: false,
                error: null,
            }
        case REQUEST_ORDERS_ACTION:
            return {
                ...state,
                isLoading: true
            }
        case FAILURE_ORDERS_ACTION:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            }
        case INS_ORDERS_ACTION:
            return {
                dataset: [...state.dataset, action.payload.data],
                isLoading: false,
                error: null,
            }
        case DEL_ORDERS_ACTION:
            return {
                dataset: state.dataset.filter(item => item.id !== action.payload),
                isLoading: false,
                error: null,
            }
        case UPD_ORDERS_ACTION:
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

export default ordersReducer;