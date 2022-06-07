import React from 'react';
import TableEdit from "../table-edit";
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";
import DictDirectionalityEdit from "../dict-directionality-edit";

const headCells = [
    {id: 'id', disablePadding: false, key: true},
    {id: 'nameDirection', disablePadding: false, label: 'направление'},
    {id: 'DirectionalityOrSpecialty', disablePadding: false, label: 'направленность'},
    {id: 'nameSubDiv', disablePadding: false, label: 'кафедра'},
];

const DictDirectionality = ({
                                changeSelected = () => {
                                },
                                selected
                            }) => {
    const {
        dictDirectionalityAndSpecialty: {
            datasetDirectionality, isLoading, error,
            fetch,
            deleteRec,
        },
    } = useAspirantApiContext();
    return (
        <TableEdit
            headCells={headCells}
            isLoading={isLoading}
            dataset={datasetDirectionality}
            error={error}
            deleteRec={deleteRec}
            fetch={fetch}
            FormEdit={DictDirectionalityEdit}
            initialOrderBy='nameDirection'
            onGetKeyValue={changeSelected}
            currentRecInitial={selected}
        />
    );
};

export default DictDirectionality;