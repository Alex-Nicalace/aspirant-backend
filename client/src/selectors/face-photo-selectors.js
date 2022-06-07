import {createSelector} from 'reselect';

export const getFacePhotoSelector = (state) => {
    return state.facePhoto;
}

export const  getDatasetFacePhotoSelector = createSelector([getFacePhotoSelector], (state) => {
    return state.dataset;
});

export const getIsLoadingFacePhotoSelector = createSelector([getFacePhotoSelector], (state) => {
    return state.isLoading;
});

export const getErrorFacePhotoSelector = createSelector([getFacePhotoSelector], (state) => {
    return state.error;
});

export const getDatasetDependsOnIdFacePhotoSelector = createSelector([getFacePhotoSelector], (state) => {
    return state.datasetDependsOnId;
});

