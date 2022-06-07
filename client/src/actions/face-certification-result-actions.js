import {
    FETCH_FACE_CERTIFICATION_RESULT_ACTION,
    REQUEST_FACE_CERTIFICATION_RESULT_ACTION,
    FAILURE_FACE_CERTIFICATION_RESULT_ACTION,
    INS_FACE_CERTIFICATION_RESULT_ACTION,
    DEL_FACE_CERTIFICATION_RESULT_ACTION,
    UPD_FACE_CERTIFICATION_RESULT_ACTION,
    SUCCESS,
    ERROR,
    WARNING,
} from "../utils/consts";
import {setDisappearingMessage} from "./messages-actions";
//import {refreshRecordFaces} from "./faces-list-actions";

export const faceCertificationResultLoaded = (data) => {
    return {
        type: FETCH_FACE_CERTIFICATION_RESULT_ACTION,
        payload: data,
    }
}

export const faceCertificationResultRequested = () => {
    return {
        type: REQUEST_FACE_CERTIFICATION_RESULT_ACTION,
    }
}

export const faceCertificationResultError = (error) => {
    return {
        type: FAILURE_FACE_CERTIFICATION_RESULT_ACTION,
        payload: error,
    }
}

export const faceCertificationResultInserted = (data) => {
    return {
        type: INS_FACE_CERTIFICATION_RESULT_ACTION,
        payload: data,
    }
}

export const faceCertificationResultDeleted = (id) => {
    return {
        type: DEL_FACE_CERTIFICATION_RESULT_ACTION,
        payload: id,
    }
}

export const faceCertificationResultUpdated = (data) => {
    return {
        type: UPD_FACE_CERTIFICATION_RESULT_ACTION,
        payload: data,
    }
}

export const fetchFaceCertificationResult = (faceId) => async (api, dispatch) => {
    dispatch(faceCertificationResultRequested());
    try {
        const response = await api.getAllOneFace(faceId);
        response.datasetDependsOnId = faceId;
        dispatch(faceCertificationResultLoaded(response));
    } catch (e) {
        dispatch(faceCertificationResultError(e.response))
    }
}

export const insertFaceCertificationResult = (rec) => async ({faceCertificationResultAPI, facesAPI}, dispatch) => {
    dispatch(faceCertificationResultRequested());
    try {
        const response = await faceCertificationResultAPI.post(rec);
        dispatch(faceCertificationResultInserted(response));
        dispatch(setDisappearingMessage('запись успешно добавлена', SUCCESS));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        //await refreshRecordFaces(rec.tblFaceId)(facesAPI, dispatch);
    } catch (e) {
        dispatch(faceCertificationResultError(e.response));
        dispatch(setDisappearingMessage(`запись не добавлена... ${e.response.data.message}`, ERROR));
    }
}

export const deleteFaceCertificationResult = (id) => async ({faceCertificationResultAPI, facesAPI}, dispatch) => {
    dispatch(faceCertificationResultRequested());
    try {
        const deleted = await faceCertificationResultAPI.delete(id);
        dispatch(faceCertificationResultDeleted(id));
        dispatch(setDisappearingMessage('запись удалена', WARNING));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        //await refreshRecordFaces(deleted.data.tblFaceId)(facesAPI, dispatch);
    } catch (e) {
        dispatch(faceCertificationResultError(e.response));
        dispatch(setDisappearingMessage(`запись не удалена... ${e.response.data.message}`, ERROR));
    }
}

export const updateFaceCertificationResult = (rec) => async ({faceCertificationResultAPI, facesAPI}, dispatch) => {
    dispatch(faceCertificationResultRequested());
    try {
        const response = await faceCertificationResultAPI.put(rec);
        dispatch(faceCertificationResultUpdated(response));
        dispatch(setDisappearingMessage('запись успешно обновлена', SUCCESS));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        //await refreshRecordFaces(rec.tblFaceId)(facesAPI, dispatch);
    } catch (e) {
        dispatch(faceCertificationResultError(e.response));
        dispatch(setDisappearingMessage(`запись не обновлена ${e.response.data.message}`, ERROR));
    }
}