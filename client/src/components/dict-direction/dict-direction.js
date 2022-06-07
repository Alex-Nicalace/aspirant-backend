import React from 'react';
import TableEdit from "../table-edit";
import DictDirectionEdit from "../dict-direction-edit";
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";

const headCells = [
    {id: 'id', disablePadding: false, key: true},
    {id: 'nameDirection', disablePadding: false, label: 'направление'},
];

const DictDirection = () => {
    const {
        dictDirection: {
            dataset, isLoading, error,
            fetch,
            deleteRec,
        },
    } = useAspirantApiContext();
    return (
        <TableEdit
            headCells={headCells}
            isLoading={isLoading}
            dataset={dataset}
            error={error}
            deleteRec={deleteRec}
            fetch={fetch}
            FormEdit={DictDirectionEdit}
            initialOrderBy='nameDirection'
        />
    );
};

export default DictDirection;