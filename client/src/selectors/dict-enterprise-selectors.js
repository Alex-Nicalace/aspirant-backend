import {createSelector} from 'reselect';

export const getDictEnterpriseSelector = (state) => {
    return state.dictEnterprise;
}

export const getDatasetDictEnterpriseSelector = createSelector([getDictEnterpriseSelector], (state) => {
    return state.dataset;
});

export const getDatasetAsTreeDictEnterpriseSelector = createSelector([getDatasetDictEnterpriseSelector], (dataset) => {

    const getBranch = (id, parentsId = []) => {
        const res = dataset.filter(rec => rec.parentId === id).sort((a, b) => (a.name.localeCompare(b.name)));


        let m = [];
        for (let i = 0; i <= res.length - 1; i++) {
            const children = getBranch(res[i].id, [...parentsId, res[i].id])

            m.push({...res[i], children, parentsId: [...parentsId, res[i].id]})
        }
        return m
    }

    return getBranch(null);
});

export const getIsLoadingDictEnterpriseSelector = createSelector([getDictEnterpriseSelector], (state) => {
    return state.isLoading;
});

export const getErrorDictEnterpriseSelector = createSelector([getDictEnterpriseSelector], (state) => {
    return state.error;
});

