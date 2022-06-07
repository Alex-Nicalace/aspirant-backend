import {
    FETCH_ORDER_FACES_ACTION,
    REQUEST_ORDER_FACES_ACTION,
    FAILURE_ORDER_FACES_ACTION,
    INS_ORDER_FACES_ACTION,
    DEL_ORDER_FACES_ACTION,
    UPD_ORDER_FACES_ACTION,
    SUCCESS,
    ERROR,
    WARNING,
} from "../utils/consts";
import {setDisappearingMessage} from "./messages-actions";
//import {refreshRecordFaces} from "./faces-list-actions";

export const orderFacesLoaded = (data) => {
    return {
        type: FETCH_ORDER_FACES_ACTION,
        payload: data,
    }
}

export const orderFacesRequested = () => {
    return {
        type: REQUEST_ORDER_FACES_ACTION,
    }
}

export const orderFacesError = (error) => {
    return {
        type: FAILURE_ORDER_FACES_ACTION,
        payload: error,
    }
}

export const orderFacesInserted = (data) => {
    return {
        type: INS_ORDER_FACES_ACTION,
        payload: data,
    }
}

export const orderFacesDeleted = (id) => {
    return {
        type: DEL_ORDER_FACES_ACTION,
        payload: id,
    }
}

export const orderFacesUpdated = (data) => {
    return {
        type: UPD_ORDER_FACES_ACTION,
        payload: data,
    }
}

export const fetchOrderFaces = (orderId ) => async (api, dispatch) => {
    dispatch(orderFacesRequested());
    try {
        const response = await api.getAllOneOrder(orderId);
        response.datasetDependsOnId = orderId;
        dispatch(orderFacesLoaded(response));
    } catch (e) {
        dispatch(orderFacesError(e.response))
    }
}

export const insertOrderFaces = (rec) => async (faceOrdersAPI, dispatch) => {
    dispatch(orderFacesRequested());
    try {
        const response = await faceOrdersAPI.post(rec);
        dispatch(orderFacesInserted(response));
        dispatch(setDisappearingMessage('запись успешно добавлена', SUCCESS));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        //await refreshRecordFaces(rec.tblFaceId)(facesAPI, dispatch);
    } catch (e) {
        dispatch(orderFacesError(e.response));
        dispatch(setDisappearingMessage(`запись не добавлена... ${e.response.data.message}`, ERROR));
    }
}

export const deleteOrderFaces = (id) => async (faceOrdersAPI, dispatch) => {
    dispatch(orderFacesRequested());
    try {
        const deleted = await faceOrdersAPI.delete(id);
        dispatch(orderFacesDeleted(id));
        dispatch(setDisappearingMessage('запись удалена', WARNING));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        //await refreshRecordFaces(deleted.data.tblFaceId)(facesAPI, dispatch);
    } catch (e) {
        dispatch(orderFacesError(e.response));
        dispatch(setDisappearingMessage(`запись не удалена... ${e.response.data.message}`, ERROR));
    }
}

export const updateOrderFaces = (rec) => async (faceOrdersAPI, dispatch) => {
    dispatch(orderFacesRequested());
    try {
        const response = await faceOrdersAPI.put(rec);
        dispatch(orderFacesUpdated(response));
        dispatch(setDisappearingMessage('запись успешно обновлена', SUCCESS));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        //await refreshRecordFaces(rec.tblFaceId)(facesAPI, dispatch);
    } catch (e) {
        dispatch(orderFacesError(e.response));
        dispatch(setDisappearingMessage(`запись не обновлена ${e.response.data.message}`, ERROR));
    }
}