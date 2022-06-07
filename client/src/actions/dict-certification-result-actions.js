import {
    FETCH_DICT_CERTIFICATION_RESULT_ACTION,
    REQUEST_DICT_CERTIFICATION_RESULT_ACTION,
    FAILURE_DICT_CERTIFICATION_RESULT_ACTION,
    INS_DICT_CERTIFICATION_RESULT_ACTION,
    DEL_DICT_CERTIFICATION_RESULT_ACTION,
    UPD_DICT_CERTIFICATION_RESULT_ACTION,
    SUCCESS,
    ERROR,
    WARNING,
} from "../utils/consts";
import {setDisappearingMessage} from "./messages-actions";

export const dictCertificationResultLoaded = (data) => {
    return {
        type: FETCH_DICT_CERTIFICATION_RESULT_ACTION,
        payload: data,
    }
}

export const dictCertificationResultRequested = () => {
    return {
        type: REQUEST_DICT_CERTIFICATION_RESULT_ACTION,
    }
}

export const dictCertificationResultError = (error) => {
    return {
        type: FAILURE_DICT_CERTIFICATION_RESULT_ACTION,
        payload: error,
    }
}

export const dictCertificationResultInserted = (data) => {
    return {
        type: INS_DICT_CERTIFICATION_RESULT_ACTION,
        payload: data,
    }
}

export const dictCertificationResultDeleted = (id) => {
    return {
        type: DEL_DICT_CERTIFICATION_RESULT_ACTION,
        payload: id,
    }
}

export const dictCertificationResultUpdated = (data) => {
    return {
        type: UPD_DICT_CERTIFICATION_RESULT_ACTION,
        payload: data,
    }
}

export const fetchDictCertificationResult = async (api, dispatch) => {
    dispatch(dictCertificationResultRequested());
    try {
        const response = await api.getAll();
        dispatch(dictCertificationResultLoaded(response));
    } catch (e) {
        dispatch(dictCertificationResultError(e.response))
    }
}

export const insertDictCertificationResult = (rec) => async (api, dispatch) => {
    dispatch(dictCertificationResultRequested());
    try {
        const response = await api.post(rec);
        dispatch(dictCertificationResultInserted(response));
        dispatch(setDisappearingMessage('запись успешно добавлена', SUCCESS));
    } catch (e) {
        dispatch(dictCertificationResultError(e.response));
        dispatch(setDisappearingMessage(`запись не добавлена... ${e.response.data.message}`, ERROR));
    }
}

export const deleteDictCertificationResult = (id) => async (api, dispatch) => {
    dispatch(dictCertificationResultRequested());
    try {
        await api.delete(id);
        dispatch(dictCertificationResultDeleted(id));
        dispatch(setDisappearingMessage('запись удалена', WARNING));
    } catch (e) {
        dispatch(dictCertificationResultError(e.response));
        dispatch(setDisappearingMessage(`запись не удалена... ${e.response.data.message}`, ERROR));
    }
}

export const updateDictCertificationResult = (rec) => async (api, dispatch) => {
    dispatch(dictCertificationResultRequested());
    try {
        const response = await api.put(rec);
        dispatch(dictCertificationResultUpdated(response));
        dispatch(setDisappearingMessage('запись успешно обновлена', SUCCESS));
    } catch (e) {
        dispatch(dictCertificationResultError(e.response));
        dispatch(setDisappearingMessage(`запись не обновлена ${e.response.data.message}`, ERROR));
    }
}