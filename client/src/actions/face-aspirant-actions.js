import {
    FETCH_FACE_ASPIRANT_ACTION,
    REQUEST_FACE_ASPIRANT_ACTION,
    FAILURE_FACE_ASPIRANT_ACTION,
    INS_FACE_ASPIRANT_ACTION,
    DEL_FACE_ASPIRANT_ACTION,
    UPD_FACE_ASPIRANT_ACTION,
    SUCCESS,
    ERROR,
    WARNING,
} from "../utils/consts";
import {setDisappearingMessage} from "./messages-actions";
//import {refreshRecordFaces} from "./faces-list-actions";

export const faceAspirantLoaded = (data) => {
    return {
        type: FETCH_FACE_ASPIRANT_ACTION,
        payload: data,
    }
}

export const faceAspirantRequested = () => {
    return {
        type: REQUEST_FACE_ASPIRANT_ACTION,
    }
}

export const faceAspirantError = (error) => {
    return {
        type: FAILURE_FACE_ASPIRANT_ACTION,
        payload: error,
    }
}

export const faceAspirantInserted = (data) => {
    return {
        type: INS_FACE_ASPIRANT_ACTION,
        payload: data,
    }
}

export const faceAspirantDeleted = (id) => {
    return {
        type: DEL_FACE_ASPIRANT_ACTION,
        payload: id,
    }
}

export const faceAspirantUpdated = (data) => {
    return {
        type: UPD_FACE_ASPIRANT_ACTION,
        payload: data,
    }
}

export const fetchFaceAspirant = (faceId) => async (api, dispatch) => {
    dispatch(faceAspirantRequested());
    try {
        const response = await api.getAllOneFace(faceId);
        response.datasetDependsOnId = faceId;
        dispatch(faceAspirantLoaded(response));
    } catch (e) {
        dispatch(faceAspirantError(e.response))
    }
}

export const insertFaceAspirant = (rec) => async ({faceAspirantAPI, facesAPI}, dispatch) => {
    dispatch(faceAspirantRequested());
    try {
        const response = await faceAspirantAPI.post(rec);
        dispatch(faceAspirantInserted(response));
        dispatch(setDisappearingMessage('запись успешно добавлена', SUCCESS));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        //await refreshRecordFaces(rec.tblFaceId)(facesAPI, dispatch);
    } catch (e) {
        dispatch(faceAspirantError(e.response));
        dispatch(setDisappearingMessage(`запись не добавлена... ${e.response.data.message}`, ERROR));
    }
}

export const deleteFaceAspirant = (id) => async ({faceAspirantAPI, facesAPI}, dispatch) => {
    dispatch(faceAspirantRequested());
    try {
        // const deleted = await faceAspirantAPI.delete(id);
        dispatch(faceAspirantDeleted(id));
        dispatch(setDisappearingMessage('запись удалена', WARNING));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        //await refreshRecordFaces(deleted.data.tblFaceId)(facesAPI, dispatch);
    } catch (e) {
        dispatch(faceAspirantError(e.response));
        dispatch(setDisappearingMessage(`запись не удалена... ${e.response.data.message}`, ERROR));
    }
}

export const updateFaceAspirant = (rec) => async ({faceAspirantAPI, facesAPI}, dispatch) => {
    dispatch(faceAspirantRequested());
    try {
        const response = await faceAspirantAPI.put(rec);
        dispatch(faceAspirantUpdated(response));
        dispatch(setDisappearingMessage('запись успешно обновлена', SUCCESS));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        //await refreshRecordFaces(rec.tblFaceId)(facesAPI, dispatch);
    } catch (e) {
        dispatch(faceAspirantError(e.response));
        dispatch(setDisappearingMessage(`запись не обновлена ${e.response.data.message}`, ERROR));
    }
}

export const refreshRecordFaceAspirant  = (id) => async (api, dispatch) => {
    dispatch(faceAspirantRequested());
    try {
        const response = await api.getOne(id);
        dispatch(faceAspirantUpdated(response));
        //dispatch(setDisappearingMessage('запись успешно обновлена', SUCCESS));
    } catch (e) {
        dispatch(faceAspirantError(e.response));
        //dispatch(setDisappearingMessage(`запись не обновлена ${e.response.data.message}`, ERROR));
    }
}