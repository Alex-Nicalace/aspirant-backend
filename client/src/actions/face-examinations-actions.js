import {
    FETCH_FACE_EXAMINATIONS_ACTION,
    REQUEST_FACE_EXAMINATIONS_ACTION,
    FAILURE_FACE_EXAMINATIONS_ACTION,
    INS_FACE_EXAMINATIONS_ACTION,
    DEL_FACE_EXAMINATIONS_ACTION,
    UPD_FACE_EXAMINATIONS_ACTION,
    SUCCESS,
    ERROR,
    WARNING,
} from "../utils/consts";
import {setDisappearingMessage} from "./messages-actions";
//import {refreshRecordFaces} from "./faces-list-actions";

export const faceExaminationsLoaded = (data) => {
    return {
        type: FETCH_FACE_EXAMINATIONS_ACTION,
        payload: data,
    }
}

export const faceExaminationsRequested = () => {
    return {
        type: REQUEST_FACE_EXAMINATIONS_ACTION,
    }
}

export const faceExaminationsError = (error) => {
    return {
        type: FAILURE_FACE_EXAMINATIONS_ACTION,
        payload: error,
    }
}

export const faceExaminationsInserted = (data) => {
    return {
        type: INS_FACE_EXAMINATIONS_ACTION,
        payload: data,
    }
}

export const faceExaminationsDeleted = (id) => {
    return {
        type: DEL_FACE_EXAMINATIONS_ACTION,
        payload: id,
    }
}

export const faceExaminationsUpdated = (data) => {
    return {
        type: UPD_FACE_EXAMINATIONS_ACTION,
        payload: data,
    }
}

export const fetchFaceExaminations = (faceId) => async (api, dispatch) => {
    dispatch(faceExaminationsRequested());
    try {
        const response = await api.getAllOneFace(faceId);
        response.datasetDependsOnId = faceId;
        dispatch(faceExaminationsLoaded(response));
    } catch (e) {
        dispatch(faceExaminationsError(e.response))
    }
}

export const insertFaceExaminations = (rec) => async ({faceExaminationsAPI, facesAPI}, dispatch) => {
    dispatch(faceExaminationsRequested());
    try {
        const response = await faceExaminationsAPI.post(rec);
        dispatch(faceExaminationsInserted(response));
        dispatch(setDisappearingMessage('запись успешно добавлена', SUCCESS));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        //await refreshRecordFaces(rec.tblFaceId)(facesAPI, dispatch);
    } catch (e) {
        dispatch(faceExaminationsError(e.response));
        dispatch(setDisappearingMessage(`запись не добавлена... ${e.response.data.message}`, ERROR));
    }
}

export const deleteFaceExaminations = (id) => async ({faceExaminationsAPI, facesAPI}, dispatch) => {
    dispatch(faceExaminationsRequested());
    try {
        // const deleted = await faceExaminationsAPI.delete(id);
        dispatch(faceExaminationsDeleted(id));
        dispatch(setDisappearingMessage('запись удалена', WARNING));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        //await refreshRecordFaces(deleted.data.tblFaceId)(facesAPI, dispatch);
    } catch (e) {
        dispatch(faceExaminationsError(e.response));
        dispatch(setDisappearingMessage(`запись не удалена... ${e.response.data.message}`, ERROR));
    }
}

export const updateFaceExaminations = (rec) => async ({faceExaminationsAPI, facesAPI}, dispatch) => {
    dispatch(faceExaminationsRequested());
    try {
        const response = await faceExaminationsAPI.put(rec);
        dispatch(faceExaminationsUpdated(response));
        dispatch(setDisappearingMessage('запись успешно обновлена', SUCCESS));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        //await refreshRecordFaces(rec.tblFaceId)(facesAPI, dispatch);
    } catch (e) {
        dispatch(faceExaminationsError(e.response));
        dispatch(setDisappearingMessage(`запись не обновлена ${e.response.data.message}`, ERROR));
    }
}