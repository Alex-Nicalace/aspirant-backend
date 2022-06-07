import {
    FETCH_FACE_RESIDENCES_ACTION,
    REQUEST_FACE_RESIDENCES_ACTION,
    FAILURE_FACE_RESIDENCES_ACTION,
    INS_FACE_RESIDENCES_ACTION,
    DEL_FACE_RESIDENCES_ACTION,
    UPD_FACE_RESIDENCES_ACTION,
    SUCCESS,
    ERROR,
    WARNING,
} from "../utils/consts";
import {setDisappearingMessage} from "./messages-actions";
//import {refreshRecordFaces} from "./faces-list-actions";

export const faceResidencesLoaded = (data) => {
    return {
        type: FETCH_FACE_RESIDENCES_ACTION,
        payload: data,
    }
}

export const faceResidencesRequested = () => {
    return {
        type: REQUEST_FACE_RESIDENCES_ACTION,
    }
}

export const faceResidencesError = (error) => {
    return {
        type: FAILURE_FACE_RESIDENCES_ACTION,
        payload: error,
    }
}

export const faceResidencesInserted = (data) => {
    return {
        type: INS_FACE_RESIDENCES_ACTION,
        payload: data,
    }
}

export const faceResidencesDeleted = (id) => {
    return {
        type: DEL_FACE_RESIDENCES_ACTION,
        payload: id,
    }
}

export const faceResidencesUpdated = (data) => {
    return {
        type: UPD_FACE_RESIDENCES_ACTION,
        payload: data,
    }
}

export const fetchFaceResidences = (faceId) => async (api, dispatch) => {
    dispatch(faceResidencesRequested());
    try {
        const response = await api.getAllOneFace(faceId);
        response.datasetDependsOnId = faceId;
        dispatch(faceResidencesLoaded(response));
    } catch (e) {
        dispatch(faceResidencesError(e.response))
    }
}

export const insertFaceResidences = (rec) => async ({faceResidencesAPI, facesAPI}, dispatch) => {
    dispatch(faceResidencesRequested());
    try {
        const response = await faceResidencesAPI.post(rec);
        dispatch(faceResidencesInserted(response));
        dispatch(setDisappearingMessage('запись успешно добавлена', SUCCESS));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        //await refreshRecordFaces(rec.tblFaceId)(facesAPI, dispatch);
    } catch (e) {
        dispatch(faceResidencesError(e.response));
        dispatch(setDisappearingMessage(`запись не добавлена... ${e.response.data.message}`, ERROR));
    }
}

export const deleteFaceResidences = (id) => async ({faceResidencesAPI, facesAPI}, dispatch) => {
    dispatch(faceResidencesRequested());
    try {
        const deleted = await faceResidencesAPI.delete(id);
        dispatch(faceResidencesDeleted(id));
        dispatch(setDisappearingMessage('запись удалена', WARNING));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        //await refreshRecordFaces(deleted.data.tblFaceId)(facesAPI, dispatch);
    } catch (e) {
        dispatch(faceResidencesError(e.response));
        dispatch(setDisappearingMessage(`запись не удалена... ${e.response.data.message}`, ERROR));
    }
}

export const updateFaceResidences = (rec) => async ({faceResidencesAPI, facesAPI}, dispatch) => {
    dispatch(faceResidencesRequested());
    try {
        const response = await faceResidencesAPI.put(rec);
        dispatch(faceResidencesUpdated(response));
        dispatch(setDisappearingMessage('запись успешно обновлена', SUCCESS));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        //await refreshRecordFaces(rec.tblFaceId)(facesAPI, dispatch);
    } catch (e) {
        dispatch(faceResidencesError(e.response));
        dispatch(setDisappearingMessage(`запись не обновлена ${e.response.data.message}`, ERROR));
    }
}