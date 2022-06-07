import {
    FETCH_ASPIRANT_ORDERS_ACTION,
    REQUEST_ASPIRANT_ORDERS_ACTION,
    FAILURE_ASPIRANT_ORDERS_ACTION, INS_ASPIRANT_ORDERS_ACTION, DEL_ASPIRANT_ORDERS_ACTION, UPD_ASPIRANT_ORDERS_ACTION,
} from "../utils/consts";

const aspirantOrdersReducer = (state, action) => {
    if (state === undefined) {
        return {
            dataset: [],
            datasetDependsOnId: null, // загруженный датасет для указанного ИД
            isLoading: false,
            error: null,
        }
    }

    switch (action.type) {
        case FETCH_ASPIRANT_ORDERS_ACTION:
            return {
                dataset: action.payload.data,
                datasetDependsOnId: action.payload.datasetDependsOnId,
                isLoading: false,
                error: null,
            }
        case REQUEST_ASPIRANT_ORDERS_ACTION:
            return {
                ...state,
                isLoading: true
            }
        case FAILURE_ASPIRANT_ORDERS_ACTION:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            }
        case INS_ASPIRANT_ORDERS_ACTION:
            return {
                dataset: [...state.dataset, action.payload.data],
                isLoading: false,
                error: null,
            }
        case DEL_ASPIRANT_ORDERS_ACTION:
            return {
                dataset: state.dataset.filter(item => item.id !== action.payload),
                isLoading: false,
                error: null,
            }
        case UPD_ASPIRANT_ORDERS_ACTION:
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

export default aspirantOrdersReducer;