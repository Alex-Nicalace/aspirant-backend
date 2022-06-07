import {
    FETCH_USER_ACTION,
    REQUEST_USER_ACTION,
    FAILURE_USER_ACTION,
} from "../utils/consts";

export const userLoaded = (data) => {
    return {
        type: FETCH_USER_ACTION,
        payload: data,
    }
}

export const userRequested = () => {
    return {
        type: REQUEST_USER_ACTION,
    }
}

export const userError = (error) => {
    return {
        type: FAILURE_USER_ACTION,
        payload: error,
    }
}

export const fetchLogin = (params, api, dispatch) => {
    dispatch(userRequested());
    api.login(params)
        .then(response => {
            dispatch(userLoaded(response));
        })
        .catch(error => {
            dispatch(userError(error.response.data))

        })
}

export const fetchAuth = (api, dispatch) => {
    dispatch(userRequested());
    api.auth()
        .then(response => {
            dispatch(userLoaded(response));
        })
        .catch(error => {
            dispatch(userError(error.response.data))

        })
}

export const logout = (dispatch) => {
    dispatch(userLoaded(null));
    localStorage.clear();
}