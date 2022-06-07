import {
    FETCH_FACE_BUSINESS_TRIP_ACTION,
    REQUEST_FACE_BUSINESS_TRIP_ACTION,
    FAILURE_FACE_BUSINESS_TRIP_ACTION,
    INS_FACE_BUSINESS_TRIP_ACTION,
    DEL_FACE_BUSINESS_TRIP_ACTION,
    UPD_FACE_BUSINESS_TRIP_ACTION,
    SUCCESS,
    ERROR,
    WARNING,
} from "../utils/consts";
import {setDisappearingMessage} from "./messages-actions";
//import {refreshRecordFaces} from "./faces-list-actions";

export const faceBusinessTripLoaded = (data) => {
    return {
        type: FETCH_FACE_BUSINESS_TRIP_ACTION,
        payload: data,
    }
}

export const faceBusinessTripRequested = () => {
    return {
        type: REQUEST_FACE_BUSINESS_TRIP_ACTION,
    }
}

export const faceBusinessTripError = (error) => {
    return {
        type: FAILURE_FACE_BUSINESS_TRIP_ACTION,
        payload: error,
    }
}

export const faceBusinessTripInserted = (data) => {
    return {
        type: INS_FACE_BUSINESS_TRIP_ACTION,
        payload: data,
    }
}

export const faceBusinessTripDeleted = (id) => {
    return {
        type: DEL_FACE_BUSINESS_TRIP_ACTION,
        payload: id,
    }
}

export const faceBusinessTripUpdated = (data) => {
    return {
        type: UPD_FACE_BUSINESS_TRIP_ACTION,
        payload: data,
    }
}

export const fetchFaceBusinessTrip = (faceId) => async (api, dispatch) => {
    dispatch(faceBusinessTripRequested());
    try {
        const response = await api.getAllOneFace(faceId);
        response.datasetDependsOnId = faceId;
        dispatch(faceBusinessTripLoaded(response));
    } catch (e) {
        dispatch(faceBusinessTripError(e.response))
    }
}

export const insertFaceBusinessTrip = (rec) => async ({faceBusinessTripAPI, facesAPI}, dispatch) => {
    dispatch(faceBusinessTripRequested());
    try {
        const response = await faceBusinessTripAPI.post(rec);
        dispatch(faceBusinessTripInserted(response));
        dispatch(setDisappearingMessage('запись успешно добавлена', SUCCESS));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        //await refreshRecordFaces(rec.tblFaceId)(facesAPI, dispatch);
    } catch (e) {
        dispatch(faceBusinessTripError(e.response));
        dispatch(setDisappearingMessage(`запись не добавлена... ${e.response.data.message}`, ERROR));
    }
}

export const deleteFaceBusinessTrip = (id) => async ({faceBusinessTripAPI, facesAPI}, dispatch) => {
    dispatch(faceBusinessTripRequested());
    try {
        const deleted = await faceBusinessTripAPI.delete(id);
        dispatch(faceBusinessTripDeleted(id));
        dispatch(setDisappearingMessage('запись удалена', WARNING));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        //await refreshRecordFaces(deleted.data.tblFaceId)(facesAPI, dispatch);
    } catch (e) {
        dispatch(faceBusinessTripError(e.response));
        dispatch(setDisappearingMessage(`запись не удалена... ${e.response.data.message}`, ERROR));
    }
}

export const updateFaceBusinessTrip = (rec) => async ({faceBusinessTripAPI, facesAPI}, dispatch) => {
    dispatch(faceBusinessTripRequested());
    try {
        const response = await faceBusinessTripAPI.put(rec);
        dispatch(faceBusinessTripUpdated(response));
        dispatch(setDisappearingMessage('запись успешно обновлена', SUCCESS));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        //await refreshRecordFaces(rec.tblFaceId)(facesAPI, dispatch);
    } catch (e) {
        dispatch(faceBusinessTripError(e.response));
        dispatch(setDisappearingMessage(`запись не обновлена ${e.response.data.message}`, ERROR));
    }
}