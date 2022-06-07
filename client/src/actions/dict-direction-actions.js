import {
    FETCH_DICT_DIRECTION_ACTION,
    REQUEST_DICT_DIRECTION_ACTION,
    FAILURE_DICT_DIRECTION_ACTION, INS_DICT_DIRECTION_ACTION, DEL_DICT_DIRECTION_ACTION, UPD_DICT_DIRECTION_ACTION, SUCCESS, ERROR, WARNING,
} from "../utils/consts";
import {setDisappearingMessage} from "./messages-actions";

export const dictDirectionLoaded = (data) => {
    return {
        type: FETCH_DICT_DIRECTION_ACTION,
        payload: data,
    }
}

export const dictDirectionRequested = () => {
    return {
        type: REQUEST_DICT_DIRECTION_ACTION,
    }
}

export const dictDirectionError = (error) => {
    return {
        type: FAILURE_DICT_DIRECTION_ACTION,
        payload: error,
    }
}

export const dictDirectionInserted = (data) => {
    return {
        type: INS_DICT_DIRECTION_ACTION,
        payload: data,
    }
}

export const dictDirectionDeleted = (id) => {
    return {
        type: DEL_DICT_DIRECTION_ACTION,
        payload: id,
    }
}

export const dictDirectionUpdated = (data) => {
    return {
        type: UPD_DICT_DIRECTION_ACTION,
        payload: data,
    }
}

export const fetchDictDirection = async (api, dispatch) => {
    dispatch(dictDirectionRequested());
    try{
        const response = await api.getAll();
        dispatch(dictDirectionLoaded(response));
    }catch (e) {
        dispatch(dictDirectionError(e.response))
    }
}

export const insertDictDirection = (rec) => async (api, dispatch) => {
    dispatch(dictDirectionRequested());
    try {
        const response = await api.post(rec);
        dispatch(dictDirectionInserted(response));
        dispatch(setDisappearingMessage('запись успешно добавлена', SUCCESS));
    } catch (e) {
        dispatch(dictDirectionError(e.response));
        dispatch(setDisappearingMessage(`запись не добавлена... ${e.response.data.message}`, ERROR));
    }
}

export const deleteDictDirection = (id) => async (api, dispatch) => {
    dispatch(dictDirectionRequested());
    try {
        await api.delete(id);
        dispatch(dictDirectionDeleted(id));
        dispatch(setDisappearingMessage('запись удалена', WARNING));
    } catch (e) {
        dispatch(dictDirectionError(e.response));
        dispatch(setDisappearingMessage(`запись не удалена... ${e.response.data.message}`, ERROR));
    }
}

export const updateDictDirection = (rec) => async (api, dispatch) => {
    dispatch(dictDirectionRequested());
    try {
        const response = await api.put(rec);
        dispatch(dictDirectionUpdated(response));
        dispatch(setDisappearingMessage('запись успешно обновлена', SUCCESS));
    } catch (e) {
        dispatch(dictDirectionError(e.response));
        dispatch(setDisappearingMessage(`запись не обновлена ${e.response.data.message}`, ERROR));
    }
}