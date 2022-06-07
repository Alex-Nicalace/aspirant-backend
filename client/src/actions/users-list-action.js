import {
    FETCH_LIST_USERS_ACTION,
    REQUEST_LIST_USERS_ACTION,
    FAILURE_LIST_USERS_ACTION, INS_LIST_USERS_ACTION, DEL_LIST_USERS_ACTION, UPD_LIST_USERS_ACTION, SUCCESS, ERROR, WARNING,
} from "../utils/consts";
import {setDisappearingMessage} from "./messages-actions";

export const usersListLoaded = (data) => {
    return {
        type: FETCH_LIST_USERS_ACTION,
        payload: data,
    }
}

export const usersListRequested = () => {
    return {
        type: REQUEST_LIST_USERS_ACTION,
    }
}

export const usersListError = (error) => {
    return {
        type: FAILURE_LIST_USERS_ACTION,
        payload: error,
    }
}

export const usersListInserted = (data) => {
    return {
        type: INS_LIST_USERS_ACTION,
        payload: data,
    }
}

export const usersListDeleted = (id) => {
    return {
        type: DEL_LIST_USERS_ACTION,
        payload: id,
    }
}

export const usersListUpdated = (data) => {
    return {
        type: UPD_LIST_USERS_ACTION,
        payload: data,
    }
}

export const fetchUsersList = async (api, dispatch) => {
    dispatch(usersListRequested());
    try{
        const response = await api.getAll();
        dispatch(usersListLoaded(response));
    }catch (e) {
        dispatch(usersListError(e.response))
    }
}

export const insertUsersList = (rec) => async (api, dispatch) => {
    dispatch(usersListRequested());
    try {
        const response = await api.post(rec);
        dispatch(usersListInserted(response));
        dispatch(setDisappearingMessage('пользователь успешно добавлена', SUCCESS));
    } catch (e) {
        dispatch(usersListError(e.response));
        dispatch(setDisappearingMessage(`пользователь не добавлен... ${e.response.data.message}`, ERROR));
    }
}

export const deleteUsersList = (id) => async (api, dispatch) => {
    dispatch(usersListRequested());
    try {
        await api.delete(id);
        dispatch(usersListDeleted(id));
        dispatch(setDisappearingMessage('пользователь удален', WARNING));
    } catch (e) {
        dispatch(usersListError(e.response));
        dispatch(setDisappearingMessage(`пользователь не удален... ${e.response.data.message}`, ERROR));
    }
}

export const updateUsersList = (rec) => async (api, dispatch) => {
    dispatch(usersListRequested());
    try {
        const response = await api.put(rec);
        dispatch(usersListUpdated(response));
        dispatch(setDisappearingMessage('пользователь успешно обновлен', SUCCESS));
    } catch (e) {
        dispatch(usersListError(e.response));
        dispatch(setDisappearingMessage(`пользователь не обновлен ${e.response.data.message}`, ERROR));
    }
}