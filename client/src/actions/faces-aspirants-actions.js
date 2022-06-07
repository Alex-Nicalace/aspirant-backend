import {
    FETCH_ASPIRANTS_ACTION,
    REQUEST_ASPIRANTS_ACTION,
    FAILURE_ASPIRANTS_ACTION,
    INS_ASPIRANTS_ACTION,
    DEL_ASPIRANTS_ACTION,
    UPD_ASPIRANTS_ACTION,
    SUCCESS,
    ERROR,
    WARNING,
} from "../utils/consts";
import {setDisappearingMessage} from "./messages-actions";

export const facesAspirantsLoaded = (data) => {
    return {
        type: FETCH_ASPIRANTS_ACTION,
        payload: data,
    }
}

export const facesAspirantsRequested = () => {
    return {
        type: REQUEST_ASPIRANTS_ACTION,
    }
}

export const facesAspirantsError = (error) => {
    return {
        type: FAILURE_ASPIRANTS_ACTION,
        payload: error,
    }
}

export const facesAspirantsInserted = (data) => {
    return {
        type: INS_ASPIRANTS_ACTION,
        payload: data,
    }
}

export const facesAspirantsDeleted = (id) => {
    return {
        type: DEL_ASPIRANTS_ACTION,
        payload: id,
    }
}

export const facesAspirantsUpdated = (data) => {
    return {
        type: UPD_ASPIRANTS_ACTION,
        payload: data,
    }
}

export const fetchFacesAspirants = async (params, api, dispatch) => {
    dispatch(facesAspirantsRequested());
    try {
        const response = await api.getAllAspirants(params);
        dispatch(facesAspirantsLoaded(response));
    } catch (e) {
        dispatch(facesAspirantsError(e.response))
    }
}

export const insertFacesAspirants = (rec) => async (facesAspirantsAPI, dispatch) => {
    dispatch(facesAspirantsRequested());
    try {
        const response = await facesAspirantsAPI.post(rec);
        dispatch(facesAspirantsInserted(response));
        dispatch(setDisappearingMessage('запись успешно добавлена', SUCCESS));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        //await refreshRecordFacess(rec.tblFacesId)(facessAPI, dispatch);
    } catch (e) {
        dispatch(facesAspirantsError(e.response));
        dispatch(setDisappearingMessage(`запись не добавлена... ${e.response.data.message}`, ERROR));
    }
}

export const deleteFacesAspirants = (id) => async (facesAspirantsAPI, dispatch) => {
    dispatch(facesAspirantsRequested());
    try {
        // const deleted = await facesAspirantsAPI.delete(id);
        dispatch(facesAspirantsDeleted(id));
        dispatch(setDisappearingMessage('запись удалена', WARNING));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        //await refreshRecordFacess(deleted.data.tblFacesId)(facessAPI, dispatch);
    } catch (e) {
        dispatch(facesAspirantsError(e.response));
        dispatch(setDisappearingMessage(`запись не удалена... ${e.response.data.message}`, ERROR));
    }
}

export const updateFacesAspirants = (rec) => async (facesAspirantsAPI, dispatch) => {
    dispatch(facesAspirantsRequested());
    try {
        const response = await facesAspirantsAPI.put(rec);
        dispatch(facesAspirantsUpdated(response));
        dispatch(setDisappearingMessage('запись успешно обновлена', SUCCESS));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        //await refreshRecordFacess(rec.tblFacesId)(facessAPI, dispatch);
    } catch (e) {
        dispatch(facesAspirantsError(e.response));
        dispatch(setDisappearingMessage(`запись не обновлена ${e.response.data.message}`, ERROR));
    }
}

export const refreshRecordFacesAspirants  = (id) => async (api, dispatch) => {
    dispatch(facesAspirantsRequested()); 
    try {
        const response = await api.getOne(id);
        dispatch(facesAspirantsUpdated(response));
        //dispatch(setDisappearingMessage('запись успешно обновлена', SUCCESS));
    } catch (e) {
        dispatch(facesAspirantsError(e.response));
        //dispatch(setDisappearingMessage(`запись не обновлена ${e.response.data.message}`, ERROR));
    }
}