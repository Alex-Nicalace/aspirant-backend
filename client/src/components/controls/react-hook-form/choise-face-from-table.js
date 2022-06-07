import React from 'react';
import FacesList from "../../faces-list";
import ChoiseObjectFromTable from "./choise-object-from-table";

const ChoiseFaceFromTable = (props) => {
    return (
        <ChoiseObjectFromTable
            {...props}
            ComponentX={FacesList}
        />
    );
};

export default ChoiseFaceFromTable;