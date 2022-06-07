import {
    FETCH_DICT_ENTERPRISE_ACTION,
    REQUEST_DICT_ENTERPRISE_ACTION,
    FAILURE_DICT_ENTERPRISE_ACTION,
    INS_DICT_ENTERPRISE_ACTION,
    DEL_DICT_ENTERPRISE_ACTION,
    UPD_DICT_ENTERPRISE_ACTION,
    SUCCESS,
    ERROR,
    WARNING,
} from "../utils/consts";
import {setDisappearingMessage} from "./messages-actions";

export const dictEnterpriseLoaded = (data) => {
    return {
        type: FETCH_DICT_ENTERPRISE_ACTION,
        payload: data,
    }
}

export const dictEnterpriseRequested = () => {
    return {
        type: REQUEST_DICT_ENTERPRISE_ACTION,
    }
}

export const dictEnterpriseError = (error) => {
    return {
        type: FAILURE_DICT_ENTERPRISE_ACTION,
        payload: error,
    }
}

export const dictEnterpriseInserted = (data) => {
    return {
        type: INS_DICT_ENTERPRISE_ACTION,
        payload: data,
    }
}

export const dictEnterpriseDeleted = (id) => {
    return {
        type: DEL_DICT_ENTERPRISE_ACTION,
        payload: id,
    }
}

export const dictEnterpriseUpdated = (data) => {
    return {
        type: UPD_DICT_ENTERPRISE_ACTION,
        payload: data,
    }
}

export const fetchDictEnterprise = async (api, dispatch) => {
    dispatch(dictEnterpriseRequested());
    try {
        const response = await api.getAll();
        dispatch(dictEnterpriseLoaded(response));
    } catch (e) {
        dispatch(dictEnterpriseError(e.response))
    }
}

export const insertDictEnterprise = (rec) => async (api, dispatch) => {
    dispatch(dictEnterpriseRequested());
    try {
        const response = await api.post(rec);
        dispatch(dictEnterpriseInserted(response));
        dispatch(setDisappearingMessage('запись успешно добавлена', SUCCESS));
    } catch (e) {
        dispatch(dictEnterpriseError(e.response));
        dispatch(setDisappearingMessage(`запись не добавлена... ${e.response.data.message}`, ERROR));
    }
}

export const deleteDictEnterprise = (id) => async (api, dispatch) => {
    dispatch(dictEnterpriseRequested());
    try {
        await api.delete(id);
        dispatch(dictEnterpriseDeleted(id));
        dispatch(setDisappearingMessage('запись удалена', WARNING));
    } catch (e) {
        dispatch(dictEnterpriseError(e.response));
        dispatch(setDisappearingMessage(`запись не удалена... ${e.response.data.message}`, ERROR));
    }
}

export const updateDictEnterprise = (rec) => async (api, dispatch) => {
    dispatch(dictEnterpriseRequested());
    try {
        const response = await api.put(rec);
        dispatch(dictEnterpriseUpdated(response));
        dispatch(setDisappearingMessage('запись успешно обновлена', SUCCESS));
    } catch (e) {
        dispatch(dictEnterpriseError(e.response));
        dispatch(setDisappearingMessage(`запись не обновлена ${e.response.data.message}`, ERROR));
    }
}