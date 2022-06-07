import {createSelector} from 'reselect';

export const getFaceDocumentsSelector = (state) => {
    return state.faceDocuments;
}

export const  getDatasetFaceDocumentsSelector = createSelector([getFaceDocumentsSelector], (state) => {
    return state.dataset;
});

export const getIsLoadingFaceDocumentsSelector = createSelector([getFaceDocumentsSelector], (state) => {
    return state.isLoading;
});

export const getErrorFaceDocumentsSelector = createSelector([getFaceDocumentsSelector], (state) => {
    return state.error;
});

export const getDatasetDependsOnIdFaceDocumentsSelector = createSelector([getFaceDocumentsSelector], (state) => {
    return state.datasetDependsOnId;
});

