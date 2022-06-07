import {createSelector} from 'reselect';

export const getFaceAspirantAcademSelector = (state) => {
    return state.faceAspirantAcadem;
}

export const  getDatasetFaceAspirantAcademSelector = createSelector([getFaceAspirantAcademSelector], (state) => {
    return state.dataset;
});

export const  getDatasetToFlatFaceAspirantAcademSelector = createSelector([getDatasetFaceAspirantAcademSelector], (dataset) => {
    const giveOrder = (orders, typeRel) => {
        if (orders.length === 0)
            return null;
        const order = orders.find(i => i.tblFace_tblOrder.typeRel === typeRel)
        if (!order)
            return null;
        return {
            order: `№${order.numOrder} от ${new Date(order.dateOrder).toLocaleDateString()} г.`,
            tblFace_tblOrderId: order.tblFace_tblOrder.id,
        }
    }
    return dataset.map(i => {
        const ordersAcademOn = giveOrder(i.tblOrders, 'academ-on');
        const ordersAcademOff = giveOrder(i.tblOrders, 'academ-off') ;
        return {
            id: i.id,
            tblFaceId: i.tblFaceId,
            dateOn: i.dateOn,
            dateOff: i.dateOff,
            note: i.note,
            orderAcademOn: ordersAcademOn?.order,
            orderAcademOff: ordersAcademOff?.order,
            set_tblFace_tblOrder_id_on: ordersAcademOn?.tblFace_tblOrderId,
            set_tblFace_tblOrder_id_off: ordersAcademOff?.tblFace_tblOrderId,
        }
    });
});

export const getIsLoadingFaceAspirantAcademSelector = createSelector([getFaceAspirantAcademSelector], (state) => {
    return state.isLoading;
});

export const getErrorFaceAspirantAcademSelector = createSelector([getFaceAspirantAcademSelector], (state) => {
    return state.error;
});

export const getDatasetDependsOnIdFaceAspirantAcademSelector = createSelector([getFaceAspirantAcademSelector], (state) => {
    return state.datasetDependsOnId;
});

