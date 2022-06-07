import {createSelector} from 'reselect';

export const getFaceScientificPublSelector = (state) => {
    return state.faceScientificPubl;
}

export const  getDatasetFaceScientificPublSelector = createSelector([getFaceScientificPublSelector], (state) => {
    return state.dataset;
});

export const getIsLoadingFaceScientificPublSelector = createSelector([getFaceScientificPublSelector], (state) => {
    return state.isLoading;
});

export const getErrorFaceScientificPublSelector = createSelector([getFaceScientificPublSelector], (state) => {
    return state.error;
});

export const getDatasetDependsOnIdFaceScientificPublSelector = createSelector([getFaceScientificPublSelector], (state) => {
    return state.datasetDependsOnId;
});

