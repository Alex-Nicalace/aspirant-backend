import {createSelector} from 'reselect';

export const getDictSubjectSelector = (state) => {
    return state.dictSubject;
}

export const getDatasetDictSubjectSelector = createSelector([getDictSubjectSelector], (state) => {
    return state.dataset;
});

export const getIsLoadingDictSubjectSelector = createSelector([getDictSubjectSelector], (state) => {
    return state.isLoading;
});

export const getErrorDictSubjectSelector = createSelector([getDictSubjectSelector], (state) => {
    return state.error;
});

