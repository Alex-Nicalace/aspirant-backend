import {
    FETCH_DICT_COUNTRY_ACTION,
    REQUEST_DICT_COUNTRY_ACTION,
    FAILURE_DICT_COUNTRY_ACTION, INS_DICT_COUNTRY_ACTION, DEL_DICT_COUNTRY_ACTION, UPD_DICT_COUNTRY_ACTION, SUCCESS, ERROR, WARNING,
} from "../utils/consts";
import {setDisappearingMessage} from "./messages-actions";

export const dictCountryLoaded = (data) => {
    return {
        type: FETCH_DICT_COUNTRY_ACTION,
        payload: data,
    }
}

export const dictCountryRequested = () => {
    return {
        type: REQUEST_DICT_COUNTRY_ACTION,
    }
}

export const dictCountryError = (error) => {
    return {
        type: FAILURE_DICT_COUNTRY_ACTION,
        payload: error,
    }
}

export const dictCountryInserted = (data) => {
    return {
        type: INS_DICT_COUNTRY_ACTION,
        payload: data,
    }
}

export const dictCountryDeleted = (id) => {
    return {
        type: DEL_DICT_COUNTRY_ACTION,
        payload: id,
    }
}

export const dictCountryUpdated = (data) => {
    return {
        type: UPD_DICT_COUNTRY_ACTION,
        payload: data,
    }
}

export const fetchDictCountry = async (api, dispatch) => {
    dispatch(dictCountryRequested());
    try{
        const response = await api.getAll();
        dispatch(dictCountryLoaded(response));
    }catch (e) {
        dispatch(dictCountryError(e.response))
    }
}

export const insertDictCountry = (rec) => async (api, dispatch) => {
    dispatch(dictCountryRequested());
    try {
        const response = await api.post(rec);
        dispatch(dictCountryInserted(response));
        dispatch(setDisappearingMessage('запись успешно добавлена', SUCCESS));
    } catch (e) {
        dispatch(dictCountryError(e.response));
        dispatch(setDisappearingMessage(`запись не добавлена... ${e.response.data.message}`, ERROR));
    }
}

export const deleteDictCountry = (id) => async (api, dispatch) => {
    dispatch(dictCountryRequested());
    try {
        await api.delete(id);
        dispatch(dictCountryDeleted(id));
        dispatch(setDisappearingMessage('запись удалена', WARNING));
    } catch (e) {
        dispatch(dictCountryError(e.response));
        dispatch(setDisappearingMessage(`запись не удалена... ${e.response.data.message}`, ERROR));
    }
}

export const updateDictCountry = (rec) => async (api, dispatch) => {
    dispatch(dictCountryRequested());
    try {
        const response = await api.put(rec);
        dispatch(dictCountryUpdated(response));
        dispatch(setDisappearingMessage('запись успешно обновлена', SUCCESS));
    } catch (e) {
        dispatch(dictCountryError(e.response));
        dispatch(setDisappearingMessage(`запись не обновлена ${e.response.data.message}`, ERROR));
    }
}