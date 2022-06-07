import React, {useContext} from 'react';
import {AspirantApiContext} from "../context/aspirant-api-context";
import TableEdit from "../table-edit";
import DictEducationLevelEdit from "../dict-education-level-edit";

const headCells = [
    {id: 'id', disablePadding: false, key: true},
    {id: 'educationLevel', disablePadding: false, label: 'уровень образования'},
    {id: 'weightEducationLevel', disablePadding: false, label: 'приоритет'},
];

const DictEducationLevel = () => {
    const {
        dictEducationLevels: {
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
            FormEdit={DictEducationLevelEdit}
            initialOrderBy='weightEducationLevel'
        />
    );
};

export default DictEducationLevel;