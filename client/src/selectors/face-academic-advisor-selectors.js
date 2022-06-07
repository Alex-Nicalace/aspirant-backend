import {createSelector} from 'reselect';

export const getFaceAcademicAdvisorSelector = (state) => {
    return state.faceAcademicAdvisor;
}

export const  getDatasetFaceAcademicAdvisorSelector = createSelector([getFaceAcademicAdvisorSelector], (state) => {
    return state.dataset;
});

export const getIsLoadingFaceAcademicAdvisorSelector = createSelector([getFaceAcademicAdvisorSelector], (state) => {
    return state.isLoading;
});

export const getErrorFaceAcademicAdvisorSelector = createSelector([getFaceAcademicAdvisorSelector], (state) => {
    return state.error;
});

export const getDatasetDependsOnIdFaceAcademicAdvisorSelector = createSelector([getFaceAcademicAdvisorSelector], (state) => {
    return state.datasetDependsOnId;
});

