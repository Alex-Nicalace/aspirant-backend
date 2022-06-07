import {createSelector} from 'reselect';

export const getDictDocSelector = (state) => {
    return state.dictDoc;
}

export const getDatasetDictDocSelector = createSelector([getDictDocSelector], (state) => {
    return state.dataset;
});

export const getIsLoadingDictDocSelector = createSelector([getDictDocSelector], (state) => {
    return state.isLoading;
});

export const getErrorDictDocSelector = createSelector([getDictDocSelector], (state) => {
    return state.error;
});
