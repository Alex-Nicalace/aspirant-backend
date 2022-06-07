import {createSelector} from 'reselect';

export const getFaceResidencesSelector = (state) => {
    return state.faceResidences;
}

export const  getDatasetFaceResidencesSelector = createSelector([getFaceResidencesSelector], (state) => {
    return state.dataset;
});

export const getIsLoadingFaceResidencesSelector = createSelector([getFaceResidencesSelector], (state) => {
    return state.isLoading;
});

export const getErrorFaceResidencesSelector = createSelector([getFaceResidencesSelector], (state) => {
    return state.error;
});

export const getDatasetDependsOnIdFaceResidencesSelector = createSelector([getFaceResidencesSelector], (state) => {
    return state.datasetDependsOnId;
});

