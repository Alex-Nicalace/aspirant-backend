import {
    FETCH_DICT_EDUCATION_FORM_ACTION,
    REQUEST_DICT_EDUCATION_FORM_ACTION,
    FAILURE_DICT_EDUCATION_FORM_ACTION, INS_DICT_EDUCATION_FORM_ACTION, DEL_DICT_EDUCATION_FORM_ACTION, UPD_DICT_EDUCATION_FORM_ACTION, SUCCESS, ERROR, WARNING,
} from "../utils/consts";
import {setDisappearingMessage} from "./messages-actions";

export const dictEducationFormLoaded = (data) => {
    return {
        type: FETCH_DICT_EDUCATION_FORM_ACTION,
        payload: data,
    }
}

export const dictEducationFormRequested = () => {
    return {
        type: REQUEST_DICT_EDUCATION_FORM_ACTION,
    }
}

export const dictEducationFormError = (error) => {
    return {
        type: FAILURE_DICT_EDUCATION_FORM_ACTION,
        payload: error,
    }
}

export const dictEducationFormInserted = (data) => {
    return {
        type: INS_DICT_EDUCATION_FORM_ACTION,
        payload: data,
    }
}

export const dictEducationFormDeleted = (id) => {
    return {
        type: DEL_DICT_EDUCATION_FORM_ACTION,
        payload: id,
    }
}

export const dictEducationFormUpdated = (data) => {
    return {
        type: UPD_DICT_EDUCATION_FORM_ACTION,
        payload: data,
    }
}

export const fetchDictEducationForm = async (api, dispatch) => {
    dispatch(dictEducationFormRequested());
    try{
        const response = await api.getAll();
        dispatch(dictEducationFormLoaded(response));
    }catch (e) {
        dispatch(dictEducationFormError(e.response))
    }
}

export const insertDictEducationForm = (rec) => async (api, dispatch) => {
    dispatch(dictEducationFormRequested());
    try {
        const response = await api.post(rec);
        dispatch(dictEducationFormInserted(response));
        dispatch(setDisappearingMessage('запись успешно добавлена', SUCCESS));
    } catch (e) {
        dispatch(dictEducationFormError(e.response));
        dispatch(setDisappearingMessage(`запись не добавлена... ${e.response.data.message}`, ERROR));
    }
}

export const deleteDictEducationForm = (id) => async (api, dispatch) => {
    dispatch(dictEducationFormRequested());
    try {
        await api.delete(id);
        dispatch(dictEducationFormDeleted(id));
        dispatch(setDisappearingMessage('запись удалена', WARNING));
    } catch (e) {
        dispatch(dictEducationFormError(e.response));
        dispatch(setDisappearingMessage(`запись не удалена... ${e.response.data.message}`, ERROR));
    }
}

export const updateDictEducationForm = (rec) => async (api, dispatch) => {
    dispatch(dictEducationFormRequested());
    try {
        const response = await api.put(rec);
        dispatch(dictEducationFormUpdated(response));
        dispatch(setDisappearingMessage('запись успешно обновлена', SUCCESS));
    } catch (e) {
        dispatch(dictEducationFormError(e.response));
        dispatch(setDisappearingMessage(`запись не обновлена ${e.response.data.message}`, ERROR));
    }
}