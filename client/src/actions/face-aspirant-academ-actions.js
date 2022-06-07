import {
    FETCH_ASPIRANT_ACADEM_ACTION,
    REQUEST_ASPIRANT_ACADEM_ACTION,
    FAILURE_ASPIRANT_ACADEM_ACTION,
    INS_ASPIRANT_ACADEM_ACTION,
    DEL_ASPIRANT_ACADEM_ACTION,
    UPD_ASPIRANT_ACADEM_ACTION,
    SUCCESS,
    ERROR,
    WARNING,
} from "../utils/consts";
import {setDisappearingMessage} from "./messages-actions";
import {refreshRecordFaceAspirant} from "./face-aspirant-actions";
//import {refreshRecordFaces} from "./faces-list-actions";

export const aspirantAcademLoaded = (data) => {
    return {
        type: FETCH_ASPIRANT_ACADEM_ACTION,
        payload: data,
    }
}

export const aspirantAcademRequested = () => {
    return {
        type: REQUEST_ASPIRANT_ACADEM_ACTION,
    }
}

export const aspirantAcademError = (error) => {
    return {
        type: FAILURE_ASPIRANT_ACADEM_ACTION,
        payload: error,
    }
}

export const aspirantAcademInserted = (data) => {
    return {
        type: INS_ASPIRANT_ACADEM_ACTION,
        payload: data,
    }
}

export const aspirantAcademDeleted = (id) => {
    return {
        type: DEL_ASPIRANT_ACADEM_ACTION,
        payload: id,
    }
}

export const aspirantAcademUpdated = (data) => {
    return {
        type: UPD_ASPIRANT_ACADEM_ACTION,
        payload: data,
    }
}

export const fetchAspirantAcadem = (faceId) => async (api, dispatch) => {
    dispatch(aspirantAcademRequested());
    try {
        const response = await api.getAllOneFace(faceId);
        response.datasetDependsOnId = faceId;
        dispatch(aspirantAcademLoaded(response));
    } catch (e) {
        dispatch(aspirantAcademError(e.response))
    }
}

export const insertAspirantAcadem = async (rec, {aspirantAcademAPI, faceAspirantAPI}, dispatch) => {
    dispatch(aspirantAcademRequested());
    let response;
    try {
        response = await aspirantAcademAPI.post(rec);
        dispatch(aspirantAcademInserted(response));
        dispatch(setDisappearingMessage('запись успешно добавлена', SUCCESS));
        // обновить инф. в зависимой табл.
        await refreshRecordFaceAspirant(rec.tblFaceId)(faceAspirantAPI, dispatch);
    } catch (e) {
        dispatch(aspirantAcademError(e.response));
        dispatch(setDisappearingMessage(`запись не добавлена... ${e.response.data.message}`, ERROR));
    }
    return response?.data
}

export const deleteAspirantAcadem = (id) => async ({aspirantAcademAPI, faceAspirantAPI}, dispatch) => {
    dispatch(aspirantAcademRequested());
    try {
        const deleted = await aspirantAcademAPI.delete(id);
        dispatch(aspirantAcademDeleted(id));
        dispatch(setDisappearingMessage('запись удалена', WARNING));
        // обновить инф. в зависимой табл.
        await refreshRecordFaceAspirant(deleted.data.tblFaceId)(faceAspirantAPI, dispatch);
    } catch (e) {
        dispatch(aspirantAcademError(e.response));
        dispatch(setDisappearingMessage(`запись не удалена... ${e.response.data.message}`, ERROR));
    }
}

export const updateAspirantAcadem = (rec) => async ({aspirantAcademAPI, faceAspirantAPI}, dispatch) => {
    dispatch(aspirantAcademRequested());
    try {
        const response = await aspirantAcademAPI.put(rec);
        dispatch(aspirantAcademUpdated(response));
        dispatch(setDisappearingMessage('запись успешно обновлена', SUCCESS));
        // обновить инф. в зависимой табл.
        await refreshRecordFaceAspirant(rec.tblFaceId)(faceAspirantAPI, dispatch);
    } catch (e) {
        dispatch(aspirantAcademError(e.response));
        dispatch(setDisappearingMessage(`запись не обновлена ${e.response.data.message}`, ERROR));
    }
}

export const refreshRecordAspirantAcadem  = (id) => async (api, dispatch) => {
    dispatch(aspirantAcademRequested());
    try {
        const response = await api.getOne(id);
        dispatch(aspirantAcademUpdated(response));
        //dispatch(setDisappearingMessage('запись успешно обновлена', SUCCESS));
    } catch (e) {
        dispatch(aspirantAcademError(e.response));
        //dispatch(setDisappearingMessage(`запись не обновлена ${e.response.data.message}`, ERROR));
    }
}