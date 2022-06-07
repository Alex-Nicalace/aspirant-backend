import {createSelector} from 'reselect';

export const getDictCountrySelector = (state) => {
    return state.dictCountry;
}

// export const getDatasetDictCountrySelector = (state) => {
//     return state.dictCountry.dataset;
// }
//
// export const getIsLoadingDictCountrySelector = (state) => {
//     return state.dictCountry.isLoading;
// }
//
// export const getErrorDictCountrySelector = (state) => {
//     return state.dictCountry.error;
// }

export const getDatasetDictCountrySelector = createSelector([getDictCountrySelector], (state) => {
    return state.dataset;
});

export const getIsLoadingDictCountrySelector = createSelector([getDictCountrySelector], (state) => {
    return state.isLoading;
});

export const getErrorDictCountrySelector = createSelector([getDictCountrySelector], (state) => {
    return state.error;
});

