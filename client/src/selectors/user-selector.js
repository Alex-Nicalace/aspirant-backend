import {createSelector} from 'reselect';

export const getUserSelector = (state) => {
    return state.user ;
}

export const  getIsAuthSelector = createSelector([getUserSelector], (state) => {
    return !!state.data;
});

export const  getUsersDataSelector = createSelector([getUserSelector], (state) => {
    return state.data;
});

export const  getIsLoadingUserSelector = createSelector([getUserSelector], (state) => {
    return state.isLoading;
});

export const  getErrorUserSelector = createSelector([getUserSelector], (state) => {
    return state.error;
});