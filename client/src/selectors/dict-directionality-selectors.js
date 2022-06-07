import {createSelector} from 'reselect';

export const getDictDirectionalitySelector = (state) => {
    return state.dictDirectionality;
}

export const getDatasetDictAllSelector = createSelector([getDictDirectionalitySelector], (state) => {
    return state.dataset;
});

export const getDatasetDictDirectionalitySelector = createSelector([getDatasetDictAllSelector], (dataset) => {
    return dataset.filter(i => i.tblDictNameDirectionId);
});

export const getDatasetDictSpecialtySelector = createSelector([getDatasetDictAllSelector], (dataset) => {
    return dataset.filter(i => !i.tblDictNameDirectionId);
});

export const getIsLoadingDictDirectionalitySelector = createSelector([getDictDirectionalitySelector], (state) => {
    return state.isLoading;
});

export const getErrorDictDirectionalitySelector = createSelector([getDictDirectionalitySelector], (state) => {
    return state.error;
});

