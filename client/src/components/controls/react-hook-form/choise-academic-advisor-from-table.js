import React from 'react';
import ChoiseObjectFromTable from "./choise-object-from-table";
import FacesAcademicAdvisor from "../../faces-academic-advisor";

const ChoiseAcademicAdvisorFromTable = (props) => {
    return (
        <ChoiseObjectFromTable
            {...props}
            ComponentX={FacesAcademicAdvisor}
        />
    );
};

export default ChoiseAcademicAdvisorFromTable;