import {createSelector} from 'reselect';

export const getFaceCertificationResultSelector = (state) => {
    return state.faceCertificationResult;
}

export const  getDatasetFaceCertificationResultSelector = createSelector([getFaceCertificationResultSelector], (state) => {
    return state.dataset;
});

export const getIsLoadingFaceCertificationResultSelector = createSelector([getFaceCertificationResultSelector], (state) => {
    return state.isLoading;
});

export const getErrorFaceCertificationResultSelector = createSelector([getFaceCertificationResultSelector], (state) => {
    return state.error;
});

export const getDatasetDependsOnIdFaceCertificationResultSelector = createSelector([getFaceCertificationResultSelector], (state) => {
    return state.datasetDependsOnId;
});

