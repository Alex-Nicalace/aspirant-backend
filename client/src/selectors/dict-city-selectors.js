import {createSelector} from 'reselect';

export const getDictCitySelector = (state) => {
    return state.dictCity;
}

export const getDatasetDictCitySelector = createSelector([getDictCitySelector], (state) => {
    return state.dataset;
});

export const getIsLoadingDictCitySelector = createSelector([getDictCitySelector], (state) => {
    return state.isLoading;
});

export const getErrorDictCitySelector = createSelector([getDictCitySelector], (state) => {
    return state.error;
});

