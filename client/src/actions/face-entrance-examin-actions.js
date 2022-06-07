import {
    FETCH_FACE_ENTRANCE_EXAMIN_ACTION,
    REQUEST_FACE_ENTRANCE_EXAMIN_ACTION,
    FAILURE_FACE_ENTRANCE_EXAMIN_ACTION,
    INS_FACE_ENTRANCE_EXAMIN_ACTION,
    DEL_FACE_ENTRANCE_EXAMIN_ACTION,
    UPD_FACE_ENTRANCE_EXAMIN_ACTION,
    SUCCESS,
    ERROR,
    WARNING,
} from "../utils/consts";
import {setDisappearingMessage} from "./messages-actions";
//import {refreshRecordFaces} from "./faces-list-actions";

export const faceEntranceExaminLoaded = (data) => {
    return {
        type: FETCH_FACE_ENTRANCE_EXAMIN_ACTION,
        payload: data,
    }
}

export const faceEntranceExaminRequested = () => {
    return {
        type: REQUEST_FACE_ENTRANCE_EXAMIN_ACTION,
    }
}

export const faceEntranceExaminError = (error) => {
    return {
        type: FAILURE_FACE_ENTRANCE_EXAMIN_ACTION,
        payload: error,
    }
}

export const faceEntranceExaminInserted = (data) => {
    return {
        type: INS_FACE_ENTRANCE_EXAMIN_ACTION,
        payload: data,
    }
}

export const faceEntranceExaminDeleted = (id) => {
    return {
        type: DEL_FACE_ENTRANCE_EXAMIN_ACTION,
        payload: id,
    }
}

export const faceEntranceExaminUpdated = (data) => {
    return {
        type: UPD_FACE_ENTRANCE_EXAMIN_ACTION,
        payload: data,
    }
}

export const fetchFaceEntranceExamin = (faceId) => async (api, dispatch) => {
    dispatch(faceEntranceExaminRequested());
    try {
        const response = await api.getAllOneFace(faceId);
        response.datasetDependsOnId = faceId;
        dispatch(faceEntranceExaminLoaded(response));
    } catch (e) {
        dispatch(faceEntranceExaminError(e.response))
    }
}

export const insertFaceEntranceExamin = (rec) => async ({faceEntranceExaminAPI, facesAPI}, dispatch) => {
    dispatch(faceEntranceExaminRequested());
    try {
        const response = await faceEntranceExaminAPI.post(rec);
        dispatch(faceEntranceExaminInserted(response));
        dispatch(setDisappearingMessage('запись успешно добавлена', SUCCESS));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        //await refreshRecordFaces(rec.tblFaceId)(facesAPI, dispatch);
    } catch (e) {
        dispatch(faceEntranceExaminError(e.response));
        dispatch(setDisappearingMessage(`запись не добавлена... ${e.response.data.message}`, ERROR));
    }
}

export const deleteFaceEntranceExamin = (id) => async ({faceEntranceExaminAPI, facesAPI}, dispatch) => {
    dispatch(faceEntranceExaminRequested());
    try {
        // const deleted = await faceEntranceExaminAPI.delete(id);
        dispatch(faceEntranceExaminDeleted(id));
        dispatch(setDisappearingMessage('запись удалена', WARNING));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        //await refreshRecordFaces(deleted.data.tblFaceId)(facesAPI, dispatch);
    } catch (e) {
        dispatch(faceEntranceExaminError(e.response));
        dispatch(setDisappearingMessage(`запись не удалена... ${e.response.data.message}`, ERROR));
    }
}

export const updateFaceEntranceExamin = (rec) => async ({faceEntranceExaminAPI, facesAPI}, dispatch) => {
    dispatch(faceEntranceExaminRequested());
    try {
        const response = await faceEntranceExaminAPI.put(rec);
        dispatch(faceEntranceExaminUpdated(response));
        dispatch(setDisappearingMessage('запись успешно обновлена', SUCCESS));
        // фамилия добавлена теперь надо обновить запись из свобной таблицы
        //await refreshRecordFaces(rec.tblFaceId)(facesAPI, dispatch);
    } catch (e) {
        dispatch(faceEntranceExaminError(e.response));
        dispatch(setDisappearingMessage(`запись не обновлена ${e.response.data.message}`, ERROR));
    }
}