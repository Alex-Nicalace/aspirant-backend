import {createSelector} from 'reselect';

export const getFacesSelector = (state) => {
    return state.faces;
}

export const  getDatasetFacesSelector = createSelector([getFacesSelector], (state) => {
    return state.dataset;
});

export const getDatasetToFlatFacesSelector = createSelector([getDatasetFacesSelector], (dataset) => {
    const now = new Date();
    const getInfoAboutAspirant = (aspirant, now) => {
        if (aspirant.length === 0)
            return {isAspirant: false, isWasAspirant: false};
        const isAspirant = !aspirant[0].dateOff || new Date(aspirant[0].dateOff) >= now;
        const isWasAspirant = !!aspirant[0].dateOff && new Date(aspirant[0].dateOff) <= now;
        return {
            isAspirant,
            isWasAspirant,
        }
    };
    return dataset.map(i => {
        const infoAboutAspirant = getInfoAboutAspirant(i.tblFaceAspirants, now);
        return {
            id: i.id,
            birthdate: i.birthdate,
            sex: i.sex,
            sexStr: i.sex ? 'мужской' : 'женский',
            lastname: i.tblFaceNames[0].lastname,
            firstname: i.tblFaceNames[0].firstname,
            middleName: i.tblFaceNames[0].middleName,
            nameDateOn: i.tblFaceNames[0].dateOn,
            faceNameId: i.tblFaceNames[0].id,
            isAspirant: infoAboutAspirant.isAspirant,
            isWasAspirant: infoAboutAspirant.isWasAspirant,
            isAcademicAdvisor: i.tblAcademicAdvisors.length > 0,
            photo: i.tblFacePhotos[0]?.pathFile,
        }
    })
});

export const getIsLoadingFacesSelector = createSelector([getFacesSelector], (state) => {
    return state.isLoading;
});

export const getErrorFacesSelector = createSelector([getFacesSelector], (state) => {
    return state.error;
});

