import {createSelector} from 'reselect';

export const getFaceAspirantOrdersSelector = (state) => {
    return state.faceAspirantOrders;
}

export const  getDatasetFaceAspirantOrdersSelector = createSelector([getFaceAspirantOrdersSelector], (state) => {
    return state.dataset;
});

export const getIsLoadingFaceAspirantOrdersSelector = createSelector([getFaceAspirantOrdersSelector], (state) => {
    return state.isLoading;
});

export const getErrorFaceAspirantOrdersSelector = createSelector([getFaceAspirantOrdersSelector], (state) => {
    return state.error;
});

export const getDatasetDependsOnIdFaceAspirantOrdersSelector = createSelector([getFaceAspirantOrdersSelector], (state) => {
    return state.datasetDependsOnId;
});

