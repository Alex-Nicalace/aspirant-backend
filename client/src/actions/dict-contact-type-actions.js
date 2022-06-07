import {
    FETCH_DICT_CONTACT_TYPE_ACTION,
    REQUEST_DICT_CONTACT_TYPE_ACTION,
    FAILURE_DICT_CONTACT_TYPE_ACTION, INS_DICT_CONTACT_TYPE_ACTION, DEL_DICT_CONTACT_TYPE_ACTION, UPD_DICT_CONTACT_TYPE_ACTION, SUCCESS, ERROR, WARNING,
} from "../utils/consts";
import {setDisappearingMessage} from "./messages-actions";

export const dictContactTypeLoaded = (data) => {
    return {
        type: FETCH_DICT_CONTACT_TYPE_ACTION,
        payload: data,
    }
}

export const dictContactTypeRequested = () => {
    return {
        type: REQUEST_DICT_CONTACT_TYPE_ACTION,
    }
}

export const dictContactTypeError = (error) => {
    return {
        type: FAILURE_DICT_CONTACT_TYPE_ACTION,
        payload: error,
    }
}

export const dictContactTypeInserted = (data) => {
    return {
        type: INS_DICT_CONTACT_TYPE_ACTION,
        payload: data,
    }
}

export const dictContactTypeDeleted = (id) => {
    return {
        type: DEL_DICT_CONTACT_TYPE_ACTION,
        payload: id,
    }
}

export const dictContactTypeUpdated = (data) => {
    return {
        type: UPD_DICT_CONTACT_TYPE_ACTION,
        payload: data,
    }
}

export const fetchDictContactType = async (api, dispatch) => {
    dispatch(dictContactTypeRequested());
    try{
        const response = await api.getAll();
        dispatch(dictContactTypeLoaded(response));
    }catch (e) {
        dispatch(dictContactTypeError(e.response))
    }
}

export const insertDictContactType = (rec) => async (api, dispatch) => {
    dispatch(dictContactTypeRequested());
    try {
        const response = await api.post(rec);
        dispatch(dictContactTypeInserted(response));
        dispatch(setDisappearingMessage('запись успешно добавлена', SUCCESS));
    } catch (e) {
        dispatch(dictContactTypeError(e.response));
        dispatch(setDisappearingMessage(`запись не добавлена... ${e.response.data.message}`, ERROR));
    }
}

export const deleteDictContactType = (id) => async (api, dispatch) => {
    dispatch(dictContactTypeRequested());
    try {
        await api.delete(id);
        dispatch(dictContactTypeDeleted(id));
        dispatch(setDisappearingMessage('запись удалена', WARNING));
    } catch (e) {
        dispatch(dictContactTypeError(e.response));
        dispatch(setDisappearingMessage(`запись не удалена... ${e.response.data.message}`, ERROR));
    }
}

export const updateDictContactType = (rec) => async (api, dispatch) => {
    dispatch(dictContactTypeRequested());
    try {
        const response = await api.put(rec);
        dispatch(dictContactTypeUpdated(response));
        dispatch(setDisappearingMessage('запись успешно обновлена', SUCCESS));
    } catch (e) {
        dispatch(dictContactTypeError(e.response));
        dispatch(setDisappearingMessage(`запись не обновлена ${e.response.data.message}`, ERROR));
    }
}