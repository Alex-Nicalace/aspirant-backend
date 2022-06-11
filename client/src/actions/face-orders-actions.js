import {
    FETCH_FACE_ORDERS_ACTION,
    REQUEST_FACE_ORDERS_ACTION,
    FAILURE_FACE_ORDERS_ACTION,
    INS_FACE_ORDERS_ACTION,
    DEL_FACE_ORDERS_ACTION,
    UPD_FACE_ORDERS_ACTION,
    SUCCESS,
    ERROR,
    WARNING,
} from "../utils/consts";
import {setDisappearingMessage} from "./messages-actions";
//import {refreshRecordFaces} from "./faces-list-actions";

export const faceOrdersLoaded = (data) => {
    return {
        type: FETCH_FACE_ORDERS_ACTION,
        payload: data,
    }
}

export const faceOrdersRequested = () => {
    return {
        type: REQUEST_FACE_ORDERS_ACTION,
    }
}

export const faceOrdersError = (error) => {
    return {
        type: FAILURE_FACE_ORDERS_ACTION,
        payload: error,
    }
}

export const faceOrdersInserted = (data) => {
    return {
        type: INS_FACE_ORDERS_ACTION,
        payload: data,
    }
}

export const faceOrdersDeleted = (id) => {
    return {
        type: DEL_FACE_ORDERS_ACTION,
        payload: id,
    }
}

export const faceOrdersUpdated = (data) => {
    return {
        type: UPD_FACE_ORDERS_ACTION,
        payload: data,
    }
}

export const fetchFaceOrders = (faceId) => async (api, dispatch) => {
    dispatch(faceOrdersRequested());
    try {
        const response = await api.getAllOneFace(faceId);
        response.datasetDependsOnId = faceId;
        dispatch(faceOrdersLoaded(response));
    } catch (e) {
        dispatch(faceOrdersError(e.response))
    }
}

export const insertFaceOrders = (rec) => async ({faceOrdersAPI, facesAPI}, dispatch) => {
    dispatch(faceOrdersRequested());
    try {
        const response = await faceOrdersAPI.post(rec);
        dispatch(faceOrdersInserted(response));
        dispatch(setDisappearingMessage('запись успешно добавлена', SUCCESS));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        //await refreshRecordFaces(rec.tblFaceId)(facesAPI, dispatch);
    } catch (e) {
        dispatch(faceOrdersError(e.response));
        dispatch(setDisappearingMessage(`запись не добавлена... ${e.response.data.message}`, ERROR));
    }
}

export const deleteFaceOrders = (id) => async ({faceOrdersAPI, facesAPI}, dispatch) => {
    dispatch(faceOrdersRequested());
    try {
        // const deleted = await faceOrdersAPI.delete(id);
        dispatch(faceOrdersDeleted(id));
        dispatch(setDisappearingMessage('запись удалена', WARNING));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        //await refreshRecordFaces(deleted.data.tblFaceId)(facesAPI, dispatch);
    } catch (e) {
        dispatch(faceOrdersError(e.response));
        dispatch(setDisappearingMessage(`запись не удалена... ${e.response.data.message}`, ERROR));
    }
}

export const updateFaceOrders = (rec) => async ({faceOrdersAPI, facesAPI}, dispatch) => {
    dispatch(faceOrdersRequested());
    try {
        const response = await faceOrdersAPI.put(rec);
        dispatch(faceOrdersUpdated(response));
        dispatch(setDisappearingMessage('запись успешно обновлена', SUCCESS));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        //await refreshRecordFaces(rec.tblFaceId)(facesAPI, dispatch);
    } catch (e) {
        dispatch(faceOrdersError(e.response));
        dispatch(setDisappearingMessage(`запись не обновлена ${e.response.data.message}`, ERROR));
    }
}