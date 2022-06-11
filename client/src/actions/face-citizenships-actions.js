import {
    FETCH_FACE_CITIZENSHIPS_ACTION,
    REQUEST_FACE_CITIZENSHIPS_ACTION,
    FAILURE_FACE_CITIZENSHIPS_ACTION, INS_FACE_CITIZENSHIPS_ACTION, DEL_FACE_CITIZENSHIPS_ACTION, UPD_FACE_CITIZENSHIPS_ACTION, SUCCESS, ERROR, WARNING,
} from "../utils/consts";
import {setDisappearingMessage} from "./messages-actions";
//import {refreshRecordFaces} from "./faces-list-actions";

export const faceCitizenshipsLoaded = (data) => {
    return {
        type: FETCH_FACE_CITIZENSHIPS_ACTION ,
        payload: data,
    }
}

export const faceCitizenshipsRequested = () => {
    return {
        type: REQUEST_FACE_CITIZENSHIPS_ACTION,
    }
}

export const faceCitizenshipsError = (error) => {
    return {
        type: FAILURE_FACE_CITIZENSHIPS_ACTION,
        payload: error,
    }
}

export const faceCitizenshipsInserted = (data) => {
    return {
        type: INS_FACE_CITIZENSHIPS_ACTION,
        payload: data,
    }
}

export const faceCitizenshipsDeleted = (id) => {
    return {
        type: DEL_FACE_CITIZENSHIPS_ACTION,
        payload: id,
    }
}

export const faceCitizenshipsUpdated = (data) => {
    return {
        type: UPD_FACE_CITIZENSHIPS_ACTION,
        payload: data,
    }
}

export const fetchFaceCitizenships = (faceId) => async (api, dispatch) => {
    dispatch(faceCitizenshipsRequested());
    try{
        const response = await api.getAllOneFace(faceId);
        response.datasetDependsOnId = faceId;
        dispatch(faceCitizenshipsLoaded(response));
    }catch (e) {
        dispatch(faceCitizenshipsError(e.response))
    }
}

export const insertFaceCitizenships = (rec) => async ({faceCitizenshipsAPI, facesAPI}, dispatch) => {
    dispatch(faceCitizenshipsRequested());
    try {
        const response = await faceCitizenshipsAPI.post(rec);
        dispatch(faceCitizenshipsInserted(response));
        dispatch(setDisappearingMessage('запись успешно добавлена', SUCCESS));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        //await refreshRecordFaces(rec.tblFaceId)(facesAPI, dispatch);
    } catch (e) {
        dispatch(faceCitizenshipsError(e.response));
        dispatch(setDisappearingMessage(`запись не добавлена... ${e.response.data.message}`, ERROR));
    }
}

export const deleteFaceCitizenships = (id) => async ({faceCitizenshipsAPI, facesAPI}, dispatch) => {
    dispatch(faceCitizenshipsRequested());
    try {
        // const deleted = await faceCitizenshipsAPI.delete(id);
        dispatch(faceCitizenshipsDeleted(id));
        dispatch(setDisappearingMessage('запись удалена', WARNING));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        //await refreshRecordFaces(deleted.data.tblFaceId)(facesAPI, dispatch);
    } catch (e) {
        dispatch(faceCitizenshipsError(e.response));
        dispatch(setDisappearingMessage(`запись не удалена... ${e.response.data.message}`, ERROR));
    }
}

export const updateFaceCitizenships = (rec) => async ({faceCitizenshipsAPI, facesAPI}, dispatch) => {
    dispatch(faceCitizenshipsRequested());
    try {
        const response = await faceCitizenshipsAPI.put(rec);
        dispatch(faceCitizenshipsUpdated(response));
        dispatch(setDisappearingMessage('запись успешно обновлена', SUCCESS));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        //await refreshRecordFaces(rec.tblFaceId)(facesAPI, dispatch);
    } catch (e) {
        dispatch(faceCitizenshipsError(e.response));
        dispatch(setDisappearingMessage(`запись не обновлена ${e.response.data.message}`, ERROR));
    }
}