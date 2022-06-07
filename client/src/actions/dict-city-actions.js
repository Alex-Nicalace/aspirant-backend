import {
    FETCH_DICT_CITY_ACTION,
    REQUEST_DICT_CITY_ACTION,
    FAILURE_DICT_CITY_ACTION, INS_DICT_CITY_ACTION, DEL_DICT_CITY_ACTION, UPD_DICT_CITY_ACTION, SUCCESS, ERROR, WARNING,
} from "../utils/consts";
import {setDisappearingMessage} from "./messages-actions";

export const dictCityLoaded = (data) => {
    return {
        type: FETCH_DICT_CITY_ACTION,
        payload: data,
    }
}

export const dictCityRequested = () => {
    return {
        type: REQUEST_DICT_CITY_ACTION,
    }
}

export const dictCityError = (error) => {
    return {
        type: FAILURE_DICT_CITY_ACTION,
        payload: error,
    }
}

export const dictCityInserted = (data) => {
    return {
        type: INS_DICT_CITY_ACTION,
        payload: data,
    }
}

export const dictCityDeleted = (id) => {
    return {
        type: DEL_DICT_CITY_ACTION,
        payload: id,
    }
}

export const dictCityUpdated = (data) => {
    return {
        type: UPD_DICT_CITY_ACTION,
        payload: data,
    }
}

export const fetchDictCity = async (api, dispatch) => {
    dispatch(dictCityRequested());
    try{
        const response = await api.getAll();
        dispatch(dictCityLoaded(response));
    }catch (e) {
        dispatch(dictCityError(e.response))
    }
}

export const insertDictCity = (rec) => async (api, dispatch) => {
    dispatch(dictCityRequested());
    try {
        const response = await api.post(rec);
        dispatch(dictCityInserted(response));
        dispatch(setDisappearingMessage('запись успешно добавлена', SUCCESS));
    } catch (e) {
        dispatch(dictCityError(e.response));
        dispatch(setDisappearingMessage(`запись не добавлена... ${e.response.data.message}`, ERROR));
    }
}

export const deleteDictCity = (id) => async (api, dispatch) => {
    dispatch(dictCityRequested());
    try {
        await api.delete(id);
        dispatch(dictCityDeleted(id));
        dispatch(setDisappearingMessage('запись удалена', WARNING));
    } catch (e) {
        dispatch(dictCityError(e.response));
        dispatch(setDisappearingMessage(`запись не удалена... ${e.response.data.message}`, ERROR));
    }
}

export const updateDictCity = (rec) => async (api, dispatch) => {
    dispatch(dictCityRequested());
    try {
        const response = await api.put(rec);
        dispatch(dictCityUpdated(response));
        dispatch(setDisappearingMessage('запись успешно обновлена', SUCCESS));
    } catch (e) {
        dispatch(dictCityError(e.response));
        dispatch(setDisappearingMessage(`запись не обновлена ${e.response.data.message}`, ERROR));
    }
}