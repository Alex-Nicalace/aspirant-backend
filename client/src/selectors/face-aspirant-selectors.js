import {createSelector} from 'reselect';

export const getFaceAspirantSelector = (state) => {
    return state.faceAspirant;
}

export const getDatasetFaceAspirantSelector = createSelector([getFaceAspirantSelector], (state) => {
    return state.dataset;
});

export const getDatasetToFlatFaceAspirantSelector = createSelector([getDatasetFaceAspirantSelector], (dataset) => {
    const giveOrder = (orders, typeRel) => {
        if (orders.length === 0)
            return null;
        const order = orders.find(i => i.typeRel === typeRel)
        if (!order)
            return null;
        return {
            order: `№${order.tblOrder.numOrder} от ${new Date(order.tblOrder.dateOrder).toLocaleDateString()} г.`,
            tblFace_tblOrderId: order.id,
        }
    }
    return dataset.map(i => {
        const ordersIn = giveOrder(i.tblFace_tblOrders, 'in');
        const ordersOut = giveOrder(i.tblFace_tblOrders, 'out') ?? giveOrder(i.tblFace_tblOrders, 'reIn');
        return {
            id: i.id,
            tblFaceId: i.tblFaceId,
            dateOn: i.dateOn,
            dateOff: i.dateOff,
            isRecommendation: i.isRecommendation,
            isProtocol: i.isProtocol,
            isAgree: i.isAgree,
            isHeadDepartment: i.isHeadDepartment,
            tblDictSubjectId: i.tblDictSubjectId,
            tblDictEducationFormId: i.tblDictEducationFormId,
            tblDictSpecialtyId: i.tblDictSpecialtyId,
            dissertationTheme: i.dissertationTheme,
            tblAcademicAdvisorId: i.tblAcademicAdvisorId,
            educationForm: i.tblDictEducationForm.educationForm,
            subject: i.tblDictSubject.subject,
            DirectionalityOrSpecialty: i.tblDictSpecialty.DirectionalityOrSpecialty,
            nameDirection: i.tblDictSpecialty?.tblDictNameDirection?.nameDirection,
            subDiv: i.tblDictSpecialty.tblDictEnterprise.name,
            faculty: i.tblDictSpecialty.tblDictEnterprise.tblDictEnterprise.name,
            academicAdvisor: `${i.tblAcademicAdvisor.tblFace.tblFaceNames[0].lastname} ${i.tblAcademicAdvisor.tblFace.tblFaceNames[0].firstname} ${i.tblAcademicAdvisor.tblFace.tblFaceNames[0].middleName}, ${new Date(i.tblAcademicAdvisor.tblFace.birthdate).toLocaleDateString()} г.р.`,
            orderIn: ordersIn?.order,
            orderIn_tblFace_tblOrderId: ordersIn?.tblFace_tblOrderId,
            orderOut: ordersOut?.order,
            orderOut_tblFace_tblOrderId: ordersOut?.tblFace_tblOrderId,
            orders: i.tblFace_tblOrders.map(i => ({
                typeRel: i.typeRel,
                note: i.note,
                numOrder: i.tblOrder.numOrder,
                dateOrder: i.tblOrder.dateOrder,
                text: i.tblOrder.text,
            }))
        }
    })
});

export const getIsLoadingFaceAspirantSelector = createSelector([getFaceAspirantSelector], (state) => {
    return state.isLoading;
});

export const getErrorFaceAspirantSelector = createSelector([getFaceAspirantSelector], (state) => {
    return state.error;
});

export const getDatasetDependsOnIdFaceAspirantSelector = createSelector([getFaceAspirantSelector], (state) => {
    return state.datasetDependsOnId;
});

