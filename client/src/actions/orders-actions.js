import {
    FETCH_ORDERS_ACTION,
    REQUEST_ORDERS_ACTION,
    FAILURE_ORDERS_ACTION,
    INS_ORDERS_ACTION,
    DEL_ORDERS_ACTION,
    UPD_ORDERS_ACTION,
    SUCCESS,
    ERROR,
    WARNING,
} from "../utils/consts";
import {setDisappearingMessage} from "./messages-actions";

export const ordersLoaded = (data) => {
    return {
        type: FETCH_ORDERS_ACTION ,
        payload: data,
    }
}

export const ordersRequested = () => {
    return {
        type: REQUEST_ORDERS_ACTION,
    }
}

export const ordersError = (error) => {
    return {
        type: FAILURE_ORDERS_ACTION,
        payload: error,
    }
}

export const ordersInserted = (data) => {
    return {
        type: INS_ORDERS_ACTION,
        payload: data,
    }
}

export const ordersDeleted = (id) => {
    return {
        type: DEL_ORDERS_ACTION,
        payload: id,
    }
}

export const ordersUpdated = (data) => {
    return {
        type: UPD_ORDERS_ACTION,
        payload: data,
    }
}

export const fetchOrders = async (params, api, dispatch) => {
    dispatch(ordersRequested());
    try{
        const response = await api.getAll(params );
        dispatch(ordersLoaded(response));
    }catch (e) {
        dispatch(ordersError(e.response))
    }
}

export const fetchOneOrder = (id) => async (api, dispatch) => {
    dispatch(ordersRequested());
    try {
        const response = await api.getOne(id);
        dispatch(ordersInserted(response));
    } catch (e) {
        dispatch(ordersError(e.response));
    }
}

export const insertOrders = (rec) => async (api, dispatch) => {
    dispatch(ordersRequested());
    try {
        const response = await api.post(rec);
        dispatch(ordersInserted(response));
        dispatch(setDisappearingMessage('запись успешно добавлена', SUCCESS));
    } catch (e) {
        dispatch(ordersError(e.response));
        dispatch(setDisappearingMessage(`запись не добавлена... ${e.response.data.message}`, ERROR));
    }
}

export const deleteOrders = (id) => async (api, dispatch) => {
    dispatch(ordersRequested());
    try {
        await api.delete(id);
        dispatch(ordersDeleted(id));
        dispatch(setDisappearingMessage('запись удалена', WARNING));
    } catch (e) {
        dispatch(ordersError(e.response));
        dispatch(setDisappearingMessage(`запись не удалена... ${e.response.data.message}`, ERROR));
    }
}

export const updateOrders = (rec) => async (api, dispatch) => {
    dispatch(ordersRequested());
    try {
        const response = await api.put(rec);
        dispatch(ordersUpdated(response));
        dispatch(setDisappearingMessage('запись успешно обновлена', SUCCESS));
    } catch (e) {
        dispatch(ordersError(e.response));
        dispatch(setDisappearingMessage(`запись не обновлена ${e.response.data.message}`, ERROR));
    }
}

export const refreshRecordOrders = (id) => async (api, dispatch) => {
    dispatch(ordersRequested());
    try {
        const response = await api.getOne(id);
        dispatch(ordersUpdated(response));
        //dispatch(setDisappearingMessage('запись успешно обновлена', SUCCESS));
    } catch (e) {
        dispatch(ordersError(e.response));
        //dispatch(setDisappearingMessage(`запись не обновлена ${e.response.data.message}`, ERROR));
    }
}