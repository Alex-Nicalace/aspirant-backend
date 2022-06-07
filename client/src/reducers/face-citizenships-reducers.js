import {
    FETCH_FACE_CITIZENSHIPS_ACTION,
    REQUEST_FACE_CITIZENSHIPS_ACTION,
    FAILURE_FACE_CITIZENSHIPS_ACTION, INS_FACE_CITIZENSHIPS_ACTION, DEL_FACE_CITIZENSHIPS_ACTION, UPD_FACE_CITIZENSHIPS_ACTION,
} from "../utils/consts";

const faceCitizenshipsReducer = (state, action) => {
    if (state === undefined) {
        return {
            dataset: [],
            datasetDependsOnId: null, // загруженный датасет для указанного ИД
            isLoading: false,
            error: null,
        }
    }

    switch (action.type) {
        case FETCH_FACE_CITIZENSHIPS_ACTION:
            return {
                dataset: action.payload.data,
                datasetDependsOnId: action.payload.datasetDependsOnId,
                isLoading: false,
                error: null,
            }
        case REQUEST_FACE_CITIZENSHIPS_ACTION:
            return {
                ...state,
                isLoading: true
            }
        case FAILURE_FACE_CITIZENSHIPS_ACTION:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            }
        case INS_FACE_CITIZENSHIPS_ACTION:
            return {
                ...state,
                dataset: [...state.dataset, action.payload.data],
                isLoading: false,
                error: null,
            }
        case DEL_FACE_CITIZENSHIPS_ACTION:
            return {
                ...state,
                dataset: state.dataset.filter(item => item.id !== action.payload),
                isLoading: false,
                error: null,
            }
        case UPD_FACE_CITIZENSHIPS_ACTION:
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

export default faceCitizenshipsReducer;