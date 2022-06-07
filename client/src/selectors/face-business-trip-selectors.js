import {createSelector} from 'reselect';

export const getFaceBusinessTripSelector = (state) => {
    return state.faceBusinessTrip;
}

export const  getDatasetFaceBusinessTripSelector = createSelector([getFaceBusinessTripSelector], (state) => {
    return state.dataset;
});

export const getIsLoadingFaceBusinessTripSelector = createSelector([getFaceBusinessTripSelector], (state) => {
    return state.isLoading;
});

export const getErrorFaceBusinessTripSelector = createSelector([getFaceBusinessTripSelector], (state) => {
    return state.error;
});

export const getDatasetDependsOnIdFaceBusinessTripSelector = createSelector([getFaceBusinessTripSelector], (state) => {
    return state.datasetDependsOnId;
});

