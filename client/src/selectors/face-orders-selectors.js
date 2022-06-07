import {createSelector} from 'reselect';
import {getActionInOrder} from "../utils/my-func";

export const getFaceOrdersSelector = (state) => {
    return state.faceOrders;
}

export const  getDatasetFaceOrdersSelector = createSelector([getFaceOrdersSelector], (state) => {
    return state.dataset.map(i => ({...i, action: getActionInOrder(i)?.action}));
});

export const getIsLoadingFaceOrdersSelector = createSelector([getFaceOrdersSelector], (state) => {
    return state.isLoading;
});

export const getErrorFaceOrdersSelector = createSelector([getFaceOrdersSelector], (state) => {
    return state.error;
});

export const getDatasetDependsOnIdFaceOrdersSelector = createSelector([getFaceOrdersSelector], (state) => {
    return state.datasetDependsOnId;
});

