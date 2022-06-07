import {createSelector} from 'reselect';

export const getFaceContactsSelector = (state) => {
    return state.faceContacts;
}

export const  getDatasetFaceContactsSelector = createSelector([getFaceContactsSelector], (state) => {
    return state.dataset;
});

export const getIsLoadingFaceContactsSelector = createSelector([getFaceContactsSelector], (state) => {
    return state.isLoading;
});

export const getErrorFaceContactsSelector = createSelector([getFaceContactsSelector], (state) => {
    return state.error;
});

export const getDatasetDependsOnIdFaceContactsSelector = createSelector([getFaceContactsSelector], (state) => {
    return state.datasetDependsOnId;
});

