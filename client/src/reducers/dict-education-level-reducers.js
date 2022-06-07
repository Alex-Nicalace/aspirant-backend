import {
    FETCH_DICT_EDUCATION_LEVELS_ACTION,
    REQUEST_DICT_EDUCATION_LEVELS_ACTION,
    FAILURE_DICT_EDUCATION_LEVELS_ACTION, INS_DICT_EDUCATION_LEVELS_ACTION, DEL_DICT_EDUCATION_LEVELS_ACTION, UPD_DICT_EDUCATION_LEVELS_ACTION,
} from "../utils/consts";

const dictEducationLevelsReducer = (state, action) => {
    if (state === undefined) {
        return {
            dataset: [],
            isLoading: false,
            error: null,
        }
    }

    switch (action.type) {
        case FETCH_DICT_EDUCATION_LEVELS_ACTION:
            return {
                dataset: action.payload.data,
                isLoading: false,
                error: null,
            }
        case REQUEST_DICT_EDUCATION_LEVELS_ACTION:
            return {
                ...state,
                isLoading: true
            }
        case FAILURE_DICT_EDUCATION_LEVELS_ACTION:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            }
        case INS_DICT_EDUCATION_LEVELS_ACTION:
            return {
                dataset: [...state.dataset, action.payload.data],
                isLoading: false,
                error: null,
            }
        case DEL_DICT_EDUCATION_LEVELS_ACTION:
            return {
                dataset: state.dataset.filter(item => item.id !== action.payload),
                isLoading: false,
                error: null,
            }
        case UPD_DICT_EDUCATION_LEVELS_ACTION:
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

export default dictEducationLevelsReducer;