import {
    FETCH_FACE_NAMES_ACTION,
    REQUEST_FACE_NAMES_ACTION,
    FAILURE_FACE_NAMES_ACTION, INS_FACE_NAMES_ACTION, DEL_FACE_NAMES_ACTION, UPD_FACE_NAMES_ACTION, SUCCESS, ERROR, WARNING,
} from "../utils/consts";
import {setDisappearingMessage} from "./messages-actions";
import {refreshRecordFaces} from "./faces-actions";

export const faceNamesLoaded = (data) => {
    return {
        type: FETCH_FACE_NAMES_ACTION ,
        payload: data,
    }
}

export const faceNamesRequested = () => {
    return {
        type: REQUEST_FACE_NAMES_ACTION,
    }
}

export const faceNamesError = (error) => {
    return {
        type: FAILURE_FACE_NAMES_ACTION,
        payload: error,
    }
}

export const faceNamesInserted = (data) => {
    return {
        type: INS_FACE_NAMES_ACTION,
        payload: data,
    }
}

export const faceNamesDeleted = (id) => {
    return {
        type: DEL_FACE_NAMES_ACTION,
        payload: id,
    }
}

export const faceNamesUpdated = (data) => {
    return {
        type: UPD_FACE_NAMES_ACTION,
        payload: data,
    }
}

export const fetchFaceNames = (faceId) => async (api, dispatch) => {
    dispatch(faceNamesRequested());
    try{
        const response = await api.getAllNamesOneFace(faceId);
        response.datasetDependsOnId = faceId;
        dispatch(faceNamesLoaded(response));
    }catch (e) {
        dispatch(faceNamesError(e.response))
    }
}

export const insertFaceNames = (rec) => async ({faceNamesAPI, facesAPI}, dispatch) => {
    dispatch(faceNamesRequested());
    try {
        const response = await faceNamesAPI.post(rec);
        dispatch(faceNamesInserted(response));
        dispatch(setDisappearingMessage('запись успешно добавлена', SUCCESS));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        await refreshRecordFaces(rec.tblFaceId)(facesAPI, dispatch);
    } catch (e) {
        dispatch(faceNamesError(e.response));
        dispatch(setDisappearingMessage(`запись не добавлена... ${e.response.data.message}`, ERROR));
    }
}

export const deleteFaceNames = (id) => async ({faceNamesAPI, facesAPI}, dispatch) => {
    dispatch(faceNamesRequested());
    try {
        const deleted = await faceNamesAPI.delete(id);
        dispatch(faceNamesDeleted(id));
        dispatch(setDisappearingMessage('запись удалена', WARNING));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        await refreshRecordFaces(deleted.data.tblFaceId)(facesAPI, dispatch);
    } catch (e) {
        dispatch(faceNamesError(e.response));
        dispatch(setDisappearingMessage(`запись не удалена... ${e.response.data.message}`, ERROR));
    }
}

export const updateFaceNames = (rec) => async ({faceNamesAPI, facesAPI}, dispatch) => {
    dispatch(faceNamesRequested());
    try {
        const response = await faceNamesAPI.put(rec);
        dispatch(faceNamesUpdated(response));
        dispatch(setDisappearingMessage('запись успешно обновлена', SUCCESS));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        await refreshRecordFaces(rec.tblFaceId)(facesAPI, dispatch);
    } catch (e) {
        dispatch(faceNamesError(e.response));
        dispatch(setDisappearingMessage(`запись не обновлена ${e.response.data.message}`, ERROR));
    }
}