import {createSelector} from 'reselect';

export const getUsersListSelector = (state) => {
    return state.usersList;
}

export const getDatasetUsersListSelector = createSelector([getUsersListSelector], (state) => {
    return state.dataset;
});

export const getIsLoadingUsersListSelector = createSelector([getUsersListSelector], (state) => {
    return state.isLoading;
});

export const getErrorUsersListSelector = createSelector([getUsersListSelector], (state) => {
    return state.error;
});

