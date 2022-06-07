import {createSelector} from 'reselect';

export const getDictCertificationResultSelector = (state) => {
    return state.dictCertificationResult;
}

export const getDatasetDictCertificationResultSelector = createSelector([getDictCertificationResultSelector], (state) => {
    return state.dataset;
});

export const getIsLoadingDictCertificationResultSelector = createSelector([getDictCertificationResultSelector], (state) => {
    return state.isLoading;
});

export const getErrorDictCertificationResultSelector = createSelector([getDictCertificationResultSelector], (state) => {
    return state.error;
});

