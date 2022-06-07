import {
    FETCH_FACE_SCIENTIFIC_PUBL_ACTION,
    REQUEST_FACE_SCIENTIFIC_PUBL_ACTION,
    FAILURE_FACE_SCIENTIFIC_PUBL_ACTION,
    INS_FACE_SCIENTIFIC_PUBL_ACTION,
    DEL_FACE_SCIENTIFIC_PUBL_ACTION,
    UPD_FACE_SCIENTIFIC_PUBL_ACTION,
    SUCCESS,
    ERROR,
    WARNING,
} from "../utils/consts";
import {setDisappearingMessage} from "./messages-actions";
//import {refreshRecordFaces} from "./faces-list-actions";

export const faceScientificPublLoaded = (data) => {
    return {
        type: FETCH_FACE_SCIENTIFIC_PUBL_ACTION,
        payload: data,
    }
}

export const faceScientificPublRequested = () => {
    return {
        type: REQUEST_FACE_SCIENTIFIC_PUBL_ACTION,
    }
}

export const faceScientificPublError = (error) => {
    return {
        type: FAILURE_FACE_SCIENTIFIC_PUBL_ACTION,
        payload: error,
    }
}

export const faceScientificPublInserted = (data) => {
    return {
        type: INS_FACE_SCIENTIFIC_PUBL_ACTION,
        payload: data,
    }
}

export const faceScientificPublDeleted = (id) => {
    return {
        type: DEL_FACE_SCIENTIFIC_PUBL_ACTION,
        payload: id,
    }
}

export const faceScientificPublUpdated = (data) => {
    return {
        type: UPD_FACE_SCIENTIFIC_PUBL_ACTION,
        payload: data,
    }
}

export const fetchFaceScientificPubl = (faceId) => async (api, dispatch) => {
    dispatch(faceScientificPublRequested());
    try {
        const response = await api.getAllOneFace(faceId);
        response.datasetDependsOnId = faceId;
        dispatch(faceScientificPublLoaded(response));
    } catch (e) {
        dispatch(faceScientificPublError(e.response))
    }
}

export const insertFaceScientificPubl = (rec) => async ({faceScientificPublAPI, facesAPI}, dispatch) => {
    dispatch(faceScientificPublRequested());
    try {
        const response = await faceScientificPublAPI.post(rec);
        dispatch(faceScientificPublInserted(response));
        dispatch(setDisappearingMessage('запись успешно добавлена', SUCCESS));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        //await refreshRecordFaces(rec.tblFaceId)(facesAPI, dispatch);
    } catch (e) {
        dispatch(faceScientificPublError(e.response));
        dispatch(setDisappearingMessage(`запись не добавлена... ${e.response.data.message}`, ERROR));
    }
}

export const deleteFaceScientificPubl = (id) => async ({faceScientificPublAPI, facesAPI}, dispatch) => {
    dispatch(faceScientificPublRequested());
    try {
        const deleted = await faceScientificPublAPI.delete(id);
        dispatch(faceScientificPublDeleted(id));
        dispatch(setDisappearingMessage('запись удалена', WARNING));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        //await refreshRecordFaces(deleted.data.tblFaceId)(facesAPI, dispatch);
    } catch (e) {
        dispatch(faceScientificPublError(e.response));
        dispatch(setDisappearingMessage(`запись не удалена... ${e.response.data.message}`, ERROR));
    }
}

export const updateFaceScientificPubl = (rec) => async ({faceScientificPublAPI, facesAPI}, dispatch) => {
    dispatch(faceScientificPublRequested());
    try {
        const response = await faceScientificPublAPI.put(rec);
        dispatch(faceScientificPublUpdated(response));
        dispatch(setDisappearingMessage('запись успешно обновлена', SUCCESS));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        //await refreshRecordFaces(rec.tblFaceId)(facesAPI, dispatch);
    } catch (e) {
        dispatch(faceScientificPublError(e.response));
        dispatch(setDisappearingMessage(`запись не обновлена ${e.response.data.message}`, ERROR));
    }
}