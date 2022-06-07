import {createSelector} from 'reselect';

export const getFaceCitizenshipsSelector = (state) => {
    return state.faceCitizenships;
}

export const  getDatasetFaceCitizenshipsSelector = createSelector([getFaceCitizenshipsSelector], (state) => {
    return state.dataset;
});

export const getIsLoadingFaceCitizenshipsSelector = createSelector([getFaceCitizenshipsSelector], (state) => {
    return state.isLoading;
});

export const getErrorFaceCitizenshipsSelector = createSelector([getFaceCitizenshipsSelector], (state) => {
    return state.error;
});

export const getDatasetDependsOnIdFaceCitizenshipsSelector = createSelector([getFaceCitizenshipsSelector], (state) => {
    return state.datasetDependsOnId;
});

