import React from 'react';
import TableEdit from "../table-edit";
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";
import DictSpecialtyEdit from "../dict-specialty-edit";

const headCells = [
    {id: 'id', disablePadding: false, key: true},
    {id: 'DirectionalityOrSpecialty', disablePadding: false, label: 'специальность'},
    {id: 'nameSubDiv', disablePadding: false, label: 'кафедра'},
];

const DictSpecialty = ({
                           changeSelected = () => {
                           },
                           selected
                       }) => {
    const {
        dictDirectionalityAndSpecialty: {
            datasetSpecialty, isLoading, error,
            fetch,
            deleteRec,
        },
    } = useAspirantApiContext();
    return (
        <TableEdit
            headCells={headCells}
            isLoading={isLoading}
            dataset={datasetSpecialty}
            error={error}
            deleteRec={deleteRec}
            fetch={fetch}
            FormEdit={DictSpecialtyEdit}
            initialOrderBy='nameDirection'
            onGetKeyValue={changeSelected}
            currentRecInitial={selected}
        />
    );
};

export default DictSpecialty;