import {createSelector} from 'reselect';

export const getFacesAspirantsSelector = (state) => {
    return state.facesAspirants;
}

export const getDatasetFacesAspirantsSelector = createSelector([getFacesAspirantsSelector], (state) => {
    return state.dataset;
});

export const getDatasetToFlatFacesAspirantsSelector = createSelector([getDatasetFacesAspirantsSelector], (dataset) => {
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
            })),
            lastname: i.tblFace.tblFaceNames[0].lastname,
            firstname: i.tblFace.tblFaceNames[0].firstname,
            middleName: i.tblFace.tblFaceNames[0].middleName,
            birthdate: i.tblFace.birthdate,
            sex: i.tblFace.sex === true ? 'мужской' : 'женский'
        }
    })
});

export const getIsLoadingFacesAspirantsSelector = createSelector([getFacesAspirantsSelector], (state) => {
    return state.isLoading;
});

export const getErrorFacesAspirantsSelector = createSelector([getFacesAspirantsSelector], (state) => {
    return state.error;
});

export const getDatasetDependsOnIdFacesAspirantsSelector = createSelector([getFacesAspirantsSelector], (state) => {
    return state.datasetDependsOnId;
});

