import {
    FETCH_FACE_PHOTO_ACTION,
    REQUEST_FACE_PHOTO_ACTION,
    FAILURE_FACE_PHOTO_ACTION, INS_FACE_PHOTO_ACTION, DEL_FACE_PHOTO_ACTION, UPD_FACE_PHOTO_ACTION, SUCCESS, ERROR, WARNING,
} from "../utils/consts";
import {setDisappearingMessage} from "./messages-actions";
import {refreshRecordFaces} from "./faces-actions";

export const facePhotoLoaded = (data) => {
    return {
        type: FETCH_FACE_PHOTO_ACTION ,
        payload: data,
    }
}

export const facePhotoRequested = () => {
    return {
        type: REQUEST_FACE_PHOTO_ACTION,
    }
}

export const facePhotoError = (error) => {
    return {
        type: FAILURE_FACE_PHOTO_ACTION,
        payload: error,
    }
}

export const facePhotoInserted = (data) => {
    return {
        type: INS_FACE_PHOTO_ACTION,
        payload: data,
    }
}

export const facePhotoDeleted = (id) => {
    return {
        type: DEL_FACE_PHOTO_ACTION,
        payload: id,
    }
}

export const facePhotoUpdated = (data) => {
    return {
        type: UPD_FACE_PHOTO_ACTION,
        payload: data,
    }
}

export const fetchFacePhoto = (faceId) => async (api, dispatch) => {
    dispatch(facePhotoRequested());
    try{
        const response = await api.getAllOneFace(faceId);
        response.datasetDependsOnId = faceId;
        dispatch(facePhotoLoaded(response));
    }catch (e) {
        dispatch(facePhotoError(e.response))
    }
}

export const insertFacePhoto = (rec) => async ({facePhotoAPI, facesAPI}, dispatch) => {
    dispatch(facePhotoRequested());
    try {
        const response = await facePhotoAPI.post(rec);
        dispatch(facePhotoInserted(response));
        dispatch(setDisappearingMessage('запись успешно добавлена', SUCCESS));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        await refreshRecordFaces(rec.tblFaceId)(facesAPI, dispatch);
    } catch (e) {
        dispatch(facePhotoError(e.response));
        dispatch(setDisappearingMessage(`запись не добавлена... ${e.response.data.message}`, ERROR));
    }
}

export const deleteFacePhoto = (id) => async ({facePhotoAPI, facesAPI}, dispatch) => {
    dispatch(facePhotoRequested());
    try {
        const deleted = await facePhotoAPI.delete(id);
        dispatch(facePhotoDeleted(id));
        dispatch(setDisappearingMessage('запись удалена', WARNING));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        await refreshRecordFaces(deleted.data.tblFaceId)(facesAPI, dispatch);
    } catch (e) {
        dispatch(facePhotoError(e.response));
        dispatch(setDisappearingMessage(`запись не удалена... ${e.response.data.message}`, ERROR));
    }
}

export const updateFacePhoto = (rec) => async ({facePhotoAPI, facesAPI}, dispatch) => {
    dispatch(facePhotoRequested());
    try {
        const response = await facePhotoAPI.put(rec);
        dispatch(facePhotoUpdated(response));
        dispatch(setDisappearingMessage('запись успешно обновлена', SUCCESS));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        await refreshRecordFaces(rec.tblFaceId)(facesAPI, dispatch);
    } catch (e) {
        dispatch(facePhotoError(e.response));
        dispatch(setDisappearingMessage(`запись не обновлена ${e.response.data.message}`, ERROR));
    }
}