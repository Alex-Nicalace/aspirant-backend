import {createSelector} from 'reselect';

export const getDictContactTypeSelector = (state) => {
    return state.dictContactType;
}

export const getDatasetDictContactTypeSelector = createSelector([getDictContactTypeSelector], (state) => {
    return state.dataset;
});

export const getIsLoadingDictContactTypeSelector = createSelector([getDictContactTypeSelector], (state) => {
    return state.isLoading;
});

export const getErrorDictContactTypeSelector = createSelector([getDictContactTypeSelector], (state) => {
    return state.error;
});

