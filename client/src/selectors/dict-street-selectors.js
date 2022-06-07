import {createSelector} from 'reselect';

export const getDictStreetSelector = (state) => {
    return state.dictStreet;
}

export const getDatasetDictStreetSelector = createSelector([getDictStreetSelector], (state) => {
    return state.dataset;
});

export const getIsLoadingDictStreetSelector = createSelector([getDictStreetSelector], (state) => {
    return state.isLoading;
});

export const getErrorDictStreetSelector = createSelector([getDictStreetSelector], (state) => {
    return state.error;
});

