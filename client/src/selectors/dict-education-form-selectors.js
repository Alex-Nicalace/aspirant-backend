import {createSelector} from 'reselect';

export const getDictEducationFormSelector = (state) => {
    return state.dictEducationForm;
}

export const getDatasetDictEducationFormSelector = createSelector([getDictEducationFormSelector], (state) => {
    return state.dataset;
});

export const getIsLoadingDictEducationFormSelector = createSelector([getDictEducationFormSelector], (state) => {
    return state.isLoading;
});

export const getErrorDictEducationFormSelector = createSelector([getDictEducationFormSelector], (state) => {
    return state.error;
});

