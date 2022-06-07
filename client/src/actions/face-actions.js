import {
    FETCH_FACES_ACTION,
    REQUEST_FACES_ACTION,
    FAILURE_FACES_ACTION, INS_FACES_ACTION, DEL_FACES_ACTION, UPD_FACES_ACTION, SUCCESS, ERROR, WARNING,
} from "../utils/consts";
import {setDisappearingMessage} from "./messages-actions";

export const facesLoaded = (data) => {
    return {
        type: FETCH_FACES_ACTION ,
        payload: data,
    }
}

export const facesRequested = () => {
    return {
        type: REQUEST_FACES_ACTION,
    }
}

export const facesError = (error) => {
    return {
        type: FAILURE_FACES_ACTION,
        payload: error,
    }
}

export const facesInserted = (data) => {
    return {
        type: INS_FACES_ACTION,
        payload: data,
    }
}

export const facesDeleted = (id) => {
    return {
        type: DEL_FACES_ACTION,
        payload: id,
    }
}

export const facesUpdated = (data) => {
    return {
        type: UPD_FACES_ACTION,
        payload: data,
    }
}

export const fetchFaces = async (api, dispatch) => {
    dispatch(facesRequested());
    try{
        const response = await api.getAll();
        dispatch(facesLoaded(response));
    }catch (e) {
        dispatch(facesError(e.response))
    }
}

export const insertFaces = (rec) => async (api, dispatch) => {
    dispatch(facesRequested());
    try {
        const response = await api.post(rec);
        dispatch(facesInserted(response));
        dispatch(setDisappearingMessage('запись успешно добавлена', SUCCESS));
    } catch (e) {
        dispatch(facesError(e.response));
        dispatch(setDisappearingMessage(`запись не добавлена... ${e.response.data.message}`, ERROR));
    }
}

export const deleteFaces = (id) => async (api, dispatch) => {
    dispatch(facesRequested());
    try {
        await api.delete(id);
        dispatch(facesDeleted(id));
        dispatch(setDisappearingMessage('запись удалена', WARNING));
    } catch (e) {
        dispatch(facesError(e.response));
        dispatch(setDisappearingMessage(`запись не удалена... ${e.response.data.message}`, ERROR));
    }
}

export const updateFaces = (rec) => async (api, dispatch) => {
    dispatch(facesRequested());
    try {
        const response = await api.put(rec);
        dispatch(facesUpdated(response));
        dispatch(setDisappearingMessage('запись успешно обновлена', SUCCESS));
    } catch (e) {
        dispatch(facesError(e.response));
        dispatch(setDisappearingMessage(`запись не обновлена ${e.response.data.message}`, ERROR));
    }
}