import {
    FETCH_FACE_DOCUMENTS_ACTION,
    REQUEST_FACE_DOCUMENTS_ACTION,
    FAILURE_FACE_DOCUMENTS_ACTION, INS_FACE_DOCUMENTS_ACTION, DEL_FACE_DOCUMENTS_ACTION, UPD_FACE_DOCUMENTS_ACTION, SUCCESS, ERROR, WARNING,
} from "../utils/consts";
import {setDisappearingMessage} from "./messages-actions";
import {refreshRecordFaces} from "./faces-actions";

export const faceDocumentsLoaded = (data) => {
    return {
        type: FETCH_FACE_DOCUMENTS_ACTION ,
        payload: data,
    }
}

export const faceDocumentsRequested = () => {
    return {
        type: REQUEST_FACE_DOCUMENTS_ACTION,
    }
}

export const faceDocumentsError = (error) => {
    return {
        type: FAILURE_FACE_DOCUMENTS_ACTION,
        payload: error,
    }
}

export const faceDocumentsInserted = (data) => {
    return {
        type: INS_FACE_DOCUMENTS_ACTION,
        payload: data,
    }
}

export const faceDocumentsDeleted = (id) => {
    return {
        type: DEL_FACE_DOCUMENTS_ACTION,
        payload: id,
    }
}

export const faceDocumentsUpdated = (data) => {
    return {
        type: UPD_FACE_DOCUMENTS_ACTION,
        payload: data,
    }
}

export const fetchFaceDocuments = (faceId) => async (api, dispatch) => {
    dispatch(faceDocumentsRequested());
    try{
        const response = await api.getAllOneFace(faceId);
        response.datasetDependsOnId = faceId;
        dispatch(faceDocumentsLoaded(response));
    }catch (e) {
        dispatch(faceDocumentsError(e.response))
    }
}

export const insertFaceDocuments = (rec) => async ({faceDocumentsAPI, facesAPI}, dispatch) => {
    dispatch(faceDocumentsRequested());
    try {
        const response = await faceDocumentsAPI.post(rec);
        dispatch(faceDocumentsInserted(response));
        dispatch(setDisappearingMessage('запись успешно добавлена', SUCCESS));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        await refreshRecordFaces(rec.tblFaceId)(facesAPI, dispatch);
    } catch (e) {
        dispatch(faceDocumentsError(e.response));
        dispatch(setDisappearingMessage(`запись не добавлена... ${e.response.data.message}`, ERROR));
    }
}

export const deleteFaceDocuments = (id) => async ({faceDocumentsAPI, facesAPI}, dispatch) => {
    dispatch(faceDocumentsRequested());
    try {
        const deleted = await faceDocumentsAPI.delete(id);
        dispatch(faceDocumentsDeleted(id));
        dispatch(setDisappearingMessage('запись удалена', WARNING));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        await refreshRecordFaces(deleted.data.tblFaceId)(facesAPI, dispatch);
    } catch (e) {
        dispatch(faceDocumentsError(e.response));
        dispatch(setDisappearingMessage(`запись не удалена... ${e.response.data.message}`, ERROR));
    }
}

export const updateFaceDocuments = (rec) => async ({faceDocumentsAPI, facesAPI}, dispatch) => {
    dispatch(faceDocumentsRequested());
    try {
        const response = await faceDocumentsAPI.put(rec);
        dispatch(faceDocumentsUpdated(response));
        dispatch(setDisappearingMessage('запись успешно обновлена', SUCCESS));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        await refreshRecordFaces(rec.tblFaceId)(facesAPI, dispatch);
    } catch (e) {
        dispatch(faceDocumentsError(e.response));
        dispatch(setDisappearingMessage(`запись не обновлена ${e.response.data.message}`, ERROR));
    }
}