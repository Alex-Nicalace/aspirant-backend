import {
    FETCH_DICT_DIRECTIONALITY_AND_SPECIALTY_ACTION,
    REQUEST_DICT_DIRECTIONALITY_AND_SPECIALTY_ACTION,
    FAILURE_DICT_DIRECTIONALITY_AND_SPECIALTY_ACTION,
    INS_DICT_DIRECTIONALITY_AND_SPECIALTY_ACTION,
    DEL_DICT_DIRECTIONALITY_AND_SPECIALTY_ACTION,
    UPD_DICT_DIRECTIONALITY_AND_SPECIALTY_ACTION,
    SUCCESS,
    ERROR,
    WARNING,
} from "../utils/consts";
import {setDisappearingMessage} from "./messages-actions";

export const dictDirectionalityAndSpecialtyLoaded = (data) => {
    return {
        type: FETCH_DICT_DIRECTIONALITY_AND_SPECIALTY_ACTION,
        payload: data,
    }
}

export const dictDirectionalityAndSpecialtyRequested = () => {
    return {
        type: REQUEST_DICT_DIRECTIONALITY_AND_SPECIALTY_ACTION,
    }
}

export const dictDirectionalityAndSpecialtyError = (error) => {
    return {
        type: FAILURE_DICT_DIRECTIONALITY_AND_SPECIALTY_ACTION,
        payload: error,
    }
}

export const dictDirectionalityAndSpecialtyInserted = (data) => {
    return {
        type: INS_DICT_DIRECTIONALITY_AND_SPECIALTY_ACTION,
        payload: data,
    }
}

export const dictDirectionalityAndSpecialtyDeleted = (id) => {
    return {
        type: DEL_DICT_DIRECTIONALITY_AND_SPECIALTY_ACTION,
        payload: id,
    }
}

export const dictDirectionalityAndSpecialtyUpdated = (data) => {
    return {
        type: UPD_DICT_DIRECTIONALITY_AND_SPECIALTY_ACTION,
        payload: data,
    }
}

export const fetchDictDirectionalityAndSpecialty = async (api, dispatch) => {
    dispatch(dictDirectionalityAndSpecialtyRequested());
    try {
        const response = await api.getAll();
        dispatch(dictDirectionalityAndSpecialtyLoaded(response));
    } catch (e) {
        dispatch(dictDirectionalityAndSpecialtyError(e.response))
    }
}

export const insertDictDirectionalityAndSpecialty = (rec) => async (api, dispatch) => {
    dispatch(dictDirectionalityAndSpecialtyRequested());
    try {
        const response = await api.post(rec);
        dispatch(dictDirectionalityAndSpecialtyInserted(response));
        dispatch(setDisappearingMessage('запись успешно добавлена', SUCCESS));
    } catch (e) {
        dispatch(dictDirectionalityAndSpecialtyError(e.response));
        dispatch(setDisappearingMessage(`запись не добавлена... ${e.response.data.message}`, ERROR));
    }
}

export const deleteDictDirectionalityAndSpecialty = (id) => async (api, dispatch) => {
    dispatch(dictDirectionalityAndSpecialtyRequested());
    try {
        await api.delete(id);
        dispatch(dictDirectionalityAndSpecialtyDeleted(id));
        dispatch(setDisappearingMessage('запись удалена', WARNING));
    } catch (e) {
        dispatch(dictDirectionalityAndSpecialtyError(e.response));
        dispatch(setDisappearingMessage(`запись не удалена... ${e.response.data.message}`, ERROR));
    }
}

export const updateDictDirectionalityAndSpecialty = (rec) => async (api, dispatch) => {
    dispatch(dictDirectionalityAndSpecialtyRequested());
    try {
        const response = await api.put(rec);
        dispatch(dictDirectionalityAndSpecialtyUpdated(response));
        dispatch(setDisappearingMessage('запись успешно обновлена', SUCCESS));
    } catch (e) {
        dispatch(dictDirectionalityAndSpecialtyError(e.response));
        dispatch(setDisappearingMessage(`запись не обновлена ${e.response.data.message}`, ERROR));
    }
}