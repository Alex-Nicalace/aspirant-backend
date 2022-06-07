import React, {useContext} from 'react';
import {AspirantApiContext} from "../context/aspirant-api-context";
import TableEdit from "../table-edit";
import DictEducationFormEdit from "../dict-education-form-edit";

const headCells = [
    {id: 'id', disablePadding: false, key: true},
    {id: 'educationForm', disablePadding: false, label: 'форма обучения'},
];

const DictEducationForm = () => {
    const {
        dictEducationForm: {
            dataset, isLoading, error,
            fetch,
            deleteRec,
        },
    } = useContext(AspirantApiContext);
    return (
        <TableEdit
            headCells={headCells}
            isLoading={isLoading}
            dataset={dataset}
            error={error}
            deleteRec={deleteRec}
            fetch={fetch}
            FormEdit={DictEducationFormEdit}
            initialOrderBy='educationForm'
        />
    );
};

export default DictEducationForm;
