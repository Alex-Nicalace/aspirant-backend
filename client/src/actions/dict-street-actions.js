import {
    FETCH_DICT_STREET_ACTION,
    REQUEST_DICT_STREET_ACTION,
    FAILURE_DICT_STREET_ACTION, INS_DICT_STREET_ACTION, DEL_DICT_STREET_ACTION, UPD_DICT_STREET_ACTION, SUCCESS, ERROR, WARNING,
} from "../utils/consts";
import {setDisappearingMessage} from "./messages-actions";

export const dictStreetLoaded = (data) => {
    return {
        type: FETCH_DICT_STREET_ACTION,
        payload: data,
    }
}

export const dictStreetRequested = () => {
    return {
        type: REQUEST_DICT_STREET_ACTION,
    }
}

export const dictStreetError = (error) => {
    return {
        type: FAILURE_DICT_STREET_ACTION,
        payload: error,
    }
}

export const dictStreetInserted = (data) => {
    return {
        type: INS_DICT_STREET_ACTION,
        payload: data,
    }
}

export const dictStreetDeleted = (id) => {
    return {
        type: DEL_DICT_STREET_ACTION,
        payload: id,
    }
}

export const dictStreetUpdated = (data) => {
    return {
        type: UPD_DICT_STREET_ACTION,
        payload: data,
    }
}

export const fetchDictStreet = async (api, dispatch) => {
    dispatch(dictStreetRequested());
    try{
        const response = await api.getAll();
        dispatch(dictStreetLoaded(response));
    }catch (e) {
        dispatch(dictStreetError(e.response))
    }
}

export const insertDictStreet = (rec) => async (api, dispatch) => {
    dispatch(dictStreetRequested());
    try {
        const response = await api.post(rec);
        dispatch(dictStreetInserted(response));
        dispatch(setDisappearingMessage('запись успешно добавлена', SUCCESS));
    } catch (e) {
        dispatch(dictStreetError(e.response));
        dispatch(setDisappearingMessage(`запись не добавлена... ${e.response.data.message}`, ERROR));
    }
}

export const deleteDictStreet = (id) => async (api, dispatch) => {
    dispatch(dictStreetRequested());
    try {
        await api.delete(id);
        dispatch(dictStreetDeleted(id));
        dispatch(setDisappearingMessage('запись удалена', WARNING));
    } catch (e) {
        dispatch(dictStreetError(e.response));
        dispatch(setDisappearingMessage(`запись не удалена... ${e.response.data.message}`, ERROR));
    }
}

export const updateDictStreet = (rec) => async (api, dispatch) => {
    dispatch(dictStreetRequested());
    try {
        const response = await api.put(rec);
        dispatch(dictStreetUpdated(response));
        dispatch(setDisappearingMessage('запись успешно обновлена', SUCCESS));
    } catch (e) {
        dispatch(dictStreetError(e.response));
        dispatch(setDisappearingMessage(`запись не обновлена ${e.response.data.message}`, ERROR));
    }
}