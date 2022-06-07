import {createSelector} from 'reselect';

export const getDictEducationLevelsSelector = (state) => {
    return state.dictEducationLevels;
}

export const getDatasetDictEducationLevelsSelector = createSelector([getDictEducationLevelsSelector], (state) => {
    return state.dataset;
});

export const getIsLoadingDictEducationLevelsSelector = createSelector([getDictEducationLevelsSelector], (state) => {
    return state.isLoading;
});

export const getErrorDictEducationLevelsSelector = createSelector([getDictEducationLevelsSelector], (state) => {
    return state.error;
});

