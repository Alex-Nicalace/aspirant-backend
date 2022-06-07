import {createSelector} from 'reselect';

export const getDictDirectionSelector = (state) => {
    return state.dictDirection;
}

export const getDatasetDictDirectionSelector = createSelector([getDictDirectionSelector], (state) => {
    return state.dataset;
});

export const getIsLoadingDictDirectionSelector = createSelector([getDictDirectionSelector], (state) => {
    return state.isLoading;
});

export const getErrorDictDirectionSelector = createSelector([getDictDirectionSelector], (state) => {
    return state.error;
});

