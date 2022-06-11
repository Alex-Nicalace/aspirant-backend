import {
    FETCH_FACE_WORKS_ACTION,
    REQUEST_FACE_WORKS_ACTION,
    FAILURE_FACE_WORKS_ACTION,
    INS_FACE_WORKS_ACTION,
    DEL_FACE_WORKS_ACTION,
    UPD_FACE_WORKS_ACTION,
    SUCCESS,
    ERROR,
    WARNING,
} from "../utils/consts";
import {setDisappearingMessage} from "./messages-actions";
//import {refreshRecordFaces} from "./faces-list-actions";

export const faceWorksLoaded = (data) => {
    return {
        type: FETCH_FACE_WORKS_ACTION,
        payload: data,
    }
}

export const faceWorksRequested = () => {
    return {
        type: REQUEST_FACE_WORKS_ACTION,
    }
}

export const faceWorksError = (error) => {
    return {
        type: FAILURE_FACE_WORKS_ACTION,
        payload: error,
    }
}

export const faceWorksInserted = (data) => {
    return {
        type: INS_FACE_WORKS_ACTION,
        payload: data,
    }
}

export const faceWorksDeleted = (id) => {
    return {
        type: DEL_FACE_WORKS_ACTION,
        payload: id,
    }
}

export const faceWorksUpdated = (data) => {
    return {
        type: UPD_FACE_WORKS_ACTION,
        payload: data,
    }
}

export const fetchFaceWorks = (faceId) => async (api, dispatch) => {
    dispatch(faceWorksRequested());
    try {
        const response = await api.getAllOneFace(faceId);
        response.datasetDependsOnId = faceId;
        dispatch(faceWorksLoaded(response));
    } catch (e) {
        dispatch(faceWorksError(e.response))
    }
}

export const insertFaceWorks = (rec) => async ({faceWorksAPI, facesAPI}, dispatch) => {
    dispatch(faceWorksRequested());
    try {
        const response = await faceWorksAPI.post(rec);
        dispatch(faceWorksInserted(response));
        dispatch(setDisappearingMessage('запись успешно добавлена', SUCCESS));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        //await refreshRecordFaces(rec.tblFaceId)(facesAPI, dispatch);
    } catch (e) {
        dispatch(faceWorksError(e.response));
        dispatch(setDisappearingMessage(`запись не добавлена... ${e.response.data.message}`, ERROR));
    }
}

export const deleteFaceWorks = (id) => async ({faceWorksAPI, facesAPI}, dispatch) => {
    dispatch(faceWorksRequested());
    try {
        // const deleted = await faceWorksAPI.delete(id);
        dispatch(faceWorksDeleted(id));
        dispatch(setDisappearingMessage('запись удалена', WARNING));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        //await refreshRecordFaces(deleted.data.tblFaceId)(facesAPI, dispatch);
    } catch (e) {
        dispatch(faceWorksError(e.response));
        dispatch(setDisappearingMessage(`запись не удалена... ${e.response.data.message}`, ERROR));
    }
}

export const updateFaceWorks = (rec) => async ({faceWorksAPI, facesAPI}, dispatch) => {
    dispatch(faceWorksRequested());
    try {
        const response = await faceWorksAPI.put(rec);
        dispatch(faceWorksUpdated(response));
        dispatch(setDisappearingMessage('запись успешно обновлена', SUCCESS));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        //await refreshRecordFaces(rec.tblFaceId)(facesAPI, dispatch);
    } catch (e) {
        dispatch(faceWorksError(e.response));
        dispatch(setDisappearingMessage(`запись не обновлена ${e.response.data.message}`, ERROR));
    }
}