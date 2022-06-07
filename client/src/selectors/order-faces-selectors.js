import {createSelector} from 'reselect';
import {getActionInOrder} from "../utils/my-func";

export const getOrderFacesSelector = (state) => {
    return state.orderFaces;
}

export const getDatasetOrderFacesSelector = createSelector([getOrderFacesSelector], (state) => {
    return state.dataset;
});

export const getDatasetToFlatOrderFacesSelector = createSelector([getDatasetOrderFacesSelector], (dataset) => {
    return dataset.map(i => {
        const {action, date} = getActionInOrder(i);
        return {
            id: i.id,
            tblOrderId: i.tblOrderId,
            tblFaceId: i.tblFaceId,
            note: i.note,
            birthdate: i.tblFace.birthdate,
            sex: i.tblFace.sex ? 'мужской' : 'женский',
            lastname: i.tblFace.tblFaceNames[0].lastname,
            firstname: i.tblFace.tblFaceNames[0].firstname,
            middleName: i.tblFace.tblFaceNames[0].middleName,
            typeRel: i.typeRel,
            action: action,
            date: date
        }
    })
    // const newArr = [];
    // const toTable = (arr, obj = {}, nameObj = null, canPush = true) => {
    //
    //     arr.forEach(i => {
    //         const elNew = {...obj};
    //         //let canPush
    //         for (const key in i) {
    //             //canPush = true;
    //             if (Array.isArray(i[key])) {
    //                 toTable(i[key], elNew, key)
    //                 canPush = false;
    //                 continue;
    //             }
    //             if (typeof (i[key]) === 'object') {
    //                 toTable([i[key]], elNew, key)
    //                 canPush = false;
    //                 continue;
    //             }
    //             const keyNew = nameObj ? nameObj + '_' : ''
    //             elNew[keyNew + key] = i[key]
    //         }
    //
    //         canPush && newArr.push(elNew)
    //         // newArr.push(elNew)
    //     })
    //
    //     return newArr;
    // }
    //
    // return toTable(dataset);
});

export const getIsLoadingOrderFacesSelector = createSelector([getOrderFacesSelector], (state) => {
    return state.isLoading;
});

export const getErrorOrderFacesSelector = createSelector([getOrderFacesSelector], (state) => {
    return state.error;
});

export const getDatasetDependsOnIdOrderFacesSelector = createSelector([getOrderFacesSelector], (state) => {
    return state.datasetDependsOnId;
});

