import {
    FETCH_ORDER_FACES_ACTION,
    REQUEST_ORDER_FACES_ACTION,
    FAILURE_ORDER_FACES_ACTION, INS_ORDER_FACES_ACTION, DEL_ORDER_FACES_ACTION, UPD_ORDER_FACES_ACTION,
} from "../utils/consts";

const orderFacesReducer = (state, action) => {
    if (state === undefined) {
        return {
            dataset: [],
            datasetDependsOnId: null, // загруженный датасет для указанного ИД
            isLoading: false,
            error: null,
        }
    }

    switch (action.type) {
        case FETCH_ORDER_FACES_ACTION:
            return {
                dataset: action.payload.data,
                datasetDependsOnId: action.payload.datasetDependsOnId,
                isLoading: false,
                error: null,
            }
        case REQUEST_ORDER_FACES_ACTION:
            return {
                ...state,
                isLoading: true
            }
        case FAILURE_ORDER_FACES_ACTION:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            }
        case INS_ORDER_FACES_ACTION:
            return {
                ...state,
                dataset: [...state.dataset, action.payload.data],
                isLoading: false,
                error: null,
            }
        case DEL_ORDER_FACES_ACTION:
            return {
                ...state,
                dataset: state.dataset.filter(item => item.id !== action.payload),
                isLoading: false,
                error: null,
            }
        case UPD_ORDER_FACES_ACTION:
            return {
                ...state,
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

export default orderFacesReducer;