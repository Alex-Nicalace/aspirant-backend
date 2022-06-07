import {
    FETCH_DICT_SUBJECT_ACTION,
    REQUEST_DICT_SUBJECT_ACTION,
    FAILURE_DICT_SUBJECT_ACTION, INS_DICT_SUBJECT_ACTION, DEL_DICT_SUBJECT_ACTION, UPD_DICT_SUBJECT_ACTION, SUCCESS, ERROR, WARNING,
} from "../utils/consts";
import {setDisappearingMessage} from "./messages-actions";

export const dictSubjectLoaded = (data) => {
    return {
        type: FETCH_DICT_SUBJECT_ACTION,
        payload: data,
    }
}

export const dictSubjectRequested = () => {
    return {
        type: REQUEST_DICT_SUBJECT_ACTION,
    }
}

export const dictSubjectError = (error) => {
    return {
        type: FAILURE_DICT_SUBJECT_ACTION,
        payload: error,
    }
}

export const dictSubjectInserted = (data) => {
    return {
        type: INS_DICT_SUBJECT_ACTION,
        payload: data,
    }
}

export const dictSubjectDeleted = (id) => {
    return {
        type: DEL_DICT_SUBJECT_ACTION,
        payload: id,
    }
}

export const dictSubjectUpdated = (data) => {
    return {
        type: UPD_DICT_SUBJECT_ACTION,
        payload: data,
    }
}

export const fetchDictSubject = async (api, dispatch) => {
    dispatch(dictSubjectRequested());
    try{
        const response = await api.getAll();
        dispatch(dictSubjectLoaded(response));
    }catch (e) {
        dispatch(dictSubjectError(e.response))
    }
}

export const insertDictSubject = (rec) => async (api, dispatch) => {
    dispatch(dictSubjectRequested());
    try {
        const response = await api.post(rec);
        dispatch(dictSubjectInserted(response));
        dispatch(setDisappearingMessage('запись успешно добавлена', SUCCESS));
    } catch (e) {
        dispatch(dictSubjectError(e.response));
        dispatch(setDisappearingMessage(`запись не добавлена... ${e.response.data.message}`, ERROR));
    }
}

export const deleteDictSubject = (id) => async (api, dispatch) => {
    dispatch(dictSubjectRequested());
    try {
        await api.delete(id);
        dispatch(dictSubjectDeleted(id));
        dispatch(setDisappearingMessage('запись удалена', WARNING));
    } catch (e) {
        dispatch(dictSubjectError(e.response));
        dispatch(setDisappearingMessage(`запись не удалена... ${e.response.data.message}`, ERROR));
    }
}

export const updateDictSubject = (rec) => async (api, dispatch) => {
    dispatch(dictSubjectRequested());
    try {
        const response = await api.put(rec);
        dispatch(dictSubjectUpdated(response));
        dispatch(setDisappearingMessage('запись успешно обновлена', SUCCESS));
    } catch (e) {
        dispatch(dictSubjectError(e.response));
        dispatch(setDisappearingMessage(`запись не обновлена ${e.response.data.message}`, ERROR));
    }
}