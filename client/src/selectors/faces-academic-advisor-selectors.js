import {createSelector} from 'reselect';

export const getFaceAcademicAdvisorSelector = (state) => {
    return state.facesAcademicAdvisor;
}

export const  getDatasetFacesAcademicAdvisorSelector = createSelector([getFaceAcademicAdvisorSelector], (state) => {
    return state.dataset;
});

export const  getDatasetToFlatFacesAcademicAdvisorSelector = createSelector([getDatasetFacesAcademicAdvisorSelector], (dataset) => {
    return dataset.map(i => ({
        id: i.id,
        tblFaceId: i.tblFaceId,
        createdAt: i.createdAt,
        birthdate: i.tblFace.birthdate,
        lastname: i.tblFace.tblFaceNames[0].lastname,
        firstname: i.tblFace.tblFaceNames[0].firstname,
        middleName: i.tblFace.tblFaceNames[0].middleName,
    }))
});

export const getIsLoadingFacesAcademicAdvisorSelector = createSelector([getFaceAcademicAdvisorSelector], (state) => {
    return state.isLoading;
});

export const getErrorFacesAcademicAdvisorSelector = createSelector([getFaceAcademicAdvisorSelector], (state) => {
    return state.error;
});

