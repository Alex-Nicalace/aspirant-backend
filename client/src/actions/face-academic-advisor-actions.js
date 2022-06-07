import {
    FETCH_FACE_ACADEMIC_ADVISOR_ACTION,
    REQUEST_FACE_ACADEMIC_ADVISOR_ACTION,
    FAILURE_FACE_ACADEMIC_ADVISOR_ACTION,
    INS_FACE_ACADEMIC_ADVISOR_ACTION,
    DEL_FACE_ACADEMIC_ADVISOR_ACTION,
    UPD_FACE_ACADEMIC_ADVISOR_ACTION,
    SUCCESS,
    ERROR,
    WARNING,
} from "../utils/consts";
import {setDisappearingMessage} from "./messages-actions";
//import {refreshRecordFaces} from "./faces-actions";

export const faceAcademicAdvisorLoaded = (data) => {
    return {
        type: FETCH_FACE_ACADEMIC_ADVISOR_ACTION,
        payload: data,
    }
}

export const faceAcademicAdvisorRequested = () => {
    return {
        type: REQUEST_FACE_ACADEMIC_ADVISOR_ACTION,
    }
}

export const faceAcademicAdvisorError = (error) => {
    return {
        type: FAILURE_FACE_ACADEMIC_ADVISOR_ACTION,
        payload: error,
    }
}

export const faceAcademicAdvisorInserted = (data) => {
    return {
        type: INS_FACE_ACADEMIC_ADVISOR_ACTION,
        payload: data,
    }
}

export const faceAcademicAdvisorDeleted = (id) => {
    return {
        type: DEL_FACE_ACADEMIC_ADVISOR_ACTION,
        payload: id,
    }
}

export const faceAcademicAdvisorUpdated = (data) => {
    return {
        type: UPD_FACE_ACADEMIC_ADVISOR_ACTION,
        payload: data,
    }
}

export const fetchFaceAcademicAdvisor = (faceId) => async (api, dispatch) => {
    dispatch(faceAcademicAdvisorRequested());
    try {
        const response = await api.getAllOneFace(faceId);
        response.datasetDependsOnId = faceId;
        dispatch(faceAcademicAdvisorLoaded(response));
    } catch (e) {
        dispatch(faceAcademicAdvisorError(e.response))
    }
}

export const insertFaceAcademicAdvisor = (rec) => async ({faceAcademicAdvisorAPI, facesAPI}, dispatch) => {
    dispatch(faceAcademicAdvisorRequested());
    try {
        const response = await faceAcademicAdvisorAPI.post(rec);
        dispatch(faceAcademicAdvisorInserted(response));
        dispatch(setDisappearingMessage('запись успешно добавлена', SUCCESS));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        //await refreshRecordFaces(rec.tblFaceId)(facesAPI, dispatch);
    } catch (e) {
        dispatch(faceAcademicAdvisorError(e.response));
        dispatch(setDisappearingMessage(`запись не добавлена... ${e.response.data.message}`, ERROR));
    }
}

export const deleteFaceAcademicAdvisor = (id) => async ({faceAcademicAdvisorAPI, facesAPI}, dispatch) => {
    dispatch(faceAcademicAdvisorRequested());
    try {
        // const deleted = await faceAcademicAdvisorAPI.delete(id);
        dispatch(faceAcademicAdvisorDeleted(id));
        dispatch(setDisappearingMessage('запись удалена', WARNING));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        //await refreshRecordFaces(deleted.data.tblFaceId)(facesAPI, dispatch);
    } catch (e) {
        dispatch(faceAcademicAdvisorError(e.response));
        dispatch(setDisappearingMessage(`запись не удалена... ${e.response.data.message}`, ERROR));
    }
}

export const updateFaceAcademicAdvisor = (rec) => async ({faceAcademicAdvisorAPI, facesAPI}, dispatch) => {
    dispatch(faceAcademicAdvisorRequested());
    try {
        const response = await faceAcademicAdvisorAPI.put(rec);
        dispatch(faceAcademicAdvisorUpdated(response));
        dispatch(setDisappearingMessage('запись успешно обновлена', SUCCESS));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        //await refreshRecordFaces(rec.tblFaceId)(facesAPI, dispatch);
    } catch (e) {
        dispatch(faceAcademicAdvisorError(e.response));
        dispatch(setDisappearingMessage(`запись не обновлена ${e.response.data.message}`, ERROR));
    }
}