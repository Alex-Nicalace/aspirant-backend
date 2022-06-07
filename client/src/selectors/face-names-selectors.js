import {createSelector} from 'reselect';

export const getFaceNamesSelector = (state) => {
    return state.faceNames;
}

export const  getDatasetFaceNamesSelector = createSelector([getFaceNamesSelector], (state) => {
    return state.dataset;
});

export const getIsLoadingFaceNamesSelector = createSelector([getFaceNamesSelector], (state) => {
    return state.isLoading;
});

export const getErrorFaceNamesSelector = createSelector([getFaceNamesSelector], (state) => {
    return state.error;
});

export const getDatasetDependsOnIdFaceNamesSelector = createSelector([getFaceNamesSelector], (state) => {
    return state.datasetDependsOnId;
});

