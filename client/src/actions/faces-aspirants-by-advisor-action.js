import {
    FETCH_ASPIRANTS_BY_ADVISOR_ACTION,
    REQUEST_ASPIRANTS_BY_ADVISOR_ACTION,
    FAILURE_ASPIRANTS_BY_ADVISOR_ACTION,
    INS_ASPIRANTS_BY_ADVISOR_ACTION,
    DEL_ASPIRANTS_BY_ADVISOR_ACTION,
    UPD_ASPIRANTS_BY_ADVISOR_ACTION,
    SUCCESS,
    ERROR,
    WARNING,
} from "../utils/consts";
import {setDisappearingMessage} from "./messages-actions";
//import {refreshRecordFaces} from "./faces-list-actions";

export const aspirantsByAdvisorLoaded = (data) => {
    return {
        type: FETCH_ASPIRANTS_BY_ADVISOR_ACTION,
        payload: data,
    }
}

export const aspirantsByAdvisorRequested = () => {
    return {
        type: REQUEST_ASPIRANTS_BY_ADVISOR_ACTION,
    }
}

export const aspirantsByAdvisorError = (error) => {
    return {
        type: FAILURE_ASPIRANTS_BY_ADVISOR_ACTION,
        payload: error,
    }
}

export const aspirantsByAdvisorInserted = (data) => {
    return {
        type: INS_ASPIRANTS_BY_ADVISOR_ACTION,
        payload: data,
    }
}

export const aspirantsByAdvisorDeleted = (id) => {
    return {
        type: DEL_ASPIRANTS_BY_ADVISOR_ACTION,
        payload: id,
    }
}

export const aspirantsByAdvisorUpdated = (data) => {
    return {
        type: UPD_ASPIRANTS_BY_ADVISOR_ACTION,
        payload: data,
    }
}

export const fetchAspirantsByAdvisor = (advisorId) => async (api, dispatch) => {
    dispatch(aspirantsByAdvisorRequested() );
    try {
        const response = await api.getAllOneAdvisor(advisorId);
        response.datasetDependsOnId = advisorId;
        dispatch(aspirantsByAdvisorLoaded(response));
    } catch (e) {
        dispatch(aspirantsByAdvisorError(e.response))
    }
}

export const insertAspirantsByAdvisor = (rec) => async (faceAspirantAPI, dispatch) => {
    dispatch(aspirantsByAdvisorRequested());
    try {
        const response = await faceAspirantAPI.post(rec);
        dispatch(aspirantsByAdvisorInserted(response));
        dispatch(setDisappearingMessage('запись успешно добавлена', SUCCESS));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        //await refreshRecordFaces(rec.tblFaceId)(facesAPI, dispatch);
    } catch (e) {
        dispatch(aspirantsByAdvisorError(e.response));
        dispatch(setDisappearingMessage(`запись не добавлена... ${e.response.data.message}`, ERROR));
    }
}

export const deleteAspirantsByAdvisor = (id) => async (faceAspirantAPI, dispatch) => {
    dispatch(aspirantsByAdvisorRequested());
    try {
        // const deleted = await faceAspirantAPI.delete(id);
        dispatch(aspirantsByAdvisorDeleted(id));
        dispatch(setDisappearingMessage('запись удалена', WARNING));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        //await refreshRecordFaces(deleted.data.tblFaceId)(facesAPI, dispatch);
    } catch (e) {
        dispatch(aspirantsByAdvisorError(e.response));
        dispatch(setDisappearingMessage(`запись не удалена... ${e.response.data.message}`, ERROR));
    }
}

export const updateAspirantsByAdvisor = (rec) => async (faceAspirantAPI, dispatch) => {
    dispatch(aspirantsByAdvisorRequested());
    try {
        const response = await faceAspirantAPI.put(rec);
        dispatch(aspirantsByAdvisorUpdated(response));
        dispatch(setDisappearingMessage('запись успешно обновлена', SUCCESS));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        //await refreshRecordFaces(rec.tblFaceId)(facesAPI, dispatch);
    } catch (e) {
        dispatch(aspirantsByAdvisorError(e.response));
        dispatch(setDisappearingMessage(`запись не обновлена ${e.response.data.message}`, ERROR));
    }
}