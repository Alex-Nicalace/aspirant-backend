import {
    FETCH_FACE_EDUCATIONS_ACTION,
    REQUEST_FACE_EDUCATIONS_ACTION,
    FAILURE_FACE_EDUCATIONS_ACTION,
    INS_FACE_EDUCATIONS_ACTION,
    DEL_FACE_EDUCATIONS_ACTION,
    UPD_FACE_EDUCATIONS_ACTION,
    SUCCESS,
    ERROR,
    WARNING,
} from "../utils/consts";
import {setDisappearingMessage} from "./messages-actions";
//import {refreshRecordFaces} from "./faces-list-actions";

export const faceEducationsLoaded = (data) => {
    return {
        type: FETCH_FACE_EDUCATIONS_ACTION,
        payload: data,
    }
}

export const faceEducationsRequested = () => {
    return {
        type: REQUEST_FACE_EDUCATIONS_ACTION,
    }
}

export const faceEducationsError = (error) => {
    return {
        type: FAILURE_FACE_EDUCATIONS_ACTION,
        payload: error,
    }
}

export const faceEducationsInserted = (data) => {
    return {
        type: INS_FACE_EDUCATIONS_ACTION,
        payload: data,
    }
}

export const faceEducationsDeleted = (id) => {
    return {
        type: DEL_FACE_EDUCATIONS_ACTION,
        payload: id,
    }
}

export const faceEducationsUpdated = (data) => {
    return {
        type: UPD_FACE_EDUCATIONS_ACTION,
        payload: data,
    }
}

export const fetchFaceEducations = (faceId) => async (api, dispatch) => {
    dispatch(faceEducationsRequested());
    try {
        const response = await api.getAllOneFace(faceId);
        response.datasetDependsOnId = faceId;
        dispatch(faceEducationsLoaded(response));
    } catch (e) {
        dispatch(faceEducationsError(e.response))
    }
}

export const insertFaceEducations = (rec) => async ({faceEducationsAPI, facesAPI}, dispatch) => {
    dispatch(faceEducationsRequested());
    try {
        const response = await faceEducationsAPI.post(rec);
        dispatch(faceEducationsInserted(response));
        dispatch(setDisappearingMessage('запись успешно добавлена', SUCCESS));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        //await refreshRecordFaces(rec.tblFaceId)(facesAPI, dispatch);
    } catch (e) {
        dispatch(faceEducationsError(e.response));
        dispatch(setDisappearingMessage(`запись не добавлена... ${e.response.data.message}`, ERROR));
    }
}

export const deleteFaceEducations = (id) => async ({faceEducationsAPI, facesAPI}, dispatch) => {
    dispatch(faceEducationsRequested());
    try {
        // const deleted = await faceEducationsAPI.delete(id);
        dispatch(faceEducationsDeleted(id));
        dispatch(setDisappearingMessage('запись удалена', WARNING));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        //await refreshRecordFaces(deleted.data.tblFaceId)(facesAPI, dispatch);
    } catch (e) {
        dispatch(faceEducationsError(e.response));
        dispatch(setDisappearingMessage(`запись не удалена... ${e.response.data.message}`, ERROR));
    }
}

export const updateFaceEducations = (rec) => async ({faceEducationsAPI, facesAPI}, dispatch) => {
    dispatch(faceEducationsRequested());
    try {
        const response = await faceEducationsAPI.put(rec);
        dispatch(faceEducationsUpdated(response));
        dispatch(setDisappearingMessage('запись успешно обновлена', SUCCESS));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        //await refreshRecordFaces(rec.tblFaceId)(facesAPI, dispatch);
    } catch (e) {
        dispatch(faceEducationsError(e.response));
        dispatch(setDisappearingMessage(`запись не обновлена ${e.response.data.message}`, ERROR));
    }
}