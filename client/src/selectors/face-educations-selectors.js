import {createSelector} from 'reselect';

export const getFaceEducationsSelector = (state) => {
    return state.faceEducations;
}

export const  getDatasetFaceEducationsSelector = createSelector([getFaceEducationsSelector], (state) => {
    return state.dataset;
});

export const getIsLoadingFaceEducationsSelector = createSelector([getFaceEducationsSelector], (state) => {
    return state.isLoading;
});

export const getErrorFaceEducationsSelector = createSelector([getFaceEducationsSelector], (state) => {
    return state.error;
});

export const getDatasetDependsOnIdFaceEducationsSelector = createSelector([getFaceEducationsSelector], (state) => {
    return state.datasetDependsOnId;
});

