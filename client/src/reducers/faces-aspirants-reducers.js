import {
    FETCH_ASPIRANTS_ACTION,
    REQUEST_ASPIRANTS_ACTION,
    FAILURE_ASPIRANTS_ACTION, INS_ASPIRANTS_ACTION, DEL_ASPIRANTS_ACTION, UPD_ASPIRANTS_ACTION,
} from "../utils/consts";

const facesAspirantsReducer = (state, action) => {
    if (state === undefined) {
        return {
            dataset: [],
            isLoading: false,
            error: null,
        }
    }

    switch (action.type) {
        case FETCH_ASPIRANTS_ACTION:
            return {
                dataset: action.payload.data,
                datasetDependsOnId: action.payload.datasetDependsOnId,
                isLoading: false,
                error: null,
            }
        case REQUEST_ASPIRANTS_ACTION:
            return {
                ...state,
                isLoading: true
            }
        case FAILURE_ASPIRANTS_ACTION:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            }
        case INS_ASPIRANTS_ACTION:
            return {
                ...state,
                dataset: [...state.dataset, action.payload.data],
                isLoading: false,
                error: null,
            }
        case DEL_ASPIRANTS_ACTION:
            return {
                ...state,
                dataset: state.dataset.filter(item => item.id !== action.payload),
                isLoading: false,
                error: null,
            }
        case UPD_ASPIRANTS_ACTION:
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

export default facesAspirantsReducer;