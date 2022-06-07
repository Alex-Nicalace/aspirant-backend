import {createSelector} from 'reselect';

export const getFaceWorksSelector = (state) => {
    return state.faceWorks;
}

export const  getDatasetFaceWorksSelector = createSelector([getFaceWorksSelector], (state) => {
    return state.dataset;
});

export const getIsLoadingFaceWorksSelector = createSelector([getFaceWorksSelector], (state) => {
    return state.isLoading;
});

export const getErrorFaceWorksSelector = createSelector([getFaceWorksSelector], (state) => {
    return state.error;
});

export const getDatasetDependsOnIdFaceWorksSelector = createSelector([getFaceWorksSelector], (state) => {
    return state.datasetDependsOnId;
});

