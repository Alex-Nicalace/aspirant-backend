import {createSelector} from 'reselect';

export const getAspirantsByAdvisorSelector = (state) => {
    return state.aspirantsByAdvisor;
}

export const getDatasetAspirantsByAdvisorSelector = createSelector([getAspirantsByAdvisorSelector], (state) => {
    return state.dataset;
});

export const getDatasetToFlatAspirantsByAdvisorSelector = createSelector([getDatasetAspirantsByAdvisorSelector], (dataset) => {
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
            })),
            lastname: i.tblFace.tblFaceNames[0].lastname,
            firstname: i.tblFace.tblFaceNames[0].firstname,
            middleName: i.tblFace.tblFaceNames[0].middleName,
            birthdate: i.tblFace.birthdate,
            sex: i.tblFace.sex === true ? 'мужской' : 'женский'
        }
    })
});

export const getIsLoadingAspirantsByAdvisorSelector = createSelector([getAspirantsByAdvisorSelector], (state) => {
    return state.isLoading;
});

export const getErrorAspirantsByAdvisorSelector = createSelector([getAspirantsByAdvisorSelector], (state) => {
    return state.error;
});

export const getDatasetDependsOnIdAspirantsByAdvisorSelector = createSelector([getAspirantsByAdvisorSelector], (state) => {
    return state.datasetDependsOnId;
});

