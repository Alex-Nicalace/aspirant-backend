import {createSelector} from 'reselect';

export const getOrdersSelector = (state) => {
    return state.orders;
}

export const  getDatasetOrdersSelector = createSelector([getOrdersSelector], (state) => {
    return state.dataset;
});

export const getIsLoadingOrdersSelector = createSelector([getOrdersSelector], (state) => {
    return state.isLoading;
});

export const getErrorOrdersSelector = createSelector([getOrdersSelector], (state) => {
    return state.error;
});

