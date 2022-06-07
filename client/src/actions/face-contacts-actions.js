import {
    FETCH_FACE_CONTACTS_ACTION,
    REQUEST_FACE_CONTACTS_ACTION,
    FAILURE_FACE_CONTACTS_ACTION,
    INS_FACE_CONTACTS_ACTION,
    DEL_FACE_CONTACTS_ACTION,
    UPD_FACE_CONTACTS_ACTION,
    SUCCESS,
    ERROR,
    WARNING,
} from "../utils/consts";
import {setDisappearingMessage} from "./messages-actions";
//import {refreshRecordFaces} from "./faces-list-actions";

export const faceContactsLoaded = (data) => {
    return {
        type: FETCH_FACE_CONTACTS_ACTION,
        payload: data,
    }
}

export const faceContactsRequested = () => {
    return {
        type: REQUEST_FACE_CONTACTS_ACTION,
    }
}

export const faceContactsError = (error) => {
    return {
        type: FAILURE_FACE_CONTACTS_ACTION,
        payload: error,
    }
}

export const faceContactsInserted = (data) => {
    return {
        type: INS_FACE_CONTACTS_ACTION,
        payload: data,
    }
}

export const faceContactsDeleted = (id) => {
    return {
        type: DEL_FACE_CONTACTS_ACTION,
        payload: id,
    }
}

export const faceContactsUpdated = (data) => {
    return {
        type: UPD_FACE_CONTACTS_ACTION,
        payload: data,
    }
}

export const fetchFaceContacts = (faceId) => async (api, dispatch) => {
    dispatch(faceContactsRequested());
    try {
        const response = await api.getAllOneFace(faceId);
        response.datasetDependsOnId = faceId;
        dispatch(faceContactsLoaded(response));
    } catch (e) {
        dispatch(faceContactsError(e.response))
    }
}

export const insertFaceContacts = (rec) => async ({faceContactsAPI, facesAPI}, dispatch) => {
    dispatch(faceContactsRequested());
    try {
        const response = await faceContactsAPI.post(rec);
        dispatch(faceContactsInserted(response));
        dispatch(setDisappearingMessage('запись успешно добавлена', SUCCESS));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        //await refreshRecordFaces(rec.tblFaceId)(facesAPI, dispatch);
    } catch (e) {
        dispatch(faceContactsError(e.response));
        dispatch(setDisappearingMessage(`запись не добавлена... ${e.response.data.message}`, ERROR));
    }
}

export const deleteFaceContacts = (id) => async ({faceContactsAPI, facesAPI}, dispatch) => {
    dispatch(faceContactsRequested());
    try {
        const deleted = await faceContactsAPI.delete(id);
        dispatch(faceContactsDeleted(id));
        dispatch(setDisappearingMessage('запись удалена', WARNING));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        //await refreshRecordFaces(deleted.data.tblFaceId)(facesAPI, dispatch);
    } catch (e) {
        dispatch(faceContactsError(e.response));
        dispatch(setDisappearingMessage(`запись не удалена... ${e.response.data.message}`, ERROR));
    }
}

export const updateFaceContacts = (rec) => async ({faceContactsAPI, facesAPI}, dispatch) => {
    dispatch(faceContactsRequested());
    try {
        const response = await faceContactsAPI.put(rec);
        dispatch(faceContactsUpdated(response));
        dispatch(setDisappearingMessage('запись успешно обновлена', SUCCESS));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        //await refreshRecordFaces(rec.tblFaceId)(facesAPI, dispatch);
    } catch (e) {
        dispatch(faceContactsError(e.response));
        dispatch(setDisappearingMessage(`запись не обновлена ${e.response.data.message}`, ERROR));
    }
}