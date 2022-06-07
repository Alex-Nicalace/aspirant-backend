import {
    FETCH_DICT_EDUCATION_LEVELS_ACTION,
    REQUEST_DICT_EDUCATION_LEVELS_ACTION,
    FAILURE_DICT_EDUCATION_LEVELS_ACTION, INS_DICT_EDUCATION_LEVELS_ACTION, DEL_DICT_EDUCATION_LEVELS_ACTION, UPD_DICT_EDUCATION_LEVELS_ACTION, SUCCESS, ERROR, WARNING,
} from "../utils/consts";
import {setDisappearingMessage} from "./messages-actions";

export const dictEducationLevelsLoaded = (data) => {
    return {
        type: FETCH_DICT_EDUCATION_LEVELS_ACTION,
        payload: data,
    }
}

export const dictEducationLevelsRequested = () => {
    return {
        type: REQUEST_DICT_EDUCATION_LEVELS_ACTION,
    }
}

export const dictEducationLevelsError = (error) => {
    return {
        type: FAILURE_DICT_EDUCATION_LEVELS_ACTION,
        payload: error,
    }
}

export const dictEducationLevelsInserted = (data) => {
    return {
        type: INS_DICT_EDUCATION_LEVELS_ACTION,
        payload: data,
    }
}

export const dictEducationLevelsDeleted = (id) => {
    return {
        type: DEL_DICT_EDUCATION_LEVELS_ACTION,
        payload: id,
    }
}

export const dictEducationLevelsUpdated = (data) => {
    return {
        type: UPD_DICT_EDUCATION_LEVELS_ACTION,
        payload: data,
    }
}

export const fetchDictEducationLevels = async (api, dispatch) => {
    dispatch(dictEducationLevelsRequested());
    try{
        const response = await api.getAll();
        dispatch(dictEducationLevelsLoaded(response));
    }catch (e) {
        dispatch(dictEducationLevelsError(e.response))
    }
}

export const insertDictEducationLevels = (rec) => async (api, dispatch) => {
    dispatch(dictEducationLevelsRequested());
    try {
        const response = await api.post(rec);
        dispatch(dictEducationLevelsInserted(response));
        dispatch(setDisappearingMessage('запись успешно добавлена', SUCCESS));
    } catch (e) {
        dispatch(dictEducationLevelsError(e.response));
        dispatch(setDisappearingMessage(`запись не добавлена... ${e.response.data.message}`, ERROR));
    }
}

export const deleteDictEducationLevels = (id) => async (api, dispatch) => {
    dispatch(dictEducationLevelsRequested());
    try {
        await api.delete(id);
        dispatch(dictEducationLevelsDeleted(id));
        dispatch(setDisappearingMessage('запись удалена', WARNING));
    } catch (e) {
        dispatch(dictEducationLevelsError(e.response));
        dispatch(setDisappearingMessage(`запись не удалена... ${e.response.data.message}`, ERROR));
    }
}

export const updateDictEducationLevels = (rec) => async (api, dispatch) => {
    dispatch(dictEducationLevelsRequested());
    try {
        const response = await api.put(rec);
        dispatch(dictEducationLevelsUpdated(response));
        dispatch(setDisappearingMessage('запись успешно обновлена', SUCCESS));
    } catch (e) {
        dispatch(dictEducationLevelsError(e.response));
        dispatch(setDisappearingMessage(`запись не обновлена ${e.response.data.message}`, ERROR));
    }
}