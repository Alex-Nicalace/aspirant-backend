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
//import {refreshRecordFaces} from "./facess-list-actions";

export const facesAcademicAdvisorLoaded = (data) => {
    return {
        type: FETCH_FACE_ACADEMIC_ADVISOR_ACTION,
        payload: data,
    }
}

export const facesAcademicAdvisorRequested = () => {
    return {
        type: REQUEST_FACE_ACADEMIC_ADVISOR_ACTION,
    }
}

export const facesAcademicAdvisorError = (error) => {
    return {
        type: FAILURE_FACE_ACADEMIC_ADVISOR_ACTION,
        payload: error,
    }
}

export const facesAcademicAdvisorInserted = (data) => {
    return {
        type: INS_FACE_ACADEMIC_ADVISOR_ACTION,
        payload: data,
    }
}

export const facesAcademicAdvisorDeleted = (id) => {
    return {
        type: DEL_FACE_ACADEMIC_ADVISOR_ACTION,
        payload: id,
    }
}

export const facesAcademicAdvisorUpdated = (data) => {
    return {
        type: UPD_FACE_ACADEMIC_ADVISOR_ACTION,
        payload: data,
    }
}

export const fetchFaceAcademicAdvisor = async (api, dispatch) => {
    dispatch(facesAcademicAdvisorRequested());
    try {
        const response = await api.getAllFace();
        dispatch(facesAcademicAdvisorLoaded(response));
    } catch (e) {
        dispatch(facesAcademicAdvisorError(e.response))
    }
}

export const insertFaceAcademicAdvisor = (rec) => async (facesAcademicAdvisorAPI, dispatch) => {
    dispatch(facesAcademicAdvisorRequested());
    try {
        const response = await facesAcademicAdvisorAPI.post(rec);
        dispatch(facesAcademicAdvisorInserted(response));
        dispatch(setDisappearingMessage('запись успешно добавлена', SUCCESS));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        //await refreshRecordFaces(rec.tblFaceId)(facessAPI, dispatch);
    } catch (e) {
        dispatch(facesAcademicAdvisorError(e.response));
        dispatch(setDisappearingMessage(`запись не добавлена... ${e.response.data.message}`, ERROR));
    }
}

export const deleteFaceAcademicAdvisor = (id) => async (facesAcademicAdvisorAPI, dispatch) => {
    dispatch(facesAcademicAdvisorRequested());
    try {
        // const deleted = await facesAcademicAdvisorAPI.delete(id);
        dispatch(facesAcademicAdvisorDeleted(id));
        dispatch(setDisappearingMessage('запись удалена', WARNING));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        //await refreshRecordFaces(deleted.data.tblFaceId)(facessAPI, dispatch);
    } catch (e) {
        dispatch(facesAcademicAdvisorError(e.response));
        dispatch(setDisappearingMessage(`запись не удалена... ${e.response.data.message}`, ERROR));
    }
}

export const updateFaceAcademicAdvisor = (rec) => async (facesAcademicAdvisorAPI, dispatch) => {
    dispatch(facesAcademicAdvisorRequested());
    try {
        const response = await facesAcademicAdvisorAPI.put(rec);
        dispatch(facesAcademicAdvisorUpdated(response));
        dispatch(setDisappearingMessage('запись успешно обновлена', SUCCESS));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        //await refreshRecordFaces(rec.tblFaceId)(facessAPI, dispatch);
    } catch (e) {
        dispatch(facesAcademicAdvisorError(e.response));
        dispatch(setDisappearingMessage(`запись не обновлена ${e.response.data.message}`, ERROR));
    }
}