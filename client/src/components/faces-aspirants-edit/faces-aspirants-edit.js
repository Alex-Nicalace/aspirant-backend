import React from 'react';
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";
import FacesAspirantsForEdit from "./faces-aspirants-for-edit";

const FacesAspirantsEdit = ({closeEdit, modeEdit, currentRec}) => {
    const {
        facesAspirants,
        faces,
        facesAcademicAdvisor,
        dictSubject,
        dictEducationForm,
        faceAspirantOrders,
        orders,
        dictDirectionalityAndSpecialty,
    } = useAspirantApiContext();

    const aspirantApiContext = {
        aspirant: facesAspirants,
        faces,
        facesAcademicAdvisor,
        dictSubject,
        dictEducationForm,
        faceAspirantOrders,
        orders,
        dictDirectionalityAndSpecialty,
    }

    return (
        <FacesAspirantsForEdit
            closeEdit={closeEdit}
            modeEdit={modeEdit}
            currentRec={currentRec}
            aspirantApiContext={aspirantApiContext}
        />
    );
};

export default FacesAspirantsEdit;