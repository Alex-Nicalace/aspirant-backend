import React from 'react';
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";
import FacesAspirantsForEdit from "../faces-aspirants-edit/faces-aspirants-for-edit";

const FacesAspirantsByAdvisorEdit = ({closeEdit, modeEdit, currentRec}) => {
    const {
        aspirantsByAdvisor,
        faces,
        facesAcademicAdvisor,
        dictSubject,
        dictEducationForm,
        faceAspirantOrders,
        orders,
        dictDirectionalityAndSpecialty,
    } = useAspirantApiContext();

    const aspirantApiContext = {
        aspirant: aspirantsByAdvisor,
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

export default FacesAspirantsByAdvisorEdit;